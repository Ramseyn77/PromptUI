/**
 * @registry
 * name: Status Emoji Menu
 * category: Menu
 * style: Gradient
 * tags: recent
 * description: Menu pour définir son statut : emoji, message, statuts suggérés et durée avant effacement.
 * prompt: Create a "Set a status" menu like Slack/GitHub: trigger shows the avatar with the current status emoji badge; the panel (in flow) has an input with an emoji button, suggested statuses (In a meeting, Commuting, Out sick, Focusing) that fill it, a "Clear after" select (30 min, 1h, Today, Never), Clear and Save buttons; saving updates the trigger. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const suggestions = [['📅', 'In a meeting'], ['🚌', 'Commuting'], ['🤒', 'Out sick'], ['🎧', 'Focusing']] as const;

export function StatusEmojiMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [draft, setDraft] = useState({ emoji: '🎧', text: 'Focusing' });
  const [saved, setSaved] = useState({ emoji: '🌴', text: 'On vacation' });

  return (
    <div className="w-80">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white py-1 pl-1 pr-4 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="relative"><span aria-hidden className="block size-9 rounded-full bg-gradient-to-br from-pink-400 to-violet-500" /><span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-white text-xs shadow dark:bg-zinc-800">{saved.emoji}</span></span>
        <span className="text-sm text-zinc-700 dark:text-zinc-200">{saved.text}</span>
      </button>
      {open && (
        <div role="dialog" aria-labelledby={`${id}-title`} className="mt-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <p id={`${id}-title`} className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Set a status</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-zinc-300 px-2 focus-within:border-violet-500 dark:border-zinc-700">
            <span aria-hidden className="text-lg">{draft.emoji}</span>
            <input aria-label="Status message" value={draft.text} onChange={(event) => setDraft((value) => ({ ...value, text: event.target.value }))} className="w-full bg-transparent py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1">
            {suggestions.map(([emoji, text]) => <button key={text} type="button" onClick={() => setDraft({ emoji, text })} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"><span aria-hidden>{emoji}</span>{text}</button>)}
          </div>
          <label className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">Clear after
            <select className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"><option>30 minutes</option><option>1 hour</option><option>Today</option><option>Never</option></select>
          </label>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={() => { setSaved({ emoji: '💬', text: 'Set a status' }); setOpen(false); }} className="rounded-lg px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Clear</button>
            <button type="button" onClick={() => { setSaved(draft); setOpen(false); }} className="rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 px-3 py-1.5 text-sm font-semibold text-white">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
