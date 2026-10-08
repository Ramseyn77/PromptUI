/**
 * @registry
 * name: Glare Hover Card
 * category: Cards
 * style: Dark
 * tags: recent
 * description: Carte bancaire premium traversée par un reflet de lumière diagonal au survol.
 * prompt: Create a premium payment card (credit-card ratio) with a dark brushed gradient, chip, contactless icon, masked number and holder name; on hover or focus a diagonal white glare band sweeps across from left to right (transform transition on a skewed gradient layer). Card is focusable with a visible ring. Same look in light and dark mode, with page-aware shadow.
 */
import { Nfc } from 'lucide-react';

export function GlareHoverCard() {
  return (
    <div tabIndex={0} aria-label="Platinum card ending in 4821" className="group relative aspect-[1.586] w-full max-w-sm overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#18181b,#3f3f46_45%,#18181b)] p-6 text-white shadow-xl shadow-zinc-900/30 outline-none ring-teal-400 ring-offset-2 focus-visible:ring-2 dark:shadow-black/60 dark:ring-offset-zinc-950">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%] group-focus-visible:translate-x-[300%] motion-reduce:hidden" />
      <div className="flex items-start justify-between">
        <span className="text-sm font-semibold tracking-[0.2em] text-zinc-300">PLATINUM</span>
        <Nfc aria-hidden className="size-6 text-zinc-300" />
      </div>
      <div aria-hidden className="mt-6 h-9 w-12 rounded-md bg-[linear-gradient(135deg,#fde68a,#d97706)] shadow-inner" />
      <p className="mt-5 font-mono text-lg tracking-[0.18em] text-zinc-100">•••• •••• •••• 4821</p>
      <div className="mt-3 flex items-end justify-between text-xs">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-400">Card holder</p>
          <p className="font-medium tracking-wide">AMARA OKAFOR</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-zinc-400">Expires</p>
          <p className="font-medium">09/29</p>
        </div>
      </div>
    </div>
  );
}
