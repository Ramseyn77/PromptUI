/**
 * @registry
 * name: Bento Features
 * category: Cards
 * style: Editorial
 * tags: featured, recent
 * description: Grille bento de fonctionnalités avec tuiles mises en avant, chiffre clé et tags.
 * prompt: Create a responsive bento feature grid (1 column on mobile, 3 from sm): a wide inverted hero tile with a glow, a stat tile, an accessibility tile and a wide gradient tile with tags. Inverted tile flips colors in dark mode.
 */
import { Layers, ShieldCheck, Sparkles, Zap } from 'lucide-react';

export function BentoFeatures() {
  return (
    <section className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
      <article className="relative overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white sm:col-span-2 dark:bg-white dark:text-zinc-950">
        <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-teal-400/30 blur-3xl" />
        <Sparkles aria-hidden className="relative size-5 text-teal-300 dark:text-teal-600" />
        <h3 className="relative mt-8 text-2xl font-semibold tracking-tight">Prompt to production</h3>
        <p className="relative mt-2 max-w-sm text-sm leading-6 text-zinc-400 dark:text-zinc-600">
          Describe the screen, get typed React you actually own.
        </p>
      </article>
      <article className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <Zap aria-hidden className="size-5 text-amber-500" />
        <p className="mt-8 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">3×</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">faster first release</p>
      </article>
      <article className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <ShieldCheck aria-hidden className="size-5 text-emerald-500" />
        <h3 className="mt-8 font-semibold text-zinc-900 dark:text-white">Accessible by default</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Focus, roles and contrast built in.</p>
      </article>
      <article className="rounded-3xl bg-gradient-to-br from-violet-500 to-teal-400 p-6 text-white sm:col-span-2">
        <Layers aria-hidden className="size-5" />
        <div className="mt-6 flex flex-wrap gap-2">
          {['Hero', 'Pricing', 'Dashboard', 'Auth', 'Chat'].map((tag) => (
            <span key={tag} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">{tag}</span>
          ))}
        </div>
        <p className="mt-3 text-sm font-medium text-white/90">120+ blocks, one design language.</p>
      </article>
    </section>
  );
}
