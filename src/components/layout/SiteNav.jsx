import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import Logo from "./Logo";
import JoinButton from "@/components/site/JoinButton";
import { basePath, useLang, useLp, useT } from "@/lib/i18n";

const LINKS = [
  ["/how-it-works", "how"],
  ["/discover", "discover"],
  ["/vendors", "vendors"],
  ["/safety", "safety"],
  ["/faq", "faq"],
  ["/about", "about"],
  ["/download", "download"],
];

function LangSwitch({ className = "" }) {
  const t = useT().nav;
  const lang = useLang();
  const { pathname, search, hash } = useLocation();
  const base = basePath(pathname);
  const to = (lang === "es" ? base : base === "/" ? "/es" : `/es${base}`) + search + hash;
  return (
    <Link to={to} hrefLang={lang === "es" ? "en" : "es"} aria-label={t.langLabel} className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white ${className}`}>
      <Globe className="h-3.5 w-3.5" aria-hidden="true" />{t.langShort}
    </Link>
  );
}

export default function SiteNav() {
  const t = useT().nav;
  const lp = useLp();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Tuck the header away while reading down the page; bring it back on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const f = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 480); last = y; }
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => setHidden(false), [pathname]);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkCls = ({ isActive }) =>
    `text-[14px] font-medium transition-colors duration-200 ${isActive ? "text-white" : "text-white/65 hover:text-white"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? "-translate-y-full" : "translate-y-0"} ${
        scrolled || open
          ? "border-b border-white/10 bg-black/80 backdrop-blur-2xl"
          : "border-b border-transparent bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <motion.div className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-6 xl:flex" aria-label={t.main}>
          {LINKS.map(([to, k]) => (
            <NavLink key={to} to={lp(to)} end className={linkCls}>{t[k]}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch className="hidden sm:inline-flex" />
          <JoinButton size="sm" className="hidden sm:inline-flex" />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-white/80 hover:text-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-black/95 backdrop-blur-2xl xl:hidden" aria-label={t.mobile}>
          <div className="shell flex flex-col pb-10 pt-4">
            {LINKS.map(([to, k]) => (
              <NavLink
                key={to}
                to={lp(to)}
                end
                className={({ isActive }) => `border-b border-white/5 py-3.5 font-display text-2xl transition-colors ${isActive ? "text-primary" : "text-white/90 hover:text-white"}`}
              >
                {t[k]}
              </NavLink>
            ))}
            <JoinButton className="mt-8 h-14 w-full text-base" />
            <LangSwitch className="mt-5 w-fit" />
          </div>
        </nav>
      )}
    </header>
  );
}
