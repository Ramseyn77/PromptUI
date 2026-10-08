/**
 * @registry
 * name: Bell Mute Toggle
 * category: Toggle
 * style: Glass
 * tags: recent
 * description: Cloche qui sonne en oscillant quand on active les alertes et se barre quand on les coupe.
 * prompt: Create a notification mute toggle: a glassy round button (aria-pressed) with a bell icon that swings (rotate keyframes from the top) when turned on, and is replaced by a BellOff icon when muted; a small pill label beside it reads "Alerts on/off". Gradient backdrop card. Reduced motion skips the swing. Light and dark mode.
 */
'use client';
import { Bell, BellOff } from 'lucide-react';
import { useState } from 'react';

export function BellMuteToggle() {
  const [on, setOn] = useState(true);
  const [ring, setRing] = useState(0);

  return (
    <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-sky-200 via-violet-200 to-rose-200 p-8 dark:from-sky-900/60 dark:via-violet-900/60 dark:to-rose-900/60">
      <style>{`@keyframes pui-bell{0%,100%{transform:rotate(0)}20%{transform:rotate(18deg)}40%{transform:rotate(-14deg)}60%{transform:rotate(9deg)}80%{transform:rotate(-5deg)}}`}</style>
      <button type="button" aria-pressed={on} aria-label="Alerts" onClick={() => { setOn((value) => !value); setRing((value) => value + 1); }} className="grid size-14 place-items-center rounded-full border border-white/60 bg-white/50 text-zinc-900 shadow-lg backdrop-blur outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-white/10 dark:bg-white/10 dark:text-white">
        {on ? <Bell key={ring} aria-hidden className="size-6 origin-top motion-safe:animate-[pui-bell_.8s_ease-in-out]" /> : <BellOff aria-hidden className="size-6 opacity-70" />}
      </button>
      <span aria-live="polite" className={`rounded-full px-3 py-1 text-sm font-semibold backdrop-blur ${on ? 'bg-white/70 text-violet-700 dark:bg-white/15 dark:text-violet-200' : 'bg-white/40 text-zinc-600 dark:bg-white/5 dark:text-zinc-400'}`}>Alerts {on ? 'on' : 'off'}</span>
    </div>
  );
}
