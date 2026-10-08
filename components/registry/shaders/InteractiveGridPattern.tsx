/**
 * @registry
 * name: Interactive Grid Pattern
 * category: Shaders
 * style: SaaS
 * tags: featured, recent
 * description: Grille de cases qui s'illuminent sous le curseur puis s'éteignent lentement, laissant une traînée.
 * prompt: Create an interactive grid pattern background: a 16x10 grid of square SVG cells with hairline strokes; hovering a cell fills it instantly with teal, and it fades back over 1s (transition only on leave) so the pointer leaves a glowing trail; radial mask fades the edges; centered headline over it with pointer-events none. Light and dark mode.
 */
export function InteractiveGridPattern() {
  const columns = 16;
  const rows = 10;

  return (
    <div className="relative grid h-72 w-full max-w-xl place-items-center overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <svg aria-hidden viewBox={`0 0 ${columns * 40} ${rows * 40}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]">
        {Array.from({ length: columns * rows }, (_, index) => (
          <rect
            key={index}
            x={(index % columns) * 40}
            y={Math.floor(index / columns) * 40}
            width={40}
            height={40}
            className="fill-transparent stroke-zinc-200 transition-[fill] duration-1000 hover:fill-teal-400/60 hover:duration-0 dark:stroke-zinc-800 dark:hover:fill-teal-400/40"
          />
        ))}
      </svg>
      <div className="pointer-events-none relative text-center">
        <p className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Move your cursor</p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Every cell remembers you for a second.</p>
      </div>
    </div>
  );
}
