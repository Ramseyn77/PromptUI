/**
 * @registry
 * name: Filter Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Panneau de filtres e-commerce : catégories cochées, fourchette de prix, tailles et réinitialisation.
 * prompt: Create a product filter sidebar: category checkboxes with counts, a price range with two number inputs, size toggle buttons (aria-pressed), color swatches with sr-only names, an active-filters count and "Clear all". Light and dark mode.
 */
'use client';
import { useState } from 'react';

const categories = [['Shirts', 24], ['Pants', 18], ['Jackets', 9], ['Shoes', 31]] as const;
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = [['Black', '#18181b'], ['Sand', '#e7d8c1'], ['Teal', '#0d9488'], ['Rose', '#fb7185']];

export function FilterSidebar() {
  const [checked, setChecked] = useState<string[]>(['Shirts']);
  const [picked, setPicked] = useState<string[]>(['M']);
  const [color, setColor] = useState<string | null>(null);
  const count = checked.length + picked.length + (color ? 1 : 0);
  const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  return (
    <aside aria-label="Filters" className="w-64 space-y-6 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between"><p className="font-semibold text-zinc-900 dark:text-white">Filters {count > 0 && <span className="text-sm font-normal text-zinc-500">({count})</span>}</p><button type="button" onClick={() => { setChecked([]); setPicked([]); setColor(null); }} className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400">Clear all</button></div>
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Category</legend>
        {categories.map(([name, total]) => <label key={name} className="mt-2 flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={checked.includes(name)} onChange={() => setChecked((current) => toggle(current, name))} className="size-4 accent-teal-600" />{name}<span className="ml-auto text-xs text-zinc-400">{total}</span></label>)}
      </fieldset>
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Price</legend>
        <div className="mt-2 flex items-center gap-2">{['Min', 'Max'].map((label, index) => <label key={label} className="flex-1"><span className="sr-only">{label} price</span><input type="number" inputMode="numeric" defaultValue={index ? 200 : 20} className="w-full rounded-lg border border-zinc-300 bg-transparent px-2 py-1.5 text-sm dark:border-zinc-700 dark:text-white" /></label>)}</div>
      </fieldset>
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Size</legend>
        <div className="mt-2 flex flex-wrap gap-1.5">{sizes.map((size) => <button key={size} type="button" aria-pressed={picked.includes(size)} onClick={() => setPicked((current) => toggle(current, size))} className={`h-8 min-w-9 rounded-lg border px-2 text-xs font-semibold ${picked.includes(size) ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900' : 'border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300'}`}>{size}</button>)}</div>
      </fieldset>
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Color</legend>
        <div className="mt-2 flex gap-2">{colors.map(([name, hex]) => <button key={name} type="button" aria-pressed={color === name} onClick={() => setColor(color === name ? null : name)} className={`size-7 rounded-full ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 ${color === name ? 'ring-2 ring-teal-500' : 'ring-1 ring-zinc-300 dark:ring-zinc-700'}`} style={{ background: hex }}><span className="sr-only">{name}</span></button>)}</div>
      </fieldset>
    </aside>
  );
}
