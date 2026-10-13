/**
 * @registry
 * name: Integrations Orbit Hero
 * category: Hero
 * style: Dark
 * tags: recent
 * description: Hero sombre avec logo central et intégrations en orbite sur deux anneaux qui tournent en sens inverse, contre-rotation des pastilles.
 * prompt: Create a dark integrations hero: centered headline "Connects to the tools you already use", subcopy and CTA above a visual of a glowing center logo with two concentric orbit rings; app initials chips sit on the rings and the rings rotate in opposite directions while each chip counter-rotates to stay upright; positions are computed from fixed percentages (no runtime randomness); animation stops with reduced motion. Dark in both themes.
 */
const inner = [['SL', '#e11d48'], ['GH', '#52525b'], ['NT', '#0f172a'], ['FG', '#a855f7']];
const outer = [['ST', '#6366f1'], ['LN', '#0ea5e9'], ['HS', '#f97316'], ['ZP', '#f59e0b'], ['AT', '#10b981'], ['DC', '#3b82f6']];
// Chip positions on a ring, as percentages of the ring box (rounded so server and client match).
const ring = (count: number) => Array.from({ length: count }, (_, index) => {
  const angle = (index / count) * Math.PI * 2;
  return { left: `${(50 + 50 * Math.sin(angle)).toFixed(2)}%`, top: `${(50 - 50 * Math.cos(angle)).toFixed(2)}%` };
});

export function IntegrationsOrbitHero() {
  return (
    <section className="w-full overflow-hidden bg-zinc-950 px-6 py-14 text-center text-white">
      <style>{`
        @keyframes pui-orbit-cw { to { transform: rotate(360deg) } }
        @keyframes pui-orbit-ccw { to { transform: rotate(-360deg) } }
        @media (prefers-reduced-motion: reduce) { .pui-orbit, .pui-orbit * { animation: none !important } }
      `}</style>
      <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Connects to the tools you already use</h1>
      <p className="mx-auto mt-4 max-w-lg text-zinc-400">Two-way sync with 120+ apps. Set up in minutes, no code required.</p>
      <a href="#" className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950">Browse integrations</a>
      <div aria-hidden className="pui-orbit relative mx-auto mt-12 size-80 max-w-full">
        {[{ items: outer, size: '100%', anim: 'pui-orbit-cw 40s linear infinite', counter: 'pui-orbit-ccw 40s linear infinite' }, { items: inner, size: '60%', anim: 'pui-orbit-ccw 28s linear infinite', counter: 'pui-orbit-cw 28s linear infinite' }].map(({ items, size, anim, counter }) => (
          <div key={size} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" style={{ width: size, height: size, animation: anim }}>
            {ring(items.length).map((position, index) => <span key={items[index][0]} className="absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl text-[11px] font-bold text-white shadow-lg ring-1 ring-white/20" style={{ ...position, background: items[index][1], animation: counter }}>{items[index][0]}</span>)}
          </div>
        ))}
        <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg font-black shadow-[0_0_60px_rgba(139,92,246,0.7)]">P</span>
      </div>
    </section>
  );
}
