/**
 * @registry
 * name: Countdown Hero
 * category: Hero
 * style: Gradient
 * tags: recent
 * description: Hero de lancement produit avec compte a rebours en direct.
 * prompt: Create a product-launch hero with a live countdown (days, hours, minutes, seconds tiles updating every second, aria-live off to avoid noise, with an sr-only launch date), headline and "Notify me" CTA. Gradient background readable in light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

// Launch is always ~3 days ahead so the demo never reaches zero.
const target = () => Date.now() + 3 * 864e5 + 5 * 36e5;

export function CountdownHero() {
  // Time is read after mount only, so server and client render the same markup.
  const [clock, setClock] = useState<{ end: number; now: number } | null>(null);

  useEffect(() => {
    const end = target();
    setClock({ end, now: Date.now() });
    const timer = window.setInterval(() => setClock({ end, now: Date.now() }), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const left = clock ? Math.max(0, clock.end - clock.now) : 0;
  const units = [
    ['Days', Math.floor(left / 864e5)],
    ['Hours', Math.floor(left / 36e5) % 24],
    ['Minutes', Math.floor(left / 6e4) % 60],
    ['Seconds', Math.floor(left / 1e3) % 60],
  ] as const;

  return (
    <section className="w-full max-w-4xl rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-amber-500 px-6 py-14 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[.25em] text-white/80">Launching soon</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Aurora 2.0 is almost here</h1>
      <p className="sr-only">Launch in {units.map(([label, value]) => `${value} ${label}`).join(', ')}.</p>
      <div aria-hidden className="mx-auto mt-8 grid max-w-md grid-cols-4 gap-2 sm:gap-3">
        {units.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white/15 py-4 backdrop-blur">
            <p className="font-mono text-3xl font-semibold tabular-nums sm:text-4xl">{String(value).padStart(2, '0')}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/75">{label}</p>
          </div>
        ))}
      </div>
      <button type="button" className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white/90">Notify me</button>
    </section>
  );
}
