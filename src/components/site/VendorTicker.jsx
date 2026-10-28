import React from "react";
import { useT } from "@/lib/i18n";

// Slow, endless strip of the kinds of businesses Vendr is for.
export default function VendorTicker() {
  const items = useT().vendors.whoList;
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12" aria-hidden={hidden || undefined}>
      {items.map((w) => (
        <li key={w} className="flex items-center gap-8 whitespace-nowrap font-display text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium tracking-tight text-white/80 md:gap-12">
          {w}<span className="h-2 w-2 rounded-full bg-primary" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group relative overflow-hidden border-y border-white/5 bg-[#06070a] py-7 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="motion-safe-anim flex w-max group-hover:[animation-play-state:paused]" style={{ animation: "marquee 48s linear infinite" }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
