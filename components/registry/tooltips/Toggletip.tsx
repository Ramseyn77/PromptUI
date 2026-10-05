/**
 * @registry
 * name: Toggletip
 * category: Tooltips
 * style: Minimal
 * tags: recent
 * description: Bulle d aide qui s ouvre au clic (adaptee au tactile), annoncee aux lecteurs d ecran et fermee a Echap.
 * prompt: Create a toggletip (click-triggered tooltip suitable for touch): a "?" button with aria-expanded toggles a bubble whose content is injected into a role="status" live region so screen readers announce it; closes on outside click and Escape, returns focus to the button. Light and dark mode.
 */
'use client';
import { HelpCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Toggletip() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Listen on the document that renders the component: it may live in an iframe (previews, embeds).
    const doc = wrapper.current?.ownerDocument ?? document;
    if (!open) return;
    const outside = (event: MouseEvent) => { if (!wrapper.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); button.current?.focus(); } };
    doc.addEventListener('mousedown', outside);
    doc.addEventListener('keydown', onKey);
    return () => { doc.removeEventListener('mousedown', outside); doc.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <p className="max-w-xs pt-16 text-sm text-zinc-700 dark:text-zinc-300">
      Your plan includes 3 seats{' '}
      <span ref={wrapper} className="relative inline-flex align-middle">
        <button ref={button} type="button" aria-label="What counts as a seat?" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-6 place-items-center rounded-full text-teal-700 hover:bg-teal-500/10 dark:text-teal-400"><HelpCircle className="size-4" /></button>
        <span role="status" className="absolute bottom-full left-1/2 mb-2 w-60 -translate-x-1/2">
          {open && <span className="block rounded-xl bg-zinc-900 px-3 py-2 text-xs leading-5 text-white shadow-xl dark:bg-white dark:text-zinc-900">A seat is any member who can edit. Viewers are always free and unlimited.</span>}
        </span>
      </span>
      .
    </p>
  );
}
