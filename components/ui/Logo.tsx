'use client';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';

export function Logo() {
  const { t, href } = useLocale();
  return (
    <Link href={href('/')} className="inline-flex items-center gap-2.5 font-semibold tracking-tight" aria-label={t.nav.home}>
      <span className="grid size-9 place-items-center rounded-lg bg-[var(--foreground)] font-display text-base font-bold text-[var(--background)] shadow-sm">P</span>
      <span className="font-display text-base font-semibold">PromptUI</span>
    </Link>
  );
}
