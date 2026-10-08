/**
 * @registry
 * name: Diverging Bar Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Barres divergentes d'un sondage : avis négatifs à gauche, positifs à droite autour d'un axe central.
 * prompt: Create a diverging stacked bar chart for survey results (5 questions × Strongly disagree…Strongly agree): negative segments extend left of a center axis and positive to the right, neutral split across the center; rose to emerald palette, legend, percentage labels inside wide segments, hover highlights a question row. sr-only table. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const scale = [
  { label: 'Strongly disagree', color: '#e11d48' }, { label: 'Disagree', color: '#fb7185' }, { label: 'Neutral', color: '#a1a1aa' }, { label: 'Agree', color: '#34d399' }, { label: 'Strongly agree', color: '#059669' },
];
const rows = [
  ['Onboarding was easy', [4, 8, 14, 44, 30]], ['Docs are clear', [10, 18, 22, 32, 18]], ['Pricing is fair', [16, 24, 20, 28, 12]], ['Support is fast', [3, 7, 12, 40, 38]], ['I would recommend', [5, 9, 16, 36, 34]],
] as const;

export function DivergingBarChart() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Customer survey</h3>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">{scale.map((item) => <span key={item.label} className="flex items-center gap-1"><span className="size-2 rounded-sm" style={{ background: item.color }} />{item.label}</span>)}</div>
      <div className="relative mt-4 space-y-2">
        <span aria-hidden className="absolute bottom-0 top-0 z-10 w-px bg-zinc-900/40 dark:bg-white/40" style={{ left: 'calc(9rem + (100% - 9rem) / 2)' }} />
        {rows.map(([question, values], index) => {
          const left = values[0] + values[1] + values[2] / 2;
          return (
            <div key={question} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)} className={`flex items-center gap-3 transition-opacity ${hover !== null && hover !== index ? 'opacity-40' : ''}`}>
              <span className="w-36 shrink-0 truncate text-right text-xs text-zinc-600 dark:text-zinc-400">{question}</span>
              <div className="relative h-6 flex-1">
                <div className="absolute inset-y-0 flex overflow-hidden rounded" style={{ left: `${50 - left / 2}%`, width: '50%' }}>
                  {values.map((value, i) => <span key={i} className="grid h-full place-items-center text-[10px] font-semibold text-white" style={{ width: `${value}%`, background: scale[i].color }}>{value >= 12 ? `${value}%` : ''}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sr-only"><table><caption>Survey answers (%)</caption><thead><tr><th>Question</th>{scale.map((item) => <th key={item.label}>{item.label}</th>)}</tr></thead><tbody>{rows.map(([question, values]) => <tr key={question}><td>{question}</td>{values.map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody></table></div>
    </section>
  );
}
