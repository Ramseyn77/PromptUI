/**
 * @registry
 * name: Sparkles Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Titre entoure d etincelles en etoile qui apparaissent et scintillent a des positions variees.
 * prompt: Create a sparkles text effect: a bold headline with 6 four-point star SVGs positioned around it (deterministic positions), each scaling/rotating in and out with staggered delays; stars in amber/violet, aria-hidden. Reduced-motion safe, light and dark mode.
 */
const stars = [
  { top: '-10%', left: '4%', size: 14, color: '#f59e0b', delay: 0 },
  { top: '10%', left: '92%', size: 18, color: '#8b5cf6', delay: 0.4 },
  { top: '78%', left: '12%', size: 12, color: '#8b5cf6', delay: 0.8 },
  { top: '70%', left: '80%', size: 16, color: '#f59e0b', delay: 1.2 },
  { top: '-18%', left: '55%', size: 11, color: '#14b8a6', delay: 1.6 },
  { top: '90%', left: '48%', size: 13, color: '#14b8a6', delay: 2 },
];

export function SparklesText() {
  return (
    <>
      <style>{`@keyframes pui-sparkle{0%,100%{transform:scale(0) rotate(0);opacity:0}50%{transform:scale(1) rotate(90deg);opacity:1}}`}</style>
      <h2 className="relative inline-block px-6 py-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
        Magic moments
        {stars.map((star) => (
          <svg key={`${star.top}-${star.left}`} aria-hidden viewBox="0 0 24 24" width={star.size} height={star.size} className="pointer-events-none absolute motion-safe:animate-[pui-sparkle_2.4s_ease-in-out_infinite]" style={{ top: star.top, left: star.left, animationDelay: `${star.delay}s` }}>
            <path d="M12 0c.6 6 5.4 11.4 12 12-6.6.6-11.4 6-12 12-.6-6-5.4-11.4-12-12C6.6 11.4 11.4 6 12 0z" fill={star.color} />
          </svg>
        ))}
      </h2>
    </>
  );
}
