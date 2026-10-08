/**
 * @registry
 * name: Magnetic Pull Button
 * category: Buttons
 * style: Minimal
 * tags: featured, recent
 * description: Bouton attiré par le curseur qui le suit légèrement, son libellé se déplace un peu plus.
 * prompt: Create a magnetic button: within a padded hover zone, the button translates toward the pointer (30% of the offset) and its inner label a bit more (parallax), springing back on leave with a cubic-bezier; disabled with prefers-reduced-motion. Round dark pill in light mode, light pill in dark mode.
 */
'use client';
import { useRef, useState, type PointerEvent } from 'react';

export function MagneticPullButton() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const zone = useRef<HTMLDivElement>(null);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: event.clientX - (rect.left + rect.width / 2), y: event.clientY - (rect.top + rect.height / 2) });
  }

  return (
    <div ref={zone} onPointerMove={move} onPointerLeave={() => setOffset({ x: 0, y: 0 })} className="grid place-items-center p-10">
      <button type="button" className="grid size-32 place-items-center rounded-full bg-zinc-950 text-sm font-semibold text-white shadow-xl transition-transform duration-300 ease-[cubic-bezier(.33,1,.68,1)] dark:bg-white dark:text-zinc-950" style={{ transform: `translate(${offset.x * 0.3}px, ${offset.y * 0.3}px)` }}>
        <span className="transition-transform duration-300 ease-[cubic-bezier(.33,1,.68,1)]" style={{ transform: `translate(${offset.x * 0.12}px, ${offset.y * 0.12}px)` }}>Get in touch</span>
      </button>
    </div>
  );
}
