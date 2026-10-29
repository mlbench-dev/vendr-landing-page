import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Truck, Scissors, Wrench, ShoppingBasket, Sparkles, UtensilsCrossed, Palette, Flower2, MapPin, MessageCircle, Navigation } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

const PHASE_MS = 4200;
const EASE = [0.16, 1, 0.3, 1];
const USER = { x: 47, y: 50 };

// Example vendors placed on the illustrated map (percent positions).
const PINS = [
  { k: "maker", icon: Palette, x: 14, y: 30, area: true },
  { k: "popup", icon: UtensilsCrossed, x: 34, y: 17 },
  { k: "barber", icon: Scissors, x: 71, y: 33, target: true },
  { k: "market", icon: ShoppingBasket, x: 88, y: 18 },
  { k: "wellness", icon: Flower2, x: 21, y: 60 },
  { k: "mechanic", icon: Wrench, x: 30, y: 82, area: true },
  { k: "beauty", icon: Sparkles, x: 80, y: 78, area: true },
];
const TARGET = PINS.find((p) => p.target);

function MapBackground() {
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="800" height="800" fill="#0c1016" />
      <path d="M-20 610 C 160 560, 300 640, 470 600 S 720 520, 820 560 L 820 680 C 700 650, 560 720, 420 700 S 140 660, -20 720 Z" fill="#0d1a2b" />
      <ellipse cx="170" cy="250" rx="110" ry="70" fill="#10261b" />
      <ellipse cx="640" cy="170" rx="80" ry="55" fill="#10261b" />
      <g stroke="#19202b" strokeWidth="16" fill="none" strokeLinecap="round">
        <path d="M-20 140 L820 100" /><path d="M-20 420 L820 380" /><path d="M200 -20 L160 820" /><path d="M560 -20 L600 820" /><path d="M-20 760 L820 730" />
      </g>
      <g stroke="#141a23" strokeWidth="6" fill="none">
        <path d="M-20 280 L820 245" /><path d="M-20 530 L820 495" /><path d="M380 -20 L370 820" /><path d="M60 -20 L20 820" /><path d="M720 -20 L760 820" />
        <path d="M-20 60 L820 30" /><path d="M280 -20 L260 820" /><path d="M470 -20 L480 820" />
      </g>
      <g fill="#2a3342" fontSize="15" fontFamily="ui-sans-serif, system-ui" letterSpacing="3">
        <text x="404" y="210">DOWNTOWN</text>
        <text x="80" y="470">MAGNOLIA</text>
        <text x="610" y="300">UNIVERSITY</text>
      </g>
    </svg>
  );
}

