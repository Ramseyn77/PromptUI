/**
 * @registry
 * name: Background Paths
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Faisceau de courbes SVG dont le trace parcourt lentement les chemins en boucle.
 * prompt: Create an animated background of ~18 flowing SVG bezier paths generated in a loop, each with a dashed stroke whose dashoffset animates at a different speed so light travels along the lines; stroke uses currentColor (dark gray in light mode, light in dark mode). Headline on top.
 */
const paths = Array.from({ length: 18 }, (_, index) => {
  const offset = index * 14;
  return `M-40 ${60 + offset} C 120 ${-20 + offset}, 260 ${220 - offset / 2}, 420 ${80 + offset} S 700 ${20 + offset}, 760 ${140 + offset / 3}`;
});

export function BackgroundPaths() {
  return (
    <>
      <style>{`@keyframes pui-path{to{stroke-dashoffset:-1000}}`}</style>
      <div className="relative grid h-64 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
        <svg aria-hidden viewBox="0 0 720 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {paths.map((d, index) => (
            <path key={index} d={d} fill="none" stroke="currentColor" strokeOpacity={0.08 + index * 0.025} strokeWidth={0.6 + index * 0.05} strokeDasharray="120 380" className="motion-safe:animate-[pui-path_linear_infinite]" style={{ animationDuration: `${12 + (index % 6) * 3}s` }} />
          ))}
        </svg>
        <p className="relative text-3xl font-semibold tracking-tight">Paths of light</p>
      </div>
    </>
  );
}
