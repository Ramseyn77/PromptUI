/**
 * @registry
 * name: Skeleton Card
 * category: Loader
 * style: Minimal
 * tags: featured, recent
 * description: Squelette de carte article avec image, titre et lignes de texte, reflet qui glisse.
 * prompt: Create a skeleton loading card mirroring a blog card (image block, avatar + two lines, three text lines of varying width) with a moving shimmer highlight via background-position animation; aria-busy + sr-only "Loading article". Zinc tones for light and dark mode.
 */
export function SkeletonCard() {
  const shimmer = 'bg-[linear-gradient(90deg,#e4e4e7_25%,#f4f4f5_50%,#e4e4e7_75%)] bg-[length:200%_100%] motion-safe:animate-[pui-skeleton_1.5s_linear_infinite] dark:bg-[linear-gradient(90deg,#27272a_25%,#3f3f46_50%,#27272a_75%)]';
  return (
    <>
      <style>{`@keyframes pui-skeleton{to{background-position:-200% 0}}`}</style>
      <article aria-busy="true" className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="sr-only">Loading article</span>
        <div aria-hidden>
          <div className={`aspect-video rounded-xl ${shimmer}`} />
          <div className="mt-4 flex items-center gap-3">
            <div className={`size-9 rounded-full ${shimmer}`} />
            <div className="flex-1 space-y-2"><div className={`h-3 w-2/3 rounded ${shimmer}`} /><div className={`h-2.5 w-1/3 rounded ${shimmer}`} /></div>
          </div>
          <div className="mt-4 space-y-2">{['w-full', 'w-11/12', 'w-3/5'].map((width) => <div key={width} className={`h-2.5 rounded ${width} ${shimmer}`} />)}</div>
        </div>
      </article>
    </>
  );
}
