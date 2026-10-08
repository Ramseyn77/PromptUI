/**
 * @registry
 * name: Deployments Widget
 * category: Dashboard
 * style: Dark
 * tags: recent
 * description: Liste des déploiements récents avec statut (en cours, prêt, échec), branche, commit, durée et bouton de rollback.
 * prompt: Create a deployments widget on a dark panel: rows with status dot (Building pulsing amber that becomes Ready after a few seconds, Ready emerald, Error rose), environment badge (Production / Preview), branch and short commit hash in mono, author avatar, relative time and duration; a "Promote" or "Rollback" menu button per row; header with "Redeploy" action. Dark in both themes.
 */
'use client';
import { GitBranch, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const initial = [
  { id: 'dpl_8f2', env: 'Production', branch: 'main', commit: 'a1c9e3f', status: 'building', time: 'just now', duration: '—' },
  { id: 'dpl_8e9', env: 'Preview', branch: 'feat/checkout', commit: '7d02b11', status: 'ready', time: '12m ago', duration: '48s' },
  { id: 'dpl_8e1', env: 'Preview', branch: 'fix/safari', commit: 'c44f8aa', status: 'error', time: '1h ago', duration: '21s' },
  { id: 'dpl_8d7', env: 'Production', branch: 'main', commit: '19be2c0', status: 'ready', time: 'yesterday', duration: '52s' },
];
const dot = { building: 'bg-amber-400 animate-pulse', ready: 'bg-emerald-400', error: 'bg-rose-500' } as const;

export function DeploymentsWidget() {
  const [rows, setRows] = useState(initial);

  useEffect(() => {
    const timer = window.setTimeout(() => setRows((list) => list.map((row, index) => (index === 0 ? { ...row, status: 'ready', duration: '46s' } : row))), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="w-full max-w-lg rounded-2xl bg-zinc-950 p-4 text-zinc-200 ring-1 ring-white/10">
      <div className="flex items-center justify-between"><h3 className="font-semibold text-white">Deployments</h3><button type="button" className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-zinc-950"><RotateCcw aria-hidden className="size-3.5" />Redeploy</button></div>
      <ul aria-live="polite" className="mt-3 divide-y divide-white/5">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-sm">
            <span className={`size-2 shrink-0 rounded-full ${dot[row.status as keyof typeof dot]}`}><span className="sr-only">{row.status}</span></span>
            <span className={`rounded px-1.5 text-[10px] font-semibold ${row.env === 'Production' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-zinc-300'}`}>{row.env}</span>
            <span className="flex min-w-0 items-center gap-1 text-zinc-300"><GitBranch aria-hidden className="size-3.5 text-zinc-500" /><span className="truncate">{row.branch}</span></span>
            <code className="font-mono text-xs text-zinc-500">{row.commit}</code>
            <span className="ml-auto text-xs text-zinc-500">{row.time} · {row.duration}</span>
            <button type="button" className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-300 hover:bg-white/5">{row.env === 'Production' ? 'Rollback' : 'Promote'}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
