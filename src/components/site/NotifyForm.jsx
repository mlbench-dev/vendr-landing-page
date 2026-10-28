import React, { useState } from "react";
import { Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useLang, useT } from "@/lib/i18n";
import { inputCls } from "@/components/onboarding/OnboardingFields";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "Get worldwide launch updates" signup, carried over from streetvendr.org.
export default function NotifyForm({ className = "" }) {
  const t = useT().notify;
  const lang = useLang();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) return setError(t.errEmail);
    if (!consent) return setError(t.errConsent);
    setError(""); setState("sending");
    try {
      await base44.entities.LaunchSubscriber.create({ email: email.trim(), consent, language: lang });
      setState("done");
    } catch {
      setState("idle"); setError(t.errSubmit);
    }
  };

  return (
    <div className={`card-surface p-6 md:p-8 ${className}`}>
      <h3 className="font-display text-2xl font-medium">{t.title}</h3>
      <p className="mt-2 text-[15px] text-muted-foreground">{t.body}</p>
      {state === "done" ? (
        <p role="status" className="mt-6 flex items-center gap-2 text-[15px]"><Check className="h-5 w-5 text-primary" />{t.done}</p>
      ) : (
        <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="notify-email" className="sr-only">{t.email}</label>
            <input id="notify-email" type="email" inputMode="email" autoComplete="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} className={cn(inputCls, "rounded-full px-5")} aria-invalid={!!error} aria-describedby={error ? "notify-err" : undefined} />
            <button type="submit" disabled={state === "sending"} className="btn-primary shrink-0 disabled:opacity-60">{state === "sending" ? t.sending : t.submit}</button>
          </div>
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#226bf7]" />
            {t.consent}
          </label>
          {error && <p id="notify-err" role="alert" className="text-sm text-destructive">{error}</p>}
        </form>
      )}
    </div>
  );
}
