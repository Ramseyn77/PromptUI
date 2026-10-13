/**
 * @registry
 * name: Book Flip Loader
 * category: Loader
 * style: Editorial
 * tags: recent
 * description: Loader en livre ouvert dont les pages tournent en 3D l'une après l'autre, avec légende « Chargement du chapitre… ».
 * prompt: Create a book flip loader: an open book made of a left and right cover with three pages that rotate around the spine (rotateY from 0 to -180deg) one after another with staggered delays, using transform-origin left and backface shading, perspective on the wrapper; a serif caption "Loading chapter…"; role=status; reduced motion shows a static open book. Light (paper) and dark mode.
 */
export function BookFlipLoader() {
  return (
    <div role="status" className="flex flex-col items-center gap-5 p-10">
      <style>{`@keyframes pui-page-flip { 0%, 10% { transform: rotateY(0deg) } 45%, 100% { transform: rotateY(-180deg) } }`}</style>
      <div aria-hidden className="relative h-24 w-40 [perspective:600px]">
        <span className="absolute inset-y-0 left-0 w-1/2 rounded-l-md bg-amber-800 shadow-lg dark:bg-amber-900" />
        <span className="absolute inset-y-0 right-0 w-1/2 rounded-r-md bg-amber-800 shadow-lg dark:bg-amber-900" />
        <span className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-l-sm bg-[#fbf7ee] dark:bg-zinc-200" />
        <span className="absolute inset-y-1 right-1 w-[calc(50%-0.25rem)] rounded-r-sm bg-[#fbf7ee] p-2 dark:bg-zinc-200">{[0, 1, 2, 3].map((line) => <span key={line} className="mt-1.5 block h-0.5 rounded bg-zinc-300 first:mt-1" style={{ width: `${90 - line * 12}%` }} />)}</span>
        {[0, 1, 2].map((page) => (
          <span key={page} className="absolute inset-y-1 left-1/2 w-[calc(50%-0.25rem)] origin-left rounded-r-sm border-l border-zinc-200 bg-gradient-to-r from-zinc-200 to-[#fbf7ee] [transform-style:preserve-3d] motion-safe:animate-[pui-page-flip_2.4s_ease-in-out_infinite] dark:from-zinc-400 dark:to-zinc-200" style={{ animationDelay: `${page * 0.25}s` }} />
        ))}
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-amber-950/40" />
      </div>
      <p className="font-serif text-sm italic text-zinc-600 dark:text-zinc-400">Loading chapter…</p>
    </div>
  );
}
