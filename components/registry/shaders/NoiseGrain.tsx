/**
 * @registry
 * name: Noise Grain
 * category: Shaders
 * style: Editorial
 * tags: recent
 * description: Degrade avec grain photographique genere par un filtre SVG feTurbulence qui scintille.
 * prompt: Create a grainy gradient card: a teal-to-violet gradient overlaid with SVG feTurbulence noise (inline data-URI filter) at low opacity with mix-blend-mode overlay, jittered by a steps() keyframe for a film-grain flicker. Title on top. Light and dark mode.
 */
const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function NoiseGrain() {
  return (
    <>
      <style>{`@keyframes pui-grain{0%{transform:translate(0,0)}25%{transform:translate(-5%,3%)}50%{transform:translate(4%,-4%)}75%{transform:translate(-3%,-2%)}100%{transform:translate(0,0)}}`}</style>
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-teal-300 via-sky-400 to-violet-500 dark:from-teal-900 dark:via-slate-900 dark:to-violet-950">
        <div aria-hidden className="absolute -inset-[20%] opacity-40 mix-blend-overlay motion-safe:animate-[pui-grain_.8s_steps(4)_infinite] dark:opacity-30" style={{ backgroundImage: noise }} />
        <div className="relative flex h-full flex-col justify-end p-6">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/80">Texture</p>
          <p className="mt-1 text-2xl font-semibold text-white">Film grain gradient</p>
        </div>
      </div>
    </>
  );
}
