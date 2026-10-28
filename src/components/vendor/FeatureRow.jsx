import React from "react";
import Reveal from "@/components/Reveal";

export default function FeatureRow({ i, title, desc, points, visual }) {
  const flip = i % 2 === 1;
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <Reveal className={flip ? "md:order-2" : ""}>
        <span className="inline-flex h-8 items-center rounded-full border border-border px-3 text-xs tracking-[0.14em] text-muted-foreground">0{i + 1}</span>
        <h3 className="display mt-6 text-[clamp(1.9rem,3vw,2.8rem)]">{title}</h3>
        <p className="mt-4 max-w-md text-muted-foreground">{desc}</p>
        <ul className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[15px]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />{p}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1} className={flip ? "md:order-1" : ""}>
        <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black p-4 sm:min-h-[560px] md:min-h-[620px]">
          <div className="relative flex w-full items-center justify-center">{visual}</div>
        </div>
      </Reveal>
    </div>
  );
}
