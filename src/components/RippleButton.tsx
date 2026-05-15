import { useRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function RippleButton({
  className,
  children,
  onClick,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  function handle(e: MouseEvent<HTMLButtonElement>) {
    const btn = ref.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const span = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      span.className = "ripple";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - rect.left - size / 2}px`;
      span.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(span);
      setTimeout(() => span.remove(), 750);
    }
    onClick?.(e);
  }
  return (
    <button ref={ref} onClick={handle} className={cn("ripple-container", className)} {...rest}>
      {children}
    </button>
  );
}
