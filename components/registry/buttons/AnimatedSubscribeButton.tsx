/**
 * @registry
 * name: Animated Subscribe Button
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Bouton S'abonner dont le texte glisse vers le haut pour laisser place à « Abonné » avec coche, cloche de notifications et compteur d'abonnés.
 * prompt: Create an animated subscribe button inspired by magicui: a pill button "Subscribe" with a gradient background; clicking slides the label up out of view while "Subscribed ✓" slides in from below and the background turns neutral; a bell toggle appears next to it (aria-pressed) to enable notifications with a small ring animation; a subscriber count increments/decrements; aria-pressed on the main button; reduced motion swaps instantly. Light and dark mode.
 */
'use client';
import { Bell, BellRing, Check } from 'lucide-react';
import { useState } from 'react';

export function AnimatedSubscribeButton() {
  const [subscribed, setSubscribed] = useState(false);
  const [bell, setBell] = useState(false);
  const count = 12840 + (subscribed ? 1 : 0);

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <style>{`@keyframes pui-bell-ring { 0%, 100% { transform: rotate(0) } 20% { transform: rotate(18deg) } 40% { transform: rotate(-14deg) } 60% { transform: rotate(8deg) } 80% { transform: rotate(-4deg) } }`}</style>
      <div className="flex items-center gap-2">
        <button type="button" aria-pressed={subscribed} onClick={() => { setSubscribed(!subscribed); if (subscribed) setBell(false); }} className={`relative h-11 w-40 overflow-hidden rounded-full text-sm font-semibold transition-colors duration-300 ${subscribed ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white' : 'bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 text-white shadow-lg shadow-fuchsia-500/30'}`}>
          <span className={`absolute inset-0 grid place-items-center transition-transform duration-300 motion-reduce:duration-0 ${subscribed ? '-translate-y-full' : 'translate-y-0'}`}>Subscribe</span>
          <span className={`absolute inset-0 flex items-center justify-center gap-1.5 transition-transform duration-300 motion-reduce:duration-0 ${subscribed ? 'translate-y-0' : 'translate-y-full'}`}><Check aria-hidden className="size-4" />Subscribed</span>
          <span className="invisible">Subscribed</span>
        </button>
        <button type="button" aria-label="Notify me about new videos" aria-pressed={bell} disabled={!subscribed} onClick={() => setBell(!bell)} className={`grid size-11 place-items-center rounded-full transition ${subscribed ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'} ${bell ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'}`}>
          {bell ? <BellRing aria-hidden className="size-5 motion-safe:animate-[pui-bell-ring_.6s_ease-in-out]" /> : <Bell aria-hidden className="size-5" />}
        </button>
      </div>
      <p aria-live="polite" className="text-xs text-zinc-500"><span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{count.toLocaleString('en-US')}</span> subscribers{bell ? ' · notifications on' : ''}</p>
    </div>
  );
}
