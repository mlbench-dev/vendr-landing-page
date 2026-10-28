import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PANELS } from "./DashboardPanels";

export default function VendorDashboard() {
  const [tab, setTab] = useState("profile");
  const Active = PANELS.find((p) => p.key === tab).C;
  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-[20px] border border-white/15 bg-card/90 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 text-sm font-medium text-white/90">Vendor Operating Hub</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Storefront Live
        </div>
      </div>
      <div className="grid sm:grid-cols-[175px_1fr]">
        <div role="tablist" aria-label="Vendor tools" className="flex gap-1 overflow-x-auto border-b border-white/10 p-3 sm:flex-col sm:border-b-0 sm:border-r sm:border-white/10 bg-black/20">
          {PANELS.map((p) => (
            <button
              key={p.key}
              role="tab"
              aria-selected={tab === p.key}
              onClick={() => setTab(p.key)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-200 ${
                tab === p.key
                  ? "bg-primary text-white shadow-[0_4px_16px_rgba(26,86,219,0.4)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="min-h-[320px] p-6 bg-gradient-to-b from-transparent to-black/20">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Active />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}