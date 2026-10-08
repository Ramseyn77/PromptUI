/**
 * @registry
 * name: Metrics Hero
 * category: Hero
 * style: Editorial
 * tags: recent
 * description: Hero éditorial avec grand titre et rangée de chiffres clés séparés par des filets.
 * prompt: Create an editorial hero: small uppercase eyebrow, oversized headline with one muted phrase, short paragraph, then a 2x2 (mobile) / 4-column (sm+) metrics row separated by hairlines. Light and dark mode.
 */
export function MetricsHero() {
  return (
    <section className="w-full max-w-5xl rounded-3xl bg-white px-6 py-14 sm:px-12 dark:bg-zinc-950">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-teal-700 dark:text-teal-400">Annual report 2026</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
        We helped 12,000 teams <span className="text-zinc-400 dark:text-zinc-500">ship faster than ever.</span>
      </h1>
      <p className="mt-5 max-w-xl text-zinc-600 dark:text-zinc-400">A look back at a year of launches, lessons and the numbers behind them.</p>
      <dl className="mt-12 grid grid-cols-2 border-t border-zinc-200 sm:grid-cols-4 dark:border-zinc-800">
        {[['12k', 'Teams'], ['4.8M', 'Deploys'], ['99.99%', 'Uptime'], ['38', 'Countries']].map(([value, label], index) => (
          <div key={label} className={`py-6 ${index % 2 ? 'pl-6' : 'pr-6'} sm:px-6 sm:first:pl-0 ${index ? 'sm:border-l sm:border-zinc-200 sm:dark:border-zinc-800' : ''}`}>
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">{label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
