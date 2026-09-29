/**
 * @registry
 * name: Floating Cards Hero
 * category: Hero
 * style: Glass
 * tags: featured, recent
 * description: Hero avec cartes en verre qui flottent doucement autour du titre.
 * prompt: Create a hero with a centered headline and CTA surrounded by three small glassmorphism cards (notification, metric, avatar) that float up and down with staggered keyframes; cards hide below sm to keep mobile clean. Gradient backdrop, light and dark mode.
 */
import { Bell, TrendingUp } from 'lucide-react';

export function FloatingCardsHero() {
  const card = 'absolute hidden rounded-2xl border border-white/60 bg-white/70 p-3 text-left shadow-xl backdrop-blur-md sm:block dark:border-white/10 dark:bg-white/10 motion-safe:animate-[pui-float_6s_ease-in-out_infinite]';
  return (
    <>
      <style>{`@keyframes pui-float{50%{transform:translateY(-12px)}}`}</style>
      <section className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-teal-100 via-white to-violet-100 px-6 py-24 text-center dark:from-teal-950 dark:via-zinc-950 dark:to-violet-950">
        <div className={`${card} left-8 top-10`}>
          <p className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white"><Bell aria-hidden className="size-3.5 text-violet-500" /> New signup</p>
          <p className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-300">maya@lumen.io joined</p>
        </div>
        <div className={`${card} right-10 top-16 [animation-delay:-2s]`}>
          <p className="text-[11px] text-zinc-600 dark:text-zinc-300">Revenue</p>
          <p className="flex items-center gap-1 text-lg font-semibold text-zinc-900 dark:text-white">$12.4k <TrendingUp aria-hidden className="size-4 text-emerald-500" /></p>
        </div>
        <div className={`${card} bottom-10 left-1/4 [animation-delay:-4s]`}>
          <div className="flex -space-x-2">{['#14b8a6', '#8b5cf6', '#f59e0b'].map((color) => <span key={color} className="size-7 rounded-full border-2 border-white dark:border-zinc-900" style={{ background: color }} />)}</div>
        </div>
        <div className="relative mx-auto max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Everything your startup needs, in one place</h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">Billing, analytics and onboarding that grow with you.</p>
          <button type="button" className="mt-8 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950">Create your account</button>
        </div>
      </section>
    </>
  );
}
