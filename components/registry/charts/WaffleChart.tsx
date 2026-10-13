/**
 * @registry
 * name: Waffle Chart
 * category: Charts
 * style: SaaS
 * tags: recent
 * description: Graphique gaufre 10×10 où chaque case vaut 1 % : répartition du trafic par canal, cases qui se remplissent en séquence et focus par catégorie.
 * prompt: Create a 10×10 waffle chart of traffic sources where each square is 1%: categories (Organic 42, Direct 23, Referral 15, Social 12, Email 8) fill squares in order with their color, the squares animate in with a stagger on mount and when switching between two datasets via a Month toggle (September / October); hovering or focusing a legend item highlights its squares and dims others; legend shows percentages; an sr-only list summarizes values. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const datasets = {
  September: [['Organic', 38], ['Direct', 25], ['Referral', 14], ['Social', 15], ['Email', 8]],
  October: [['Organic', 42], ['Direct', 23], ['Referral', 15], ['Social', 12], ['Email', 8]],
} as const;
const colors = ['bg-indigo-500', 'bg-sky-400', 'bg-emerald-400', 'bg-pink-400', 'bg-amber-400'];
type Month = keyof typeof datasets;

export function WaffleChart() {
  const [month, setMonth] = useState<Month>('October');
  const [focus, setFocus] = useState<number | null>(null);
  const data = datasets[month];
  const squares = data.flatMap(([, value], category) => Array.from({ length: value }, () => category));

  return (
    <figure className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-waffle-in { from { transform: scale(0); opacity: 0 } to { transform: scale(1); opacity: 1 } }`}</style>
      <div className="flex items-center justify-between"><figcaption className="font-semibold text-zinc-950 dark:text-white">Traffic sources</figcaption><div role="group" aria-label="Month" className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-900">{(Object.keys(datasets) as Month[]).map((value) => <button key={value} type="button" aria-pressed={month === value} onClick={() => setMonth(value)} className={`rounded-md px-2.5 py-1 ${month === value ? 'bg-white font-semibold shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{value.slice(0, 3)}</button>)}</div></div>
      <ul className="sr-only">{data.map(([name, value]) => <li key={name}>{name}: {value}%</li>)}</ul>
      <div key={month} aria-hidden className="mt-4 grid grid-cols-10 gap-1">{squares.map((category, index) => <span key={index} className={`aspect-square rounded-[3px] transition-opacity ${colors[category]} ${focus !== null && focus !== category ? 'opacity-15' : ''} motion-safe:animate-[pui-waffle-in_.3s_ease-out_both]`} style={{ animationDelay: `${index * 8}ms` }} />)}</div>
      <ul className="mt-4 grid grid-cols-2 gap-1.5 text-sm sm:grid-cols-3">{data.map(([name, value], category) => <li key={name}><button type="button" onMouseEnter={() => setFocus(category)} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus(category)} onBlur={() => setFocus(null)} className="flex w-full items-center gap-2 rounded-lg px-1.5 py-1 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900"><span className={`size-3 rounded-sm ${colors[category]}`} /><span className="flex-1 text-zinc-700 dark:text-zinc-300">{name}</span><span className="font-semibold tabular-nums text-zinc-950 dark:text-white">{value}%</span></button></li>)}</ul>
    </figure>
  );
}
