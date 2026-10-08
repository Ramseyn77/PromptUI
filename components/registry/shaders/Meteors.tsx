/**
 * @registry
 * name: Meteors
 * category: Shaders
 * style: Dark
 * tags: featured, recent
 * description: Pluie de météores lumineux traversant une carte en diagonale, avec traînées dégradées.
 * prompt: Create a meteor shower card: 18 meteors (small bright dot with a 50px gradient tail) placed at deterministic pseudo-random left offsets, delays and durations (no Math.random during render, to stay hydration safe), each traveling diagonally at 215deg and fading out. Content card on top with title and text. Hidden meteors with reduced motion. Dark night look in both themes.
 */
export function Meteors() {
  const meteors = Array.from({ length: 18 }, (_, index) => ({
    left: (index * 37) % 100,
    delay: ((index * 7) % 10) * 0.45,
    duration: 3 + ((index * 5) % 6) * 0.6,
  }));

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-[#020617] to-[#0f172a]">
      <style>{`@keyframes pui-meteor{0%{transform:rotate(215deg) translateX(0);opacity:1}70%{opacity:1}100%{transform:rotate(215deg) translateX(-560px);opacity:0}}`}</style>
      <div aria-hidden className="motion-reduce:hidden">
        {meteors.map((meteor, index) => (
          <span
            key={index}
            className="absolute top-0 size-0.5 rounded-full bg-slate-200 shadow-[0_0_0_1px_#ffffff10] before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-slate-300 before:to-transparent before:content-['']"
            style={{ left: `${meteor.left - 10}%`, top: -10, animation: `pui-meteor ${meteor.duration}s linear ${meteor.delay}s infinite` }}
          />
        ))}
      </div>
      <div className="relative flex h-full flex-col justify-end p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Perseids · Aug 12</p>
        <p className="mt-2 text-3xl font-bold text-white">Make a wish</p>
        <p className="mt-1 max-w-xs text-sm text-slate-400">Up to 100 meteors per hour at peak. Best seen after midnight.</p>
      </div>
    </div>
  );
}
