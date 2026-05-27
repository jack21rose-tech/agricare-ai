import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[oklch(0.16_0.06_265/0.15)] bg-[oklch(0.99_0.01_85/0.85)] backdrop-blur-xl supports-[backdrop-filter]:bg-[oklch(0.99_0.01_85/0.7)]">
      {/* Tricolor hairline */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[oklch(0.7_0.18_55)] via-white to-[oklch(0.55_0.16_150)]" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow ring-2 ring-[oklch(0.55_0.16_150)]/30">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-[oklch(0.18_0.06_265)]">
            Kisan<span className="text-[oklch(0.6_0.2_55)]">AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
          {[
            { to: "/", label: "Home" },
            { /*to: "/dashboard", label: "Dashboard" */ },
            { to: "/scan", label: "Scan" },
            {  /*to: "/assistant", label: "Assistant" */ },
            {  /*to: "/admin", label: "Admin" */ },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-[oklch(0.6_0.2_55)]" }}
              className="text-[oklch(0.25_0.05_265)] transition-colors hover:text-[oklch(0.6_0.2_55)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/scan"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-[oklch(0.7_0.18_55)] to-[oklch(0.55_0.16_150)] px-5 py-2 text-sm font-semibold text-white shadow-elegant ring-1 ring-white/40 transition hover:opacity-95"
        >
          Open App
        </Link>
      </div>
    </header>
  );
}
