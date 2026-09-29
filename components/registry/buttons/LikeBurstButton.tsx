/**
 * @registry
 * name: Like Burst Button
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Bouton coeur qui eclate en particules colorees et rebondit quand on aime, avec compteur.
 * prompt: Create a like button: heart icon that pops (scale keyframe) and fills rose when liked, 8 colored particles bursting outward (CSS variables for angle) plus a ring, and a count that increments; toggling off just unfills. aria-pressed and aria-label with count; particles aria-hidden, reduced-motion safe. Light and dark mode.
 */
'use client';
import { Heart } from 'lucide-react';
import { useState } from 'react';

const colors = ['#f43f5e', '#f59e0b', '#14b8a6', '#8b5cf6'];

export function LikeBurstButton() {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const count = 128 + (liked ? 1 : 0);

  return (
    <>
      <style>{`@keyframes pui-heart-pop{40%{transform:scale(1.35)}100%{transform:scale(1)}}@keyframes pui-particle{from{transform:rotate(var(--a)) translateY(0) scale(1);opacity:1}to{transform:rotate(var(--a)) translateY(-26px) scale(0);opacity:0}}@keyframes pui-ring-out{from{transform:scale(.3);opacity:.8}to{transform:scale(1.6);opacity:0}}`}</style>
      <button type="button" aria-pressed={liked} aria-label={`${liked ? 'Unlike' : 'Like'}, ${count} likes`} onClick={() => { setLiked((value) => !value); if (!liked) setBurst((value) => value + 1); }} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-rose-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        <span className="relative grid size-6 place-items-center">
          {liked && (
            <span key={burst} aria-hidden className="motion-reduce:hidden">
              <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-[pui-ring-out_.5s_ease-out_forwards]" />
              {Array.from({ length: 8 }, (_, index) => <span key={index} className="absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] size-1.5 rounded-full animate-[pui-particle_.6s_ease-out_forwards]" style={{ ['--a' as string]: `${index * 45}deg`, background: colors[index % colors.length] }} />)}
            </span>
          )}
          <Heart aria-hidden key={`heart-${burst}-${liked}`} className={`size-5 ${liked ? 'fill-rose-500 text-rose-500 motion-safe:animate-[pui-heart-pop_.4s_ease-out]' : ''}`} />
        </span>
        <span className="tabular-nums">{count}</span>
      </button>
    </>
  );
}
