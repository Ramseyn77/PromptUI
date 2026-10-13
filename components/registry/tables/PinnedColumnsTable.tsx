/**
 * @registry
 * name: Pinned Columns Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Tableau large défilant horizontalement avec première colonne et colonne d'actions figées, ombres de bord qui apparaissent au défilement.
 * prompt: Create a wide table with pinned columns: the first column (Employee with avatar initials) is sticky on the left and the last column (Actions) is sticky on the right, while 8 middle columns (Department, Location, Start date, Salary, Manager, Level, Status, Email) scroll horizontally in a container (data-lenis-prevent); edge shadows on the pinned columns appear only when content is scrolled underneath (tracked via scrollLeft); a toggle unpins the first column. Light and dark mode.
 */
'use client';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const people = [
  ['Awa Diop', 'Design', 'Dakar', 'Mar 2022', '$92k', 'Leo M.', 'L4', 'Active', 'awa@kora.io'],
  ['Leo Martin', 'Engineering', 'Paris', 'Jan 2021', '$118k', 'Sam O.', 'L5', 'Active', 'leo@kora.io'],
  ['Mei Tanaka', 'Operations', 'Tokyo', 'Aug 2023', '$84k', 'Leo M.', 'L3', 'On leave', 'mei@kora.io'],
  ['Kofi Mensah', 'Sales', 'Accra', 'Nov 2020', '$97k', 'Ines R.', 'L4', 'Active', 'kofi@kora.io'],
  ['Ines Romero', 'Sales', 'Madrid', 'Jun 2019', '$126k', 'Sam O.', 'L6', 'Active', 'ines@kora.io'],
];
const headers = ['Department', 'Location', 'Start date', 'Salary', 'Manager', 'Level', 'Status', 'Email'];

export function PinnedColumnsTable() {
  const [scroll, setScroll] = useState({ left: 0, right: 1 });
  const [pinned, setPinned] = useState(true);
  const leftShadow = pinned && scroll.left > 0 ? 'shadow-[6px_0_8px_-6px_rgba(0,0,0,0.25)]' : '';
  const rightShadow = scroll.right > 1 ? 'shadow-[-6px_0_8px_-6px_rgba(0,0,0,0.25)]' : '';
  const first = `${pinned ? 'sticky left-0 z-10' : ''} bg-white dark:bg-zinc-950 ${leftShadow}`;
  const last = `sticky right-0 z-10 bg-white dark:bg-zinc-950 ${rightShadow}`;

  return (
    <div className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2.5 dark:border-zinc-800"><p className="text-sm font-semibold text-zinc-950 dark:text-white">Team directory</p><label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400"><input type="checkbox" checked={pinned} onChange={(event) => setPinned(event.target.checked)} className="accent-indigo-600" />Pin first column</label></div>
      <div className="overflow-x-auto" onScroll={(event) => { const node = event.currentTarget; setScroll({ left: node.scrollLeft, right: node.scrollWidth - node.clientWidth - node.scrollLeft }); }} data-lenis-prevent>
        <table className="w-max min-w-full text-sm">
          <thead className="text-left text-xs text-zinc-500">
            <tr className="border-b border-zinc-200 dark:border-zinc-800"><th className={`${first} px-4 py-2.5 font-medium`}>Employee</th>{headers.map((header) => <th key={header} className="whitespace-nowrap px-4 py-2.5 font-medium">{header}</th>)}<th className={`${last} px-3 py-2.5`}><span className="sr-only">Actions</span></th></tr>
          </thead>
          <tbody>
            {people.map(([name, ...cells]) => (
              <tr key={name} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                <th scope="row" className={`${first} whitespace-nowrap px-4 py-2.5 text-left font-medium text-zinc-950 dark:text-white`}><span className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">{name.split(' ').map((part) => part[0]).join('')}</span>{name}</span></th>
                {cells.map((value, index) => <td key={headers[index]} className={`whitespace-nowrap px-4 py-2.5 ${headers[index] === 'Salary' ? 'tabular-nums' : ''} ${headers[index] === 'Status' ? (value === 'Active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400') : 'text-zinc-700 dark:text-zinc-300'}`}>{value}</td>)}
                <td className={`${last} px-3 py-2.5`}><button type="button" aria-label={`Actions for ${name}`} className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><MoreHorizontal aria-hidden className="size-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
