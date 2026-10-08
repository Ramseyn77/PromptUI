/**
 * @registry
 * name: Flipping Square
 * category: Loader
 * style: Gradient
 * tags: recent
 * description: Carré en dégradé qui se retourne en 3D sur ses axes X et Y alternativement.
 * prompt: Create a 3D flipping-square loader: a gradient square in a perspective container rotating rotateX then rotateY in sequence (keyframes 0/50/100), with a soft reflection shadow below that shrinks mid-flip. role="status". Works on light and dark, reduced-motion safe.
 */
export function FlippingSquare() {
  return (
    <>
      <style>{`@keyframes pui-flip-square{0%{transform:perspective(200px) rotateX(0) rotateY(0)}50%{transform:perspective(200px) rotateX(-180deg) rotateY(0)}100%{transform:perspective(200px) rotateX(-180deg) rotateY(-180deg)}}@keyframes pui-flip-shadow{50%{transform:scaleX(.5);opacity:.2}}`}</style>
      <div role="status" className="flex flex-col items-center gap-3">
        <span aria-hidden className="size-10 rounded-lg bg-gradient-to-br from-violet-500 to-teal-400 motion-safe:animate-[pui-flip-square_1.4s_ease-in-out_infinite]" />
        <span aria-hidden className="h-1.5 w-10 rounded-full bg-zinc-900/20 motion-safe:animate-[pui-flip-shadow_1.4s_ease-in-out_infinite] dark:bg-white/20" />
        <span className="sr-only">Loading</span>
      </div>
    </>
  );
}
