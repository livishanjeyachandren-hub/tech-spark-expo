import type { ReactNode } from "react";

import { Navbar } from "./navbar";
import { Footer } from "./footer";

/** Shared marketing shell: fixed nav, page content, footer. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}

/** Standard page hero used by every inner page. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 py-16 sm:py-20">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-primary-glow">
          {eyebrow}
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {description ? (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
