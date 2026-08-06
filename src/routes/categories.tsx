import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/site-layout";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CATEGORIES, TRACKS } from "@/lib/event-data";

const TITLE = "Categories & Domains | Tech Talent Expo 2026";
const DESCRIPTION =
  "Participant categories and the ten project domains of Tech Talent Expo 2026 across the Web & Mobile and IoT & Robotics tracks.";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Categories"
        title="Find where your project fits"
        description="Four participant categories and two technology tracks with five domains each."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Eligibility"
          title="Participant categories"
          description="The expo is open to innovators from all levels and backgrounds."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.08}>
              <article className="glass glass-hover h-full rounded-2xl p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold">{c.name}</h3>
                  <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary-glow">
                    Max {c.maxMembers}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Eligibility. </span>
                  {c.eligibility}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Requirements. </span>
                  {c.requirement}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Tracks"
          title="Ten domains, two tracks"
          description="Projects are evaluated within one track and one domain. Pick the closest fit when registering."
        />

        <div className="mt-12 space-y-10">
          {TRACKS.map((track, ti) => (
            <Reveal key={track.id} delay={ti * 0.08}>
              <div className="glass rounded-3xl p-7 sm:p-9">
                <span className="text-xs uppercase tracking-[0.3em] text-primary-glow">
                  Track {ti + 1}
                </span>
                <h3 className="mt-3 text-2xl font-semibold">{track.name}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {track.blurb}
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {track.domains.map((d) => (
                    <article
                      key={d.name}
                      className="glass-hover rounded-xl border border-border/70 bg-surface-2/40 p-5"
                    >
                      <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-primary-glow">
                        {d.name}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {d.detail}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/register">
              Register your project <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
