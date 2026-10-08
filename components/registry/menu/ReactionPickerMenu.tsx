/**
 * @registry
 * name: Reaction Picker Menu
 * category: Menu
 * style: Glass
 * tags: recent
 * description: Barre de réactions emoji qui apparaît au-dessus d'un message, emojis qui grossissent au survol.
 * prompt: Create a message with a reactions picker: hovering/focusing the message (or clicking the smiley button with aria-expanded) shows a glass pill of 6 emoji buttons that magnify on hover; picking one adds/toggles a reaction chip with count under the message (aria-pressed). Light and dark mode.
 */
'use client';
import { SmilePlus } from 'lucide-react';
import { useState } from 'react';

const emojis = [['👍', 'Thumbs up'], ['❤️', 'Love'], ['😂', 'Laugh'], ['🎉', 'Party'], ['😮', 'Wow'], ['🙏', 'Thanks']];

export function ReactionPickerMenu() {
  const [open, setOpen] = useState(true);
  const [reactions, setReactions] = useState<Record<string, number>>({ '🎉': 3 });
  const [mine, setMine] = useState<string[]>([]);

  function react(emoji: string) {
    const had = mine.includes(emoji);
    setMine((current) => (had ? current.filter((item) => item !== emoji) : [...current, emoji]));
    setReactions((current) => ({ ...current, [emoji]: Math.max(0, (current[emoji] ?? 0) + (had ? -1 : 1)) }));
    setOpen(false);
  }

  return (
    <div className="group relative w-full max-w-sm pt-14">
      <div className={`absolute left-4 top-0 flex gap-1 rounded-full border border-white/60 bg-white/80 p-1.5 shadow-xl backdrop-blur-xl transition dark:border-white/10 dark:bg-zinc-800/80 ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100'}`} role="menu" aria-label="Add reaction">
        {emojis.map(([emoji, label]) => <button key={emoji} type="button" role="menuitem" aria-label={label} onClick={() => react(emoji)} className="grid size-9 place-items-center rounded-full text-xl transition duration-150 hover:-translate-y-1 hover:scale-125 focus-visible:scale-125 focus-visible:outline-none">{emoji}</button>)}
      </div>
      <div className="rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-3 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">We just crossed 10,000 users! 🚀</div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {Object.entries(reactions).filter(([, count]) => count > 0).map(([emoji, count]) => <button key={emoji} type="button" aria-pressed={mine.includes(emoji)} onClick={() => react(emoji)} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm ${mine.includes(emoji) ? 'border-teal-500 bg-teal-500/10 text-teal-800 dark:text-teal-200' : 'border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300'}`}>{emoji}<span className="text-xs tabular-nums">{count}</span></button>)}
        <button type="button" aria-label="Add reaction" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-7 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><SmilePlus className="size-4" /></button>
      </div>
    </div>
  );
}
