import React from "react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/site/PageHero";
import ParallaxImage from "@/components/site/ParallaxImage";
import RecruitBand from "@/components/site/RecruitBand";
import DownloadBand from "@/components/home/DownloadBand";
import { useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { MEDIA } from "@/lib/media";

export default function About() {
  const all = useT();
  const t = all.about;
  usePageMeta(t.metaTitle, t.metaDesc);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} titleEm={t.titleEm} image={MEDIA.aboutHero} alt={t.alt} />
      <section className="shell grid gap-12 py-24 md:grid-cols-[1fr_1.4fr] md:py-32">
        <Reveal><p className="display accent text-[clamp(2rem,4vw,3.2rem)] leading-tight">{all.brand.mission.split(". ")[0]}.<br /><em className="italic text-primary">{all.brand.mission.split(". ").slice(1).join(". ")}</em></p></Reveal>
        <div className="space-y-8">
          <Reveal><p className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug">{t.body}</p></Reveal>
          <Reveal><p className="lead max-w-xl">{t.mission}</p></Reveal>
        </div>
      </section>
      <section className="shell">
        <ParallaxImage src={MEDIA.marketSellers} alt={all.home.mission.alt} className="h-[50vh] min-h-[340px] rounded-2xl border border-white/10" />
      </section>
      <section className="border-b border-white/5">
        <div className="shell grid py-16 md:grid-cols-3">
          {t.values.map(([title, d], i) => (
            <Reveal key={title} delay={i * 0.1} className="border-border py-10 md:px-8 md:first:pl-0 [&:not(:first-child)]:md:border-l">
              <h2 className="font-display text-3xl font-medium">{title}</h2><p className="mt-4 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <RecruitBand image={MEDIA.storefront} />
      <DownloadBand notify={false} />
    </>
  );
}
