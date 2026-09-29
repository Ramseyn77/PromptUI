/**
 * @registry
 * name: Gradient Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Titre en degrade anime qui derive lentement, lisible sur fond clair et sombre.
 * prompt: Create a hero headline with background-clip text and a teal/violet/amber gradient at 200% size that pans slowly with a keyframe. Add an eyebrow and subtitle with light and dark text colors.
 */
export function GradientText() {
  return (
    <>
      <style>{`@keyframes pui-pan{to{background-position:200% center}}`}</style>
      <div className="max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-zinc-500 dark:text-zinc-400">Introducing</p>
        <h2 className="mt-3 bg-[linear-gradient(90deg,#14b8a6,#8b5cf6,#f59e0b,#14b8a6)] bg-[length:200%_auto] bg-clip-text text-4xl font-semibold tracking-tight text-transparent motion-safe:animate-[pui-pan_6s_linear_infinite] sm:text-6xl">
          Design at the speed of thought
        </h2>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          A gradient that drifts slowly across the headline, readable on light and dark surfaces.
        </p>
      </div>
    </>
  );
}
