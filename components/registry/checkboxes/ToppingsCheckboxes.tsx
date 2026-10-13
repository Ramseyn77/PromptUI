/**
 * @registry
 * name: Toppings Checkboxes
 * category: Checkboxes
 * style: Gradient
 * tags: recent
 * description: Choix de garnitures de pizza avec prix, limite de 4 (les autres se désactivent), aperçu visuel sur la pizza et total en direct.
 * prompt: Create a pizza toppings picker: a fieldset of checkbox cards (emoji, name, +price) in a 2-column grid; a maximum of 4 toppings, after which unchecked options become disabled with a hint "Max 4 toppings"; a round pizza preview shows the selected toppings' emojis scattered at fixed deterministic positions with a pop-in animation; the total price updates live (aria-live) with the base price. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const toppings = [['🍄', 'Mushrooms', 1.5], ['🫑', 'Peppers', 1], ['🧅', 'Onions', 0.8], ['🫒', 'Olives', 1.2], ['🍍', 'Pineapple', 1.5], ['🌶️', 'Jalapeños', 1], ['🥓', 'Bacon', 2], ['🧀', 'Extra cheese', 1.8]] as const;
const spots = [[30, 30], [62, 26], [72, 58], [40, 66], [52, 44], [24, 54], [60, 74], [36, 44]];

export function ToppingsCheckboxes() {
  const [picked, setPicked] = useState<string[]>(['Mushrooms', 'Olives']);
  const max = 4;
  const total = 11 + toppings.filter(([, name]) => picked.includes(name)).reduce((sum, [, , price]) => sum + price, 0);

  return (
    <div className="grid w-full max-w-2xl items-center gap-6 rounded-3xl bg-gradient-to-br from-amber-50 to-rose-50 p-6 md:grid-cols-[auto_1fr] dark:from-zinc-900 dark:to-zinc-950">
      <style>{`@keyframes pui-topping-pop { from { transform: translate(-50%, -50%) scale(0) } to { transform: translate(-50%, -50%) scale(1) } }`}</style>
      <div aria-hidden className="relative mx-auto size-48 rounded-full bg-amber-300 p-3 shadow-inner dark:bg-amber-500">
        <div className="relative size-full rounded-full bg-gradient-to-br from-red-500 to-orange-600">
          <div className="absolute inset-3 rounded-full bg-yellow-100/70" />
          {picked.flatMap((name, pickIndex) => {
            const icon = toppings.find(([, label]) => label === name)![0];
            return [0, 1].map((copy) => { const [x, y] = spots[(pickIndex * 2 + copy) % spots.length]; return <span key={`${name}${copy}`} className="absolute text-xl motion-safe:animate-[pui-topping-pop_.3s_cubic-bezier(.3,1.6,.5,1)]" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>{icon}</span>; });
          })}
        </div>
      </div>
      <fieldset>
        <legend className="text-lg font-semibold text-zinc-950 dark:text-white">Choose toppings</legend>
        <p className="text-xs text-zinc-500">{picked.length >= max ? 'Max 4 toppings — remove one to swap.' : `Up to ${max} · ${max - picked.length} left`}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {toppings.map(([icon, name, price]) => {
            const checked = picked.includes(name);
            const disabled = !checked && picked.length >= max;
            return (
              <label key={name} className={`flex items-center gap-2 rounded-xl border bg-white p-2.5 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose-500 dark:bg-zinc-900 ${checked ? 'border-rose-500 shadow-sm' : 'border-zinc-200 dark:border-zinc-800'} ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}>
                <input type="checkbox" checked={checked} disabled={disabled} onChange={() => setPicked((list) => (checked ? list.filter((item) => item !== name) : [...list, name]))} className="size-4 accent-rose-600" />
                <span aria-hidden>{icon}</span><span className="flex-1 text-zinc-800 dark:text-zinc-200">{name}</span><span className="text-xs tabular-nums text-zinc-500">+${price.toFixed(2)}</span>
              </label>
            );
          })}
        </div>
        <p aria-live="polite" className="mt-4 flex items-baseline justify-between border-t border-zinc-900/10 pt-3 text-sm dark:border-white/10"><span className="text-zinc-500">Large Margherita + {picked.length} toppings</span><strong className="text-xl tabular-nums text-zinc-950 dark:text-white">${total.toFixed(2)}</strong></p>
      </fieldset>
    </div>
  );
}
