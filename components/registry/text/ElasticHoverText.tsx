/**
 * @registry
 * name: Elastic Hover Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Titre dont chaque lettre s'étire et rebondit élastiquement au survol, avec propagation aux voisines et dégradé qui suit la lettre active.
 * prompt: Create an elastic hover headline: each letter is an inline-block span; hovering (or moving the pointer across) a letter scales it up vertically with a springy cubic-bezier and its neighbours scale by smaller amounts (falloff by distance), the active letter gets a gradient color; leaving resets smoothly; keyboard users can focus the headline and use arrow keys to move the "active" letter; full text in sr-only, letters aria-hidden; reduced motion disables the stretch. Light and dark mode.
 */
'use client';
import { useState, type KeyboardEvent } from 'react';

export function ElasticHoverText({ text = 'Stretch me' }: { text?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const letters = text.split('');

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') setActive(Math.min(letters.length - 1, (active ?? -1) + 1));
    if (event.key === 'ArrowLeft') setActive(Math.max(0, (active ?? letters.length) - 1));
    if (event.key === 'Escape') setActive(null);
  }

  return (
    <div className="flex justify-center p-8">
      <h2 tabIndex={0} onKeyDown={onKeyDown} onBlur={() => setActive(null)} onMouseLeave={() => setActive(null)} className="cursor-default select-none rounded-lg text-6xl font-black tracking-tight text-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 sm:text-7xl dark:text-white">
        <span className="sr-only">{text}</span>
        <span aria-hidden className="inline-flex items-end">
          {letters.map((char, index) => {
            const distance = active === null ? 99 : Math.abs(index - active);
            const scale = distance === 0 ? 1.45 : distance === 1 ? 1.2 : distance === 2 ? 1.07 : 1;
            return <span key={index} onMouseEnter={() => setActive(index)} className={`inline-block origin-bottom transition-transform duration-500 ease-[cubic-bezier(.3,2,.4,.8)] motion-reduce:!transform-none ${distance === 0 ? 'bg-gradient-to-t from-violet-600 to-pink-500 bg-clip-text text-transparent' : ''}`} style={{ transform: `scaleY(${scale}) scaleX(${(1 / Math.sqrt(scale)).toFixed(3)})` }}>{char === ' ' ? ' ' : char}</span>;
          })}
        </span>
      </h2>
    </div>
  );
}
