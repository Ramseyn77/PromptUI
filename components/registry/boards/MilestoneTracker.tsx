/**
 * @registry
 * name: Milestone Tracker
 * category: Boards
 * style: SaaS
 * tags: recent
 * description: Suivi des jalons de version avec tickets ouverts et fermes, date cible et etat.
 * prompt: Create a release milestones list: each milestone shows version name, target date, a split bar of closed vs open issues with counts, percent complete and a state badge (Released, In progress, Planned). The released one is muted. Light and dark mode.
 */
const milestones = [
  { name: 'v2.3 · Themes', date: 'Sep 12', closed: 42, open: 0, state: 'Released' },
  { name: 'v2.4 · Collaboration', date: 'Oct 20', closed: 27, open: 13, state: 'In progress' },
  { name: 'v2.5 · Offline', date: 'Dec 01', closed: 3, open: 24, state: 'Planned' },
];
const badge: Record<string, string> = {
  Released: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  'In progress': 'bg-teal-500/10 text-teal-700 dark:text-teal-400',
  Planned: 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
};

export function MilestoneTracker() {
  return (
    <ul className="w-full max-w-xl divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
      {milestones.map((milestone) => {
        const total = milestone.closed + milestone.open;
        const percent = Math.round((milestone.closed / total) * 100);
        return (
          <li key={milestone.name} className={`p-4 ${milestone.state === 'Released' ? 'opacity-70' : ''}`}>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-zinc-900 dark:text-white">{milestone.name}</p>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${badge[milestone.state]}`}>{milestone.state}</span>
              <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">Due {milestone.date}</span>
            </div>
            <div aria-hidden className="mt-3 flex h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"><span className="bg-teal-500" style={{ width: `${percent}%` }} /></div>
            <p className="mt-2 flex justify-between text-xs text-zinc-500 dark:text-zinc-400"><span>{milestone.closed} closed · {milestone.open} open</span><span className="font-semibold text-zinc-900 dark:text-white">{percent}%</span></p>
          </li>
        );
      })}
    </ul>
  );
}
