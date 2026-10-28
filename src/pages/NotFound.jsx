import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLp, useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";

export default function NotFound() {
  const t = useT().notFound;
  const lp = useLp();
  usePageMeta(t.metaTitle, t.body);
  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "prerender-status-code"; m.content = "404";
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return (
    <section className="shell flex min-h-[80vh] flex-col justify-center py-32">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4.6rem)]">{t.title}</h1>
      <p className="lead mt-5">{t.body}</p>
      <Link to={lp("/")} className="btn-primary mt-10 w-fit">{t.home}</Link>
    </section>
  );
}
