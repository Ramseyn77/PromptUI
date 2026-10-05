/**
 * @registry
 * name: Split Button
 * category: Buttons
 * style: SaaS
 * tags: recent
 * description: Bouton scinde : action principale et fleche ouvrant un menu d actions secondaires.
 * prompt: Create a split button: primary "Deploy" action joined to a chevron button (aria-haspopup="menu", aria-expanded) that opens a menu of alternatives (Deploy to staging, Schedule deploy, Deploy with cache cleared) with icons; choosing one updates the primary label. Closes on Escape/outside click; defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { CalendarClock, ChevronDown, Rocket, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const options = [
  { icon: Rocket, label: 'Deploy to production' },
  { icon: Rocket, label: 'Deploy to staging' },
  { icon: CalendarClock, label: 'Schedule deploy' },
  { icon: Trash2, label: 'Deploy with cache cleared' },
];

export function SplitButton({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [choice, setChoice] = useState(options[0].label);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen on the document that renders the component: it may live in an iframe (previews, embeds).
    const doc = ref.current?.ownerDocument ?? document;
    if (!open) return;
    const close = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    doc.addEventListener('mousedown', close);
    doc.addEventListener('keydown', onKey);
    return () => { doc.removeEventListener('mousedown', close); doc.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={ref} className="w-72">
      <div className="inline-flex rounded-xl bg-zinc-950 text-sm font-semibold text-white shadow-sm dark:bg-white dark:text-zinc-950">
        <button type="button" className="rounded-l-xl px-4 py-2.5 hover:bg-zinc-800 dark:hover:bg-zinc-200">{choice}</button>
        <span aria-hidden className="w-px bg-white/20 dark:bg-zinc-950/15" />
        <button type="button" aria-label="More deploy options" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="rounded-r-xl px-2.5 hover:bg-zinc-800 dark:hover:bg-zinc-200"><ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} /></button>
      </div>
      {open && (
        <div role="menu" className="mt-2 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {options.map(({ icon: Icon, label }) => (
            <button key={label} type="button" role="menuitem" onClick={() => { setChoice(label); setOpen(false); }} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"><Icon aria-hidden className="size-4 text-zinc-400" />{label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
