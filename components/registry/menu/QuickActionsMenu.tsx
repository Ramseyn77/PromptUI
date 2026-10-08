/**
 * @registry
 * name: Quick Actions Menu
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Menu « Créer » en grille 3×2 de raccourcis colorés, navigable aux flèches, qui s'ouvre sous le bouton.
 * prompt: Create a "Create new" quick actions menu: a plus button (aria-haspopup, aria-expanded) opens a panel in flow with a 3×2 grid of colorful action tiles (Doc, Sheet, Board, Form, Meeting, Upload), each with icon + label and a short hint; arrow keys move focus in 2D, Escape closes. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { CalendarPlus, ClipboardList, FileText, KanbanSquare, Plus, Table, Upload, type LucideIcon } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const actions: [LucideIcon, string, string, string][] = [
  [FileText, 'Doc', 'Write together', 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300'],
  [Table, 'Sheet', 'Track data', 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'],
  [KanbanSquare, 'Board', 'Plan work', 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'],
  [ClipboardList, 'Form', 'Collect answers', 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'],
  [CalendarPlus, 'Meeting', 'Book a slot', 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'],
  [Upload, 'Upload', 'Add files', 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'],
];

export function QuickActionsMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(event: KeyboardEvent, index: number) {
    const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 };
    if (event.key === 'Escape') { setOpen(false); return; }
    if (!(event.key in moves)) return;
    event.preventDefault();
    refs.current[(index + moves[event.key] + actions.length) % actions.length]?.focus();
  }

  return (
    <div className="w-80">
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:bg-white dark:text-zinc-950"><Plus aria-hidden className={`size-4 transition-transform ${open ? 'rotate-45' : ''}`} />Create</button>
      {open && (
        <div role="menu" aria-label="Create new" className="mt-2 grid grid-cols-3 gap-1.5 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {actions.map(([Icon, label, hint, tone], index) => (
            <button key={label} ref={(node) => { refs.current[index] = node; }} type="button" role="menuitem" onKeyDown={(event) => onKey(event, index)} className="flex flex-col items-center gap-1.5 rounded-xl p-2.5 text-center outline-none hover:bg-zinc-50 focus-visible:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900">
              <span className={`grid size-9 place-items-center rounded-lg ${tone}`}><Icon aria-hidden className="size-4" /></span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{label}</span>
              <span className="text-[10px] leading-tight text-zinc-500">{hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
