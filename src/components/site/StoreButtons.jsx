import React from "react";
import { APP_STORE, PLAY_STORE } from "@/lib/site";
import { useT } from "@/lib/i18n";

const Apple = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.33-3.55zM14.17 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.69-.92 2.69.98.08 1.98-.5 2.58-1.23z" />
  </svg>
);
const Play = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="#34A853" d="M3.6 2.2 13.7 12 3.6 21.8c-.37-.2-.6-.6-.6-1.07V3.27c0-.47.23-.87.6-1.07z" />
    <path fill="#FBBC04" d="m17.1 8.6-3.4 3.4 3.4 3.4 3.83-2.17c.66-.38.66-1.08 0-1.46z" />
    <path fill="#4285F4" d="M3.6 2.2c.3-.17.68-.18 1.06.03L17.1 8.6 13.7 12z" />
    <path fill="#EA4335" d="M13.7 12l3.4 3.4-12.44 6.37c-.38.21-.76.2-1.06.03z" />
  </svg>
);

// Compact on phones so both badges sit on one line; full size from the sm breakpoint up.
const badge = "group inline-flex h-12 items-center gap-1.5 rounded-xl border border-white/20 bg-black px-3 text-left text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 focus-visible:-translate-y-0.5 sm:h-14 sm:gap-3 sm:rounded-2xl sm:px-5";
const pre = "block text-[10px] text-white/70 sm:text-[11px]";
const name = "mt-1 block text-[15px] font-semibold tracking-tight sm:text-[19px]";

export default function StoreButtons({ className = "" }) {
  const t = useT().common;
  return (
    <div className={`flex flex-wrap gap-2 sm:gap-3 ${className}`}>
      <a href={APP_STORE} target="_blank" rel="noreferrer" className={badge} aria-label={`${t.appStorePre} ${t.appStore}`}>
        <Apple className="h-[22px] w-[22px] sm:h-7 sm:w-7" />
        <span className="leading-none"><span className={pre}>{t.appStorePre}</span><span className={name}>{t.appStore}</span></span>
      </a>
      <a href={PLAY_STORE} target="_blank" rel="noreferrer" className={badge} aria-label={`${t.playPre} ${t.play}`}>
        <Play className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="leading-none"><span className={pre}>{t.playPre}</span><span className={name}>{t.play}</span></span>
      </a>
    </div>
  );
}
