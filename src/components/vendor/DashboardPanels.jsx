import React from "react";
import { Plus } from "lucide-react";

const Row = ({ a, b }) => (
  <div className="flex items-center justify-between border-b border-border py-3 text-[15px] last:border-0"><span>{a}</span><span className="text-muted-foreground">{b}</span></div>
);

export function ProfilePanel() {
  return (
    <div className="space-y-4">
      {[["Business name", "Juniper & Ash Coffee"], ["Category", "Food & drink"], ["How you work", "Storefront"], ["Location", "Downtown Riverside"]].map(([l, v]) => (
        <div key={l}><p className="text-sm text-muted-foreground">{l}</p><p className="mt-1 rounded-[3px] border border-border bg-background/60 px-3 py-2.5 text-[15px]">{v}</p></div>
      ))}
    </div>
  );
}

export function OfferingsPanel() {
  return (
    <div>
      <Row a="Pour-over, single origin" b="$5.50" />
      <Row a="Cortado" b="$4.75" />
      <Row a="Seasonal beans, 12 oz" b="$18.00" />
      <button className="mt-4 inline-flex items-center gap-2 text-[15px] text-primary"><Plus className="h-4 w-4" />Add offering</button>
    </div>
  );
}

export function HoursPanel() {
  return (
    <div>
      {[["Mon – Fri", "7:00 am – 3:00 pm"], ["Saturday", "8:00 am – 2:00 pm"], ["Sunday", "Closed"]].map(([d, t]) => <Row key={d} a={d} b={t} />)}
    </div>
  );
}

export function MessagesPanel() {
  return (
    <div className="space-y-3">
      {[["Neighbor", "Do you sell whole beans for pickup?"], ["Neighbor", "Are you open on the holiday Monday?"]].map(([w, m], i) => (
        <div key={i} className="rounded-[4px] border border-border bg-background/60 p-3">
          <p className="text-sm text-muted-foreground">{w}</p><p className="mt-1 text-[15px]">{m}</p>
        </div>
      ))}
      <div className="rounded-[4px] border border-dashed border-border px-3 py-2.5 text-[15px] text-muted-foreground">Write a reply…</div>
    </div>
  );
}

export const PANELS = [
  { key: "profile", label: "Profile", C: ProfilePanel },
  { key: "offerings", label: "Offerings & prices", C: OfferingsPanel },
  { key: "hours", label: "Hours", C: HoursPanel },
  { key: "messages", label: "Messages", C: MessagesPanel },
];