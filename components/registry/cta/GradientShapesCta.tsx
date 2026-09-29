/**
 * @registry
 * name: Gradient Shapes CTA
 * category: CTA
 * style: Gradient
 * tags: featured, recent
 * description: Grande carte d appel a l action en degrade avec formes geometriques flottantes en arriere-plan.
 * prompt: Create a bold CTA card with a violet-to-indigo gradient, decorative floating shapes (circle, rounded square, ring) drifting slowly with keyframes behind the content, centered headline, subtitle and two buttons (solid white + ghost). Reduced-motion safe; looks good in both themes.
 */
export function GradientShapesCta() {
  return (
    <>
      <style>{`@keyframes pui-shape-a{50%{transform:translate(20px,-14px) rotate(20deg)}}@keyframes pui-shape-b{50%{transform:translate(-18px,12px) rotate(-25deg)}}`}</style>
      <section className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-600 px-6 py-16 text-center text-white">
        <span aria-hidden className="absolute -left-6 top-6 size-28 rounded-full bg-white/10 motion-safe:animate-[pui-shape-a_9s_ease-in-out_infinite]" />
        <span aria-hidden className="absolute bottom-6 right-10 size-20 rounded-3xl bg-amber-300/30 motion-safe:animate-[pui-shape-b_11s_ease-in-out_infinite]" />
        <span aria-hidden className="absolute right-1/4 top-8 size-14 rounded-full border-4 border-white/20 motion-safe:animate-[pui-shape-a_13s_ease-in-out_infinite]" />
        <div className="relative mx-auto max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to design at full speed?</h2>
          <p className="mt-3 text-white/85">Start free, upgrade when your team grows. No credit card required.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg hover:bg-white/90">Start for free</a>
            <a href="#" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10">Talk to sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
