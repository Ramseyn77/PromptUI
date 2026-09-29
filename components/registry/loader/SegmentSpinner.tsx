/**
 * @registry
 * name: Segment Spinner
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Spinner classique a 12 segments qui s estompent tour a tour, facon systeme.
 * prompt: Create a system-style activity indicator: 12 rounded segments rotated around a center, each fading from opaque to 15% opacity with staggered negative delays so the fade appears to rotate. Uses currentColor (zinc in light, white in dark). role="status" + sr-only label.
 */
export function SegmentSpinner() {
  return (
    <>
      <style>{`@keyframes pui-segment{from{opacity:1}to{opacity:.15}}`}</style>
      <div role="status" className="flex items-center gap-8 text-zinc-700 dark:text-zinc-200">
        {['size-6', 'size-10'].map((size) => (
          <span key={size} aria-hidden className={`relative ${size}`}>
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} className="absolute left-[46%] top-0 h-[28%] w-[8%] rounded-full bg-current motion-safe:animate-[pui-segment_1s_linear_infinite]" style={{ transform: `rotate(${index * 30}deg)`, transformOrigin: '50% 178%', animationDelay: `${(index - 12) / 12}s` }} />
            ))}
          </span>
        ))}
        <span className="sr-only">Loading</span>
      </div>
    </>
  );
}
