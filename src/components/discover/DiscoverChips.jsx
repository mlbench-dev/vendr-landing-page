import React from "react";
import { useT } from "@/lib/i18n";
import { CATEGORY_KEYS, CITIES } from "@/lib/site";

function Row({ items, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {items.map(([k, l]) => (
        <button key={k} onClick={() => onChange(k)} aria-pressed={value === k}
          className={`h-10 rounded-full border px-4 text-[14px] transition-colors ${value === k ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:border-white/30 hover:text-foreground"}`}>{l}</button>
      ))}
    </div>
  );
}

export default function DiscoverChips({ city, setCity, category, setCategory }) {
  const all = useT();
  const t = all.discover;
  const cities = [["all", t.allAreas], ...CITIES.map((c) => [c, c])];
  const cats = [["all", t.all], ...CATEGORY_KEYS.map((k) => [k, all.common.categories[k]])];
  return (
    <div className="space-y-4">
      <Row items={cities} value={city} onChange={setCity} label={t.area} />
      <Row items={cats} value={category} onChange={setCategory} label={t.category} />
    </div>
  );
}
