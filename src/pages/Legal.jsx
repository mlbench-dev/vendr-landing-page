import React from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import { useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";

const Bullets = ({ items }) => (
  <ul className="mt-3 space-y-2">
    {items.map((li) => <li key={li} className="flex gap-3 leading-relaxed text-muted-foreground"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{li}</li>)}
  </ul>
);

// Renders the Privacy Policy or Terms of Service.
// Each section is [heading, paragraphs, bullets?, [subheading, bullets][]?, closing paragraphs?].
export default function Legal({ doc }) {
  const l = useT().legal;
  const t = l[doc];
  usePageMeta(t.metaTitle, t.metaDesc);
  return (
    <article className="shell max-w-3xl pb-28 pt-32 md:pt-44">
      <h1 className="display text-[clamp(2.4rem,5vw,4rem)]">{t.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">{t.updated || l.updated}</p>
      <p className="lead mt-8">{t.intro}</p>
      {t.sections.map(([h, ps, list, groups, after]) => (
        <section key={h} className="mt-12 border-t border-white/10 pt-10">
          <h2 className="font-display text-3xl font-medium">{h}</h2>
          {ps.map((p) => <p key={p} className="mt-4 max-w-[68ch] leading-relaxed text-muted-foreground">{p}</p>)}
          {list && <Bullets items={list} />}
          {groups?.map(([sub, items]) => (
            <div key={sub} className="mt-6">
              <h3 className="text-[17px] font-semibold text-foreground">{sub}</h3>
              <Bullets items={items} />
            </div>
          ))}
          {after?.map((p) => <p key={p} className="mt-4 max-w-[68ch] leading-relaxed text-muted-foreground">{p}</p>)}
        </section>
      ))}
      <section className="mt-12 border-t border-white/10 pt-10">
        <h2 className="font-display text-3xl font-medium">{l.contactTitle}</h2>
        <p className="mt-4 text-muted-foreground">{t.contact} {l.contactPre} <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-4">{CONTACT_EMAIL}</a>.</p>
      </section>
    </article>
  );
}
