/**
 * @registry
 * name: Server Rail Sidebar
 * category: Sidebar
 * style: Dark
 * tags: featured, recent
 * description: Rail de serveurs façon chat communautaire : icônes rondes qui s'arrondissent au survol, pastilles de non-lus et liste de salons.
 * prompt: Create a community-chat style sidebar: a narrow left rail of round server icons (initials on colored backgrounds) that morph to rounded squares when active or hovered, with a white pill indicator on the left edge (tall for active, short for unread) and red mention badges; next to it a channel list for the active server with categories (collapsible, aria-expanded), # text channels, unread bold state and a user footer with mute/deafen buttons; on mobile the channel list toggles via a menu button with aria-expanded. Dark in both themes.
 */
'use client';
import { ChevronDown, Hash, Headphones, Menu, Mic, Volume2 } from 'lucide-react';
import { useState } from 'react';

const servers = [{ id: 'pu', name: 'PromptUI', color: 'bg-violet-500', unread: true, mentions: 3 }, { id: 'dz', name: 'Design Zone', color: 'bg-emerald-500', unread: true, mentions: 0 }, { id: 'nx', name: 'Next.js Club', color: 'bg-zinc-600', unread: false, mentions: 0 }, { id: 'ra', name: 'Remote Async', color: 'bg-orange-500', unread: false, mentions: 12 }];
const categories = [{ name: 'Info', channels: [['announcements', true], ['rules', false]] }, { name: 'Community', channels: [['general', true], ['showcase', false], ['help', true]] }, { name: 'Voice', channels: [['Lounge', false]] }] as const;

export function ServerRailSidebar() {
  const [server, setServer] = useState('pu');
  const [channel, setChannel] = useState('general');
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [listOpen, setListOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const current = servers.find((item) => item.id === server)!;

  return (
    <div className="flex h-[26rem] w-full max-w-md overflow-hidden rounded-2xl bg-zinc-900 sm:min-w-[24rem] text-zinc-300 ring-1 ring-white/10">
      <nav aria-label="Servers" className="flex w-[72px] shrink-0 flex-col items-center gap-2 bg-zinc-950 py-3">
        {servers.map((item) => (
          <div key={item.id} className="group relative">
            <span aria-hidden className={`absolute -left-3 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-white transition-all ${server === item.id ? 'h-10' : item.unread ? 'h-2 group-hover:h-5' : 'h-0 group-hover:h-5'}`} />
            <button type="button" aria-label={`${item.name}${item.mentions ? `, ${item.mentions} mentions` : ''}`} aria-current={server === item.id ? 'page' : undefined} onClick={() => { setServer(item.id); setListOpen(true); }} className={`grid size-12 place-items-center text-sm font-bold text-white transition-all duration-200 ${item.color} ${server === item.id ? 'rounded-2xl' : 'rounded-3xl hover:rounded-2xl'}`}>{item.name.split(' ').map((part) => part[0]).join('')}</button>
            {item.mentions > 0 && <span aria-hidden className="absolute -bottom-0.5 -right-0.5 min-w-5 rounded-full bg-rose-500 px-1 text-center text-[11px] font-bold leading-5 text-white ring-4 ring-zinc-950">{item.mentions}</span>}
          </div>
        ))}
      </nav>
      <div className={`${listOpen ? 'flex' : 'hidden'} min-w-0 flex-1 flex-col sm:flex`}>
        <div className="flex h-12 items-center border-b border-black/30 px-4 font-semibold text-white shadow-sm">{current.name}</div>
        <div className="flex-1 overflow-y-auto px-2 py-3" data-lenis-prevent>
          {categories.map((category) => {
            const open = !collapsed.includes(category.name);
            return (
              <div key={category.name} className="mb-3">
                <button type="button" aria-expanded={open} onClick={() => setCollapsed((list) => (open ? [...list, category.name] : list.filter((item) => item !== category.name)))} className="flex items-center gap-0.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300"><ChevronDown aria-hidden className={`size-3 transition-transform ${open ? '' : '-rotate-90'}`} />{category.name}</button>
                {open && <ul className="mt-1 space-y-0.5">{category.channels.map(([name, unread]) => <li key={name}><button type="button" aria-current={channel === name ? 'page' : undefined} onClick={() => { setChannel(name); setListOpen(false); }} className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm ${channel === name ? 'bg-white/10 text-white' : unread ? 'font-semibold text-white hover:bg-white/5' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>{category.name === 'Voice' ? <Volume2 aria-hidden className="size-4 text-zinc-500" /> : <Hash aria-hidden className="size-4 text-zinc-500" />}{name}</button></li>)}</ul>}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 bg-zinc-950/60 px-2 py-2">
          <span className="relative grid size-8 place-items-center rounded-full bg-sky-500 text-xs font-bold text-white">AC<span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-zinc-900" /></span>
          <div className="min-w-0 flex-1 text-xs"><p className="truncate font-semibold text-white">ava.chen</p><p className="text-zinc-500">Online</p></div>
          <button type="button" aria-pressed={muted} aria-label="Mute microphone" onClick={() => setMuted(!muted)} className={`grid size-8 place-items-center rounded-md hover:bg-white/10 ${muted ? 'text-rose-400' : ''}`}><Mic aria-hidden className="size-4" /></button>
          <button type="button" aria-label="Deafen" className="grid size-8 place-items-center rounded-md hover:bg-white/10"><Headphones aria-hidden className="size-4" /></button>
        </div>
      </div>
      <div className={`${listOpen ? 'hidden' : 'flex'} flex-1 flex-col items-center justify-center gap-3 p-4 text-center sm:hidden`}>
        <p className="text-sm text-zinc-400">#{channel} in {current.name}</p>
        <button type="button" aria-expanded={listOpen} onClick={() => setListOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white"><Menu aria-hidden className="size-4" />Show channels</button>
      </div>
    </div>
  );
}
