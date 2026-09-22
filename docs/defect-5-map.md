# Homepage surface map (defect pass)

Mapped from `main` before edits. Paths are the files that own each surface.

| Surface | Path |
| --- | --- |
| Homepage | `app/page.tsx` |
| Navbar | `components/header.tsx` (`primaryNav`; Ask is a separate link to `/ask`) |
| Hero | `app/page.tsx` (first `<section>`), portrait in `components/portrait.tsx` |
| 30-second map cards | `components/home-orientation.tsx` (mounted from the hero via `<HomeOrientation />`) |
| Evidence path under the map | `components/evidence-ladder.tsx` |
| Authorized Misfire | `app/page.tsx`, section eyebrow “The failure I design against” |
| Operations Room demo | `components/operations-room-preview.tsx` (homepage), full demo in `app/investigation-room/page.tsx` and `app/simulator/simulator.tsx` |
| Selected work | `app/page.tsx` (`selectedWork`) |
| Selected ideas | `app/page.tsx` renders `homeArticles` from `content/home.ts` → `content/home.json` (`articles[].dek`) |
| Contact | `app/contact/page.tsx` |
| Footer | `components/footer.tsx` |
| Floating “Ask the public record” pill | was `components/ask-dock.tsx`, mounted from `app/layout.tsx` (removed in this pass) |
| Navbar Ask | `components/header.tsx` → `/ask` (`app/ask/page.tsx`, `components/chat.tsx`) |
| About | Nav label About → `/background` (`app/background/page.tsx`). `/about` is a 308 to `/background` in `next.config.ts`. There is no `app/about/page.tsx`. |

Root chrome: `app/layout.tsx` (`Header`, `Footer`, formerly `AskDock`).
