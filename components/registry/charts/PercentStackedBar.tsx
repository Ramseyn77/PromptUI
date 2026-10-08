/**
 * @registry
 * name: Percent Stacked Bar
 * category: Charts
 * style: SaaS
 * tags: recent
 * description: Barres empilées à 100 % par plan tarifaire, avec bascule entre pourcentages et valeurs absolues.
 * prompt: Create a 100% stacked horizontal bar chart showing device mix per plan (Free, Pro, Business, Enterprise): segments Desktop / Mobile / Tablet with labels inside, a toggle (role="switch") between percentages and absolute users, legend, and hover tooltip text per segment via title. sr-only table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const devices = [{ name: 'Desktop', color: 'bg-teal-500' }, { name: 'Mobile', color: 'bg-sky-500' }, { name: 'Tablet', color: 'bg-violet-500' }];
const plans = [['Free', [4200, 6100, 900]], ['Pro', [2600, 1400, 320]], ['Business', [1800, 520, 140]], ['Enterprise', [960, 180, 40]]] as const;

export function PercentStackedBar() {
  const [absolute, setAbsolute] = useState(false);

  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Device mix by plan</h3>
        <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">Users
          <button type="button" role="switch" aria-checked={absolute} onClick={() => setAbsolute((value) => !value)} className={`relative h-5 w-9 rounded-full transition ${absolute ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}><span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${absolute ? 'translate-x-4' : 'translate-x-0.5'}`} /></button>
        </label>
      </div>
      <div className="mt-2 flex gap-3 text-xs text-zinc-500">{devices.map((device) => <span key={device.name} className="flex items-center gap-1"><span className={`size-2 rounded-sm ${device.color}`} />{device.name}</span>)}</div>
      <div className="mt-4 space-y-3">
        {plans.map(([plan, values]) => {
          const total = values.reduce((sum, value) => sum + value, 0);
          return (
            <div key={plan} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-sm text-zinc-600 dark:text-zinc-400">{plan}</span>
              <div className="flex h-7 flex-1 overflow-hidden rounded-md">
                {values.map((value, i) => {
                  const pct = Math.round((value / total) * 100);
                  return <span key={i} title={`${devices[i].name}: ${value.toLocaleString('en-US')} users (${pct}%)`} className={`grid place-items-center text-[10px] font-semibold text-white transition-all ${devices[i].color}`} style={{ width: `${(value / total) * 100}%` }}>{pct >= 10 ? (absolute ? value.toLocaleString('en-US') : `${pct}%`) : ''}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="sr-only"><table><caption>Users per device and plan</caption><tbody>{plans.map(([plan, values]) => <tr key={plan}><td>{plan}</td>{values.map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody></table></div>
    </section>
  );
}
