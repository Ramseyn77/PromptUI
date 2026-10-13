/**
 * @registry
 * name: Stay Booking Card
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Carte de réservation de séjour : galerie à points, favori, note, dates et voyageurs, détail du prix par nuit avec frais et total.
 * prompt: Create a vacation rental booking card: an image area with three gradient "photos" switchable by dot buttons and arrow buttons, a heart favorite toggle (aria-pressed), title, location, rating with review count; a booking box with check-in / check-out date inputs and a guests stepper (1–6); the price breakdown ($120 × nights, cleaning fee, service fee) recalculates from the dates; Reserve button with "You won't be charged yet". Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, Star } from 'lucide-react';
import { useId, useState } from 'react';

const photos = ['from-sky-300 via-cyan-200 to-amber-100', 'from-amber-200 via-orange-300 to-rose-300', 'from-emerald-300 via-teal-300 to-sky-400'];
const nightly = 120;

export function StayBookingCard() {
  const uid = useId();
  const [photo, setPhoto] = useState(0);
  const [saved, setSaved] = useState(false);
  const [checkIn, setCheckIn] = useState('2026-11-12');
  const [checkOut, setCheckOut] = useState('2026-11-16');
  const [guests, setGuests] = useState(2);
  const nights = Math.max(1, Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86400000) || 1);
  const service = Math.round(nightly * nights * 0.12);
  const total = nightly * nights + 35 + service;

  return (
    <article className="w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative">
        <div aria-hidden className={`aspect-[4/3] bg-gradient-to-br transition-colors duration-500 ${photos[photo]}`} />
        <button type="button" aria-label="Previous photo" onClick={() => setPhoto((photo + 2) % 3)} className="absolute left-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-zinc-900 shadow"><ChevronLeft aria-hidden className="size-4" /></button>
        <button type="button" aria-label="Next photo" onClick={() => setPhoto((photo + 1) % 3)} className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-zinc-900 shadow"><ChevronRight aria-hidden className="size-4" /></button>
        <button type="button" aria-pressed={saved} aria-label="Save to wishlist" onClick={() => setSaved(!saved)} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/25 backdrop-blur"><Heart aria-hidden className={`size-5 transition ${saved ? 'scale-110 fill-rose-500 text-rose-500' : 'text-white'}`} /></button>
        <div role="group" aria-label="Photos" className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">{photos.map((_, index) => <button key={index} type="button" aria-label={`Photo ${index + 1}`} aria-current={photo === index ? 'true' : undefined} onClick={() => setPhoto(index)} className={`size-2 rounded-full ${photo === index ? 'bg-white' : 'bg-white/50'}`} />)}</div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2"><div><h3 className="font-semibold text-zinc-950 dark:text-white">Ocean-view studio</h3><p className="text-sm text-zinc-500">Saly, Senegal</p></div><p className="flex items-center gap-1 text-sm text-zinc-900 dark:text-zinc-100"><Star aria-hidden className="size-4 fill-current" />4.92 <span className="text-zinc-500">(128)</span></p></div>
        <div className="mt-4 overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700">
          <div className="grid grid-cols-2 divide-x divide-zinc-300 dark:divide-zinc-700">
            <label htmlFor={`${uid}-in`} className="px-3 py-2 text-[10px] font-semibold uppercase text-zinc-500">Check-in<input id={`${uid}-in`} type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="block w-full bg-transparent text-sm font-normal normal-case text-zinc-900 outline-none dark:text-zinc-100 dark:[color-scheme:dark]" /></label>
            <label htmlFor={`${uid}-out`} className="px-3 py-2 text-[10px] font-semibold uppercase text-zinc-500">Check-out<input id={`${uid}-out`} type="date" value={checkOut} min={checkIn} onChange={(event) => setCheckOut(event.target.value)} className="block w-full bg-transparent text-sm font-normal normal-case text-zinc-900 outline-none dark:text-zinc-100 dark:[color-scheme:dark]" /></label>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-300 px-3 py-2 dark:border-zinc-700"><span className="text-[10px] font-semibold uppercase text-zinc-500">Guests</span><div className="flex items-center gap-2"><button type="button" aria-label="Fewer guests" disabled={guests <= 1} onClick={() => setGuests(guests - 1)} className="grid size-7 place-items-center rounded-full border border-zinc-300 disabled:opacity-30 dark:border-zinc-600"><Minus aria-hidden className="size-3" /></button><output aria-live="polite" className="w-4 text-center text-sm tabular-nums text-zinc-900 dark:text-zinc-100">{guests}</output><button type="button" aria-label="More guests" disabled={guests >= 6} onClick={() => setGuests(guests + 1)} className="grid size-7 place-items-center rounded-full border border-zinc-300 disabled:opacity-30 dark:border-zinc-600"><Plus aria-hidden className="size-3" /></button></div></div>
        </div>
        <dl aria-live="polite" className="mt-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex justify-between"><dt>${nightly} × {nights} night{nights > 1 ? 's' : ''}</dt><dd className="tabular-nums">${nightly * nights}</dd></div>
          <div className="flex justify-between"><dt>Cleaning fee</dt><dd className="tabular-nums">$35</dd></div>
          <div className="flex justify-between"><dt>Service fee</dt><dd className="tabular-nums">${service}</dd></div>
          <div className="flex justify-between border-t border-zinc-200 pt-2 font-semibold text-zinc-950 dark:border-zinc-800 dark:text-white"><dt>Total</dt><dd className="tabular-nums">${total}</dd></div>
        </dl>
        <button type="button" className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 py-3 text-sm font-semibold text-white">Reserve</button>
        <p className="mt-2 text-center text-xs text-zinc-500">You won’t be charged yet</p>
      </div>
    </article>
  );
}
