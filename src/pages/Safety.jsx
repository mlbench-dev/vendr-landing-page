import React from "react";
import { Link } from "react-router-dom";
import { Eye, CircleDashed, EyeOff, MessageCircle, Flag, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/site/PageHero";
import SafetyGrid from "@/components/site/SafetyGrid";
import LocationModes from "@/components/site/LocationModes";
import RecruitBand from "@/components/site/RecruitBand";
import { useLp, useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { MEDIA } from "@/lib/media";
import { CONTACT_EMAIL } from "@/lib/site";

const CONTROL_ICONS = [Eye, CircleDashed, EyeOff, MessageCircle];

export default function Safety() {
  const all = useT();
  const t = all.safety;
  const lp = useLp();
  usePageMeta(t.metaTitle, t.metaDesc);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} titleEm={t.titleEm} lead={t.lead} />
      <section className="shell pb-20"><SafetyGrid /></section>

      <section className="section border-t border-white/5" aria-labelledby="controls-title">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Reveal><h2 id="controls-title" className="display text-[clamp(2rem,4.2vw,3.4rem)]">{t.controlsTitle}</h2></Reveal>
            <ul className="mt-10 space-y-4">
              {t.controls.map(([a, b], i) => {
                const Icon = CONTROL_ICONS[i];
                return (
                  <li key={a}><Reveal delay={i * 0.06} className="flex gap-4 rounded-2xl border border-white/10 bg-card/50 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                    <div><h3 className="text-[17px] font-semibold">{a}</h3><p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{b}</p></div>
                  </Reveal></li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">{t.controlsNote}</p>
            <p className="mt-2 text-sm text-muted-foreground">{all.privacyNote}</p>
          </div>
          <Reveal delay={0.1} className="flex h-[520px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-[600px]">
            <img src={MEDIA.appControls} alt={all.home.showcase.alts.controls} loading="lazy" decoding="async" className="h-[88%] w-auto object-contain" />
          </Reveal>
        </div>
      </section>

      <LocationModes className="border-t border-white/5" />

      <section className="section border-t border-white/5">
        <div className="shell grid gap-6 md:grid-cols-2">
          <Reveal className="card-surface h-full p-8">
            <h2 className="font-display text-3xl font-medium">{t.tipsTitle}</h2>
            <ul className="mt-6 space-y-3">
              {t.tips.map((tip) => <li key={tip} className="flex gap-3 text-[15px] text-white/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{tip}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="card-surface h-full p-8">
            <Flag className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-medium">{t.reportTitle}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{t.reportBody}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-6 inline-flex items-center gap-2 text-[15px] text-foreground underline underline-offset-4"><Mail className="h-4 w-4" />{CONTACT_EMAIL}</a>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm text-muted-foreground">
              {t.legal} <Link to={lp("/privacy")} className="text-foreground underline underline-offset-4">{t.privacy}</Link> · <Link to={lp("/terms")} className="text-foreground underline underline-offset-4">{t.terms}</Link>
            </p>
          </Reveal>
        </div>
      </section>

      <RecruitBand image={MEDIA.bandGarage} />
    </>
  );
}
