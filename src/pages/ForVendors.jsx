import React from "react";
import { Link } from "react-router-dom";
import { Check, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/site/PageHero";
import JoinButton from "@/components/site/JoinButton";
import LocationModes from "@/components/site/LocationModes";
import RecruitBand from "@/components/site/RecruitBand";
import VendorExamples from "@/components/site/VendorExamples";
import FeatureRow from "@/components/vendor/FeatureRow";
import { useLp, useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { MEDIA } from "@/lib/media";
import { CONTACT_EMAIL } from "@/lib/site";

export default function ForVendors() {
  const all = useT();
  const t = all.vendors;
  const lp = useLp();
  usePageMeta(t.metaTitle, t.metaDesc);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={all.recruit.title} titleEm={all.recruit.titleEm} lead={t.lead} image={MEDIA.vendorsHero} alt={t.heroAlt}>
        <div className="flex flex-wrap items-center gap-3">
          <JoinButton className="h-14 px-8 text-base" />
          <Link to={lp("/how-it-works")} className="btn-secondary h-14">{all.common.howItWorks}</Link>
        </div>
        <p className="mt-4 text-sm text-white/70">{all.common.freeNote}</p>
      </PageHero>

      <section className="section border-b border-white/5" aria-labelledby="who-title">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 id="who-title" className="display text-[clamp(2rem,4.2vw,3.4rem)]">{t.whoTitle}</h2>
            <p className="lead mt-5 max-w-md">{t.whoLead}</p>
            <ul className="mt-8 space-y-3">
              {t.points.map((p) => <li key={p} className="flex gap-3 text-[16px]"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{p}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2.5">
              {t.whoList.map((w) => (
                <li key={w} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[15px] text-white/90">{w}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <VendorExamples heading={false} limit={4} />

      <section className="section border-t border-white/5" aria-labelledby="features-title">
        <div className="shell">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{t.featuresEyebrow}</p>
            <h2 id="features-title" className="display mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)]">{t.featuresTitle}<em className="italic text-primary">{t.featuresTitleEm}</em></h2>
          </Reveal>
          <div className="mt-20 space-y-28">
            {t.features.map((f, i) => (
              <FeatureRow
                key={f.title}
                i={i}
                title={f.title}
                desc={f.body}
                points={f.points}
                visual={<img src={MEDIA[f.img]} alt="" loading="lazy" decoding="async" className="h-[420px] w-auto max-w-full object-contain sm:h-[500px] md:h-[560px]" />}
              />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">{all.common.screensNote}</p>
        </div>
      </section>

      <LocationModes className="border-t border-white/5" />

      <section className="section border-t border-white/5" aria-labelledby="after-title">
        <div className="shell">
          <Reveal><h2 id="after-title" className="display text-[clamp(2rem,4.2vw,3.4rem)]">{t.afterTitle}</h2></Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {t.after.map(([a, b], i) => (
              <li key={a}><Reveal delay={i * 0.1} className="card-surface h-full p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-white">{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-medium">{a}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
              </Reveal></li>
            ))}
          </ol>
          <div className="mt-10 space-y-3 text-[15px] text-muted-foreground">
            <p>{t.question} <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1 text-foreground underline underline-offset-4"><Mail className="h-4 w-4" />{CONTACT_EMAIL}</a> · <Link to={lp("/contact")} className="text-foreground underline underline-offset-4">{t.questionLink}</Link></p>
            <p className="text-sm">{t.payment}</p>
          </div>
        </div>
      </section>

      <RecruitBand image={MEDIA.bandSalon} secondary={false} />
    </>
  );
}
