import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import JoinButton from "@/components/site/JoinButton";
import { useLp, useT } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

const SLIDES = [MEDIA.heroStreetFood, MEDIA.bandMarket, MEDIA.bandSalon, MEDIA.bandGarage, MEDIA.nightMarket];
const SLIDE_MS = 6500;
const EASE = [0.16, 1, 0.3, 1];

// Splits "Closer than you think." so the last two words get the accent treatment.
const splitHeadline = (s) => {
  const w = s.split(" ");
  return [w.slice(0, -2).join(" "), w.slice(-2).join(" ")];
};

// One headline line that slides up from behind a mask.
function MaskLine({ children, delay, reduce }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: reduce ? 0 : "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.3, delay: reduce ? 0 : delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const all = useT();
  const t = all.home;
  const lp = useLp();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [lead, em] = splitHeadline(all.brand.headline);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // Warm the cache for the next photo so the crossfade never shows a blank frame.
  useEffect(() => {
    const img = new Image();
    img.src = SLIDES[(slide + 1) % SLIDES.length];
  }, [slide]);

  const fade = (d) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay: reduce ? 0 : d, ease: EASE },
  });

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden pb-24 pt-28 md:items-center md:pb-0">
      <motion.div className="absolute inset-0 -z-10 bg-background" style={reduce ? undefined : { y: bgY }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={slide}
            src={SLIDES[slide]}
            alt=""
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.01, delay: 1.9 } }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="kenburns absolute inset-0 h-[115%] w-full object-cover object-[60%_center]"
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-background/45 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,rgba(34,107,247,0.18),transparent_60%)]" />

      <motion.div style={reduce ? undefined : { opacity: fadeOut }} className="shell grid w-full items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <motion.p {...fade(0.1)} className="text-sm text-white/70">{t.live}</motion.p>
          <h1 className="display accent mt-5 text-[clamp(3rem,9vw,7.2rem)] leading-[0.98]">
            <MaskLine delay={0.2} reduce={reduce}>{lead}</MaskLine>
            <MaskLine delay={0.38} reduce={reduce}><em className="italic text-primary">{em}</em></MaskLine>
          </h1>
          <motion.p {...fade(0.6)} className="mt-6 font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium tracking-tight text-white">
            {all.brand.support}
          </motion.p>
          <motion.p {...fade(0.7)} className="lead mt-4 max-w-xl text-white/75">{t.lead}</motion.p>
          <motion.div {...fade(0.85)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <JoinButton className="h-14 px-8 text-base" />
            <Link to={lp("/download")} className="btn-secondary h-14 px-7"><Download className="h-4 w-4" />{all.common.download}</Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: reduce ? 0 : 0.6, ease: EASE }}
          className="relative hidden justify-center lg:flex"
        >
          <motion.img
            src={MEDIA.appProfile}
            alt={t.phoneAlt}
            style={reduce ? undefined : { y: phoneY }}
            className="relative h-[min(68vh,640px)] w-auto drop-shadow-[0_50px_80px_rgba(0,0,0,0.85)]"
            decoding="async"
          />
        </motion.div>
      </motion.div>

      {/* Which kind of business is on screen, with progress through the photos. */}
      <div className="absolute inset-x-0 bottom-6">
        <div className="shell flex items-end justify-between gap-6">
          <p className="text-xs text-white/60" aria-live="off">
            <span className="sr-only">{t.slidesLabel}: </span>
            <AnimatePresence mode="wait">
              <motion.span key={slide} className="inline-block" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.5 }}>
                {t.slides[slide]}
              </motion.span>
            </AnimatePresence>
          </p>
          <div className="flex gap-1.5" aria-hidden="true">
            {SLIDES.map((s, i) => (
              <span key={s} className="h-[3px] w-8 overflow-hidden rounded-full bg-white/20 md:w-12">
                {i === slide && !reduce && (
                  <motion.span className="block h-full bg-white" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: SLIDE_MS / 1000, ease: "linear" }} />
                )}
                {(i < slide || reduce) && <span className="block h-full w-full bg-white/60" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
