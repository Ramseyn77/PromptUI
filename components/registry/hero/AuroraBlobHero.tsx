/**
 * @registry
 * name: Aurora Blob Hero
 * category: Hero
 * style: Gradient
 * tags: recent
 * description: Hero sur fond aurore de blobs flous qui dérivent lentement.
 * prompt: Create a hero over an aurora background made of three blurred color blobs (teal, violet, amber) drifting with long keyframe animations, a frosted headline area, subtitle and CTA. Blob opacity tuned for light and dark mode; reduced-motion safe.
 */
export function AuroraBlobHero() {
  return (
    <>
      <style>{`@keyframes pui-drift-a{50%{transform:translate(30%,20%) scale(1.2)}}@keyframes pui-drift-b{50%{transform:translate(-25%,15%) scale(.9)}}@keyframes pui-drift-c{50%{transform:translate(10%,-25%) scale(1.15)}}`}</style>
      <section className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white px-6 py-24 text-center dark:bg-zinc-950">
        <div aria-hidden className="absolute -left-10 top-0 size-72 rounded-full bg-teal-400/40 blur-3xl motion-safe:animate-[pui-drift-a_14s_ease-in-out_infinite] dark:bg-teal-500/30" />
        <div aria-hidden className="absolute -right-10 top-10 size-72 rounded-full bg-violet-400/40 blur-3xl motion-safe:animate-[pui-drift-b_16s_ease-in-out_infinite] dark:bg-violet-500/30" />
        <div aria-hidden className="absolute bottom-[-30%] left-1/3 size-72 rounded-full bg-amber-300/40 blur-3xl motion-safe:animate-[pui-drift-c_18s_ease-in-out_infinite] dark:bg-amber-400/20" />
        <div className="relative mx-auto max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">Ideas deserve a beautiful home</h1>
          <p className="mx-auto mt-5 max-w-lg text-zinc-700 dark:text-zinc-300">Write, plan and publish in a workspace that feels as good as it works.</p>
          <button type="button" className="mt-8 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950">Start writing</button>
        </div>
      </section>
    </>
  );
}
