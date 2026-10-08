/**
 * @registry
 * name: Lifetime Deal Card
 * category: Pricing
 * style: Gradient
 * tags: recent
 * description: Offre à vie avec paliers qui se débloquent, licences vendues, jauge de stock et prix qui monte.
 * prompt: Create a lifetime deal card: "Pay once, use forever" headline, current tier price with the next tier price shown crossed-in ("$129 → $179 after 500 sold"), a progress bar of licenses sold (412/500) with tier markers, a feature checklist, and a gradient Buy button with a 60-day guarantee note. Light and dark mode.
 */
import { Check, Infinity as InfinityIcon } from 'lucide-react';

export function LifetimeDealCard() {
  const sold = 412;

  return (
    <section className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-amber-200 via-rose-200 to-violet-300 p-[2px] dark:from-amber-500/50 dark:via-rose-500/50 dark:to-violet-500/50">
      <div className="rounded-[calc(1.5rem-2px)] bg-white p-6 dark:bg-zinc-950">
        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-950 px-2.5 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950"><InfinityIcon aria-hidden className="size-3.5" />Lifetime deal</span>
        <h3 className="mt-4 text-2xl font-bold text-zinc-950 dark:text-zinc-50">Pay once, use forever.</h3>
        <p className="mt-3"><span className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">$129</span><span className="ml-2 text-sm text-zinc-500">then $179 after 500 sold</span></p>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-zinc-500"><span>{sold} / 500 licenses sold</span><span>{500 - sold} left at this price</span></div>
          <div className="relative mt-1.5 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800" role="progressbar" aria-valuenow={sold} aria-valuemin={0} aria-valuemax={500} aria-label="Licenses sold">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500" style={{ width: `${(sold / 500) * 100}%` }} />
          </div>
        </div>
        <ul className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">{['All future updates', 'Unlimited projects', 'Commercial license', 'Private Discord'].map((item) => <li key={item} className="flex items-center gap-2"><Check aria-hidden className="size-4 text-rose-500" />{item}</li>)}</ul>
        <button type="button" className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/25">Get lifetime access</button>
        <p className="mt-2 text-center text-xs text-zinc-500">60-day money-back guarantee</p>
      </div>
    </section>
  );
}
