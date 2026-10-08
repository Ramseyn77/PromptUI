/**
 * @registry
 * name: Dark Metric Panel
 * category: Dashboard
 * style: Dark
 * tags: recent
 * description: Panneau de métriques contrasté avec grand chiffre, variation et trois sous-indicateurs.
 * prompt: Create a high-contrast metric panel (dark in light mode, light in dark mode): eyebrow, huge value with unit, delta pill, a thin gradient divider and three sub-metrics in a row with labels. Compact and punchy.
 */
export function DarkMetricPanel() {
  return (
    <section className="w-full max-w-sm rounded-3xl bg-zinc-950 p-6 text-white dark:bg-white dark:text-zinc-950">
      <p className="text-xs font-semibold uppercase tracking-[.2em] opacity-60">Monthly recurring revenue</p>
      <div className="mt-3 flex items-end gap-3">
        <p className="text-5xl font-semibold tracking-tight">$128<span className="text-2xl opacity-60">k</span></p>
        <span className="mb-2 rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-semibold text-emerald-300 dark:text-emerald-700">+9.2%</span>
      </div>
      <div aria-hidden className="my-5 h-px bg-gradient-to-r from-teal-400 via-violet-400 to-transparent" />
      <dl className="grid grid-cols-3 gap-3">
        {[['New', '$14k'], ['Expansion', '$6k'], ['Churned', '−$3k']].map(([label, value]) => (
          <div key={label}><dt className="text-xs opacity-60">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>
        ))}
      </dl>
    </section>
  );
}
