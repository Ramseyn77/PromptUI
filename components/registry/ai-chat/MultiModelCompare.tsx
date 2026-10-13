/**
 * @registry
 * name: Multi Model Compare
 * category: AI Chat
 * style: SaaS
 * tags: featured, recent
 * description: Comparaison côte à côte de réponses de plusieurs modèles au même prompt : latence, coût, tokens, vote de la meilleure réponse.
 * prompt: Create a side-by-side model comparison: a shared prompt bar at the top with a Run button; two or three answer columns (Model A Fast, Model B Balanced, Model C Deep) that stream in at different speeds after Run, each with latency, token count and cost chips; a "Prefer this" button per column (aria-pressed, only one) that highlights the winner; a toggle shows 2 or 3 columns; columns stack vertically on mobile. Light and dark mode.
 */
'use client';
import { Play, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const models = [
  { name: 'Model A', tag: 'Fast', speed: 3, latency: '0.6s', tokens: 84, cost: '$0.0002', text: 'Use a short, benefit-led headline: “Ship docs your team actually reads.” Keep the subline to one sentence.' },
  { name: 'Model B', tag: 'Balanced', speed: 2, latency: '1.4s', tokens: 132, cost: '$0.0011', text: 'Lead with the outcome: “Docs that answer before you ask.” Then add a proof point, e.g. “Teams cut support tickets by 30%.” End with one CTA.' },
  { name: 'Model C', tag: 'Deep', speed: 1, latency: '3.8s', tokens: 210, cost: '$0.0048', text: 'Start from the reader’s pain (stale docs), promise a specific change (“always up to date, automatically”), back it with one number, and keep the CTA verb concrete: “Import your docs”.' },
];

export function MultiModelCompare() {
  const [count, setCount] = useState(3);
  const [run, setRun] = useState(1);
  const [progress, setProgress] = useState([999, 999, 999]);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setProgress([0, 0, 0]);
    const timer = window.setInterval(() => setProgress((list) => list.map((value, index) => value + models[index].speed)), 60);
    const stop = window.setTimeout(() => window.clearInterval(timer), 6000);
    return () => { window.clearInterval(timer); window.clearTimeout(stop); };
  }, [run]);

  return (
    <div className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center gap-2">
        <p className="min-w-0 flex-1 rounded-xl bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">Write a hero headline for a docs tool</p>
        <div role="group" aria-label="Columns" className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-900">{[2, 3].map((value) => <button key={value} type="button" aria-pressed={count === value} onClick={() => setCount(value)} className={`rounded-md px-2.5 py-1 ${count === value ? 'bg-white font-semibold shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{value}</button>)}</div>
        <button type="button" onClick={() => { setRun(run + 1); setWinner(null); }} className="flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3 py-2 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950"><Play aria-hidden className="size-3.5" />Run</button>
      </div>
      <div className={`mt-4 grid gap-3 ${count === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
        {models.slice(0, count).map((model, index) => {
          const words = model.text.split(' ');
          const shown = words.slice(0, progress[index]).join(' ');
          const done = progress[index] >= words.length;
          return (
            <article key={model.name} className={`flex flex-col rounded-xl border p-4 transition ${winner === index ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
              <div className="flex items-center gap-2"><p className="text-sm font-semibold text-zinc-950 dark:text-white">{model.name}</p><span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{model.tag}</span></div>
              <p aria-live={done ? 'polite' : 'off'} className="mt-3 min-h-[6rem] flex-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{shown}{!done && <span aria-hidden className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-zinc-400 motion-safe:animate-pulse" />}</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] tabular-nums text-zinc-500">{[model.latency, `${model.tokens} tokens`, model.cost].map((chip) => <span key={chip} className="rounded-md bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-900">{chip}</span>)}</div>
              <button type="button" aria-pressed={winner === index} disabled={!done} onClick={() => setWinner(winner === index ? null : index)} className={`mt-3 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold disabled:opacity-40 ${winner === index ? 'bg-emerald-600 text-white' : 'border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300'}`}><ThumbsUp aria-hidden className="size-3.5" />{winner === index ? 'Preferred' : 'Prefer this'}</button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
