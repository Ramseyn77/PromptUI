/**
 * @registry
 * name: Content Calendar
 * category: Boards
 * style: Gradient
 * tags: recent
 * description: Planning editorial de la semaine avec publications par reseau, statut et heure.
 * prompt: Create a weekly content calendar board: 5 day columns (Mon–Fri) with post cards colored by channel (Blog teal, Newsletter violet, Social amber), time, title and a status dot (Draft, Scheduled, Published) with a legend. Horizontal scroll on mobile. Light and dark mode.
 */
const channels = { Blog: 'border-l-teal-500 bg-teal-500/5', Newsletter: 'border-l-violet-500 bg-violet-500/5', Social: 'border-l-amber-500 bg-amber-500/5' } as const;
const status = { Draft: 'bg-zinc-400', Scheduled: 'bg-sky-500', Published: 'bg-emerald-500' } as const;
const days: Array<[string, Array<[keyof typeof channels, string, string, keyof typeof status]>]> = [
  ['Mon', [['Blog', '09:00', 'Why we rebuilt our editor', 'Published']]],
  ['Tue', [['Social', '12:30', 'Launch teaser video', 'Scheduled'], ['Newsletter', '17:00', 'September recap', 'Scheduled']]],
  ['Wed', []],
  ['Thu', [['Blog', '10:00', 'Designing calm UIs', 'Draft']]],
  ['Fri', [['Social', '16:00', 'Behind the scenes', 'Draft']]],
];

export function ContentCalendar() {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map(([day, posts]) => (
          <section key={day} aria-label={day} className="min-h-44 w-40 shrink-0 rounded-2xl border border-zinc-200 bg-white p-2 lg:flex-1 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="px-1 pb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{day}</h3>
            <ul className="space-y-2">
              {posts.map(([channel, time, title, state]) => (
                <li key={title} className={`rounded-lg border-l-4 p-2 ${channels[channel]}`}>
                  <p className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">{time}<span className="inline-flex items-center gap-1"><span className={`size-1.5 rounded-full ${status[state]}`} />{state}</span></p>
                  <p className="mt-1 text-xs font-medium leading-4 text-zinc-900 dark:text-white">{title}</p>
                </li>
              ))}
              {!posts.length && <li className="rounded-lg border border-dashed border-zinc-200 py-6 text-center text-[11px] text-zinc-400 dark:border-zinc-800">No posts</li>}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">{Object.keys(channels).map((name) => <span key={name}>{name}</span>)}<span className="text-zinc-300 dark:text-zinc-700">|</span>{(Object.keys(status) as Array<keyof typeof status>).map((name) => <span key={name} className="inline-flex items-center gap-1"><span className={`size-1.5 rounded-full ${status[name]}`} />{name}</span>)}</div>
    </div>
  );
}
