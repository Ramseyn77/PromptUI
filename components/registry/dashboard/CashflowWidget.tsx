/**
 * @registry
 * name: Cashflow Widget
 * category: Dashboard
 * style: SaaS
 * tags: recent
 * description: Flux de trésorerie mensuel : barres entrées / sorties de part et d'autre d'un axe, solde net et mois survolé.
 * prompt: Create a cashflow widget: for 6 months, money in bars go up (emerald) and money out bars go down (rose) from a shared zero axis, a net balance line with dots across the months; hovering or focusing a month column shows its in/out/net in the header summary; totals and net margin below. sr-only table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const months = [['May', 42, 31], ['Jun', 38, 35], ['Jul', 51, 33], ['Aug', 47, 39], ['Sep', 58, 36], ['Oct', 63, 41]] as const;

export function CashflowWidget() {
  const [active, setActive] = useState(5);
  const [label, income, expense] = months[active];
  const y = (value: number) => 90 - value;
  const net = months.map(([, inValue, outValue], i) => `${30 + i * 50},${90 - (inValue - outValue) * 2}`).join(' ');

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Cash flow</h3>
        <p aria-live="polite" className="text-right text-xs text-zinc-500">{label}: <span className="text-emerald-600 dark:text-emerald-400">+${income}k</span> · <span className="text-rose-600 dark:text-rose-400">−${expense}k</span><span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">Net ${income - expense}k</span></p>
      </div>
      <svg viewBox="0 0 310 180" className="mt-3 w-full" onMouseLeave={() => setActive(5)}>
        <line x1="5" x2="305" y1="90" y2="90" className="stroke-zinc-300 dark:stroke-zinc-700" />
        {months.map(([month, inValue, outValue], i) => {
          const x = 30 + i * 50;
          const on = active === i;
          return (
            <g key={month} tabIndex={0} aria-label={`${month}: in ${inValue}k, out ${outValue}k`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="outline-none">
              <rect x={x - 25} y="0" width="50" height="180" fill="transparent" />
              <rect x={x - 10} y={y(inValue)} width="20" height={inValue} rx="3" className={on ? 'fill-emerald-500' : 'fill-emerald-500/40'} />
              <rect x={x - 10} y="90" width="20" height={outValue} rx="3" className={on ? 'fill-rose-500' : 'fill-rose-500/40'} />
              <text x={x} y="176" textAnchor="middle" className={`text-[10px] ${on ? 'fill-zinc-900 font-semibold dark:fill-zinc-100' : 'fill-zinc-400'}`}>{month}</text>
            </g>
          );
        })}
        <polyline points={net} fill="none" strokeWidth="2" className="pointer-events-none stroke-zinc-900 dark:stroke-zinc-100" />
        {months.map(([month, inValue, outValue], i) => <circle key={month} cx={30 + i * 50} cy={90 - (inValue - outValue) * 2} r="3" className="pointer-events-none fill-white stroke-zinc-900 dark:fill-zinc-950 dark:stroke-zinc-100" strokeWidth="2" />)}
      </svg>
      <div className="mt-2 grid grid-cols-3 border-t border-zinc-100 pt-3 text-center text-xs dark:border-zinc-800">
        <span><span className="block text-zinc-500">In</span><strong className="text-zinc-900 dark:text-zinc-100">$299k</strong></span>
        <span><span className="block text-zinc-500">Out</span><strong className="text-zinc-900 dark:text-zinc-100">$215k</strong></span>
        <span><span className="block text-zinc-500">Margin</span><strong className="text-emerald-600 dark:text-emerald-400">28%</strong></span>
      </div>
      <div className="sr-only"><table><caption>Cash flow by month (thousands)</caption><tbody>{months.map(([month, inValue, outValue]) => <tr key={month}><td>{month}</td><td>{inValue}</td><td>{outValue}</td></tr>)}</tbody></table></div>
    </section>
  );
}
