/**
 * @registry
 * name: Notifications Drawer Sidebar
 * category: Sidebar
 * style: Glass
 * tags: recent
 * description: Tiroir latéral de notifications en verre : onglets Tout / Mentions / Non lus, groupes par jour, marquer comme lu et archiver.
 * prompt: Create a glass notifications drawer sidebar (open by default, in flow) over a blurred app background: header with title, unread count and "Mark all as read"; tabs (All, Mentions, Unread) as a tablist; notifications grouped under Today / Yesterday with avatar, rich text, time and an unread dot; each item has archive and mark-read actions revealed on hover/focus; empty state per tab; a bell button with badge toggles the drawer (aria-expanded) and Escape closes it. Full width on mobile. Light and dark mode.
 */
'use client';
import { Archive, Bell, Check, X } from 'lucide-react';
import { useId, useState } from 'react';

const initial = [
  { id: 1, who: 'Ava Chen', text: 'mentioned you in Checkout redesign', time: '9:41', day: 'Today', mention: true, unread: true, color: 'bg-violet-500' },
  { id: 2, who: 'Leo Martin', text: 'approved your pull request #482', time: '8:12', day: 'Today', mention: false, unread: true, color: 'bg-emerald-500' },
  { id: 3, who: 'Maya Patel', text: 'commented: “Can we ship this Friday?”', time: '17:30', day: 'Yesterday', mention: true, unread: false, color: 'bg-orange-500' },
  { id: 4, who: 'Billing', text: 'Your invoice for September is ready', time: '09:00', day: 'Yesterday', mention: false, unread: false, color: 'bg-sky-500' },
];

export function NotificationsDrawerSidebar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [tab, setTab] = useState<'All' | 'Mentions' | 'Unread'>('All');
  const [items, setItems] = useState(initial);
  const unread = items.filter((item) => item.unread).length;
  const visible = items.filter((item) => (tab === 'Mentions' ? item.mention : tab === 'Unread' ? item.unread : true));

  return (
    <div className="relative h-[28rem] w-full max-w-2xl overflow-hidden rounded-3xl sm:min-w-[36rem] bg-[linear-gradient(135deg,#c7d2fe,#fbcfe8,#fde68a)] dark:bg-[linear-gradient(135deg,#1e1b4b,#3b0764,#451a03)]">
      <div aria-hidden className="absolute inset-6 rounded-2xl bg-white/40 dark:bg-white/5"><div className="m-5 h-4 w-40 rounded bg-white/70 dark:bg-white/10" /><div className="mx-5 h-24 rounded-xl bg-white/50 dark:bg-white/5" /></div>
      <button type="button" aria-label={`Notifications, ${unread} unread`} aria-expanded={open} aria-controls={`${uid}-drawer`} onClick={() => setOpen(!open)} className="absolute left-5 top-5 grid size-10 place-items-center rounded-full bg-white/70 text-zinc-800 shadow backdrop-blur dark:bg-white/10 dark:text-white"><Bell aria-hidden className="size-5" />{unread > 0 && <span aria-hidden className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">{unread}</span>}</button>
      <aside id={`${uid}-drawer`} aria-label="Notifications" hidden={!open} onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }} className="absolute inset-y-0 right-0 flex w-full flex-col border-l border-white/50 bg-white/60 backdrop-blur-2xl sm:w-[22rem] dark:border-white/10 dark:bg-zinc-900/60">
        <div className="flex items-center justify-between px-4 pt-4">
          <h3 className="font-semibold text-zinc-900 dark:text-white">Notifications <span className="text-sm font-normal text-zinc-500">({unread})</span></h3>
          <div className="flex items-center gap-1"><button type="button" onClick={() => setItems((list) => list.map((item) => ({ ...item, unread: false })))} className="rounded-md px-2 py-1 text-xs font-medium text-indigo-700 hover:bg-white/60 dark:text-indigo-300 dark:hover:bg-white/10">Mark all as read</button><button type="button" aria-label="Close notifications" onClick={() => setOpen(false)} className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-white/60 dark:hover:bg-white/10"><X aria-hidden className="size-4" /></button></div>
        </div>
        <div role="tablist" aria-label="Filter notifications" className="mt-3 flex gap-1 px-4">{(['All', 'Mentions', 'Unread'] as const).map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`rounded-full px-3 py-1 text-xs font-medium ${tab === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-white/10'}`}>{name}</button>)}</div>
        <div role="tabpanel" aria-label={tab} className="mt-2 flex-1 overflow-y-auto px-2 pb-3" data-lenis-prevent>
          {['Today', 'Yesterday'].map((day) => {
            const group = visible.filter((item) => item.day === day);
            if (!group.length) return null;
            return (
              <section key={day} className="mt-2">
                <h4 className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{day}</h4>
                <ul className="mt-1 space-y-0.5">
                  {group.map((item) => (
                    <li key={item.id} className="group relative flex gap-3 rounded-xl px-2 py-2.5 hover:bg-white/60 focus-within:bg-white/60 dark:hover:bg-white/5 dark:focus-within:bg-white/5">
                      <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white ${item.color}`}>{item.who.split(' ').map((part) => part[0]).join('')}</span>
                      <p className="min-w-0 flex-1 text-sm text-zinc-700 dark:text-zinc-300"><strong className="font-semibold text-zinc-900 dark:text-white">{item.who}</strong> {item.text}<span className="block text-xs text-zinc-500">{item.time}</span></p>
                      {item.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-indigo-500"><span className="sr-only">Unread</span></span>}
                      <div className="absolute right-2 top-2 flex gap-0.5 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                        {item.unread && <button type="button" aria-label={`Mark notification from ${item.who} as read`} onClick={() => setItems((list) => list.map((entry) => (entry.id === item.id ? { ...entry, unread: false } : entry)))} className="grid size-7 place-items-center rounded-md bg-white text-zinc-600 shadow-sm hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300"><Check aria-hidden className="size-3.5" /></button>}
                        <button type="button" aria-label={`Archive notification from ${item.who}`} onClick={() => setItems((list) => list.filter((entry) => entry.id !== item.id))} className="grid size-7 place-items-center rounded-md bg-white text-zinc-600 shadow-sm hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300"><Archive aria-hidden className="size-3.5" /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {!visible.length && <p className="py-12 text-center text-sm text-zinc-500">You’re all caught up 🎉</p>}
        </div>
      </aside>
    </div>
  );
}
