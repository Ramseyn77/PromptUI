/**
 * @registry
 * name: Kbd Shortcuts
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Liste de raccourcis clavier avec touches en relief qui s enfoncent quand on les presse vraiment.
 * prompt: Create a keyboard-shortcuts cheat sheet: rows with an action and key combos rendered as 3D <kbd> caps (bottom border shadow); pressing the matching physical key (listen to keydown/keyup on window) visually presses that cap. Platform-neutral symbols, light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const shortcuts = [
  { action: 'Search', keys: ['⌘', 'K'] },
  { action: 'New file', keys: ['⌘', 'N'] },
  { action: 'Toggle sidebar', keys: ['⌘', 'B'] },
  { action: 'Close dialog', keys: ['Esc'] },
];
const keyName = (key: string) => (key === 'Meta' || key === 'Control' ? '⌘' : key === 'Escape' ? 'Esc' : key.toUpperCase());

export function KbdShortcuts() {
  const [down, setDown] = useState<string[]>([]);

  useEffect(() => {
    const press = (event: KeyboardEvent) => setDown((current) => [...new Set([...current, keyName(event.key)])]);
    const release = (event: KeyboardEvent) => setDown((current) => current.filter((key) => key !== keyName(event.key)));
    const reset = () => setDown([]);
    window.addEventListener('keydown', press);
    window.addEventListener('keyup', release);
    window.addEventListener('blur', reset);
    return () => { window.removeEventListener('keydown', press); window.removeEventListener('keyup', release); window.removeEventListener('blur', reset); };
  }, []);

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Keyboard shortcuts</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">Try pressing the keys.</p>
      <dl className="mt-4 space-y-3">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.action} className="flex items-center justify-between">
            <dt className="text-sm text-zinc-700 dark:text-zinc-300">{shortcut.action}</dt>
            <dd className="flex gap-1">{shortcut.keys.map((key) => <kbd key={key} className={`min-w-7 rounded-md border border-zinc-300 bg-zinc-50 px-1.5 text-center font-mono text-xs font-semibold text-zinc-700 transition-all duration-75 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 ${down.includes(key) ? 'translate-y-0.5 border-b py-0.5 text-teal-700 dark:text-teal-300' : 'border-b-[3px] py-0.5'}`}>{key}</kbd>)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
