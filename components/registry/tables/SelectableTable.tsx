/**
 * @registry
 * name: Selectable Table
 * category: Tables
 * style: SaaS
 * tags: featured, recent
 * description: Tableau avec sélection de lignes, case tout-sélectionner indéterminée et barre d'actions groupées.
 * prompt: Create a table with row checkboxes, a header "select all" checkbox that becomes indeterminate for partial selection, selected rows tinted, and a bulk-actions bar ("3 selected · Archive · Delete") that slides in when anything is selected. Light and dark mode.
 */
'use client';
import { Archive, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const people = [
  { id: 1, name: 'Awa Diallo', email: 'awa@lumen.io', role: 'Admin' },
  { id: 2, name: 'Lucas Martin', email: 'lucas@lumen.io', role: 'Editor' },
  { id: 3, name: 'Mei Chen', email: 'mei@lumen.io', role: 'Viewer' },
  { id: 4, name: 'Omar Haddad', email: 'omar@lumen.io', role: 'Editor' },
];

export function SelectableTable() {
  const [selected, setSelected] = useState<number[]>([2]);
  const allRef = useRef<HTMLInputElement>(null);
  const all = selected.length === people.length;

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = selected.length > 0 && !all;
  }, [selected, all]);

  const toggle = (id: number) => setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const checkbox = 'size-4 rounded border-zinc-300 accent-teal-600';

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className={`flex items-center gap-3 overflow-hidden bg-teal-600 px-4 text-sm text-white transition-all ${selected.length ? 'h-11' : 'h-0'}`}>
        <span className="font-medium">{selected.length} selected</span>
        <button type="button" className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-white/15"><Archive aria-hidden className="size-4" /> Archive</button>
        <button type="button" className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-white/15"><Trash2 aria-hidden className="size-4" /> Delete</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-left text-sm">
          <thead className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <tr>
              <th className="w-10 px-4 py-3"><input ref={allRef} type="checkbox" aria-label="Select all" checked={all} onChange={() => setSelected(all ? [] : people.map((person) => person.id))} className={checkbox} /></th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {people.map((person) => (
              <tr key={person.id} className={selected.includes(person.id) ? 'bg-teal-500/5' : ''}>
                <td className="px-4 py-3"><input type="checkbox" aria-label={`Select ${person.name}`} checked={selected.includes(person.id)} onChange={() => toggle(person.id)} className={checkbox} /></td>
                <td className="px-4 py-3"><p className="font-medium text-zinc-900 dark:text-white">{person.name}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{person.email}</p></td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{person.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
