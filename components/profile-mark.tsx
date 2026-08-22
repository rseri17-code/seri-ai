import { BrainCircuit } from "lucide-react";

export function ProfileMark({ size = "md" }: { size?: "sm" | "md" }) {
  const outerSize = size === "sm" ? "h-12 w-12" : "h-16 w-16";
  const textSize = size === "sm" ? "text-sm" : "text-lg";
  const badgeSize = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  const iconSize = size === "sm" ? 12 : 15;

  return (
    <div className={`relative ${outerSize} shrink-0`} role="img" aria-label="Ravikanth Seri identity mark" data-identity-asset="/identity/ravikanth-seri-identity-mark.svg">
      <div className={`grid h-full w-full place-items-center rounded-full border border-mint/35 bg-mint/10 font-semibold ${textSize} text-mint shadow-[0_0_28px_rgba(95,242,181,0.18)]`}>
        RS
      </div>
      <span className={`absolute -bottom-1 -right-1 grid ${badgeSize} place-items-center rounded-full border border-ink bg-mint text-ink`}>
        <BrainCircuit size={iconSize} aria-hidden="true" />
      </span>
    </div>
  );
}
