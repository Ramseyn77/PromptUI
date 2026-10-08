/**
 * @registry
 * name: Pinned List Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Liste de pages avec épingles : les éléments épinglés remontent dans une section dédiée en haut du menu.
 * prompt: Create a page list menu with pinning: each row has an icon, title and a pin button revealed on hover/focus (aria-pressed); pinned rows move to a "Pinned" section at the top with a subtle animation and the pin icon filled; empty pinned section shows a hint. Light and dark mode.
 */
'use client';
import { FileText, Pin } from 'lucide-react';
import { useState } from 'react';

const pages = ['Roadmap 2027', 'Hiring plan', 'Brand guidelines', 'Weekly sync notes', 'Customer interviews'];

export function PinnedListMenu() {
  const [pinned, setPinned] = useState<string[]>(['Roadmap 2027']);

  const row = (page: string) => {
    const isPinned = pinned.includes(page);
    return (
      <li key={page} className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-100 motion-safe:animate-[pui-pin-in_.25s_ease-out] dark:hover:bg-zinc-900">
        <FileText aria-hidden className="size-4 text-zinc-400" />
        <a href={`#${page}`} className="flex-1 truncate text-sm text-zinc-800 outline-none focus-visible:underline dark:text-zinc-200">{page}</a>
        <button type="button" aria-pressed={isPinned} aria-label={isPinned ? `Unpin ${page}` : `Pin ${page}`} onClick={() => setPinned((list) => (isPinned ? list.filter((item) => item !== page) : [...list, page]))} className={`grid size-7 place-items-center rounded-md outline-none transition hover:bg-zinc-200 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-zinc-800 ${isPinned ? 'text-teal-600 opacity-100' : 'text-zinc-400 opacity-0 group-hover:opacity-100'}`}>
          <Pin aria-hidden className={`size-3.5 ${isPinned ? 'fill-current' : ''}`} />
        </button>
      </li>
    );
  };

  return (
    <nav aria-label="Pages" className="w-64 rounded-2xl border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-pin-in{from{opacity:0;transform:translateY(-4px)}}`}</style>
      <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Pinned</p>
      <ul>{pinned.length ? pinned.map(row) : <li className="px-2 py-2 text-xs text-zinc-400">Hover a page and click the pin.</li>}</ul>
      <p className="mt-2 px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">All pages</p>
      <ul>{pages.filter((page) => !pinned.includes(page)).map(row)}</ul>
    </nav>
  );
}
