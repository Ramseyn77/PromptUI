/**
 * @registry
 * name: Topography Lines
 * category: Shaders
 * style: Editorial
 * tags: recent
 * description: Courbes de niveau topographiques en SVG qui respirent lentement, comme une carte vivante.
 * prompt: Create a topographic contour background: 12 concentric irregular closed paths (generated from polar noise with sin sums) in currentColor at low opacity, the group gently scaling/rotating with a slow keyframe. Muted in light and dark mode, headline over it.
 */
const rings = Array.from({ length: 12 }, (_, ring) => {
  const points = Array.from({ length: 48 }, (_, index) => {
    const angle = (index / 48) * Math.PI * 2;
    const radius = 20 + ring * 14 + Math.sin(angle * 3 + ring) * 6 + Math.sin(angle * 5 - ring * 0.7) * 4;
    return `${(200 + Math.cos(angle) * radius).toFixed(1)},${(130 + Math.sin(angle) * radius * 0.7).toFixed(1)}`;
  });
  return `M${points.join('L')}Z`;
});

export function TopographyLines() {
  return (
    <>
      <style>{`@keyframes pui-topo{50%{transform:scale(1.06) rotate(3deg)}}`}</style>
      <div className="relative grid h-64 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-[#f6f3ea] text-emerald-900 dark:bg-zinc-950 dark:text-emerald-200">
        <svg aria-hidden viewBox="0 0 400 260" className="absolute inset-0 h-full w-full">
          <g className="origin-center motion-safe:animate-[pui-topo_16s_ease-in-out_infinite]" style={{ transformBox: 'fill-box' }}>
            {rings.map((d, index) => <path key={index} d={d} fill="none" stroke="currentColor" strokeOpacity={0.12 + index * 0.02} strokeWidth="1" />)}
          </g>
        </svg>
        <p className="relative rounded-full bg-[#f6f3ea]/80 px-4 py-1.5 font-serif text-xl italic dark:bg-zinc-950/70">Summit 2,418 m</p>
      </div>
    </>
  );
}
