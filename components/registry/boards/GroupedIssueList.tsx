/**
 * @registry
 * name: Grouped Issue List
 * category: Boards
 * style: Dark
 * tags: featured, recent
 * description: Liste de tickets facon Linear groupee par statut, sections repliables et icones de statut.
 * prompt: Create a Linear-style issue list: collapsible groups (In progress, Todo, Backlog) with status icons (half-filled circle, empty circle, dashed circle), counts, and rows with issue ID, title, priority bars icon, label and assignee initials; rows highlight on hover. Light and dark mode.
 */
'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const groups = [
  { name: 'In progress', icon: 'progress', issues: [['ENG-142', 'Cache pricing API responses', 3, 'Backend'], ['ENG-139', 'Fix focus trap in modal', 2, 'A11y']] },
  { name: 'Todo', icon: 'todo', issues: [['ENG-150', 'Add CSV export to reports', 2, 'Feature']] },
  { name: 'Backlog', icon: 'backlog', issues: [['ENG-101', 'Explore offline mode', 1, 'Research']] },
] as const;

function StatusIcon({ kind }: { kind: string }) {
  if (kind === 'progress') return <svg aria-hidden viewBox="0 0 14 14" className="size-3.5"><circle cx="7" cy="7" r="6" fill="none" stroke="#f59e0b" strokeWidth="1.5" /><path d="M7 1a6 6 0 0 1 0 12z" fill="#f59e0b" /></svg>;
  if (kind === 'todo') return <svg aria-hidden viewBox="0 0 14 14" className="size-3.5"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
  return <svg aria-hidden viewBox="0 0 14 14" className="size-3.5"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" /></svg>;
}

export function GroupedIssueList() {
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const toggle = (name: string) => setCollapsed((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]));

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      {groups.map((group) => {
        const open = !collapsed.includes(group.name);
        return (
          <section key={group.name}>
            <h3>
              <button type="button" aria-expanded={open} onClick={() => toggle(group.name)} className="flex w-full items-center gap-2 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? '' : '-rotate-90'}`} /><StatusIcon kind={group.icon} />{group.name}<span className="text-xs text-zinc-400">{group.issues.length}</span>
              </button>
            </h3>
            {open && (
              <ul>
                {group.issues.map(([id, title, priority, label]) => (
                  <li key={id} className="flex items-center gap-3 border-t border-zinc-100 px-4 py-2.5 text-sm hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/60">
                    <span aria-label={`Priority ${priority} of 3`} className="flex h-3 items-end gap-0.5">{[1, 2, 3].map((bar) => <span key={bar} className={`w-[3px] rounded-sm ${bar <= priority ? 'bg-zinc-600 dark:bg-zinc-300' : 'bg-zinc-200 dark:bg-zinc-700'}`} style={{ height: `${bar * 4}px` }} />)}</span>
                    <span className="w-16 shrink-0 font-mono text-xs">{id}</span>
                    <StatusIcon kind={group.icon} />
                    <span className="min-w-0 flex-1 truncate text-zinc-900 dark:text-white">{title}</span>
                    <span className="hidden rounded-full border border-zinc-200 px-2 py-0.5 text-[11px] sm:inline dark:border-zinc-700">{label}</span>
                    <span className="grid size-6 place-items-center rounded-full bg-zinc-200 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">LM</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
