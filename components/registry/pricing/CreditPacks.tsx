/**
 * @registry
 * name: Credit Packs
 * category: Pricing
 * style: Gradient
 * tags: recent
 * description: Achat de packs de crédits IA avec prix par crédit, meilleure valeur et bouton d'achat.
 * prompt: Create credit pack cards (radiogroup): 100, 500 and 2,000 credits with total price, computed price per credit, a "Best value" ribbon on the biggest pack, selected pack with a gradient ring, and a buy button showing the selected total. Light and dark mode.
 */
'use client';
import { Coins } from 'lucide-react';
import { useState } from 'react';

const packs = [{ credits: 100, price: 5 }, { credits: 500, price: 20 }, { credits: 2000, price: 60 }];

export function CreditPacks() {
  const [selected, setSelected] = useState(1);
  const pack = packs[selected];

  return (
    <section className="w-full max-w-xl">
      <div role="radiogroup" aria-label="Credit pack" className="grid gap-3 sm:grid-cols-3">
        {packs.map((item, index) => (
          <button key={item.credits} type="button" role="radio" aria-checked={selected === index} onClick={() => setSelected(index)} className={`relative overflow-hidden rounded-2xl p-px text-left transition ${selected === index ? 'bg-gradient-to-br from-teal-400 to-violet-500' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
            <span className="block h-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
              {index === packs.length - 1 && <span className="absolute right-0 top-0 rounded-bl-xl bg-violet-600 px-2 py-0.5 text-[10px] font-semibold text-white">Best value</span>}
              <Coins aria-hidden className="size-5 text-amber-500" />
              <span className="mt-3 block text-2xl font-semibold text-zinc-900 dark:text-white">{item.credits.toLocaleString('en-US')}</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">credits</span>
              <span className="mt-3 block text-sm font-semibold text-zinc-900 dark:text-white">${item.price}</span>
              <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">${(item.price / item.credits).toFixed(3)} / credit</span>
            </span>
          </button>
        ))}
      </div>
      <button type="button" className="mt-4 w-full rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Buy {pack.credits.toLocaleString('en-US')} credits · ${pack.price}</button>
    </section>
  );
}
