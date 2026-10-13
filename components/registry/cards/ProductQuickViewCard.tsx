/**
 * @registry
 * name: Product Quick View Card
 * category: Cards
 * style: Minimal
 * tags: featured, recent
 * description: Fiche produit compacte : vignettes de couleurs qui changent l'image, tailles avec rupture de stock, quantité et ajout au panier avec retour visuel.
 * prompt: Create a product quick-view card: left a large product visual (gradient sneaker silhouette tinted by the selected color) with three thumbnail buttons; right the name, price with a strikethrough compare price and -20% tag, a color radiogroup of swatches, a size radiogroup (one size disabled as sold out with a slash), a quantity stepper (1–5), and "Add to bag" that shows a check + "Added" state for 1.5s (aria-live); stacks on mobile. Light and dark mode.
 */
'use client';
import { Check, Minus, Plus } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

const colors = [['Coral', 'from-rose-300 to-orange-400'], ['Ocean', 'from-sky-300 to-indigo-500'], ['Forest', 'from-emerald-300 to-teal-600']];
const sizes = [['40', true], ['41', true], ['42', false], ['43', true], ['44', true]] as const;

export function ProductQuickViewCard() {
  const uid = useId();
  const [color, setColor] = useState(0);
  const [size, setSize] = useState('41');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1500);
    return () => window.clearTimeout(timer);
  }, [added]);

  return (
    <article className="grid w-full max-w-2xl gap-6 rounded-3xl border border-zinc-200 bg-white p-5 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <div aria-hidden className={`grid aspect-square place-items-center rounded-2xl bg-gradient-to-br transition-colors duration-500 ${colors[color][1]}`}>
          <svg viewBox="0 0 120 60" className="w-3/4 drop-shadow-xl"><path d="M8 44c0-10 6-14 14-16l22-6c6-2 10-10 16-12 6 0 8 6 14 10l30 10c8 2 10 8 10 14v4H8z" fill="white" /><path d="M8 50h106v4H8z" fill="#18181b" opacity=".8" /></svg>
        </div>
        <div className="mt-3 flex gap-2">{colors.map(([name, gradient], index) => <button key={name} type="button" aria-label={`Show ${name}`} aria-pressed={color === index} onClick={() => setColor(index)} className={`size-14 rounded-xl bg-gradient-to-br ${gradient} ${color === index ? 'ring-2 ring-zinc-950 ring-offset-2 dark:ring-white dark:ring-offset-zinc-900' : 'opacity-70 hover:opacity-100'}`} />)}</div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Stride Runner 2</h3>
        <p className="mt-1 flex items-baseline gap-2"><span className="text-2xl font-bold text-zinc-950 dark:text-white">$96</span><s className="text-sm text-zinc-400">$120</s><span className="rounded bg-rose-100 px-1.5 text-xs font-semibold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">-20%</span></p>
        <fieldset className="mt-5"><legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Color · <span className="font-normal text-zinc-500">{colors[color][0]}</span></legend>
          <div className="mt-2 flex gap-2">{colors.map(([name, gradient], index) => <label key={name} className="cursor-pointer"><input type="radio" name={`${uid}-color`} className="peer sr-only" checked={color === index} onChange={() => setColor(index)} /><span className={`block size-8 rounded-full bg-gradient-to-br ${gradient} ring-offset-2 peer-checked:ring-2 peer-checked:ring-zinc-950 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 dark:ring-offset-zinc-900 dark:peer-checked:ring-white`} /><span className="sr-only">{name}</span></label>)}</div>
        </fieldset>
        <fieldset className="mt-4"><legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Size (EU)</legend>
          <div className="mt-2 grid grid-cols-5 gap-2">{sizes.map(([value, stock]) => <label key={value} className={stock ? 'cursor-pointer' : 'cursor-not-allowed'}><input type="radio" name={`${uid}-size`} className="peer sr-only" disabled={!stock} checked={size === value} onChange={() => setSize(value)} /><span className={`relative grid h-10 place-items-center overflow-hidden rounded-lg border text-sm peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 ${!stock ? 'border-zinc-200 text-zinc-300 dark:border-zinc-800 dark:text-zinc-600' : size === value ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950' : 'border-zinc-300 text-zinc-800 hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-200'}`}>{value}{!stock && <span aria-hidden className="absolute h-px w-[140%] rotate-[-35deg] bg-zinc-300 dark:bg-zinc-700" />}</span>{!stock && <span className="sr-only"> sold out</span>}</label>)}</div>
        </fieldset>
        <div className="mt-auto flex items-center gap-3 pt-5">
          <div className="flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700"><button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty(qty - 1)} className="grid size-10 place-items-center text-zinc-700 disabled:opacity-30 dark:text-zinc-200"><Minus aria-hidden className="size-4" /></button><output aria-label="Quantity" className="w-6 text-center text-sm font-semibold tabular-nums text-zinc-950 dark:text-white">{qty}</output><button type="button" aria-label="Increase quantity" disabled={qty >= 5} onClick={() => setQty(qty + 1)} className="grid size-10 place-items-center text-zinc-700 disabled:opacity-30 dark:text-zinc-200"><Plus aria-hidden className="size-4" /></button></div>
          <button type="button" onClick={() => setAdded(true)} className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition ${added ? 'bg-emerald-600' : 'bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950'}`}>{added ? <><Check aria-hidden className="size-4" />Added</> : 'Add to bag'}</button>
        </div>
        <p aria-live="polite" className="sr-only">{added ? `${qty} added to bag` : ''}</p>
      </div>
    </article>
  );
}
