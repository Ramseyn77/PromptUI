import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 font-semibold tracking-tight" aria-label="PromptUI home">
      <span className="grid size-9 place-items-center rounded-lg bg-[var(--foreground)] font-display text-base font-bold text-[var(--background)] shadow-sm">P</span>
      <span className="font-display text-base font-semibold">PromptUI</span>
    </Link>
  );
}
