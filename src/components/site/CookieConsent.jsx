import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useLp, useT } from "@/lib/i18n";

const KEY = "vendr_cookie_consent";
export const OPEN_COOKIE_SETTINGS = "vendr:cookie-settings";

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
};

// Stores the visitor's choice and exposes it as window.vendrConsent.
// Any optional analytics added later must check `window.vendrConsent?.analytics` first.
const save = (analytics) => {
  const v = { analytics, at: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage unavailable */ }
  window.vendrConsent = v;
  window.dispatchEvent(new CustomEvent("vendr:consent", { detail: v }));
};

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));

export default function CookieConsent() {
  const t = useT().cookies;
  const lp = useLp();
  const [banner, setBanner] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const v = read();
    if (v) { window.vendrConsent = v; setAnalytics(!!v.analytics); } else setBanner(true);
    const open = () => { setAnalytics(!!read()?.analytics); setDialog(true); };
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  useEffect(() => {
    if (!dialog) return;
    const onKey = (e) => e.key === "Escape" && setDialog(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog]);

  const choose = (a) => { save(a); setBanner(false); setDialog(false); };

  return (
    <>
      {banner && !dialog && (
        <div role="region" aria-label={t.title} className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#0d1016]/95 p-5 shadow-2xl backdrop-blur-xl md:inset-x-6 md:bottom-6">
          <p className="text-sm leading-relaxed text-white/85">{t.text} <Link to={lp("/privacy")} className="underline underline-offset-4">{t.policy}</Link></p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => choose(true)} className="btn-primary h-10 px-5 text-sm">{t.accept}</button>
            <button onClick={() => choose(false)} className="btn-secondary h-10 px-5 text-sm">{t.essential}</button>
            <button onClick={() => setDialog(true)} className="h-10 px-3 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">{t.settings}</button>
          </div>
        </div>
      )}
      {dialog && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center" onClick={() => setDialog(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="cookie-title" className="w-full max-w-md rounded-2xl border border-white/15 bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 id="cookie-title" className="font-display text-2xl font-medium">{t.title}</h2>
              <button onClick={() => setDialog(false)} aria-label={t.close} className="rounded-full p-1.5 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div><p className="text-[15px] font-medium">{t.essentialLabel}</p><p className="mt-1 text-sm text-muted-foreground">{t.essentialBody}</p></div>
                <input type="checkbox" checked disabled className="mt-1 h-5 w-5 accent-[#226bf7]" aria-label={t.essentialLabel} />
              </div>
              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <span><span className="block text-[15px] font-medium">{t.analyticsLabel}</span><span className="mt-1 block text-sm text-muted-foreground">{t.analyticsBody}</span></span>
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 h-5 w-5 accent-[#226bf7]" />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={() => choose(analytics)} className="btn-primary h-11 px-6 text-sm">{t.save}</button>
              <button onClick={() => choose(true)} className="btn-secondary h-11 px-6 text-sm">{t.accept}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
