/**
 * @registry
 * name: Campaign Stats Widget
 * category: Dashboard
 * style: Gradient
 * tags: featured, recent
 * description: Statistiques d'une campagne email : entonnoir envoyés → ouverts → clics → ventes, taux et comparaison à la moyenne.
 * prompt: Create an email campaign stats widget: campaign name and sent date, a horizontal funnel of four stages (Sent, Opened, Clicked, Purchased) as decreasing gradient bars with counts and conversion rate between stages, each rate compared to the account average (▲/▼ colored), and a revenue figure. Light and dark mode.
 */
const stages = [['Sent', 12400], ['Opened', 5580], ['Clicked', 1120], ['Purchased', 186]] as const;
const averages = [0, 38, 15, 12];

export function CampaignStatsWidget() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between">
        <div><h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Autumn Sale · Email</h3><p className="text-xs text-zinc-500">Sent Oct 3 · 12,400 recipients</p></div>
        <p className="text-right"><span className="block text-xs text-zinc-500">Revenue</span><span className="text-xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">€9,860</span></p>
      </div>
      <ol className="mt-4 space-y-2.5">
        {stages.map(([label, count], index) => {
          const rate = index ? Math.round((count / stages[index - 1][1]) * 100) : 100;
          const better = rate >= averages[index];
          return (
            <li key={label}>
              <div className="flex justify-between text-xs"><span className="font-medium text-zinc-700 dark:text-zinc-300">{label}</span>{index > 0 && <span className={better ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>{rate}% {better ? '▲' : '▼'} <span className="text-zinc-400">avg {averages[index]}%</span></span>}</div>
              <div className="mt-1 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-900"><div className="flex h-full items-center rounded-lg bg-gradient-to-r from-sky-500 to-violet-500 px-2 text-xs font-semibold tabular-nums text-white" style={{ width: `${Math.max(10, (count / stages[0][1]) * 100)}%` }}>{count.toLocaleString('en-US')}</div></div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
