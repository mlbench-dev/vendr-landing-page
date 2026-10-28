import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import en from "@/i18n/en";
import es from "@/i18n/es";

const DICTS = { en, es };
const LangContext = createContext("en");

export const langFromPath = (pathname) => (pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en");

// Strips the /es prefix so a path can be re-prefixed for the other language.
export const basePath = (pathname) => (langFromPath(pathname) === "es" ? pathname.slice(3) || "/" : pathname);

export function LangProvider({ children }) {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useT = () => DICTS[useContext(LangContext)];

// Localizes an internal path: lp("/faq") -> "/es/faq" on Spanish pages.
export function useLp() {
  const lang = useContext(LangContext);
  return (to) => {
    if (lang !== "es" || !to.startsWith("/")) return to;
    return to === "/" ? "/es" : `/es${to}`;
  };
}
