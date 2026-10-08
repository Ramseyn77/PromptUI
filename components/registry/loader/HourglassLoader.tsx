/**
 * @registry
 * name: Hourglass Loader
 * category: Loader
 * style: Editorial
 * tags: recent
 * description: Sablier en SVG dont le sable s'écoule puis qui se retourne en boucle.
 * prompt: Create an hourglass loader in SVG: two triangular glass halves, sand in the top half shrinking (scaleY from bottom) while the bottom pile grows, a thin falling stream, and the whole hourglass flipping 180° at the end of each cycle via keyframes. role="status". Warm amber sand, frame adapts to light/dark.
 */
export function HourglassLoader() {
  return (
    <>
      <style>{`@keyframes pui-flip{0%,85%{transform:rotate(0)}100%{transform:rotate(180deg)}}@keyframes pui-sand-top{0%{transform:scaleY(1)}85%,100%{transform:scaleY(0)}}@keyframes pui-sand-bottom{0%{transform:scaleY(0)}85%,100%{transform:scaleY(1)}}@keyframes pui-stream{0%,80%{opacity:1}85%,100%{opacity:0}}`}</style>
      <div role="status" className="flex flex-col items-center gap-3">
        <svg aria-hidden viewBox="0 0 40 60" className="h-16 origin-center text-zinc-800 motion-safe:animate-[pui-flip_2.4s_ease-in-out_infinite] dark:text-zinc-200">
          <path d="M8 4h24M8 56h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M10 6c0 12 10 16 10 24S10 42 10 54h20c0-12-10-16-10-24s10-12 10-24z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 9h14c-1 7-5 12-7 16-2-4-6-9-7-16z" fill="#f59e0b" className="origin-bottom motion-safe:animate-[pui-sand-top_2.4s_linear_infinite]" style={{ transformBox: 'fill-box' }} />
          <rect x="19.4" y="28" width="1.2" height="22" fill="#f59e0b" className="motion-safe:animate-[pui-stream_2.4s_linear_infinite]" />
          <path d="M12 53c2-6 5-9 8-10 3 1 6 4 8 10z" fill="#f59e0b" className="origin-bottom motion-safe:animate-[pui-sand-bottom_2.4s_linear_infinite]" style={{ transformBox: 'fill-box' }} />
        </svg>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">Just a moment…</span>
      </div>
    </>
  );
}
