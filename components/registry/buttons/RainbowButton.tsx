/**
 * @registry
 * name: Rainbow Button
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Bouton noir bordé d'un arc-en-ciel animé avec halo coloré diffus en dessous.
 * prompt: Create a rainbow button: dark pill with a 2px animated rainbow border (two backgrounds: solid padding-box + linear rainbow border-box, background-position animated) and a blurred rainbow glow under it (pseudo element); inverts to a white pill in dark mode. Reduced-motion keeps it static.
 */
export function RainbowButton() {
  return (
    <>
      <style>{`@keyframes pui-rainbow{to{background-position:200% 0}}`}</style>
      <button
        type="button"
        className="group relative inline-flex h-12 items-center rounded-2xl border-2 border-transparent px-8 text-sm font-semibold text-white [background:linear-gradient(#09090b,#09090b)_padding-box,linear-gradient(90deg,#f43f5e,#f59e0b,#22c55e,#06b6d4,#8b5cf6,#f43f5e)_border-box] [background-size:100%_100%,200%_100%] motion-safe:animate-[pui-rainbow_3s_linear_infinite] dark:text-zinc-950 dark:[background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(90deg,#f43f5e,#f59e0b,#22c55e,#06b6d4,#8b5cf6,#f43f5e)_border-box] dark:[background-size:100%_100%,200%_100%]"
      >
        <span aria-hidden className="absolute -bottom-3 left-1/2 -z-10 h-4 w-4/5 -translate-x-1/2 bg-[linear-gradient(90deg,#f43f5e,#f59e0b,#22c55e,#06b6d4,#8b5cf6)] opacity-60 blur-xl transition group-hover:opacity-90" />
        Get unlimited access
      </button>
    </>
  );
}
