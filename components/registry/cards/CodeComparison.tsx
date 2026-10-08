/**
 * @registry
 * name: Code Comparison
 * category: Cards
 * style: Dark
 * tags: recent
 * description: Comparaison avant/après de deux extraits de code avec lignes supprimées et ajoutées surlignées.
 * prompt: Create a before/after code comparison card: two panes (stacked on mobile, side by side from md) each with a filename tab and a Before/After badge, monospaced lines with line numbers; removed lines get a rose background and "-" marker, added lines an emerald background and "+" marker; a center "vs" chip. Horizontal scroll inside panes if needed. Dark editor look in both themes.
 */
const before = [
  ['', "import { useEffect, useState } from 'react';"],
  ['', ''],
  ['', 'export function useUser(id) {'],
  ['-', '  const [user, setUser] = useState(null);'],
  ['-', '  useEffect(() => {'],
  ['-', '    fetch(`/api/users/${id}`).then((r) => r.json()).then(setUser);'],
  ['-', '  }, [id]);'],
  ['', '  return user;'],
  ['', '}'],
] as const;

const after = [
  ['', "import useSWR from 'swr';"],
  ['', ''],
  ['', 'export function useUser(id) {'],
  ['+', '  const { data } = useSWR(`/api/users/${id}`);'],
  ['+', '  return data ?? null;'],
  ['', '}'],
] as const;

function Pane({ file, label, lines }: { file: string; label: string; lines: readonly (readonly [string, string])[] }) {
  return (
    <figure className="min-w-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-xs text-zinc-400">
        {file}
        <span className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold ${label === 'After' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>{label}</span>
      </figcaption>
      <pre className="overflow-x-auto py-3 font-mono text-[12px] leading-6"><code>
        {lines.map(([mark, text], index) => (
          <span key={index} className={`flex pr-4 ${mark === '-' ? 'bg-rose-500/10' : mark === '+' ? 'bg-emerald-500/10' : ''}`}>
            <span aria-hidden className="w-9 shrink-0 select-none pr-3 text-right text-zinc-600">{index + 1}</span>
            <span aria-hidden className={`w-4 shrink-0 select-none ${mark === '-' ? 'text-rose-400' : 'text-emerald-400'}`}>{mark}</span>
            <span className={mark === '-' ? 'text-rose-200' : mark === '+' ? 'text-emerald-200' : 'text-zinc-300'}>{text || ' '}</span>
          </span>
        ))}
      </code></pre>
    </figure>
  );
}

export function CodeComparison() {
  return (
    <div className="relative flex w-full max-w-4xl flex-col gap-3 rounded-2xl bg-zinc-950 p-3 md:flex-row">
      <Pane file="useUser.js" label="Before" lines={before} />
      <span aria-hidden className="absolute left-1/2 top-1/2 z-10 hidden size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-zinc-900 text-xs font-bold text-zinc-300 md:grid">vs</span>
      <Pane file="useUser.js" label="After" lines={after} />
    </div>
  );
}
