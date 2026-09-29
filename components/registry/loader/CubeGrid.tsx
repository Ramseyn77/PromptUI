/**
 * @registry
 * name: Cube Grid
 * category: Loader
 * style: Dark
 * tags: recent
 * description: Grille 3x3 de cubes qui s agrandissent et retrecissent en vague diagonale.
 * prompt: Create a 3x3 cube-grid loader: nine squares scaling down to zero and back with animation delays based on their diagonal (row + column), in a teal gradient. role="status" + sr-only label, reduced-motion safe, works on light and dark.
 */
export function CubeGrid() {
  return (
    <>
      <style>{`@keyframes pui-cube{0%,70%,100%{transform:scale(1)}35%{transform:scale(0)}}`}</style>
      <div role="status" className="grid size-14 grid-cols-3 gap-1">
        {Array.from({ length: 9 }, (_, index) => {
          const diagonal = Math.floor(index / 3) + (index % 3);
          return <span key={index} aria-hidden className="rounded-sm bg-gradient-to-br from-teal-400 to-teal-600 motion-safe:animate-[pui-cube_1.3s_ease-in-out_infinite]" style={{ animationDelay: `${diagonal * 0.1}s` }} />;
        })}
        <span className="sr-only">Loading</span>
      </div>
    </>
  );
}
