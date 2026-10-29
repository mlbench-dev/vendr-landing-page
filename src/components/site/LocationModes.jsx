import React from "react";
import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { LOC_ICON } from "./VendorExamples";

// Dark map tile shared by the three illustrations.
function MapTile({ children }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      <rect width="320" height="180" fill="#101318" />
      <g stroke="#1d232d" strokeWidth="10" fill="none">
        <path d="M-10 60 L330 40" /><path d="M-10 140 L330 120" /><path d="M80 -10 L60 190" /><path d="M230 -10 L250 190" />
      </g>
      <g stroke="#171c24" strokeWidth="4" fill="none">
        <path d="M-10 100 L330 82" /><path d="M150 -10 L160 190" /><path d="M20 -10 L0 190" /><path d="M300 -10 L310 190" />
      </g>
      {children}
    </svg>
  );
}

const Pin = () => (
  <MapTile>
    <ellipse cx="160" cy="118" rx="14" ry="4" fill="#000" opacity="0.5" />
    <path d="M160 116c-2-6-20-22-20-38a20 20 0 0 1 40 0c0 16-18 32-20 38z" fill="#226BF7" />
    <circle cx="160" cy="78" r="7" fill="#fff" />
  </MapTile>
);

const Radius = () => (
  <MapTile>
    <circle cx="160" cy="92" r="58" fill="#226BF7" opacity="0.2" />
    <circle cx="160" cy="92" r="58" fill="none" stroke="#5b8fff" strokeOpacity="0.6" strokeDasharray="4 6" />
    <circle cx="160" cy="92" r="3" fill="#5b8fff" opacity="0.8" />
  </MapTile>
);

const Live = () => (
  <MapTile>
    <path d="M70 140 C 120 120, 150 100, 160 92 S 230 60, 260 50" stroke="#226BF7" strokeOpacity="0.35" strokeWidth="3" strokeDasharray="2 7" fill="none" strokeLinecap="round" />
    <g className="motion-safe-anim" style={{ animation: "drift 6s ease-in-out infinite" }}>
      <circle cx="160" cy="92" r="26" fill="#226BF7" opacity="0.25" className="motion-safe-anim" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "radar 2.4s ease-out infinite" }} />
      <circle cx="160" cy="92" r="16" fill="#226BF7" opacity="0.25" />
      <circle cx="160" cy="92" r="7" fill="#226BF7" stroke="#fff" strokeWidth="2.5" />
    </g>
  </MapTile>
);

const ART = { pin: Pin, radius: Radius, live: Live };

export default function LocationModes({ className = "" }) {
  const all = useT();
  const t = all.locModes;
  return (
    <section className={`section ${className}`} aria-labelledby="loc-title">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="loc-title" className="display mt-5 text-[clamp(2.1rem,4.6vw,3.8rem)]">{t.title}<em className="italic text-primary">{t.titleEm}</em></h2>
          <p className="lead mt-5 max-w-2xl">{t.lead}</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {["pin", "radius", "live"].map((k, i) => {
            const Art = ART[k];
            const Icon = LOC_ICON[k];
            return (
              <Reveal key={k} delay={i * 0.1} className="h-full">
                <article className="card-surface flex h-full flex-col overflow-hidden">
                  <div className="aspect-[16/9] border-b border-white/10"><Art /></div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className="flex items-center gap-2 text-sm text-white/50"><Icon className="h-4 w-4" aria-hidden="true" />{t[k].tag}</p>
                    <h3 className="mt-3 font-display text-2xl font-medium">{t[k].title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{t[k].body}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8 max-w-3xl space-y-2 text-sm text-muted-foreground">
          <p>{t.note}</p>
          <p>{all.privacyNote}</p>
        </div>
      </div>
    </section>
  );
}
