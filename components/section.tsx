import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  children
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase text-mint">{eyebrow}</p> : null}
        <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
