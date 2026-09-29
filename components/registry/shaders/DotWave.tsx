/**
 * @registry
 * name: Dot Wave
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Matrice de points qui ondule en vague diagonale grace a des delais d animation calcules.
 * prompt: Create a dot-matrix wave: a 16x8 CSS grid of small dots, each scaling and brightening with a keyframe whose animation-delay depends on (x + y) so a diagonal wave sweeps across. Dot color adapts to light/dark, reduced-motion safe.
 */
export function DotWave() {
  const columns = 16;
  const rows = 8;

  return (
    <>
      <style>{`@keyframes pui-dot-wave{0%,100%{transform:scale(.5);opacity:.25}50%{transform:scale(1.25);opacity:1}}`}</style>
      <div className="grid h-64 w-full max-w-xl place-items-center rounded-3xl bg-white dark:bg-zinc-950">
        <div aria-hidden className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns * rows }, (_, index) => {
            const x = index % columns;
            const y = Math.floor(index / columns);
            return <span key={index} className="size-2 rounded-full bg-teal-600 motion-safe:animate-[pui-dot-wave_2.4s_ease-in-out_infinite] dark:bg-teal-300" style={{ animationDelay: `${(x + y) * 0.08}s` }} />;
          })}
        </div>
      </div>
    </>
  );
}
