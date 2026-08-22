# seri.ai Visual QA Evidence

Date: 2026-08-22

Scope: first-viewport browser captures for Home, Start Here, Ask Ravikanth, Operations Room, Work, Background, Canonical Doctrine, Radar, and Evidence Pack.

Viewports:

| Viewport | Size |
| --- | --- |
| Mobile | 390 x 844 |
| Tablet | 768 x 1024 |
| Desktop | 1440 x 1000 |

Artifacts:

- Manifest: `/visual-qa/2026-08-22/viewport-results.json`
- Screenshots: `/visual-qa/2026-08-22/*.png`
- Validation gate: `npm run validate:visual-qa`

Result:

- 27 screenshots captured.
- 9 routes inspected at 3 viewport widths.
- 0 recorded horizontal-overflow findings.
- 0 recorded console-error pages.
- H1 and main content were present for every captured route.

Representative observations:

- Mobile Home keeps Ravikanth Seri, the Operational Intelligence thesis, and primary CTAs in the first viewport.
- Mobile Operations Room shows the live investigation graph in the first viewport.
- Mobile Evidence Pack opens with orientation and contents before the long technical body.
- Desktop routes preserve route identity, proof-led navigation, and technical density without page-level overflow.

Limitations:

- This is first-viewport evidence, not a complete manual scroll-through of every section.
- It does not replace external reviewer feedback.
- The approved portrait or identity asset remains missing because no durable source image is present in the repo.
