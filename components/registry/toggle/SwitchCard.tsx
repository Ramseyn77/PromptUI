/**
 * @registry
 * name: Switch Card
 * category: Toggle
 * style: SaaS
 * tags: recent
 * description: Cartes d'option façon HeroUI où toute la carte bascule l'interrupteur, avec titre, description et état.
 * prompt: Create HeroUI-style switch cards: each option is a full-width card (button role="switch", aria-checked) with an icon tile, title, description and a switch on the right; the whole card toggles; enabled cards get a teal border and a "Enabled" caption. Stack of three options (Two-factor auth, Login alerts, Session timeout). Light and dark mode.
 */
'use client';
import { BellRing, KeyRound, Timer, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const options: { key: string; icon: LucideIcon; title: string; text: string }[] = [
  { key: '2fa', icon: KeyRound, title: 'Two-factor authentication', text: 'Ask for a code from your authenticator app.' },
  { key: 'alerts', icon: BellRing, title: 'Login alerts', text: 'Email me when a new device signs in.' },
  { key: 'timeout', icon: Timer, title: 'Session timeout', text: 'Sign out after 30 minutes of inactivity.' },
];

export function SwitchCard() {
  const [on, setOn] = useState<Record<string, boolean>>({ '2fa': true });

  return (
    <div className="grid w-full max-w-md gap-2">
      {options.map(({ key, icon: Icon, title, text }) => {
        const checked = !!on[key];
        return (
          <button key={key} type="button" role="switch" aria-checked={checked} onClick={() => setOn((value) => ({ ...value, [key]: !checked }))} className={`flex items-center gap-3 rounded-2xl border p-4 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 ${checked ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-400/5' : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950'}`}>
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${checked ? 'bg-teal-600 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300'}`}><Icon aria-hidden className="size-5" /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">{text}</span>
              {checked && <span className="mt-1 block text-[11px] font-semibold text-teal-700 dark:text-teal-400">Enabled</span>}
            </span>
            <span aria-hidden className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
              <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
