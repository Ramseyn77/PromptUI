/**
 * @registry
 * name: Sales Pipeline
 * category: Boards
 * style: Minimal
 * tags: recent
 * description: Pipeline commercial avec montant total par étape, probabilité et deals en cartes.
 * prompt: Create a CRM deals pipeline: columns (Lead 10%, Proposal 40%, Negotiation 70%, Won 100%) with a header showing the summed deal value and a thin colored probability bar, deal cards with company, amount and close date. Horizontal scroll on mobile. Light and dark mode.
 */
const stages = [
  { name: 'Lead', probability: 10, color: 'bg-zinc-400', deals: [['Northwind', 12000, 'Nov 20'], ['Helix', 8000, 'Dec 02']] },
  { name: 'Proposal', probability: 40, color: 'bg-sky-500', deals: [['Lumen', 24000, 'Oct 30']] },
  { name: 'Negotiation', probability: 70, color: 'bg-violet-500', deals: [['Orbit', 36000, 'Oct 14'], ['Kite', 9500, 'Oct 18']] },
  { name: 'Won', probability: 100, color: 'bg-emerald-500', deals: [['Acme', 54000, 'Sep 22']] },
] as const;
const money = (value: number) => `$${(value / 1000).toFixed(value % 1000 ? 1 : 0)}k`;

export function SalesPipeline() {
  return (
    <div className="flex w-full max-w-4xl gap-3 overflow-x-auto pb-2">
      {stages.map((stage) => {
        const total = stage.deals.reduce((sum, deal) => sum + deal[1], 0);
        return (
          <section key={stage.name} aria-label={stage.name} className="w-52 shrink-0 lg:flex-1">
            <header className="rounded-xl bg-zinc-100 px-3 py-2.5 dark:bg-zinc-900">
              <p className="flex justify-between text-sm font-semibold text-zinc-800 dark:text-zinc-200">{stage.name}<span className="text-xs font-medium text-zinc-500">{stage.probability}%</span></p>
              <p className="text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">{money(total)}</p>
              <div className="mt-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800"><div className={`h-full rounded-full ${stage.color}`} style={{ width: `${stage.probability}%` }} /></div>
            </header>
            <ul className="mt-2 space-y-2">
              {stage.deals.map(([company, amount, date]) => (
                <li key={company} className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{company}</p>
                  <p className="mt-1 flex justify-between text-xs text-zinc-500 dark:text-zinc-400"><span className="font-medium tabular-nums text-zinc-700 dark:text-zinc-300">{money(amount)}</span><span>Close {date}</span></p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
