import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf, Camera, CloudSun, MessageSquare, Mic, MapPin, ShieldCheck, Sparkles,
  Sprout, LineChart, Languages, ArrowRight,
} from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";
import leafScan from "@/assets/leaf-scan.jpg";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KisanAI — AI Farming Assistant for Indian Farmers" },
      { name: "description", content: "Detect crop diseases, get weather-aware advice, and chat with an AI assistant in your language. Built for India's farmers." },
      { property: "og:title", content: "KisanAI — AI Farming Assistant" },
      { property: "og:description", content: "Computer vision for crop disease detection, hyperlocal weather intelligence, and a multilingual AI assistant." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Stats />
      <Features />
      <ScanPreview />
      <HowItWorks />
      <Languages_ />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroFarm} alt="" width={1920} height={1280} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-24 sm:px-6 sm:pt-32 lg:pt-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Powered by Multi-modal AI
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
            Smarter farms.<br />
            <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
              Healthier harvests.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80 text-balance">
            KisanAI scans your crops, reads the weather, and advises you in Hindi, Tamil, Marathi and more — so every Kisan farms with intelligence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/scan"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-foreground shadow-elegant transition hover:scale-[1.02]"
            >
              <Camera className="h-5 w-5" /> Scan a crop
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              View dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { v: "98.4%", l: "Disease detection accuracy" },
    { v: "7 crops", l: "Supported today" },
    { v: "12 languages", l: "Voice & chat" },
    { v: "<2s", l: "Avg. inference time" },
  ];
  return (
    <section className="border-y bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.l}>
            <div className="font-display text-3xl font-bold text-primary">{i.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{i.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: Camera, t: "Disease Detection", d: "Snap a leaf — get diagnosis, severity, and treatment with Grad-CAM heatmaps." },
    { icon: CloudSun, t: "Weather Intelligence", d: "Hyperlocal forecasts and AI-predicted outbreak risk for your farm." },
    { icon: MessageSquare, t: "AI Assistant", d: "ChatGPT-style farming advice trained on Indian agronomy." },
    { icon: Mic, t: "Voice First", d: "Speak in Hindi or your local language. Hands free in the field." },
    { icon: MapPin, t: "Geo Alerts", d: "Outbreak warnings tied to your GPS and crop calendar." },
    { icon: LineChart, t: "Farm Analytics", d: "Health trends, yield estimates, and irrigation insights." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">What it does</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-balance sm:text-5xl">An entire agronomist in your pocket.</h2>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feats.map(({ icon: Icon, t, d }) => (
          <div key={t} className="group rounded-2xl border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScanPreview() {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src={leafScan} alt="Leaf scan" width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-72 rounded-2xl bg-card p-5 shadow-elegant glass">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Diagnosis</span>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-success">96% confidence</span>
            </div>
            <div className="mt-2 font-display text-lg font-semibold">Early Blight</div>
            <p className="mt-1 text-xs text-muted-foreground">Apply copper-based fungicide. Avoid overhead irrigation for 5 days.</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[72%] bg-gradient-primary" />
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Severity · Moderate</div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Computer Vision</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-balance">Point. Shoot. Diagnose.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our multi-modal model fuses CNN image features with live weather and crop metadata to give you a diagnosis you can trust — even on a 2G connection.
          </p>
          <ul className="mt-6 space-y-3">
            {["Works offline-first with edge inference", "Explainable heatmaps show exactly where the disease is", "Actionable treatment in your local language"].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">{x}</span>
              </li>
            ))}
          </ul>
          <Link to="/scan" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition hover:opacity-90">
            Try the scanner <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Capture", d: "Take a photo of the affected leaf or fruit.", icon: Camera },
    { n: "02", t: "Analyse", d: "Our AI fuses image + weather + soil + season.", icon: Sparkles },
    { n: "03", t: "Act", d: "Get treatment, timing, and dose in your language.", icon: Sprout },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <h2 className="font-display text-4xl font-bold text-balance">How it works</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map(({ n, t, d, icon: Icon }) => (
          <div key={n} className="relative rounded-2xl border bg-card p-7 shadow-soft">
            <div className="font-display text-5xl font-bold text-primary/10">{n}</div>
            <Icon className="absolute right-7 top-7 h-7 w-7 text-primary" />
            <h3 className="mt-2 font-display text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Languages_() {
  const langs = ["हिंदी", "English", "தமிழ்", "मराठी", "ਪੰਜਾਬੀ", "বাংলা", "తెలుగు", "ગુજરાતી"];
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Languages className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Speaks your language</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Voice and chat in 12 Indian languages so every farmer feels at home.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {langs.map((l) => (
            <span key={l} className="rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-soft">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 shadow-elegant sm:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl font-bold text-primary-foreground text-balance sm:text-5xl">
            Built for India's 120 million Kisans.
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">Free for farmers. Join the AI agriculture revolution.</p>
          <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 font-semibold text-foreground shadow-elegant">
            Get started free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold">KisanAI</span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 KisanAI · Made with 🌱 for farmers</p>
      </div>
    </footer>
  );
}
