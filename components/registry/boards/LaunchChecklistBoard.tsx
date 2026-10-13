/**
 * @registry
 * name: Launch Checklist Board
 * category: Boards
 * style: Dark
 * tags: recent
 * description: Board de lancement produit par équipe (Produit, Marketing, Support, Juridique) : tâches cochables, propriétaires, bloqueurs et compte à rebours J-x.
 * prompt: Create a dark product launch checklist board: a header with "Launch: Prism 5" and a "T−6 days" pill plus an overall readiness bar; four team columns (Product, Marketing, Support, Legal) each with a progress fraction and checklist items (checkbox, label, owner initials, optional due tag); items can be flagged as blockers (red) via a small flag toggle; blocked items are counted in the header ("2 blockers"); horizontal scroll on mobile. Dark in both themes.
 */
'use client';
import { Flag } from 'lucide-react';
import { useState } from 'react';

const initial = [
  ['Product', 'Feature freeze', 'LM', true, false], ['Product', 'Release notes', 'AD', false, false], ['Product', 'Feature flags off → on', 'LM', false, true],
  ['Marketing', 'Landing page live', 'IR', true, false], ['Marketing', 'Launch video', 'IR', false, false], ['Marketing', 'Press embargo emails', 'KM', false, false],
  ['Support', 'Help center articles', 'MT', false, false], ['Support', 'Macros updated', 'MT', true, false],
  ['Legal', 'Terms update', 'SO', false, true], ['Legal', 'DPA review', 'SO', true, false],
].map(([team, label, owner, done, blocker], id) => ({ id, team: team as string, label: label as string, owner: owner as string, done: done as boolean, blocker: blocker as boolean }));
const teams = ['Product', 'Marketing', 'Support', 'Legal'];

export function LaunchChecklistBoard() {
  const [items, setItems] = useState(initial);
  const done = items.filter((item) => item.done).length;
  const blockers = items.filter((item) => item.blocker && !item.done).length;
  const patch = (id: number, change: Partial<(typeof initial)[number]>) => setItems((list) => list.map((item) => (item.id === id ? { ...item, ...change } : item)));

  return (
    <section className="w-full max-w-5xl rounded-2xl bg-zinc-950 p-5 text-zinc-300 ring-1 ring-white/10">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-semibold text-white">Launch: Prism 5</h3>
        <span className="rounded-full bg-fuchsia-500/15 px-2.5 py-0.5 text-xs font-semibold text-fuchsia-300">T−6 days</span>
        <span aria-live="polite" className={`text-xs font-semibold ${blockers ? 'text-rose-400' : 'text-emerald-400'}`}>{blockers ? `${blockers} blocker${blockers > 1 ? 's' : ''}` : 'No blockers'}</span>
        <span className="ml-auto text-xs tabular-nums text-zinc-500">{done}/{items.length} ready</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400 transition-all" style={{ width: `${(done / items.length) * 100}%` }} /></div>
      <div className="mt-5 flex gap-3 overflow-x-auto pb-1" data-lenis-prevent>
        {teams.map((team) => {
          const list = items.filter((item) => item.team === team);
          return (
            <section key={team} aria-label={team} className="w-56 shrink-0 rounded-xl bg-white/5 p-3">
              <h4 className="flex items-center justify-between text-sm font-semibold text-white">{team}<span className="text-xs font-normal tabular-nums text-zinc-500">{list.filter((item) => item.done).length}/{list.length}</span></h4>
              <ul className="mt-2 space-y-1.5">
                {list.map((item) => (
                  <li key={item.id} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${item.blocker && !item.done ? 'bg-rose-500/10 ring-1 ring-rose-500/40' : ''}`}>
                    <input type="checkbox" checked={item.done} onChange={(event) => patch(item.id, { done: event.target.checked })} aria-label={item.label} className="accent-fuchsia-400" />
                    <span className={`flex-1 text-xs ${item.done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{item.label}</span>
                    <button type="button" aria-pressed={item.blocker} aria-label={`Flag “${item.label}” as blocker`} onClick={() => patch(item.id, { blocker: !item.blocker })} className={`grid size-6 place-items-center rounded ${item.blocker ? 'text-rose-400' : 'text-zinc-600 hover:text-zinc-300'}`}><Flag aria-hidden className={`size-3.5 ${item.blocker ? 'fill-current' : ''}`} /></button>
                    <span className="grid size-5 place-items-center rounded-full bg-white/10 text-[9px] font-bold">{item.owner}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
