/**
 * @registry
 * name: Column Filters Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Tableau avec filtres par colonne sous l'en-tête : texte, liste de valeurs, plage numérique et date, puces de filtres actifs et réinitialisation.
 * prompt: Create a table with per-column filters in a second header row: a text contains filter for Name, a select for Department, min/max number inputs for Salary and a date "from" input for Start date; rows filter live; active filters appear as removable chips above the table with a "Clear all" button; the result count is announced via aria-live; empty state row; horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { X } from 'lucide-react';
import { useState } from 'react';

const people = [['Awa Diop', 'Design', 92000, '2022-03-01'], ['Leo Martin', 'Engineering', 118000, '2021-01-15'], ['Mei Tanaka', 'Operations', 84000, '2023-08-20'], ['Kofi Mensah', 'Sales', 97000, '2020-11-02'], ['Inès Romero', 'Sales', 126000, '2019-06-10'], ['Noah Kim', 'Engineering', 104000, '2024-02-05'], ['Zoe Laurent', 'Design', 88000, '2024-09-12']] as const;
const blank = { name: '', dept: 'All', min: '', max: '', from: '' };

export function ColumnFiltersTable() {
  const [filters, setFilters] = useState(blank);
  const set = (key: keyof typeof blank, value: string) => setFilters({ ...filters, [key]: value });
  const rows = people.filter(([name, dept, salary, start]) => name.toLowerCase().includes(filters.name.toLowerCase()) && (filters.dept === 'All' || dept === filters.dept) && (!filters.min || salary >= Number(filters.min)) && (!filters.max || salary <= Number(filters.max)) && (!filters.from || start >= filters.from));
  const chips = [filters.name && ['name', `Name contains “${filters.name}”`], filters.dept !== 'All' && ['dept', filters.dept], filters.min && ['min', `≥ $${Number(filters.min).toLocaleString('en-US')}`], filters.max && ['max', `≤ $${Number(filters.max).toLocaleString('en-US')}`], filters.from && ['from', `From ${filters.from}`]].filter(Boolean) as [keyof typeof blank, string][];
  const input = 'w-full rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-normal text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100';

  return (
    <div className="w-full max-w-3xl rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex min-h-[3rem] flex-wrap items-center gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
        <p aria-live="polite" className="text-sm font-semibold text-zinc-950 dark:text-white">{rows.length} of {people.length}</p>
        {chips.map(([key, label]) => <span key={key} className="flex items-center gap-1 rounded-full bg-indigo-50 py-0.5 pl-2.5 pr-0.5 text-xs text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-200">{label}<button type="button" aria-label={`Remove filter ${label}`} onClick={() => set(key, blank[key])} className="grid size-5 place-items-center rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20"><X aria-hidden className="size-3" /></button></span>)}
        {chips.length > 0 && <button type="button" onClick={() => setFilters(blank)} className="ml-auto text-xs text-zinc-500 underline">Clear all</button>}
      </div>
      <div className="overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[36rem] text-sm">
          <thead className="text-left text-xs text-zinc-500">
            <tr><th className="px-4 pt-2.5 font-medium">Name</th><th className="px-2 pt-2.5 font-medium">Department</th><th className="px-2 pt-2.5 font-medium">Salary</th><th className="px-4 pt-2.5 font-medium">Start date</th></tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-4 pb-2.5 pt-1"><input aria-label="Filter by name" value={filters.name} onChange={(event) => set('name', event.target.value)} placeholder="Contains…" className={input} /></th>
              <th className="px-2 pb-2.5 pt-1"><select aria-label="Filter by department" value={filters.dept} onChange={(event) => set('dept', event.target.value)} className={input}>{['All', 'Design', 'Engineering', 'Operations', 'Sales'].map((dept) => <option key={dept}>{dept}</option>)}</select></th>
              <th className="px-2 pb-2.5 pt-1"><div className="flex gap-1"><input aria-label="Minimum salary" type="number" step={1000} value={filters.min} onChange={(event) => set('min', event.target.value)} placeholder="Min" className={input} /><input aria-label="Maximum salary" type="number" step={1000} value={filters.max} onChange={(event) => set('max', event.target.value)} placeholder="Max" className={input} /></div></th>
              <th className="px-4 pb-2.5 pt-1"><input aria-label="Started on or after" type="date" value={filters.from} onChange={(event) => set('from', event.target.value)} className={`${input} dark:[color-scheme:dark]`} /></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, dept, salary, start]) => <tr key={name} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900"><td className="px-4 py-2.5 font-medium text-zinc-950 dark:text-white">{name}</td><td className="px-2 text-zinc-600 dark:text-zinc-400">{dept}</td><td className="px-2 tabular-nums text-zinc-900 dark:text-zinc-100">${salary.toLocaleString('en-US')}</td><td className="px-4 tabular-nums text-zinc-600 dark:text-zinc-400">{start}</td></tr>)}
            {!rows.length && <tr><td colSpan={4} className="py-10 text-center text-sm text-zinc-500">No one matches these filters.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
