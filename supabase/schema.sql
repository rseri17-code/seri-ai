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
  message text not null,
  created_at timestamptz not null default now()
);

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
