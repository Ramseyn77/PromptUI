/**
 * @registry
 * name: Boarding Pass Card
 * category: Cards
 * style: Gradient
 * tags: featured, recent
 * description: Carte d'embarquement avec trajet animé, encoches perforées, infos de vol, statut d'embarquement et code-barres déterministe.
 * prompt: Create a boarding pass card: gradient header with airline name and flight number, large departure/arrival airport codes with cities and times joined by a dashed path where a plane icon travels on hover; a perforated divider with circular notches on both sides; a grid of details (Passenger, Seat, Gate, Group, Boarding); a status pill "Boarding in 25 min"; a barcode made of deterministic bar widths (no randomness); keyboard focusable with a focus ring. Light and dark mode.
 */
import { Plane } from 'lucide-react';

const bars = Array.from({ length: 48 }, (_, index) => 1 + ((index * 7 + (index % 5) * 3) % 4));

export function BoardingPassCard() {
  return (
    <article tabIndex={0} aria-label="Boarding pass, Lagos to Paris, flight AF 149, seat 14A" className="group w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl outline-none ring-1 ring-zinc-200 focus-visible:ring-4 focus-visible:ring-sky-400 dark:bg-zinc-900 dark:ring-zinc-800">
      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 px-6 pb-6 pt-5 text-white">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest"><span>Skyward Air</span><span>AF 149</span></div>
        <div className="mt-5 flex items-end justify-between">
          <div><p className="text-4xl font-black">LOS</p><p className="text-xs text-white/80">Lagos · 22:40</p></div>
          <div className="relative mx-3 mb-4 flex-1 border-t-2 border-dashed border-white/50">
            <Plane aria-hidden className="absolute -top-2.5 left-0 size-5 rotate-45 transition-[left] duration-700 ease-in-out group-hover:left-[calc(100%-1.25rem)] group-focus-visible:left-[calc(100%-1.25rem)] motion-reduce:transition-none" />
          </div>
          <div className="text-right"><p className="text-4xl font-black">CDG</p><p className="text-xs text-white/80">Paris · 06:15</p></div>
        </div>
      </div>
      <div className="relative">
        <span aria-hidden className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-zinc-100 dark:bg-zinc-950" />
        <span aria-hidden className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-zinc-100 dark:bg-zinc-950" />
        <div className="mx-6 border-t-2 border-dashed border-zinc-200 dark:border-zinc-700" />
      </div>
      <div className="px-6 py-5">
        <dl className="grid grid-cols-3 gap-y-4 text-sm">
          {[['Passenger', 'Awa Diop'], ['Seat', '14A'], ['Gate', 'E22'], ['Group', '2'], ['Boarding', '21:55'], ['Class', 'Economy']].map(([label, value]) => <div key={label}><dt className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</dt><dd className="font-semibold text-zinc-950 dark:text-white">{value}</dd></div>)}
        </dl>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300"><span className="size-1.5 rounded-full bg-amber-500 motion-safe:animate-pulse" />Boarding in 25 min</p>
        <div aria-hidden className="mt-5 flex h-12 items-stretch gap-[2px]">{bars.map((width, index) => <span key={index} className="bg-zinc-900 dark:bg-zinc-100" style={{ width }} />)}</div>
      </div>
    </article>
  );
}
