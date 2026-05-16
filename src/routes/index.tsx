import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Camera, CloudSun, MessageSquare, Mic, MapPin, Sparkles,
  Sprout, LineChart, ArrowRight, Wheat, Sun, CloudRain, Tractor,
  Quote, Wifi, WifiOff, Languages as LanguagesIcon, Leaf, Heart, Globe2,
} from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";
import leafScan from "@/assets/leaf-scan.jpg";
import womanFarmer from "@/assets/woman-farmer.jpg";
import villageAerial from "@/assets/village-aerial.jpg";
import handsSoil from "@/assets/hands-soil.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { RainLayer } from "@/components/RainLayer";
import { VoiceWave } from "@/components/VoiceWave";
import { RippleButton } from "@/components/RippleButton";
import { HighContrastToggle } from "@/components/HighContrastToggle";

function TricolorDivider() {
  return <div role="separator" aria-hidden className="divider-tricolor" />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KisanAI — हर किसान बनेगा स्मार्ट किसान" },
      { name: "description", content: "AI से चलेगी अगली खेती क्रांति। फसल की बीमारी पहचानें, मौसम जानें, और अपनी भाषा में सलाह पाएँ। Technology for Every Kisan." },
      { property: "og:title", content: "KisanAI — Technology for Every Kisan" },
      { property: "og:description", content: "Powered by AI, rooted in soil. India's farming revolution starts here." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Marquee />
      <TricolorDivider />
      <LivingDashboard />
      <TricolorDivider />
      <Features />
      <TricolorDivider />
      <ScanPreview />
      <TricolorDivider />
      <VoiceSection />
      <TricolorDivider />
      <Stories />
      <TricolorDivider />
      <Revolution />
      <TricolorDivider />
      <LanguagesBlock />
      <CTA />
      <Footer />
      <HighContrastToggle />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.18_0.06_265)]">
      {/* Tricolor top stripe */}
      <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-[oklch(0.7_0.18_55)] via-white to-[oklch(0.55_0.16_150)]" />
      <div className="absolute inset-0 -z-10">
        <img src={heroFarm} alt="" width={1920} height={1280} className="h-full w-full object-cover opacity-40" />
        {/* Solid dark base scrim — guarantees contrast regardless of image */}
        <div className="absolute inset-0 bg-[oklch(0.16_0.06_265/0.85)]" />
        {/* Tricolor brand gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.22_0.12_265/0.7)] via-[oklch(0.3_0.14_280/0.4)] to-[oklch(0.45_0.18_45/0.55)]" />
        {/* Left-side fade so headline always sits on dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.05_265/0.85)] via-[oklch(0.14_0.05_265/0.55)] to-transparent" />
        {/* Bottom fade into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>
      <RainLayer count={60} opacity={0.35} />

      {/* floating crops */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <Wheat className="absolute left-[8%] top-[28%] h-10 w-10 text-accent/60 animate-sway" />
        <Wheat className="absolute right-[12%] top-[40%] h-14 w-14 text-accent/50 animate-sway" style={{ animationDelay: "1.2s" }} />
        <Leaf className="absolute right-[28%] top-[18%] h-8 w-8 text-primary-glow/70 animate-leaf" style={{ animationDuration: "16s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-24 sm:px-6 sm:pt-32 lg:pt-40">
        <div className="max-w-3xl animate-rise [text-shadow:0_2px_18px_oklch(0.1_0.05_265/0.55)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-hindi">भारत के किसानों के लिए · Powered by Multi-modal AI</span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
            <span className="font-hindi block text-4xl font-semibold sm:text-5xl lg:text-6xl">
              हर किसान बनेगा{" "}
              <span className="bg-gradient-to-r from-[oklch(0.85_0.18_70)] via-[oklch(0.95_0.04_85)] to-[oklch(0.78_0.18_150)] bg-clip-text text-transparent [text-shadow:none]">
                स्मार्ट किसान
              </span>
            </span>
            <span className="mt-3 block text-3xl font-semibold text-white/95 sm:text-4xl lg:text-5xl">
              Technology for Every Kisan.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/90 text-balance">
            <span className="font-hindi">AI से चलेगी अगली खेती क्रांति।</span>{" "}
            Scan crops, read the sky, and get trusted advice in your own language — Hindi, Tamil, Marathi and more.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 [text-shadow:none]">
            <Link
              to="/scan"
              className="cta-saffron inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-bold transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
            >
              <Camera className="h-5 w-5" /> <span className="font-hindi">फसल स्कैन करें</span>
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-bold text-[oklch(0.2_0.08_265)] shadow-elegant ring-2 ring-white transition hover:bg-[oklch(0.97_0.02_85)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(0.55_0.16_150)]"
            >
              View Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-white/80">
            <span className="inline-flex items-center gap-2"><Mic className="h-4 w-4" /> Voice-first</span>
            <span className="inline-flex items-center gap-2"><WifiOff className="h-4 w-4" /> Offline-friendly</span>
            <span className="inline-flex items-center gap-2"><LanguagesIcon className="h-4 w-4" /> 12 भाषाएँ</span>
            <span className="inline-flex items-center gap-2"><Heart className="h-4 w-4" /> Free for farmers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "🌾 गेहूं ₹2,425/qtl", "🌽 मक्का ₹2,090/qtl", "🍅 टमाटर ₹1,640/qtl",
    "🌶️ मिर्च ₹8,200/qtl", "🥔 आलू ₹1,180/qtl", "🌱 धान ₹2,300/qtl",
    "🧅 प्याज ₹1,950/qtl", "☔ मानसून सक्रिय · IMD",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y bg-card">
      <div className="flex w-max animate-marquee gap-10 py-3 text-sm font-medium text-muted-foreground">
        {row.map((t, i) => (
          <span key={i} className="font-hindi whitespace-nowrap">{t}</span>
        ))}
      </div>
    </div>
  );
}

function LivingDashboard() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/40 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary motif-underline inline-block">Living Dashboard</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-balance sm:text-5xl">
            <span className="font-hindi">आपका खेत, अब डिजिटल।</span>
            <span className="mt-2 block text-2xl font-semibold text-muted-foreground sm:text-3xl">
              A dashboard that breathes with your farm.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Real-time weather, animated soil meters, AI crop alerts, mandi tickers, satellite views, and yield predictions — all flowing in one calm, beautiful canvas.
          </p>
          <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
            {[
              { i: CloudRain, t: "मौसम अलर्ट · Real-time" },
              { i: Sprout, t: "मिट्टी की सेहत · Soil health" },
              { i: LineChart, t: "उपज भविष्यवाणी · Yield AI" },
              { i: MapPin, t: "उपग्रह निगरानी · Satellite" },
            ].map(({ i: Icon, t }) => (
              <li key={t} className="flex items-center gap-3 rounded-xl border bg-card/60 p-3">
                <Icon className="h-5 w-5 text-primary" />
                <span className="font-hindi">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Floating widgets mockup */}
        <div className="relative h-[480px]">
          {/* Weather card */}
          <div className="absolute left-0 top-4 w-64 rounded-2xl border bg-card p-5 shadow-elegant glass animate-float">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-hindi">वाराणसी · आज</span>
              <Sun className="h-4 w-4 text-accent" />
            </div>
            <div className="mt-2 font-display text-4xl font-bold">28°C</div>
            <div className="mt-1 text-xs text-muted-foreground">Humid · Light showers expected</div>
            <div className="mt-3 flex items-end gap-1">
              {[18, 22, 26, 28, 24, 20, 19].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-sky/40 to-primary/60" style={{ height: `${h * 1.3}px` }} />
              ))}
            </div>
          </div>

          {/* Soil meter */}
          <div className="absolute right-2 top-0 w-56 rounded-2xl border bg-card p-5 shadow-elegant glass animate-float" style={{ animationDelay: "0.6s" }}>
            <div className="text-xs text-muted-foreground"><span className="font-hindi">मिट्टी की नमी</span></div>
            <div className="relative mt-3 h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="42" stroke="oklch(0.92 0.02 130)" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="42" stroke="url(#g1)" strokeWidth="10" fill="none"
                  strokeDasharray={`${0.72 * 264} 264`} strokeLinecap="round" />
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.16 150)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.18 145)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold">72%</div>
            </div>
            <div className="mt-2 text-xs text-success">Optimal · सिंचाई की आवश्यकता नहीं</div>
          </div>

          {/* AI alert */}
          <div className="absolute left-8 top-56 w-72 rounded-2xl border bg-card p-5 shadow-elegant glass animate-float" style={{ animationDelay: "1.1s" }}>
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-warning" />
              </span>
              <span className="font-semibold text-warning">AI Alert · Outbreak Risk</span>
            </div>
            <div className="mt-2 font-hindi font-semibold">अगले 48 घंटे में पत्तों पर ब्लाइट का खतरा</div>
            <div className="mt-2 text-xs text-muted-foreground">Spray copper-oxychloride before rain. Recommended for Plot A.</div>
          </div>

          {/* Map pulse */}
          <div className="absolute right-6 bottom-4 w-60 rounded-2xl border bg-card p-5 shadow-elegant glass">
            <div className="text-xs text-muted-foreground">Satellite · NDVI</div>
            <div className="relative mt-3 h-28 overflow-hidden rounded-xl bg-gradient-to-br from-primary/30 via-success/30 to-earth/30">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary">
                  <span className="absolute inline-block h-full w-full animate-map-pulse rounded-full" />
                </span>
              </span>
            </div>
            <div className="mt-2 text-xs">Healthy canopy · 0.78</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: Camera, t: "Disease Detection", h: "बीमारी पहचानें", d: "Snap a leaf — get diagnosis, severity, and treatment with Grad-CAM heatmaps." },
    { icon: CloudSun, t: "Weather Intelligence", h: "मौसम बुद्धिमत्ता", d: "Hyperlocal forecasts and AI-predicted outbreak risk for your farm." },
    { icon: MessageSquare, t: "AI Assistant", h: "AI सहायक", d: "ChatGPT-style farming advice trained on Indian agronomy." },
    { icon: Mic, t: "Voice First", h: "बोलकर पूछें", d: "Speak in Hindi or your local language. Hands free in the field." },
    { icon: MapPin, t: "Geo Alerts", h: "क्षेत्रीय अलर्ट", d: "Outbreak warnings tied to your GPS and crop calendar." },
    { icon: LineChart, t: "Farm Analytics", h: "खेत विश्लेषण", d: "Health trends, yield estimates, and irrigation insights." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary motif-underline inline-block">What it does</p>
        <h2 className="mt-4 font-display text-4xl font-bold text-balance sm:text-5xl">
          <span className="font-hindi">जेब में पूरा कृषि वैज्ञानिक।</span>
          <span className="mt-2 block text-2xl font-semibold text-muted-foreground sm:text-3xl">
            An entire agronomist in your pocket.
          </span>
        </h2>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feats.map(({ icon: Icon, t, h, d }, i) => {
          const palette = [
            { bg: "cta-saffron", h: "text-[oklch(0.55_0.22_50)]" },
            { bg: "cta-indigo",  h: "text-[oklch(0.35_0.16_265)]" },
            { bg: "cta-green",   h: "text-[oklch(0.42_0.17_150)]" },
          ][i % 3];
          return (
            <div key={t} className="group rounded-2xl border border-[oklch(0.86_0.04_85)] bg-card p-6 shadow-soft border-tricolor-t transition hover:-translate-y-1 hover:shadow-elegant">
              <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl shadow-glow ${palette.bg}`}>
                <Icon className="h-6 w-6 text-white" />
                <span className="absolute -inset-1 rounded-2xl animate-node-glow opacity-0 group-hover:opacity-100" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">{t}</h3>
              <p className={`mt-1 font-hindi text-sm font-semibold ${palette.h}`}>{h}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{d}</p>
            </div>
          );
        })}
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
              <span className="font-hindi">निदान</span>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-success">96% confidence</span>
            </div>
            <div className="mt-2 font-display text-lg font-semibold">Early Blight</div>
            <p className="mt-1 text-xs text-muted-foreground"><span className="font-hindi">कॉपर-आधारित फफूंदनाशक का छिड़काव करें।</span> Avoid overhead irrigation for 5 days.</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[72%] bg-gradient-primary" />
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Severity · Moderate</div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary motif-underline inline-block">Computer Vision</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-balance">
            <span className="font-hindi">देखें · पहचानें · इलाज करें।</span>
            <span className="mt-2 block text-2xl font-semibold text-muted-foreground sm:text-3xl">
              Point. Shoot. Diagnose.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Our multi-modal model fuses CNN image features with live weather, soil, and crop calendar to give you a diagnosis you can trust — even on a 2G connection.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              { en: "Works offline-first with edge inference", hi: "बिना इंटरनेट भी काम करता है" },
              { en: "Explainable heatmaps show exactly where the disease is", hi: "बीमारी की जगह तस्वीर पर दिखती है" },
              { en: "Actionable treatment in your local language", hi: "इलाज आपकी अपनी भाषा में" },
            ].map((x) => (
              <li key={x.en} className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                  <Sprout className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-sm">{x.en}</div>
                  <div className="font-hindi text-xs text-muted-foreground">{x.hi}</div>
                </div>
              </li>
            ))}
          </ul>
          <RippleButton
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition hover:opacity-90"
          >
            <span className="font-hindi">अभी आज़माएँ</span> <ArrowRight className="h-4 w-4" />
          </RippleButton>
        </div>
      </div>
    </section>
  );
}

function VoiceSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <img src={villageAerial} alt="" width={1280} height={720} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary motif-underline inline-block">Voice First</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            <span className="font-hindi">बस बोलिए — हम सुन रहे हैं।</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            For farmers who'd rather speak than type. Tap once, ask anything in Hindi, Bhojpuri, Marathi or Tamil — get an answer in seconds.
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-soft">
            <button className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
              <span className="absolute inset-0 rounded-full animate-pulse-ring" />
              <Mic className="h-6 w-6" />
            </button>
            <div className="flex-1">
              <div className="font-hindi text-sm">"मेरी टमाटर की पत्तियाँ पीली क्यों हो रही हैं?"</div>
              <div className="mt-2"><VoiceWave /></div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={womanFarmer} alt="Indian woman farmer" width={1024} height={1024} loading="lazy" className="rounded-3xl object-cover shadow-elegant" />
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const stories = [
    {
      name: "सुनीता देवी",
      place: "Jaunpur, UP",
      quote: "AI ने मेरी टमाटर की फसल बचा ली। पहले हर साल नुकसान होता था, अब मुनाफा हो रहा है।",
      img: womanFarmer,
    },
    {
      name: "Ramesh Patil",
      place: "Nashik, Maharashtra",
      quote: "मंडी के दाम मोबाइल पर देखकर सही दिन फसल बेची — 30% ज़्यादा कमाई।",
      img: handsSoil,
    },
    {
      name: "Lakshmi Reddy",
      place: "Anantapur, AP",
      quote: "पानी कब और कितना देना है, अब AI बताता है। बिजली का बिल आधा हो गया।",
      img: villageAerial,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary motif-underline inline-block">Farmer Success Stories</p>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          <span className="font-hindi">गाँव से ग्लोबल मार्केट तक।</span>
          <span className="mt-2 block text-2xl font-semibold text-muted-foreground sm:text-3xl">From Village to Global Market.</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {stories.map((s) => (
          <article key={s.name} className="group overflow-hidden rounded-3xl border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
            <div className="relative h-56 overflow-hidden">
              <img src={s.img} alt={s.name} width={800} height={600} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <div className="font-display text-lg font-semibold">{s.name}</div>
                <div className="text-xs opacity-80">{s.place}</div>
              </div>
            </div>
            <div className="p-6">
              <Quote className="h-5 w-5 text-primary" />
              <p className="mt-3 font-hindi text-sm leading-relaxed text-foreground/90">{s.quote}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Revolution() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img src={handsSoil} alt="Soil and sprout" width={1024} height={1024} loading="lazy" className="rounded-3xl object-cover shadow-elegant" />
          {/* tractor progress */}
          <div className="absolute -bottom-5 left-6 right-6 overflow-hidden rounded-full border bg-card p-2 shadow-elegant glass">
            <div className="relative h-6">
              <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-secondary" />
              <Tractor className="tractor-track absolute top-1/2 -translate-y-1/2 h-6 w-6 text-earth" />
            </div>
            <div className="mt-2 px-2 text-[10px] uppercase tracking-widest text-muted-foreground">Tilling AI · 64% complete</div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary motif-underline inline-block">India's Digital Farming Revolution</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            <span className="font-hindi">मिट्टी में जड़ें, AI में पंख।</span>
            <span className="mt-2 block text-2xl font-semibold text-muted-foreground sm:text-3xl">Powered by AI, rooted in soil.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From Punjab's wheat belts to Tamil Nadu's paddy plains, KisanAI is building India's farming nervous system — drones, satellites, models, and human wisdom, woven together.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: "120M+", l: "किसान · Farmers" },
              { v: "28", l: "राज्य · States" },
              { v: "12", l: "भाषाएँ · Languages" },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl border bg-card/60 p-4 text-center shadow-soft">
                <div className="font-display text-2xl font-bold text-primary">{x.v}</div>
                <div className="mt-1 font-hindi text-xs text-muted-foreground">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LanguagesBlock() {
  const langs = ["हिंदी", "English", "தமிழ்", "मराठी", "ਪੰਜਾਬੀ", "বাংলা", "తెలుగు", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം", "ଓଡ଼ିଆ", "اردو"];
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Globe2 className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
          <span className="font-hindi">आपकी भाषा · आपकी आवाज़</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Voice and chat in 12 Indian languages so every farmer feels at home.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {langs.map((l) => (
            <span key={l} className="rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-soft transition hover:-translate-y-0.5 hover:shadow-elegant">{l}</span>
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
        <RainLayer count={40} opacity={0.25} />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <Sparkles className="h-7 w-7 text-primary-foreground" />
          <h2 className="mt-4 font-display text-4xl font-bold text-primary-foreground text-balance sm:text-5xl">
            <span className="font-hindi">अगली खेती क्रांति में आपका स्वागत है।</span>
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/85">Free for India's 120 million Kisans. <span className="font-hindi">हमेशा मुफ़्त। हमेशा आपकी भाषा में।</span></p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 font-semibold text-foreground shadow-elegant transition hover:scale-[1.02]">
              <span className="font-hindi">शुरू करें</span> <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/assistant" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-primary-foreground backdrop-blur transition hover:bg-white/20">
              <Mic className="h-4 w-4" /> Talk to AI
            </Link>
          </div>
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
          <span className="ml-2 font-hindi text-xs text-muted-foreground">· भारत के किसानों के लिए</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Wifi className="h-3.5 w-3.5 text-success" />
          <span className="font-hindi">© 2026 KisanAI · मिट्टी से बना, AI से चला</span>
        </div>
      </div>
    </footer>
  );
}
