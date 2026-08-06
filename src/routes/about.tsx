import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2, Target } from "lucide-react";

import { PageHeader } from "@/components/site/site-layout";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { COMMITTEE, EVENT, OBJECTIVES, OUTCOMES } from "@/lib/event-data";

const TITLE = "About | Tech Talent Expo 2026";
const DESCRIPTION =
  "Learn about Tech Talent Expo 2026 — objectives, background, organising committee and expected outcomes of the two-day innovation expo at the University of Vavuniya.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Bridging academia and industry"
        description={`${EVENT.name} is a collaborative two-day technology expo organised by the Students' Union of the Faculty of Technological Studies in partnership with the IEEE Student Branch, University of Vavuniya.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="glass h-full rounded-2xl p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                <Building2 className="size-6" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">Background</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The rapid advancement of technology has created unprecedented opportunities for
                innovation across all sectors — from smart agriculture to intelligent healthcare
                systems. Yet many talented students and innovators lack platforms to showcase their
                ideas and connect with industry professionals.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The Faculty of Technological Studies at the University of Vavuniya, through its
                Students' Union and in collaboration with the IEEE Student Branch, created this
                expo to close that gap — combining a showcase of innovation with practical skills
                training and networking opportunities.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="glass h-full rounded-2xl p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                <Target className="size-6" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">Objectives</h2>
              <ul className="mt-4 space-y-3">
                {OBJECTIVES.map((o) => (
                  <li key={o} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary-glow" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="The team"
          title="Organising committee"
          description="A dedicated team of students from the Students' Union and the IEEE Student Branch working together to make this event a success."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITTEE.map((c, i) => (
            <Reveal key={c.role} delay={(i % 4) * 0.07}>
              <article className="glass glass-hover h-full rounded-2xl p-6">
                <h3 className="text-base font-semibold">{c.role}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-primary-glow">{c.team}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.duty}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Impact"
          title="Expected outcomes"
          description="What we intend the expo to leave behind for participants, the university and the wider ecosystem."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o} delay={(i % 2) * 0.08}>
              <div className="glass glass-hover flex h-full gap-3 rounded-xl p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-glow" />
                <p className="text-sm leading-relaxed text-muted-foreground">{o}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
