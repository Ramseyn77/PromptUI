/**
 * @registry
 * name: Sticky Notes Wall
 * category: Boards
 * style: Gradient
 * tags: recent
 * description: Mur de post-it légèrement inclinés, éditables sur place, avec ajout et suppression.
 * prompt: Create a sticky-notes wall: pastel notes slightly rotated at random angles in a responsive grid, each with an editable textarea (aria-label) and a delete button; "Add note" appends a new note with a pop-in animation and focuses it. Paper shadows, readable in light and dark mode.
 */
'use client';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const colors = ['bg-amber-200', 'bg-rose-200', 'bg-teal-200', 'bg-violet-200', 'bg-sky-200'];
type Note = { id: number; text: string };

export function StickyNotesWall() {
  const [notes, setNotes] = useState<Note[]>([{ id: 1, text: 'Call the printer about the new cards' }, { id: 2, text: 'Ideas: onboarding checklist' }, { id: 3, text: 'Friday demo at 4pm 🎉' }]);

  return (
    <>
      <style>{`@keyframes pui-pop{from{transform:scale(.6);opacity:0}}`}</style>
      <div className="w-full max-w-2xl rounded-3xl bg-zinc-100 p-5 dark:bg-zinc-900">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {notes.map((note, index) => (
            <li key={note.id} className={`group relative aspect-square rounded-sm p-3 text-zinc-900 shadow-[2px_6px_12px_rgba(0,0,0,.15)] motion-safe:animate-[pui-pop_.25s_ease-out] ${colors[index % colors.length]}`} style={{ rotate: `${((note.id * 37) % 7) - 3}deg` }}>
              <textarea aria-label={`Note ${index + 1}`} defaultValue={note.text} autoFocus={note.id > 1000} className="h-full w-full resize-none bg-transparent font-medium leading-5 outline-none" />
              <button type="button" aria-label="Delete note" onClick={() => setNotes((current) => current.filter((item) => item.id !== note.id))} className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-black/10 opacity-0 transition hover:bg-black/20 group-hover:opacity-100 focus:opacity-100"><X className="size-3.5" /></button>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => setNotes((current) => [...current, { id: Date.now(), text: '' }])} className="grid aspect-square w-full place-items-center rounded-sm border-2 border-dashed border-zinc-300 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              <span className="flex flex-col items-center gap-1 text-sm font-medium"><Plus aria-hidden className="size-5" />Add note</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
