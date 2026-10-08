/**
 * @registry
 * name: Image Hotspots
 * category: Tooltips
 * style: Glass
 * tags: featured, recent
 * description: Points pulsants posés sur un visuel produit, chacun ouvre une bulle d'explication au clic ou au focus.
 * prompt: Create product image hotspots: over a gradient product illustration, three pulsing round buttons (aria-expanded, aria-label) placed with percentages; clicking or focusing one opens a glassy popover with title, short text and price next to it, closing others; Escape closes. Pulse disabled with reduced motion. Light and dark mode.
 */
'use client';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const spots = [
  { x: 28, y: 35, title: 'Recycled shell', text: 'Made from 80% ocean plastics.', side: 'right' },
  { x: 62, y: 58, title: 'Silent switches', text: 'Under 30 dB per keystroke.', side: 'left' },
  { x: 78, y: 26, title: 'USB-C & 2.4 GHz', text: '3 devices, 6 months battery.', side: 'left' },
];

export function ImageHotspots() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div onKeyDown={(event) => { if (event.key === 'Escape') setOpen(null); }} className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_30%_30%,#ccfbf1,transparent_50%),radial-gradient(circle_at_80%_70%,#ede9fe,transparent_50%),linear-gradient(#f4f4f5,#f4f4f5)] dark:bg-[radial-gradient(circle_at_30%_30%,#134e4a,transparent_50%),radial-gradient(circle_at_80%_70%,#3b0764,transparent_50%),linear-gradient(#18181b,#18181b)]">
      <style>{`@keyframes pui-hotspot{0%{box-shadow:0 0 0 0 rgba(255,255,255,.7)}100%{box-shadow:0 0 0 14px rgba(255,255,255,0)}}`}</style>
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[38%] w-[72%] -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-400 shadow-2xl dark:from-zinc-600 dark:to-zinc-800">
        <div className="grid h-full grid-cols-10 gap-1 p-3">{Array.from({ length: 30 }, (_, index) => <span key={index} className="rounded-[3px] bg-white/70 dark:bg-zinc-900/60" />)}</div>
      </div>
      {spots.map((spot, index) => (
        <div key={spot.title} className="absolute" style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
          <button type="button" aria-expanded={open === index} aria-label={spot.title} onClick={() => setOpen(open === index ? null : index)} onFocus={() => setOpen(index)} className={`grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-zinc-900 shadow-lg outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 motion-safe:animate-[pui-hotspot_1.8s_ease-out_infinite] ${open === index ? 'rotate-45' : ''}`}><Plus aria-hidden className="size-4" /></button>
          {open === index && (
            <div role="dialog" aria-label={spot.title} className={`absolute top-0 z-10 w-48 -translate-y-1/2 rounded-xl border border-white/50 bg-white/70 p-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70 ${spot.side === 'right' ? 'left-5' : 'right-5'}`}>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{spot.title}</p>
              <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">{spot.text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
