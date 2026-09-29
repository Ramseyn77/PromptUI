/**
 * @registry
 * name: Aurora Curtain
 * category: Shaders
 * style: Dark
 * tags: featured, recent
 * description: Rideau d aurore boreale fait de bandes verticales floues qui ondulent sur un ciel nocturne.
 * prompt: Create a northern-lights background: several tall blurred gradient bands (green, teal, violet) skewed and swaying with offset keyframes, mix-blend screen, over a night-sky gradient with a few static stars. Always a night scene; reduced-motion safe.
 */
export function AuroraCurtain() {
  const bands = [
    { left: '10%', color: 'from-emerald-400/70', delay: '0s' },
    { left: '30%', color: 'from-teal-300/70', delay: '-2s' },
    { left: '52%', color: 'from-violet-400/60', delay: '-4s' },
    { left: '72%', color: 'from-emerald-300/60', delay: '-6s' },
  ];

  return (
    <>
      <style>{`@keyframes pui-sway{0%,100%{transform:skewX(-14deg) translateX(0) scaleY(1)}50%{transform:skewX(10deg) translateX(18px) scaleY(1.15)}}`}</style>
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-b from-[#020617] via-[#0b1030] to-[#111827]">
        {[[12, 18], [80, 30], [140, 12], [260, 40], [340, 22], [420, 14], [500, 34]].map(([x, y]) => <span key={x} aria-hidden className="absolute size-0.5 rounded-full bg-white/80" style={{ left: x, top: y }} />)}
        {bands.map((band) => (
          <div key={band.left} aria-hidden className={`absolute top-0 h-3/4 w-24 origin-top bg-gradient-to-b ${band.color} to-transparent mix-blend-screen blur-2xl motion-safe:animate-[pui-sway_9s_ease-in-out_infinite]`} style={{ left: band.left, animationDelay: band.delay }} />
        ))}
        <p className="absolute bottom-5 left-6 text-sm font-medium text-emerald-100/90">Aurora · 68°N</p>
      </div>
    </>
  );
}
