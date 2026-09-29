/**
 * @registry
 * name: Magazine Footer
 * category: Footer
 * style: Editorial
 * tags: recent
 * description: Pied de page de magazine avec rubriques, derniers articles et masthead en serif.
 * prompt: Create a magazine footer: serif masthead with italic tagline, a "Latest stories" column with three linked headlines and dates, section links in two columns, and a bottom rule with issue number and copyright. Warm paper palette in light mode, charcoal in dark mode.
 */
const stories = [['The quiet craft of good interfaces', 'Sep 26'], ['Why defaults matter more than features', 'Sep 19'], ['A field guide to calm notifications', 'Sep 12']];

export function MagazineFooter() {
  return (
    <footer className="w-full max-w-4xl rounded-3xl bg-[#faf6ee] p-8 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1.3fr_1fr]">
        <div>
          <p className="font-serif text-4xl">The Margin</p>
          <p className="mt-2 font-serif italic text-zinc-600 dark:text-zinc-400">Notes on design, software and slowness.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-zinc-500">Latest stories</p>
          <ul className="mt-3 space-y-3">{stories.map(([title, date]) => <li key={title}><a href="#" className="font-serif text-lg leading-6 hover:underline">{title}</a><p className="text-xs text-zinc-500">{date}</p></li>)}</ul>
        </div>
        <nav aria-label="Sections">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-zinc-500">Sections</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">{['Essays', 'Interviews', 'Tools', 'Reviews', 'Archive', 'About'].map((link) => <li key={link}><a href="#" className="hover:underline">{link}</a></li>)}</ul>
        </nav>
      </div>
      <div className="mt-10 flex justify-between border-t border-zinc-900/20 pt-4 text-xs text-zinc-500 dark:border-white/15"><span>Issue Nº 14</span><span>© 2026 The Margin</span></div>
    </footer>
  );
}
