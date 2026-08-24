# Keyboard Accessibility Walkthrough Notes

Updated: 2026-08-22

Evidence level: source-validated keyboard walkthrough contract; not a screen-reader lab run.

These notes define the repeatable keyboard review path for dense interactive surfaces. They do not replace external reviewer feedback, physical-device checks, or a screen-reader transcript.

## Principle

Keyboard access should preserve the same professional evidence path as pointer interaction: orient, act, inspect feedback, follow sources, and recover context.

## Ask Ravikanth

Visitor task: Open Ask, reach the prompt input, submit a public-safe question, inspect answer status, follow a related source, and recover the public-safe boundary.

Keyboard path:

- Use skip link to reach main content.
- Tab through quick prompts and guide cards without losing visible focus.
- Focus the question input and submit with the labelled Ask button.
- Use answer metadata, citations, and related-page links after the response renders.
- Return to Start Here, Work, or cited source links through normal tab order.

Source evidence:

- `app/layout.tsx` defines skip link and main-content target.
- `components/chat.tsx` exposes labelled input, submit behavior, status text, source links, related artifact links, and visible focus classes.
- `scripts/validate-accessibility.mjs` verifies button/link names, focus-visible styling, reduced motion, responsive navigation, and search labels.
- `scripts/run-evals.mjs` validates Ask fallback, citation, refusal, route, and public-code/credential/portrait routing behavior.

Remaining risks:

- A screen-reader pass must verify announcement order for answer status, sources, and metadata.
- A browser keyboard recording should confirm no focus trap appears after long answers.
- Live model latency and failure states need reviewer observation.

## Operations Room

Visitor task: Start the guided investigation, move through evidence, replay, hypotheses, action gate, and decision packet, then inspect graph fallback meaning without relying on animation alone.

Keyboard path:

- Use skip link to enter the Operations Room content.
- Tab through guided-mode controls, investigation tabs, evidence toggles, and decision packet actions.
- Use labelled buttons and native controls for mode changes and evidence review.
- Inspect observation, inference, contradiction, missing evidence, confirmed fact, and approval-gate text outside the visual graph.
- Use reduced-motion behavior so replay meaning is conveyed by state text, not motion alone.

Source evidence:

- `app/simulator/simulator.tsx` renders labelled investigation controls, evidence state text, hypothesis status, approval gate, and decision packet sections.
- `scripts/validate-accessibility.mjs` verifies named buttons/links, focus-visible styling, reduced-motion support, and SVG labelling rules.
- `scripts/validate-viewport-contracts.mjs` and `scripts/validate-rendered-routes.mjs` guard the route identity, visual contract, and critical rendered content.
- `public/visual-qa/2026-08-22/mobile-touch-walkthroughs.md` records source-validated dense-route walkthrough notes for the Operations Room.

Remaining risks:

- A browser keyboard recording should confirm the exact tab sequence and focus visibility through every Operations Room section.
- A screen-reader pass should verify graph fallback comprehension and section heading order.
- External reviewers should report where the dense investigation surface becomes tiring.
