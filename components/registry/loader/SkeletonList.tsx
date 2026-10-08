/**
 * @registry
 * name: Skeleton List
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Liste squelette qui pulse puis révèle le vrai contenu après le chargement simulé.
 * prompt: Create a list that shows 4 pulsing skeleton rows (avatar circle, two text bars, trailing pill) with aria-busy, then after 2s swaps to real rows with a fade-in; a "Reload" button repeats it. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const people = [['Awa Diallo', 'Product designer'], ['Lucas Martin', 'Engineer'], ['Mei Chen', 'Data scientist'], ['Omar Haddad', 'Founder']];

export function SkeletonList() {
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 2000);
    return () => window.clearTimeout(timer);
  }, [run]);

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Team</h3><button type="button" onClick={() => setRun((value) => value + 1)} className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400">Reload</button></div>
      <ul aria-busy={loading} className="mt-3 space-y-3">
        {people.map(([name, role]) => (
          <li key={name} className="flex items-center gap-3">
            {loading ? (
              <>
                <span className="size-9 rounded-full bg-zinc-200 motion-safe:animate-pulse dark:bg-zinc-800" />
                <span className="flex-1 space-y-1.5"><span className="block h-3 w-1/2 rounded bg-zinc-200 motion-safe:animate-pulse dark:bg-zinc-800" /><span className="block h-2.5 w-1/3 rounded bg-zinc-200 motion-safe:animate-pulse dark:bg-zinc-800" /></span>
                <span className="h-5 w-12 rounded-full bg-zinc-200 motion-safe:animate-pulse dark:bg-zinc-800" />
              </>
            ) : (
              <>
                <span className="grid size-9 place-items-center rounded-full bg-teal-500/15 text-xs font-bold text-teal-700 dark:text-teal-300">{name[0]}</span>
                <span className="flex-1"><span className="block text-sm font-medium text-zinc-900 dark:text-white">{name}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">{role}</span></span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">Online</span>
              </>
            )}
          </li>
        ))}
      </ul>
      {loading && <span className="sr-only" role="status">Loading team</span>}
    </section>
  );
}
