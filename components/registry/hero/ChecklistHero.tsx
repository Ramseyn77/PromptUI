/**
 * @registry
 * name: Checklist Hero
 * category: Hero
 * style: Minimal
 * tags: recent
 * description: Hero en deux colonnes avec liste de bénéfices qui se cochent un à un et carte d'inscription à droite.
 * prompt: Create a two-column hero (stacked on mobile, side by side from lg): left a headline and four benefit lines whose check icons tick in one after another on mount (staggered, instant with reduced motion); right a sign-up card with name/email fields, a primary button and "No credit card required". Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

const benefits = ['Launch a site in under 10 minutes', 'Custom domain and SSL included', 'Analytics without cookies', 'Cancel any time, export everything'];

export function ChecklistHero() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(benefits.length); return; }
    const timers = benefits.map((_, index) => window.setTimeout(() => setShown(index + 1), 350 + index * 300));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <section className="grid w-full max-w-5xl items-center gap-10 rounded-3xl border border-zinc-200 bg-white px-6 py-12 lg:grid-cols-2 lg:px-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">The website builder that gets out of your way.</h1>
        <ul className="mt-6 space-y-3">
          {benefits.map((benefit, index) => (
            <li key={benefit} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
              <span className={`grid size-6 place-items-center rounded-full transition duration-300 ${index < shown ? 'scale-100 bg-teal-600 text-white' : 'scale-75 bg-zinc-100 text-transparent dark:bg-zinc-800'}`}><Check aria-hidden className="size-3.5" /></span>{benefit}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={(event) => event.preventDefault()} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">Create your free site</p>
        <label className="mt-4 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Name<input autoComplete="name" className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /></label>
        <label className="mt-3 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Email<input type="email" autoComplete="email" className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /></label>
        <button type="submit" className="mt-4 w-full rounded-lg bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-500">Start building</button>
        <p className="mt-2 text-center text-xs text-zinc-500">No credit card required</p>
      </form>
    </section>
  );
}
