import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { basePath, useLang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const upsert = (selector, create) => {
  let el = document.head.querySelector(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  return el;
};
const meta = (attr, key, content) => {
  upsert(`meta[${attr}="${key}"]`, () => { const m = document.createElement("meta"); m.setAttribute(attr, key); return m; }).setAttribute("content", content);
};
const link = (rel, href, hreflang) => {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  const el = upsert(sel, () => { const l = document.createElement("link"); l.rel = rel; if (hreflang) l.hreflang = hreflang; return l; });
  el.href = href;
};

// Per-page title, description, canonical URL and EN/ES alternates.
export function usePageMeta(title, description) {
  const { pathname } = useLocation();
  const lang = useLang();
  useEffect(() => {
    const full = title ? `${title} · Vendr` : "Vendr — Closer than you think";
    document.title = full;
    const base = basePath(pathname);
    const en = `${SITE_URL}${base === "/" ? "/" : base}`;
    const es = `${SITE_URL}/es${base === "/" ? "" : base}`;
    meta("name", "description", description);
    meta("property", "og:title", full);
    meta("property", "og:description", description);
    meta("property", "og:url", lang === "es" ? es : en);
    meta("property", "og:locale", lang === "es" ? "es_US" : "en_US");
    meta("name", "twitter:title", full);
    meta("name", "twitter:description", description);
    link("canonical", lang === "es" ? es : en);
    link("alternate", en, "en");
    link("alternate", es, "es");
    link("alternate", en, "x-default");
  }, [title, description, pathname, lang]);
}
