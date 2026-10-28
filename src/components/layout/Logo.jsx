import React from "react";
import { Link } from "react-router-dom";
import { useLp } from "@/lib/i18n";

const LOGO = "/logo.svg";

export default function Logo({ className = "h-8 w-auto" }) {
  const lp = useLp();
  return (
    <Link to={lp("/")} className="inline-flex items-center" aria-label="Vendr home">
      <img src={LOGO} alt="Vendr" width="136" height="50" className={className} />
    </Link>
  );
}
