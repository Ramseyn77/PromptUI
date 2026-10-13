/**
 * @registry
 * name: Atom Orbit Loader
 * category: Loader
 * style: Gradient
 * tags: recent
 * description: Loader en forme d'atome : trois orbites elliptiques inclinées avec un électron chacune, noyau pulsant en dégradé, vitesses décalées.
 * prompt: Create an atom loader: a pulsing gradient nucleus in the center and three elliptical orbit rings rotated at 0°, 60° and 120°, each with an electron dot traveling along it (achieved by rotating a wrapper while the ring is squashed with scaleY) at slightly different speeds; electrons glow; role=status with sr-only "Loading"; reduced motion keeps the static atom. Light and dark mode.
 */
export function AtomOrbitLoader() {
  const orbits = [[0, 1.4, '#8b5cf6'], [60, 1.8, '#ec4899'], [120, 2.2, '#06b6d4']] as const;

  return (
    <div role="status" className="grid place-items-center p-10">
      <style>{`
        @keyframes pui-electron { to { transform: rotate(360deg) } }
        @keyframes pui-nucleus { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.15) } }
      `}</style>
      <div aria-hidden className="relative size-36">
        {orbits.map(([angle, speed, color]) => (
          <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="absolute inset-0 [transform:scaleY(0.38)]">
              <span className="absolute inset-0 rounded-full border-2 border-zinc-300/70 dark:border-white/15" />
              <span className="absolute inset-0 motion-safe:animate-[pui-electron_var(--speed)_linear_infinite]" style={{ ['--speed' as string]: `${speed}s` }}>
                <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full [transform:scaleY(2.6)]" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
              </span>
            </div>
          </div>
        ))}
        <span className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_24px_rgba(168,85,247,0.6)] motion-safe:animate-[pui-nucleus_1.6s_ease-in-out_infinite]" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
