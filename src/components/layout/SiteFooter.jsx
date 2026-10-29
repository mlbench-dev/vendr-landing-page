import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import StoreButtons from "@/components/site/StoreButtons";
import { openCookieSettings } from "@/components/site/CookieConsent";
import { useLp, useT } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site";

export default function SiteFooter() {
  const all = useT();
  const t = all.footer;
  const n = all.nav;
  const lp = useLp();
  const cols = [
    [t.product, [["/how-it-works", n.how], ["/discover", n.discover], ["/download", n.download], ["/safety", n.safety], ["/faq", n.faq]]],
    [t.vendors, [["/vendors/join", all.common.join], ["/vendors/join?ref=community", t.refer], ["/vendors", n.vendors], ["/about", n.about], ["/contact", all.common.contactUs]]],
    [t.legal, [["/privacy", t.privacy], ["/terms", t.terms]]],
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-background">
      {/* Phones: brand on top, Product and Vendors side by side, Legal across the full width. */}
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="col-span-2 space-y-5 lg:col-span-1">
          <Logo className="h-9 w-auto" />
          <p className="max-w-sm text-[15px] text-muted-foreground">{t.tagline} <span className="text-foreground">{all.brand.mission}</span></p>
          <StoreButtons />
        </div>
        {cols.map(([title, links]) => {
          const legal = title === t.legal;
          return (
            <div key={title} className={`space-y-3 ${legal ? "col-span-2 lg:col-span-1" : ""}`}>
              <p className="text-[15px] font-medium text-foreground">{title}</p>
              <ul className={legal ? "grid grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-1" : "space-y-2"}>
                {links.map(([to, l]) => <li key={to}><Link to={lp(to)} className="link-quiet">{l}</Link></li>)}
                {legal && (
                  <>
                    <li><button type="button" onClick={openCookieSettings} className="link-quiet">{t.cookies}</button></li>
                    <li className="col-span-2 pt-3 lg:col-span-1"><a href={`mailto:${CONTACT_EMAIL}`} className="link-quiet break-all"><Mail className="h-4 w-4 shrink-0" />{CONTACT_EMAIL}</a></li>
                  </>
                )}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="shell flex flex-col gap-2 border-t border-border/60 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {t.copy}</span>
        <span>{t.place}</span>
      </div>
    </footer>
  );
}
