/**
 * @registry
 * name: Retro Grid
 * category: Shaders
 * style: Gradient
 * tags: featured, recent
 * description: Sol quadrillé en perspective qui défile vers l'horizon, style synthwave, en CSS pur.
 * prompt: Create a retro synthwave grid background in pure CSS: a plane rotated with perspective (rotateX 65deg) filled with a 60px line grid whose background-position animates downward forever, faded toward the horizon with a gradient mask, and a gradient headline above. Lines are zinc on light and fuchsia on dark. Animation off with reduced motion.
 */
export function RetroGrid() {
  return (
    <div className="relative grid h-72 w-full max-w-xl place-items-center overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#09040f]">
      <style>{`@keyframes pui-retro{from{background-position:0 0}to{background-position:0 60px}}`}</style>
      <div aria-hidden className="absolute inset-0 [perspective:200px]">
        <div className="absolute inset-x-[-50%] bottom-[-30%] top-1/2 [transform:rotateX(65deg)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,.25)_1px,transparent_0)] bg-[length:60px_60px] motion-safe:animate-[pui-retro_1.2s_linear_infinite] dark:bg-[linear-gradient(to_right,rgba(232,121,249,.55)_1px,transparent_0),linear-gradient(to_bottom,rgba(232,121,249,.55)_1px,transparent_0)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent dark:from-[#09040f] dark:via-[#09040f]/50" />
      </div>
      <p className="relative -mt-10 bg-gradient-to-b from-amber-400 via-pink-500 to-violet-600 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl">Retro Grid</p>
    </div>
  );
}
