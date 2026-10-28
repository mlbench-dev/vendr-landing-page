import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import CookieConsent from "@/components/site/CookieConsent";
import { LangProvider, useT } from "@/lib/i18n";

function Shell() {
  const t = useT().nav;
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">{t.skip}</a>
      <SiteNav />
      <main id="main"><Suspense fallback={<div className="min-h-screen" />}><motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}><Outlet /></motion.div></Suspense></main>
      <SiteFooter />
      <CookieConsent />
    </div>
  );
}

export default function SiteLayout() {
  return <LangProvider><Shell /></LangProvider>;
}
