/**
 * @registry
 * name: Editorial Hero
 * category: Hero
 * style: Editorial
 * tags: recent
 * description: Hero facon magazine avec typographie serif, numero d edition et image en encart.
 * prompt: Create a magazine-style hero: top rule with issue number and date, an oversized serif headline with an italic word, a short standfirst and byline, and an inset gradient "cover" image; 1 column on mobile, 12-col split on md. Light and dark mode.
 */
export function EditorialHero() {
  return (
    <section className="w-full max-w-5xl rounded-3xl bg-[#faf8f3] px-6 py-10 sm:px-10 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 text-xs font-semibold uppercase tracking-[.2em] text-zinc-900 dark:border-zinc-200 dark:text-zinc-200">
        <span>Issue Nº 14</span>
        <span>Autumn 2026</span>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <h1 className="font-serif text-5xl leading-[.95] tracking-tight text-zinc-900 sm:text-7xl dark:text-white">
            The quiet <em className="text-teal-700 dark:text-teal-400">craft</em> of good interfaces
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-700 dark:text-zinc-300">Why the best products feel obvious, and the invisible decisions that make them that way.</p>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">By Léa Moreau · 12 min read</p>
        </div>
        <div aria-hidden className="aspect-[3/4] rounded-2xl bg-[linear-gradient(160deg,#99f6e4,#a78bfa_55%,#fcd34d)] md:col-span-4" />
      </div>
    </section>
  );
}
