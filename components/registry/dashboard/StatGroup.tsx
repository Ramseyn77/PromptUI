/**
 * @registry
 * name: Stat Group
 * category: Dashboard
 * style: Minimal
 * tags: featured, recent
 * description: Groupe de statistiques façon daisyUI stat : titre, valeur, description, icône et tendance, séparés par des filets.
 * prompt: Create a daisyUI "stats" group: three stats in one bordered container separated by dividers (vertical on mobile stacking, horizontal from md): each with title, big value, description and a tinted icon; one stat has an avatar with online dot and "tasks done" progress, trends colored up/down. Light and dark mode.
 */
import { Download, TrendingDown, TrendingUp, Users } from 'lucide-react';

export function StatGroup() {
  return (
    <div className="grid w-full max-w-3xl divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between p-5">
        <div><p className="text-sm text-zinc-500">Downloads</p><p className="mt-1 text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">31K</p><p className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400"><TrendingUp aria-hidden className="size-3.5" />21% more than last month</p></div>
        <span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400"><Download aria-hidden className="size-5" /></span>
      </div>
      <div className="flex items-start justify-between p-5">
        <div><p className="text-sm text-zinc-500">New users</p><p className="mt-1 text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">4,200</p><p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400"><TrendingDown aria-hidden className="size-3.5" />3% less than last month</p></div>
        <span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400"><Users aria-hidden className="size-5" /></span>
      </div>
      <div className="flex items-center gap-4 p-5">
        <span className="relative shrink-0"><span aria-hidden className="block size-12 rounded-full bg-gradient-to-br from-amber-300 to-rose-500" /><span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950"><span className="sr-only">Online</span></span></span>
        <div className="min-w-0 flex-1"><p className="text-sm text-zinc-500">Tasks done</p><p className="mt-1 text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">86%</p><div className="mt-2 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full w-[86%] rounded-full bg-amber-500" /></div></div>
      </div>
    </div>
  );
}
