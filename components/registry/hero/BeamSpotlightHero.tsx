/**
 * @registry
 * name: Beam Spotlight Hero
 * category: Hero
 * style: Dark
 * tags: featured, recent
 * description: Hero sombre éclairé par un faisceau conique qui balaie doucement le titre.
 * prompt: Create a dark hero lit by a slowly swinging conic-gradient light beam from the top (rotating keyframe, blurred), with a headline in a white-to-gray gradient, subtitle and CTA. Always dark (it is a stage), reduced-motion safe.
 */
export function BeamSpotlightHero() {
  return (
    <>
      <style>{`@keyframes pui-beam-swing{0%,100%{transform:translateX(-50%) rotate(-12deg)}50%{transform:translateX(-50%) rotate(12deg)}}`}</style>
      <section className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-zinc-950 px-6 py-24 text-center">
        <div
          aria-hidden
          className="absolute left-1/2 top-[-40%] h-[140%] w-[70%] origin-top bg-[conic-gradient(from_180deg_at_50%_0%,transparent_40%,rgba(45,212,191,.35)_50%,transparent_60%)] blur-2xl motion-safe:animate-[pui-beam-swing_9s_ease-in-out_infinite]"
          style={{ transform: 'translateX(-50%)' }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-6xl">Illuminate every release</h1>
          <p className="mx-auto mt-5 max-w-lg text-zinc-400">Observability that points straight at what changed, before your users notice.</p>
          <button type="button" className="mt-8 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-teal-950 transition hover:bg-teal-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/40">Start monitoring</button>
        </div>
      </section>
    </>
  );
}
