/**
 * @registry
 * name: Response Variants
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: Réponse IA avec plusieurs versions et pagination « 2 / 3 » pour naviguer entre elles.
 * prompt: Create an assistant reply with multiple generated versions: prev/next buttons and a "2 / 3" counter (aria-live) switch between variants with a quick fade, buttons disabled at the ends. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const variants = [
  'Ship small, ship often. Every release is a chance to learn something real.',
  'Momentum beats perfection: release the smallest useful version this week.',
  'Great products are grown, not launched. Start tiny and listen closely.',
];

export function ResponseVariants() {
  const [index, setIndex] = useState(1);

  return (
    <>
      <style>{`@keyframes pui-variant{from{opacity:0;transform:translateY(4px)}}`}</style>
      <div className="flex w-full max-w-md gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"><Sparkles aria-hidden className="size-4" /></span>
        <div className="flex-1">
          <p key={index} className="text-sm leading-7 text-zinc-800 motion-safe:animate-[pui-variant_.25s_ease-out] dark:text-zinc-200">{variants[index]}</p>
          <div className="mt-2 flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <button type="button" aria-label="Previous version" disabled={index === 0} onClick={() => setIndex((value) => value - 1)} className="grid size-7 place-items-center rounded-md hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ChevronLeft className="size-4" /></button>
            <span aria-live="polite" className="font-mono text-xs tabular-nums">{index + 1} / {variants.length}</span>
            <button type="button" aria-label="Next version" disabled={index === variants.length - 1} onClick={() => setIndex((value) => value + 1)} className="grid size-7 place-items-center rounded-md hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ChevronRight className="size-4" /></button>
          </div>
        </div>
      </div>
    </>
  );
}
