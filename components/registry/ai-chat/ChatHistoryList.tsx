/**
 * @registry
 * name: Chat History List
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: Historique de conversations groupe par date avec recherche, conversation active et nouveau chat.
 * prompt: Create a chat history panel: "New chat" button, a filter input, conversations grouped under Today / Yesterday / Previous 7 days headings, the active one highlighted (aria-current), long titles truncated; filtering hides empty groups. Light and dark mode.
 */
'use client';
import { MessageSquare, Plus, Search } from 'lucide-react';
import { useState } from 'react';

const groups = [
  { label: 'Today', items: ['Pricing page copy', 'Fix hydration warning in navbar'] },
  { label: 'Yesterday', items: ['Onboarding email sequence', 'Dark mode palette ideas'] },
  { label: 'Previous 7 days', items: ['Postgres index for search', 'Landing hero A/B test', 'Team offsite agenda'] },
];

export function ChatHistoryList() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('Pricing page copy');
  const filtered = groups.map((group) => ({ ...group, items: group.items.filter((item) => item.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.items.length);

  return (
    <aside className="w-full max-w-xs rounded-3xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <button type="button" className="flex w-full items-center gap-2 rounded-xl bg-zinc-950 px-3 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"><Plus aria-hidden className="size-4" /> New chat</button>
      <label className="mt-3 flex h-9 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 dark:border-zinc-800 dark:bg-zinc-950">
        <Search aria-hidden className="size-4 text-zinc-400" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chats" aria-label="Search chats" className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none dark:text-white" />
      </label>
      <nav aria-label="Conversations" className="mt-3 space-y-4">
        {filtered.map((group) => (
          <div key={group.label}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{group.label}</p>
            <ul className="mt-1">
              {group.items.map((item) => (
                <li key={item}>
                  <button type="button" aria-current={active === item ? 'page' : undefined} onClick={() => setActive(item)} className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${active === item ? 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white' : 'text-zinc-600 hover:bg-white/60 dark:text-zinc-400 dark:hover:bg-zinc-800/60'}`}>
                    <MessageSquare aria-hidden className="size-3.5 shrink-0 opacity-60" /><span className="truncate">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {!filtered.length && <p className="px-2 text-sm text-zinc-500">No chats found.</p>}
      </nav>
    </aside>
  );
}
