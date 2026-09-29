/**
 * @registry
 * name: Bug Triage Board
 * category: Boards
 * style: Dark
 * tags: recent
 * description: Tableau de tri des bugs par severite, avec environnement, nombre d utilisateurs touches et filtre.
 * prompt: Create a bug triage board: severity columns (Critical rose, Major amber, Minor zinc) with colored headers, bug cards showing ID, title, environment badge and "affects N users"; a toggle filter "Only production" hides other environments. Horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { Bug } from 'lucide-react';
import { useState } from 'react';

const severities = [
  { name: 'Critical', tone: 'bg-rose-500' },
  { name: 'Major', tone: 'bg-amber-500' },
  { name: 'Minor', tone: 'bg-zinc-400' },
];
const bugs = [
  { id: 'BUG-88', title: 'Checkout crashes on Safari 17', severity: 'Critical', env: 'production', users: 412 },
  { id: 'BUG-91', title: 'Avatar upload stuck at 99%', severity: 'Major', env: 'production', users: 57 },
  { id: 'BUG-93', title: 'Tooltip overlaps modal', severity: 'Minor', env: 'staging', users: 0 },
  { id: 'BUG-95', title: 'Wrong currency in emails', severity: 'Major', env: 'staging', users: 0 },
];

export function BugTriageBoard() {
  const [prodOnly, setProdOnly] = useState(false);
  const visible = bugs.filter((bug) => !prodOnly || bug.env === 'production');

  return (
    <div className="w-full max-w-3xl">
      <label className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={prodOnly} onChange={(event) => setProdOnly(event.target.checked)} className="accent-rose-600" /> Only production</label>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {severities.map((severity) => {
          const list = visible.filter((bug) => bug.severity === severity.name);
          return (
            <section key={severity.name} aria-label={severity.name} className="w-56 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 sm:flex-1 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className={`flex justify-between px-3 py-2 text-sm font-semibold text-white ${severity.tone}`}>{severity.name}<span>{list.length}</span></h3>
              <ul className="space-y-2 p-2">
                {list.map((bug) => (
                  <li key={bug.id} className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                    <p className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500"><Bug aria-hidden className="size-3" />{bug.id}</p>
                    <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">{bug.title}</p>
                    <p className="mt-2 flex items-center justify-between text-[11px]">
                      <span className={`rounded px-1.5 py-0.5 font-medium ${bug.env === 'production' ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400' : 'bg-sky-500/10 text-sky-700 dark:text-sky-400'}`}>{bug.env}</span>
                      <span className="text-zinc-500 dark:text-zinc-400">{bug.users ? `affects ${bug.users} users` : 'internal'}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
