/**
 * @registry
 * name: Bouncing Dots
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Trois points qui rebondissent en cascade avec ombre qui se comprime au sol.
 * prompt: Create a bouncing-dots loader: three dots jumping with staggered delays and a squash at the bottom, each with a small shadow ellipse that shrinks while the dot is in the air. role="status" + sr-only label. Neutral colors for light and dark, reduced-motion safe.
 */
export function BouncingDots() {
  return (
    <>
      <style>{`@keyframes pui-jump{0%,100%{transform:translateY(0) scaleY(.85)}45%{transform:translateY(-22px) scaleY(1.05)}}@keyframes pui-shadow{0%,100%{transform:scaleX(1);opacity:.35}45%{transform:scaleX(.5);opacity:.12}}`}</style>
      <div role="status" className="flex items-end gap-4 pt-6">
        {[0, 1, 2].map((dot) => (
          <span key={dot} aria-hidden className="flex flex-col items-center gap-1.5">
            <span className="size-4 origin-bottom rounded-full bg-zinc-900 motion-safe:animate-[pui-jump_.9s_ease-in-out_infinite] dark:bg-white" style={{ animationDelay: `${dot * 0.15}s` }} />
            <span className="h-1 w-4 rounded-full bg-zinc-900 motion-safe:animate-[pui-shadow_.9s_ease-in-out_infinite] dark:bg-white" style={{ animationDelay: `${dot * 0.15}s` }} />
          </span>
        ))}
        <span className="sr-only">Loading</span>
      </div>
    </>
  );
}
