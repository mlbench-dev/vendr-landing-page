import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users, Store } from "lucide-react";
import JoinButton from "@/components/site/JoinButton";
import PhoneStage from "@/components/site/PhoneStage";
import { useLp, useT } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

const SHOTS = {
  neighbors: [MEDIA.appMap, MEDIA.appProfile, MEDIA.appChat],
  vendors: [MEDIA.appSettings, MEDIA.appControls, MEDIA.appInHand],
};
const ICONS = { neighbors: Users, vendors: Store };

// Two-sided walkthrough: "For Neighbors" / "For Vendors", each step paired with a real app screen.
export default function HowItWorksSection({ as: Heading = "h2", className = "", intro = true }) {
  const all = useT();
  const t = all.how;
  const lp = useLp();
  const reduce = useReducedMotion();
  const [tab, setTab] = useState("neighbors");
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const j = t[tab];

  useEffect(() => {
    if (!auto || reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 5200);
    return () => clearInterval(id);
  }, [auto, reduce, tab]);

  const pickTab = (k) => { setTab(k); setStep(0); };
  const pickStep = (i) => { setStep(i); setAuto(false); };
  const onTabKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const next = tab === "neighbors" ? "vendors" : "neighbors";
      pickTab(next);
      document.getElementById(`tab-${next}`)?.focus();
    }
  };

  return (
    <div className={`shell ${className}`}>
      {intro && (
        <div className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <Heading className="display mt-5 text-[clamp(2.3rem,5.4vw,4.4rem)]">{t.title}<em className="italic text-primary">{t.titleEm}</em></Heading>
          <p className="lead mt-5 max-w-2xl">{t.lead}</p>
        </div>
      )}

      <div role="tablist" aria-label={t.tabsLabel} className="mt-10 inline-flex w-full rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md sm:w-auto">
        {["neighbors", "vendors"].map((k) => {
          const Icon = ICONS[k];
          return (
            <button
              key={k}
              id={`tab-${k}`}
              role="tab"
              aria-selected={tab === k}
              aria-controls={`panel-${k}`}
              tabIndex={tab === k ? 0 : -1}
              onClick={() => pickTab(k)}
              onKeyDown={onTabKey}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-all duration-300 sm:flex-none sm:px-7 ${
                tab === k ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />{t[k].label}
            </button>
          );
        })}
      </div>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <AnimatePresence mode="wait">
            <motion.p key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lead max-w-xl">{j.intro}</motion.p>
          </AnimatePresence>
          <ol className="mt-8 space-y-3">
            {j.steps.map(([title, body], i) => {
              const on = step === i;
              return (
                <li key={`${tab}-${i}`}>
                  <button
                    type="button"
                    onClick={() => pickStep(i)}
                    aria-current={on ? "step" : undefined}
                    className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 md:p-6 ${
                      on ? "border-primary/50 bg-primary/[0.08]" : "border-white/10 bg-card/40 hover:border-white/25"
                    }`}
                  >
                    <div className="flex gap-4">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold transition-colors ${on ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"}`}>{i + 1}</span>
                      <div>
                        <h3 className={`font-display text-[1.25rem] font-medium leading-snug transition-colors md:text-[1.4rem] ${on ? "text-white" : "text-white/75"}`}>{title}</h3>
                        <p className={`mt-2 text-[15px] leading-relaxed text-muted-foreground transition-all duration-500 ${on ? "opacity-100" : "opacity-70 lg:line-clamp-1"}`}>{body}</p>
                      </div>
                    </div>
                    {on && auto && !reduce && (
                      <motion.span key={`${tab}-${i}-bar`} className="absolute bottom-0 left-0 h-0.5 bg-primary" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5.2, ease: "linear" }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {tab === "vendors" ? <JoinButton /> : (
              <Link to={lp("/download")} className="btn-primary">{j.cta}<ArrowRight className="h-4 w-4" /></Link>
            )}
            <p className="text-sm text-muted-foreground">{all.common.screensNote}</p>
          </div>
        </div>

        <div className="relative">
          <PhoneStage
            className="relative h-[480px] rounded-2xl border border-white/10 sm:h-[560px] md:h-[620px]"
            shots={[...SHOTS.neighbors, ...SHOTS.vendors].map((src, i) => ({ src, alt: t.alts[i], cover: src === MEDIA.appInHand }))}
            active={(tab === "vendors" ? 3 : 0) + step}
          />
        </div>
      </div>
    </div>
  );
}
