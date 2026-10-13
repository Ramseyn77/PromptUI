/**
 * @registry
 * name: Letter Drop Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Lettres qui tombent du haut et rebondissent en se posant une par une, chaque lettre teintée d'un dégradé, relance au survol du titre.
 * prompt: Create a letter drop headline: each letter falls from above with a bounce (keyframe with overshoot and squash) and a staggered delay, colored with a per-letter hue step across a warm-to-cool gradient; hovering or focusing the headline re-triggers the drop by alternating between two identical keyframe names (so the element is not remounted); full text in sr-only, letters aria-hidden; reduced motion shows letters in place. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function LetterDropText({ text = 'Drop it like it’s hot' }: { text?: string }) {
  const [round, setRound] = useState(0);
  const name = `pui-letter-drop-${round % 2}`;
  const frames = 'from { opacity: 0; transform: translateY(-1.2em) scaleY(1.1) } 60% { opacity: 1; transform: translateY(.12em) scaleY(.85) } 80% { transform: translateY(-.05em) scaleY(1.04) } to { opacity: 1; transform: none }';

  return (
    <div className="flex justify-center p-8">
      <style>{`@keyframes pui-letter-drop-0 { ${frames} } @keyframes pui-letter-drop-1 { ${frames} } @media (prefers-reduced-motion: reduce) { .pui-drop-letter { animation: none !important } }`}</style>
      <h2 tabIndex={0} onMouseEnter={() => setRound(round + 1)} onFocus={() => setRound(round + 1)} className="cursor-default rounded-lg text-center text-5xl font-black tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:text-6xl">
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {text.split('').map((char, index) => <span key={index} className="pui-drop-letter inline-block origin-bottom" style={{ color: `hsl(${(20 + index * 14) % 360} 85% 55%)`, animation: `${name} .7s cubic-bezier(.3,.8,.4,1) ${index * 40}ms both` }}>{char === ' ' ? ' ' : char}</span>)}
        </span>
      </h2>
    </div>
  );
}
