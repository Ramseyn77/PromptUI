/**
 * @registry
 * name: World Map Testimonials
 * category: Testimonials
 * style: Dark
 * tags: recent
 * description: Carte du monde en points avec épingles de clients ; cliquer une épingle affiche le témoignage et la ville, avec liste accessible.
 * prompt: Create a dark testimonials map: a dotted world map made of a deterministic dot grid (no randomness) with five glowing customer pins at fixed positions; pins are buttons (aria-pressed) with a pulsing ring; selecting one shows a quote card below with name, city and company and highlights the pin; an accessible list of the same customers is available for keyboard users; reduced motion stops the pulse. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const pins = [
  { city: 'Dakar', x: 45, y: 52, name: 'Awa Diop', company: 'Kora Bank', quote: 'We onboarded 40 agents in a week. That has never happened before.' },
  { city: 'Paris', x: 49, y: 31, name: 'Lucas Moreau', company: 'Atelier', quote: 'Our designers and engineers finally speak the same language.' },
  { city: 'New York', x: 27, y: 36, name: 'Dana Price', company: 'Stackline', quote: 'Cut our reporting time from two days to two hours.' },
  { city: 'Nairobi', x: 58, y: 60, name: 'Brian Otieno', company: 'Shamba', quote: 'Works beautifully on slow connections, which matters for us.' },
  { city: 'Tokyo', x: 85, y: 38, name: 'Mei Tanaka', company: 'Northwind', quote: 'The calmest product launch we have ever run.' },
];
// Rough land mask: a dot is drawn when it falls inside one of these continent boxes.
const land = [[18, 22, 34, 50], [26, 50, 34, 78], [44, 24, 56, 40], [44, 42, 62, 76], [56, 22, 90, 50], [78, 62, 88, 74]];
const dots = Array.from({ length: 40 * 22 }, (_, index) => ({ x: (index % 40) * 2.5 + 1.25, y: Math.floor(index / 40) * 4.5 + 2 })).filter(({ x, y }) => land.some(([x1, y1, x2, y2]) => x >= x1 && x <= x2 && y >= y1 && y <= y2) && (Math.round(x * 4) + Math.round(y)) % 5 !== 0);

export function WorldMapTestimonials() {
  const [active, setActive] = useState(0);
  const pin = pins[active];

  return (
    <section className="w-full max-w-3xl rounded-3xl bg-zinc-950 p-6 text-white ring-1 ring-white/10">
      <h3 className="text-center text-2xl font-semibold">Loved in 40+ countries</h3>
      <div className="relative mt-6 aspect-[2/1]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 size-full">{dots.map((dot) => <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="0.9" className="fill-white/35" />)}</svg>
        {pins.map((item, index) => (
          <button key={item.city} type="button" aria-pressed={active === index} aria-label={`${item.name}, ${item.city}`} onClick={() => setActive(index)} className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
            <span aria-hidden className={`absolute inset-0 rounded-full motion-safe:animate-ping ${active === index ? 'bg-emerald-400/50' : 'bg-sky-400/30'}`} />
            <span aria-hidden className={`relative size-2.5 rounded-full ${active === index ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' : 'bg-sky-400'}`} />
          </button>
        ))}
      </div>
      <figure aria-live="polite" className="mx-auto mt-4 max-w-lg rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10">
        <blockquote className="text-lg leading-relaxed">“{pin.quote}”</blockquote>
        <figcaption className="mt-3 text-sm text-zinc-400"><span className="font-semibold text-white">{pin.name}</span> · {pin.company} · {pin.city}</figcaption>
      </figure>
    </section>
  );
}
