/**
 * @registry
 * name: Skeleton Table Loader
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Squelette de tableau avec en-têtes, avatars et largeurs variées, effet shimmer et bascule vers les vraies données.
 * prompt: Create a table skeleton loader: header row and 5 placeholder rows with avatar circle, name and email bars of varying deterministic widths, status pill and amount bar, all with a sweeping shimmer gradient (static with reduced motion); aria-busy on the table region with an sr-only "Loading customers"; a "Simulate load" button toggles between skeleton and real rows. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const customers = [['Ava Chen', 'ava@kora.io', 'Active', '$1,240'], ['Leo Martin', 'leo@north.co', 'Trial', '$0'], ['Maya Patel', 'maya@lumen.dev', 'Active', '$860'], ['Noah Kim', 'noah@arc.so', 'Churned', '$320'], ['Zoe Laurent', 'zoe@atelier.fr', 'Active', '$2,100']];

export function SkeletonTableLoader() {
  const [loading, setLoading] = useState(true);
  const bar = 'relative overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800 after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent motion-safe:after:animate-[pui-skel-sweep_1.4s_infinite] dark:after:via-white/10';

  return (
    <div className="w-full max-w-xl">
      <style>{`@keyframes pui-skel-sweep { to { transform: translateX(100%) } }`}</style>
      <div className="mb-3 flex justify-end"><button type="button" onClick={() => setLoading(!loading)} className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900">{loading ? 'Show data' : 'Simulate load'}</button></div>
      <div aria-busy={loading} className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
        {loading && <span className="sr-only" role="status">Loading customers</span>}
        <table className="w-full min-w-[28rem] text-sm">
          <thead className="text-left text-xs text-zinc-500"><tr className="border-b border-zinc-200 dark:border-zinc-800"><th className="px-4 py-2.5 font-medium">Customer</th><th className="font-medium">Status</th><th className="px-4 text-right font-medium">MRR</th></tr></thead>
          <tbody>
            {customers.map(([name, email, status, amount], index) => (
              <tr key={name} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                <td className="px-4 py-3">
                  {loading ? <div className="flex items-center gap-3"><span className={`${bar} size-8 shrink-0 !rounded-full`} /><div className="space-y-1.5"><span className={`${bar} block h-2.5`} style={{ width: 70 + ((index * 23) % 50) }} /><span className={`${bar} block h-2`} style={{ width: 100 + ((index * 31) % 40) }} /></div></div>
                    : <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">{name.split(' ').map((part) => part[0]).join('')}</span><div><p className="font-medium text-zinc-900 dark:text-zinc-100">{name}</p><p className="text-xs text-zinc-500">{email}</p></div></div>}
                </td>
                <td>{loading ? <span className={`${bar} block h-5 w-14 !rounded-full`} /> : <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : status === 'Trial' ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>{status}</span>}</td>
                <td className="px-4 text-right">{loading ? <span className={`${bar} ml-auto block h-2.5 w-12`} /> : <span className="tabular-nums text-zinc-900 dark:text-zinc-100">{amount}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
