/**
 * @registry
 * name: Circle Reveal Button
 * category: Buttons
 * style: Dark
 * tags: recent
 * description: Bouton dont le fond se remplit par un cercle qui part exactement du point d'entrée du curseur.
 * prompt: Create a direction-aware fill button: on pointer enter, record the entry point and expand a circle (clip-path circle from 0 to 150% at that point) filling the button with a contrasting color while the label color inverts; on leave the circle shrinks toward the exit point; keyboard focus fills from the center. Dark outline button in light mode, light outline in dark mode.
 */
'use client';
import { ArrowUpRight } from 'lucide-react';
import { useState, type PointerEvent } from 'react';

export function CircleRevealButton() {
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const point = (event: PointerEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 });
  };

  return (
    <button
      type="button"
      onPointerEnter={(event) => { point(event); setActive(true); }}
      onPointerLeave={(event) => { point(event); setActive(false); }}
      onFocus={() => { setOrigin({ x: 50, y: 50 }); setActive(true); }}
      onBlur={() => setActive(false)}
      className="relative overflow-hidden rounded-full border-2 border-zinc-950 px-8 py-3.5 text-sm font-semibold text-zinc-950 outline-none dark:border-zinc-50 dark:text-zinc-50"
    >
      <span aria-hidden className="absolute inset-0 bg-zinc-950 transition-[clip-path] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none dark:bg-zinc-50" style={{ clipPath: `circle(${active ? '150%' : '0%'} at ${origin.x}% ${origin.y}%)` }} />
      <span className={`relative inline-flex items-center gap-2 transition-colors duration-300 ${active ? 'text-white dark:text-zinc-950' : ''}`}>View case study<ArrowUpRight aria-hidden className={`size-4 transition-transform duration-300 ${active ? 'rotate-45' : ''}`} /></span>
    </button>
  );
}
