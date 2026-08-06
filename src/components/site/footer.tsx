import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import logo from "@/assets/tte-logo.asset.json";
import { EVENT, NAV_LINKS } from "@/lib/event-data";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="Tech Talent Expo 2026 logo"
              className="h-12 w-12 rounded-xl object-cover mix-blend-screen"
              width={48}
              height={48}
              loading="lazy"
            />
            <div>
              <p className="font-display text-base font-bold tracking-widest">
                TECH TALENT EXPO 2026
              </p>
              <p className="text-xs tracking-[0.25em] text-primary-glow">
                {EVENT.tagline.toUpperCase()}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Organised by the {EVENT.organisers[0]} in partnership with the {EVENT.organisers[1]}.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-widest">EXPLORE</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[...NAV_LINKS, { to: "/register", label: "Registration" }].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground transition-colors hover:text-primary-glow"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-widest">CONTACT</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {EVENT.emails.map((email) => (
              <li key={email} className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary-glow" />
                <a href={`mailto:${email}`} className="hover:text-foreground">
                  {email}
                </a>
              </li>
            ))}
            {EVENT.phones.map((phone) => (
              <li key={phone} className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary-glow" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary-glow" />
              <span>{EVENT.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © 2026 Tech Talent Expo · University of Vavuniya. All rights reserved.
      </div>
    </footer>
  );
}
