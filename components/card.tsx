import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`premium-card rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-glow ${className}`}>{children}</div>;
}
