/**
 * @registry
 * name: Blog Post Card
 * category: Cards
 * style: Editorial
 * tags: recent
 * description: Carte d'article de blog avec catégorie, temps de lecture, auteur et lien étendu à toute la carte.
 * prompt: Create a blog post card where the whole card is clickable via a stretched link (title anchor with an after:absolute inset-0 overlay) while secondary links (category, author) stay independently clickable above it; gradient thumbnail that zooms slightly on hover, category chip, serif title, excerpt clamped to 2 lines, author avatar, date and reading time. Light and dark mode.
 */
export function BlogPostCard() {
  return (
    <article className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:shadow-xl focus-within:ring-2 focus-within:ring-teal-500 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="h-44 overflow-hidden"><div aria-hidden className="size-full bg-[radial-gradient(circle_at_25%_35%,#fde68a,transparent_45%),radial-gradient(circle_at_75%_65%,#93c5fd,transparent_50%),linear-gradient(#f1f5f9,#f1f5f9)] transition-transform duration-500 group-hover:scale-105 dark:bg-[radial-gradient(circle_at_25%_35%,#78350f,transparent_45%),radial-gradient(circle_at_75%_65%,#1e3a8a,transparent_50%),linear-gradient(#0f172a,#0f172a)]" /></div>
      <div className="p-5">
        <a href="#design" className="relative z-10 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-300">Design</a>
        <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
          <a href="#post" className="outline-none after:absolute after:inset-0">Why your design system needs fewer components</a>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">Every new variant is a promise to maintain. Here is how we cut our library in half and shipped faster.</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
          <span aria-hidden className="size-7 rounded-full bg-gradient-to-br from-teal-400 to-sky-500" />
          <a href="#author" className="relative z-10 font-medium text-zinc-800 hover:underline dark:text-zinc-200">Léa Fontaine</a>
          <span aria-hidden>·</span><time dateTime="2026-10-01">Oct 1</time><span aria-hidden>·</span><span>6 min read</span>
        </div>
      </div>
    </article>
  );
}
