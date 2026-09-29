/**
 * @registry
 * name: Top Countries
 * category: Dashboard
 * style: SaaS
 * tags: recent
 * description: Classement des pays par visiteurs avec code pays, barre proportionnelle et pourcentage.
 * prompt: Create a "Top countries" widget: rows with a two-letter country code badge, country name, a horizontal bar proportional to the leader, visitor count and share %, plus a dropdown-like period label. Light and dark mode.
 */
const countries = [
  { code: 'FR', name: 'France', visitors: 18420 },
  { code: 'US', name: 'United States', visitors: 14210 },
  { code: 'DE', name: 'Germany', visitors: 8930 },
  { code: 'CI', name: "Côte d'Ivoire", visitors: 6120 },
  { code: 'CA', name: 'Canada', visitors: 4380 },
];

export function TopCountries() {
  const total = countries.reduce((sum, country) => sum + country.visitors, 0);
  const top = countries[0].visitors;
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Top countries</h3>
        <span className="rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">Last 30 days</span>
      </div>
      <ul className="mt-4 space-y-3">
        {countries.map((country) => (
          <li key={country.code} className="flex items-center gap-3">
            <span className="grid h-6 w-8 place-items-center rounded-md bg-zinc-100 font-mono text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{country.code}</span>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between text-sm"><span className="truncate text-zinc-800 dark:text-zinc-200">{country.name}</span><span className="tabular-nums text-zinc-500 dark:text-zinc-400">{country.visitors.toLocaleString('en-US')}</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-teal-500" style={{ width: `${(country.visitors / top) * 100}%` }} /></div>
            </div>
            <span className="w-10 text-right text-xs font-semibold tabular-nums text-zinc-900 dark:text-white">{Math.round((country.visitors / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
