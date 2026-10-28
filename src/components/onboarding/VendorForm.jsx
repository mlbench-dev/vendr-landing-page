import React from "react";
import { Field, inputCls } from "@/components/onboarding/OnboardingFields";
import { APPLY_CATEGORY_KEYS, APPLY_CITIES, MODE_KEYS } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// `msg` holds the localized error messages for each field.
export function validate(d, msg) {
  const e = {};
  if (!d.owner_name?.trim()) e.owner_name = msg.owner_name;
  if (!EMAIL.test(d.email?.trim() || "")) e.email = msg.email;
  if (!d.business_name?.trim()) e.business_name = msg.business_name;
  if (!d.city) e.city = msg.city;
  if (!d.description?.trim()) e.description = msg.description;
  if (!d.consent) e.consent = msg.consent;
  return e;
}

const describedBy = (k, errors, hint) => [errors[k] && `${k}-err`, hint && !errors[k] && `${k}-hint`].filter(Boolean).join(" ") || undefined;

const Text = ({ k, label, type = "text", d, set, errors, ...rest }) => (
  <Field id={k} label={label} error={errors[k]}>
    <input id={k} type={type} className={inputCls} value={d[k] || ""} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={describedBy(k, errors)} {...rest} />
  </Field>
);

const Select = ({ k, label, options, d, set, errors, placeholder, hint }) => (
  <Field id={k} label={label} error={errors[k]} hint={hint}>
    <select id={k} className={inputCls} value={d[k] || ""} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={describedBy(k, errors, hint)}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  </Field>
);

export default function VendorForm({ d, set, errors, t, common }) {
  const p = { d, set, errors };
  const f = t.f;
  return (
    <div className="space-y-5">
      <Text k="owner_name" label={f.owner_name} autoComplete="name" {...p} />
      <Text k="email" label={f.email} type="email" inputMode="email" autoComplete="email" {...p} />
      <Text k="business_name" label={f.business_name} autoComplete="organization" {...p} />
      <Select k="city" label={f.city} placeholder={f.cityPh} options={APPLY_CITIES.map((c) => [c, common.cities[c] || c])} {...p} />
      <Select k="category" label={f.category} hint={f.categoryHint} options={APPLY_CATEGORY_KEYS.map((k) => [k, common.categories[k]])} {...p} />
      <Select k="mode" label={f.mode} options={MODE_KEYS.map((k) => [k, common.modes[k]])} {...p} />
      <Field id="description" label={f.description} error={errors.description}>
        <textarea id="description" rows={4} placeholder={f.descriptionPh} className={`${inputCls} h-auto py-3`} value={d.description || ""} onChange={(e) => set("description", e.target.value)} aria-invalid={!!errors.description} aria-describedby={describedBy("description", errors)} />
      </Field>
      <Text k="referred_by" label={f.referred_by} {...p} />
      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[#226bf7]" checked={!!d.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} />
        {f.consent}
      </label>
      {errors.consent && <p id="consent-err" role="alert" className="text-sm text-destructive">{errors.consent}</p>}
    </div>
  );
}
