import React from "react";
import { Field, ChoiceGroup, inputCls } from "./OnboardingFields";
import { CATEGORIES, CITIES, MODES, categoryLabel } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const STEPS = ["Your business", "Where you work", "What you offer", "How to reach you", "Review"];

export function validate(step, d) {
  const e = {};
  if (step === 0) {
    if (!d.business_name?.trim()) e.business_name = "Add your business name.";
    if (!d.category) e.category = "Choose the category that fits best.";
    if (!d.mode) e.mode = "Tell us how you work.";
  }
  if (step === 1) {
    if (!d.city) e.city = "Choose your city.";
    if (d.mode === "storefront" && !d.address?.trim()) e.address = "Add your storefront address.";
    if (d.mode && d.mode !== "storefront" && !d.service_area?.trim()) e.service_area = "Describe where you usually operate.";
  }
  if (step === 2 && (d.description?.trim().length || 0) < 20) e.description = "Write at least 20 characters so neighbors know what you do.";
  if (step === 3) {
    if (!d.owner_name?.trim()) e.owner_name = "Add your name.";
    if (!EMAIL.test(d.email || "")) e.email = "Enter a valid email address.";
    if (!d.consent) e.consent = "Please confirm to continue.";
  }
  return e;
}

export default function StepContent({ step, d, set, errors }) {
  const input = (k, props = {}) => (
    <input id={k} value={d[k] || ""} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className={inputCls} {...props} />
  );
  if (step === 0) return (
    <div className="space-y-8">
      <Field id="business_name" label="Business name" error={errors.business_name}>{input("business_name", { autoComplete: "organization" })}</Field>
      <ChoiceGroup label="Category" options={CATEGORIES.map((c) => [c.value, c.label])} value={d.category} onChange={(v) => set("category", v)} error={errors.category} />
      <ChoiceGroup label="How you work" options={Object.entries(MODES)} value={d.mode} onChange={(v) => set("mode", v)} error={errors.mode} />
    </div>
  );
  if (step === 1) return (
    <div className="space-y-8">
      <Field id="city" label="City" error={errors.city}>
        <select id="city" value={d.city || ""} onChange={(e) => set("city", e.target.value)} aria-invalid={!!errors.city} className={inputCls}>
          <option value="">Select a city</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      {d.mode === "storefront"
        ? <Field id="address" label="Storefront address" error={errors.address}>{input("address", { autoComplete: "street-address" })}</Field>
        : <Field id="service_area" label="Where you operate" hint="e.g. Farmers markets in Redlands, or within 10 miles of Corona" error={errors.service_area}>{input("service_area")}</Field>}
    </div>
  );
  if (step === 2) return (
    <div className="space-y-8">
      <Field id="description" label="Describe your business" error={errors.description}>
        <textarea id="description" rows={5} value={d.description || ""} onChange={(e) => set("description", e.target.value)} aria-invalid={!!errors.description} className={`${inputCls} h-auto py-3`} />
      </Field>
      <Field id="offerings" label="Offerings and prices (optional)" hint="One per line, e.g. Cortado — $4.75">
        <textarea id="offerings" rows={4} value={d.offerings || ""} onChange={(e) => set("offerings", e.target.value)} className={`${inputCls} h-auto py-3`} />
      </Field>
    </div>
  );
  if (step === 3) return (
    <div className="space-y-8">
      <Field id="owner_name" label="Your name" error={errors.owner_name}>{input("owner_name", { autoComplete: "name" })}</Field>
      <Field id="email" label="Email" error={errors.email}>{input("email", { type: "email", autoComplete: "email", inputMode: "email" })}</Field>
      <Field id="phone" label="Phone (optional)">{input("phone", { type: "tel", autoComplete: "tel" })}</Field>
      <Field id="website" label="Website or social (optional)">{input("website", { type: "url", placeholder: "https://" })}</Field>
      <label className="flex items-start gap-3 text-[15px]">
        <input type="checkbox" checked={!!d.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-5 w-5 accent-[#226bf7]" />
        <span>I confirm this is a real, local business and agree to be contacted about joining Vendr.</span>
      </label>
      {errors.consent && <p role="alert" className="text-sm text-destructive">{errors.consent}</p>}
    </div>
  );
  const rows = [["Business", d.business_name], ["Category", categoryLabel(d.category)], ["How you work", MODES[d.mode]], ["City", d.city], ["Location", d.address || d.service_area], ["Description", d.description], ["Offerings", d.offerings], ["Contact", `${d.owner_name} · ${d.email}`]];
  return (
    <dl className="divide-y divide-border border-y border-border">
      {rows.filter(([, v]) => v).map(([k, v]) => (
        <div key={k} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]"><dt className="text-[15px] text-muted-foreground">{k}</dt><dd className="whitespace-pre-line text-[15px]">{v}</dd></div>
      ))}
    </dl>
  );
}