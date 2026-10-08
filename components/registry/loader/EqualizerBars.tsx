/**
 * @registry
 * name: Equalizer Bars
 * category: Loader
 * style: Gradient
 * tags: recent
 * description: Barres d'égaliseur audio qui montent et descendent à des rythmes différents.
 * prompt: Create an audio-equalizer loader: 5 rounded bars with a teal-to-violet vertical gradient scaling on Y from the bottom at different durations/delays, plus a "Buffering…" caption. role="status". Light and dark mode, reduced-motion safe.
 */
export function EqualizerBars() {
  const bars = [0.9, 1.2, 0.7, 1.05, 0.8];
  return (
    <>
      <style>{`@keyframes pui-eq{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}`}</style>
      <div role="status" className="flex flex-col items-center gap-3">
        <div aria-hidden className="flex h-12 items-end gap-1.5">
          {bars.map((duration, index) => <span key={index} className="h-full w-2 origin-bottom rounded-full bg-gradient-to-t from-teal-500 to-violet-500 motion-safe:animate-[pui-eq_ease-in-out_infinite]" style={{ animationDuration: `${duration}s`, animationDelay: `${index * -0.2}s` }} />)}
        </div>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Buffering…</p>
      </div>
    </>
  );
}
