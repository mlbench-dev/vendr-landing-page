import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import DiscoverChips from "@/components/discover/DiscoverChips";
import VendorCard from "@/components/discover/VendorCard";
import PageHero from "@/components/site/PageHero";
import StoreButtons from "@/components/site/StoreButtons";
import VendorExamples from "@/components/site/VendorExamples";
import RecruitBand from "@/components/site/RecruitBand";
import DiscoveryDemo from "@/components/site/DiscoveryDemo";
import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { MEDIA } from "@/lib/media";

export default function Discover() {
  const all = useT();
  const t = all.discover;
  usePageMeta(t.metaTitle, t.metaDesc);
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");

  const query = {};
  if (city !== "all") query.city = city;
  if (category !== "all") query.category = category;

  const { data, isLoading } = useQuery({
    queryKey: ["vendors", query],
    queryFn: () => base44.entities.Vendor.filter(query, { sort: "name", limit: 48 }),
  });
  const vendors = data?.items || [];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} titleEm={t.titleEm} lead={t.lead} />
      <div className="shell pb-20">
        <DiscoverChips {...{ city, setCity, category, setCategory }} />
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
          Inland Empire · {city === "all" ? t.overview : city}
        </p>
        {isLoading ? (
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" aria-label={t.loading}>
            {[0, 1, 2].map((i) => <div key={i} className="aspect-[4/3] animate-pulse rounded-[16px] bg-card" />)}
          </div>
        ) : vendors.length > 0 && (
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v) => <VendorCard key={v.id} vendor={v} />)}
          </div>
        )}

        <Reveal className="mt-16 grid items-center gap-10 overflow-hidden rounded-2xl border border-white/10 bg-black md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.coverageEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">{t.coverageTitle}</h2>
            <p className="mt-4 max-w-md text-muted-foreground">{t.coverageBody}</p>
            <p className="mt-8 text-sm font-medium text-white/80">{t.openApp}</p>
            <StoreButtons className="mt-3" />
          </div>
          <div className="flex h-[420px] items-end justify-center md:h-[480px]">
            <img src={MEDIA.appMap} alt={all.home.showcase.alts.map} loading="lazy" decoding="async" className="h-full w-auto object-contain object-bottom" />
          </div>
        </Reveal>
      </div>
      <DiscoveryDemo className="border-t border-white/5" />
      <VendorExamples heading={false} className="!pt-0" />
      <RecruitBand image={MEDIA.bandMarket} />
    </>
  );
}
