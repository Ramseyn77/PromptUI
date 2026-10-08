/**
 * @registry
 * name: Social Login Buttons
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Pile de boutons de connexion (Google, Apple, GitHub, email) avec monogrammes neutres et état de chargement.
 * prompt: Create a stack of sign-in buttons: "Continue with Google / Apple / GitHub" using neutral monogram badges instead of brand logos, an "or" divider, and "Continue with email"; clicking a button shows a spinner in it with aria-busy and disables the others; last-used provider gets a "Last used" pill. Light and dark mode.
 */
'use client';
import { Loader2, Mail } from 'lucide-react';
import { useState } from 'react';

const providers = [['Google', 'G', 'bg-white text-zinc-900 ring-1 ring-zinc-300'], ['Apple', '', 'bg-black text-white'], ['GitHub', 'GH', 'bg-zinc-800 text-white']] as const;

export function SocialLoginButtons() {
  const [loading, setLoading] = useState<string | null>(null);

  const click = (name: string) => { setLoading(name); window.setTimeout(() => setLoading(null), 1500); };
  const base = 'relative flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-300 bg-white py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800';

  return (
    <div className="grid w-full max-w-xs gap-2">
      {providers.map(([name, mark, tone]) => (
        <button key={name} type="button" aria-busy={loading === name} disabled={loading !== null && loading !== name} onClick={() => click(name)} className={base}>
          {loading === name ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <span aria-hidden className={`grid size-5 place-items-center rounded-full text-[9px] font-black ${tone}`}>{mark}</span>}
          Continue with {name}
          {name === 'Google' && <span className="absolute right-3 rounded-full bg-teal-100 px-1.5 py-0.5 text-[10px] font-semibold text-teal-800 dark:bg-teal-400/15 dark:text-teal-300">Last used</span>}
        </button>
      ))}
      <div className="my-1 flex items-center gap-3 text-xs text-zinc-400"><span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />or<span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" /></div>
      <button type="button" aria-busy={loading === 'email'} disabled={loading !== null && loading !== 'email'} onClick={() => click('email')} className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950">{loading === 'email' ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Mail aria-hidden className="size-4" />}Continue with email</button>
    </div>
  );
}
