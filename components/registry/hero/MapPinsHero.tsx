/**
 * @registry
 * name: Map Pins Hero
 * category: Hero
 * style: Editorial
 * tags: recent
 * description: Hero de réseau de livraison avec carte en points stylisée, épingles de villes pulsantes et infobulle au focus.
 * prompt: Create a logistics hero: copy column (headline, subtitle, CTA) beside a stylized dot-matrix map (CSS grid of dots, deterministic pattern) with 5 pulsing city pins positioned by percentages; pins are buttons showing a small label card on hover/focus ("Lagos · 2h delivery"). Stacked on mobile, two columns from lg. Pulse off with reduced motion. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const pins = [{ city: 'Dakar', x: 18, y: 42, eta: 'Same day' }, { city: 'Abidjan', x: 32, y: 66, eta: '3h delivery' }, { city: 'Lagos', x: 48, y: 64, eta: '2h delivery' }, { city: 'Nairobi', x: 78, y: 70, eta: 'Same day' }, { city: 'Casablanca', x: 30, y: 16, eta: 'Next day' }];

export function MapPinsHero() {
  const [active, setActive] = useState<string | null>('Lagos');

  return (
    <section className="grid w-full max-w-5xl items-center gap-10 rounded-3xl bg-[#f4f1ea] px-6 py-12 lg:grid-cols-2 lg:px-12 dark:bg-zinc-950">
      <style>{`@keyframes pui-pin{0%{box-shadow:0 0 0 0 rgba(234,88,12,.5)}100%{box-shadow:0 0 0 12px rgba(234,88,12,0)}}`}</style>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400">Delivery network</p>
        <h1 className="mt-3 font-serif text-4xl text-zinc-950 sm:text-5xl dark:text-zinc-50">Same-day delivery in 40 cities.</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">One integration for couriers, lockers and returns across the continent.</p>
        <a href="#coverage" className="mt-6 inline-block rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Check coverage</a>
      </div>
      <div className="relative aspect-[4/3] w-full">
        <div aria-hidden className="absolute inset-0 grid grid-cols-[repeat(28,1fr)] gap-1.5">
          {Array.from({ length: 28 * 21 }, (_, index) => { const x = index % 28; const y = Math.floor(index / 28); const land = ((x - 14) ** 2) / 130 + ((y - 10) ** 2) / 80 < 1 + ((x * 3 + y * 5) % 4) * 0.08; return <span key={index} className={`aspect-square rounded-full ${land ? 'bg-zinc-400/70 dark:bg-zinc-600' : 'bg-transparent'}`} />; })}
        </div>
        {pins.map((pin) => (
          <div key={pin.city} className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
            <button type="button" aria-label={`${pin.city}, ${pin.eta}`} onMouseEnter={() => setActive(pin.city)} onFocus={() => setActive(pin.city)} className="block size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600 ring-2 ring-white outline-none motion-safe:animate-[pui-pin_1.8s_ease-out_infinite] focus-visible:ring-4 dark:ring-zinc-950" />
            {active === pin.city && <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-xs shadow-lg dark:bg-zinc-800"><strong className="text-zinc-900 dark:text-zinc-100">{pin.city}</strong> <span className="text-zinc-500">· {pin.eta}</span></span>}
          </div>
        ))}
      </div>
    </section>
  );
}
