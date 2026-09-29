/**
 * @registry
 * name: Regional Discount
 * category: Pricing
 * style: Gradient
 * tags: recent
 * description: Bandeau de parite de pouvoir d achat avec pays detecte, remise et code a copier.
 * prompt: Create a purchasing-power-parity banner: "Hey! It looks like you're in Côte d'Ivoire", explanation of a 60% regional discount, a copyable coupon code button (shows "Copied"), original vs discounted price, and a dismiss button. Gradient border; light and dark mode.
 */
'use client';
import { Check, Copy, X } from 'lucide-react';
import { useState } from 'react';

export function RegionalDiscount() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(true);

  async function copy() {
    await navigator.clipboard.writeText('PPP60CI');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (!open) return <button type="button" onClick={() => setOpen(true)} className="text-sm text-teal-700 underline dark:text-teal-400">Show regional offer</button>;

  return (
    <aside className="w-full max-w-xl rounded-2xl bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 p-px">
      <div className="relative flex flex-col gap-4 rounded-[15px] bg-white p-5 sm:flex-row sm:items-center dark:bg-zinc-950">
        <button type="button" aria-label="Dismiss offer" onClick={() => setOpen(false)} className="absolute right-3 top-3 grid size-7 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"><X className="size-4" /></button>
        <div className="flex-1 pr-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Hey! It looks like you&apos;re in Côte d&apos;Ivoire 🇨🇮</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">We support purchasing power parity: use this code for <strong className="text-zinc-900 dark:text-white">60% off</strong>.</p>
          <p className="mt-2 text-sm"><span className="text-zinc-400 line-through">$149</span> <span className="font-semibold text-emerald-600 dark:text-emerald-400">$59.60</span></p>
        </div>
        <button type="button" onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-400 px-4 py-2.5 font-mono text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-900">
          PPP60CI {copied ? <Check aria-label="Copied" className="size-4 text-emerald-500" /> : <Copy aria-label="Copy code" className="size-4 text-zinc-400" />}
        </button>
      </div>
    </aside>
  );
}
