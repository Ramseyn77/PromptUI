/**
 * @registry
 * name: DNA Helix Loader
 * category: Loader
 * style: Dark
 * tags: featured, recent
 * description: Double hélice de points qui ondulent en décalé pour simuler une rotation 3D, sur fond nocturne.
 * prompt: Create a DNA helix loader: 14 columns each with two dots (teal and violet) moving up/down in opposite phase with staggered delays, scaling and fading to fake depth, connected by a thin rung line; "Analyzing sequence…" caption; role="status". Static helix with reduced motion. Dark panel in both themes.
 */
export function DnaHelixLoader() {
  return (
    <div role="status" className="flex w-full max-w-xs flex-col items-center rounded-2xl bg-zinc-950 px-6 py-10 ring-1 ring-white/10">
      <style>{`@keyframes pui-helix-a{0%,100%{transform:translateY(-18px) scale(1);opacity:1}50%{transform:translateY(18px) scale(.55);opacity:.45}}
@keyframes pui-helix-b{0%,100%{transform:translateY(18px) scale(.55);opacity:.45}50%{transform:translateY(-18px) scale(1);opacity:1}}
@keyframes pui-helix-rung{0%,100%{transform:scaleY(1)}25%,75%{transform:scaleY(.1)}50%{transform:scaleY(1)}}
@media (prefers-reduced-motion:reduce){.pui-helix *{animation:none!important}}`}</style>
      <div aria-hidden className="pui-helix flex h-16 items-center gap-2">
        {Array.from({ length: 14 }, (_, index) => {
          const delay = `${index * -0.12}s`;
          return (
            <span key={index} className="relative flex h-full w-2 items-center justify-center">
              <span className="absolute h-9 w-px origin-center bg-white/15" style={{ animation: `pui-helix-rung 1.6s ease-in-out ${delay} infinite` }} />
              <span className="absolute size-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" style={{ animation: `pui-helix-a 1.6s ease-in-out ${delay} infinite` }} />
              <span className="absolute size-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" style={{ animation: `pui-helix-b 1.6s ease-in-out ${delay} infinite` }} />
            </span>
          );
        })}
      </div>
      <p className="mt-6 font-mono text-xs tracking-wider text-zinc-400">Analyzing sequence…</p>
    </div>
  );
}
