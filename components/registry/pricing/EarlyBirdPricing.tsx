/**
 * @registry
 * name: Early Bird Pricing
 * category: Pricing
 * style: Dark
 * tags: featured, recent
 * description: Tarif de lancement par paliers : places restantes par palier, palier actuel mis en avant, paliers épuisés barrés et compte à rebours.
 * prompt: Create a dark launch pricing section with early-bird tiers: a horizontal track of four tiers ($49 sold out, $79 current, $99, $129 regular) where sold-out tiers are struck through, the current tier glows and shows "63 of 200 seats left" with a progress bar, future tiers are dimmed; a countdown "Price goes up in 2d 14h 06m" ticking after mount; a single "Get lifetime access" CTA with what's included; stacks vertically on mobile. Dark in both themes.
 */
'use client';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

const tiers = [{ price: 49, label: 'Founders', state: 'sold' }, { price: 79, label: 'Early bird', state: 'current' }, { price: 99, label: 'Launch', state: 'next' }, { price: 129, label: 'Regular', state: 'next' }] as const;

export function EarlyBirdPricing() {
  const [seconds, setSeconds] = useState(2 * 86400 + 14 * 3600 + 6 * 60);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <section className="w-full max-w-4xl rounded-3xl bg-zinc-950 p-6 text-white ring-1 ring-white/10 sm:p-8">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-amber-400">Lifetime deal · launch week</p>
      <h3 className="mt-2 text-center text-3xl font-bold tracking-tight">Pay once. Use forever.</h3>
      <p className="mt-2 text-center text-sm text-zinc-400">Price goes up in <span className="font-mono tabular-nums text-white">{d}d {String(h).padStart(2, '0')}h {String(m).padStart(2, '0')}m {String(s).padStart(2, '0')}s</span></p>
      <ol className="mt-8 grid gap-3 md:grid-cols-4">
        {tiers.map((tier) => (
          <li key={tier.price} className={`relative rounded-2xl p-4 ring-1 ${tier.state === 'current' ? 'bg-amber-400/10 ring-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.25)]' : tier.state === 'sold' ? 'ring-white/10 opacity-50' : 'ring-white/10 opacity-70'}`}>
            {tier.state === 'current' && <span className="absolute -top-2.5 left-4 rounded-full bg-amber-400 px-2 text-[10px] font-bold uppercase text-zinc-950">Now</span>}
            <p className="text-xs text-zinc-400">{tier.label}</p>
            <p className={`text-3xl font-bold ${tier.state === 'sold' ? 'line-through' : ''}`}>${tier.price}</p>
            {tier.state === 'sold' && <p className="mt-1 text-xs font-semibold text-rose-400">Sold out</p>}
            {tier.state === 'current' && <><div className="mt-3 h-1.5 rounded-full bg-white/10" role="progressbar" aria-label="Seats claimed" aria-valuenow={137} aria-valuemax={200}><div className="h-full w-[68%] rounded-full bg-amber-400" /></div><p className="mt-1.5 text-xs text-amber-200">63 of 200 seats left</p></>}
            {tier.state === 'next' && <p className="mt-1 text-xs text-zinc-500">Unlocks next</p>}
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <ul className="grid gap-x-6 gap-y-1.5 text-sm text-zinc-300 sm:grid-cols-2">{['All future updates', 'Unlimited projects', 'Commercial license', 'Private Discord'].map((item) => <li key={item} className="flex items-center gap-2"><Check aria-hidden className="size-4 text-amber-400" />{item}</li>)}</ul>
        <a href="#" className="rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-amber-300">Get lifetime access · $79</a>
      </div>
    </section>
  );
}
