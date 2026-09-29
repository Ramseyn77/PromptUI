/**
 * @registry
 * name: Action Sheet
 * category: Menu
 * style: Glass
 * tags: recent
 * description: Feuille d actions mobile qui glisse du bas avec poignee, options, action destructive et Annuler.
 * prompt: Create a mobile action sheet inside a phone-sized frame: a trigger opens a bottom sheet (role="dialog", aria-modal) sliding up over a dimmed backdrop, with drag handle, title, grouped glass options, a destructive option and a separate Cancel button; closes on backdrop/Escape/Cancel. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const options = ['Save to Photos', 'Share…', 'Copy link', 'Add to album'];

export function ActionSheet({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="relative h-[28rem] w-64 overflow-hidden rounded-[2.2rem] border-8 border-zinc-900 bg-gradient-to-br from-sky-200 to-violet-300 dark:from-sky-900 dark:to-violet-950">
      <button type="button" onClick={() => setOpen(true)} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-900 backdrop-blur">Photo options</button>
      <div aria-hidden className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setOpen(false)} />
      <div role="dialog" aria-modal="true" aria-label="Photo options" className={`absolute inset-x-2 bottom-2 space-y-2 transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)] ${open ? 'translate-y-0' : 'translate-y-[110%]'}`}>
        <div className="overflow-hidden rounded-2xl bg-white/85 backdrop-blur-xl dark:bg-zinc-800/85">
          <span aria-hidden className="mx-auto mt-2 block h-1 w-9 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <p className="px-4 py-2 text-center text-xs text-zinc-500 dark:text-zinc-400">IMG_2048.heic</p>
          {options.map((option) => <button key={option} type="button" onClick={() => setOpen(false)} className="block w-full border-t border-zinc-900/10 py-3 text-center text-[15px] text-sky-600 dark:border-white/10 dark:text-sky-400">{option}</button>)}
          <button type="button" onClick={() => setOpen(false)} className="block w-full border-t border-zinc-900/10 py-3 text-center text-[15px] text-rose-600 dark:border-white/10 dark:text-rose-400">Delete photo</button>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="block w-full rounded-2xl bg-white py-3 text-center text-[15px] font-semibold text-sky-600 dark:bg-zinc-800 dark:text-sky-400">Cancel</button>
      </div>
    </div>
  );
}
