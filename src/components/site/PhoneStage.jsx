import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Stacks every screen and crossfades to the active one. All images load up front,
// so switching never shows an empty frame while the next screen downloads.
export default function PhoneStage({ shots, active, className = "", imgClassName = "h-[88%] max-w-[88%]" }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      {shots.map((s, i) => {
        const on = i === active;
        return (
          <motion.div
            key={s.src + i}
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{ opacity: on ? 1 : 0, y: reduce || on ? 0 : i < active ? -28 : 28, scale: reduce || on ? 1 : 0.97 }}
            transition={{ duration: 0.75, ease: EASE }}
            aria-hidden={!on}
          >
            <img src={s.src} alt={on ? s.alt : ""} decoding="async" className={s.cover ? "h-full w-full object-cover" : `w-auto object-contain ${imgClassName}`} />
          </motion.div>
        );
      })}
    </div>
  );
}
