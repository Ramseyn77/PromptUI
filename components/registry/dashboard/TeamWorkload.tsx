/**
 * @registry
 * name: Team Workload
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Charge de travail de l'équipe en heures avec seuil de capacité et alerte de surcharge.
 * prompt: Create a team workload widget: each member row has avatar initials, name, a bar of assigned hours vs a 40h capacity marker line; bars over capacity turn rose with an "Over capacity" label, under 50% show "Available". Light and dark mode.
 */
const members = [
  { name: 'Léa M.', hours: 46 },
  { name: 'Noah K.', hours: 34 },
  { name: 'Inès B.', hours: 18 },
  { name: 'Tom W.', hours: 39 },
];
const capacity = 40;
const scale = 50;

export function TeamWorkload() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Workload this week</h3>
      <ul className="mt-4 space-y-4">
        {members.map((member, index) => {
          const over = member.hours > capacity;
          const free = member.hours < capacity / 2;
          return (
            <li key={member.name} className="flex items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: `hsl(${index * 75 + 190} 50% 50%)` }}>{member.name.slice(0, 2)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-800 dark:text-zinc-200">{member.name}</span>
                  <span className={`text-xs font-medium ${over ? 'text-rose-600 dark:text-rose-400' : free ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-400'}`}>{member.hours}h {over ? '· Over capacity' : free ? '· Available' : ''}</span>
                </div>
                <div className="relative mt-1.5 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className={`h-full rounded-full ${over ? 'bg-rose-500' : 'bg-teal-500'}`} style={{ width: `${Math.min(member.hours / scale, 1) * 100}%` }} />
                  <span aria-hidden className="absolute -top-1 h-4 w-0.5 rounded bg-zinc-900 dark:bg-white" style={{ left: `${(capacity / scale) * 100}%` }} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">Marker = {capacity}h weekly capacity</p>
    </section>
  );
}
