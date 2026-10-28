import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MEDIA } from "@/lib/media";
import Reveal from "@/components/Reveal";
import FeatureRow from "./FeatureRow";

const STEPS = [
  {
    title: "Your business, your way.",
    desc: "Storefront, pop-up, mobile, or service area — tell us how you work and we'll place you on the map.",
    points: ["Storefront & pop-up", "Mobile & service area"],
    visual: (
      <img
        src={MEDIA.forVendorsStep1}
        alt="Your business, your way"
        className="h-[440px] sm:h-[500px] md:h-[560px] lg:h-[600px] w-auto max-w-full rounded-[16px] object-contain shadow-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-[1.02]"
      />
    ),
  },
  {
    title: "A profile that tells your story.",
    desc: "Show what you offer and what makes you different, in a profile built for neighbors.",
    points: ["Photos & description", "Hours & location"],
    visual: (
      <img
        src={MEDIA.forVendorsStep2}
        alt="A profile that tells your story"
        className="h-[480px] sm:h-[540px] md:h-[620px] lg:h-[650px] w-auto max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:scale-[1.03]"
      />
    ),
  },
  {
    title: "Your offerings, clearly priced.",
    desc: "List what you sell or the services you provide so customers know exactly what to expect.",
    points: ["Products & services", "Clear pricing"],
    visual: (
      <img
        src={MEDIA.forVendorsStep3}
        alt="Your offerings, clearly priced"
        className="h-[480px] sm:h-[540px] md:h-[620px] lg:h-[650px] w-auto max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:scale-[1.03]"
      />
    ),
  },
  {
    title: "Real conversations with customers.",
    desc: "Neighbors reach out through in-app messaging, with your business details right there.",
    points: ["In-app messaging", "Direct connections"],
    visual: (
      <img
        src={MEDIA.forVendorsStep4}
        alt="Real conversations with customers"
        className="h-[480px] sm:h-[540px] md:h-[620px] lg:h-[650px] w-auto max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:scale-[1.03]"
      />
    ),
  },
];

export default function ForVendorsSequence() {
  return (
    <section className="py-28">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.14em] text-muted-foreground">HOW VENDR WORKS FOR YOU</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)]">Everything you need to <em className="italic text-primary">get discovered.</em></h2>
        </Reveal>
        <div className="mt-24 space-y-32">
          {STEPS.map((s, i) => <FeatureRow key={s.title} i={i} {...s} />)}
        </div>
        <Reveal className="mt-32 rounded-[24px] border border-border bg-card px-8 py-16 text-center md:py-20">
          <h2 className="display text-[clamp(2rem,3.6vw,3.2rem)]">Join StreetVendr.</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">Free to join and list. Every founding vendor is reviewed before going live.</p>
          <Link to="/vendors/join" className="btn-primary mt-8">Become a founding vendor <ArrowUpRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}