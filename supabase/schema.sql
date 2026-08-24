create extension if not exists vector;

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_type text not null check (source_type in ('resume', 'article', 'project', 'certification', 'architecture_note')),
  source_url text,
  content text not null,
  chunk_index integer not null default 0,
  public_safe boolean not null default true,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create index if not exists documents_embedding_idx
on documents using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

create index if not exists documents_public_safe_idx
on documents (public_safe, source_type);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null,
  kind text not null default 'contact' check (kind in ('contact', 'beta-feedback', 'practitioner-review')),
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table contact_messages
add column if not exists kind text not null default 'contact';

alter table contact_messages
add column if not exists metadata jsonb not null default '{}'::jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'contact_messages_kind_check'
  ) then
    alter table contact_messages
    add constraint contact_messages_kind_check
    check (kind in ('contact', 'beta-feedback', 'practitioner-review'));
  end if;
end $$;

create index if not exists contact_messages_kind_created_at_idx
on contact_messages (kind, created_at desc);

create or replace view practitioner_reviews as
select
  id,
  name,
  email,
  created_at,
  metadata->>'reviewerRole' as reviewer_role,
  metadata->>'doctrineVerdict' as doctrine_verdict,
  metadata->>'reviewMode' as review_mode,
  metadata->>'reviewDimension' as review_dimension,
  metadata->>'reviewVerdict' as review_verdict,
  metadata->>'artifactsInspected' as artifacts_inspected,
  metadata->>'reviewDisposition' as review_disposition,
  metadata->>'evidenceObserved' as evidence_observed,
  metadata->>'reasoningLoss' as reasoning_loss,
  metadata->>'reviewLimitation' as review_limitation,
  metadata->>'doctrineImpact' as doctrine_impact,
  metadata->>'strongestClaim' as strongest_claim,
  metadata->>'weakestClaim' as weakest_claim,
  metadata->>'evidenceNeeded' as evidence_needed,
  metadata->>'implementationQuestion' as implementation_question,
  message
from contact_messages
where kind = 'practitioner-review';

create or replace view practitioner_review_quorum_status as
with review_rows as (
  select
    *,
    case
      when nullif(trim(coalesce(artifacts_inspected, '')), '') is null then 0
      else cardinality(regexp_split_to_array(artifacts_inspected, '\s*(,|;|\n)\s*'))
    end as artifact_count
  from practitioner_reviews
),
counts as (
  select
    count(*)::int as total_reviews,
    count(*) filter (where reviewer_role ~* '(sre|reliability)')::int as sre_reliability_reviews,
    count(*) filter (where reviewer_role ~* '(principal|architect|solutions architect)')::int as architecture_reviews,
    count(*) filter (where reviewer_role ~* '(ai engineer|ai systems|governance)')::int as ai_governance_reviews,
    count(*) filter (where reviewer_role ~* '(executive|founder|product leader|product)')::int as executive_product_reviews,
    count(*) filter (where reviewer_role ~* '(recruiter|hiring)')::int as recruiter_hiring_reviews,
    count(*) filter (
      where review_verdict ~* '(mixed|weak|unsupported|confusing|not assessable)'
        or doctrine_verdict ~* '(needs evidence|too close|not precise|needs governance)'
        or review_disposition in ('Needs Evidence', 'Fix', 'Clarify', 'Remove')
    )::int as skeptical_or_mixed_reviews,
    count(*) filter (where nullif(trim(coalesce(evidence_needed, '')), '') is not null)::int as evidence_needed_reviews,
    count(*) filter (where artifact_count >= 4)::int as four_artifact_reviews
  from review_rows
)
select
  *,
  (
    total_reviews >= 5
    and sre_reliability_reviews >= 1
    and architecture_reviews >= 1
    and ai_governance_reviews >= 1
    and executive_product_reviews >= 1
    and recruiter_hiring_reviews >= 1
    and skeptical_or_mixed_reviews >= 1
    and evidence_needed_reviews >= 1
    and four_artifact_reviews >= 1
  ) as ready_for_positive_summary
from counts;

create or replace view practitioner_review_dimension_summary as
select
  coalesce(nullif(review_dimension, ''), 'unspecified') as review_dimension,
  coalesce(nullif(review_verdict, ''), 'unspecified') as review_verdict,
  coalesce(nullif(review_disposition, ''), 'unspecified') as review_disposition,
  count(*)::int as review_count,
  count(*) filter (where nullif(trim(coalesce(evidence_needed, '')), '') is not null)::int as evidence_needed_count,
  count(*) filter (where nullif(trim(coalesce(implementation_question, '')), '') is not null)::int as implementation_question_count
from practitioner_reviews
group by 1, 2, 3;

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'seri.ai',
  created_at timestamptz not null default now()
);

create or replace function match_documents(
  query_embedding vector(1536),
  match_count int default 6,
  filter jsonb default '{}'::jsonb
)
returns table (
  id uuid,
  title text,
  source_type text,
  source_url text,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.title,
    documents.source_type,
    documents.source_url,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where documents.embedding is not null
    and documents.public_safe = coalesce((filter->>'public_safe')::boolean, documents.public_safe)
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

alter table documents enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;

create policy "Public can read approved documents"
on documents for select
using (public_safe = true);
