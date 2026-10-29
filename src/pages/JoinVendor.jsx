import React, { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, ArrowUpRight, Mail } from "lucide-react";
import { base44 } from "@/api/base44Client";
import VendorForm, { validate } from "@/components/onboarding/VendorForm";
import { useLang, useLp, useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";
import { CITY_ELSEWHERE, CONTACT_EMAIL } from "@/lib/site";

export default function JoinVendor() {
  const all = useT();
  const t = all.join;
  const lang = useLang();
  const lp = useLp();
  usePageMeta(t.metaTitle, t.metaDesc);
  const [params] = useSearchParams();
  const ref = params.get("ref");
  const [d, setD] = useState({ category: "food_drink", mode: "storefront", referred_by: ref && ref !== "community" ? ref : "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);
  const formRef = useRef(null);

  const set = (k, v) => { setD((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate(d, t.err); setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      formRef.current?.querySelector(`#${first}, [aria-invalid="true"]`)?.focus();
      return;
    }
    setSending(true); setSubmitError("");
    try {
      const referred = [d.referred_by?.trim(), ref === "community" && "community referral"].filter(Boolean).join(" · ");
      const { city_other, ...rest } = d;
      const city = d.city === CITY_ELSEWHERE ? city_other.trim() : d.city;
      await base44.entities.VendorApplication.create({ ...rest, city, email: d.email.trim(), referred_by: referred, language: lang, status: "pending" });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(t.err.submit);
    } finally { setSending(false); }
  };

  if (done) return (
    <div className="shell flex min-h-[80vh] max-w-2xl flex-col justify-center py-32" role="status">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white"><Check className="h-6 w-6" /></span>
      <h1 className="display mt-8 text-5xl">{t.doneTitle}</h1>
      <p className="mt-5 text-muted-foreground">{t.doneBody} <span className="text-foreground">{d.email}</span>.</p>
      <Link to={lp("/download")} className="btn-secondary mt-10 w-fit">{t.doneCta}</Link>
    </div>
  );

  return (
    <div className="shell grid gap-14 pb-28 pt-28 md:pt-36 lg:grid-cols-[1fr_1.05fr]">
      <div>
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="display mt-5 text-[clamp(2.4rem,5vw,4rem)]">{t.title}<em className="italic text-primary">{t.titleEm}</em></h1>
        <p className="lead mt-6 max-w-md">{t.lead}</p>
        <ul className="mt-8 space-y-3">
          {t.points.map((p) => <li key={p} className="flex gap-3 text-[15px]"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{p}</li>)}
        </ul>
        <div className="mt-10 hidden border-t border-white/10 pt-8 lg:block">
          <p className="text-[15px] font-medium">{all.vendors.afterTitle}</p>
          <ol className="mt-4 space-y-4">
            {all.vendors.after.map(([a, b], i) => (
              <li key={a} className="flex gap-4 text-[15px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-xs text-primary">{i + 1}</span>
                <span><span className="text-foreground">{a}</span> <span className="text-muted-foreground">{b}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{all.vendors.payment}</p>
        <p className="mt-3 text-sm text-muted-foreground">{all.vendors.question} <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1 text-foreground underline underline-offset-4"><Mail className="h-3.5 w-3.5" />{CONTACT_EMAIL}</a></p>
      </div>
      <form ref={formRef} onSubmit={submit} noValidate className="h-fit rounded-xl border border-white/10 bg-card p-6 md:p-8 lg:sticky lg:top-24">
        <h2 className="font-display text-2xl font-medium">{t.formTitle}</h2>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">{t.formLead}</p>
        <VendorForm d={d} set={set} errors={errors} t={t} common={all.common} />
        {Object.keys(errors).some((k) => errors[k]) && <p className="mt-4 text-sm text-destructive">{t.err.fix}</p>}
        {submitError && <p role="alert" className="mt-4 text-sm text-destructive">{submitError}</p>}
        <button type="submit" disabled={sending} className="btn-primary mt-6 h-14 w-full text-base disabled:opacity-60">
          {sending ? t.sending : <>{t.submit} <ArrowUpRight className="h-4 w-4" /></>}
        </button>
      </form>
    </div>
  );
}
