import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CloudSun, Droplets, Wind, Thermometer, Sprout, AlertTriangle, Camera,
  MessageSquare, TrendingUp, Calendar, MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — KisanAI" },
      { name: "description", content: "Your farm at a glance: weather, crop health, alerts and AI recommendations." },
    ],
  }),
  component: Dashboard,
});

const healthData = [
  { d: "Mon", v: 78 }, { d: "Tue", v: 82 }, { d: "Wed", v: 80 },
  { d: "Thu", v: 86 }, { d: "Fri", v: 84 }, { d: "Sat", v: 89 }, { d: "Sun", v: 92 },
];
const weatherData = [
  { d: "Mon", t: 28, r: 0 }, { d: "Tue", t: 30, r: 2 }, { d: "Wed", t: 31, r: 0 },
  { d: "Thu", t: 29, r: 8 }, { d: "Fri", t: 27, r: 12 }, { d: "Sat", t: 26, r: 4 }, { d: "Sun", t: 28, r: 0 },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">नमस्ते, Ramesh 🌾</p>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Your farm today</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Nashik, Maharashtra · 4.2 acres · Tomato, Onion
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/scan" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant">
              <Camera className="h-4 w-4" /> Scan crop
            </Link>
            <Link to="/assistant" className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold shadow-soft">
              <MessageSquare className="h-4 w-4" /> Ask AI
            </Link>
          </div>
        </div>

        {/* Weather strip */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Thermometer} label="Temperature" value="28°C" hint="Feels like 30°" tone="warning" />
          <Stat icon={Droplets} label="Humidity" value="76%" hint="High — fungal risk" tone="sky" />
          <Stat icon={Wind} label="Wind" value="14 km/h" hint="SW · gentle" tone="muted" />
          <Stat icon={CloudSun} label="Rain (24h)" value="8 mm" hint="Light showers" tone="sky" />
        </div>

        {/* Alert */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-warning/30 bg-warning/10 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/20">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="font-semibold">Disease risk: Late Blight</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              High humidity + moderate temps for 48h. Spray Mancozeb 0.25% on tomato plots within 2 days.
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Crop health index" subtitle="Weekly trend across all plots" icon={TrendingUp} />
            <div className="h-64 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.52 0.16 150)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.52 0.16 150)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 130)" vertical={false} />
                  <XAxis dataKey="d" stroke="oklch(0.48 0.03 150)" fontSize={12} />
                  <YAxis stroke="oklch(0.48 0.03 150)" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.02 130)" }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.52 0.16 150)" strokeWidth={3} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <CardHeader title="Weather forecast" subtitle="7-day · °C / mm" icon={CloudSun} />
            <div className="h-64 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 130)" vertical={false} />
                  <XAxis dataKey="d" stroke="oklch(0.48 0.03 150)" fontSize={12} />
                  <YAxis stroke="oklch(0.48 0.03 150)" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 12 }} />
                  <Line type="monotone" dataKey="t" stroke="oklch(0.74 0.16 70)" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="r" stroke="oklch(0.68 0.12 230)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader title="Recent scans" icon={Sprout} />
            <div className="space-y-3 p-4">
              {[
                { c: "Tomato", d: "Early Blight", s: "Moderate", color: "warning" },
                { c: "Onion", d: "Healthy", s: "—", color: "success" },
                { c: "Tomato", d: "Healthy", s: "—", color: "success" },
              ].map((x, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border bg-card p-3">
                  <div>
                    <p className="font-medium">{x.c}</p>
                    <p className="text-xs text-muted-foreground">{x.d}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${x.color === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                    {x.s === "—" ? "Healthy" : x.s}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Crop calendar" icon={Calendar} />
            <div className="space-y-3 p-4">
              {[
                { t: "Irrigate Plot A", d: "Tomorrow · 6:00 AM" },
                { t: "Fertilizer dose 2", d: "Sat · NPK 19:19:19" },
                { t: "Pest scout", d: "Mon · whitefly check" },
              ].map((x) => (
                <div key={x.t} className="flex items-start gap-3 rounded-xl bg-secondary/60 p-3">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{x.t}</p>
                    <p className="text-xs text-muted-foreground">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="AI recommendations" icon={Sprout} />
            <div className="space-y-3 p-4 text-sm">
              <p className="rounded-xl bg-primary/10 p-3 text-foreground">
                💧 Reduce irrigation by 20% — rain expected Friday.
              </p>
              <p className="rounded-xl bg-accent/15 p-3 text-foreground">
                🌱 Tomato yield projection up 12% vs last season.
              </p>
              <p className="rounded-xl bg-sky/15 p-3 text-foreground">
                🐛 Pheromone traps recommended for onion plot.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon: Icon, label, value, hint, tone }: { icon: any; label: string; value: string; hint: string; tone: "warning" | "sky" | "muted" }) {
  const toneCls = tone === "warning" ? "bg-warning/15 text-warning" : tone === "sky" ? "bg-sky/15 text-sky" : "bg-muted text-muted-foreground";
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneCls}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-card shadow-soft ${className}`}>{children}</div>;
}
function CardHeader({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: any }) {
  return (
    <div className="flex items-center justify-between border-b p-5">
      <div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
    </div>
  );
}
