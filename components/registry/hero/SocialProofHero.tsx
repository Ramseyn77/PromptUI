/**
 * @registry
 * name: Social Proof Hero
 * category: Hero
 * style: Minimal
 * tags: recent
 * description: Hero centré sur la preuve sociale : avatars, note 4,9/5, citation courte et compteur d'utilisateurs animé.
 * prompt: Create a social-proof-first hero: overlapping avatar stack with "+12k", five filled stars and "4.9/5 from 2,300 reviews", a big headline, subtitle, email capture with button, and a short rotating customer quote below; a user counter counts up on mount (static with reduced motion). Centered, mobile-first. Light and dark mode.
 */
'use client';
import { Star } from 'lucide-react';
import { useId, useEffect, useState } from 'react';

export function SocialProofHero() {
  const uid = useId();
  const [count, setCount] = useState(12480);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const start = performance.now();
    const step = (time: number) => { const t = Math.min(1, (time - start) / 1400); setCount(Math.round(10000 + 2480 * (1 - (1 - t) ** 3))); if (t < 1) frame = requestAnimationFrame(step); };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-zinc-200 bg-white px-6 py-14 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
        <div className="flex -space-x-2">{['from-rose-400 to-orange-300', 'from-sky-400 to-indigo-500', 'from-emerald-400 to-teal-500', 'from-amber-300 to-pink-400', 'from-violet-400 to-fuchsia-500'].map((tone) => <span key={tone} aria-hidden className={`size-9 rounded-full bg-gradient-to-br ring-2 ring-white dark:ring-zinc-950 ${tone}`} />)}</div>
        <div className="text-left text-sm"><span className="flex" aria-label="Rated 4.9 out of 5">{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden className="size-4 fill-amber-400 text-amber-400" />)}</span><span className="text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">4.9/5</strong> from 2,300 reviews</span></div>
      </div>
      <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">The budgeting app people actually keep using.</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">Join <strong className="tabular-nums text-zinc-900 dark:text-zinc-100">{count.toLocaleString('en-US')}</strong> people who stopped wondering where their money went.</p>
      <form onSubmit={(event) => event.preventDefault()} className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row"><label htmlFor={`${uid}-proof-email`} className="sr-only">Email</label><input id={`${uid}-proof-email`} type="email" placeholder="you@email.com" className="min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" /><button type="submit" className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-500">Get started free</button></form>
      <figure className="mx-auto mt-8 max-w-md border-t border-zinc-100 pt-5 dark:border-zinc-900"><blockquote className="text-sm italic text-zinc-600 dark:text-zinc-400">“First app that made me check my budget on purpose.”</blockquote><figcaption className="mt-1 text-xs text-zinc-500">— Nadia, teacher in Casablanca</figcaption></figure>
    </section>
  );
}
