import fs from "node:fs";
import path from "node:path";
import { ProfileMark } from "@/components/profile-mark";

const PORTRAIT_WEBP = "/identity/ravikanth-seri-portrait.webp";
const PORTRAIT_JPG = "/identity/ravikanth-seri-portrait.jpg";
const PORTRAIT_ALT = "Portrait of Ravikanth Seri";

function portraitAvailable() {
  try {
    return (
      fs.existsSync(path.join(process.cwd(), "public", PORTRAIT_WEBP.slice(1))) &&
      fs.existsSync(path.join(process.cwd(), "public", PORTRAIT_JPG.slice(1)))
    );
  } catch {
    return false;
  }
}

export function Portrait({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  if (!portraitAvailable()) {
    return <ProfileMark size={size === "lg" || size === "xl" ? "md" : size} />;
  }
  const frameSize =
    size === "sm" ? "h-12 w-12" : size === "md" ? "h-16 w-16" : size === "lg" ? "h-24 w-24" : "h-40 w-40 sm:h-48 sm:w-48";
  const pixelSize = size === "sm" ? 48 : size === "md" ? 64 : size === "lg" ? 96 : 192;

  if (size === "xl") {
    return (
      <span
        className={`relative block shrink-0 overflow-hidden rounded-2xl border border-mint/50 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${frameSize}`}
      >
        <picture className="block h-full w-full">
          <source srcSet={PORTRAIT_WEBP} type="image/webp" />
          <img
            src={PORTRAIT_JPG}
            alt={PORTRAIT_ALT}
            width={pixelSize}
            height={pixelSize}
            className="h-full w-full object-cover"
          />
        </picture>
        {/* Edge vignette pulls the light studio ground into the page. The face stays uncovered.
            The mint wash is a corner grade only — not a duotone on the person. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_48%,rgba(8,10,15,0.55)_100%),linear-gradient(160deg,rgba(95,242,181,0.18),transparent_46%)]"
        />
      </span>
    );
  }

  return (
    <picture className={`block ${frameSize} shrink-0`}>
      <source srcSet={PORTRAIT_WEBP} type="image/webp" />
      <img
        src={PORTRAIT_JPG}
        alt={PORTRAIT_ALT}
        width={pixelSize}
        height={pixelSize}
        className="h-full w-full rounded-full border border-mint/25 object-cover shadow-[0_0_28px_rgba(95,242,181,0.18)]"
      />
    </picture>
  );
}
