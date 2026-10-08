/**
 * @registry
 * name: Flip Button 3D
 * category: Buttons
 * style: SaaS
 * tags: featured, recent
 * description: Bouton cube qui pivote en 3D au survol pour montrer sa face suivante (« Acheter » → prix).
 * prompt: Create a 3D flip button: a box with two faces (front "Add to cart", top/bottom face "€49 — confirm") in a preserve-3d container; on hover/focus the cube rotates -90deg on X revealing the second face; clicking switches to a third "Added ✓" state. Instant swap with reduced motion. Light and dark mode.
 */
'use client';
import { Check, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export function FlipButton3D() {
  const [added, setAdded] = useState(false);

  return (
    <button type="button" onClick={() => setAdded((value) => !value)} aria-label={added ? 'Added to cart, click to undo' : 'Add to cart for 49 euros'} className="group h-12 w-48 outline-none [perspective:600px]">
      <span className={`relative block size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none ${added ? '' : 'group-hover:[transform:rotateX(-90deg)] group-focus-visible:[transform:rotateX(-90deg)]'}`}>
        <span aria-hidden className={`absolute inset-0 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold [backface-visibility:hidden] [transform:translateZ(24px)] ${added ? 'bg-emerald-600 text-white' : 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'}`}>
          {added ? <><Check className="size-4" />Added</> : <><ShoppingCart className="size-4" />Add to cart</>}
        </span>
        <span aria-hidden className="absolute inset-0 flex items-center justify-center rounded-xl bg-teal-500 text-sm font-semibold text-white [backface-visibility:hidden] [transform:rotateX(90deg)_translateZ(24px)]">€49 — confirm</span>
      </span>
    </button>
  );
}
