/**
 * @registry
 * name: Dimensions Popover
 * category: Tooltips
 * style: SaaS
 * tags: recent
 * description: Popover de réglages façon shadcn avec champs largeur/hauteur liés, verrou de ratio et flèche.
 * prompt: Create a shadcn-style popover: a "Dimensions" trigger button (aria-haspopup="dialog", aria-expanded) opens a small panel with an arrow, heading and description, labelled Width/Height/Max width/Max height inputs in a two-column grid, and a lock-ratio toggle (aria-pressed) that keeps width and height proportional while typing. Escape closes and returns focus to the trigger. defaultOpen prop for previews (panel in flow). Light and dark mode.
 */
'use client';
import { Link2, Link2Off, Ruler } from 'lucide-react';
import { useId, useRef, useState } from 'react';

export function DimensionsPopover({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [locked, setLocked] = useState(true);
  const [size, setSize] = useState({ width: 1280, height: 720 });
  const trigger = useRef<HTMLButtonElement>(null);
  const ratio = 1280 / 720;

  function update(key: 'width' | 'height', raw: string) {
    const value = Number(raw) || 0;
    if (!locked) { setSize((current) => ({ ...current, [key]: value })); return; }
    setSize(key === 'width' ? { width: value, height: Math.round(value / ratio) } : { width: Math.round(value * ratio), height: value });
  }

  const field = 'w-full rounded-md border border-zinc-300 bg-transparent px-2.5 py-1.5 text-sm tabular-nums text-zinc-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:text-zinc-100';
  const label = 'text-xs font-medium text-zinc-600 dark:text-zinc-400';

  return (
    <div className="w-80" onKeyDown={(event) => { if (event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); } }}>
      <button ref={trigger} type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 outline-none hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"><Ruler aria-hidden className="size-4" />Dimensions</button>
      {open && (
        <div id={`${id}-panel`} role="dialog" aria-labelledby={`${id}-title`} className="relative mt-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <span aria-hidden className="absolute -top-1.5 left-6 size-3 rotate-45 border-l border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <p id={`${id}-title`} className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Dimensions</p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Set the dimensions for the layer.</p>
            </div>
            <button type="button" aria-label="Lock aspect ratio" aria-pressed={locked} onClick={() => setLocked((value) => !value)} className={`grid size-8 place-items-center rounded-md border transition ${locked ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300' : 'border-zinc-300 text-zinc-500 dark:border-zinc-700'}`}>{locked ? <Link2 aria-hidden className="size-4" /> : <Link2Off aria-hidden className="size-4" />}</button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="grid gap-1"><span className={label}>Width</span><input inputMode="numeric" value={size.width} onChange={(event) => update('width', event.target.value)} className={field} /></label>
            <label className="grid gap-1"><span className={label}>Height</span><input inputMode="numeric" value={size.height} onChange={(event) => update('height', event.target.value)} className={field} /></label>
            <label className="grid gap-1"><span className={label}>Max width</span><input defaultValue="100%" className={field} /></label>
            <label className="grid gap-1"><span className={label}>Max height</span><input defaultValue="none" className={field} /></label>
          </div>
        </div>
      )}
    </div>
  );
}
