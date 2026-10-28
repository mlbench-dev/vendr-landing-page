import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Store, Sparkles, ChevronDown } from "lucide-react";

export default function HeroChapter() {
  const reduce = useReducedMotion();
  const fade = (d) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay: reduce ? 0 : d, ease: [0.16, 1, 0.3, 1] },
  });

  const categories = [
    { label: "Specialty Coffee", icon: "☕", path: "/discover?category=food_drink" },
    { label: "Street Eats & Tacos", icon: "🌮", path: "/discover?category=food_drink" },
    { label: "Artisan Crafts", icon: "🏺", path: "/discover?category=makers_goods" },
    { label: "Wellness", icon: "🌿", path: "/discover?category=wellness" },
  ];

  return (
    <section data-cam="hero" className="relative h-[100svh] min-h-[660px]">
      <div className="shell relative flex h-full flex-col justify-end pb-12 md:pb-16">
        <motion.div {...fade(0.3)} className="glass max-w-2xl">
          {/* Live Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            LIVE IN THE INLAND EMPIRE, CA
          </div>

          {/* Heading */}
          <motion.h1 {...fade(0.5)} className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">
            Closer than <em className="italic text-primary">you think.</em>
          </motion.h1>

          {/* Description */}
          <motion.p {...fade(0.7)} className="mt-3.5 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
            Discover the independent coffee roasters, street food carts, makers, and small storefronts that define your neighborhood.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...fade(0.9)} className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/discover" className="btn-primary">
              <Compass className="h-4 w-4" />
              Explore Vendors
            </Link>
            <Link to="/vendors" className="btn-secondary">
              <Store className="h-4 w-4" />
              For Vendors
            </Link>
          </motion.div>

          {/* Quick Category Filter Pills */}
          <motion.div {...fade(1.1)} className="mt-6 border-t border-white/10 pt-4">
            <p className="mb-2.5 text-xs uppercase tracking-wider text-white/50 flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3 w-3 text-primary" /> Popular in your area
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.label}
                  to={c.path}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/15 hover:text-white"
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-6 flex justify-end">
          <motion.a
            {...fade(1.4)}
            href="#chapter-enter"
            className="group hidden items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-md transition hover:border-white/25 hover:text-white md:flex"
            aria-label="Scroll to explore"
          >
            <span>Scroll to explore market</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce text-primary" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}