/**
 * @registry
 * name: Spotlight Grid
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Grille de points révélée uniquement autour du curseur par un masque radial.
 * prompt: Create a hidden dot-grid revealed by the pointer: a faint base grid plus a bright duplicate grid masked with a radial-gradient positioned at CSS variables updated on pointermove (no re-render), fading out on leave. Adapts to light and dark mode.
 */
'use client';
import { useRef, type PointerEvent } from 'react';

export function SpotlightGrid() {
  const ref = useRef<HTMLDivElement>(null);

  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--x', `${event.clientX - rect.left}px`);
    ref.current?.style.setProperty('--y', `${event.clientY - rect.top}px`);
    ref.current?.style.setProperty('--o', '1');
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => ref.current?.style.setProperty('--o', '0')}
      className="relative grid h-64 w-full max-w-xl place-items-center overflow-hidden rounded-3xl bg-white [--o:0] [--x:50%] [--y:50%] dark:bg-zinc-950"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle,rgb(0_0_0/.12)_1px,transparent_1px)] bg-[size:18px_18px] dark:bg-[radial-gradient(circle,rgb(255_255_255/.1)_1px,transparent_1px)]" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,#0d9488_1.5px,transparent_1.5px)] bg-[size:18px_18px] opacity-[var(--o)] transition-opacity duration-300 dark:bg-[radial-gradient(circle,#5eead4_1.5px,transparent_1.5px)]"
        style={{ maskImage: 'radial-gradient(160px circle at var(--x) var(--y), #000, transparent)', WebkitMaskImage: 'radial-gradient(160px circle at var(--x) var(--y), #000, transparent)' }}
      />
      <p className="relative text-sm font-medium text-zinc-500 dark:text-zinc-400">Move your cursor</p>
    </div>
  );
}
