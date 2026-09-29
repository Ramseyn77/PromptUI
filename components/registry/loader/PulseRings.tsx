/**
 * @registry
 * name: Pulse Rings
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Point central entoure d anneaux qui s elargissent et s estompent, facon radar.
 * prompt: Create a radar-pulse loader: a solid center dot and three rings expanding from it and fading out with staggered delays; label "Searching nearby…" below. role="status". Teal on light and dark backgrounds, reduced-motion safe.
 */
export function PulseRings() {
  return (
    <>
      <style>{`@keyframes pui-radar{from{transform:scale(.3);opacity:.8}to{transform:scale(1);opacity:0}}`}</style>
      <div role="status" className="flex flex-col items-center gap-4">
        <div aria-hidden className="relative grid size-24 place-items-center">
          {[0, 1, 2].map((ring) => <span key={ring} className="absolute inset-0 rounded-full border-2 border-teal-500 motion-safe:animate-[pui-radar_2.4s_ease-out_infinite]" style={{ animationDelay: `${ring * 0.8}s` }} />)}
          <span className="size-4 rounded-full bg-teal-500 shadow-[0_0_16px_rgba(20,184,166,.8)]" />
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Searching nearby…</p>
      </div>
    </>
  );
}
