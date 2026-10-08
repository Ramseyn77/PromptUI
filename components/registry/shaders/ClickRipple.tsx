/**
 * @registry
 * name: Click Ripple
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Surface qui émet des ondes concentriques colorées à chaque clic, à l'endroit du clic.
 * prompt: Create an interactive ripple surface: every pointer down spawns a ring at the click position (state array with id/x/y/hue), expanding and fading via keyframe, removed on animationend. Keyboard: Enter/Space spawns a ripple at the center. Light and dark mode.
 */
'use client';
import { useState, type KeyboardEvent, type PointerEvent } from 'react';

type Ripple = { id: number; x: number; y: number; hue: number };

export function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function spawn(x: number, y: number) {
    setRipples((current) => [...current, { id: Date.now() + Math.random(), x, y, hue: 160 + Math.round(Math.random() * 140) }]);
  }
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    spawn(((event.clientX - rect.left) / rect.width) * 100, ((event.clientY - rect.top) / rect.height) * 100);
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); spawn(50, 50); }
  }

  return (
    <>
      <style>{`@keyframes pui-ripple{from{transform:translate(-50%,-50%) scale(0);opacity:.9}to{transform:translate(-50%,-50%) scale(1);opacity:0}}`}</style>
      <div role="button" tabIndex={0} aria-label="Ripple surface, click to create ripples" onPointerDown={onPointerDown} onKeyDown={onKeyDown} className="relative grid h-64 w-full max-w-xl cursor-pointer select-none place-items-center overflow-hidden rounded-3xl bg-zinc-50 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:bg-zinc-950">
        <p className="pointer-events-none text-sm font-medium text-zinc-500 dark:text-zinc-400">Click anywhere</p>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            aria-hidden
            onAnimationEnd={() => setRipples((current) => current.filter((item) => item.id !== ripple.id))}
            className="pointer-events-none absolute size-72 rounded-full border-4 animate-[pui-ripple_1.1s_ease-out_forwards]"
            style={{ left: `${ripple.x}%`, top: `${ripple.y}%`, borderColor: `hsl(${ripple.hue} 80% 55%)` }}
          />
        ))}
      </div>
    </>
  );
}
