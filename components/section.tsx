import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  level = "h2",
  id,
  children
}: {
  eyebrow?: string;
  title: string;
  level?: "h1" | "h2";
  id?: string;
  children: ReactNode;
}) {
  const Heading = level;

  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20${id ? " scroll-mt-[8.5rem]" : ""}`}>
      <div className="mb-8 max-w-3xl">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase text-mint">{eyebrow}</p> : null}
        <Heading className="text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</Heading>
      </div>
      {children}
    </section>
  );
}
