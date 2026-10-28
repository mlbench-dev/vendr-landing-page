import React from "react";
import Reveal from "@/components/Reveal";
import { motion, useReducedMotion } from "framer-motion";
import { APP_STORE, PLAY_STORE } from "@/lib/site";
import { MapPin, MessageSquare, Star, ArrowUpRight } from "lucide-react";

export default function ProductChapter() {
  const reduce = useReducedMotion();

  const features = [
    {
      icon: MapPin,
      title: "Interactive Live Map",
      desc: "Track street food carts, weekend farmers markets, and permanent storefronts across Riverside and the IE.",
    },
    {
      icon: MessageSquare,
      title: "Direct Founder Chat",
      desc: "Ask about custom orders, dietary options, or daily specials directly with the people making your food and goods.",
    },
    {
      icon: Star,
      title: "Neighborhood Reviews",
      desc: "Authentic community feedback from real neighbors, keeping our local marketplace honest and trustworthy.",
    },
  ];

  return (
    <section data-cam="product" id="download" className="relative overflow-hidden border-y border-border/50 bg-[#08090d] py-32">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="shell relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold tracking-wider text-primary">
            <span>📱</span> ON THE APP STORE & GOOGLE PLAY
          </div>
          <h2 className="display text-[clamp(2.4rem,4.6vw,4rem)]">
            Find what feels <em className="italic text-primary">local.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Browse independent vendors by city, category, or cravings. Coffee carts, taco stands, bakers, and service businesses are all in one place.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <a href={APP_STORE} target="_blank" rel="noreferrer" className="btn-primary">
              Download on iOS
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={PLAY_STORE} target="_blank" rel="noreferrer" className="btn-secondary">
              Get on Android
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">★ 4.9 Rating · 100% Free · No subscription required</p>
        </Reveal>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.15}>
              <div className="h-full rounded-[20px] border border-white/10 bg-card/60 p-7 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-card/90">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary mb-5">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{f.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* App Showcase Image */}
        <motion.div
          className="mx-auto mt-20 max-w-[840px] overflow-hidden rounded-[24px] border border-white/10 bg-black/40 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.85)] md:p-8"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://media.base44.com/images/public/6ae05834612023d1fc89f742/01d514e4b_VendrBranding.svg"
            alt="Vendr app screens"
            className="w-full h-auto rounded-[16px]"
          />
        </motion.div>
      </div>
    </section>
  );
}