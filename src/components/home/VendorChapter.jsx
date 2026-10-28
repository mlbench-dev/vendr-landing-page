import React from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import VendorDashboard from "@/components/vendor/VendorDashboard";
import { Store, ArrowRight, CheckCircle2 } from "lucide-react";

export default function VendorChapter() {
  const perks = [
    "Zero commission on your direct sales",
    "Real-time location & pop-up hours",
    "Direct in-app messaging with neighbors",
    "Verified founding vendor profile badge",
  ];

  return (
    <section data-cam="vendor" className="relative min-h-[130vh]">
      <div className="shell relative grid items-center gap-14 py-[22vh] lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="glass max-w-lg">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary">
            <Store className="h-3.5 w-3.5" />
            FOR INDEPENDENT MAKERS & MERCHANTS
          </div>
          <h2 className="display text-[clamp(2.2rem,3.6vw,3.2rem)]">
            Your business, <em className="italic text-primary">discovered.</em>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Manage your profile, offerings and prices, hours, and conversations with neighbors — wherever you do your thing.
          </p>
          <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-white/90">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/vendors/join" className="btn-primary">
              Become a Vendor
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/how-it-works" className="link-quiet text-sm">
              How it works
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center lg:justify-end">
          <VendorDashboard />
        </Reveal>
      </div>
    </section>
  );
}