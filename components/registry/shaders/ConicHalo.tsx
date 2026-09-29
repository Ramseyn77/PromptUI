/**
 * @registry
 * name: Conic Halo
 * category: Shaders
 * style: Gradient
 * tags: recent
 * description: Halo circulaire en degrade conique qui tourne derriere un disque, effet eclipse lumineuse.
 * prompt: Create an eclipse-like glow: a blurred conic-gradient ring rotating slowly behind a solid disc (page-colored), with an inner thin gradient border; centered on a card. Works in light and dark mode, reduced-motion safe.
 */
export function ConicHalo() {
  return (
    <>
      <style>{`@keyframes pui-halo{to{transform:rotate(360deg)}}`}</style>
      <div className="grid h-64 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-950">
        <div className="relative size-40">
          <div aria-hidden className="absolute -inset-6 rounded-full bg-[conic-gradient(from_0deg,#14b8a6,#8b5cf6,#f59e0b,#ec4899,#14b8a6)] opacity-80 blur-2xl motion-safe:animate-[pui-halo_8s_linear_infinite]" />
          <div aria-hidden className="absolute -inset-px rounded-full bg-[conic-gradient(from_0deg,#14b8a6,#8b5cf6,#f59e0b,#ec4899,#14b8a6)] motion-safe:animate-[pui-halo_8s_linear_infinite]" />
          <div className="absolute inset-0 grid place-items-center rounded-full bg-zinc-100 dark:bg-zinc-950">
            <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-white">Eclipse</span>
          </div>
        </div>
      </div>
    </>
  );
}
