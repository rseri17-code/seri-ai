from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "downloads"
OUT.mkdir(parents=True, exist_ok=True)

BRAND = colors.HexColor("#7dd3fc")
MINT = colors.HexColor("#5eead4")
DARK = colors.HexColor("#0f172a")
TEXT = colors.HexColor("#111827")
MUTED = colors.HexColor("#475569")
LINE = colors.HexColor("#cbd5e1")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleSeri", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=24, leading=29, textColor=DARK, spaceAfter=12))
styles.add(ParagraphStyle(name="SubtitleSeri", parent=styles["BodyText"], fontSize=11, leading=16, textColor=MUTED, spaceAfter=16))
styles.add(ParagraphStyle(name="H1Seri", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=DARK, spaceBefore=12, spaceAfter=8))
styles.add(ParagraphStyle(name="H2Seri", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=DARK, spaceBefore=8, spaceAfter=5))
styles.add(ParagraphStyle(name="BodySeri", parent=styles["BodyText"], fontSize=9.2, leading=13, textColor=TEXT, spaceAfter=7))
styles.add(ParagraphStyle(name="SmallSeri", parent=styles["BodyText"], fontSize=7.8, leading=10.5, textColor=MUTED))
styles.add(ParagraphStyle(name="CellSeri", parent=styles["BodyText"], fontSize=7.4, leading=9.4, textColor=TEXT))
styles.add(ParagraphStyle(name="CellHeadSeri", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=7.6, leading=9.6, textColor=colors.white))


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(0.65 * inch, 0.52 * inch, 7.85 * inch, 0.52 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.65 * inch, 0.35 * inch, "seri.ai - Operational Intelligence - Draft for Technical Review")
    canvas.drawRightString(7.85 * inch, 0.35 * inch, f"Page {doc.page}")
    canvas.restoreState()


def doc(path: Path, title: str):
    frame = Frame(0.65 * inch, 0.7 * inch, 7.2 * inch, 9.65 * inch, id="normal")
    template = PageTemplate(id="seri", frames=[frame], onPage=footer)
    return BaseDocTemplate(
        str(path),
        pagesize=letter,
        pageTemplates=[template],
        title=title,
        author="Ravikanth Seri",
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.65 * inch,
    )


def p(text, style="BodySeri"):
    return Paragraph(text, styles[style])


