/**
 * @registry
 * name: Avatar Button
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Boutons avec avatar : « Continuer en tant que », invitation de membre et pile d'avatars cliquable avec compteur.
 * prompt: Create avatar buttons: a "Continue as Awa" button with avatar, name and email on two lines; an "Invite" button with a dashed plus avatar; and a clickable avatar stack button ("+5") that toggles a "Seen by 8 people" list (aria-expanded) with names. Light and dark mode.
 */
'use client';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const people = ['Ana', 'Leo', 'Kofi', 'Mia', 'Sam', 'Ines', 'Yuki', 'Tom'];
const tones = ['from-rose-400 to-orange-300', 'from-sky-400 to-indigo-500', 'from-emerald-400 to-teal-500', 'from-violet-400 to-fuchsia-500'];

export function AvatarButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <button type="button" className="flex items-center gap-3 rounded-xl border border-zinc-300 bg-white p-2.5 pr-4 text-left hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800">
        <span aria-hidden className="size-9 rounded-full bg-gradient-to-br from-amber-300 to-rose-500" />
        <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">Continue as Awa</span><span className="block truncate text-xs text-zinc-500">awa.diop@lumen.dev</span></span>
      </button>
      <button type="button" className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"><span className="grid size-8 place-items-center rounded-full border-2 border-dashed border-zinc-300 text-zinc-500 dark:border-zinc-600"><Plus aria-hidden className="size-4" /></span>Invite teammate</button>
      <div>
        <button type="button" aria-expanded={open} aria-label="Seen by 8 people" onClick={() => setOpen((value) => !value)} className="flex items-center rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
          {people.slice(0, 3).map((name, index) => <span key={name} aria-hidden className={`size-8 rounded-full bg-gradient-to-br ring-2 ring-white dark:ring-zinc-950 ${tones[index]} ${index ? '-ml-2' : ''}`} />)}
          <span className="-ml-2 grid size-8 place-items-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700 ring-2 ring-white dark:bg-zinc-700 dark:text-zinc-200 dark:ring-zinc-950">+5</span>
        </button>
        {open && <ul className="mt-2 flex flex-wrap gap-1.5">{people.map((name) => <li key={name} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{name}</li>)}</ul>}
      </div>
    </div>
  );
}
