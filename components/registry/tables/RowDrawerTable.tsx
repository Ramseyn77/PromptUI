/**
 * @registry
 * name: Row Drawer Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Tableau dont chaque ligne ouvre un panneau de détails latéral (édition du statut, notes, activité), navigation ligne précédente/suivante.
 * prompt: Create a table where clicking a row (or pressing Enter on it) opens a details side panel next to the table (below it on mobile) for that record: customer name, plan, MRR, status select, editable notes textarea and an activity list; the selected row is highlighted with aria-selected; the panel has Previous / Next buttons to move between rows, a close button and Escape to close; editing the status updates the row badge live. Light and dark mode.
 */
'use client';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

const initial = [
  { id: 1, name: 'Kora Bank', plan: 'Enterprise', mrr: 4200, status: 'Active', notes: 'Renewal call booked for Nov 3.' },
  { id: 2, name: 'Atelier', plan: 'Pro', mrr: 480, status: 'Trial', notes: '' },
  { id: 3, name: 'Northwind', plan: 'Team', mrr: 1250, status: 'Active', notes: 'Asked about SSO.' },
  { id: 4, name: 'Lumen', plan: 'Pro', mrr: 640, status: 'At risk', notes: 'Usage dropped 40% this month.' },
  { id: 5, name: 'Shamba', plan: 'Team', mrr: 980, status: 'Active', notes: '' },
];
const badge: Record<string, string> = { Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300', Trial: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300', 'At risk': 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300', Churned: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800' };

export function RowDrawerTable() {
  const [rows, setRows] = useState(initial);
  const [selected, setSelected] = useState<number | null>(3);
  const index = rows.findIndex((row) => row.id === selected);
  const row = index >= 0 ? rows[index] : null;
  const patch = (change: Partial<(typeof initial)[number]>) => setRows((list) => list.map((item) => (item.id === selected ? { ...item, ...change } : item)));

  return (
    <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white lg:flex-row dark:border-zinc-800 dark:bg-zinc-950" onKeyDown={(event) => { if (event.key === 'Escape') setSelected(null); }}>
      <div className="min-w-0 flex-1 overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[26rem] text-sm">
          <thead className="text-left text-xs text-zinc-500"><tr className="border-b border-zinc-200 dark:border-zinc-800"><th className="px-4 py-2.5 font-medium">Customer</th><th className="font-medium">Plan</th><th className="text-right font-medium">MRR</th><th className="px-4 font-medium">Status</th></tr></thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id} tabIndex={0} aria-selected={item.id === selected} onClick={() => setSelected(item.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(item.id); } }} className={`cursor-pointer border-b border-zinc-100 outline-none last:border-0 focus-visible:bg-indigo-50/60 dark:border-zinc-900 dark:focus-visible:bg-indigo-500/10 ${item.id === selected ? 'bg-indigo-50 dark:bg-indigo-500/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}>
                <td className="px-4 py-2.5 font-medium text-zinc-950 dark:text-white">{item.name}</td><td className="text-zinc-600 dark:text-zinc-400">{item.plan}</td><td className="text-right tabular-nums text-zinc-900 dark:text-zinc-100">${item.mrr.toLocaleString('en-US')}</td><td className="px-4"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge[item.status]}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {row && (
        <aside aria-label={`${row.name} details`} className="w-full shrink-0 border-t border-zinc-200 p-4 lg:w-72 lg:border-l lg:border-t-0 dark:border-zinc-800">
          <div className="flex items-center gap-1"><h3 className="flex-1 font-semibold text-zinc-950 dark:text-white">{row.name}</h3><button type="button" aria-label="Previous record" disabled={index === 0} onClick={() => setSelected(rows[index - 1].id)} className="grid size-7 place-items-center rounded-md hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ChevronUp aria-hidden className="size-4" /></button><button type="button" aria-label="Next record" disabled={index === rows.length - 1} onClick={() => setSelected(rows[index + 1].id)} className="grid size-7 place-items-center rounded-md hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ChevronDown aria-hidden className="size-4" /></button><button type="button" aria-label="Close details" onClick={() => setSelected(null)} className="grid size-7 place-items-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"><X aria-hidden className="size-4" /></button></div>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm"><div><dt className="text-xs text-zinc-500">Plan</dt><dd className="text-zinc-900 dark:text-zinc-100">{row.plan}</dd></div><div><dt className="text-xs text-zinc-500">MRR</dt><dd className="tabular-nums text-zinc-900 dark:text-zinc-100">${row.mrr.toLocaleString('en-US')}</dd></div></dl>
          <label className="mt-3 block text-xs text-zinc-500">Status<select value={row.status} onChange={(event) => patch({ status: event.target.value })} className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100">{Object.keys(badge).map((status) => <option key={status}>{status}</option>)}</select></label>
          <label className="mt-3 block text-xs text-zinc-500">Notes<textarea rows={3} value={row.notes} onChange={(event) => patch({ notes: event.target.value })} placeholder="Add a note…" className="mt-1 w-full resize-none rounded-lg border border-zinc-300 bg-transparent px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100" /></label>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Activity</p>
          <ul className="mt-1.5 space-y-1 text-xs text-zinc-600 dark:text-zinc-400"><li>Invoice paid · 2 days ago</li><li>3 new seats added · last week</li><li>Plan changed to {row.plan} · Aug</li></ul>
        </aside>
      )}
    </div>
  );
}
