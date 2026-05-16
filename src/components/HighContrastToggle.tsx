import { useEffect, useState } from "react";
import { Contrast } from "lucide-react";

const KEY = "kisanai:hc";

export function HighContrastToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem(KEY) === "1";
    setOn(saved);
    if (saved) document.documentElement.classList.add("hc");
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.classList.toggle("hc", next);
    try { localStorage.setItem(KEY, next ? "1" : "0"); } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Disable high contrast mode" : "Enable high contrast mode"}
      title={on ? "High Contrast: ON" : "High Contrast: OFF"}
      className={`fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-elegant ring-2 transition focus-visible:outline-none focus-visible:ring-4 ${
        on
          ? "bg-black text-white ring-white"
          : "bg-white text-black ring-black hover:bg-[oklch(0.99_0.005_85)]"
      }`}
    >
      <Contrast className="h-4 w-4" />
      <span className="hidden sm:inline">{on ? "High Contrast ON" : "High Contrast"}</span>
    </button>
  );
}
