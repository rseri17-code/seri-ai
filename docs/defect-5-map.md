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
| Floating “Ask the public record” pill | was `components/ask-dock.tsx`, mounted from `app/layout.tsx`. Removed on main in the 2026-09-22 defect pass. No alternate mount, feature flag, or `data-ask-dock` remains. `Chat` still has an unmounted `dock` variant because viewport/coherence validators require that branch. `content/ask.json` `askDockRoutes` stays because `validate-content` requires the field. `shouldShowAskDock` was unused and is removed. |
| Ask API | `app/api/ask/route.ts`, client `components/chat.tsx`, guards `lib/production-guards.ts`, synthesis `lib/ask-answer.ts` and `lib/ask-llm.ts` |
| JSON-LD | `components/structured-data.tsx`, mounted from `app/layout.tsx` |
| robots | `app/robots.ts` (App Router metadata route, not `public/robots.txt`) |
| Homepage prerender | `app/page.tsx` (static). Built HTML is `.next/server/app/index.html`. Live document is about 112KB: ~46KB markup and ~60KB RSC flight, plus ~6KB JSON-LD duplicated in that flight. |
| Navbar Ask | `components/header.tsx` → `/ask` (`app/ask/page.tsx`, `components/chat.tsx`) |
| About | Nav label About → `/background` (`app/background/page.tsx`). `/about` is a 308 to `/background` in `next.config.ts`. There is no `app/about/page.tsx`. |

Root chrome: `app/layout.tsx` (`Header`, `Footer`, formerly `AskDock`).
