export function VoiceWave({ bars = 7 }: { bars?: number }) {
  return (
    <span className="inline-flex items-center" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="voice-bar"
          style={{ animationDelay: `${i * 0.12}s`, height: `${14 + (i % 3) * 6}px` }}
        />
      ))}
    </span>
  );
}
