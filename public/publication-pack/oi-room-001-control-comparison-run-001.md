# OI-ROOM-001 Control Comparison — Run 001

Version: 1.0
Status: first execution of the control comparison protocol
Run date: 2026-08-26
Run by: Ravikanth Seri (author of the workflow under test)
Independence: **none — see Limitations before reading any result**

This is the first execution of the control comparison protocol defined in section 7 of the
[Evidence Pack](/publication-pack/operational-intelligence-evidence-pack.md). Until now that
protocol had been specified and never run, which meant the Evidence Pack described a
measurement it had never performed.

Read the Limitations section first. The most important finding in this document is a
constraint on what it can prove, not a result in favour of the method.

## Related References

- Evidence Pack (protocol source): [/publication-pack/operational-intelligence-evidence-pack.md](/publication-pack/operational-intelligence-evidence-pack.md)
- Operations Room (the OI workflow under test): [/investigation-room](/investigation-room)
- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)

## 1. What was compared

The same OI-ROOM-001 synthetic case was carried through four investigation modes. The case
is a customer transaction degradation following a configuration change. It contains five
evidence items, a five-point timeline with latency figures, three competing hypotheses, one
red herring, one contradiction, and two named missing-evidence gaps.

Modes are **not** defined by tooling brand or by operator skill. They are defined by which
fields of the evidence record each mode can represent. This is the design decision that makes
the comparison reproducible: a reader can check every score against the fixture rather than
against the author's judgement.

## 2. Representational capacity

| Field in the OI evidence record | Dashboard-only | Chatbot-only | Ticket-only | OI workflow |
| --- | --- | --- | --- | --- |
| Numeric metric series (P50/P95, hop latency) | Yes, natively | Flattened into prose | Summarised after the fact | Yes |
| `provenance` / source type | No | Assertable but unverifiable | Author attribution only | Yes, typed |
| `confidence` / `weight` | No | Prose hedge only | No | Yes, numeric |
| `stance` (supports / weakens / contradicts) | No | Possible in prose, not enforced | No | Yes, typed |
| `classification` (Observation / Inference / Contradiction / Confirmed fact) | No | Conflated | No | Yes, typed |
| `used: false` — evidence considered and rejected | Not represented | Rarely stated | No | Yes, explicit |
| Competing hypotheses with confidence | No | One narrative | No | Yes, three ranked |
| Named missing evidence | No | Omitted unless prompted | Sometimes | Yes, explicit |
| Replay seed | No | No | No | Yes |
| Approval class / action boundary | No | Unbounded action language | Yes, via workflow | Yes, typed |

## 3. Scored result

Verdicts follow the Evidence Pack scoring discipline: Strong, Mixed, Weak — scored per
dimension per mode, with no aggregate score.

| Dimension | Dashboard-only | Chatbot-only | Ticket-only | OI workflow |
| --- | --- | --- | --- | --- |
| Evidence completeness (numeric) | **Strong** | Weak | Mixed | Strong |
| Evidence completeness (provenance) | Weak | Weak | Mixed | Strong |
| Hypothesis quality | Weak | Mixed | Weak | Strong |
| Contradiction handling | **Weak — see 4.1** | Mixed | Weak | Strong |
| Missing-evidence honesty | Weak | Weak | Mixed | Strong |
| Decision safety | Weak | **Weak — see 4.2** | Strong | Strong |
| Replayability | Weak | Weak | Mixed | Strong |
| Reviewer confidence | Mixed | Weak | Mixed | Strong |

## 4. Findings

### 4.1 The contradiction inverts meaning between modes

The most informative item in OI-ROOM-001 is the capacity sample: *synthetic capacity headroom
remains stable while the customer journey degrades*. Its value is eliminative — it rules out
capacity saturation, moving that hypothesis from plausible to unlikely.

On a dashboard this item renders as a panel within normal range. The most plausible operator
reading of a green capacity panel during an incident is "not the problem here", and attention
moves on. The typed record instead carries `stance: contradicts` against a named hypothesis,
so the same measurement is retained as *the reason a competing explanation was eliminated*.

Same data, opposite operational meaning. This is the sharpest difference the run found, and
it is a difference in representation rather than in information available.

### 4.2 Chatbot-only scores Weak on decision safety for a structural reason

Chatbot-only can produce a fluent, largely correct narrative of this case. It scores Weak on
decision safety not because the narrative is wrong but because nothing in the mode carries an
approval class. The output ends in action language with no bounded owner, no reversibility
statement, and no distinction between recommending and doing. Ticket-only scores Strong on
this dimension precisely because ticket workflows carry approval structure natively — the OI
workflow has no advantage over it here.

### 4.3 Dashboard-only is not uniformly worse, and the thesis should stop implying it is

On numeric evidence completeness, dashboard-only scores **Strong** — equal to the OI workflow
and better than the other two. The latency progression in this case (data path 114ms → 387ms,
end-to-end 1.8s, retry hop +620ms) is more legible on a dashboard than in a typed evidence
record.

The OI workflow's advantage in this run is **not that it sees more**. It is that it retains
*why something was dismissed*. Any framing that positions Operational Intelligence as
strictly superior to dashboards is not supported by this run, and this document is evidence
against that framing.

### 4.4 Cost was not measured, and the protocol's own stated risk remains untested

The Evidence Pack names the primary risk of the OI workflow as "slower workflow if evidence
structure does not improve judgment". This run measured representational capacity only. It
did not measure time to decision, operator effort, or setup cost — and the OI workflow
plausibly costs more on all three. **The protocol's central risk to itself is still untested
after this run.**

## 5. Limitations

These are ordered by how much they should reduce a reader's confidence.

1. **The case was authored by the same person as the workflow, and it contains exactly the
   three features the workflow is built to handle** — a red herring, a typed contradiction,
   and named missing evidence. A case without those features would not separate the modes on
   the dimensions where they separated here. **This run cannot rule out that its result is an
   artifact of case selection.** No caveat fixes this; it requires a case authored by someone
   with no stake in the outcome. This is the single largest threat to the result and it is
   why the run is published with `Independence: none`.
2. **n = 1, synthetic.** One case, no repetition, no variance estimate. Nothing here supports
   a general claim about incident investigation.
3. **No human operators were involved.** The comparison is between representations, not
   between people using them. A strong operator with a dashboard may well reach a better
   decision than a weak operator with a full evidence graph. This run says nothing about that,
   and that is the comparison most organisations actually care about.
4. **Not blinded.** The author scored the workflow he designed. The field-level methodology in
   section 2 is intended to constrain that bias, not to remove it.
5. **No production data.** All figures are synthetic fixtures. Nothing in this run is evidence
   about any employer system.

## 6. What would change these results

- A case authored by an independent practitioner, containing no contradiction — the prediction
  is that contradiction handling stops separating the modes, and the OI workflow's advantage
  narrows to replayability and approval structure alone.
- Timed runs with real operators — the prediction under test is that the OI workflow costs
  more operator minutes per decision, and the open question is whether the decisions improve
  enough to pay for it.
- Any run in which dashboard-only or ticket-only reaches the same bounded, reversible
  recommendation with less structure would weaken the doctrine's central claim directly.

## 7. Status

This is a first run by the author of the method under test. It is not independent validation
and should not be cited as evidence that Operational Intelligence outperforms other modes in
practice. It is published so the protocol has been executed at least once, so its findings —
including the two unfavourable ones in 4.3 and 4.4 — are on the record, and so an external
reviewer has something concrete to disagree with.

Practitioner review path: [/contact](/contact)
