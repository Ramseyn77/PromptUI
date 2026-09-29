/**
 * @registry
 * name: Bullet Chart
 * category: Charts
 * style: Minimal
 * tags: recent
 * description: Graphiques a puces comparant realise et objectif sur fond de zones qualitatives.
 * prompt: Create bullet charts for KPIs: each row has a label + unit, a horizontal track with three qualitative bands (poor/ok/good in zinc shades), a thick actual-value bar and a vertical target marker; value text on the right; role="img" with a descriptive aria-label per row. Light and dark mode.
 */
const metrics = [
  { label: 'Revenue', unit: 'k$', value: 270, target: 250, max: 300 },
  { label: 'New customers', unit: '', value: 1650, target: 2100, max: 2500 },
  { label: 'Satisfaction', unit: '/5', value: 4.3, target: 4.5, max: 5 },
];

export function BulletChart() {
  return (
    <section className="w-full max-w-lg space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Q3 targets</h3>
      {metrics.map((metric) => {
        const pct = (value: number) => `${(value / metric.max) * 100}%`;
        const hit = metric.value >= metric.target;
        return (
          <div key={metric.label} className="grid grid-cols-[7rem_1fr_4rem] items-center gap-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{metric.label}</p>
            <div role="img" aria-label={`${metric.label}: ${metric.value}${metric.unit}, target ${metric.target}${metric.unit}`} className="relative h-6 overflow-hidden rounded-md">
              <span className="absolute inset-y-0 left-0 w-full bg-zinc-100 dark:bg-zinc-900" />
              <span className="absolute inset-y-0 left-0 w-[80%] bg-zinc-200 dark:bg-zinc-800" />
              <span className="absolute inset-y-0 left-0 w-[55%] bg-zinc-300 dark:bg-zinc-700" />
              <span className={`absolute inset-y-[7px] left-0 rounded-r ${hit ? 'bg-teal-600' : 'bg-zinc-900 dark:bg-zinc-100'}`} style={{ width: pct(metric.value) }} />
              <span className="absolute inset-y-1 w-0.5 bg-rose-500" style={{ left: pct(metric.target) }} />
            </div>
            <p className={`text-right text-sm font-semibold tabular-nums ${hit ? 'text-teal-700 dark:text-teal-400' : 'text-zinc-900 dark:text-white'}`}>{metric.value}{metric.unit}</p>
          </div>
        );
      })}
      <p className="flex gap-4 text-xs text-zinc-500 dark:text-zinc-400"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-4 rounded-sm bg-teal-600" />Actual</span><span className="inline-flex items-center gap-1.5"><span className="h-3 w-0.5 bg-rose-500" />Target</span></p>
    </section>
  );
}
