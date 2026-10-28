import React from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import ParallaxImage from "./ParallaxImage";
import JoinButton from "./JoinButton";
import { useLp, useT } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

// "Your business deserves to be discovered." — the vendor recruitment band used across pages.
export default function RecruitBand({ image = MEDIA.barbershop, secondary = true }) {
  const t = useT().recruit;
  const lp = useLp();
  return (
    <section className="relative isolate overflow-hidden border-y border-white/10" aria-labelledby="recruit-title">
      <ParallaxImage src={image} alt="" className="!absolute inset-0 -z-10" strength={50} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/90 via-transparent to-background/60" />
      <div className="shell py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="recruit-title" className="display mt-5 text-[clamp(2.3rem,5.2vw,4.4rem)]">{t.title}<em className="italic text-primary">{t.titleEm}</em></h2>
          <p className="lead mt-6 max-w-xl text-white/80">{t.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <JoinButton className="h-14 px-8 text-base" />
            {secondary && <Link to={lp("/how-it-works")} className="btn-secondary h-14">{t.secondary}</Link>}
          </div>
        </Reveal>
        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 md:grid-cols-4">
          {t.facts.map(([a, b]) => (
            <div key={a}>
              <dt className="sr-only">{b}</dt>
              <dd><span className="block font-display text-2xl font-medium md:text-3xl">{a}</span><span className="mt-1 block text-sm text-muted-foreground">{b}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
