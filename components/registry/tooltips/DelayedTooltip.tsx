/**
 * @registry
 * name: Delayed Tooltip
 * category: Tooltips
 * style: SaaS
 * tags: recent
 * description: Info-bulle accessible avec delai d ouverture, fermeture a Echap et survol de la bulle autorise.
 * prompt: Build an accessible tooltip component: opens after a 400ms hover delay or immediately on keyboard focus, closes on blur, pointer leave (with a 100ms grace period so the pointer can move onto the bubble) and Escape; role="tooltip" + aria-describedby. Show it on three icon buttons of a toolbar. Light and dark mode.
 */
'use client';
import { Bold, Italic, Link2 } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

function Tooltip({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const root = useRef<HTMLSpanElement>(null);
  const show = (delay: number) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(true), delay); };
  const hide = (delay = 0) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), delay); };

  useEffect(() => {
    // Listen on the document that renders the component: it may live in an iframe (previews, embeds).
    const doc = root.current?.ownerDocument ?? document;
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    doc.addEventListener('keydown', onKey);
    return () => doc.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <span ref={root} className="relative inline-flex" onPointerEnter={() => show(400)} onPointerLeave={() => hide(100)} onFocus={() => show(0)} onBlur={() => hide()}>
      {children}
      <span id={id} role="tooltip" onPointerEnter={() => show(0)} className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1 text-xs text-white transition duration-150 dark:bg-white dark:text-zinc-900 ${open ? 'opacity-100' : 'pointer-events-none translate-y-1 opacity-0'}`}>{label}</span>
    </span>
  );
}

export function DelayedTooltip() {
  const buttons = [{ icon: Bold, name: 'Bold', label: 'Bold ⌘B' }, { icon: Italic, name: 'Italic', label: 'Italic ⌘I' }, { icon: Link2, name: 'Insert link', label: 'Insert link ⌘K' }];
  return (
    <div role="toolbar" aria-label="Formatting" className="mt-10 inline-flex gap-1 rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
      {buttons.map(({ icon: Icon, name, label }, index) => (
        <Tooltip key={label} id={`format-tip-${index}`} label={label}>
          <button type="button" aria-label={name} aria-describedby={`format-tip-${index}`} className="grid size-9 place-items-center rounded-lg text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"><Icon className="size-4" /></button>
        </Tooltip>
      ))}
    </div>
  );
}
