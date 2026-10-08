/**
 * @registry
 * name: Orbit Rings
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Anneaux concentriques en rotation avec des satellites colorés, autour d'un noyau central.
 * prompt: Create an orbiting system: three concentric rings (border only) rotating at different speeds and directions, each carrying one or two colored satellite dots, around a glowing center logo tile. Ring color adapts to light/dark, reduced-motion safe.
 */
export function OrbitRings() {
  const rings = [
    { size: 'size-24', duration: '8s', reverse: false, dots: ['bg-teal-500'] },
    { size: 'size-40', duration: '14s', reverse: true, dots: ['bg-violet-500', 'bg-amber-400'] },
    { size: 'size-56', duration: '22s', reverse: false, dots: ['bg-rose-400', 'bg-sky-400'] },
  ];

  return (
    <>
      <style>{`@keyframes pui-orbit-ring{to{transform:rotate(360deg)}}`}</style>
      <div className="grid h-64 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-white dark:bg-zinc-950">
        <div className="relative grid size-56 place-items-center">
          {rings.map((ring) => (
            <div key={ring.size} aria-hidden className={`absolute ${ring.size} rounded-full border border-zinc-200 motion-safe:animate-[pui-orbit-ring_linear_infinite] dark:border-zinc-800`} style={{ animationDuration: ring.duration, animationDirection: ring.reverse ? 'reverse' : 'normal' }}>
              {ring.dots.map((dot, index) => <span key={dot} className={`absolute left-1/2 size-3 -translate-x-1/2 rounded-full shadow-md ${index ? 'bottom-0 translate-y-1/2' : 'top-0 -translate-y-1/2'} ${dot}`} />)}
            </div>
          ))}
          <span className="relative grid size-12 place-items-center rounded-2xl bg-zinc-950 text-sm font-bold text-white shadow-[0_0_30px_rgba(20,184,166,.5)] dark:bg-white dark:text-zinc-950">P</span>
        </div>
      </div>
    </>
  );
}
