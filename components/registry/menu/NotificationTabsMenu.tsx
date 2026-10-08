/**
 * @registry
 * name: Notification Tabs Menu
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Menu de notifications avec onglets Tout / Mentions / Non lues, puces de non-lu et « Tout marquer comme lu ».
 * prompt: Create a notifications dropdown (in flow under a bell button with an unread count badge): header with "Mark all as read", tabs (All, Mentions, Unread) as a tablist that filters the list, each item with avatar, rich text, time and an unread dot; clicking an item marks it read; empty state per tab. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Bell } from 'lucide-react';
import { useState } from 'react';

const initial = [
  { id: 1, who: 'Ana', text: 'mentioned you in Launch plan', mention: true, time: '2m', unread: true, tone: 'from-rose-400 to-orange-300' },
  { id: 2, who: 'Leo', text: 'approved your pull request #128', mention: false, time: '1h', unread: true, tone: 'from-sky-400 to-indigo-500' },
  { id: 3, who: 'Mia', text: 'replied: “Looks great, ship it”', mention: true, time: '3h', unread: false, tone: 'from-emerald-400 to-teal-500' },
  { id: 4, who: 'Kofi', text: 'invited you to Q4 Planning', mention: false, time: 'Yesterday', unread: false, tone: 'from-violet-400 to-fuchsia-500' },
];
const tabs = ['All', 'Mentions', 'Unread'] as const;

export function NotificationTabsMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [tab, setTab] = useState<(typeof tabs)[number]>('All');
  const [items, setItems] = useState(initial);
  const unread = items.filter((item) => item.unread).length;
  const shown = items.filter((item) => tab === 'All' || (tab === 'Mentions' ? item.mention : item.unread));

  return (
    <div className="w-80">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} aria-label={`Notifications, ${unread} unread`} onClick={() => setOpen((value) => !value)} className="relative grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        <Bell aria-hidden className="size-5" />{unread > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">{unread}</span>}
      </button>
      {open && (
        <div role="dialog" aria-label="Notifications" className="mt-2 rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between px-4 pt-3">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notifications</p>
            <button type="button" disabled={!unread} onClick={() => setItems((list) => list.map((item) => ({ ...item, unread: false })))} className="text-xs font-medium text-teal-700 disabled:opacity-40 dark:text-teal-400">Mark all as read</button>
          </div>
          <div role="tablist" className="mt-2 flex gap-4 border-b border-zinc-200 px-4 dark:border-zinc-800">
            {tabs.map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`-mb-px border-b-2 py-2 text-xs font-medium ${tab === name ? 'border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100' : 'border-transparent text-zinc-500'}`}>{name}{name === 'Unread' && unread ? ` (${unread})` : ''}</button>)}
          </div>
          <ul role="tabpanel" aria-label={tab} className="p-1.5">
            {shown.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => setItems((list) => list.map((entry) => (entry.id === item.id ? { ...entry, unread: false } : entry)))} className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900">
                  <span aria-hidden className={`size-8 shrink-0 rounded-full bg-gradient-to-br ${item.tone}`} />
                  <span className="min-w-0 flex-1 text-sm text-zinc-700 dark:text-zinc-300"><strong className="font-semibold text-zinc-900 dark:text-zinc-100">{item.who}</strong> {item.text}<span className="block text-xs text-zinc-400">{item.time}</span></span>
                  {item.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-teal-500"><span className="sr-only">Unread</span></span>}
                </button>
              </li>
            ))}
            {!shown.length && <li className="py-8 text-center text-sm text-zinc-500">You're all caught up ✨</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
