/**
 * @registry
 * name: Hover Gallery Card
 * category: Cards
 * style: Minimal
 * tags: featured, recent
 * description: Carte produit façon daisyUI hover-gallery : survoler les zones de l'image change de photo, indicateurs en bas.
 * prompt: Create a daisyUI hover-gallery product card: the image area is split into 4 invisible vertical hover zones; moving the pointer across changes the visible "photo" (gradient variants) and the bottom indicator bars; keyboard/touch users get previous/next buttons; resets to the first photo on leave; product name, color swatches and price below. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const photos = ['from-stone-200 via-stone-300 to-stone-500', 'from-amber-100 via-amber-300 to-orange-500', 'from-zinc-300 via-zinc-500 to-zinc-800', 'from-emerald-100 via-teal-300 to-teal-600'];

export function HoverGalleryCard() {
  const [photo, setPhoto] = useState(0);

  return (
    <article className="w-full max-w-xs">
      <div onMouseLeave={() => setPhoto(0)} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
        <div role="img" aria-label={`Linen tote, photo ${photo + 1} of ${photos.length}`} className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${photos[photo]}`}>
          <span aria-hidden className="absolute left-1/2 top-[30%] h-[46%] w-[58%] -translate-x-1/2 rounded-b-3xl rounded-t-lg bg-white/35 shadow-xl backdrop-blur-sm" />
          <span aria-hidden className="absolute left-1/2 top-[18%] h-[16%] w-[34%] -translate-x-1/2 rounded-t-full border-[6px] border-b-0 border-white/40" />
        </div>
        <div aria-hidden className="absolute inset-0 grid grid-cols-4">{photos.map((_, index) => <span key={index} onMouseEnter={() => setPhoto(index)} />)}</div>
        <div aria-hidden className="absolute inset-x-3 bottom-3 grid grid-cols-4 gap-1">{photos.map((_, index) => <span key={index} className={`h-1 rounded-full transition ${index === photo ? 'bg-white' : 'bg-white/40'}`} />)}</div>
        <button type="button" aria-label="Previous photo" onClick={() => setPhoto((value) => (value + photos.length - 1) % photos.length)} className="absolute left-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-zinc-800 opacity-0 transition focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"><ChevronLeft aria-hidden className="size-4" /></button>
        <button type="button" aria-label="Next photo" onClick={() => setPhoto((value) => (value + 1) % photos.length)} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-zinc-800 opacity-0 transition focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"><ChevronRight aria-hidden className="size-4" /></button>
      </div>
      <div className="mt-3 flex items-start justify-between">
        <div><h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Linen Tote</h3><div className="mt-1 flex gap-1">{['bg-stone-400', 'bg-amber-400', 'bg-zinc-700', 'bg-teal-500'].map((tone, index) => <button key={tone} type="button" aria-label={`Color ${index + 1}`} onClick={() => setPhoto(index)} className={`size-4 rounded-full ${tone} ${photo === index ? 'ring-2 ring-zinc-900 ring-offset-1 dark:ring-white dark:ring-offset-zinc-950' : ''}`} />)}</div></div>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">€59</p>
      </div>
    </article>
  );
}
