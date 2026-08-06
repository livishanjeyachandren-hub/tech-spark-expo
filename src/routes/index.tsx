import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Cpu,
  MapPin,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import logo from "@/assets/tte-logo.asset.json";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/site/particle-field";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CATEGORIES, EVENT, KEY_DATES, PRIZES, STATS, TRACKS } from "@/lib/event-data";

const TITLE = "Tech Talent Expo 2026 | University of Vavuniya";
const DESCRIPTION =
  "Tech Talent Expo 2026 — a two-day project pitching, showcasing and workshop expo at the University of Vavuniya on 20 & 21 August 2026. Register your innovation today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AboutTeaser />
      <TracksSection />
      <CategoriesTeaser />
      <PrizesSection />
      <CtaSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <ParticleField />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-primary-glow"
          >
            <Sparkles className="size-3.5" />
            {EVENT.datesShort} · {EVENT.venue}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-6xl xl:text-7xl"
          >
            <span className="text-gradient">TECH TALENT</span>
            <br />
            <span className="text-foreground">EXPO 2026</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="mt-5 max-w-xl text-lg text-muted-foreground"
          >
            {EVENT.tagline}. A two-day expo where school students, undergraduates, professionals
            and innovators pitch, showcase and build the future of technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild variant="hero" size="lg">
              <Link to="/register">
                Register your project <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/schedule">View the agenda</Link>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-2"
          >
            {KEY_DATES.map((d) => (
              <div key={d.label} className="glass rounded-xl p-4">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  {d.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{d.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute size-72 rounded-full bg-primary/30 blur-[110px] animate-pulse-glow sm:size-96" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 18 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1200 }}
            className="relative"
          >
            <div className="animate-float">
              <img
                src={logo.url}
                alt="Tech Talent Expo 2026 official logo"
                className="w-[min(88vw,30rem)] drop-shadow-[0_25px_60px_rgba(150,80,255,0.5)] mix-blend-screen"
                width={520}
                height={520}
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-border/60 bg-surface/40 py-3">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              <span>Project Pitching</span>
              <span className="text-primary-glow">•</span>
              <span>Project Showcasing</span>
              <span className="text-primary-glow">•</span>
              <span>Hands-on Workshops</span>
              <span className="text-primary-glow">•</span>
              <span>IoT &amp; Robotics</span>
              <span className="text-primary-glow">•</span>
              <span>Web &amp; Mobile</span>
              <span className="text-primary-glow">•</span>
              <span>Networking</span>
              <span className="text-primary-glow">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="glass glass-hover h-full rounded-2xl p-6 text-center">
              <p className="font-display text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutTeaser() {
  const highlights = [
    {
      icon: Rocket,
      title: "Pitch to experts",
      text: "Present your solution to a panel of academics and industry judges in a 5-minute pitch.",
    },
    {
      icon: Cpu,
      title: "Showcase live demos",
      text: "Run your working prototype in a dedicated booth across two full exhibition days.",
    },
    {
      icon: Users,
      title: "Learn hands-on",
      text: "Join parallel workshops in Web Dev, Mobile Dev, IoT and Robotics on Day 2.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="About the expo"
        title="Where academia meets industry"
        description="Organised by the Students' Union – Faculty of Technological Studies in partnership with the IEEE Student Branch, University of Vavuniya."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {highlights.map((h, i) => (
          <Reveal key={h.title} delay={i * 0.1}>
            <article className="glass glass-hover h-full rounded-2xl p-7">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                <h.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Button asChild variant="outline">
          <Link to="/about">
            Read the full story <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}

function TracksSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Project tracks"
        title="Two tracks. Ten domains."
        description="Every project is judged inside one of two technology tracks, each spanning five real-world domains."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {TRACKS.map((track, i) => (
          <Reveal key={track.id} delay={i * 0.12}>
            <article className="glass glass-hover flex h-full flex-col rounded-2xl p-7">
              <span className="text-xs uppercase tracking-[0.3em] text-primary-glow">
                Track {i + 1}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{track.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{track.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {track.domains.map((d) => (
                  <li
                    key={d.name}
                    className="rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {d.name}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-1 text-sm text-primary-glow hover:underline"
                >
                  Explore domains <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CategoriesTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Who can join"
        title="Open to every innovator"
        description="From Grade 6 students to startup founders — there is a category for you."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.08}>
            <article className="glass glass-hover h-full rounded-2xl p-6">
              <h3 className="text-base font-semibold">{c.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.eligibility}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-primary-glow">
                Max {c.maxMembers} members
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PrizesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Recognition"
        title="Rs. 30,000 in cash prizes"
        description="Every participant receives a valuable Certificate of Participation, and the top three teams take home cash awards."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {PRIZES.map((p, i) => (
          <Reveal key={p.place} delay={i * 0.1}>
            <article
              className={`glass glass-hover h-full rounded-2xl p-8 text-center ${
                i === 0 ? "neon-ring" : ""
              }`}
            >
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary-glow">
                {i === 0 ? <Trophy className="size-7" /> : <Award className="size-7" />}
              </span>
              <h3 className="mt-5 font-display text-sm uppercase tracking-[0.25em] text-muted-foreground">
                {p.place}
              </h3>
              <p className="mt-2 font-display text-3xl font-bold text-gradient">{p.amount}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/40 blur-[120px]" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">Be part of innovation.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Registration closes on {EVENT.registrationDeadline}. Demo day is{" "}
              {EVENT.demoDay}. Secure your booth now.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/register">
                  Start registration <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/contact">Talk to the organisers</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-primary-glow" /> {EVENT.dates}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary-glow" /> {EVENT.venue}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
