/**
 * @registry
 * name: Chat List Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Liste de conversations façon messagerie : recherche, filtres Toutes / Non lues, aperçus, heures et badges.
 * prompt: Create a messaging sidebar: header with title and new-chat button, search field, filter chips (All / Unread / Groups) as a radiogroup, and a scrollable list of conversations with avatar (online dot), name, last message preview truncated, time and unread count badge; selected conversation highlighted (aria-current); filters and search combine. Light and dark mode.
 */
'use client';
import { Search, SquarePen } from 'lucide-react';
import { useState } from 'react';

const chats = [
  { name: 'Design team', last: 'Ana: new hero is up for review', time: '10:42', unread: 3, group: true, online: false, tone: 'from-violet-400 to-fuchsia-500' },
  { name: 'Kofi Mensah', last: 'Sounds good, see you at 3', time: '09:15', unread: 0, group: false, online: true, tone: 'from-emerald-400 to-teal-500' },
  { name: 'Ines Duarte', last: 'Sent you the contract 📄', time: 'Yesterday', unread: 1, group: false, online: false, tone: 'from-rose-400 to-orange-300' },
  { name: 'Launch 🚀', last: 'Leo: countdown is live', time: 'Mon', unread: 0, group: true, online: false, tone: 'from-sky-400 to-indigo-500' },
  { name: 'Yuki Tanaka', last: 'Thanks!', time: 'Sun', unread: 0, group: false, online: true, tone: 'from-amber-300 to-pink-400' },
];

export function ChatListSidebar() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('Kofi Mensah');
  const shown = chats.filter((chat) => (filter === 'All' || (filter === 'Unread' ? chat.unread > 0 : chat.group)) && chat.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="flex h-[28rem] w-full max-w-xs flex-col rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between px-4 pt-4"><h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Chats</h3><button type="button" aria-label="New chat" className="grid size-8 place-items-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"><SquarePen aria-hidden className="size-4" /></button></div>
      <label className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-2 dark:bg-zinc-900"><Search aria-hidden className="size-4 text-zinc-400" /><input aria-label="Search chats" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="w-full bg-transparent text-sm text-zinc-900 outline-none dark:text-zinc-100" /></label>
      <div role="radiogroup" aria-label="Filter" className="mx-4 mt-3 flex gap-1.5">{['All', 'Unread', 'Groups'].map((name) => <button key={name} type="button" role="radio" aria-checked={filter === name} onClick={() => setFilter(name)} className={`rounded-full px-3 py-1 text-xs font-medium ${filter === name ? 'bg-teal-600 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300'}`}>{name}</button>)}</div>
      <ul className="mt-2 flex-1 overflow-y-auto px-2 pb-2" data-lenis-prevent>
        {shown.map((chat) => (
          <li key={chat.name}>
            <button type="button" aria-current={active === chat.name} onClick={() => setActive(chat.name)} className={`flex w-full items-center gap-3 rounded-xl p-2 text-left ${active === chat.name ? 'bg-teal-50 dark:bg-teal-400/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}>
              <span className="relative shrink-0"><span aria-hidden className={`block size-10 rounded-full bg-gradient-to-br ${chat.tone}`} />{chat.online && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950"><span className="sr-only">online</span></span>}</span>
              <span className="min-w-0 flex-1"><span className="flex justify-between gap-2"><span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{chat.name}</span><span className={`shrink-0 text-[11px] ${chat.unread ? 'font-semibold text-teal-700 dark:text-teal-400' : 'text-zinc-400'}`}>{chat.time}</span></span><span className="flex items-center justify-between gap-2"><span className="truncate text-xs text-zinc-500">{chat.last}</span>{chat.unread > 0 && <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal-600 text-[10px] font-bold text-white">{chat.unread}</span>}</span></span>
            </button>
          </li>
        ))}
        {!shown.length && <li className="py-8 text-center text-sm text-zinc-500">No chats found</li>}
      </ul>
    </aside>
  );
}
