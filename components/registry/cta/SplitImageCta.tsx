/**
 * @registry
 * name: Split Image CTA
 * category: CTA
 * style: SaaS
 * tags: recent
 * description: Appel a l action en deux colonnes avec visuel de produit incline, arguments et double bouton.
 * prompt: Create a split CTA section: left side with eyebrow, headline, three checkmark benefits and two buttons; right side a tilted product mock (gradient window with UI bars) that straightens on hover. Stacks on mobile, 2 columns from md. Light and dark mode.
 */
import { Check } from 'lucide-react';

export function SplitImageCta() {
  return (
    <section className="grid w-full max-w-4xl items-center gap-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-teal-700 dark:text-teal-400">Start today</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Your next launch, twice as fast.</h2>
        <ul className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          {['300+ production-ready blocks', 'Light & dark mode everywhere', 'Prompts for any AI agent'].map((item) => <li key={item} className="flex gap-2"><Check aria-hidden className="mt-0.5 size-4 text-teal-600" />{item}</li>)}
        </ul>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a href="#" className="rounded-xl bg-zinc-950 px-5 py-2.5 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Get started free</a>
          <a href="#" className="rounded-xl border border-zinc-300 px-5 py-2.5 text-center text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100">See pricing</a>
        </div>
      </div>
      <div aria-hidden className="group [perspective:900px]">
        <div className="rounded-2xl bg-gradient-to-br from-teal-100 to-violet-200 p-3 shadow-2xl transition duration-500 [transform:rotateY(-14deg)_rotateX(6deg)] group-hover:[transform:none] dark:from-teal-950 dark:to-violet-950">
          <div className="flex gap-1.5 pb-2">{['bg-rose-400', 'bg-amber-400', 'bg-emerald-400'].map((color) => <span key={color} className={`size-2 rounded-full ${color}`} />)}</div>
          <div className="space-y-2 rounded-xl bg-white p-4 dark:bg-zinc-900">
            <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((tile) => <div key={tile} className="h-12 rounded-lg bg-teal-500/20" />)}</div>
            <div className="h-20 rounded-lg bg-gradient-to-r from-teal-400/40 to-violet-400/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
