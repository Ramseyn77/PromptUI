/**
 * @registry
 * name: Property Listing Card
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Annonce immobilière avec galerie à points, prix, caractéristiques (chambres, surface) et favori.
 * prompt: Create a real estate listing card: an image area cycling through 4 gradient "photos" with previous/next buttons and dots (aria-label "Photo 2 of 4"), a "New" badge and favorite toggle; price per month, address, and feature icons (beds, baths, m²) in a row; hovering the card lifts it. Light and dark mode.
 */
'use client';
import { Bath, BedDouble, ChevronLeft, ChevronRight, Heart, Ruler } from 'lucide-react';
import { useState } from 'react';

const photos = ['from-amber-200 to-orange-400', 'from-sky-200 to-blue-500', 'from-emerald-200 to-teal-500', 'from-rose-200 to-fuchsia-400'];

export function PropertyListingCard() {
  const [photo, setPhoto] = useState(0);
  const [liked, setLiked] = useState(false);
  const step = (delta: number) => setPhoto((value) => (value + delta + photos.length) % photos.length);

  return (
    <article className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div className="group relative h-48">
        <div role="img" aria-label={`Photo ${photo + 1} of ${photos.length}`} className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${photos[photo]}`} />
        <span className="absolute left-3 top-3 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-zinc-900">New</span>
        <button type="button" aria-pressed={liked} aria-label="Save listing" onClick={() => setLiked((value) => !value)} className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-rose-500"><Heart aria-hidden className={`size-4 ${liked ? 'fill-current' : ''}`} /></button>
        <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-zinc-800 opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100"><ChevronLeft aria-hidden className="size-4" /></button>
        <button type="button" aria-label="Next photo" onClick={() => step(1)} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-zinc-800 opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100"><ChevronRight aria-hidden className="size-4" /></button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">{photos.map((_, index) => <span key={index} className={`size-1.5 rounded-full ${index === photo ? 'bg-white' : 'bg-white/50'}`} />)}</div>
      </div>
      <div className="p-4">
        <p className="text-xl font-bold text-zinc-950 dark:text-zinc-50">€1,450<span className="text-sm font-normal text-zinc-500"> / month</span></p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">14 rue Oberkampf, Paris 11e</p>
        <ul className="mt-3 flex gap-4 border-t border-zinc-100 pt-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
          <li className="flex items-center gap-1.5"><BedDouble aria-hidden className="size-4 text-zinc-400" />2 beds</li>
          <li className="flex items-center gap-1.5"><Bath aria-hidden className="size-4 text-zinc-400" />1 bath</li>
          <li className="flex items-center gap-1.5"><Ruler aria-hidden className="size-4 text-zinc-400" />54 m²</li>
        </ul>
      </div>
    </article>
  );
}
