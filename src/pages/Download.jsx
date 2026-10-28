import React from "react";
import DownloadBand from "@/components/home/DownloadBand";
import PathsTeaser from "@/components/home/PathsTeaser";
import RecruitBand from "@/components/site/RecruitBand";
import { useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { MEDIA } from "@/lib/media";

export default function Download() {
  const t = useT().download;
  usePageMeta(t.metaTitle, t.metaDesc);
  return (
    <>
      <div className="pt-16"><DownloadBand as="h1" /></div>
      <PathsTeaser />
      <RecruitBand image={MEDIA.mechanicHands} />
    </>
  );
}
