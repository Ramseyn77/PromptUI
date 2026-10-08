/**
 * @registry
 * name: Kbd Shortcut Button
 * category: Buttons
 * style: SaaS
 * tags: recent
 * description: Boutons d'action avec raccourci clavier affiché, qui réagissent visuellement quand la touche est pressée dans la zone.
 * prompt: Create buttons with keyboard shortcut hints (kbd chips): "Save ⌘S", "Search /", "New N"; when the demo area has focus and the user presses the matching key, the button flashes as pressed and triggers its action (status message via aria-live); aria-keyshortcuts on each button. Light and dark mode.
 */
'use client';
import { useState, type KeyboardEvent } from 'react';

const actions = [{ label: 'Save', keys: ['⌘', 'S'], key: 's', meta: true, aria: 'Meta+S' }, { label: 'Search', keys: ['/'], key: '/', meta: false, aria: '/' }, { label: 'New issue', keys: ['N'], key: 'n', meta: false, aria: 'N' }];

export function KbdShortcutButton() {
  const [flash, setFlash] = useState<string | null>(null);
  const [message, setMessage] = useState('Click here, then try the shortcuts.');

  const run = (label: string) => { setFlash(label); setMessage(`${label} triggered`); window.setTimeout(() => setFlash(null), 180); };
  function onKey(event: KeyboardEvent) {
    const action = actions.find((item) => item.key === event.key.toLowerCase() && item.meta === (event.metaKey || event.ctrlKey));
    if (action) { event.preventDefault(); run(action.label); }
  }

  return (
    <div tabIndex={0} onKeyDown={onKey} aria-label="Shortcut demo area" className="rounded-2xl border border-dashed border-zinc-300 p-6 outline-none focus-visible:border-teal-500 dark:border-zinc-700">
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button key={action.label} type="button" aria-keyshortcuts={action.aria} onClick={() => run(action.label)} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${flash === action.label ? 'translate-y-px border-teal-500 bg-teal-50 text-teal-800 dark:bg-teal-400/10 dark:text-teal-200' : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100'}`}>
            {action.label}<span className="flex gap-0.5">{action.keys.map((key) => <kbd key={key} className="min-w-5 rounded border border-b-2 border-zinc-300 bg-zinc-50 px-1 text-center font-mono text-[11px] text-zinc-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{key}</kbd>)}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-3 text-xs text-zinc-500">{message}</p>
    </div>
  );
}
