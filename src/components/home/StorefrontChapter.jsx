import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import VendorProfileCard from "./VendorProfileCard";

export default function StorefrontChapter() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(scrollYProgress, [0.25, 0.6], ["inset(46% 46% 46% 46% round 6px)", "inset(0% 0% 0% 0% round 6px)"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.85, 1], [0, 1, 1, 0.6]);

  return (
    <section ref={ref} data-cam="storefront" className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="shell relative grid items-center gap-10 md:grid-cols-2">
          <motion.div style={{ opacity: reduce ? 1 : textOpacity }} className="glass max-w-lg space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-amber-300">
              <span>★</span> FEATURED LOCAL FOUNDING VENDOR
            </div>
            <h2 className="display text-[clamp(2rem,3.4vw,2.8rem)]">Meet your new favorite.</h2>
            <p className="text-[16px] leading-relaxed text-muted-foreground">
              Every cart, pop-up stall, and neighborhood storefront on StreetVendr opens into a genuine story — what they craft, when they're open, and direct navigation to find them.
            </p>
            <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs font-medium text-white/80">
              <span className="flex items-center gap-1.5">✓ Live hours & directions</span>
              <span className="flex items-center gap-1.5">✓ Direct founder contact</span>
              <span className="flex items-center gap-1.5">✓ Transparent prices</span>
              <span className="flex items-center gap-1.5">✓ Zero listing markups</span>
            </div>
          </motion.div>
          <motion.div style={reduce ? {} : { clipPath: clip, opacity }} className="flex justify-center md:justify-end">
            <VendorProfileCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}