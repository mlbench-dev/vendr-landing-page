import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Mail, Clock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PageHero from "@/components/site/PageHero";
import { Field, inputCls } from "@/components/onboarding/OnboardingFields";
import { useLang, useLp, useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATS = ["general", "vendor_support", "app_feedback", "partnership", "press", "other"];

export default function Contact() {
  const t = useT().contact;
  const lang = useLang();
  const lp = useLp();
  usePageMeta(t.metaTitle, t.metaDesc);
  const [d, setD] = useState({ category: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);

  const set = (k, v) => { setD((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!d.name?.trim()) e.name = t.err.name;
    if (!EMAIL.test(d.email?.trim() || "")) e.email = t.err.email;
    if (!d.category) e.category = t.err.category;
    if (!d.message?.trim()) e.message = t.err.message;
    if (!d.consent) e.consent = t.err.consent;
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) { document.getElementById(`c-${first}`)?.focus(); return; }
    setSending(true); setSubmitError("");
    try {
      await base44.entities.ContactMessage.create({ ...d, email: d.email.trim(), language: lang, status: "new" });
      setDone(true);
    } catch {
      setSubmitError(t.err.submit);
    } finally { setSending(false); }
  };

  const input = (k, props = {}) => (
    <input id={`c-${k}`} value={d[k] || ""} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `c-${k}-err` : undefined} className={inputCls} {...props} />
  );

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} titleEm={t.titleEm} lead={t.lead} />
      <section className="shell grid gap-12 pb-28 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <a href={`mailto:${CONTACT_EMAIL}`} className="card-surface flex items-center gap-4 p-6 transition-colors hover:border-primary/40">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Mail className="h-5 w-5" /></span>
            <span className="break-all text-[17px] font-medium">{CONTACT_EMAIL}</span>
          </a>
          <p className="flex items-center gap-3 text-[15px] text-muted-foreground"><Clock className="h-4 w-4 shrink-0" />{t.response}</p>
          <p className="text-[15px] text-muted-foreground">{t.vendorPre} <Link to={lp("/vendors/join")} className="text-foreground underline underline-offset-4">{t.vendorLink}</Link>.</p>
        </div>

        {done ? (
          <div role="status" className="card-surface h-fit p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white"><Check className="h-5 w-5" /></span>
            <h2 className="mt-6 font-display text-3xl font-medium">{t.doneTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.doneBody} <span className="text-foreground">{d.email}</span>.</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="h-fit rounded-xl border border-white/10 bg-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-medium">{t.formTitle}</h2>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">{t.formLead}</p>
            <div className="space-y-5">
              <Field id="c-name" label={t.f.name} error={errors.name}>{input("name", { autoComplete: "name" })}</Field>
              <Field id="c-email" label={t.f.email} error={errors.email}>{input("email", { type: "email", inputMode: "email", autoComplete: "email" })}</Field>
              <Field id="c-category" label={t.f.category} error={errors.category}>
                <select id="c-category" value={d.category} onChange={(e) => set("category", e.target.value)} aria-invalid={!!errors.category} aria-describedby={errors.category ? "c-category-err" : undefined} className={inputCls}>
                  <option value="" disabled>{t.f.categoryPh}</option>
                  {CATS.map((c) => <option key={c} value={c}>{t.categories[c]}</option>)}
                </select>
              </Field>
              <Field id="c-message" label={t.f.message} error={errors.message}>
                <textarea id="c-message" rows={5} value={d.message || ""} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} className={`${inputCls} h-auto py-3`} />
              </Field>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input id="c-consent" type="checkbox" checked={!!d.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#226bf7]" aria-invalid={!!errors.consent} />
                {t.f.consent}
              </label>
              {errors.consent && <p role="alert" className="text-sm text-destructive">{errors.consent}</p>}
            </div>
            {submitError && <p role="alert" className="mt-4 text-sm text-destructive">{submitError}</p>}
            <button type="submit" disabled={sending} className="btn-primary mt-6 h-14 w-full text-base disabled:opacity-60">{sending ? t.sending : t.submit}</button>
          </form>
        )}
      </section>
    </>
  );
}
