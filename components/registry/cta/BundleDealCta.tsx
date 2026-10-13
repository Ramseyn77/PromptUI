/**
 * @registry
 * name: Bundle Deal CTA
 * category: CTA
 * style: Minimal
 * tags: recent
 * description: Offre « souvent achetés ensemble » : produits à cocher reliés par des +, prix total et économies du lot recalculés, ajout du lot au panier.
 * prompt: Create a "frequently bought together" bundle CTA: three product tiles (gradient thumbnails, name, price) joined by plus signs, each with a checkbox (the main product is required and disabled-checked); the bundle total, the struck-through separate total and "You save $14" update live (bundle discount applies only when all three are selected, otherwise a hint "Add 1 more to save 15%"); an "Add 3 to cart" button reflecting the count with an added state; stacks vertically on mobile. Light and dark mode.
 */
'use client';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

const products = [{ id: 'cam', name: 'Mirrorless camera', price: 649, tone: 'from-zinc-700 to-zinc-900', required: true }, { id: 'lens', name: '35mm f/1.8 lens', price: 229, tone: 'from-sky-500 to-indigo-600', required: false }, { id: 'bag', name: 'Canvas camera bag', price: 59, tone: 'from-amber-300 to-orange-500', required: false }];

export function BundleDealCta() {
  const [picked, setPicked] = useState(['cam', 'lens', 'bag']);
  const [added, setAdded] = useState(false);
  const chosen = products.filter((product) => picked.includes(product.id));
  const separate = chosen.reduce((sum, product) => sum + product.price, 0);
  const full = chosen.length === products.length;
  const saving = full ? Math.round(separate * 0.015 * 10) : 0;

  return (
    <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-950 dark:text-white">Frequently bought together</h3>
      <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {products.map((product, index) => (
          <div key={product.id} className="contents">
            {index > 0 && <Plus aria-hidden className="mx-auto size-5 shrink-0 text-zinc-400" />}
            <label className={`flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border p-3 transition sm:flex-col sm:items-start ${picked.includes(product.id) ? 'border-zinc-900 dark:border-zinc-100' : 'border-zinc-200 opacity-60 dark:border-zinc-800'}`}>
              <span aria-hidden className={`size-14 shrink-0 rounded-xl bg-gradient-to-br sm:aspect-square sm:size-auto sm:w-full ${product.tone}`} />
              <span className="flex-1"><span className="flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-white"><input type="checkbox" checked={picked.includes(product.id)} disabled={product.required} onChange={() => { setPicked(picked.includes(product.id) ? picked.filter((id) => id !== product.id) : [...picked, product.id]); setAdded(false); }} className="accent-zinc-900" />{product.name}</span><span className="text-sm tabular-nums text-zinc-600 dark:text-zinc-400">${product.price}</span></span>
            </label>
          </div>
        ))}
      </div>
      <div aria-live="polite" className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
        <div><p className="text-sm text-zinc-600 dark:text-zinc-400">Total for {chosen.length} item{chosen.length > 1 ? 's' : ''}</p><p className="flex items-baseline gap-2"><span className="text-2xl font-bold tabular-nums text-zinc-950 dark:text-white">${separate - saving}</span>{saving > 0 && <s className="text-sm tabular-nums text-zinc-400">${separate}</s>}</p><p className={`text-xs font-medium ${saving ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500'}`}>{saving ? `You save $${saving}` : `Add ${products.length - chosen.length} more to save 15%`}</p></div>
        <button type="button" onClick={() => setAdded(true)} className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white ${added ? 'bg-emerald-600' : 'bg-zinc-950 dark:bg-white dark:text-zinc-950'}`}>{added ? <><Check aria-hidden className="size-4" />Added to cart</> : `Add ${chosen.length} to cart`}</button>
      </div>
    </section>
  );
}
