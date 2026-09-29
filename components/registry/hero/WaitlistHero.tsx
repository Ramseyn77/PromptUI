/**
 * @registry
 * name: Waitlist Hero
 * category: Hero
 * style: Minimal
 * tags: recent
 * description: Hero de liste d attente avec champ email, validation et pile d avatars.
 * prompt: Create a waitlist hero: headline, subtitle, an inline email form (stacked on mobile) that shows a success message after submit, and a row of overlapping avatar initials with a "2,400+ makers joined" caption. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export function WaitlistHero() {
  const [joined, setJoined] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setJoined(true);
  }

  return (
    <section className="w-full max-w-3xl rounded-3xl bg-white px-6 py-14 text-center dark:bg-zinc-950">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Be first to try Northwind</h1>
      <p className="mx-auto mt-4 max-w-md text-zinc-600 dark:text-zinc-400">A calmer inbox for busy founders. Early access opens in March.</p>
      {joined ? (
        <p role="status" className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          <Check aria-hidden className="size-4" /> You are on the list. See you soon!
        </p>
      ) : (
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
          <label htmlFor="waitlist-email" className="sr-only">Email</label>
          <input id="waitlist-email" type="email" required placeholder="you@company.com" className="h-12 flex-1 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" />
          <button type="submit" className="h-12 rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white transition hover:bg-teal-700">Join waitlist</button>
        </form>
      )}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="flex -space-x-2">
          {['AK', 'ML', 'SR', 'JB', 'TN'].map((initials, index) => (
            <span key={initials} className="grid size-8 place-items-center rounded-full border-2 border-white text-[10px] font-bold text-white dark:border-zinc-950" style={{ background: `hsl(${index * 55 + 160} 60% 45%)` }}>{initials}</span>
          ))}
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-white">2,400+</strong> makers joined</p>
      </div>
    </section>
  );
}
