import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLp, useT } from "@/lib/i18n";

// The main vendor-recruitment CTA. Carries ?ref= through so referral links keep working.
export default function JoinButton({ className = "", label, size }) {
  const t = useT().common;
  const lp = useLp();
  const { search } = useLocation();
  const ref = new URLSearchParams(search).get("ref");
  const to = lp("/vendors/join") + (ref ? `?ref=${encodeURIComponent(ref)}` : "");
  const sm = size === "sm" ? "h-10 px-5 text-sm" : "";
  return (
    <Link to={to} className={`btn-primary ${sm} ${className}`}>
      {label || t.join}
      {size !== "sm" && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}
