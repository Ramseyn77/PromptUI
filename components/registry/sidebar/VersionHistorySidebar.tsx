/**
 * @registry
 * name: Version History Sidebar
 * category: Sidebar
 * style: SaaS
 * tags: recent
 * description: Historique des versions d'un document : versions groupées par jour, auteurs, aperçu de la version choisie avec différences surlignées et restauration.
 * prompt: Create a version history sidebar: versions grouped by day (Today, Yesterday, Oct 9) with time, author initials and an optional name ("Before pricing change"); selecting a version (radiogroup, arrow keys) shows its content in the main preview with additions highlighted green and deletions struck in red compared with the current version; a "Restore this version" button with confirmation and a "Name this version" inline input; the current version is labelled "Current". Light and dark mode.
 */
'use client';
import { useState } from 'react';

const versions = [
  { id: 4, day: 'Today', time: '14:20', author: 'AD', name: 'Current', text: [['same', 'Pricing starts at '], ['add', '$24'], ['same', ' per seat, billed '], ['add', 'annually'], ['same', '.']] },
  { id: 3, day: 'Today', time: '10:05', author: 'LM', name: '', text: [['same', 'Pricing starts at '], ['del', '$19'], ['add', '$24'], ['same', ' per seat, billed monthly.']] },
  { id: 2, day: 'Yesterday', time: '17:42', author: 'KM', name: 'Before pricing change', text: [['same', 'Pricing starts at $19 per seat, billed monthly.']] },
  { id: 1, day: 'Oct 9', time: '09:12', author: 'AD', name: 'First draft', text: [['same', 'Pricing '], ['add', 'starts at $19 per seat'], ['del', 'TBD'], ['same', '.']] },
];

export function VersionHistorySidebar() {
  const [selected, setSelected] = useState(3);
  const [names, setNames] = useState<Record<number, string>>({});
  const [confirm, setConfirm] = useState(false);
  const [status, setStatus] = useState('');
  const version = versions.find((item) => item.id === selected)!;
  const days = [...new Set(versions.map((item) => item.day))];

  return (
    <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white md:flex-row dark:border-zinc-800 dark:bg-zinc-950">
      <main className="flex-1 p-6">
        <p className="text-xs text-zinc-500">{version.day} · {version.time} · by {version.author}</p>
        <h3 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">Pricing page copy</h3>
        <p className="mt-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">{version.text.map(([kind, chunk], index) => kind === 'add' ? <ins key={index} className="rounded bg-emerald-100 px-0.5 no-underline text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200">{chunk}</ins> : kind === 'del' ? <del key={index} className="rounded bg-rose-100 px-0.5 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300">{chunk}</del> : <span key={index}>{chunk}</span>)}</p>
        {version.id !== 4 && (confirm ? <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">Restore this version? The current one stays in history.<button type="button" onClick={() => { setConfirm(false); setStatus(`Restored version from ${version.day} ${version.time}`); }} className="ml-auto rounded-lg bg-zinc-950 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Restore</button><button type="button" onClick={() => setConfirm(false)} className="text-xs underline">Cancel</button></div> : <button type="button" onClick={() => setConfirm(true)} className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Restore this version</button>)}
        <p aria-live="polite" className="mt-3 text-sm text-emerald-700 dark:text-emerald-400">{status}</p>
      </main>
      <aside aria-label="Version history" className="w-full shrink-0 border-t border-zinc-200 bg-zinc-50 p-4 md:w-72 md:border-l md:border-t-0 dark:border-zinc-800 dark:bg-zinc-900">
        <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">Version history</h4>
        <div role="radiogroup" aria-label="Versions" className="mt-3 space-y-4">
          {days.map((day) => (
            <div key={day}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{day}</p>
              <ul className="mt-1 space-y-1">
                {versions.filter((item) => item.day === day).map((item) => (
                  <li key={item.id}>
                    <button type="button" role="radio" aria-checked={selected === item.id} tabIndex={selected === item.id ? 0 : -1} onClick={() => { setSelected(item.id); setConfirm(false); setStatus(''); }} onKeyDown={(event) => { const index = versions.findIndex((entry) => entry.id === selected); const delta = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0; const next = index + delta; if (!delta || next < 0 || next >= versions.length) return; event.preventDefault(); setSelected(versions[next].id); (event.currentTarget.closest('[role=radiogroup]')?.querySelectorAll<HTMLElement>('[role=radio]')[next])?.focus(); }} className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm ${selected === item.id ? 'bg-white shadow-sm ring-1 ring-indigo-500 dark:bg-zinc-800' : 'hover:bg-white/70 dark:hover:bg-zinc-800/60'}`}>
                      <span className="grid size-6 place-items-center rounded-full bg-zinc-900 text-[9px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">{item.author}</span>
                      <span className="flex-1"><span className="block tabular-nums text-zinc-900 dark:text-zinc-100">{item.time}</span>{(names[item.id] || item.name) && <span className="block text-xs text-indigo-600 dark:text-indigo-400">{names[item.id] || item.name}</span>}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {version.id !== 4 && <label className="mt-4 block text-xs text-zinc-500">Name this version<input value={names[selected] ?? version.name} onChange={(event) => setNames({ ...names, [selected]: event.target.value })} className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /></label>}
      </aside>
    </div>
  );
}
