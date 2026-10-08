/**
 * @registry
 * name: Exit Intent CTA
 * category: CTA
 * style: Gradient
 * tags: recent
 * description: Offre de sortie « Avant de partir… » avec code promo copiable, compte à rebours et fermeture accessible.
 * prompt: Create an exit-intent offer card rendered in flow (defaultOpen): "Wait — take 20% off" headline on a gradient panel, a dashed coupon code box with a copy button (Copied! feedback), a 10-minute countdown that ticks after mount, primary "Apply discount" and a ghost "No thanks" that dismisses with an undo-able "Offer hidden — show again" line; labelled region, close button with aria-label. Light and dark mode.
 */
'use client';
import { Check, Copy, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ExitIntentCta({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    if (!open) return;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [open]);

  async function copy() {
    try { await navigator.clipboard.writeText('STAY20'); } catch { /* clipboard unavailable */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (!open) return <p className="text-sm text-zinc-500">Offer hidden — <button type="button" onClick={() => setOpen(true)} className="font-medium text-violet-600 underline dark:text-violet-400">show again</button></p>;

  return (
    <section aria-label="Special offer" className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
      <button type="button" aria-label="Close offer" onClick={() => setOpen(false)} className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-black/20 text-white hover:bg-black/30"><X aria-hidden className="size-4" /></button>
      <div className="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 px-6 pb-8 pt-7 text-white">
        <p className="text-sm font-medium text-white/80">Before you go…</p>
        <p className="mt-1 text-3xl font-bold tracking-tight">Take 20% off your first year</p>
      </div>
      <div className="-mt-5 px-6 pb-6">
        <div className="flex items-center justify-between rounded-2xl border-2 border-dashed border-violet-300 bg-white px-4 py-3 dark:border-violet-500/40 dark:bg-zinc-900">
          <span className="font-mono text-lg font-bold tracking-widest text-zinc-900 dark:text-zinc-100">STAY20</span>
          <button type="button" onClick={copy} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-violet-700 hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-500/10">{copied ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}<span aria-live="polite">{copied ? 'Copied!' : 'Copy'}</span></button>
        </div>
        <p className="mt-3 text-center text-xs text-zinc-500">Expires in <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span></p>
        <button type="button" className="mt-4 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900">Apply discount</button>
        <button type="button" onClick={() => setOpen(false)} className="mt-2 w-full py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">No thanks</button>
      </div>
    </section>
  );
}
