/**
 * @registry
 * name: Glow Lines
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Lignes horizontales parcourues par des impulsions lumineuses à vitesses différentes.
 * prompt: Create a "data stream" background: 7 thin horizontal lines, each with a short glowing gradient pulse (box-shadow glow) traveling left to right at its own speed and delay. Pulse colors teal/violet; line color adapts to light and dark mode, reduced-motion safe.
 */
export function GlowLines() {
  const lines = Array.from({ length: 7 }, (_, index) => ({ top: 14 + index * 12, duration: 2.4 + (index % 3) * 0.9, delay: -index * 0.6, color: index % 2 ? '#8b5cf6' : '#14b8a6' }));

  return (
    <>
      <style>{`@keyframes pui-pulse-run{from{transform:translateX(-120px)}to{transform:translateX(640px)}}`}</style>
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-3xl bg-white dark:bg-zinc-950">
        {lines.map((line) => (
          <div key={line.top} aria-hidden className="absolute inset-x-0 h-px bg-zinc-200 dark:bg-zinc-800" style={{ top: `${line.top}%` }}>
            <span className="absolute -top-px h-[3px] w-28 rounded-full motion-safe:animate-[pui-pulse-run_linear_infinite]" style={{ background: `linear-gradient(90deg, transparent, ${line.color})`, boxShadow: `0 0 12px 1px ${line.color}`, animationDuration: `${line.duration}s`, animationDelay: `${line.delay}s` }} />
          </div>
        ))}
      </div>
    </>
  );
}
