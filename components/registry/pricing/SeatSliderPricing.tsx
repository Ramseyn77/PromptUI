/**
 * @registry
 * name: Seat Slider Pricing
 * category: Pricing
 * style: Minimal
 * tags: featured, recent
 * description: Calcul du prix selon le nombre de places choisi au curseur, avec paliers dégressifs.
 * prompt: Create a seat-based pricing calculator: a range slider (1–100 seats) with a styled track fill, live price per seat with volume tiers (1–10 $12, 11–50 $10, 51+ $8), total per month, the active tier highlighted in a tier list, and a CTA. aria-valuetext on the slider. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const tiers = [
  { max: 10, price: 12, label: '1–10 seats' },
  { max: 50, price: 10, label: '11–50 seats' },
  { max: 100, price: 8, label: '51+ seats' },
];

export function SeatSliderPricing() {
  const [seats, setSeats] = useState(24);
  const tier = tiers.find((item) => seats <= item.max)!;
  const fill = ((seats - 1) / 99) * 100;

  return (
    <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">How many seats?</p>
      <p className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-white">{seats} <span className="text-base font-normal text-zinc-500">seats</span></p>
      <input
        type="range"
        min={1}
        max={100}
        value={seats}
        onChange={(event) => setSeats(Number(event.target.value))}
        aria-label="Number of seats"
        aria-valuetext={`${seats} seats, $${tier.price} per seat`}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-teal-600"
        style={{ background: `linear-gradient(to right, #14b8a6 ${fill}%, rgb(161 161 170 / .3) ${fill}%)` }}
      />
      <ul className="mt-5 grid grid-cols-3 gap-2 text-center">
        {tiers.map((item) => (
          <li key={item.label} className={`rounded-xl border p-2 transition ${item === tier ? 'border-teal-500 bg-teal-500/5' : 'border-zinc-200 dark:border-zinc-800'}`}>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">${item.price}</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.label}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-end justify-between border-t border-zinc-200 pt-5 dark:border-zinc-800">
        <div><p className="text-sm text-zinc-500 dark:text-zinc-400">Total</p><p className="text-3xl font-semibold tabular-nums text-zinc-900 dark:text-white">${seats * tier.price}<span className="text-sm font-normal text-zinc-500">/mo</span></p></div>
        <button type="button" className="rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Continue</button>
      </div>
    </section>
  );
}
