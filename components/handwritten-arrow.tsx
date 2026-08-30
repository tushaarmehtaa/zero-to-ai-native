export function HandwrittenArrow({ className = "h-7 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M40 35C34 31 27 29 21 22C17 17 14 14 10 11" />
      <path d="M4 13L10 11L9 18" />
    </svg>
  );
}