def table(rows, widths):
    converted = []
    for row_index, row in enumerate(rows):
        style = "CellHeadSeri" if row_index == 0 else "CellSeri"
        converted.append([Paragraph(str(cell), styles[style]) for cell in row])
    t = Table(converted, colWidths=widths, repeatRows=1, hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DARK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#f8fafc")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def build_pdf(filename, title, subtitle, story):
    out = OUT / filename
    d = doc(out, title)
    content = [p(title, "TitleSeri"), p(subtitle, "SubtitleSeri")]
    content.extend(story)
    d.build(content)
    return out


def executive_summary():
    story = [
        p("Definition", "H1Seri"),
        p("Operational Intelligence is the reasoning layer between enterprise telemetry and human decision."),
        p("Why it exists", "H1Seri"),
        p("Enterprises already have dashboards, logs, traces, tickets, alerts, runbooks, changes, and postmortems. The gap is turning those operational fragments into accountable judgment under uncertainty."),
        p("The ten layers", "H1Seri"),
        table(
            [
                ["Layer", "Purpose"],
                ["Signal", "Capture telemetry, alerts, events, changes, and operational context."],
                ["Transaction", "Reconstruct customer, process, or business journeys."],
                ["Topology", "Constrain reasoning with dependencies, owners, and blast radius."],
                ["Evidence", "Separate observation, inference, confirmed fact, contradiction, and missing evidence."],
                ["Reasoning", "Track falsifiable hypotheses and confidence movement."],
                ["Memory", "Preserve reviewed operational context and replay seeds."],
                ["Evaluation", "Gate retrieval, grounding, refusal, contradiction handling, and action safety."],
                ["Decision", "Create reviewable options with evidence, risk, and reversibility."],
                ["Learning", "Turn reviewed outcomes into memory, patterns, fixtures, and documentation."],
                ["Operator", "Preserve human approval, escalation, override, and accountability."],
            ],
            [1.15 * inch, 5.75 * inch],
        ),
        Spacer(1, 9),
        p("Operating rule", "H1Seri"),
        p("Every recommendation needs supporting evidence or an explicit statement that evidence is unavailable. Every claim needs provenance. Every hypothesis must be falsifiable. Every consequential action needs approval boundaries."),
        p("What it is not", "H1Seri"),
        p("It does not replace observability, SRE, incident management, ITSM, security response, or human command. It makes the decision path inspectable."),
    ]
    return build_pdf("operational-intelligence-executive-summary.pdf", "Operational Intelligence Executive Summary", "One-page shareable summary for executives, architects, and engineering leaders.", story)


def glossary():
    rows = [
        ["Term", "Definition"],
        ["Operational Intelligence", "The reasoning layer between enterprise telemetry and human decision."],
        ["Transaction Intelligence", "Reasoning over customer, process, or business journeys rather than isolated components."],
        ["Evidence Graph", "Typed graph of observations, sources, relationships, contradictions, missing evidence, inferences, and confirmed facts."],
        ["Observation", "Operational data directly present in an approved source."],
        ["Inference", "An interpretation derived from observations or other evidence."],
        ["Confirmed Fact", "A statement accepted because it is sufficiently supported by evidence or operator review."],
        ["Contradiction", "Evidence that weakens or conflicts with a claim, inference, or hypothesis."],
        ["Missing Evidence", "Expected evidence that is unavailable, incomplete, stale, or inaccessible."],
        ["Hypothesis Lifecycle", "Movement through proposed, supported, contradicted, rejected, or confirmed states."],
        ["Replay Seed", "Minimum approved context needed to reproduce an investigation scenario."],
        ["Evaluation Gate", "A release or responsibility boundary based on tested behavior."],
        ["Decision Packet", "Reviewable recommendation with evidence, risk, reversibility, owner, fallback, and approval class."],
        ["Operator Control Plane", "Human governance layer for approval, escalation, override, refusal, and accountability."],
        ["Operational Memory", "Reviewed reusable context from incidents, decisions, patterns, outcomes, replay seeds, and lessons."],
    ]
    story = [table(rows, [1.75 * inch, 5.15 * inch])]
    return build_pdf("operational-intelligence-glossary-card.pdf", "Operational Intelligence Glossary Card", "Canonical terms for the doctrine, reference architecture, and Operations Room.", story)


def walkthrough():
    story = [
        p("Purpose", "H1Seri"),
        p("OI-ROOM-001 is a public-safe synthetic case showing how evidence, hypotheses, evaluation gates, decision packets, operator approval, and learning work together."),
        p("Timeline", "H1Seri"),
        table(
            [
                ["Time", "Event", "Primary Layers"],
                ["T0", "Normal checkout baseline exists", "Signal, Transaction"],
                ["T1", "Checkout latency increases", "Signal"],
                ["T2", "Payment authorization hop slows", "Transaction, Evidence"],
                ["T3", "Related deployment event appears", "Signal, Topology"],
                ["T4", "Downstream health check remains normal", "Evidence"],
                ["T5", "Async trace segment is missing", "Evidence, Transaction"],
                ["T6", "Hypotheses are proposed and updated", "Reasoning"],
                ["T7", "Rollback review packet is drafted", "Decision"],
                ["T8", "Operator approval is required", "Operator"],
                ["T9", "Outcome becomes replay seed and eval fixture", "Learning, Memory, Evaluation"],
            ],
            [0.65 * inch, 3.7 * inch, 2.55 * inch],
        ),
        p("Evidence", "H1Seri"),
        table(
            [
                ["ID", "Type", "Statement", "Impact"],
                ["E1", "Observation", "Checkout latency increased", "Opens investigation"],
                ["E2", "Observation", "Payment authorization hop is slow", "Supports H1"],
                ["E3", "Observation", "Related deployment event exists", "Supports H1, does not prove it"],
                ["E4", "Contradiction", "Downstream health check is normal", "Weakens H2"],
                ["E5", "Missing Evidence", "Async trace segment unavailable", "Limits confidence"],
                ["E6", "Memory", "Similar prior reviewed pattern exists", "Informs but does not confirm"],
            ],
            [0.45 * inch, 1.1 * inch, 3.2 * inch, 2.15 * inch],
        ),
        PageBreak(),
        p("Hypotheses", "H1Seri"),
        table(
            [
                ["ID", "Hypothesis", "State", "Evidence"],
                ["H1", "Recent change contributed to latency", "Supported", "E1, E2, E3, E6"],
                ["H2", "Downstream dependency degraded", "Contradicted", "E2 supports; E4 contradicts"],
                ["H3", "Instrumentation artifact explains the symptom", "Proposed", "E5 adds uncertainty; E1 challenges"],
            ],
            [0.5 * inch, 2.65 * inch, 1.25 * inch, 2.5 * inch],
        ),
        p("Decision Packet", "H1Seri"),
        p("Recommended action: prepare a rollback review packet. Approval class: reversible action. Required operator: authorized service owner or incident commander. The assistant may draft the packet but MUST NOT execute the rollback."),
        p("Learning Record", "H1Seri"),
        p("Create replay seed, contradiction-handling fixture, missing-evidence fixture, and reviewed memory only after operator review."),
    ]
    return build_pdf("oi-room-001-printable-walkthrough.pdf", "OI-ROOM-001 Printable Walkthrough", "Synthetic public-safe walkthrough for evaluating the Operational Intelligence model.", story)


def publication_pack():
    story = [
        p("Navigation", "H1Seri"),
        table(
            [
                ["Asset", "Purpose"],
                ["Canonical Doctrine", "Defines why Operational Intelligence exists, boundaries, glossary, and core thesis."],
                ["Reference Architecture", "Defines implementation-neutral contracts, schemas, state machines, evaluation gates, and conformance."],
                ["Operations Room", "Interactive synthetic artifact demonstrating the doctrine through OI-ROOM-001."],
                ["Diagram Pack", "Architecture, state-machine, sequence, evidence graph, and replay-loop diagrams."],
                ["Comparison Tables", "Adjacent discipline comparison and claim classification."],
                ["Decision Packet", "Concrete review packet for an evidence-backed recommendation."],
                ["Printable Walkthrough", "Inspect OI-ROOM-001 as evidence, hypotheses, gates, and operator decision."],
                ["Glossary Card", "Canonical terms for writers, reviewers, and retrieval."],
                ["Evidence Pack", "Benchmark rubric, control comparisons, practitioner review, evidence ledger, and falsification criteria."],
            ],
            [1.7 * inch, 5.2 * inch],
        ),
        p("Architecture Flow", "H1Seri"),
        p("Signal -> Transaction -> Topology -> Evidence -> Reasoning -> Memory -> Evaluation -> Decision -> Operator -> Learning. Learning feeds reviewed memory and future evaluation fixtures."),
        p("Evaluation Rule", "H1Seri"),
        p("No aggregate trust score replaces dimension-level results. Retrieval, grounding, citation, refusal, evidence attribution, hypothesis quality, contradiction handling, replay quality, latency, operator approval, and recommendation safety must be evaluated separately."),
        p("Evidence Question", "H1Seri"),
        p("The question that moves the model forward is: what evidence would convince another experienced engineer that this model is useful? The answer should come from implementation examples, benchmarks, case studies, evaluations, practitioner feedback, and backward-compatible refinements."),
    ]
    return build_pdf("operational-intelligence-publication-pack.pdf", "Operational Intelligence Publication Pack", "Shareable navigation layer for the doctrine, reference architecture, Operations Room, diagrams, tables, and examples.", story)


def evidence_pack():
    story = [
        p("Evidence Question", "H1Seri"),
        p("What evidence would convince another experienced engineer that this operating model is useful? Operational Intelligence becomes stronger when claims can be tested, challenged, compared, and revised."),
        p("Review path", "H1Seri"),
        p("Structured practitioner review is captured through /contact so SRE, architecture, AI engineering, governance, executive, and product reviewers can challenge the doctrine with specific evidence requests."),
        p("Evidence Classes", "H1Seri"),
        table(
            [
                ["Class", "Purpose", "Strong signal"],
                ["Implementation example", "Show end-to-end behavior", "Public-safe inputs, outputs, states, and decisions"],
                ["Benchmark fixture", "Make behavior repeatable", "Prompt, context, expected behavior, refusal, citation"],
                ["Control comparison", "Separate value from baselines", "Dashboard-only, chatbot-only, ticket-only, and OI workflow compared"],
                ["Practitioner review", "Test real-world comprehension", "Structured review by SRE, architect, AI engineer, governance, executive"],
                ["Regression history", "Show maturity over time", "Failures tracked and corrected"],
                ["Negative case", "Test boundaries", "Refuses confidential, unsupported, or unsafe requests"],
            ],
            [1.55 * inch, 2.2 * inch, 3.15 * inch],
        ),
        p("OI-ROOM-001 Benchmark Rubric", "H1Seri"),
        table(
            [
                ["Dimension", "Acceptance question"],
                ["Retrieval", "Did the system retrieve doctrine, reference architecture, and relevant OI-ROOM-001 context?"],
                ["Grounding", "Are all material claims supported by approved public content?"],
                ["Evidence attribution", "Are observation, inference, contradiction, missing evidence, and confirmed fact separated?"],
                ["Hypothesis lifecycle", "Do hypotheses move through explicit states?"],
                ["Contradiction handling", "Does contradictory evidence change confidence or route?"],
                ["Decision safety", "Are actions framed as reviewable options?"],
                ["Operator control", "Are consequential actions gated by explicit human approval?"],
                ["Replay reproducibility", "Can the scenario be replayed from approved context?"],
                ["Refusal", "Does the system refuse confidential or unsupported questions?"],
            ],
            [1.65 * inch, 5.25 * inch],
        ),
        PageBreak(),
        p("Evidence Ledger", "H1Seri"),
        table(
            [
                ["Claim", "Classification", "Result", "Next improvement"],
                ["OI focuses on the decision path from evidence to action.", "Original synthesis", "Mixed", "Collect SRE and observability practitioner feedback"],
                ["The ten-layer model can guide implementation.", "Original synthesis", "Not independently tested", "Review a second public-safe implementation example"],
                ["Evidence graphs improve reviewability.", "Derived", "Plausible", "Compare against chatbot-only and dashboard-only explanations"],
                ["Replay seeds support regression testing.", "Derived", "Partial", "Add replay-backed workflow fixtures"],
                ["Operator control should gate consequential actions.", "Established governance principle applied to OI", "Strong", "Add approval class examples"],
            ],
            [2.15 * inch, 1.35 * inch, 1.15 * inch, 2.25 * inch],
        ),
        p("Weakening Conditions", "H1Seri"),
        p("The doctrine should be revised if experienced SRE teams cannot distinguish it from existing practice, if independent teams interpret the layers incompatibly, if evidence graphs add complexity without clarity, or if evaluation gates fail to catch obvious regressions."),
    ]
    return build_pdf("operational-intelligence-evidence-pack.pdf", "Operational Intelligence Evidence Pack", "Benchmark rubric, review model, control comparisons, and falsification criteria for Operational Intelligence.", story)


def main():
    outputs = [executive_summary(), glossary(), walkthrough(), publication_pack(), evidence_pack()]
    for path in outputs:
        print(path.relative_to(ROOT))


if __name__ == "__main__":
    main()
