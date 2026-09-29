/**
 * @registry
 * name: Swimlane Board
 * category: Boards
 * style: SaaS
 * tags: recent
 * description: Tableau en couloirs par equipe, colonnes de statut communes et compteurs par couloir.
 * prompt: Create a swimlane board: rows per team (Web, Mobile) with a sticky team label on the left and a count, columns Todo / Doing / Done shared across lanes, small task chips in each cell, empty cells showing a faint dash. Horizontal scroll on mobile. Light and dark mode.
 */
const columns = ['Todo', 'Doing', 'Done'];
const lanes = [
  { team: 'Web', color: 'bg-teal-500', cells: [['SEO audit', 'Blog layout'], ['Checkout'], ['Dark mode', 'Footer']] },
  { team: 'Mobile', color: 'bg-violet-500', cells: [['Push opt-in'], [], ['Login', 'Onboarding', 'Crash fix']] },
];

export function SwimlaneBoard() {
  return (
    <div className="w-full max-w-3xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead><tr><th className="w-28" />{columns.map((column) => <th key={column} className="border-b border-zinc-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">{column}</th>)}</tr></thead>
        <tbody>
          {lanes.map((lane) => (
            <tr key={lane.team} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
              <th scope="row" className="sticky left-0 bg-white px-3 py-3 text-left align-top dark:bg-zinc-950">
                <span className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white"><span className={`size-2 rounded-full ${lane.color}`} />{lane.team}</span>
                <span className="text-xs font-normal text-zinc-500">{lane.cells.flat().length} tasks</span>
              </th>
              {lane.cells.map((tasks, index) => (
                <td key={columns[index]} className="border-l border-zinc-100 px-2 py-2 align-top dark:border-zinc-900">
                  <ul className="space-y-1.5">
                    {tasks.map((task) => <li key={task} className="rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">{task}</li>)}
                    {!tasks.length && <li className="px-2.5 py-1.5 text-xs text-zinc-300 dark:text-zinc-700" aria-label="No tasks">—</li>}
                  </ul>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
