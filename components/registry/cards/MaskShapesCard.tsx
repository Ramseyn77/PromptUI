/**
 * @registry
 * name: Mask Shapes Card
 * category: Cards
 * style: Gradient
 * tags: recent
 * description: Avatars découpés en formes façon daisyUI mask (squircle, hexagone, cœur, étoile, losange) avec sélection.
 * prompt: Create a daisyUI "mask" showcase card: a radiogroup of shape options (Squircle, Hexagon, Heart, Star, Diamond) rendered as gradient avatars clipped with CSS clip-path / border-radius, and a large preview avatar above that morphs to the selected shape with a transition; a caption names the shape. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const shapes = {
  Squircle: { clipPath: 'none', borderRadius: '30%' },
  Hexagon: { clipPath: 'polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0 50%)', borderRadius: '0' },
  Heart: { clipPath: 'path("M50 92 C20 70 2 52 2 30 C2 14 14 4 28 4 C38 4 46 10 50 18 C54 10 62 4 72 4 C86 4 98 14 98 30 C98 52 80 70 50 92 Z")', borderRadius: '0' },
  Star: { clipPath: 'polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)', borderRadius: '0' },
  Diamond: { clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', borderRadius: '0' },
} as const;
type Shape = keyof typeof shapes;

export function MaskShapesCard() {
  const [shape, setShape] = useState<Shape>('Squircle');

  return (
    <article className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div aria-hidden className="mx-auto size-[100px] bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 transition-all duration-500" style={shapes[shape]} />
      <p aria-live="polite" className="mt-3 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">{shape}</p>
      <div role="radiogroup" aria-label="Avatar shape" className="mt-5 flex justify-center gap-2">
        {(Object.keys(shapes) as Shape[]).map((name) => (
          <button key={name} type="button" role="radio" aria-checked={shape === name} aria-label={name} onClick={() => setShape(name)} className={`relative size-12 overflow-hidden rounded-xl transition ${shape === name ? 'bg-violet-50 ring-2 ring-violet-500 dark:bg-violet-500/10' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}>
            <span aria-hidden className="absolute left-1/2 top-1/2 -ml-[50px] -mt-[50px] block size-[100px] scale-[0.32] bg-gradient-to-br from-fuchsia-500 to-sky-400" style={shapes[name]} />
          </button>
        ))}
      </div>
    </article>
  );
}
