/**
 * @registry
 * name: Reasoning Effort Picker
 * category: AI Chat
 * style: SaaS
 * tags: recent
 * description: Sélecteur d'effort de raisonnement (rapide → approfondi) sous forme de curseur à crans, avec estimation de temps, coût et qualité.
 * prompt: Create a reasoning effort picker for an AI composer: a 4-stop segmented slider (Instant, Low, Medium, High) built as a radiogroup with arrow-key support and a sliding thumb; under it three small meters update with the selection — speed, depth and relative cost — plus an estimate line "~12 s · ≈ 4k thinking tokens"; a compact composer row shows the chosen effort as a pill. Light and dark mode.
 */
'use client';
import { Brain } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const levels = [
  { name: 'Instant', speed: 4, depth: 1, cost: 1, estimate: '~1 s · no extended thinking' },
  { name: 'Low', speed: 3, depth: 2, cost: 2, estimate: '~4 s · ≈ 1k thinking tokens' },
  { name: 'Medium', speed: 2, depth: 3, cost: 3, estimate: '~12 s · ≈ 4k thinking tokens' },
  { name: 'High', speed: 1, depth: 4, cost: 4, estimate: '~40 s · ≈ 16k thinking tokens' },
];

function Meter({ label, value }: { label: string; value: number }) {
  return <div><p className="text-[11px] text-zinc-500">{label}</p><div className="mt-1 flex gap-0.5" aria-hidden>{[1, 2, 3, 4].map((step) => <span key={step} className={`h-1.5 flex-1 rounded-full transition-colors ${step <= value ? 'bg-indigo-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />)}</div><span className="sr-only">{value} of 4</span></div>;
}

export function ReasoningEffortPicker() {
  const [level, setLevel] = useState(2);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = levels[level];

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = Math.min(3, Math.max(0, level + (event.key === 'ArrowRight' ? 1 : -1)));
    setLevel(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-white"><Brain aria-hidden className="size-4 text-indigo-500" />Reasoning effort</p>
      <div role="radiogroup" aria-label="Reasoning effort" onKeyDown={onKeyDown} className="relative mt-3 grid grid-cols-4 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
        <span aria-hidden className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-lg bg-white shadow-sm transition-transform duration-300 dark:bg-zinc-700" style={{ transform: `translateX(${level * 100}%)` }} />
        {levels.map((item, index) => <button key={item.name} ref={(node) => { refs.current[index] = node; }} type="button" role="radio" aria-checked={level === index} tabIndex={level === index ? 0 : -1} onClick={() => setLevel(index)} className={`relative z-10 py-1.5 text-xs font-semibold ${level === index ? 'text-zinc-950 dark:text-white' : 'text-zinc-500'}`}>{item.name}</button>)}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4"><Meter label="Speed" value={current.speed} /><Meter label="Depth" value={current.depth} /><Meter label="Cost" value={current.cost} /></div>
      <p aria-live="polite" className="mt-3 text-xs text-zinc-500">{current.estimate}</p>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-400 dark:border-zinc-800">Ask anything…<span className="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">{current.name}</span></div>
    </div>
  );
}
