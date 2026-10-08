/**
 * @registry
 * name: Split Mockup Hero
 * category: Hero
 * style: SaaS
 * tags: featured, recent
 * description: Hero en deux colonnes avec texte, double CTA et maquette d'application à droite.
 * prompt: Create a two-column SaaS hero (stacked on mobile, side by side from lg): eyebrow badge, bold headline, subtitle, primary and secondary CTAs, and on the right a mock dashboard window with toolbar dots, stat tiles and bars. Light and dark mode.
 */
import { ArrowRight, Play } from 'lucide-react';

export function SplitMockupHero() {
  return (
    <section className="grid w-full max-w-5xl items-center gap-10 rounded-3xl bg-white px-6 py-12 lg:grid-cols-2 lg:px-12 dark:bg-zinc-950">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-700 dark:text-teal-300">
          <span className="size-1.5 rounded-full bg-teal-500" /> New · Workflows 2.0
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Run your whole team from one calm workspace.</h1>
        <p className="mt-4 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">Plan, ship and report without switching tabs. Built for fast product teams.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
            Start free trial <ArrowRight aria-hidden className="size-4" />
          </button>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900">
            <Play aria-hidden className="size-4" /> Watch demo
          </button>
        </div>
      </div>
      <div aria-hidden className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 shadow-xl shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex gap-1.5 px-1 pb-3">{['bg-rose-400', 'bg-amber-400', 'bg-emerald-400'].map((color) => <span key={color} className={`size-2.5 rounded-full ${color}`} />)}</div>
        <div className="grid grid-cols-3 gap-2">
          {[['Active', '1,284'], ['Shipped', '342'], ['NPS', '72']].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-white p-3 dark:bg-zinc-950">
              <p className="text-[10px] text-zinc-500">{label}</p>
              <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex h-32 items-end gap-2 rounded-xl bg-white p-3 dark:bg-zinc-950">
          {[40, 65, 45, 80, 55, 90, 70].map((height, index) => <span key={index} className="flex-1 rounded-md bg-gradient-to-t from-teal-500 to-teal-300" style={{ height: `${height}%` }} />)}
        </div>
      </div>
    </section>
  );
}
