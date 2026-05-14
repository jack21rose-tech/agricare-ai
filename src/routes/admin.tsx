import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users, Activity, Cpu, Megaphone, Search, MoreVertical, ShieldCheck, ShieldAlert,
  TrendingUp, TrendingDown, Send, Radio, CheckCircle2, AlertTriangle, Sparkles,
  ArrowUpRight, Filter, Download,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — KisanAI" },
      { name: "description", content: "Manage farmers, monitor AI model performance, review disease analytics, and broadcast real-time alerts." },
    ],
  }),
  component: Admin,
});

type Tab = "overview" | "users" | "analytics" | "model" | "alerts";

function Admin() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-secondary/30">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3 w-3" /> Admin
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Control Center</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage farmers, models, and platform-wide alerts.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold shadow-soft">
              <Download className="h-4 w-4" /> Export
            </button>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
              Farmer view <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 overflow-x-auto rounded-full border bg-card p-1 shadow-soft">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "users", label: "Users", icon: Users },
            { id: "analytics", label: "Disease Analytics", icon: TrendingUp },
            { id: "model", label: "Model Performance", icon: Cpu },
            { id: "alerts", label: "Broadcast Alerts", icon: Megaphone },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as Tab)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === id ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "overview" && <Overview />}
          {tab === "users" && <UsersPanel />}
          {tab === "analytics" && <Analytics />}
          {tab === "model" && <ModelPerf />}
          {tab === "alerts" && <Alerts />}
        </div>
      </main>
    </div>
  );
}

/* ----------------- OVERVIEW ----------------- */

