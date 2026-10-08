/**
 * @registry
 * name: Channels Sidebar
 * category: Sidebar
 * style: Dark
 * tags: featured, recent
 * description: Barre latérale de messagerie avec canaux, messages directs, non-lus en gras et présence.
 * prompt: Create a team-chat sidebar: workspace header, "Channels" with # names (unread ones bold with a count badge, active highlighted), "Direct messages" with avatars and presence dots (online green, away amber), and collapsible sections. Purple-tinted dark surface, lighter variant in light mode.
 */
'use client';
import { ChevronDown, Hash } from 'lucide-react';
import { useState } from 'react';

const channels = [['general', 0], ['design', 3], ['engineering', 12], ['random', 0]] as const;
const people = [['Awa', 'online'], ['Lucas', 'away'], ['Mei', 'online']] as const;

export function ChannelsSidebar() {
  const [active, setActive] = useState('design');
  const [hidden, setHidden] = useState<string[]>([]);
  const section = (title: string) => (
    <button type="button" aria-expanded={!hidden.includes(title)} onClick={() => setHidden((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]))} className="flex w-full items-center gap-1 px-2 py-1 text-xs font-semibold text-violet-900/70 hover:text-violet-950 dark:text-violet-200/70 dark:hover:text-white">
      <ChevronDown aria-hidden className={`size-3.5 transition-transform ${hidden.includes(title) ? '-rotate-90' : ''}`} />{title}
    </button>
  );

  return (
    <aside className="w-60 rounded-2xl bg-violet-50 p-3 dark:bg-[#1f1233]">
      <p className="px-2 pb-3 font-bold text-violet-950 dark:text-white">Lumen HQ</p>
      {section('Channels')}
      {!hidden.includes('Channels') && (
        <ul className="mb-3">
          {channels.map(([name, unread]) => (
            <li key={name}><button type="button" aria-current={active === name ? 'page' : undefined} onClick={() => setActive(name)} className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm ${active === name ? 'bg-violet-600 text-white' : unread ? 'font-bold text-violet-950 hover:bg-violet-100 dark:text-white dark:hover:bg-white/10' : 'text-violet-900/70 hover:bg-violet-100 dark:text-violet-200/70 dark:hover:bg-white/10'}`}><Hash aria-hidden className="size-3.5" />{name}{unread > 0 && active !== name && <span className="ml-auto rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">{unread}</span>}</button></li>
          ))}
        </ul>
      )}
      {section('Direct messages')}
      {!hidden.includes('Direct messages') && (
        <ul>
          {people.map(([name, status]) => (
            <li key={name}><button type="button" className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm text-violet-900/80 hover:bg-violet-100 dark:text-violet-100/80 dark:hover:bg-white/10"><span className="relative size-5 rounded-md bg-gradient-to-br from-violet-400 to-teal-400"><span className={`absolute -bottom-0.5 -right-0.5 size-2 rounded-full ring-2 ring-violet-50 dark:ring-[#1f1233] ${status === 'online' ? 'bg-emerald-500' : 'bg-amber-400'}`} /></span>{name}<span className="sr-only">({status})</span></button></li>
          ))}
        </ul>
      )}
    </aside>
  );
}
