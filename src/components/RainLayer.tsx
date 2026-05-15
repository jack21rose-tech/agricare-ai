import { useMemo } from "react";

export function RainLayer({ count = 80, opacity = 0.6 }: { count?: number; opacity?: number }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 0.8 + Math.random() * 1.4,
        height: 40 + Math.random() * 60,
      })),
    [count]
  );
  return (
    <div className="rain-layer" aria-hidden style={{ opacity }}>
      {drops.map((d) => (
        <span
          key={d.id}
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            height: `${d.height}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
