/**
 * @registry
 * name: Map Pin Popover
 * category: Tooltips
 * style: Minimal
 * tags: recent
 * description: Carte stylisée avec épingles de lieux : clic sur une épingle pour ouvrir une fiche (photo, note, horaires, itinéraire), navigation au clavier.
 * prompt: Create a map with location pin popovers: a stylised CSS map (soft land shapes, a river and grid streets) with four pin buttons at fixed positions; clicking or pressing Enter on a pin opens a popover card anchored above it with an arrow (photo gradient, name, rating stars, "Open until 22:00", distance) and "Directions" / "Save" actions; only one open at a time, the third pin is open by default; Escape closes and returns focus; the selected pin scales up. Light and dark mode.
 */
'use client';
import { Bookmark, MapPin, Navigation, Star } from 'lucide-react';
import { useRef, useState } from 'react';

const places = [
  { name: 'Café Touba', x: 22, y: 30, rating: 4.6, hours: 'Open until 20:00', distance: '350 m', tone: 'from-amber-300 to-orange-500' },
  { name: 'Marché Kermel', x: 48, y: 62, rating: 4.3, hours: 'Closes at 19:00', distance: '1.2 km', tone: 'from-emerald-300 to-teal-500' },
  { name: 'La Galerie', x: 66, y: 40, rating: 4.8, hours: 'Open until 22:00', distance: '800 m', tone: 'from-violet-300 to-fuchsia-500' },
  { name: 'Plage Ngor', x: 84, y: 72, rating: 4.7, hours: 'Open 24 hours', distance: '3.4 km', tone: 'from-sky-300 to-blue-500' },
];

export function MapPinPopover() {
  const [open, setOpen] = useState<number | null>(2);
  const [saved, setSaved] = useState<string[]>([]);
  const pins = useRef<(HTMLButtonElement | null)[]>([]);
  const place = open !== null ? places[open] : null;

  return (
    <div className="relative h-80 w-full max-w-xl overflow-hidden rounded-3xl bg-[#e8efe4] dark:bg-zinc-900" onKeyDown={(event) => { if (event.key === 'Escape' && open !== null) { pins.current[open]?.focus(); setOpen(null); } }}>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(#fff_2px,transparent_2px),linear-gradient(90deg,#fff_2px,transparent_2px)] bg-[size:56px_56px] opacity-70 dark:bg-[linear-gradient(#3f3f46_2px,transparent_2px),linear-gradient(90deg,#3f3f46_2px,transparent_2px)]" />
      <div aria-hidden className="absolute -bottom-10 -right-10 h-48 w-72 rounded-[50%] bg-sky-200 dark:bg-sky-900/60" />
      <div aria-hidden className="absolute left-[10%] top-[55%] h-20 w-40 rounded-[45%] bg-emerald-200/80 dark:bg-emerald-900/40" />
      {places.map((item, index) => (
        <button key={item.name} ref={(node) => { pins.current[index] = node; }} type="button" aria-expanded={open === index} aria-label={item.name} onClick={() => setOpen(open === index ? null : index)} className={`absolute -translate-x-1/2 -translate-y-full transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white ${open === index ? 'z-10 scale-125' : 'hover:scale-110'}`} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
          <MapPin aria-hidden className={`size-8 drop-shadow ${open === index ? 'fill-rose-500 text-rose-700' : 'fill-white text-zinc-700'}`} />
        </button>
      ))}
      {place && open !== null && (
        <div role="dialog" aria-label={place.name} className="absolute z-20 w-56 rounded-2xl bg-white p-2.5 shadow-2xl dark:bg-zinc-950" style={{ left: `clamp(7.5rem, ${place.x}%, calc(100% - 7.5rem))`, top: place.y < 55 ? `calc(${place.y}% + 0.5rem)` : `calc(${place.y}% - 2.6rem)`, transform: place.y < 55 ? 'translate(-50%, 0)' : 'translate(-50%, -100%)' }}>
          <div aria-hidden className={`h-16 rounded-xl bg-gradient-to-br ${place.tone}`} />
          <p className="mt-2 text-sm font-semibold text-zinc-950 dark:text-white">{place.name}</p>
          <p className="flex items-center gap-1 text-xs text-zinc-500"><Star aria-hidden className="size-3 fill-amber-400 text-amber-400" />{place.rating} · {place.distance}</p>
          <p className={`text-xs ${place.hours.startsWith('Closes') ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{place.hours}</p>
          <div className="mt-2 flex gap-1.5"><button type="button" className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-zinc-950 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950"><Navigation aria-hidden className="size-3" />Directions</button><button type="button" aria-pressed={saved.includes(place.name)} aria-label={`Save ${place.name}`} onClick={() => setSaved((list) => (list.includes(place.name) ? list.filter((item) => item !== place.name) : [...list, place.name]))} className="grid size-8 place-items-center rounded-lg border border-zinc-200 dark:border-zinc-700"><Bookmark aria-hidden className={`size-3.5 ${saved.includes(place.name) ? 'fill-current text-indigo-600 dark:text-indigo-400' : 'text-zinc-500'}`} /></button></div>
        </div>
      )}
    </div>
  );
}
