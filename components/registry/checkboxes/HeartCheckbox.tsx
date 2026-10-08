/**
 * @registry
 * name: Heart Checkbox
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Cases favoris en forme de cœur et d'étoile qui se remplissent avec un petit rebond.
 * prompt: Create icon checkboxes for favorites: a heart and a star, each a native sr-only checkbox with an icon that fills (rose / amber) and pops (scale keyframe) when checked, with visible focus ring and a label for screen readers; used on a product card. Light and dark mode.
 */
'use client';
import { Heart, Star } from 'lucide-react';
import { useState } from 'react';

export function HeartCheckbox() {
  const [fav, setFav] = useState(false);
  const [starred, setStarred] = useState(true);
  const box = 'grid size-10 place-items-center rounded-full border border-zinc-200 bg-white transition peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900';

  return (
    <>
      <style>{`@keyframes pui-icon-pop{50%{transform:scale(1.3)}}`}</style>
      <article className="w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div aria-hidden className="h-32 bg-gradient-to-br from-amber-200 to-rose-300 dark:from-amber-900 dark:to-rose-900" />
        <div className="flex items-center justify-between p-4">
          <div><p className="text-sm font-semibold text-zinc-900 dark:text-white">Linen lounge chair</p><p className="text-xs text-zinc-500">$349</p></div>
          <div className="flex gap-2">
            <label className="cursor-pointer">
              <input type="checkbox" className="peer sr-only" checked={fav} onChange={() => setFav((value) => !value)} />
              <span className={box}><Heart aria-hidden className={`size-5 ${fav ? 'fill-rose-500 text-rose-500 motion-safe:animate-[pui-icon-pop_.3s]' : 'text-zinc-500'}`} /></span>
              <span className="sr-only">Add to favorites</span>
            </label>
            <label className="cursor-pointer">
              <input type="checkbox" className="peer sr-only" checked={starred} onChange={() => setStarred((value) => !value)} />
              <span className={box}><Star aria-hidden className={`size-5 ${starred ? 'fill-amber-400 text-amber-400 motion-safe:animate-[pui-icon-pop_.3s]' : 'text-zinc-500'}`} /></span>
              <span className="sr-only">Star this item</span>
            </label>
          </div>
        </div>
      </article>
    </>
  );
}
