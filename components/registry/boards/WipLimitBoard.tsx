/**
 * @registry
 * name: WIP Limit Board
 * category: Boards
 * style: Minimal
 * tags: recent
 * description: Colonnes kanban repliables avec limite de travail en cours et alerte quand elle est dépassée.
 * prompt: Create kanban columns that each show "count / WIP limit"; a column over its limit turns its header rose with a warning; columns can collapse into a narrow vertical strip (aria-expanded) showing the name rotated. Horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { AlertTriangle, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState } from 'react';

const columns = [
  { name: 'Ready', limit: 5, cards: ['Pricing FAQ', 'Footer links'] },
  { name: 'Doing', limit: 2, cards: ['Auth flow', 'Charts', 'Dark mode'] },
  { name: 'Review', limit: 3, cards: ['Onboarding'] },
];

export function WipLimitBoard() {
  const [collapsed, setCollapsed] = useState<string[]>([]);

  return (
    <div className="flex w-full max-w-3xl gap-3 overflow-x-auto pb-2">
      {columns.map((column) => {
        const over = column.cards.length > column.limit;
        const isCollapsed = collapsed.includes(column.name);
        const toggle = () => setCollapsed((current) => (isCollapsed ? current.filter((item) => item !== column.name) : [...current, column.name]));
        return isCollapsed ? (
          <button key={column.name} type="button" aria-expanded={false} aria-label={`Expand ${column.name}`} onClick={toggle} className="flex w-10 shrink-0 flex-col items-center gap-2 rounded-2xl bg-zinc-100 py-3 text-xs font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            <ChevronsRight aria-hidden className="size-4" /><span className="[writing-mode:vertical-rl]">{column.name} · {column.cards.length}</span>
          </button>
        ) : (
          <section key={column.name} aria-label={column.name} className="w-56 shrink-0 rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900">
            <header className={`flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-semibold ${over ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
              {over && <AlertTriangle aria-label="Over WIP limit" className="size-4" />}{column.name}
              <span className="ml-auto text-xs tabular-nums">{column.cards.length}/{column.limit}</span>
              <button type="button" aria-expanded aria-label={`Collapse ${column.name}`} onClick={toggle} className="grid size-6 place-items-center rounded-md hover:bg-black/5 dark:hover:bg-white/10"><ChevronsLeft className="size-4" /></button>
            </header>
            <ul className="mt-2 space-y-2">{column.cards.map((card) => <li key={card} className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">{card}</li>)}</ul>
          </section>
        );
      })}
    </div>
  );
}
