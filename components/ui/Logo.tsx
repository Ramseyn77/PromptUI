import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 font-semibold tracking-tight" aria-label="PromptUI home">
      <span className="grid size-9 place-items-center rounded-lg bg-[var(--foreground)] text-sm font-black text-[var(--background)] shadow-sm">P</span>
      <span className="text-[15px]">PromptUI</span>
    </Link>
  );
}
