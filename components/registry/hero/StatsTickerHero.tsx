/**
 * @registry
 * name: Stats Ticker Hero
 * category: Hero
 * style: Dark
 * tags: recent
 * description: Hero sombre avec bandeau défilant de chiffres en direct (transactions, pays, disponibilité) sous le titre.
 * prompt: Create a dark fintech hero: headline, subtitle and CTA, then a full-width ticker band that scrolls a duplicated row of live-looking stats (label + value + small up/down arrow) infinitely, pausing on hover; edges fade with a mask; marquee is static with reduced motion and the stats are also listed for screen readers. Dark in both themes.
 */
const stats = [['Payments today', '1.2M', true], ['Countries', '42', true], ['Uptime', '99.99%', true], ['Avg. settlement', '1.4s', false], ['Fraud blocked', '$3.8M', true], ['Developers', '18k', true]] as const;

export function StatsTickerHero() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 gap-10 pr-10">
      {stats.map(([label, value, up]) => <li key={label} className="flex items-baseline gap-2 whitespace-nowrap"><span className="text-sm text-zinc-400">{label}</span><span className="font-mono text-lg font-semibold text-white">{value}</span><span className={up ? 'text-emerald-400' : 'text-rose-400'}>{up ? '▲' : '▼'}</span></li>)}
    </ul>
  );

  return (
    <section className="w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07090d] py-14 text-center text-white">
      <style>{`@keyframes pui-ticker{to{transform:translateX(-50%)}}`}</style>
      <div className="px-6">
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Payments infrastructure for the next billion users.</h1>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">Accept mobile money, cards and bank transfers across Africa with one API.</p>
        <a href="#start" className="mt-7 inline-block rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-emerald-950">Start accepting payments</a>
      </div>
      <div className="group mt-12 border-y border-white/10 py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max motion-safe:animate-[pui-ticker_30s_linear_infinite] group-hover:[animation-play-state:paused]">{row(false)}{row(true)}</div>
      </div>
    </section>
  );
}
