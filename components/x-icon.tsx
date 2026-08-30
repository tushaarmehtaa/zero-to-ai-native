import { siX } from "simple-icons";

export function XIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" role="img" aria-label="X">
      <path d={siX.path} />
    </svg>
  );
}
