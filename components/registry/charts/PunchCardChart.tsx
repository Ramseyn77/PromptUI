/**
 * @registry
 * name: Punch Card Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Carte perforée jour × heure dont la taille des points montre quand l'équipe pousse le plus de commits.
 * prompt: Create a GitHub-style punch card chart: 7 day rows × 12 two-hour columns of circles whose radius scales with commit count (deterministic data), axis labels for days and hours, the busiest cell highlighted in teal with a caption "Busiest: Tue 10:00–12:00", hover shows count via title. sr-only summary. Light and dark mode.
 */
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const counts = days.map((_, d) => Array.from({ length: 12 }, (__, h) => {
  const work = d < 5 && h >= 4 && h <= 9 ? 1 : 0.25;
  return Math.round((Math.sin(d * 1.7 + h * 0.9) + 1.4) * 9 * work + (d === 1 && h === 5 ? 18 : 0));
}));
const max = Math.max(...counts.flat());

export function PunchCardChart() {
  return (
    <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Commit activity</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">Busiest: Tue 10:00–12:00</p>
      <div className="mt-4 grid grid-cols-[2.5rem_repeat(12,minmax(0,1fr))] items-center gap-y-1">
        {days.map((day, d) => (
          <div key={day} className="contents">
            <span className="text-xs text-zinc-500">{day}</span>
            {counts[d].map((count, h) => (
              <span key={h} className="grid h-6 place-items-center" title={`${day} ${h * 2}:00 — ${count} commits`}>
                <span className={`rounded-full ${count === max ? 'bg-teal-500' : 'bg-zinc-800 dark:bg-zinc-300'}`} style={{ width: 4 + (count / max) * 16, height: 4 + (count / max) * 16, opacity: count === max ? 1 : 0.25 + (count / max) * 0.6 }} />
              </span>
            ))}
          </div>
        ))}
        <span />
        {Array.from({ length: 12 }, (_, h) => <span key={h} className="text-center text-[9px] text-zinc-400">{h % 2 === 0 ? `${h * 2}h` : ''}</span>)}
      </div>
      <p className="sr-only">Commits concentrate on weekdays between 8:00 and 20:00, peaking on Tuesday between 10:00 and 12:00.</p>
    </section>
  );
}
