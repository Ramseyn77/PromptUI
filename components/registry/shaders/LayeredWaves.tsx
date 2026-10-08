/**
 * @registry
 * name: Layered Waves
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Trois vagues SVG superposées qui glissent à des vitesses différentes au bas d'un encart, effet parallaxe marin.
 * prompt: Create layered animated waves: three SVG wave paths (repeating tile, 200% width) stacked at the bottom of a card in teal shades with increasing opacity, each translating horizontally in a seamless loop at a different speed and direction; headline above the waves. Paused with reduced motion. Light (sky) and dark (night ocean) palettes.
 */
export function LayeredWaves() {
  const wave = 'M0 40 C 80 10, 160 70, 240 40 S 400 10, 480 40 S 640 70, 720 40 S 880 10, 960 40 V 100 H 0 Z';

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-b from-sky-100 to-cyan-50 dark:from-slate-950 dark:to-cyan-950">
      <style>{`@keyframes pui-wave-left{to{transform:translateX(-50%)}}@keyframes pui-wave-right{from{transform:translateX(-50%)}to{transform:translateX(0)}}@media (prefers-reduced-motion:reduce){.pui-wave{animation:none!important}}`}</style>
      <div className="relative px-7 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Surf report</p>
        <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">1.8 m swell, offshore wind</p>
      </div>
      {[['fill-cyan-300/50 dark:fill-cyan-700/40', '22s', 'pui-wave-left', 'bottom-10'], ['fill-cyan-400/60 dark:fill-cyan-600/50', '15s', 'pui-wave-right', 'bottom-5'], ['fill-teal-500/80 dark:fill-teal-500/70', '10s', 'pui-wave-left', 'bottom-0']].map(([tone, speed, name, bottom]) => (
        <svg key={speed} aria-hidden viewBox="0 0 960 100" preserveAspectRatio="none" className={`pui-wave absolute left-0 h-24 w-[200%] ${bottom}`} style={{ animation: `${name} ${speed} linear infinite` }}>
          <path d={wave} className={tone} />
        </svg>
      ))}
    </div>
  );
}
