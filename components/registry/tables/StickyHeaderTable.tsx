/**
 * @registry
 * name: Sticky Header Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Tableau a hauteur fixe dont l en-tete et la premiere colonne restent visibles au defilement.
 * prompt: Create a scrollable table in a fixed-height container where the header row is sticky (top-0) and the first column is sticky (left-0), both with opaque backgrounds and subtle shadows, over a 12-row by 6-month dataset. Focusable scroll region with aria-label. Light and dark mode.
 */
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const regions = ['Paris', 'Lyon', 'Berlin', 'Madrid', 'Milan', 'Lisbon', 'Dublin', 'Oslo', 'Vienna', 'Prague', 'Warsaw', 'Athens'];

export function StickyHeaderTable() {
  return (
    <div tabIndex={0} aria-label="Sales by region" className="h-72 w-full max-w-xl overflow-auto rounded-2xl border border-zinc-200 bg-white outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 top-0 z-20 border-b border-r border-zinc-200 bg-zinc-50 px-4 py-2.5 text-left text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">Region</th>
            {months.map((month) => <th key={month} className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 text-right text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {regions.map((region, row) => (
            <tr key={region} className="hover:[&>td]:bg-zinc-50 dark:hover:[&>td]:bg-zinc-900">
              <td className="sticky left-0 z-10 border-b border-r border-zinc-100 bg-white px-4 py-2.5 font-medium text-zinc-900 dark:border-zinc-900 dark:bg-zinc-950 dark:text-white">{region}</td>
              {months.map((month, col) => <td key={month} className="border-b border-zinc-100 bg-white px-4 py-2.5 text-right tabular-nums text-zinc-600 dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-400">{((row + 3) * (col + 5) * 37) % 900 + 100}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
