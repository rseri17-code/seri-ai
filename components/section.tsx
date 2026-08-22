import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  level = "h2",
  children
}: {
  eyebrow?: string;
  title: string;
  level?: "h1" | "h2";
  children: ReactNode;
}) {
  const Heading = level;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-8 max-w-3xl">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase text-mint">{eyebrow}</p> : null}
        <Heading className="text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</Heading>
      </div>
      {children}
    </section>
  );
}
