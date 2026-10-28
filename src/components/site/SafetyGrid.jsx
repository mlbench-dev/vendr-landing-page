import React from "react";
import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";

export default function SafetyGrid() {
  const items = useT().safetyItems;
  return (
    <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([title, body], i) => (
        <li key={title}>
          <Reveal delay={i * 0.06} className="h-full border-t border-white/15 pt-6">
            <span className="font-mono text-sm text-white/40">0{i + 1}</span>
            <h3 className="mt-3 font-display text-xl font-medium">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
