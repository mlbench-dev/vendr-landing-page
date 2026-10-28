import React from "react";
import HowItWorksSection from "@/components/HowItWorksSection";
import LocationModes from "@/components/site/LocationModes";
import RecruitBand from "@/components/site/RecruitBand";
import VendorExamples from "@/components/site/VendorExamples";
import { useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { MEDIA } from "@/lib/media";

export default function HowItWorks() {
  const t = useT().how;
  usePageMeta(t.metaTitle, t.metaDesc);
  return (
    <>
      <section className="pb-24 pt-32 md:pb-32 md:pt-44">
        <HowItWorksSection as="h1" />
      </section>
      <LocationModes className="border-t border-white/5" />
      <VendorExamples limit={4} className="border-t border-white/5" />
      <RecruitBand image={MEDIA.foodTruckPink} secondary={false} />
    </>
  );
}
