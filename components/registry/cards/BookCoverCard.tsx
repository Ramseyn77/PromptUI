/**
 * @registry
 * name: Book Cover Card
 * category: Cards
 * style: Editorial
 * tags: recent
 * description: Couverture de livre en 3D avec tranche et pages qui s'ouvre légèrement au survol, avec note et progression de lecture.
 * prompt: Create a 3D book card: a cover (gradient art, serif title, author) with a visible spine and page edges built from rotated pseudo-blocks in perspective; on hover/focus the book rotates toward the viewer; beside it the title, star rating, reading progress bar ("62% · 4h left") and Continue reading / Add to shelf buttons. Instant with reduced motion. Light and dark mode.
 */
import { Star } from 'lucide-react';

export function BookCoverCard() {
  return (
    <article className="group flex w-full max-w-md items-center gap-6 rounded-3xl border border-zinc-200 bg-[#fbf8f2] p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <a href="#book" aria-label="The Quiet Harbour, open book" className="shrink-0 outline-none [perspective:900px] focus-visible:ring-2 focus-visible:ring-amber-500">
        <span className="relative block h-48 w-32 transition-transform duration-500 [transform-style:preserve-3d] [transform:rotateY(-28deg)] group-hover:[transform:rotateY(-8deg)] group-focus-within:[transform:rotateY(-8deg)] motion-reduce:transition-none">
          <span className="absolute inset-0 flex flex-col justify-between rounded-r-md bg-gradient-to-br from-teal-700 via-teal-800 to-zinc-900 p-3 text-white shadow-2xl [transform:translateZ(10px)]">
            <span className="font-serif text-lg leading-tight">The Quiet Harbour</span>
            <span className="text-[10px] uppercase tracking-widest text-teal-200">Amina Sow</span>
          </span>
          <span className="absolute inset-y-0 left-0 w-5 bg-teal-950 [transform:rotateY(-90deg)_translateZ(0)] [transform-origin:left]" />
          <span className="absolute inset-y-1 right-0 w-5 bg-[repeating-linear-gradient(90deg,#f5f5f4_0_1px,#e7e5e4_1px_2px)] [transform:rotateY(90deg)_translateZ(-10px)] [transform-origin:right]" />
        </span>
      </a>
      <div className="min-w-0">
        <h3 className="font-serif text-xl text-zinc-950 dark:text-zinc-50">The Quiet Harbour</h3>
        <p className="text-sm text-zinc-500">Amina Sow · 2026</p>
        <p className="mt-2 flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-300" aria-label="Rated 4.6 out of 5">{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden className={`size-3.5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-amber-400'}`} />)}<span className="ml-1">4.6</span></p>
        <div className="mt-3 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"><div className="h-full w-[62%] rounded-full bg-teal-600" /></div>
        <p className="mt-1 text-xs text-zinc-500">62% · 4h left</p>
        <div className="mt-4 flex gap-2"><button type="button" className="rounded-lg bg-zinc-950 px-3 py-1.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Continue</button><button type="button" className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Add to shelf</button></div>
      </div>
    </article>
  );
}
