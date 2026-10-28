import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/site/ParallaxImage";
import { useLp, useT } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

// "You matter. Your work matters." — the mission statement, set large.
export default function Mission({ image = MEDIA.marketSellers }) {
  const all = useT();
  const t = all.home.mission;
  const lp = useLp();
  const [a, ...rest] = all.brand.mission.split(". ");
  return (
    <section className="section" aria-labelledby="mission-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="mission-title" className="display accent mt-6 text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[1.02]">
            {a}.<br /><em className="italic text-primary">{rest.join(". ")}</em>
          </h2>
          <p className="lead mt-8 max-w-lg">{t.body}</p>
          <Link to={lp("/about")} className="btn-secondary mt-9">{t.cta}<ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <Reveal delay={0.1}>
          <ParallaxImage src={image} alt={t.alt} className="aspect-[4/5] rounded-2xl border border-white/10 sm:aspect-[5/4] lg:aspect-[4/5]" />
        </Reveal>
      </div>
    </section>
  );
}
