/**
 * @registry
 * name: Preferences Footer
 * category: Footer
 * style: Minimal
 * tags: recent
 * description: Pied de page avec selecteurs de langue, de devise et de theme en bas de page.
 * prompt: Create a footer bottom bar with preference controls: language and currency <select>s with visible labels, and a 3-option theme segmented control (System / Light / Dark icons, aria-pressed), plus copyright; wraps on mobile. Light and dark mode.
 */
'use client';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function PreferencesFooter() {
  const [theme, setTheme] = useState('system');
  const select = 'rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200';

  return (
    <footer className="flex w-full max-w-4xl flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <p className="mr-auto text-xs">© 2026 Voyage Travel</p>
      <label className="flex items-center gap-2">Language<select className={select} defaultValue="fr"><option value="en">English</option><option value="fr">Français</option><option value="es">Español</option></select></label>
      <label className="flex items-center gap-2">Currency<select className={select} defaultValue="EUR"><option>EUR</option><option>USD</option><option>XOF</option></select></label>
      <div role="group" aria-label="Theme" className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900">
        {[['system', Monitor], ['light', Sun], ['dark', Moon]].map(([key, Icon]) => {
          const IconComponent = Icon as typeof Sun;
          return <button key={key as string} type="button" aria-label={`${key} theme`} aria-pressed={theme === key} onClick={() => setTheme(key as string)} className={`grid size-7 place-items-center rounded-md ${theme === key ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}><IconComponent className="size-4" /></button>;
        })}
      </div>
    </footer>
  );
}
