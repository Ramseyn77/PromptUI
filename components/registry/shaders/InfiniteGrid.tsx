/**
 * @registry
 * name: Infinite Grid
 * category: Shaders
 * style: Dark
 * tags: featured, recent
 * description: Grille en perspective qui defile a l infini vers l horizon, style retro synthwave.
 * prompt: Create an infinite perspective grid: a large plane of CSS grid lines rotated with rotateX in a perspective container, background-position animated so lines scroll toward a glowing horizon, faded with a mask. Colors adapt to light and dark, reduced-motion safe.
 */
export function InfiniteGrid() {
  return (
    <>
      <style>{`@keyframes pui-grid-scroll{to{background-position:0 48px}}`}</style>
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-b from-violet-100 to-white [perspective:320px] dark:from-violet-950 dark:to-zinc-950">
        <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-fuchsia-400 shadow-[0_0_24px_6px_rgba(232,121,249,.6)]" />
        <div
          aria-hidden
          className="absolute -inset-x-1/2 top-1/2 h-[200%] origin-top bg-[linear-gradient(to_right,rgb(139_92_246/.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139_92_246/.5)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_60%,transparent)] [transform:rotateX(70deg)] motion-safe:animate-[pui-grid-scroll_1.2s_linear_infinite] dark:bg-[linear-gradient(to_right,rgb(217_70_239/.6)_1px,transparent_1px),linear-gradient(to_bottom,rgb(217_70_239/.6)_1px,transparent_1px)]"
        />
        <p className="relative pt-10 text-center text-2xl font-bold tracking-[.3em] text-violet-700 dark:text-fuchsia-300">HORIZON</p>
      </div>
    </>
  );
}
