/**
 * @registry
 * name: Token Pricing Table
 * category: Pricing
 * style: Dark
 * tags: featured, recent
 * description: Grille tarifaire d'API IA par million de tokens (entrée, sortie, cache) avec estimation de coût mensuel.
 * prompt: Create an AI API pricing table on a dark panel: rows per model tier (Lite, Standard, Pro) with context window, input/output/cached price per 1M tokens and a "Best value" badge; below, an estimator with two labelled number inputs (input and output tokens per month, in millions) and a model select that computes the monthly cost. Table scrolls horizontally on mobile. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const models = [
  { name: 'Lite', context: '128K', input: 0.25, output: 1.25, cached: 0.03 },
  { name: 'Standard', context: '200K', input: 3, output: 15, cached: 0.3, best: true },
  { name: 'Pro', context: '1M', input: 15, output: 75, cached: 1.5 },
];

export function TokenPricingTable() {
  const [model, setModel] = useState(1);
  const [inTokens, setIn] = useState(40);
  const [outTokens, setOut] = useState(8);
  const cost = inTokens * models[model].input + outTokens * models[model].output;
  const money = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: value < 1 ? 2 : 0 });

  return (
    <section className="w-full max-w-2xl rounded-3xl bg-zinc-950 p-6 text-white ring-1 ring-white/10">
      <h3 className="text-lg font-semibold">API pricing</h3>
      <p className="text-sm text-zinc-400">Per 1M tokens. Pay only for what you use.</p>
      <div className="mt-4 overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[30rem] text-sm">
          <thead className="text-left text-xs text-zinc-500"><tr><th className="py-2 font-medium">Model</th><th className="font-medium">Context</th><th className="text-right font-medium">Input</th><th className="text-right font-medium">Output</th><th className="text-right font-medium">Cached</th></tr></thead>
          <tbody className="divide-y divide-white/10">
            {models.map((row) => <tr key={row.name}><td className="py-3 font-semibold">{row.name}{row.best && <span className="ml-2 rounded-full bg-teal-400/15 px-2 py-0.5 text-[10px] font-semibold text-teal-300">Best value</span>}</td><td className="text-zinc-400">{row.context}</td><td className="text-right tabular-nums">{money(row.input)}</td><td className="text-right tabular-nums">{money(row.output)}</td><td className="text-right tabular-nums text-zinc-400">{money(row.cached)}</td></tr>)}
          </tbody>
        </table>
      </div>
      <div className="mt-5 grid gap-3 rounded-2xl bg-white/5 p-4 sm:grid-cols-4 sm:items-end">
        <label className="text-xs text-zinc-400">Model<select value={model} onChange={(event) => setModel(Number(event.target.value))} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-sm text-white">{models.map((row, index) => <option key={row.name} value={index}>{row.name}</option>)}</select></label>
        <label className="text-xs text-zinc-400">Input (M/mo)<input type="number" min={0} value={inTokens} onChange={(event) => setIn(Math.max(0, Number(event.target.value)))} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-sm text-white" /></label>
        <label className="text-xs text-zinc-400">Output (M/mo)<input type="number" min={0} value={outTokens} onChange={(event) => setOut(Math.max(0, Number(event.target.value)))} className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-sm text-white" /></label>
        <p aria-live="polite" className="text-right"><span className="block text-xs text-zinc-400">Estimated</span><span className="text-2xl font-bold tabular-nums text-teal-300">{money(cost)}</span><span className="text-xs text-zinc-500">/mo</span></p>
      </div>
    </section>
  );
}
