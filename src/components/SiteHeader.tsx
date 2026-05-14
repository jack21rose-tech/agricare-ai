import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold">KisanAI</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
          <Link to="/scan" className="text-muted-foreground hover:text-foreground">Scan</Link>
          <Link to="/assistant" className="text-muted-foreground hover:text-foreground">Assistant</Link>
        </nav>
        <Link
          to="/dashboard"
          className="inline-flex items-center rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-90"
        >
          Open App
        </Link>
      </div>
    </header>
  );
}
