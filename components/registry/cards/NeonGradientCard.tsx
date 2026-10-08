/**
 * @registry
 * name: Neon Gradient Card
 * category: Cards
 * style: Gradient
 * tags: featured, recent
 * description: Carte entourée d'une bordure néon dégradée rose-cyan qui circule et diffuse un halo.
 * prompt: Create a card wrapped in an animated neon gradient border (pink to cyan to violet, 300% background-size sliding) with a blurred copy of the same gradient behind it as a glow; inside, a solid surface with an eyebrow, big title, text and a button. Animation disabled with reduced motion. Light and dark mode.
 */
import { Sparkles } from 'lucide-react';

export function NeonGradientCard() {
  const gradient = 'bg-[linear-gradient(90deg,#ff2975,#00d2ff,#8b5cf6,#ff2975)] bg-[length:300%_100%] motion-safe:animate-[pui-neon-slide_6s_linear_infinite]';

  return (
    <div className="relative w-full max-w-sm p-4">
      <style>{`@keyframes pui-neon-slide{to{background-position:300% 0}}`}</style>
      <div aria-hidden className={`absolute inset-6 rounded-[1.75rem] opacity-60 blur-2xl dark:opacity-80 ${gradient}`} />
      <div className={`relative rounded-[1.75rem] p-[2px] ${gradient}`}>
        <div className="rounded-[calc(1.75rem-2px)] bg-white p-7 dark:bg-zinc-950">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"><Sparkles aria-hidden className="size-3.5 text-pink-500" />New in v2</p>
          <h3 className="mt-4 bg-gradient-to-r from-pink-500 via-sky-500 to-violet-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">Neon Gradient</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">A glowing border that keeps attention on what matters, without shouting in the layout.</p>
          <button type="button" className="mt-6 w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">Get early access</button>
        </div>
      </div>
    </div>
  );
}
