/**
 * @registry
 * name: Hexagon Pattern
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Nid d'abeille de fins hexagones dont quelques alvéoles pulsent en couleur, avec fondu radial.
 * prompt: Create a honeycomb background: an SVG pattern of thin hexagon outlines (pointy-top, 28px radius) fading out with a radial mask, plus 9 highlighted hexagons at deterministic positions that pulse amber/teal fill with staggered delays; hover over any highlighted cell to brighten it. Text overlay at the bottom-left. Pulses off with reduced motion. Light and dark mode.
 */
export function HexagonPattern() {
  const r = 28;
  const w = Math.sqrt(3) * r;
  const hex = (cx: number, cy: number) => Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 3) * index - Math.PI / 6;
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');
  const cells = [[3, 1], [4, 2], [6, 1], [7, 3], [9, 2], [2, 3], [5, 4], [8, 4], [10, 1]];

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-hex{0%,100%{opacity:.15}50%{opacity:.85}}`}</style>
      <svg aria-hidden className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_60%_40%,#000_30%,transparent_80%)]">
        <defs>
          <pattern id="pui-hex-pattern" width={w} height={r * 3} patternUnits="userSpaceOnUse">
            <polygon points={hex(w / 2, r)} className="fill-none stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" />
            <polygon points={hex(0, r * 2.5)} className="fill-none stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" />
            <polygon points={hex(w, r * 2.5)} className="fill-none stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pui-hex-pattern)" />
        {cells.map(([column, row], index) => (
          <polygon
            key={index}
            points={hex(column * w + (row % 2 ? 0 : w / 2), row * r * 1.5 + r)}
            className={`transition hover:!opacity-100 motion-safe:animate-[pui-hex_4s_ease-in-out_infinite] ${index % 2 ? 'fill-teal-400/50 dark:fill-teal-400/40' : 'fill-amber-300/60 dark:fill-amber-400/40'}`}
            style={{ animationDelay: `${index * 0.45}s`, opacity: 0.4 }}
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute bottom-6 left-6">
        <p className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Hive mind</p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Distributed workers, one queue.</p>
      </div>
    </div>
  );
}
