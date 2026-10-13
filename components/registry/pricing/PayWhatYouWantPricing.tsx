/**
 * @registry
 * name: Pay What You Want Pricing
 * category: Pricing
 * style: Gradient
 * tags: recent
 * description: Prix libre pour un produit numérique : montants suggérés, saisie personnalisée avec minimum, répartition de votre paiement et bonus débloqués.
 * prompt: Create a pay-what-you-want pricing card for a digital product (an icon pack): suggested amount chips ($0, $9, $19, $29 "most chosen") as a radiogroup plus a custom amount input with a $5 minimum when not free (validation message); a live breakdown bar showing where the money goes (creator / taxes / platform) with percentages; bonus perks that unlock at thresholds ($19: Figma source, $29: commercial license) shown with locks/checks; a gradient Buy button showing the amount or "Download free". Light and dark mode.
 */
'use client';
import { Check, Lock } from 'lucide-react';
import { useId, useState } from 'react';

const presets = [0, 9, 19, 29];
const perks = [[0, '600 SVG icons'], [19, 'Figma source file'], [29, 'Commercial license']] as const;

export function PayWhatYouWantPricing() {
  const uid = useId();
  const [amount, setAmount] = useState(19);
  const [custom, setCustom] = useState('');
  const value = custom ? Number(custom) : amount;
  const invalid = custom !== '' && (Number.isNaN(value) || (value > 0 && value < 5));
  const creator = value ? Math.round(value * 0.82 * 100) / 100 : 0;

  return (
    <section className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-amber-200 via-rose-200 to-violet-300 p-px dark:from-amber-500/40 dark:via-rose-500/40 dark:to-violet-500/40">
      <div className="rounded-3xl bg-white p-6 dark:bg-zinc-950">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Pay what you want</p>
        <h3 className="mt-1 text-2xl font-bold text-zinc-950 dark:text-white">Orbit Icons</h3>
        <fieldset className="mt-5"><legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Choose an amount</legend>
          <div className="mt-2 grid grid-cols-4 gap-2">{presets.map((preset) => <label key={preset} className={`relative cursor-pointer rounded-xl border py-2 text-center text-sm font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose-500 ${!custom && amount === preset ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950' : 'border-zinc-200 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200'}`}><input type="radio" name={`${uid}-amount`} checked={!custom && amount === preset} onChange={() => { setAmount(preset); setCustom(''); }} className="sr-only" />${preset}{preset === 19 && <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-rose-500 px-1.5 text-[9px] font-semibold text-white">Popular</span>}</label>)}</div>
        </fieldset>
        <label htmlFor={`${uid}-custom`} className="mt-3 block text-xs text-zinc-500">Or enter your own</label>
        <div className={`mt-1 flex items-center rounded-xl border px-3 ${invalid ? 'border-rose-500' : 'border-zinc-300 dark:border-zinc-700'}`}><span className="text-sm text-zinc-400">$</span><input id={`${uid}-custom`} inputMode="decimal" value={custom} aria-invalid={invalid} aria-describedby={`${uid}-hint`} onChange={(event) => setCustom(event.target.value.replace(/[^\d.]/g, ''))} placeholder="35" className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100" /></div>
        <p id={`${uid}-hint`} className={`mt-1 h-4 text-xs ${invalid ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500'}`}>{invalid ? 'Minimum $5, or choose $0.' : ''}</p>
        {value > 0 && !invalid && (
          <div className="mt-3">
            <div aria-hidden className="flex h-2 overflow-hidden rounded-full"><span className="bg-rose-500" style={{ width: '82%' }} /><span className="bg-amber-400" style={{ width: '10%' }} /><span className="bg-zinc-300 dark:bg-zinc-600" style={{ width: '8%' }} /></div>
            <p aria-live="polite" className="mt-1.5 text-xs text-zinc-500"><span className="font-semibold text-zinc-900 dark:text-zinc-100">${creator.toFixed(2)}</span> goes to the creator · 10% taxes · 8% platform</p>
          </div>
        )}
        <ul className="mt-4 space-y-1.5">{perks.map(([threshold, label]) => { const on = !invalid && value >= threshold; return <li key={label} className={`flex items-center gap-2 text-sm ${on ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>{on ? <Check aria-hidden className="size-4 text-emerald-500" /> : <Lock aria-hidden className="size-4" />}{label}{!on && <span className="text-xs">from ${threshold}</span>}<span className="sr-only">{on ? 'included' : 'locked'}</span></li>; })}</ul>
        <button type="button" disabled={invalid} className="mt-5 w-full rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 py-3 text-sm font-semibold text-white disabled:opacity-40">{value > 0 ? `Buy for $${value}` : 'Download free'}</button>
      </div>
    </section>
  );
}
