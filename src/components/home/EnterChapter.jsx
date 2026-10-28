import React from "react";
import Reveal from "@/components/Reveal";
import { Sparkles, MapPin, Coffee, ShieldCheck } from "lucide-react";

export default function EnterChapter() {
  return (
    <section id="chapter-enter" data-cam="enter" className="relative h-[170vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="shell flex justify-end">
          <Reveal className="glass max-w-lg text-left md:text-right" amount={0.6}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              INLAND EMPIRE NIGHT MARKETS & SIDEWALKS
            </div>
            <h2 className="display text-[clamp(2rem,3.4vw,2.8rem)]">
              A world of <em className="italic text-primary">local favorites.</em>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              From sunrise single-origin pour-overs to late-night birria pop-ups and artisan ceramicists, uncover the passionate makers defining the culture of our region.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 border-t border-white/10 pt-4 justify-start md:justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-primary" /> 15+ Cities Covered
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                <Coffee className="h-3 w-3 text-amber-400" /> 100% Independent
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                <ShieldCheck className="h-3 w-3 text-emerald-400" /> Verified Vendors
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}