import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Fades content up as it scrolls in. It starts a little before the element reaches the
// screen (the bottom margin) so fast scrolling on phones never lands on an empty area.
export default function Reveal({ children, delay = 0, y = 24, className, amount = 0.1 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px 15% 0px" }}
      transition={{ duration: reduce ? 0.3 : 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
