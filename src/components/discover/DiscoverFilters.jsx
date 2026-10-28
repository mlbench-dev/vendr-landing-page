import React from "react";
import { Search, MapPin } from "lucide-react";
import { CITIES, CATEGORIES } from "@/lib/site";

const chip = (on) => `shrink-0 rounded-[3px] px-4 py-2 text-[15px] transition-colors duration-300 ${on ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`;
const selectCls = "h-12 rounded-[3px] border border-border bg-card px-3 text-[15px] text-foreground focus:border-primary focus:outline-none";

export default function DiscoverFilters({ search, setSearch, city, setCity, category, setCategory, sort, setSort }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="flex h-14 flex-1 items-center gap-3 rounded-[3px] border border-border bg-card px-4 focus-within:border-primary">
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Search vendors</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendors by name" className="h-full flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground/70" />
        </label>
        <div className="flex gap-3">
          <label className="relative flex items-center">
            <span className="sr-only">City</span>
            <MapPin className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
            <select value={city} onChange={(e) => setCity(e.target.value)} className={`${selectCls} h-14 pl-9`}>
              <option value="all">All areas</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={`${selectCls} h-14`}>
              <option value="name">Name A–Z</option>
              <option value="-created_date">Newest</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto" role="group" aria-label="Category">
        <button className={chip(category === "all")} aria-pressed={category === "all"} onClick={() => setCategory("all")}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c.value} className={chip(category === c.value)} aria-pressed={category === c.value} onClick={() => setCategory(c.value)}>{c.label}</button>
        ))}
      </div>
    </div>
  );
}