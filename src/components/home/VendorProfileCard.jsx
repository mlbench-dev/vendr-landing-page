import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { MEDIA } from "@/lib/media";

const OFFERS = [["Pour-over, single origin", "$5.50"], ["Cortado", "$4.75"], ["Seasonal beans, 12 oz", "$18.00"]];

export default function VendorProfileCard() {
  return (
    <article className="w-full max-w-[440px] overflow-hidden rounded-[22px] border border-white/15 bg-card/90 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={MEDIA.coffee}
          alt="Juniper & Ash Coffee storefront at dusk"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <span className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur-md border border-white/20">
          ✨ Founding Vendor
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md border border-emerald-500/30">
          ● Open Now
        </span>
      </div>
      <div className="space-y-5 p-6 md:p-7">
        <div>
          <h3 className="font-display text-[2.2rem] leading-none text-foreground font-semibold">
            Juniper &amp; Ash Coffee
          </h3>
          <p className="mt-2 text-[15px] text-muted-foreground flex items-center gap-2">
            <span>Small-batch roaster · Storefront</span>
            <span className="text-amber-400 text-xs">★ 4.9 (128 reviews)</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" /> Downtown Riverside
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-emerald-400" /> 7:00 am – 3:00 pm
          </span>
        </div>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {OFFERS.map(([n, p]) => (
            <li key={n} className="flex justify-between py-3 text-[15px]">
              <span className="text-white/90 font-medium">{n}</span>
              <span className="text-primary font-semibold">{p}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">Specialty single-origin &amp; pastries</span>
          <Link
            to="/discover"
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-primary transition-transform hover:translate-x-1"
          >
            View profile <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}