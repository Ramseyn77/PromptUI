/**
 * @registry
 * name: Nested Header Table
 * category: Tables
 * style: Editorial
 * tags: recent
 * description: Tableau statistique à en-têtes groupés sur deux niveaux (colspan / scope), sous-totaux et meilleure valeur par colonne mise en avant.
 * prompt: Create a table with grouped two-level headers: a top header row with "Team", "Attack" (colspan 3: Goals, Shots, xG) and "Defence" (colspan 2: Tackles, Clean sheets) using scope="colgroup" and a second row of column headers with scope="col"; six team rows, the best value of each column highlighted bold with a small marker; a totals row in tfoot; serif headings, thin rules, horizontal scroll on small screens. Light (paper) and dark mode.
 */
const teams = [['Lions', 42, 310, 38.4, 512, 11], ['Falcons', 37, 288, 35.1, 545, 9], ['Hornets', 45, 334, 41.0, 470, 7], ['Rovers', 29, 251, 28.7, 498, 12], ['Sparks', 33, 276, 31.9, 530, 8], ['Tides', 38, 301, 36.2, 489, 10]] as const;
const best = [1, 2, 3, 4, 5].map((col) => Math.max(...teams.map((team) => team[col] as number)));

export function NestedHeaderTable() {
  return (
    <div className="w-full max-w-2xl overflow-x-auto rounded-2xl bg-[#faf7f0] p-5 dark:bg-zinc-950" data-lenis-prevent>
      <table className="w-full min-w-[32rem] text-sm">
        <caption className="mb-3 text-left font-serif text-xl text-zinc-950 dark:text-white">Season 2026 · team stats</caption>
        <thead>
          <tr className="font-serif text-zinc-950 dark:text-white">
            <th scope="col" rowSpan={2} className="border-b-2 border-zinc-900 pb-2 text-left align-bottom dark:border-zinc-100">Team</th>
            <th scope="colgroup" colSpan={3} className="border-b border-zinc-900/30 pb-1 text-center dark:border-white/30">Attack</th>
            <th scope="colgroup" colSpan={2} className="border-b border-zinc-900/30 pb-1 text-center dark:border-white/30">Defence</th>
          </tr>
          <tr className="text-xs uppercase tracking-wider text-zinc-500">
            {['Goals', 'Shots', 'xG', 'Tackles', 'Clean sheets'].map((label) => <th key={label} scope="col" className="border-b-2 border-zinc-900 px-2 pb-2 pt-1.5 text-right font-medium dark:border-zinc-100">{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {teams.map(([name, ...values]) => (
            <tr key={name} className="border-b border-zinc-900/10 dark:border-white/10">
              <th scope="row" className="py-2.5 text-left font-medium text-zinc-900 dark:text-zinc-100">{name}</th>
              {values.map((value, index) => <td key={index} className={`px-2 text-right tabular-nums ${value === best[index] ? 'font-bold text-zinc-950 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{value === best[index] && <span aria-hidden className="mr-1 text-amber-500">●</span>}{typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(1) : value}{value === best[index] && <span className="sr-only"> (best)</span>}</td>)}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-zinc-950 dark:text-white"><th scope="row" className="pt-3 text-left">Total</th>{[1, 2, 3, 4, 5].map((col) => { const sum = teams.reduce((acc, team) => acc + (team[col] as number), 0); return <td key={col} className="px-2 pt-3 text-right tabular-nums">{Number.isInteger(sum) ? sum : sum.toFixed(1)}</td>; })}</tr>
        </tfoot>
      </table>
    </div>
  );
}
