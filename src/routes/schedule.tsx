import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/site-layout";
import { Reveal } from "@/components/site/reveal";
import { AGENDA, KEY_DATES } from "@/lib/event-data";

const TITLE = "Event Schedule | Tech Talent Expo 2026";
const DESCRIPTION =
  "Full two-day agenda for Tech Talent Expo 2026 on 20 & 21 August 2026 at the University of Vavuniya — pitching, showcasing, workshops and the awards ceremony.";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Two days, end to end"
        description="The event is structured to maximise learning, networking and showcasing opportunities."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KEY_DATES.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.07}>
              <div className="glass rounded-xl p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{d.label}</p>
                <p className="mt-1 text-sm font-semibold">{d.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        {AGENDA.map((day) => (
          <div key={day.day} className="mt-14 first:mt-0">
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-display text-2xl font-bold text-gradient">{day.day}</h2>
                <span className="text-sm text-muted-foreground">{day.date}</span>
              </div>
              <p className="mt-1 text-sm uppercase tracking-[0.25em] text-primary-glow">
                {day.theme}
              </p>
            </Reveal>

            <ol className="relative mt-8 space-y-4 border-l border-border/70 pl-6">
              {day.items.map((item, i) => (
                <Reveal key={item.title} delay={Math.min(i * 0.05, 0.3)}>
                  <li className="relative">
                    <span className="absolute -left-[1.9rem] top-5 size-3 rounded-full bg-primary shadow-[0_0_14px_3px_rgba(160,80,255,0.6)]" />
                    <div className="glass glass-hover rounded-xl p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base font-semibold">{item.title}</h3>
                        <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs text-primary-glow">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </>
  );
}
