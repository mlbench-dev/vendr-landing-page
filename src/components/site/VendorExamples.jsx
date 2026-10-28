import React from "react";
import { MapPin, CircleDashed, Navigation } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { VENDOR_EXAMPLES } from "@/lib/site";

export const LOC_ICON = { pin: MapPin, radius: CircleDashed, live: Navigation };

function ExampleCard({ ex, t, common }) {
  const it = t.items[ex.key];
  const Icon = LOC_ICON[ex.loc];
  return (
    <article className="group relative flex h-full w-[78vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/10 bg-card shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-primary/40 sm:w-auto sm:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={ex.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">{common.example}</span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7fb0ff]">{it.type}</p>
          <h3 className="mt-1.5 font-display text-[1.45rem] font-medium leading-tight text-white">{it.title}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <p className="text-[15px] leading-relaxed text-muted-foreground">{it.line}</p>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/85">
          <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />{common.loc[ex.loc]}
        </span>
      </div>
    </article>
  );
}

// Illustrative business types, clearly labelled as examples rather than listings.
export default function VendorExamples({ heading = true, limit, className = "" }) {
  const all = useT();
  const t = all.examples;
  const items = limit ? VENDOR_EXAMPLES.slice(0, limit) : VENDOR_EXAMPLES;
  return (
    <section className={`section ${className}`} aria-labelledby={heading ? "examples-title" : undefined}>
      {heading && (
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 id="examples-title" className="display mt-5 text-[clamp(2.1rem,4.6vw,3.8rem)]">{t.title}<em className="italic text-primary">{t.titleEm}</em></h2>
            <p className="lead mt-5 max-w-2xl">{t.lead}</p>
          </Reveal>
        </div>
      )}
      <div className="shell mt-12">
        <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {items.map((ex, i) => (
            <li key={ex.key} className="sm:contents">
              <Reveal delay={(i % 4) * 0.08} className="h-full">
                <ExampleCard ex={ex} t={t} common={all.common} />
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">{all.common.examplesNote}</p>
      </div>
    </section>
  );
}
