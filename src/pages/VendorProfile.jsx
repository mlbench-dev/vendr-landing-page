import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Store, Navigation, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { MEDIA } from "@/lib/media";
import { APP_STORE } from "@/lib/site";
import { useLp, useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/seo";

export default function VendorProfile() {
  const all = useT();
  const t = all.profile;
  const lp = useLp();
  const { id } = useParams();
  const { data: v, isLoading, error } = useQuery({ queryKey: ["vendor", id], queryFn: () => base44.entities.Vendor.get(id), retry: false });
  const notFound = !isLoading && (!v || error?.response?.status === 404 || error?.status === 404);
  usePageMeta(v?.name || t.notFound, v?.tagline || v?.description || all.discover.metaDesc);

  useEffect(() => {
    if (!notFound) return;
    const m = document.createElement("meta");
    m.name = "prerender-status-code"; m.content = "404";
    document.head.appendChild(m);
    return () => m.remove();
  }, [notFound]);

  if (isLoading) return <div className="flex h-screen items-center justify-center text-muted-foreground">{t.loading}</div>;
  if (notFound) return (
    <div className="shell flex min-h-screen flex-col justify-center">
      <h1 className="display text-6xl">{t.notFound}</h1>
      <Link to={lp("/discover")} className="btn-secondary mt-8 w-fit">{t.back}</Link>
    </div>
  );

  const where = [v.neighborhood, v.city].filter(Boolean).join(", ");
  return (
    <article>
      <div className="relative h-[78vh] min-h-[520px]">
        <Image src={MEDIA[v.image_key] || MEDIA.model} alt={v.name} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="shell relative flex h-full flex-col justify-end pb-14">
          <Link to={lp("/discover")} className="glass mb-auto mt-24 inline-flex w-fit items-center gap-1.5 !rounded-full !px-4 !py-2 text-[15px]"><ArrowLeft className="h-4 w-4" />{t.discover}</Link>
          <div className="glass w-fit max-w-3xl">
            {v.is_concept && <span className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs">{t.concept}</span>}
            <h1 className="display text-[clamp(1.9rem,3.4vw,3rem)]">{v.name}</h1>
            {v.tagline && <p className="mt-4 max-w-xl text-[18px] text-white/85">{v.tagline}</p>}
          </div>
        </div>
      </div>
      <div className="shell grid gap-16 py-20 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-16">
          <Reveal><p className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-snug">{v.description}</p></Reveal>
          {!!v.offerings?.length && (
            <section>
              <h2 className="font-display text-4xl">{t.offerings}</h2>
              <ul className="mt-6 border-t border-border">
                {v.offerings.map((o) => (
                  <li key={o.name} className="flex items-baseline gap-4 border-b border-border py-5">
                    <div className="flex-1"><p className="text-[17px]">{o.name}</p>{o.note && <p className="text-[15px] text-muted-foreground">{o.note}</p>}</div>
                    <span className="text-[17px] text-primary">{o.price}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section>
            <h2 className="font-display text-4xl">{t.reviews}</h2>
            <p className="mt-4 text-muted-foreground">{t.noReviews}</p>
          </section>
        </div>
        <aside className="h-fit space-y-6 rounded-[16px] border border-border bg-card p-7 lg:sticky lg:top-24">
          <p className="flex items-center gap-2 text-[15px]"><Store className="h-4 w-4 text-muted-foreground" />{all.common.categories[v.category] || v.category} · {all.common.modes[v.mode] || v.mode}</p>
          {where && <p className="flex items-center gap-2 text-[15px]"><MapPin className="h-4 w-4 text-muted-foreground" />{where}</p>}
          {!!v.hours?.length && (
            <div className="border-t border-border pt-5">
              <p className="mb-3 text-[15px]">{t.hours}</p>
              {v.hours.map((h) => <p key={h.day} className="flex justify-between py-1 text-[15px] text-muted-foreground"><span>{h.day}</span><span>{h.time}</span></p>)}
            </div>
          )}
          <div className="flex flex-col gap-3 border-t border-border pt-6">
            <a className="btn-primary" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(where + ", CA")}`}><Navigation className="h-4 w-4" />{t.directions}</a>
            <a className="btn-secondary" target="_blank" rel="noreferrer" href={APP_STORE}><MessageCircle className="h-4 w-4" />{t.message}</a>
          </div>
        </aside>
      </div>
    </article>
  );
}
