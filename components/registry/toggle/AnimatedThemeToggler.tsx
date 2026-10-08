/**
 * @registry
 * name: Animated Theme Toggler
 * category: Toggle
 * style: Gradient
 * tags: featured, recent
 * description: Bouton soleil/lune qui bascule le thème d'une carte avec une révélation circulaire partant du bouton.
 * prompt: Create an animated theme toggler: a round sun/moon button (role="switch", aria-checked, aria-label) inside a mini app card; toggling reveals the opposite theme with a circular clip-path that expands from the button position (circle 0 → 150%) over 600ms, then the base layer swaps; the icon rotates and morphs sun↔moon. The card is self-contained (does not change the site theme). Instant switch with reduced motion.
 */
'use client';
import { Moon, Sun } from 'lucide-react';
import { useRef, useState } from 'react';

function Scene({ dark }: { dark: boolean }) {
  return (
    <div className={`absolute inset-0 p-5 ${dark ? 'bg-zinc-950 text-zinc-50' : 'bg-white text-zinc-950'}`}>
      <div className="flex items-center gap-2">
        <span className={`size-7 rounded-lg ${dark ? 'bg-teal-400' : 'bg-teal-600'}`} />
        <span className="text-sm font-semibold">Nightfall</span>
      </div>
      <p className="mt-8 text-2xl font-bold tracking-tight">{dark ? 'Good evening, Ada' : 'Good morning, Ada'}</p>
      <p className={`mt-1 text-sm ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>3 tasks left for today.</p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[64, 40, 82].map((value) => (
          <div key={value} className={`rounded-xl border p-3 ${dark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-zinc-50'}`}>
            <p className={`text-[10px] ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>Focus</p>
            <p className="text-lg font-bold">{value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnimatedThemeToggler() {
  const [dark, setDark] = useState(false);
  const [reveal, setReveal] = useState<{ x: number; y: number; open: boolean } | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  function toggle() {
    if (reveal) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDark((value) => !value); return; }
    const box = card.current!.getBoundingClientRect();
    const origin = button.current!.getBoundingClientRect();
    const point = { x: origin.left + origin.width / 2 - box.left, y: origin.top + origin.height / 2 - box.top };
    setReveal({ ...point, open: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setReveal({ ...point, open: true })));
    window.setTimeout(() => { setDark((value) => !value); setReveal(null); }, 620);
  }

  return (
    <div ref={card} className="relative h-72 w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 shadow-sm dark:border-zinc-800">
      <Scene dark={dark} />
      {reveal && (
        <div aria-hidden className="absolute inset-0 transition-[clip-path] duration-[600ms] ease-in-out" style={{ clipPath: `circle(${reveal.open ? '150%' : '0%'} at ${reveal.x}px ${reveal.y}px)` }}>
          <Scene dark={!dark} />
        </div>
      )}
      <button
        ref={button}
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Dark theme"
        onClick={toggle}
        className={`absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 ${dark ? 'border-zinc-700 bg-zinc-900 text-amber-300' : 'border-zinc-200 bg-white text-zinc-700'}`}
      >
        <Sun aria-hidden className={`absolute size-5 transition duration-500 ${dark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        <Moon aria-hidden className={`absolute size-5 transition duration-500 ${dark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      </button>
    </div>
  );
}
