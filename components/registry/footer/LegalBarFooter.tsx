/**
 * @registry
 * name: Legal Bar Footer
 * category: Footer
 * style: Minimal
 * tags: recent
 * description: Barre legale fine avec liens reglementaires et bouton de gestion des cookies qui ouvre un panneau.
 * prompt: Create a thin legal footer bar: copyright, company registration line, links (Privacy, Terms, Legal notice, Sitemap) and a "Cookie settings" button (aria-expanded) that reveals a small panel with toggles for Analytics and Marketing and a Save button. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function LegalBarFooter({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false });

  return (
    <div className="w-full max-w-4xl space-y-2">
      {open && (
        <section aria-label="Cookie settings" className="ml-auto w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Cookie settings</p>
          {(Object.keys(prefs) as Array<keyof typeof prefs>).map((key) => (
            <label key={key} className="mt-3 flex items-center justify-between text-sm capitalize text-zinc-700 dark:text-zinc-300">
              {key}
              <input type="checkbox" role="switch" checked={prefs[key]} onChange={() => setPrefs((current) => ({ ...current, [key]: !current[key] }))} className="size-4 accent-teal-600" />
            </label>
          ))}
          <button type="button" onClick={() => setOpen(false)} className="mt-4 w-full rounded-lg bg-zinc-950 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Save preferences</button>
        </section>
      )}
      <footer className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        <p>© 2026 Lumen SAS · RCS Paris 912 345 678</p>
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {['Privacy', 'Terms', 'Legal notice', 'Sitemap'].map((link) => <a key={link} href="#" className="hover:text-zinc-900 dark:hover:text-white">{link}</a>)}
          <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="font-medium text-teal-700 hover:underline dark:text-teal-400">Cookie settings</button>
        </nav>
      </footer>
    </div>
  );
}
