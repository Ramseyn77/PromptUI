/**
 * @registry
 * name: Energy Usage Widget
 * category: Dashboard
 * style: Gradient
 * tags: featured, recent
 * description: Widget de consommation électrique d'une maison : barres horaires, production solaire superposée, heures creuses, coût du jour et appareils gourmands.
 * prompt: Create a home energy widget: a 24-hour bar chart where each bar shows consumption (kWh) and an overlaid area for solar production (deterministic data), off-peak hours shaded behind the bars, hover/focus on a bar shows the hour, usage and solar share in a status line; a Day / Week toggle; summary tiles (Today 18.4 kWh, Solar 62%, Cost €3.10); a list of top devices with small bars; light (warm gradient) and dark mode.
 */
'use client';
import { useState } from 'react';

const usage = Array.from({ length: 24 }, (_, hour) => Number((0.3 + (hour >= 7 && hour <= 9 ? 1.1 : 0) + (hour >= 18 && hour <= 21 ? 1.4 : 0) + ((hour * 7) % 5) * 0.08).toFixed(2)));
const solar = Array.from({ length: 24 }, (_, hour) => (hour < 7 || hour > 19 ? 0 : Number((1.6 - Math.abs(hour - 13) * 0.25).toFixed(2))));
const week = [16.2, 17.8, 15.4, 18.4, 19.1, 22.6, 20.3];
const devices = [['Heat pump', 38], ['EV charger', 27], ['Kitchen', 16], ['Laundry', 11]] as const;

export function EnergyUsageWidget() {
  const [mode, setMode] = useState<'day' | 'week'>('day');
  const [hover, setHover] = useState<number | null>(null);
  const data = mode === 'day' ? usage : week;
  const max = Math.max(...data, ...(mode === 'day' ? solar : [0]));

  return (
    <section className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-5 dark:from-zinc-900 dark:to-zinc-950">
      <div className="flex items-center justify-between"><h3 className="font-semibold text-zinc-950 dark:text-white">Home energy</h3><div role="group" aria-label="Range" className="flex rounded-full bg-white/70 p-0.5 text-xs dark:bg-white/10">{(['day', 'week'] as const).map((value) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => { setMode(value); setHover(null); }} className={`rounded-full px-3 py-1 capitalize ${mode === value ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-600 dark:text-zinc-400'}`}>{value}</button>)}</div></div>
      <div className="mt-4 grid grid-cols-3 gap-2">{[['Today', '18.4 kWh'], ['Solar', '62%'], ['Cost', '€3.10']].map(([label, value]) => <div key={label} className="rounded-2xl bg-white/80 p-3 dark:bg-white/5"><p className="text-[11px] text-zinc-500">{label}</p><p className="text-lg font-bold text-zinc-950 dark:text-white">{value}</p></div>)}</div>
      <p aria-live="polite" className="mt-4 h-4 text-xs text-zinc-600 dark:text-zinc-400">{hover === null ? (mode === 'day' ? 'Hover a bar · shaded = off-peak' : 'Last 7 days') : mode === 'day' ? `${String(hover).padStart(2, '0')}:00 · ${usage[hover]} kWh · solar ${solar[hover]} kWh` : `${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][hover]} · ${week[hover]} kWh`}</p>
      <div className="relative mt-2 flex h-32 items-end gap-0.5">
        {mode === 'day' && <><span aria-hidden className="absolute inset-y-0 left-0 w-[29%] rounded bg-sky-200/50 dark:bg-sky-500/10" /><span aria-hidden className="absolute inset-y-0 right-0 w-[8%] rounded bg-sky-200/50 dark:bg-sky-500/10" /></>}
        {data.map((value, index) => (
          <button key={index} type="button" aria-label={mode === 'day' ? `${index}:00, ${value} kWh` : `Day ${index + 1}, ${value} kWh`} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(index)} onBlur={() => setHover(null)} className="relative flex h-full flex-1 items-end outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
            {mode === 'day' && <span aria-hidden className="absolute bottom-0 inset-x-0 rounded-t bg-amber-300/60 dark:bg-amber-400/30" style={{ height: `${(solar[index] / max) * 100}%` }} />}
            <span aria-hidden className={`relative w-full rounded-t transition-opacity ${hover !== null && hover !== index ? 'opacity-40' : ''} bg-gradient-to-t from-orange-600 to-amber-400`} style={{ height: `${(value / max) * 100}%` }} />
          </button>
        ))}
      </div>
      <div aria-hidden className="mt-1 flex justify-between text-[10px] text-zinc-500">{mode === 'day' ? ['00', '06', '12', '18', '23'].map((tick) => <span key={tick}>{tick}h</span>) : ['Mon', 'Wed', 'Fri', 'Sun'].map((tick) => <span key={tick}>{tick}</span>)}</div>
      <ul className="mt-4 space-y-1.5">{devices.map(([name, share]) => <li key={name} className="flex items-center gap-3 text-sm"><span className="w-24 text-zinc-700 dark:text-zinc-300">{name}</span><span className="h-1.5 flex-1 rounded-full bg-white dark:bg-white/10"><span className="block h-full rounded-full bg-orange-500" style={{ width: `${share}%` }} /></span><span className="w-9 text-right text-xs tabular-nums text-zinc-500">{share}%</span></li>)}</ul>
    </section>
  );
}
