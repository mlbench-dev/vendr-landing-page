import React from "react";
import Reveal from "@/components/Reveal";
import StoreButtons from "@/components/site/StoreButtons";
import NotifyForm from "@/components/site/NotifyForm";
import { useT } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

// "Discover Local. Support Local." with store links, app screens and the launch-updates signup.
export default function DownloadBand({ as: H = "h2", notify = true, image = MEDIA.appScreens, photo = false }) {
  const all = useT();
  const t = all.download;
  const [a, b] = all.brand.support.split(". ");
  return (
    <section id="download" className="relative scroll-mt-16 overflow-hidden border-t border-white/5 bg-black" aria-labelledby="download-title">
      <div className="shell relative grid items-center gap-12 py-24 md:py-32 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">{t.eyebrow}</p>
          <H id="download-title" className="display accent mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
            {a}.<br /><em className="italic text-primary">{b}</em>
          </H>
          <p className="lead mt-6 max-w-lg">{t.lead}</p>
          <StoreButtons className="mt-9" />
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {t.features.map(([x, y]) => (
              <div key={x}><dt className="font-display text-xl font-medium">{x}</dt><dd className="mt-1 text-sm text-muted-foreground">{y}</dd></div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.1} y={60}>
          {photo ? (
            <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-2xl border border-white/10">
              <img src={image} alt={all.home.phoneInHandAlt} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          ) : (
            <img src={image} alt={t.alt} loading="lazy" decoding="async" width="1400" height="1276" className="mx-auto w-full max-w-[640px]" />
          )}
        </Reveal>
      </div>
      {notify && <div className="shell relative pb-24 md:pb-32"><NotifyForm className="max-w-3xl" /></div>}
    </section>
  );
}
