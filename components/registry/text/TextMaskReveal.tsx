/**
 * @registry
 * name: Text Mask Reveal
 * category: Text
 * style: Dark
 * tags: recent
 * description: Grand mot qui sert de fenêtre sur un paysage animé : le dégradé défile à l'intérieur des lettres.
 * prompt: Create a text-mask headline: huge bold letters filled (background-clip:text) with a layered animated scene (sky gradient, sun, mountain bands) whose background-position pans slowly; hovering speeds the pan; a subtitle beneath. Static with reduced motion. Dark backdrop in both themes for contrast.
 */
export function TextMaskReveal() {
  return (
    <div className="group w-full max-w-2xl rounded-3xl bg-zinc-950 px-6 py-12 text-center">
      <style>{`@keyframes pui-mask-pan{to{background-position:200% 50%}}.pui-mask{animation:pui-mask-pan 14s linear infinite}.group:hover .pui-mask{animation-duration:5s}@media (prefers-reduced-motion:reduce){.pui-mask{animation:none}}`}</style>
      <h3 className="pui-mask bg-[radial-gradient(circle_at_30%_35%,#fde68a_0_8%,transparent_9%),linear-gradient(180deg,#f97316_0%,#ec4899_35%,#6d28d9_60%,#1e1b4b_61%,#312e81_75%,#0f172a_100%)] bg-[length:200%_100%] bg-clip-text text-[length:clamp(3.5rem,16vw,9rem)] font-black leading-none tracking-tighter text-transparent">DUSK</h3>
      <p className="mt-4 text-sm text-zinc-400">A playlist for the golden hour. 42 tracks · 2h 51m</p>
    </div>
  );
}
