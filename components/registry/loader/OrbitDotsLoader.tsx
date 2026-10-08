/**
 * @registry
 * name: Orbit Dots Loader
 * category: Loader
 * style: Gradient
 * tags: recent
 * description: Loader avec trois points en orbite autour d'un noyau qui respire.
 * prompt: Create a loader: three colored dots orbiting a ring with offset animation delays around a breathing gradient core, role="status" with a visible label. Neutral ring color in light and dark mode, reduced-motion safe.
 */
export function OrbitDotsLoader() {
  return (
    <>
      <style>{`@keyframes pui-orbit{to{transform:rotate(360deg)}}@keyframes pui-breathe{50%{transform:scale(.8);opacity:.6}}`}</style>
      <div role="status" className="flex flex-col items-center gap-5">
        <div className="relative size-20">
          <span className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-800" />
          <span className="absolute inset-[30%] rounded-full bg-gradient-to-br from-teal-400 to-violet-500 motion-safe:animate-[pui-breathe_1.6s_ease-in-out_infinite]" />
          {[
            { color: 'bg-teal-500', duration: '1.4s', delay: '0s' },
            { color: 'bg-violet-500', duration: '1.4s', delay: '-.47s' },
            { color: 'bg-amber-400', duration: '1.4s', delay: '-.93s' },
          ].map((dot) => (
            <span
              key={dot.color}
              className="absolute inset-0 motion-safe:animate-[pui-orbit_linear_infinite]"
              style={{ animationDuration: dot.duration, animationDelay: dot.delay }}
            >
              <span className={`absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm ${dot.color}`} />
            </span>
          ))}
        </div>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Generating your layout…</p>
      </div>
    </>
  );
}
