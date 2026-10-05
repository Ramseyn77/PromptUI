/**
 * @registry
 * name: Speed Dial Menu
 * category: Menu
 * style: Gradient
 * tags: featured, recent
 * description: Bouton d action flottant qui deploie des actions en eventail avec etiquettes et rotation du plus.
 * prompt: Create a floating action button speed dial: the "+" FAB rotates to "×" when open (aria-expanded) and reveals 4 smaller action buttons stacked above it with staggered scale/fade transitions, each with a label pill on the left; Escape closes and returns focus. defaultOpen prop. Light and dark mode.
 */
'use client';
import { Camera, FileText, Link2, Mic, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const actions = [[Mic, 'Voice note'], [Camera, 'Photo'], [Link2, 'Link'], [FileText, 'Text note']] as const;

export function SpeedDialMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const fab = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Listen on the document that renders the component: it may live in an iframe (previews, embeds).
    const doc = fab.current?.ownerDocument ?? document;
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); fab.current?.focus(); } };
    doc.addEventListener('keydown', onKey);
    return () => doc.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="flex h-80 w-56 flex-col items-end justify-end gap-3 rounded-3xl bg-zinc-50 p-5 dark:bg-zinc-900">
      <ul id="speed-dial" className="flex flex-col items-end gap-3">
        {actions.map(([Icon, label], index) => (
          <li key={label} className={`flex items-center gap-3 transition duration-200 ${open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-75 opacity-0'}`} style={{ transitionDelay: open ? `${(actions.length - index) * 40}ms` : '0ms' }}>
            <span className="rounded-lg bg-zinc-900 px-2 py-1 text-xs font-medium text-white shadow dark:bg-white dark:text-zinc-900">{label}</span>
            <button type="button" aria-label={label} tabIndex={open ? 0 : -1} className="grid size-11 place-items-center rounded-full bg-white text-zinc-700 shadow-lg ring-1 ring-zinc-200 hover:text-teal-600 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700"><Icon className="size-5" /></button>
          </li>
        ))}
      </ul>
      <button ref={fab} type="button" aria-label={open ? 'Close actions' : 'Create'} aria-expanded={open} aria-controls="speed-dial" onClick={() => setOpen((value) => !value)} className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-violet-600 text-white shadow-xl shadow-violet-600/30 transition active:scale-95">
        <Plus className={`size-6 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
      </button>
    </div>
  );
}
