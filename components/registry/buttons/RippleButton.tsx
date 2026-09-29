/**
 * @registry
 * name: Ripple Button
 * category: Buttons
 * style: SaaS
 * tags: recent
 * description: Boutons avec onde de clic qui part du point de pression, en variantes pleine et contour.
 * prompt: Create material-style ripple buttons: on pointerdown a circle spawns at the click position (size = 2× the button diagonal), scales from 0 and fades out, removed on animationend; keyboard activation ripples from the center. Filled teal and outlined variants, light and dark mode.
 */
'use client';
import { useState, type PointerEvent } from 'react';

type Ripple = { id: number; x: number; y: number; size: number };

function Button({ label, variant }: { label: string; variant: 'filled' | 'outline' }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function spawn(event: PointerEvent<HTMLButtonElement> | null, target: HTMLButtonElement) {
    const rect = target.getBoundingClientRect();
    const size = Math.hypot(rect.width, rect.height) * 2;
    const x = event ? event.clientX - rect.left : rect.width / 2;
    const y = event ? event.clientY - rect.top : rect.height / 2;
    setRipples((current) => [...current, { id: Date.now() + Math.random(), x, y, size }]);
  }

  return (
    <button
      type="button"
      onPointerDown={(event) => spawn(event, event.currentTarget)}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') spawn(null, event.currentTarget); }}
      className={`relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition ${variant === 'filled' ? 'bg-teal-600 text-white hover:bg-teal-700' : 'border border-teal-600 text-teal-700 hover:bg-teal-500/5 dark:border-teal-400 dark:text-teal-300'}`}
    >
      {ripples.map((ripple) => (
        <span key={ripple.id} aria-hidden onAnimationEnd={() => setRipples((current) => current.filter((item) => item.id !== ripple.id))} className={`pointer-events-none absolute rounded-full animate-[pui-ripple-grow_.6s_ease-out_forwards] ${variant === 'filled' ? 'bg-white/35' : 'bg-teal-500/25'}`} style={{ left: ripple.x - ripple.size / 2, top: ripple.y - ripple.size / 2, width: ripple.size, height: ripple.size }} />
      ))}
      <span className="relative">{label}</span>
    </button>
  );
}

export function RippleButton() {
  return (
    <>
      <style>{`@keyframes pui-ripple-grow{from{transform:scale(0);opacity:1}to{transform:scale(1);opacity:0}}`}</style>
      <div className="flex flex-wrap items-center gap-3"><Button label="Continue" variant="filled" /><Button label="Learn more" variant="outline" /></div>
    </>
  );
}
