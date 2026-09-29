/**
 * @registry
 * name: Theme Switch
 * category: Toggle
 * style: Gradient
 * tags: featured, recent
 * description: Interrupteur jour et nuit avec soleil, lune, etoiles et nuage animes.
 * prompt: Create a day/night switch (role="switch", aria-checked): sky background turns indigo, the knob springs across and swaps sun for moon, stars fade in and a cloud drifts out. Focus ring and smooth 500ms transitions.
 */
'use client';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function ThemeSwitch() {
  const [night, setNight] = useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={night}
      aria-label="Dark mode"
      onClick={() => setNight((value) => !value)}
      className={`relative h-12 w-24 overflow-hidden rounded-full p-1 shadow-inner transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
        night ? 'bg-indigo-950' : 'bg-sky-300'
      }`}
    >
      {/* Stars fade in at night, a cloud drifts by during the day. */}
      <span aria-hidden className={`absolute inset-0 transition-opacity duration-500 ${night ? 'opacity-100' : 'opacity-0'}`}>
        {[[18, 12], [30, 28], [44, 16], [24, 36]].map(([left, top]) => (
          <span key={`${left}-${top}`} className="absolute size-1 rounded-full bg-white" style={{ left, top }} />
        ))}
      </span>
      <span aria-hidden className={`absolute right-3 top-3 h-3 w-7 rounded-full bg-white/80 transition-all duration-500 ${night ? 'translate-x-6 opacity-0' : 'opacity-100'}`} />
      <span
        className={`relative grid size-10 place-items-center rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${
          night ? 'translate-x-12 bg-zinc-200 text-indigo-950' : 'translate-x-0 bg-amber-300 text-amber-700'
        }`}
      >
        {night ? <Moon aria-hidden className="size-5" /> : <Sun aria-hidden className="size-5" />}
      </span>
    </button>
  );
}
