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

export function Portrait({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  if (!portraitAvailable()) {
    return <ProfileMark size={size === "lg" ? "md" : size} />;
  }
  const frameSize = size === "sm" ? "h-12 w-12" : size === "md" ? "h-16 w-16" : "h-24 w-24";
  const pixelSize = size === "sm" ? 48 : size === "md" ? 64 : 96;

  return (
    <picture className={`block ${frameSize} shrink-0`}>
      <source srcSet={PORTRAIT_WEBP} type="image/webp" />
      <img
        src={PORTRAIT_JPG}
        alt={PORTRAIT_ALT}
        width={pixelSize}
        height={pixelSize}
        className="h-full w-full rounded-full border border-mint/35 object-cover shadow-[0_0_28px_rgba(95,242,181,0.18)]"
      />
    </picture>
  );
}
