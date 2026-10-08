/**
 * @registry
 * name: Notification Navbar
 * category: Navbar
 * style: SaaS
 * tags: recent
 * description: Barre d'application avec panneau de notifications et badge numérique clignotant en continu.
 * prompt: Create an app navbar with a bell button and an infinitely pulsing numeric unread badge, opening a notifications panel with avatar, text, time and unread dots, plus "Mark all as read" that clears the badge. Respect reduced-motion preferences. Uses a defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Bell } from 'lucide-react';
import { useState } from 'react';

const initial = [
  { id: 1, who: 'Maya', text: 'commented on Landing v2', time: '2m', unread: true },
  { id: 2, who: 'Leo', text: 'assigned you to Checkout QA', time: '1h', unread: true },
  { id: 3, who: 'Sara', text: 'shipped Pricing page', time: '3h', unread: false },
];

export function NotificationNavbar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [items, setItems] = useState(initial);
  const unread = items.filter((item) => item.unread).length;

  return (
    <div className="w-full max-w-md">
      <nav aria-label="App" className="flex h-14 items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="font-semibold text-zinc-900 dark:text-white">Pulse</span>
        <button type="button" aria-label={`Notifications, ${unread} unread`} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative grid size-9 place-items-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-5 text-white shadow-[0_0_0_2px_white] motion-safe:animate-pulse dark:shadow-[0_0_0_2px_#09090b]">
              <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-rose-500 motion-safe:animate-ping" />
              {unread}
            </span>
          )}
        </button>
      </nav>
      {open && (
        <section aria-label="Notifications" className="mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Notifications</p>
            <button type="button" onClick={() => setItems((current) => current.map((item) => ({ ...item, unread: false })))} className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400">Mark all as read</button>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">{item.who[0]}</span>
                <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-400"><strong className="font-semibold text-zinc-900 dark:text-white">{item.who}</strong> {item.text}<span className="block text-xs text-zinc-400">{item.time} ago</span></p>
                {item.unread && <span className="mt-2 size-2 rounded-full bg-teal-500" aria-label="Unread" />}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
