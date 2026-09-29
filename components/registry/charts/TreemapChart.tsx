/**
 * @registry
 * name: Treemap Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Treemap du budget par poste en grille CSS, tuiles proportionnelles avec montant et pourcentage.
 * prompt: Create a treemap of spending by category using a CSS grid with row/column spans roughly proportional to value (largest tile top-left), each tile colored with label, amount and share; tiles are focusable with aria-labels and lift on hover. Light and dark mode.
 */
const tiles = [
  { label: 'Salaries', value: 48, color: 'bg-teal-600', span: 'col-span-2 row-span-2' },
  { label: 'Cloud', value: 18, color: 'bg-violet-600', span: 'col-span-1 row-span-2' },
  { label: 'Marketing', value: 14, color: 'bg-sky-600', span: 'col-span-1 row-span-1' },
  { label: 'Office', value: 9, color: 'bg-amber-500', span: 'col-span-1 row-span-1' },
  { label: 'Tools', value: 7, color: 'bg-rose-500', span: 'col-span-2 row-span-1' },
  { label: 'Other', value: 4, color: 'bg-zinc-500', span: 'col-span-2 row-span-1' },
];

export function TreemapChart() {
  const total = tiles.reduce((sum, tile) => sum + tile.value, 0);
  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Budget 2026 <span className="text-sm font-normal text-zinc-500">· ${total}0k</span></h3>
      <div className="mt-4 grid h-64 grid-cols-4 grid-rows-4 gap-1.5">
        {tiles.map((tile) => (
          <div key={tile.label} tabIndex={0} aria-label={`${tile.label}: $${tile.value}0k, ${Math.round((tile.value / total) * 100)}%`} className={`flex flex-col justify-between rounded-xl p-3 text-white outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-950 ${tile.color} ${tile.span}`}>
            <span className="text-xs font-semibold">{tile.label}</span>
            <span><span className="block text-lg font-semibold leading-none">${tile.value}0k</span><span className="text-[11px] text-white/80">{Math.round((tile.value / total) * 100)}%</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}
