import React from "react";

export const inputCls = "w-full h-12 rounded-[3px] border border-border bg-card px-4 text-[16px] text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none aria-[invalid=true]:border-destructive";

export function Field({ id, label, error, hint, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[15px]">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-sm text-muted-foreground">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function ChoiceGroup({ label, options, value, onChange, error }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-[15px]">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map(([v, l]) => (
          <button type="button" key={v} aria-pressed={value === v} onClick={() => onChange(v)}
            className={`h-14 rounded-[3px] border px-4 text-left text-[15px] transition-colors ${value === v ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`}>
            {l}
          </button>
        ))}
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </fieldset>
  );
}