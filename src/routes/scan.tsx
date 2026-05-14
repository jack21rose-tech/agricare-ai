import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Camera, Upload, Loader2, Sparkles, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { analyzeCropImage } from "@/lib/scan.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Crop Scanner — KisanAI" },
      { name: "description", content: "Upload a leaf photo and get instant AI-powered disease diagnosis with treatment recommendations." },
    ],
  }),
  component: Scan,
});

type Result = {
  disease: string;
  confidence: number;
  severity: string;
  causes: string;
  treatment: string;
  prevention: string;
  healthy: boolean;
};

function Scan() {
  const analyze = useServerFn(analyzeCropImage);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File) => {
    setError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      setLoading(true);
      try {
        const r = await analyze({ data: { imageDataUrl: dataUrl } });
        setResult(r as Result);
      } catch (e: any) {
        setError(e?.message ?? "Analysis failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Crop Diagnosis
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Scan your crop</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Upload a clear photo of an affected leaf. Our AI will identify the disease and recommend treatment.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Upload */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) onFile(f);
            }}
            className="relative flex min-h-[380px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card p-8 text-center shadow-soft transition hover:border-primary/50"
          >
            {preview ? (
              <img src={preview} alt="preview" className="absolute inset-0 h-full w-full rounded-3xl object-cover" />
            ) : (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                  <Camera className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">Drop a leaf photo here</h3>
                <p className="mt-2 text-sm text-muted-foreground">or click below to browse · JPG/PNG · up to 10MB</p>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant"
                >
                  <Upload className="h-4 w-4" /> Choose photo
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
                />
              </>
            )}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-background/70 backdrop-blur">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 font-medium">Analyzing your crop...</p>
                <p className="text-xs text-muted-foreground">Running multi-modal inference</p>
              </div>
            )}
          </div>

          {/* Result */}
          <div className="rounded-3xl border bg-card p-7 shadow-soft">
            {!result && !error && (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <Sparkles className="h-10 w-10 text-primary/40" />
                <p className="mt-4 max-w-xs text-sm">Your AI diagnosis will appear here. Tip: photograph in natural daylight.</p>
              </div>
            )}
            {error && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <AlertTriangle className="h-10 w-10 text-destructive" />
                <p className="mt-4 font-medium text-destructive">{error}</p>
              </div>
            )}
            {result && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${result.healthy ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                    {result.healthy ? <ShieldCheck className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                    {result.healthy ? "Healthy" : result.severity}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {Math.round(result.confidence * 100)}% confidence
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Diagnosis</p>
                  <h2 className="mt-1 font-display text-3xl font-bold">{result.disease}</h2>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-primary transition-all" style={{ width: `${Math.round(result.confidence * 100)}%` }} />
                </div>
                <Section title="Likely causes" body={result.causes} />
                <Section title="Treatment" body={result.treatment} accent />
                <Section title="Prevention" body={result.prevention} />
                <Link to="/assistant" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">
                  Ask the AI assistant <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ title, body, accent }: { title: string; body: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 ${accent ? "bg-primary/10" : "bg-secondary/60"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
