/**
 * @registry
 * name: View Options Menu
 * category: Menu
 * style: Dark
 * tags: featured, recent
 * description: Menu « Affichage » façon outil de gestion de projet : liste/tableau, regroupement, tri, propriétés visibles en puces et sous-éléments.
 * prompt: Create a dark "Display" view options menu (open by default) like Linear: a Layout segmented control (List / Board), Grouping and Ordering selects, toggles for "Show sub-issues" and "Show empty groups", a "Display properties" section of toggle chips (ID, Status, Priority, Assignee, Labels, Due date) with aria-pressed, and a "Reset to default" link; a small preview list row below the menu updates live to show/hide the selected properties. Dark in both themes.
 */
'use client';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const allProps = ['ID', 'Status', 'Priority', 'Assignee', 'Labels', 'Due date'];
const defaults = { layout: 'List', group: 'Status', order: 'Priority', sub: true, empty: false, props: ['ID', 'Status', 'Priority', 'Assignee'] };

export function ViewOptionsMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [view, setView] = useState(defaults);
  const has = (prop: string) => view.props.includes(prop);
  const select = 'rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-200 ring-1 ring-white/10';

  return (
    <div className="w-full max-w-sm text-zinc-300">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)} className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-200 ring-1 ring-white/10 hover:bg-zinc-800"><SlidersHorizontal aria-hidden className="size-3.5" />Display</button>
      {open && (
        <div role="dialog" aria-label="Display options" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }} className="mt-2 space-y-3 rounded-xl bg-zinc-900 p-3 text-xs shadow-2xl ring-1 ring-white/10">
          <div role="radiogroup" aria-label="Layout" className="grid grid-cols-2 gap-1 rounded-lg bg-black/30 p-1">{([['List', List], ['Board', LayoutGrid]] as const).map(([name, Icon]) => <button key={name} type="button" role="radio" aria-checked={view.layout === name} onClick={() => setView({ ...view, layout: name })} className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 ${view.layout === name ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}><Icon aria-hidden className="size-3.5" />{name}</button>)}</div>
          <label className="flex items-center justify-between">Grouping<select value={view.group} onChange={(event) => setView({ ...view, group: event.target.value })} className={select}>{['Status', 'Assignee', 'Project', 'No grouping'].map((value) => <option key={value} className="bg-zinc-900">{value}</option>)}</select></label>
          <label className="flex items-center justify-between">Ordering<select value={view.order} onChange={(event) => setView({ ...view, order: event.target.value })} className={select}>{['Priority', 'Last updated', 'Created', 'Due date'].map((value) => <option key={value} className="bg-zinc-900">{value}</option>)}</select></label>
          {([['sub', 'Show sub-issues'], ['empty', 'Show empty groups']] as const).map(([key, label]) => <label key={key} className="flex items-center justify-between">{label}<input type="checkbox" role="switch" checked={view[key]} onChange={(event) => setView({ ...view, [key]: event.target.checked })} className="accent-indigo-400" /></label>)}
          <div className="border-t border-white/10 pt-3"><p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Display properties</p><div className="mt-2 flex flex-wrap gap-1.5">{allProps.map((prop) => <button key={prop} type="button" aria-pressed={has(prop)} onClick={() => setView({ ...view, props: has(prop) ? view.props.filter((item) => item !== prop) : [...view.props, prop] })} className={`rounded-md px-2 py-1 ${has(prop) ? 'bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-400/40' : 'bg-white/5 text-zinc-400 ring-1 ring-white/10'}`}>{prop}</button>)}</div></div>
          <button type="button" onClick={() => setView(defaults)} className="text-zinc-500 underline hover:text-zinc-300">Reset to default</button>
        </div>
      )}
      <div aria-live="polite" className="mt-3 flex items-center gap-2 rounded-lg bg-zinc-950 px-3 py-2 text-xs ring-1 ring-white/10">
        {has('Priority') && <span className="text-amber-400" title="High priority">▲</span>}
        {has('ID') && <span className="font-mono text-zinc-500">PUI-142</span>}
        {has('Status') && <span className="size-2.5 rounded-full border-2 border-sky-400" title="In progress" />}
        <span className="min-w-0 flex-1 truncate text-zinc-100">Add keyboard support to menus</span>
        {has('Labels') && <span className="rounded-full bg-violet-500/20 px-1.5 text-[10px] text-violet-200">a11y</span>}
        {has('Due date') && <span className="text-zinc-500">Oct 18</span>}
        {has('Assignee') && <span className="grid size-5 place-items-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">AD</span>}
      </div>
      <p className="mt-1 text-[11px] text-zinc-500">{view.layout} · grouped by {view.group.toLowerCase()} · ordered by {view.order.toLowerCase()}</p>
    </div>
  );
}