function Pin({ p, i, show, dim, picked, labels }) {
  const Icon = p.icon;
  return (
    <motion.div
      className="absolute"
      style={{ left: `${p.x}%`, top: `${p.y}%` }}
      initial={false}
      animate={{ opacity: show ? (dim ? 0.3 : 1) : 0, scale: show ? (picked ? 1.2 : 1) : 0.3 }}
      transition={{ duration: 0.6, delay: show && !dim ? 0.25 + i * 0.09 : 0, ease: EASE }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        {p.area && <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#5b8fff]/50 bg-[#226BF7]/20 sm:h-28 sm:w-28" />}
        {picked && <span className="motion-safe-anim absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50" style={{ animation: "radar 1.8s ease-out infinite" }} />}
        <span className={`relative flex h-10 w-10 items-center justify-center rounded-full border shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-colors duration-500 ${picked ? "border-white/40 bg-primary text-white" : "border-white/15 bg-[#1a1f29] text-white/90"}`}>
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        {p.area && <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-[#9bbcff]">{labels.area}</span>}
      </div>
    </motion.div>
  );
}

function LiveTruck({ show, dim, reduce, label }) {
  return (
    <motion.div
      className="absolute left-[55%] top-[14%]"
      initial={false}
      animate={{ opacity: show ? (dim ? 0.3 : 1) : 0 }}
      transition={{ duration: 0.6, delay: show && !dim ? 0.2 : 0 }}
    >
      <motion.div
        animate={reduce ? undefined : { x: [0, -50, -90, -40, 0], y: [0, 14, 44, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
        <span className="motion-safe-anim absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40" style={{ animation: "radar 2.2s ease-out infinite" }} />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-white">
          <Truck className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">● {label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Animated illustration of finding a vendor: explore the map, pick a pin, message the vendor.
export default function DiscoveryDemo({ className = "" }) {
  const all = useT();
  const t = all.home.demo;
  const ex = all.examples.items.barber;
  const reduce = useReducedMotion();
  const stage = useRef(null);
  const inView = useInView(stage, { amount: 0.4 });
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const shown = reduce ? 2 : phase;

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setTimeout(() => {
      if (phase === 2) { setPhase(0); setCycle((c) => c + 1); } else setPhase(phase + 1);
    }, phase === 2 ? PHASE_MS + 1600 : PHASE_MS);
    return () => clearTimeout(id);
  }, [phase, inView, reduce]);

  const [seen, setSeen] = useState(false);
  useEffect(() => { if (inView) setSeen(true); }, [inView]);
  const live = seen || reduce;
  const pick = (i) => { setPhase(i); if (i === 0) setCycle((c) => c + 1); };

  return (
    <section className={`section relative overflow-hidden ${className}`} aria-labelledby="demo-title">
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
        <Reveal className="lg:col-start-1 lg:row-start-1">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 id="demo-title" className="display mt-5 text-[clamp(2.2rem,4.8vw,4rem)]">{t.title}<em className="italic text-primary">{t.titleEm}</em></h2>
            <p className="lead mt-5 max-w-md">{t.lead}</p>
        </Reveal>
        <Reveal delay={0.1} y={40} className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div ref={stage} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 sm:aspect-[5/4]" aria-hidden="true">
            <MapBackground />

            {/* Search radius around the user */}
            <motion.span
              key={`ring-${cycle}`}
              className="absolute aspect-square w-[72%] rounded-full border border-primary/40 bg-[radial-gradient(circle,rgba(34,107,247,0.12),rgba(34,107,247,0.03)_70%)]"
              style={{ left: `${USER.x}%`, top: `${USER.y}%`, x: "-50%", y: "-50%" }}
              initial={{ scale: reduce ? 1 : 0, opacity: 0 }}
              animate={live ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            <motion.span
              className="absolute rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur"
              style={{ left: `${USER.x}%`, top: `${USER.y + 4}%`, x: "-50%" }}
              initial={false}
              animate={{ opacity: live ? 1 : 0 }}
              transition={{ delay: 0.8 }}
            >
              {t.within}
            </motion.span>

            {/* The user */}
            <div className="absolute" style={{ left: `${USER.x}%`, top: `${USER.y}%` }}>
              <div className="-translate-x-1/2 -translate-y-1/2">
                <span className="motion-safe-anim absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/40" style={{ animation: "radar 2s ease-out infinite" }} />
                <span className="relative block h-5 w-5 rounded-full border-[3px] border-white bg-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.8)]" />
              </div>
            </div>

            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
              <motion.path
                key={`route-${cycle}`}
                d={`M ${USER.x} ${USER.y} Q ${(USER.x + TARGET.x) / 2 + 6} ${USER.y - 2}, ${TARGET.x} ${TARGET.y}`}
                fill="none"
                stroke="#226BF7"
                strokeWidth="0.6"
                strokeDasharray="1.4 1.4"
                vectorEffect="non-scaling-stroke"
                style={{ strokeWidth: 3 }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={shown >= 1 && live ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            </svg>

            {PINS.map((p, i) => (
              <Pin key={p.k} p={p} i={i} show={live} dim={shown >= 1 && !p.target} picked={shown >= 1 && p.target} labels={t} />
            ))}
            <LiveTruck show={live} dim={shown >= 1} reduce={reduce} label={t.live} />

            {/* Selected vendor card */}
            <AnimatePresence>
              {shown === 2 && live && (
                <motion.div
                  key={`card-${cycle}`}
                  className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-[#0e1218]/95 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[330px]"
                  initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : 20 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <div className="flex gap-3">
                    <img src={MEDIA.barber} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7fb0ff]">{ex.type}<span className="rounded-full bg-white/10 px-1.5 py-px text-[9px] text-white/70">{all.common.example}</span></p>
                      <p className="mt-0.5 truncate font-display text-[17px] font-medium text-white">{ex.title}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{t.distance} · {all.common.loc.pin}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <motion.p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-[13px] text-white" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 0.7 }}>{t.message}</motion.p>
                    <motion.p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-[13px] text-white/90" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 1.9 }}>{t.reply}</motion.p>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[13px] font-medium">
                    <span className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-primary text-white"><MessageCircle className="h-3.5 w-3.5" />{t.chat}</span>
                    <span className="flex h-9 items-center justify-center gap-1.5 rounded-full border border-white/15 text-white/85"><Navigation className="h-3.5 w-3.5" />{t.directions}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
        <div className="lg:col-start-1 lg:row-start-2">
          <ol className="space-y-2 lg:mt-9">
            {t.steps.map(([title, body], i) => {
              const on = shown === i;
              return (
                <li key={title}>
                  <button type="button" onClick={() => pick(i)} aria-current={on ? "step" : undefined} className={`relative w-full overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors duration-500 ${on ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`}>
                    <div className="flex gap-4">
                      <span className={`mt-0.5 font-mono text-sm transition-colors ${on ? "text-primary" : "text-white/30"}`}>0{i + 1}</span>
                      <div>
                        <h3 className={`font-display text-xl font-medium transition-colors duration-500 ${on ? "text-white" : "text-white/45"}`}>{title}</h3>
                        <p className={`mt-1 text-[15px] leading-relaxed transition-colors duration-500 ${on ? "text-muted-foreground" : "text-muted-foreground/50"}`}>{body}</p>
                      </div>
                    </div>
                    {on && !reduce && inView && (
                      <motion.span key={`${cycle}-${i}`} className="absolute bottom-0 left-0 h-0.5 bg-primary" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: (i === 2 ? PHASE_MS + 1600 : PHASE_MS) / 1000, ease: "linear" }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">{t.note}</p>
        </div>

      </div>
    </section>
  );
}
