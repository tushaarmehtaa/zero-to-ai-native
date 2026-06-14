import { COMPANY_ACCENT, type Company } from "@/lib/taxonomy";

export function CompanyMark({ company }: { company: Company }) {
  const accent = COMPANY_ACCENT[company];
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}80` }}
      />
      {company}
    </span>
  );
}
