/**
 * @registry
 * name: Minimal Pricing Rows
 * category: Pricing
 * style: Editorial
 * tags: recent
 * description: Tarifs présentés en lignes éditoriales sobres : nom, phrase, prix et flèche, la ligne survolée s'illumine.
 * prompt: Create an editorial pricing list: three full-width rows separated by hairlines (Solo, Studio, Agency), each with a large serif plan name, one-sentence description, price and an arrow link; hovering/focusing a row shifts the arrow, tints the background and dims the other rows; a monthly/yearly text toggle at the top swaps prices. Light (paper) and dark mode.
 */
'use client';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const plans = [['Solo', 'For one person shipping side projects.', 9, 7], ['Studio', 'For small teams with clients and deadlines.', 29, 24], ['Agency', 'For agencies managing many brands at once.', 79, 65]] as const;

export function MinimalPricingRows() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="group/list w-full max-w-2xl rounded-3xl bg-[#f7f4ee] p-6 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-3xl text-zinc-950 dark:text-zinc-50">Pricing</h3>
        <p className="text-sm text-zinc-500"><button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={!yearly ? 'font-semibold text-zinc-900 underline underline-offset-4 dark:text-zinc-100' : ''}>Monthly</button> / <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={yearly ? 'font-semibold text-zinc-900 underline underline-offset-4 dark:text-zinc-100' : ''}>Yearly</button></p>
      </div>
      <ul className="mt-6 border-t border-zinc-900/15 dark:border-white/15">
        {plans.map(([name, text, monthly, annual]) => (
          <li key={name} className="border-b border-zinc-900/15 transition-opacity group-hover/list:opacity-50 hover:!opacity-100 focus-within:!opacity-100 dark:border-white/15">
            <a href={`#${name.toLowerCase()}`} className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-xl px-2 py-5 outline-none transition hover:bg-white focus-visible:bg-white sm:grid-cols-[8rem_1fr_auto_auto] dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900">
              <span className="font-serif text-2xl text-zinc-950 dark:text-zinc-50">{name}</span>
              <span className="order-3 col-span-2 text-sm text-zinc-600 sm:order-none sm:col-span-1 dark:text-zinc-400">{text}</span>
              <span className="text-right text-lg tabular-nums text-zinc-950 dark:text-zinc-50">${yearly ? annual : monthly}<span className="text-xs text-zinc-500">/mo</span></span>
              <ArrowRight aria-hidden className="hidden size-5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-zinc-900 sm:block dark:group-hover:text-white" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
