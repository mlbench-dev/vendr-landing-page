import React, { useState } from "react";
import { motion } from "framer-motion";
import PhoneStage from "@/components/site/PhoneStage";
import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

const SHOT = { map: MEDIA.appMap, profile: MEDIA.appProfile, controls: MEDIA.appControls, chat: MEDIA.appChat };

// Scroll-driven tour of the real app: copy scrolls on the left while the phone stays pinned.
export default function AppShowcase() {
  const all = useT();
  const t = all.home.showcase;
  const [active, setActive] = useState(0);

  return (
    <section id="inside-the-app" className="relative scroll-mt-16 border-t border-white/5 bg-[#06070a]" aria-labelledby="showcase-title">
      <div className="shell pt-24 md:pt-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="showcase-title" className="display mt-5 text-[clamp(2.3rem,5.4vw,4.4rem)]">{t.title}<em className="italic text-primary">{t.titleEm}</em></h2>
          <p className="lead mt-5 max-w-xl">{t.lead}</p>
        </Reveal>
      </div>

      <div className="shell grid gap-10 pb-24 md:pb-32 lg:grid-cols-2 lg:gap-20">
        <ol>
          {t.steps.map((s, i) => (
            <motion.li
              key={s.k}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6 }}
              className="flex flex-col justify-center py-12 lg:min-h-[78vh] lg:py-0"
            >
              <div className={`transition-opacity duration-500 lg:max-w-md ${active === i ? "lg:opacity-100" : "lg:opacity-35"}`}>
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-tight">{s.title}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
              <div className="mt-8 flex h-[460px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-[540px] lg:hidden">
                <img src={SHOT[s.k]} alt={t.alts[s.k]} loading="lazy" decoding="async" className="h-[88%] w-auto max-w-[88%] object-contain" />
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="relative hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="relative h-[min(80vh,720px)] w-full overflow-hidden rounded-2xl border border-white/10">
              <PhoneStage className="h-full w-full" shots={t.steps.map((s) => ({ src: SHOT[s.k], alt: t.alts[s.k] }))} active={active} imgClassName="h-[88%] max-w-[85%]" />
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
                {t.steps.map((s, i) => <span key={s.k} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-primary" : "w-1.5 bg-white/25"}`} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="shell -mt-16 pb-16 text-sm text-muted-foreground">{all.common.screensNote}</p>
    </section>
  );
}