function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI label="Total Farmers" value="48,219" delta="+12.4%" up icon={Users} />
        <KPI label="Scans (24h)" value="9,847" delta="+8.1%" up icon={Activity} />
        <KPI label="Model Accuracy" value="98.4%" delta="+0.3%" up icon={Cpu} />
        <KPI label="Active Alerts" value="3" delta="−2" icon={Radio} tone="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Platform activity" subtitle="Daily scans + signups" />
          <div className="h-72 px-2 pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 130)" vertical={false} />
                <XAxis dataKey="d" stroke="oklch(0.48 0.03 150)" fontSize={12} />
                <YAxis stroke="oklch(0.48 0.03 150)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.02 130)" }} />
                <Bar dataKey="scans" fill="oklch(0.52 0.16 150)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="signups" fill="oklch(0.78 0.14 75)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Recent activity" />
          <div className="space-y-3 p-4 text-sm">
            {[
              { t: "Outbreak alert sent to Punjab", ago: "12m ago", ok: true },
              { t: "Model v2.4 deployed", ago: "1h ago", ok: true },
              { t: "342 farmers onboarded today", ago: "2h ago", ok: true },
              { t: "Inference latency spike", ago: "3h ago", ok: false },
            ].map((x, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-secondary/60 p-3">
                {x.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> : <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />}
                <div className="flex-1">
                  <p className="font-medium">{x.t}</p>
                  <p className="text-xs text-muted-foreground">{x.ago}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

const activityData = [
  { d: "Mon", scans: 7200, signups: 320 },
  { d: "Tue", scans: 8400, signups: 410 },
  { d: "Wed", scans: 9100, signups: 380 },
  { d: "Thu", scans: 8700, signups: 450 },
  { d: "Fri", scans: 9800, signups: 510 },
  { d: "Sat", scans: 10400, signups: 480 },
  { d: "Sun", scans: 9847, signups: 542 },
];

/* ----------------- USERS ----------------- */

const seedUsers = [
  { name: "Ramesh Patil", phone: "+91 98201 ••••", region: "Nashik, MH", crops: "Tomato, Onion", role: "Farmer", scans: 127, status: "Active" },
  { name: "Lakshmi Devi", phone: "+91 99450 ••••", region: "Mysuru, KA", crops: "Rice, Sugarcane", role: "Farmer", scans: 89, status: "Active" },
  { name: "Dr. A. Sharma", phone: "+91 98110 ••••", region: "New Delhi", crops: "—", role: "Expert", scans: 0, status: "Verified" },
  { name: "Harpreet Singh", phone: "+91 98140 ••••", region: "Ludhiana, PB", crops: "Wheat, Cotton", role: "Farmer", scans: 214, status: "Active" },
  { name: "Mohan Reddy", phone: "+91 98480 ••••", region: "Guntur, AP", crops: "Chilli, Cotton", role: "Farmer", scans: 56, status: "Inactive" },
  { name: "Priya Nair", phone: "+91 94470 ••••", region: "Kochi, KL", crops: "Banana, Coconut", role: "Farmer", scans: 78, status: "Active" },
  { name: "Dr. K. Iyer", phone: "+91 98400 ••••", region: "Coimbatore, TN", crops: "—", role: "Expert", scans: 0, status: "Pending" },
];

function UsersPanel() {
  const [q, setQ] = useState("");
  const filtered = seedUsers.filter((u) =>
    [u.name, u.region, u.crops, u.role].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-3 border-b p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search farmers, experts, regions..."
            className="w-full rounded-full border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium">
          <Filter className="h-4 w-4" /> Filter
        </button>
        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant">
          + Invite expert
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 font-medium">Farmer</th>
              <th className="px-5 py-3 font-medium">Region</th>
              <th className="px-5 py-3 font-medium">Crops</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Scans</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={i} className="border-b last:border-0 transition hover:bg-secondary/30">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                      {u.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{u.region}</td>
                <td className="px-5 py-4 text-muted-foreground">{u.crops}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    u.role === "Expert" ? "bg-sky/15 text-sky" : "bg-primary/10 text-primary"
                  }`}>{u.role}</span>
                </td>
                <td className="px-5 py-4 font-medium">{u.scans}</td>
                <td className="px-5 py-4">
                  <StatusPill status={u.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">No users match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t p-4 text-xs text-muted-foreground">
        <span>Showing {filtered.length} of 48,219 users</span>
        <div className="flex gap-1">
          <button className="rounded-lg border px-3 py-1.5">Previous</button>
          <button className="rounded-lg bg-primary px-3 py-1.5 text-primary-foreground">1</button>
          <button className="rounded-lg border px-3 py-1.5">2</button>
          <button className="rounded-lg border px-3 py-1.5">Next</button>
        </div>
      </div>
    </Card>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-success/15 text-success",
    Verified: "bg-success/15 text-success",
    Inactive: "bg-muted text-muted-foreground",
    Pending: "bg-warning/15 text-warning",
  };
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${map[status] ?? ""}`}>{status}</span>;
}

/* ----------------- ANALYTICS ----------------- */

const diseaseData = [
  { name: "Late Blight", value: 2840, color: "oklch(0.58 0.22 25)" },
  { name: "Early Blight", value: 1920, color: "oklch(0.74 0.16 70)" },
  { name: "Leaf Spot", value: 1430, color: "oklch(0.78 0.14 75)" },
  { name: "Powdery Mildew", value: 980, color: "oklch(0.68 0.12 230)" },
  { name: "Rust", value: 720, color: "oklch(0.55 0.09 60)" },
  { name: "Healthy", value: 3210, color: "oklch(0.52 0.16 150)" },
];

const regionData = [
  { r: "Maharashtra", v: 4200 },
  { r: "Punjab", v: 3800 },
  { r: "UP", v: 3500 },
  { r: "Karnataka", v: 2900 },
  { r: "AP", v: 2400 },
  { r: "TN", v: 2100 },
];

function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <KPI label="Total diagnoses" value="11,100" delta="+18%" up icon={Activity} />
        <KPI label="Outbreak risk regions" value="7" delta="+2" icon={AlertTriangle} tone="warning" />
        <KPI label="Avg severity score" value="2.4 / 5" delta="−0.3" up icon={ShieldCheck} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Disease distribution" subtitle="Last 30 days" />
          <div className="h-80 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diseaseData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {diseaseData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Regional case load" subtitle="Top states by scan volume" />
          <div className="h-80 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 130)" horizontal={false} />
                <XAxis type="number" stroke="oklch(0.48 0.03 150)" fontSize={12} />
                <YAxis type="category" dataKey="r" stroke="oklch(0.48 0.03 150)" fontSize={12} width={90} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="v" fill="oklch(0.52 0.16 150)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ----------------- MODEL PERFORMANCE ----------------- */

const modelMetrics = [
  { d: "W1", acc: 96.8, lat: 1.4 },
  { d: "W2", acc: 97.2, lat: 1.3 },
  { d: "W3", acc: 97.6, lat: 1.5 },
  { d: "W4", acc: 97.9, lat: 1.2 },
  { d: "W5", acc: 98.1, lat: 1.1 },
  { d: "W6", acc: 98.3, lat: 1.0 },
  { d: "W7", acc: 98.4, lat: 1.0 },
];

function ModelPerf() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI label="Accuracy" value="98.4%" delta="+0.3%" up icon={ShieldCheck} />
        <KPI label="F1 Score" value="0.971" delta="+0.008" up icon={Sparkles} />
        <KPI label="Inference (p50)" value="0.98s" delta="−0.12s" up icon={Cpu} />
        <KPI label="GPU utilisation" value="64%" delta="+4%" icon={Activity} tone="muted" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Accuracy & latency" subtitle="Last 7 weeks" />
          <div className="h-80 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={modelMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 130)" vertical={false} />
                <XAxis dataKey="d" stroke="oklch(0.48 0.03 150)" fontSize={12} />
                <YAxis yAxisId="left" stroke="oklch(0.52 0.16 150)" fontSize={12} domain={[95, 100]} />
                <YAxis yAxisId="right" orientation="right" stroke="oklch(0.74 0.16 70)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="acc" stroke="oklch(0.52 0.16 150)" strokeWidth={3} dot={{ r: 4 }} name="Accuracy %" />
                <Line yAxisId="right" type="monotone" dataKey="lat" stroke="oklch(0.74 0.16 70)" strokeWidth={3} dot={{ r: 4 }} name="Latency s" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Model versions" />
          <div className="space-y-3 p-4 text-sm">
            {[
              { v: "v2.4", t: "Production", desc: "EfficientNet-B4 + weather fusion", acc: "98.4%", active: true },
              { v: "v2.3", t: "Archived", desc: "EfficientNet-B4", acc: "97.9%", active: false },
              { v: "v3.0-rc1", t: "Canary 5%", desc: "ConvNeXt + multi-modal", acc: "98.7%", active: false },
            ].map((m, i) => (
              <div key={i} className={`rounded-xl border p-3 ${m.active ? "border-primary bg-primary/5" : "bg-card"}`}>
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold">{m.v}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    m.t === "Production" ? "bg-success/15 text-success" :
                    m.t.startsWith("Canary") ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"
                  }`}>{m.t}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
                <p className="mt-1 text-xs font-medium">Accuracy: {m.acc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ----------------- BROADCAST ALERTS ----------------- */

function Alerts() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [severity, setSeverity] = useState<"info" | "warning" | "critical">("warning");
  const [region, setRegion] = useState("All India");
  const [channel, setChannel] = useState<string[]>(["push", "sms"]);
  const [sent, setSent] = useState<Array<{ title: string; region: string; severity: string; ago: string; reach: string }>>([
    { title: "High humidity — fungal risk", region: "Maharashtra", severity: "warning", ago: "2h ago", reach: "12,400 farmers" },
    { title: "Heat wave warning", region: "Rajasthan", severity: "critical", ago: "1d ago", reach: "8,200 farmers" },
    { title: "Mandi prices updated", region: "All India", severity: "info", ago: "2d ago", reach: "48,219 farmers" },
  ]);

  const toggleChannel = (c: string) =>
    setChannel((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const broadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setSent([{ title, region, severity, ago: "just now", reach: "—" }, ...sent]);
    setTitle(""); setBody("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Composer */}
      <Card className="lg:col-span-3">
        <CardHeader title="Compose broadcast" subtitle="Push, SMS, and WhatsApp to targeted farmers" icon={Megaphone} />
        <form onSubmit={broadcast} className="space-y-4 p-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              placeholder="e.g. Heavy rainfall expected in Konkan region"
              className="mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              maxLength={300}
              placeholder="Postpone irrigation. Cover seedlings with plastic sheets..."
              className="mt-1.5 w-full resize-none rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">{body.length}/300</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severity</label>
              <div className="mt-1.5 flex gap-1 rounded-full border bg-card p-1">
                {(["info", "warning", "critical"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeverity(s)}
                    className={`flex-1 rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
                      severity === s ? (s === "critical" ? "bg-destructive text-destructive-foreground" : s === "warning" ? "bg-warning text-foreground" : "bg-sky text-foreground") : "text-muted-foreground"
                    }`}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              >
                <option>All India</option>
                <option>Maharashtra</option>
                <option>Punjab</option>
                <option>Uttar Pradesh</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Channels</label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {[
                { id: "push", label: "Push" },
                { id: "sms", label: "SMS" },
                { id: "whatsapp", label: "WhatsApp" },
                { id: "inapp", label: "In-app" },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleChannel(c.id)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                    channel.includes(c.id) ? "border-primary bg-primary/10 text-primary" : "bg-card text-muted-foreground"
                  }`}
                >{c.label}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-xs text-muted-foreground">
              Estimated reach: <span className="font-semibold text-foreground">
                {region === "All India" ? "48,219" : "12,400"} farmers
              </span>
            </p>
            <button
              type="submit"
              disabled={!title.trim() || !body.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Broadcast
            </button>
          </div>
        </form>
      </Card>

      {/* Sent alerts */}
      <Card className="lg:col-span-2">
        <CardHeader title="Recent broadcasts" icon={Radio} />
        <div className="space-y-3 p-4">
          {sent.map((a, i) => (
            <div key={i} className="rounded-xl border bg-card p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-snug">{a.title}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                  a.severity === "critical" ? "bg-destructive/15 text-destructive" :
                  a.severity === "warning" ? "bg-warning/15 text-warning" : "bg-sky/15 text-sky"
                }`}>{a.severity}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.region}</span>
                <span>{a.ago} · {a.reach}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ----------------- shared bits ----------------- */

function KPI({
  label, value, delta, up, icon: Icon, tone = "primary",
}: { label: string; value: string; delta?: string; up?: boolean; icon: any; tone?: "primary" | "warning" | "muted" }) {
  const iconCls = tone === "warning" ? "bg-warning/15 text-warning" : tone === "muted" ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary";
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconCls}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
      {delta && (
        <div className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${up ? "text-success" : "text-muted-foreground"}`}>
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {delta}
        </div>
      )}
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
