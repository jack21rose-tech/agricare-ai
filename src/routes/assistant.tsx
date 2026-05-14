import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, Mic, Leaf } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { askAssistant } from "@/lib/assistant.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — KisanAI" },
      { name: "description", content: "Chat with a multilingual AI farming assistant trained on Indian agronomy." },
    ],
  }),
  component: Assistant,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "मेरी टमाटर की पत्तियाँ पीली हो रही हैं, क्या करूँ?",
  "Best fertilizer for onion crop?",
  "कल बारिश होगी क्या?",
  "How to prevent late blight in tomatoes?",
];

function Assistant() {
  const ask = useServerFn(askAssistant);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "नमस्ते 🙏 I'm your KisanAI assistant. Ask me anything about your crops, weather, or farming — in any Indian language." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const r = await ask({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: (r as any).reply }]);
    } catch (e: any) {
      setMessages([...next, { role: "assistant", content: "⚠️ " + (e?.message ?? "Something went wrong. Try again.") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">KisanAI Assistant</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1"><Sparkles className="h-3 w-3" /> Multilingual · Voice-enabled</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto rounded-3xl border bg-card p-5 shadow-soft">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-secondary"
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-secondary px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {messages.length <= 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium shadow-soft transition hover:bg-secondary">
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="mt-4 flex items-center gap-2 rounded-full border bg-card p-1.5 shadow-soft"
        >
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary" aria-label="Voice input">
            <Mic className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything... (e.g. कल बारिश होगी क्या?)"
            className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </main>
    </div>
  );
}
