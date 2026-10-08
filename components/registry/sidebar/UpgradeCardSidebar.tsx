/**
 * @registry
 * name: Upgrade Card Sidebar
 * category: Sidebar
 * style: Gradient
 * tags: recent
 * description: Barre latérale avec carte d'upgrade dégradée refermable et profil utilisateur en bas.
 * prompt: Create a full-height sidebar: logo, nav links with active state, a dismissible gradient "Upgrade to Pro" card (usage bar + CTA) pinned near the bottom, and a user row with avatar, name, email and a logout icon button. Light and dark mode.
 */
'use client';
import { BarChart3, Home, LogOut, Settings, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export function UpgradeCardSidebar() {
  const [card, setCard] = useState(true);

  return (
    <aside className="flex h-[26rem] w-64 flex-col rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="px-2 py-1 font-bold text-zinc-900 dark:text-white">Pulse</p>
      <nav aria-label="Main" className="mt-4 space-y-0.5">
        {[[Home, 'Overview', true], [BarChart3, 'Analytics', false], [Settings, 'Settings', false]].map(([Icon, label, active]) => {
          const IconComponent = Icon as typeof Home;
          return <a key={label as string} href="#" aria-current={active ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${active ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-white' : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900'}`}><IconComponent aria-hidden className="size-4" />{label as string}</a>;
        })}
      </nav>
      <div className="mt-auto space-y-3">
        {card && (
          <div className="relative rounded-2xl bg-gradient-to-br from-violet-600 to-teal-500 p-4 text-white">
            <button type="button" aria-label="Dismiss upgrade card" onClick={() => setCard(false)} className="absolute right-2 top-2 grid size-6 place-items-center rounded-md hover:bg-white/20"><X className="size-3.5" /></button>
            <Sparkles aria-hidden className="size-5" />
            <p className="mt-2 text-sm font-semibold">Upgrade to Pro</p>
            <p className="text-xs text-white/80">You used 80% of your free events.</p>
            <div className="mt-2 h-1.5 rounded-full bg-white/25"><div className="h-full w-4/5 rounded-full bg-white" /></div>
            <button type="button" className="mt-3 w-full rounded-lg bg-white py-1.5 text-xs font-semibold text-violet-700">Upgrade</button>
          </div>
        )}
        <div className="flex items-center gap-3 border-t border-zinc-200 px-1 pt-3 dark:border-zinc-800">
          <span className="grid size-9 place-items-center rounded-full bg-amber-400 text-xs font-bold text-amber-950">CM</span>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-zinc-900 dark:text-white">Camille Martin</p><p className="truncate text-xs text-zinc-500">camille@pulse.io</p></div>
          <button type="button" aria-label="Log out" className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"><LogOut className="size-4" /></button>
        </div>
      </div>
    </aside>
  );
}
