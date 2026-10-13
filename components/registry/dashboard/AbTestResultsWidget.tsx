/**
 * @registry
 * name: AB Test Results Widget
 * category: Dashboard
 * style: SaaS
 * tags: recent
 * description: Résultats de test A/B : taux de conversion par variante, intervalle de confiance, uplift, probabilité d'être meilleur et décision.
 * prompt: Create an A/B test results widget: experiment name with a "Running · day 14" pill, two variant rows (Control, Variant B) with visitors, conversions and conversion rate; a confidence interval chart where each variant is a horizontal range bar with a dot at the mean on a shared axis; uplift "+12.4%" and "Probability to beat control 96%" with a significance badge; a metric select (Signup, Activation, Revenue) switching the numbers; actions "Ship Variant B" and "Keep running". Light and dark mode.
 */
'use client';
import { useState } from 'react';

const metrics = {
  Signup: { control: [10412, 832, 7.2, 8.8], variant: [10388, 935, 8.2, 9.8], uplift: '+12.4%', prob: 96 },
  Activation: { control: [832, 371, 41, 48], variant: [935, 433, 43, 50], uplift: '+4.1%', prob: 71 },
  Revenue: { control: [10412, 96, 0.8, 1.1], variant: [10388, 92, 0.75, 1.05], uplift: '−3.9%', prob: 34 },
};
type Metric = keyof typeof metrics;

export function AbTestResultsWidget() {
  const [metric, setMetric] = useState<Metric>('Signup');
  const data = metrics[metric];
  const lo = Math.min(data.control[2], data.variant[2]) * 0.9;
  const hi = Math.max(data.control[3], data.variant[3]) * 1.05;
  const pos = (value: number) => `${((value - lo) / (hi - lo)) * 100}%`;
  const significant = data.prob >= 95;

  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-semibold text-zinc-950 dark:text-white">Pricing page headline</h3>
        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">Running · day 14</span>
        <select aria-label="Metric" value={metric} onChange={(event) => setMetric(event.target.value as Metric)} className="ml-auto rounded-lg border border-zinc-200 bg-transparent px-2 py-1 text-xs dark:border-zinc-700 dark:text-zinc-300">{Object.keys(metrics).map((key) => <option key={key}>{key}</option>)}</select>
      </div>
      <table className="mt-4 w-full text-sm">
        <thead className="text-left text-xs text-zinc-500"><tr><th className="font-medium">Variant</th><th className="text-right font-medium">Visitors</th><th className="text-right font-medium">Conv.</th><th className="text-right font-medium">Rate</th></tr></thead>
        <tbody>{[['Control', data.control, 'bg-zinc-400'], ['Variant B', data.variant, 'bg-indigo-500']].map(([name, row, dot]) => { const values = row as number[]; return <tr key={name as string} className="border-t border-zinc-100 dark:border-zinc-800"><td className="py-2"><span className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"><span className={`size-2 rounded-full ${dot}`} />{name as string}</span></td><td className="text-right tabular-nums text-zinc-600 dark:text-zinc-400">{values[0].toLocaleString('en-US')}</td><td className="text-right tabular-nums text-zinc-600 dark:text-zinc-400">{values[1].toLocaleString('en-US')}</td><td className="text-right font-semibold tabular-nums text-zinc-950 dark:text-white">{((values[2] + values[3]) / 2).toFixed(1)}%</td></tr>; })}</tbody>
      </table>
      <div className="mt-4 space-y-3" aria-hidden>
        {[[data.control, 'bg-zinc-300 dark:bg-zinc-700', 'bg-zinc-500'], [data.variant, 'bg-indigo-200 dark:bg-indigo-500/30', 'bg-indigo-600']].map(([row, band, dot], index) => { const values = row as number[]; return <div key={index} className="relative h-3 rounded-full bg-zinc-50 dark:bg-zinc-900"><span className={`absolute inset-y-0 rounded-full transition-all duration-500 ${band}`} style={{ left: pos(values[2]), width: `calc(${pos(values[3])} - ${pos(values[2])})` }} /><span className={`absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white transition-all duration-500 dark:ring-zinc-950 ${dot}`} style={{ left: pos((values[2] + values[3]) / 2) }} /></div>; })}
        <p className="text-[10px] text-zinc-400">95% confidence intervals</p>
      </div>
      <div aria-live="polite" className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900"><p className="text-xs text-zinc-500">Uplift</p><p className={`text-xl font-bold ${data.uplift.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{data.uplift}</p></div>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900"><p className="text-xs text-zinc-500">Chance to beat control</p><p className="text-xl font-bold text-zinc-950 dark:text-white">{data.prob}% <span className={`align-middle text-[10px] font-semibold ${significant ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`}>{significant ? 'Significant' : 'Not yet'}</span></p></div>
      </div>
      <div className="mt-4 flex gap-2"><button type="button" disabled={!significant} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40">Ship Variant B</button><button type="button" className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Keep running</button></div>
    </section>
  );
}
