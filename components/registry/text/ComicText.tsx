/**
 * @registry
 * name: Comic Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Onomatopée façon bande dessinée avec contour épais, trame de points et apparition en pop.
 * prompt: Create comic book text: a burst-shaped yellow panel (clip-path polygon star) with a halftone dot background, holding a huge skewed word "BOOM!" with thick black text-stroke, red-to-yellow gradient fill clipped to text and a hard offset drop shadow; it pops in with an overshoot scale/rotate animation on mount and on click (replay). Same vivid palette in light and dark. Reduced motion skips the pop.
 */
'use client';
import { useState } from 'react';

export function ComicText() {
  const [run, setRun] = useState(0);

  return (
    <button type="button" aria-label="Boom! Click to replay" onClick={() => setRun((value) => value + 1)} className="relative grid h-64 w-full max-w-md place-items-center outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
      <style>{`@keyframes pui-comic{0%{transform:scale(.2) rotate(-25deg);opacity:0}60%{transform:scale(1.15) rotate(4deg);opacity:1}100%{transform:scale(1) rotate(-6deg)}}`}</style>
      <span aria-hidden className="absolute inset-4 bg-[#facc15] bg-[radial-gradient(#00000026_1.5px,transparent_1.6px)] bg-[length:10px_10px] [clip-path:polygon(50%_0,61%_25%,90%_10%,78%_40%,100%_50%,78%_62%,92%_92%,60%_76%,50%_100%,40%_76%,8%_92%,22%_62%,0_50%,22%_40%,10%_10%,39%_25%)]" />
      <span key={run} aria-hidden className="relative -rotate-6 bg-gradient-to-b from-[#ef4444] to-[#f97316] bg-clip-text text-7xl font-black italic text-transparent [-webkit-text-stroke:3px_#111] [filter:drop-shadow(5px_5px_0_#111)] motion-safe:animate-[pui-comic_.6s_cubic-bezier(.34,1.56,.64,1)_both] sm:text-8xl">BOOM!</span>
    </button>
  );
}
