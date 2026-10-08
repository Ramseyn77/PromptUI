/**
 * @registry
 * name: Agency Showcase Hero
 * category: Hero
 * style: Editorial
 * tags: recent
 * description: Hero d'agence : grande phrase éditoriale, vignettes de projets qui révèlent leur nom au survol et disponibilité.
 * prompt: Create a design agency hero: availability pill ("Booking Q1 2027" with green dot), a large serif statement with an inline rounded image chip mid-sentence, then a row of four project thumbnails (gradient art) that show their client name and year on hover/focus with a lift; links to case studies. Thumbnails scroll horizontally on mobile. Warm off-white light theme, deep charcoal dark theme.
 */
const projects = [['Kora Bank', '2026', 'from-emerald-300 to-teal-600'], ['Atlas Run', '2026', 'from-orange-300 to-rose-500'], ['Nimbus', '2025', 'from-sky-300 to-indigo-600'], ['Maison Lin', '2025', 'from-amber-200 to-stone-500']];

export function AgencyShowcaseHero() {
  return (
    <section className="w-full max-w-5xl rounded-3xl bg-[#f5f2ec] px-6 py-12 text-[#1a1916] dark:bg-[#161512] dark:text-[#ece7dd]">
      <span className="inline-flex items-center gap-2 rounded-full border border-current/15 px-3 py-1 text-xs"><span className="size-2 rounded-full bg-emerald-500" />Booking Q1 2027</span>
      <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.1] sm:text-6xl">
        We design brands and products that feel{' '}
        <span aria-hidden className="inline-block h-[0.8em] w-[1.6em] translate-y-[0.08em] rounded-full bg-gradient-to-r from-orange-300 to-rose-500 align-baseline" />{' '}
        <em>inevitable</em> in hindsight.
      </h1>
      <ul className="-mx-6 mt-10 flex snap-x gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0" data-lenis-prevent>
        {projects.map(([name, year, tone]) => (
          <li key={name} className="w-56 shrink-0 snap-start md:w-auto">
            <a href={`#${name.toLowerCase().replace(/\s/g, '-')}`} className="group block outline-none">
              <span className={`relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br transition duration-500 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-current ${tone}`}>
                <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-xl bg-white/85 px-3 py-2 text-sm text-zinc-900 opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">{name} · {year}</span>
              </span>
              <span className="sr-only">{name} case study, {year}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
