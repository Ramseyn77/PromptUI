/**
 * @registry
 * name: Unit System Toggle
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Bascule Métrique / Impérial qui convertit en direct distance, poids, température et vitesse d'une carte d'activité.
 * prompt: Create a Metric / Imperial unit toggle: a two-option segmented control (radiogroup) with a sliding background; below, a workout summary card whose values convert live — distance km↔mi, elevation m↔ft, weight kg↔lb, temperature °C↔°F, pace min/km↔min/mi — with a brief fade on change; values formatted to sensible decimals; the choice is announced via aria-live. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const base = { distance: 12.4, elevation: 210, weight: 68, temperature: 24, pace: 5.3 };
const pace = (minutes: number) => `${Math.floor(minutes)}:${String(Math.round((minutes % 1) * 60)).padStart(2, '0')}`;

export function UnitSystemToggle() {
  const [metric, setMetric] = useState(true);
  const stats = metric
    ? [['Distance', base.distance.toFixed(1), 'km'], ['Elevation', String(base.elevation), 'm'], ['Weight', String(base.weight), 'kg'], ['Temperature', String(base.temperature), '°C'], ['Pace', pace(base.pace), '/km']]
    : [['Distance', (base.distance * 0.621371).toFixed(1), 'mi'], ['Elevation', String(Math.round(base.elevation * 3.28084)), 'ft'], ['Weight', String(Math.round(base.weight * 2.20462)), 'lb'], ['Temperature', String(Math.round(base.temperature * 1.8 + 32)), '°F'], ['Pace', pace(base.pace / 0.621371), '/mi']];

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-zinc-950 dark:text-white">Morning run</p>
        <div role="radiogroup" aria-label="Units" className="relative grid grid-cols-2 rounded-full bg-zinc-100 p-1 text-xs font-semibold dark:bg-zinc-900">
          <span aria-hidden className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm transition-transform duration-300 dark:bg-zinc-700" style={{ transform: metric ? 'translateX(0)' : 'translateX(100%)' }} />
          {[['Metric', true], ['Imperial', false]].map(([label, value]) => <button key={label as string} type="button" role="radio" aria-checked={metric === value} onClick={() => setMetric(value as boolean)} className={`relative z-10 px-3 py-1 ${metric === value ? 'text-zinc-950 dark:text-white' : 'text-zinc-500'}`}>{label as string}</button>)}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">Showing {metric ? 'metric' : 'imperial'} units</p>
      <dl key={String(metric)} className="mt-5 grid grid-cols-2 gap-4 motion-safe:animate-[pui-units-fade_.3s_ease-out]">
        {stats.map(([label, value, unit], index) => <div key={label} className={index === 0 ? 'col-span-2' : ''}><dt className="text-xs text-zinc-500">{label}</dt><dd className={`font-bold tabular-nums text-zinc-950 dark:text-white ${index === 0 ? 'text-4xl' : 'text-xl'}`}>{value}<span className="ml-1 text-sm font-medium text-zinc-500">{unit}</span></dd></div>)}
      </dl>
      <style>{`@keyframes pui-units-fade { from { opacity: .3; transform: translateY(3px) } to { opacity: 1; transform: none } }`}</style>
    </div>
  );
}
