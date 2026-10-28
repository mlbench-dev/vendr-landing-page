import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Store } from "lucide-react";
import Reveal from "@/components/Reveal";
import JoinButton from "@/components/site/JoinButton";
import { useLp, useT } from "@/lib/i18n";

// Compact "For Neighbors / For Vendors" summary for the home page; the full walkthrough lives on /how-it-works.
export default function PathsTeaser() {
  const all = useT();
  const t = all.how;
  const lp = useLp();
  const paths = [
    ["neighbors", Users, <Link key="n" to={lp("/download")} className="btn-secondary">{t.neighbors.cta}<ArrowRight className="h-4 w-4" /></Link>],
    ["vendors", Store, <JoinButton key="v" />],
  ];
  return (
    <section className="section border-b border-white/5" aria-labelledby="paths-title">
      <div className="shell">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 id="paths-title" className="display mt-5 text-[clamp(2.2rem,4.8vw,4rem)]">{t.title}<em className="italic text-primary">{t.titleEm}</em></h2>
          </div>
          <Link to={lp("/how-it-works")} className="link-quiet shrink-0">{all.common.howItWorks}<ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {paths.map(([k, Icon, cta], idx) => (
            <Reveal key={k} delay={idx * 0.1} className="h-full">
              <article className={`flex h-full flex-col border-t-2 pt-7 ${k === "vendors" ? "border-primary" : "border-white/20"}`}>
                <h3 className="flex items-center gap-2.5 font-display text-2xl font-medium"><Icon className="h-5 w-5 text-white/50" aria-hidden="true" />{t[k].label}</h3>
                <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">{t[k].intro}</p>
                <ol className="mt-7 flex-1 space-y-5">
                  {t[k].steps.map(([title], i) => (
                    <li key={title} className="flex gap-4">
                      <span className="w-5 shrink-0 pt-1 font-mono text-sm text-white/40">{i + 1}</span>
                      <span className="pt-0.5 font-display text-[1.15rem] font-medium leading-snug md:text-[1.25rem]">{title}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8">{cta}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
