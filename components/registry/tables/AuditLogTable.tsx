/**
 * @registry
 * name: Audit Log Table
 * category: Tables
 * style: Minimal
 * tags: recent
 * description: Journal d'audit avec filtre par type d'action, lignes dépliables montrant le détail JSON avant / après.
 * prompt: Create an audit log table: columns time, actor (avatar initials), action badge (created/updated/deleted colored), target and IP; an action filter select; each row has an expand button revealing a details row with a before/after diff of changed fields (removed in rose, added in emerald, mono font). Horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { ChevronRight } from 'lucide-react';
import { Fragment, useState } from 'react';

const logs = [
  { id: 1, time: '14:02', actor: 'AN', action: 'updated', target: 'Billing plan', ip: '41.82.10.4', diff: [['plan', 'Pro', 'Business'], ['seats', '12', '20']] },
  { id: 2, time: '13:47', actor: 'LK', action: 'created', target: 'API key “CI runner”', ip: '102.16.4.1', diff: [['scope', '', 'read:projects']] },
  { id: 3, time: '12:15', actor: 'AN', action: 'deleted', target: 'Webhook #4', ip: '41.82.10.4', diff: [['url', 'https://hooks.acme.dev/x', '']] },
  { id: 4, time: '09:30', actor: 'MS', action: 'updated', target: 'Member role', ip: '196.1.95.3', diff: [['role', 'Viewer', 'Editor']] },
];
const badge = { created: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300', updated: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300', deleted: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300' } as const;

export function AuditLogTable() {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState<number[]>([1]);
  const shown = logs.filter((log) => filter === 'all' || log.action === filter);

  return (
    <div className="w-full max-w-2xl">
      <label className="mb-2 flex items-center justify-end gap-2 text-xs text-zinc-500">Action
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"><option value="all">All</option><option value="created">Created</option><option value="updated">Updated</option><option value="deleted">Deleted</option></select>
      </label>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
        <table className="w-full min-w-[34rem] text-sm">
          <thead className="border-b border-zinc-200 text-left text-xs text-zinc-500 dark:border-zinc-800"><tr><th className="w-8" /><th className="py-2 font-medium">Time</th><th className="font-medium">Actor</th><th className="font-medium">Action</th><th className="font-medium">Target</th><th className="pr-3 font-medium">IP</th></tr></thead>
          <tbody>
            {shown.map((log) => {
              const expanded = open.includes(log.id);
              return (
                <Fragment key={log.id}>
                  <tr className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="pl-2"><button type="button" aria-expanded={expanded} aria-label={`Details for ${log.target}`} onClick={() => setOpen((list) => (expanded ? list.filter((id) => id !== log.id) : [...list, log.id]))} className="grid size-6 place-items-center rounded text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"><ChevronRight aria-hidden className={`size-4 transition-transform ${expanded ? 'rotate-90' : ''}`} /></button></td>
                    <td className="py-2 font-mono text-xs text-zinc-500">{log.time}</td>
                    <td><span className="grid size-6 place-items-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{log.actor}</span></td>
                    <td><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge[log.action as keyof typeof badge]}`}>{log.action}</span></td>
                    <td className="text-zinc-800 dark:text-zinc-200">{log.target}</td>
                    <td className="pr-3 font-mono text-xs text-zinc-500">{log.ip}</td>
                  </tr>
                  {expanded && (
                    <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/50">
                      <td />
                      <td colSpan={5} className="py-2 pr-3">
                        <pre className="font-mono text-xs leading-5">{log.diff.map(([field, before, after]) => <span key={field} className="block">{before && <span className="block text-rose-700 dark:text-rose-300">- {field}: {before}</span>}{after && <span className="block text-emerald-700 dark:text-emerald-300">+ {field}: {after}</span>}</span>)}</pre>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
