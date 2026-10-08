/**
 * @registry
 * name: Grocery Checklist
 * category: Checkboxes
 * style: Editorial
 * tags: recent
 * description: Liste de courses par rayon : les articles cochés se barrent et descendent en bas de leur rayon.
 * prompt: Create a grocery checklist grouped by aisle (Produce, Dairy, Bakery) on a warm paper-like card: each item has a checkbox, name and quantity; checked items get a line-through, fade and move to the bottom of their group; each group header shows "2/4"; a progress bar on top shows overall completion. Light (cream) and dark (warm charcoal) mode.
 */
'use client';
import { useState } from 'react';

const initial = [
  { aisle: 'Produce', name: 'Avocados', qty: '3', done: false },
  { aisle: 'Produce', name: 'Spinach', qty: '1 bag', done: true },
  { aisle: 'Produce', name: 'Limes', qty: '4', done: false },
  { aisle: 'Dairy', name: 'Greek yogurt', qty: '2', done: false },
  { aisle: 'Dairy', name: 'Butter', qty: '1', done: false },
  { aisle: 'Bakery', name: 'Sourdough', qty: '1 loaf', done: true },
];

export function GroceryChecklist() {
  const [items, setItems] = useState(initial);
  const doneCount = items.filter((item) => item.done).length;

  return (
    <div className="w-full max-w-sm rounded-2xl bg-[#fbf7ef] p-5 shadow-sm ring-1 ring-amber-900/10 dark:bg-[#1f1b17] dark:ring-white/10">
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-xl font-semibold text-amber-950 dark:text-amber-50">Groceries</h3>
        <span className="text-xs text-amber-900/60 dark:text-amber-100/60">{doneCount}/{items.length}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-amber-900/10 dark:bg-white/10"><div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${(doneCount / items.length) * 100}%` }} /></div>
      {['Produce', 'Dairy', 'Bakery'].map((aisle) => {
        const group = items.filter((item) => item.aisle === aisle).sort((a, b) => Number(a.done) - Number(b.done));
        return (
          <section key={aisle} className="mt-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-amber-900/60 dark:text-amber-100/50">{aisle} · {group.filter((item) => item.done).length}/{group.length}</h4>
            <ul className="mt-1">
              {group.map((item) => (
                <li key={item.name}>
                  <label className={`flex cursor-pointer items-center gap-3 py-1.5 transition ${item.done ? 'opacity-50' : ''}`}>
                    <input type="checkbox" checked={item.done} onChange={() => setItems((list) => list.map((entry) => (entry.name === item.name ? { ...entry, done: !entry.done } : entry)))} className="size-4 accent-amber-600" />
                    <span className={`flex-1 text-sm text-amber-950 dark:text-amber-50 ${item.done ? 'line-through decoration-amber-600' : ''}`}>{item.name}</span>
                    <span className="text-xs text-amber-900/60 dark:text-amber-100/50">{item.qty}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
