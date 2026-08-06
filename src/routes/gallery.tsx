import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/site-layout";
import { Reveal } from "@/components/site/reveal";
import expoHall from "@/assets/gallery-expo-hall.jpg";
import pitching from "@/assets/gallery-pitching.jpg";
import iot from "@/assets/gallery-iot.jpg";
import workshop from "@/assets/gallery-workshop.jpg";

const TITLE = "Gallery | Tech Talent Expo 2026";
const DESCRIPTION =
  "A visual preview of Tech Talent Expo 2026 — project showcasing, pitching sessions, IoT builds and hands-on workshops at the University of Vavuniya.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: GalleryPage,
});

const SHOTS = [
  {
    src: expoHall,
    alt: "Students presenting robotics prototypes at glowing expo booths",
    caption: "Project showcasing floor",
    note: "Booths across both tracks, open to visitors on both days.",
    wide: true,
  },
  {
    src: pitching,
    alt: "A student pitching on stage in front of a large presentation screen",
    caption: "Pitching arena",
    note: "Five-minute pitches judged by an industry panel.",
    wide: false,
  },
  {
    src: iot,
    alt: "Hands assembling an IoT circuit board with sensors and wiring",
    caption: "IoT & Robotics builds",
    note: "Hardware demos with live sensor data.",
    wide: false,
  },
  {
    src: workshop,
    alt: "Students at laptops during a coding workshop in a university lab",
    caption: "Hands-on workshops",
    note: "Parallel Web, Mobile, IoT and Robotics tracks on Day 2.",
    wide: true,
  },
];

function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A look at what awaits"
        description="Tech Talent Expo 2026 is the first edition of this event — these visuals preview the experience. Photos from the expo will be published here after 21 August 2026."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {SHOTS.map((shot, i) => (
            <Reveal key={shot.caption} delay={(i % 2) * 0.08}>
              <figure className="glass glass-hover group h-full overflow-hidden rounded-2xl">
                <div className="relative overflow-hidden">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={1280}
                    height={854}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-72"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                <figcaption className="p-6">
                  <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-primary-glow">
                    {shot.caption}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{shot.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
