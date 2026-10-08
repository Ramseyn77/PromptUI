/**
 * @registry
 * name: Heatmap Table
 * category: Tables
 * style: Gradient
 * tags: recent
 * description: Tableau de rétention en carte de chaleur, l'intensité de couleur suit la valeur de chaque cellule.
 * prompt: Create a cohort retention heatmap table: cohorts as rows, weeks as columns, each cell showing a percentage with background opacity proportional to the value (teal), text switching to white on strong cells; empty future cells stay blank. Legend below. Light and dark mode.
 */
const cohorts = [
  ['Jan', [100, 62, 48, 41, 38]],
  ['Feb', [100, 58, 45, 39]],
  ['Mar', [100, 66, 52]],
  ['Apr', [100, 71]],
] as const;

export function HeatmapTable() {
  return (
    <div className="w-full max-w-lg overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[380px] border-separate border-spacing-1 text-center text-xs">
        <caption className="pb-2 text-left text-sm font-semibold text-zinc-900 dark:text-white">Weekly retention</caption>
        <thead><tr><th className="text-left font-medium text-zinc-500">Cohort</th>{[0, 1, 2, 3, 4].map((week) => <th key={week} className="font-medium text-zinc-500">W{week}</th>)}</tr></thead>
        <tbody>
          {cohorts.map(([month, values]) => (
            <tr key={month}>
              <th scope="row" className="text-left font-medium text-zinc-700 dark:text-zinc-300">{month}</th>
              {[0, 1, 2, 3, 4].map((week) => {
                const value = values[week];
                return (
                  <td key={week} className="h-9 rounded-md font-medium tabular-nums" style={value === undefined ? undefined : { background: `rgba(20, 184, 166, ${0.1 + (value / 100) * 0.85})` }}>
                    {value === undefined ? '' : <span className={value > 55 ? 'text-white' : 'text-teal-950 dark:text-teal-50'}>{value}%</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div aria-hidden className="mt-3 flex items-center gap-2 text-[11px] text-zinc-500"><span>0%</span><span className="h-2 flex-1 rounded-full bg-gradient-to-r from-teal-500/10 to-teal-500" /><span>100%</span></div>
    </div>
  );
}
