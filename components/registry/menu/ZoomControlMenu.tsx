/**
 * @registry
 * name: Zoom Control Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Menu de zoom d'éditeur : niveaux prédéfinis, ajuster à l'écran, zoom sur la sélection, champ de pourcentage et raccourcis clavier affichés.
 * prompt: Create a canvas zoom control menu (open by default) from a "100% ▾" trigger: menu items Zoom in (⌘+), Zoom out (⌘−), Zoom to fit (⇧1), Zoom to selection (⇧2), separator, presets 50% / 100% / 200% as menuitemradio, and an inline number input to type a custom percentage (10–800) applied on Enter; the canvas preview below scales a sample frame accordingly with a transition; arrow keys navigate items; Escape closes. Light and dark mode.
 */
'use client';
import { ChevronDown, Maximize, Minus, Plus, Scan } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

export function ZoomControlMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [zoom, setZoom] = useState(100);
  const [draft, setDraft] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const set = (value: number) => setZoom(Math.min(800, Math.max(10, Math.round(value))));

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') { setOpen(false); return; }
    if ((event.target as HTMLElement).tagName === 'INPUT') return;
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
  }

  const item = 'flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800';
  const kbd = 'ml-auto font-mono text-[11px] text-zinc-400';

  return (
    <div className="flex w-full max-w-xl flex-col gap-3 sm:min-w-[34rem] sm:flex-row">
      <div className="w-56 shrink-0">
        <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-sm font-medium tabular-nums text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">{zoom}%<ChevronDown aria-hidden className="size-3.5" /></button>
        {open && (
          <div ref={menuRef} role="menu" aria-label="Zoom" onKeyDown={onKeyDown} className="mt-2 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <form role="none" onSubmit={(event) => { event.preventDefault(); if (draft) set(Number(draft)); setDraft(''); }} className="px-1.5 pb-1 pt-1"><input aria-label="Custom zoom percentage" inputMode="numeric" value={draft} onChange={(event) => setDraft(event.target.value.replace(/\D/g, ''))} placeholder={`${zoom}%`} className="w-full rounded-md bg-zinc-100 px-2 py-1 text-sm tabular-nums text-zinc-900 outline-none dark:bg-zinc-800 dark:text-zinc-100" /></form>
            <button type="button" role="menuitem" onClick={() => set(zoom * 1.25)} className={item}><Plus aria-hidden className="size-4 text-zinc-400" />Zoom in<span className={kbd}>⌘+</span></button>
            <button type="button" role="menuitem" onClick={() => set(zoom / 1.25)} className={item}><Minus aria-hidden className="size-4 text-zinc-400" />Zoom out<span className={kbd}>⌘−</span></button>
            <button type="button" role="menuitem" onClick={() => set(75)} className={item}><Maximize aria-hidden className="size-4 text-zinc-400" />Zoom to fit<span className={kbd}>⇧1</span></button>
            <button type="button" role="menuitem" onClick={() => set(180)} className={item}><Scan aria-hidden className="size-4 text-zinc-400" />Zoom to selection<span className={kbd}>⇧2</span></button>
            <div role="separator" className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            {[50, 100, 200].map((value) => <button key={value} type="button" role="menuitemradio" aria-checked={zoom === value} onClick={() => set(value)} className={item}><span className="size-4 text-center text-xs">{zoom === value ? '●' : ''}</span>{value}%</button>)}
          </div>
        )}
      </div>
      <div aria-live="polite" className="relative h-56 flex-1 overflow-hidden rounded-xl bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] bg-[size:14px_14px] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]">
        <div className="absolute left-1/2 top-1/2 w-40 rounded-xl bg-white p-3 shadow-lg transition-transform duration-300 dark:bg-zinc-900" style={{ transform: `translate(-50%, -50%) scale(${(zoom / 100).toFixed(2)})` }}><div className="h-2 w-16 rounded bg-indigo-400" /><div className="mt-2 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800" /><p className="mt-2 text-[10px] text-zinc-500">Frame · {zoom}%</p></div>
      </div>
    </div>
  );
}
