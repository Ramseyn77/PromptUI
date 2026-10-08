/**
 * @registry
 * name: Number Stepper Input
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Champs numériques façon HeroUI avec boutons +/−, maintien pour répéter, min/max et formats devise et pourcentage.
 * prompt: Create HeroUI-style number inputs: three labelled fields (Quantity 1–99, Price in EUR with currency formatting on blur, Discount % clamped 0–100) each with −/+ stepper buttons (aria-label, disabled at bounds, press-and-hold repeats), ArrowUp/ArrowDown keyboard stepping and inputMode="decimal". Light and dark mode.
 */
'use client';
import { Minus, Plus } from 'lucide-react';
import { useId, useRef, useState } from 'react';

function Stepper({ label, value, set, min, max, step, format }: { label: string; value: number; set: (value: number) => void; min: number; max: number; step: number; format: (value: number) => string }) {
  const id = useId();
  const timer = useRef(0);
  const [focus, setFocus] = useState(false);
  const clamp = (next: number) => Math.min(max, Math.max(min, Math.round(next * 100) / 100));
  const hold = (delta: number) => { let current = value; const run = () => { current = clamp(current + delta); set(current); }; run(); timer.current = window.setInterval(run, 120); };
  const release = () => window.clearInterval(timer.current);
  const button = 'grid w-9 place-items-center text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800';

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</label>
      <div className="mt-1.5 flex h-10 overflow-hidden rounded-xl border border-zinc-300 bg-white focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-950">
        <button type="button" aria-label={`Decrease ${label}`} disabled={value <= min} onPointerDown={() => hold(-step)} onPointerUp={release} onPointerLeave={release} className={button}><Minus aria-hidden className="size-4" /></button>
        <input id={id} inputMode="decimal" value={focus ? String(value) : format(value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(event) => { const next = Number(event.target.value.replace(',', '.')); if (!Number.isNaN(next)) set(clamp(next)); }} onKeyDown={(event) => { if (event.key === 'ArrowUp') { event.preventDefault(); set(clamp(value + step)); } if (event.key === 'ArrowDown') { event.preventDefault(); set(clamp(value - step)); } }} className="w-full min-w-0 border-x border-zinc-200 bg-transparent text-center text-sm tabular-nums text-zinc-900 outline-none dark:border-zinc-800 dark:text-zinc-100" />
        <button type="button" aria-label={`Increase ${label}`} disabled={value >= max} onPointerDown={() => hold(step)} onPointerUp={release} onPointerLeave={release} className={button}><Plus aria-hidden className="size-4" /></button>
      </div>
    </div>
  );
}

export function NumberStepperInput() {
  const [quantity, setQuantity] = useState(2);
  const [price, setPrice] = useState(24.9);
  const [discount, setDiscount] = useState(10);
  const total = quantity * price * (1 - discount / 100);

  return (
    <div className="grid w-full max-w-xs gap-4">
      <Stepper label="Quantity" value={quantity} set={setQuantity} min={1} max={99} step={1} format={(value) => String(value)} />
      <Stepper label="Unit price" value={price} set={setPrice} min={0} max={9999} step={0.5} format={(value) => value.toLocaleString('en-IE', { style: 'currency', currency: 'EUR' })} />
      <Stepper label="Discount" value={discount} set={setDiscount} min={0} max={100} step={5} format={(value) => `${value}%`} />
      <p aria-live="polite" className="flex justify-between border-t border-zinc-200 pt-3 text-sm dark:border-zinc-800"><span className="text-zinc-500">Total</span><strong className="tabular-nums text-zinc-950 dark:text-zinc-50">{total.toLocaleString('en-IE', { style: 'currency', currency: 'EUR' })}</strong></p>
    </div>
  );
}
