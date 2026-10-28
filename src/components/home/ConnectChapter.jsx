import React from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { Compass, Store, Sparkles } from "lucide-react";

export default function ConnectChapter() {
  const cities = [
    "Riverside",
    "San Bernardino",
    "Redlands",
    "Ontario",
    "Corona",
    "Rancho Cucamonga",
    "Fontana",
  ];

  return (
    <section data-cam="connect" className="relative">
      <div className="h-[150vh]">
        <div className="shell sticky top-0 flex h-screen items-center justify-center">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute h-[400px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-10 h-[300px] w-[400px] rounded-full bg-amber-500/15 blur-[120px]" />

          <Reveal amount={0.7} className="glass relative z-10 w-full max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              CONNECTING NEIGHBORS & LOCAL ARTISANS
            </div>
            <h2 className="display text-[clamp(2.4rem,4.4vw,3.8rem)]">
              Good things<br />
              <em className="italic text-primary">happen locally.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
              Free to browse, free to list. We are live in the Inland Empire, with neighborhood coverage expanding with each new founding vendor who sets up their digital cart.
            </p>

            {/* City Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 border-t border-white/10 pt-5">
              {cities.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
                >
                  📍 {city}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
              <Link to="/discover" className="btn-primary">
                <Compass className="h-4 w-4" />
                Explore StreetVendr
              </Link>
              <Link to="/vendors/join" className="btn-secondary">
                <Store className="h-4 w-4" />
                List Your Business
              </Link>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              100% Free to browse · No subscription or transaction cuts · iOS & Android
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}