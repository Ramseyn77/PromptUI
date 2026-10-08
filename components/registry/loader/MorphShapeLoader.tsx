/**
 * @registry
 * name: Morph Shape Loader
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Forme qui se transforme en boucle de carré en cercle puis en losange en tournant et en changeant de teinte.
 * prompt: Create a morphing shape loader: a single element animating border-radius, rotation and background color through square → circle → rotated square (diamond) → back, 2.4s loop with smooth easing, plus three small dots under it pulsing in sequence; role="status" with sr-only text. Static square with reduced motion. Light and dark mode.
 */
export function MorphShapeLoader() {
  return (
    <div role="status" className="flex flex-col items-center gap-6">
      <style>{`@keyframes pui-morph{0%{border-radius:12%;transform:rotate(0);background:#14b8a6}33%{border-radius:50%;transform:rotate(120deg);background:#8b5cf6}66%{border-radius:12%;transform:rotate(225deg) scale(.85);background:#f43f5e}100%{border-radius:12%;transform:rotate(360deg);background:#14b8a6}}
@keyframes pui-morph-dot{0%,100%{opacity:.25;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}`}</style>
      <span aria-hidden className="block size-14 rounded-xl bg-teal-500 motion-safe:animate-[pui-morph_2.4s_cubic-bezier(.65,0,.35,1)_infinite]" />
      <span aria-hidden className="flex gap-1.5">{[0, 1, 2].map((dot) => <span key={dot} className="size-1.5 rounded-full bg-zinc-500 motion-safe:animate-[pui-morph-dot_1.2s_ease-in-out_infinite] dark:bg-zinc-400" style={{ animationDelay: `${dot * 0.2}s` }} />)}</span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
