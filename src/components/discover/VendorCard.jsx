import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { MEDIA } from "@/lib/media";
import { useLp, useT } from "@/lib/i18n";

export default function VendorCard({ vendor }) {
  const all = useT();
  const lp = useLp();
  return (
    <Link to={lp(`/vendor/${vendor.id}`)} className="group block">
      <div className="relative overflow-hidden rounded-[16px] bg-card">
        <Image src={MEDIA[vendor.image_key] || MEDIA.model} alt={vendor.name} className="aspect-[4/3] w-full transition-transform duration-1000 ease-out group-hover:scale-[1.04]" />
        {vendor.is_concept && <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white/85 backdrop-blur-md">{all.common.example}</span>}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-[1.6rem] leading-tight">{vendor.name}</h3>
          <p className="mt-1 text-[15px] text-muted-foreground">{all.common.categories[vendor.category] || vendor.category} · {all.common.modes[vendor.mode] || vendor.mode} · {vendor.city}</p>
        </div>
        <ArrowUpRight className="mt-2 h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </Link>
  );
}
