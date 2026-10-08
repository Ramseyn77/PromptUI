/**
 * @registry
 * name: Neon Button
 * category: Buttons
 * style: Dark
 * tags: recent
 * description: Bouton néon qui s'allume au survol avec halo diffus et reflet au sol, sur scène sombre.
 * prompt: Create a neon outline button on a dark stage: thin cyan border and text, on hover/focus it fills with cyan, the text turns dark, and layered box-shadows create a glow plus a blurred reflection below (pseudo element). Slight flicker keyframe on first hover; reduced-motion safe. Stage stays dark in both themes.
 */
export function NeonButton() {
  return (
    <>
      <style>{`@keyframes pui-flicker{0%,19%,21%,23%,25%,54%,56%,100%{opacity:1}20%,24%,55%{opacity:.4}}`}</style>
      <div className="grid place-items-center rounded-3xl bg-zinc-950 px-16 py-14">
        <button type="button" className="group relative rounded-lg border-2 border-cyan-400 px-8 py-3 font-mono text-sm font-bold uppercase tracking-[.2em] text-cyan-300 transition duration-300 hover:bg-cyan-400 hover:text-zinc-950 hover:shadow-[0_0_10px_#22d3ee,0_0_40px_#22d3ee,0_0_80px_#22d3ee] focus-visible:bg-cyan-400 focus-visible:text-zinc-950 focus-visible:outline-none focus-visible:shadow-[0_0_10px_#22d3ee,0_0_40px_#22d3ee] motion-safe:hover:animate-[pui-flicker_1.2s_linear_1]">
          Enter the grid
          <span aria-hidden className="absolute inset-x-0 top-full mt-3 h-4 origin-top scale-y-[-1] rounded-lg bg-cyan-400 opacity-0 blur-lg transition group-hover:opacity-50" />
        </button>
      </div>
    </>
  );
}
