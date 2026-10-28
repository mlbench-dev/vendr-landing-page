import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Header for inner pages. With `image`, renders a cinematic full-bleed photo behind the copy.
export default function PageHero({ eyebrow, title, titleEm, lead, image, alt = "", children, as: H = "h1" }) {
  const reduce = useReducedMotion();
  const fade = (d) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: reduce ? 0 : d, ease: [0.16, 1, 0.3, 1] },
  });

  const copy = (
    <div className="max-w-3xl">
      {eyebrow && <motion.p {...fade(0.05)} className="eyebrow">{eyebrow}</motion.p>}
      <motion.div {...fade(0.15)}>
        <H className="display mt-5 text-[clamp(2.4rem,6vw,4.6rem)]">
          {title}{titleEm && <em className="italic text-primary">{titleEm}</em>}
        </H>
      </motion.div>
      {lead && <motion.p {...fade(0.3)} className="lead mt-6 max-w-2xl">{lead}</motion.p>}
      {children && <motion.div {...fade(0.45)} className="mt-9">{children}</motion.div>}
    </div>
  );

  if (!image) return <section className="shell pb-12 pt-32 md:pb-16 md:pt-44">{copy}</section>;

  return (
    <section className="grain relative flex min-h-[78svh] items-end overflow-hidden pb-14 pt-32 md:min-h-[86svh] md:pb-20">
      <div className="absolute inset-0">
        <img src={image} alt={alt} className="kenburns h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
      </div>
      <div className="shell relative">{copy}</div>
    </section>
  );
}
