import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import VendorTicker from "@/components/site/VendorTicker";
import DiscoveryDemo from "@/components/site/DiscoveryDemo";
import AppShowcase from "@/components/home/AppShowcase";
import Mission from "@/components/home/Mission";
import DownloadBand from "@/components/home/DownloadBand";
import PathsTeaser from "@/components/home/PathsTeaser";
import VendorExamples from "@/components/site/VendorExamples";
import LocationModes from "@/components/site/LocationModes";
import RecruitBand from "@/components/site/RecruitBand";
import SafetyGrid from "@/components/site/SafetyGrid";
import Reveal from "@/components/Reveal";
import { useLp, useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { MEDIA } from "@/lib/media";

export default function Home() {
  const t = useT().home;
  const lp = useLp();
  usePageMeta(t.metaTitle, t.metaDesc);

  return (
    <>
      <Hero />
      <VendorTicker />
      <DiscoveryDemo />
      <VendorExamples className="border-t border-white/5" />
      <RecruitBand />
      <AppShowcase />
      <PathsTeaser />
      <LocationModes className="border-b border-white/5" />
      <section className="section" aria-labelledby="safety-title">
        <div className="shell">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">{t.safety.eyebrow}</p>
              <h2 id="safety-title" className="display mt-5 text-[clamp(2.1rem,4.6vw,3.8rem)]">{t.safety.title}<em className="italic text-primary">{t.safety.titleEm}</em></h2>
              <p className="lead mt-5">{t.safety.lead}</p>
            </div>
            <Link to={lp("/safety")} className="btn-secondary w-fit shrink-0">{t.safety.cta}<ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <div className="mt-12"><SafetyGrid /></div>
        </div>
      </section>
      <Mission image={MEDIA.mission} />
      <DownloadBand image={MEDIA.appInHand} photo />
    </>
  );
}
