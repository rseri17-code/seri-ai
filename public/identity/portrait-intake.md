# Ravikanth Seri Approved Portrait Intake

Updated: 2026-08-24

Status: integrated. The approved portrait was provided directly by Ravikanth Seri with explicit public-use approval (repository commit 07a514f), optimized to the contracted WebP and JPEG paths, and rendered on the home, background, and resume surfaces. Before integration, no approved durable portrait file was present in the repository.

This is the public-safe intake contract for adding a real portrait of Ravikanth Seri to seri.ai.

## Target Asset

| Field | Requirement |
| --- | --- |
| Preferred path | `/identity/ravikanth-seri-portrait.webp` |
| Fallback path | `/identity/ravikanth-seri-portrait.jpg` |
| Minimum source size | `800x800` |
| Alt text | `Portrait of Ravikanth Seri` |
| Usage | Support professional orientation surfaces only; do not let the portrait replace evidence, work, or technical artifacts. |

## Acceptance Criteria

- Source image is explicitly approved by Ravikanth Seri for public use on seri.ai.
- Source image is durable, not a disappearing temporary upload path.
- Image does not include employer logos, badges, confidential screens, internal offices, customer material, or proprietary context.
- Crop keeps the face clear, professional, and not overly stylized.
- Optimized output is under 250 KB unless a future visual QA pass justifies a larger asset.
- Alt text names Ravikanth Seri plainly without promotional language.
- The existing non-photographic identity mark remains available as fallback when the portrait is missing.

## Do Not Use

- unapproved LinkedIn scrape
- temporary clipboard path
- image containing employer branding
- image containing internal screens
- AI-generated replacement portrait
- overly stylized glamour crop
- asset with unclear public-use permission

## Publication Rule

Do not publish a portrait file until the source image is durable and explicitly approved. Until then, keep the public identity mark as the canonical visual anchor and keep the missing portrait gap visible.

## Validation Plan

1. Verify the portrait file exists at the approved public path.
2. Verify dimensions, file size, alt text, and public-safe source note.
3. Run visual QA at mobile, tablet, and desktop widths.
4. Run public-safety scan and rendered-route validation.
5. Update the scorecard only after the portrait renders in the professional identity surfaces.
