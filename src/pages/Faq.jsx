import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import RecruitBand from "@/components/site/RecruitBand";
import { useLp, useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { MEDIA } from "@/lib/media";

export default function Faq() {
  const t = useT().faq;
  const lp = useLp();
  usePageMeta(t.metaTitle, t.metaDesc);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} titleEm={t.titleEm}>
        <p className="lead">{t.lead} <Link to={lp("/contact")} className="text-foreground underline underline-offset-4">{t.leadLink}</Link></p>
      </PageHero>
      <section className="shell max-w-4xl pb-28">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {t.items.map(([q, a], i) => (
            <details key={q} className="group py-2" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-[1.25rem] font-medium md:text-[1.45rem] [&::-webkit-details-marker]:hidden">
                {q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-transform duration-300 group-open:rotate-45 group-open:border-primary group-open:text-primary"><Plus className="h-4 w-4" aria-hidden="true" /></span>
              </summary>
              <p className="max-w-[68ch] pb-6 text-[16px] leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <RecruitBand image={MEDIA.streetCart} />
    </>
  );
}
