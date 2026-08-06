import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/site/site-layout";
import { Reveal } from "@/components/site/reveal";
import { EVENT } from "@/lib/event-data";

const TITLE = "Contact | Tech Talent Expo 2026";
const DESCRIPTION =
  "Get in touch with the Tech Talent Expo 2026 organising committee at the University of Vavuniya — email, phone and enquiry form.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const valid = name.trim().length > 1 && email.includes("@") && message.trim().length > 9;

  /** Opens the visitor's mail client with a prefilled enquiry to the committee. */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${EVENT.emails[0]}?subject=${encodeURIComponent(
      subject.trim() || "Tech Talent Expo 2026 enquiry",
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the committee"
        description="Questions about eligibility, submissions, workshops or partnerships? Reach the organising team directly."
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="space-y-4">
            <div className="glass rounded-2xl p-7">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                <Mail className="size-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold">Email</h2>
              <ul className="mt-2 space-y-1">
                {EVENT.emails.map((e) => (
                  <li key={e}>
                    <a
                      href={`mailto:${e}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary-glow"
                    >
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-7">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                <Phone className="size-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold">Phone</h2>
              <ul className="mt-2 space-y-1">
                {EVENT.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary-glow"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-7">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                <MapPin className="size-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold">Venue</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {EVENT.address}
                <br />
                {EVENT.dates}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 sm:p-9">
            <h2 className="text-xl font-semibold">Send an enquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This opens your email app with the message ready to send to the committee.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="c-name">Full name</Label>
                <Input
                  id="c-name"
                  value={name}
                  maxLength={100}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  value={email}
                  maxLength={255}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="c-subject">Subject</Label>
                <Input
                  id="c-subject"
                  value={subject}
                  maxLength={140}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this about?"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="c-message">Message</Label>
                <Textarea
                  id="c-message"
                  value={message}
                  maxLength={1500}
                  rows={6}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help…"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="mt-7" disabled={!valid}>
              Send message <Send className="size-4" />
            </Button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
