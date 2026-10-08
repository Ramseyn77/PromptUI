/**
 * @registry
 * name: Inbox Sidebar
 * category: Sidebar
 * style: SaaS
 * tags: recent
 * description: Barre latérale de messagerie avec bouton Nouveau message, dossiers, compteurs et étiquettes.
 * prompt: Create an email client sidebar: prominent "Compose" button, folder links (Inbox, Starred, Sent, Drafts, Trash) with icons and unread counts, active folder highlighted, then a "Labels" section with colored dots. Light and dark mode.
 */
'use client';
import { FileEdit, Inbox, PenSquare, Send, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

const folders = [
  { icon: Inbox, label: 'Inbox', count: 12 },
  { icon: Star, label: 'Starred', count: 0 },
  { icon: Send, label: 'Sent', count: 0 },
  { icon: FileEdit, label: 'Drafts', count: 2 },
  { icon: Trash2, label: 'Trash', count: 0 },
];
const labels = [['Clients', 'bg-teal-500'], ['Invoices', 'bg-amber-500'], ['Personal', 'bg-violet-500']];

export function InboxSidebar() {
  const [active, setActive] = useState('Inbox');

  return (
    <aside className="w-60 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"><PenSquare aria-hidden className="size-4" /> Compose</button>
      <nav aria-label="Folders" className="mt-4">
        <ul className="space-y-0.5">
          {folders.map(({ icon: Icon, label, count }) => (
            <li key={label}>
              <button type="button" aria-current={active === label ? 'page' : undefined} onClick={() => setActive(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm ${active === label ? 'bg-teal-500/10 font-semibold text-teal-800 dark:text-teal-200' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'}`}>
                <Icon aria-hidden className="size-4" />{label}{count > 0 && <span className="ml-auto text-xs font-semibold tabular-nums">{count}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-5 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Labels</p>
      <ul className="mt-1.5">{labels.map(([name, color]) => <li key={name}><a href="#" className="flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"><span className={`size-2.5 rounded-full ${color}`} />{name}</a></li>)}</ul>
    </aside>
  );
}
