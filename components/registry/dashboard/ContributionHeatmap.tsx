/**
 * @registry
 * name: Contribution Heatmap
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Calendrier de contributions facon GitHub, 20 semaines de cases colorees par intensite.
 * prompt: Create a contribution calendar: 20 weeks x 7 days grid of small squares colored in 5 teal intensity levels from deterministic pseudo-random data, weekday labels, a "Less ▢▢▢▢▢ More" legend and total count; each square has a title with its count. Horizontal scroll on narrow screens. Light and dark mode.
 */
const weeks = 20;
const levels = ['bg-zinc-100 dark:bg-zinc-800', 'bg-teal-200 dark:bg-teal-900', 'bg-teal-400 dark:bg-teal-700', 'bg-teal-600 dark:bg-teal-500', 'bg-teal-800 dark:bg-teal-300'];
const count = (week: number, day: number) => Math.max(0, Math.round(Math.sin(week * 1.7 + day * 2.3) * 5 + Math.cos(week * 0.4) * 3 + 2));

export function ContributionHeatmap() {
  const total = Array.from({ length: weeks * 7 }, (_, index) => count(Math.floor(index / 7), index % 7)).reduce((sum, value) => sum + value, 0);
  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">{total} contributions <span className="font-normal text-zinc-500 dark:text-zinc-400">in the last 20 weeks</span></h3>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <div aria-hidden className="grid grid-rows-7 gap-1 pt-0.5 text-[10px] text-zinc-400">{['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, index) => <span key={index} className="h-3 leading-3">{label}</span>)}</div>
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {Array.from({ length: weeks * 7 }, (_, index) => {
            const value = count(Math.floor(index / 7), index % 7);
            return <span key={index} title={`${value} contributions`} className={`size-3 rounded-[3px] ${levels[Math.min(4, Math.floor(value / 2.5))]}`} />;
          })}
        </div>
      </div>
      <div aria-hidden className="mt-3 flex items-center justify-end gap-1 text-[11px] text-zinc-500">Less {levels.map((level) => <span key={level} className={`size-3 rounded-[3px] ${level}`} />)} More</div>
    </section>
  );
}
