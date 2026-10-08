/**
 * @registry
 * name: Badge Count Button
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Boutons icône avec pastille de compteur façon daisyUI indicator : panier, messages, notifications, avec « 99+ ».
 * prompt: Create daisyUI "indicator" style icon buttons: cart, messages and bell buttons each with a corner badge (count, "99+" cap, or a dot), the badge pops when the count changes; demo controls (+1 / clear) update counts; aria-label includes the count ("Cart, 3 items"). Light and dark mode.
 */
'use client';
import { Bell, MessageCircle, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function BadgeCountButton() {
  const [cart, setCart] = useState(3);
  const [messages, setMessages] = useState(128);
  const [alerts, setAlerts] = useState(true);
  const badge = (value: number) => (value > 99 ? '99+' : String(value));
  const icon = 'relative grid size-12 place-items-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200';

  return (
    <div className="flex flex-col items-center gap-5">
      <style>{`@keyframes pui-badge-pop{50%{transform:scale(1.35)}}`}</style>
      <div className="flex gap-4">
        <button type="button" aria-label={`Cart, ${cart} items`} className={icon}><ShoppingBag aria-hidden className="size-5" />{cart > 0 && <span key={cart} className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white ring-2 ring-white motion-safe:animate-[pui-badge-pop_.3s] dark:ring-zinc-950">{badge(cart)}</span>}</button>
        <button type="button" aria-label={`Messages, ${messages} unread`} className={icon}><MessageCircle aria-hidden className="size-5" />{messages > 0 && <span key={messages} className="absolute -right-2 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white ring-2 ring-white motion-safe:animate-[pui-badge-pop_.3s] dark:ring-zinc-950">{badge(messages)}</span>}</button>
        <button type="button" aria-label={alerts ? 'Notifications, new' : 'Notifications'} className={icon}><Bell aria-hidden className="size-5" />{alerts && <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-900" />}</button>
      </div>
      <div className="flex gap-2 text-xs">
        <button type="button" onClick={() => { setCart((value) => value + 1); setMessages((value) => value + 1); setAlerts(true); }} className="rounded-lg border border-zinc-300 px-2.5 py-1 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">+1</button>
        <button type="button" onClick={() => { setCart(0); setMessages(0); setAlerts(false); }} className="rounded-lg border border-zinc-300 px-2.5 py-1 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Clear</button>
      </div>
    </div>
  );
}
