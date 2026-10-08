/**
 * @registry
 * name: Animated Notification List
 * category: Cards
 * style: Glass
 * tags: featured, recent
 * description: Liste de notifications qui apparaissent une à une en haut avec un rebond, façon iOS.
 * prompt: Create an animated notification list: every 1.8s a new notification (icon tile with colored background, title, time, message) springs in at the top while older ones shift down and the list keeps the last 4, faded at the bottom with a mask. aria-live="polite" region; static list with reduced motion; pauses when hovered. Light and dark mode.
 */
'use client';
import { CreditCard, MessageCircle, UserPlus, Zap, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const events: { title: string; text: string; icon: LucideIcon; tone: string }[] = [
  { title: 'Payment received', text: 'Acme Inc. paid €1,240', icon: CreditCard, tone: 'bg-emerald-500' },
  { title: 'New signup', text: 'Kofi joined the Pro plan', icon: UserPlus, tone: 'bg-sky-500' },
  { title: 'New message', text: 'Ines: “Can we ship today?”', icon: MessageCircle, tone: 'bg-violet-500' },
  { title: 'Deploy finished', text: 'production · 42s', icon: Zap, tone: 'bg-amber-500' },
];

export function AnimatedNotificationList() {
  const [count, setCount] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setCount((value) => value + 1), 1800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const items = Array.from({ length: Math.min(count, 4) }, (_, index) => count - 1 - index);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative h-80 w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-sky-100 via-white to-violet-100 p-4 dark:from-sky-950/60 dark:via-zinc-950 dark:to-violet-950/60 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
      <style>{`@keyframes pui-notif-in{0%{opacity:0;transform:translateY(-12px) scale(.9)}60%{transform:translateY(2px) scale(1.02)}100%{opacity:1;transform:none}}`}</style>
      <ul aria-live="polite" aria-label="Notifications" className="flex flex-col gap-3">
        {items.map((serial) => {
          const event = events[serial % events.length];
          const Icon = event.icon;
          return (
            <li key={serial} className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-sm backdrop-blur motion-safe:animate-[pui-notif-in_.5s_cubic-bezier(.34,1.3,.64,1)] dark:border-white/10 dark:bg-zinc-900/70">
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-white ${event.tone}`}><Icon aria-hidden className="size-5" /></span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{event.title}<span className="text-xs font-normal text-zinc-400">· now</span></p>
                <p className="truncate text-sm text-zinc-600 dark:text-zinc-400">{event.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
