/**
 * @registry
 * name: Language Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: Navigation avec selecteur de langue deroulant et coche sur la langue active.
 * prompt: Create a navbar with a language switcher: a globe button showing the current code (aria-haspopup="listbox", aria-expanded) opening a listbox of languages with flags as emoji-free two-letter badges and a check on the selected one; defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';

const languages = [['EN', 'English'], ['FR', 'Français'], ['ES', 'Español'], ['DE', 'Deutsch']] as const;

export function LanguageNavbar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [lang, setLang] = useState('FR');

  return (
    <div className="relative w-full max-w-lg">
      <nav aria-label="Main" className="flex h-14 items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="font-semibold text-zinc-900 dark:text-white">Voyage</span>
        <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
          <Globe aria-hidden className="size-4" /> {lang} <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </nav>
      {open && (
        <ul role="listbox" aria-label="Language" className="ml-auto mt-2 w-52 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {languages.map(([code, label]) => (
            <li key={code} role="option" aria-selected={lang === code}>
              <button type="button" onClick={() => { setLang(code); setOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900">
                <span className="grid size-6 place-items-center rounded-md bg-zinc-100 text-[10px] font-bold dark:bg-zinc-800">{code}</span>
                {label}
                {lang === code && <Check aria-hidden className="ml-auto size-4 text-teal-600 dark:text-teal-400" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
