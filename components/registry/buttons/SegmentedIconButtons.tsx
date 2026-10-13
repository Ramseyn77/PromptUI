/**
 * @registry
 * name: Segmented Icon Buttons
 * category: Buttons
 * style: SaaS
 * tags: recent
 * description: Groupes de boutons icônes accolés (zoom, annuler/rétablir, vue) avec états actifs, désactivés, infobulles et compteur de niveau de zoom.
 * prompt: Create a toolbar of segmented icon button groups in a canvas editor: Undo / Redo (disabled when there is nothing to undo/redo, tracked with a small history array), Zoom out / zoom percentage button (click resets to 100%) / Zoom in (25–400% bounds), and a view switch group (Select, Hand, Comment) as a single-choice group with aria-pressed; buttons share borders and rounded outer corners; each icon button has aria-label and a title tooltip with its shortcut; keyboard ⌘Z / ⌘⇧Z and +/- work while the toolbar is focused. Light and dark mode.
 */
'use client';
import { Hand, MessageCircle, Minus, MousePointer2, Plus, Redo2, Undo2 } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

export function SegmentedIconButtons() {
  const [past, setPast] = useState<number[]>([100, 125]);
  const [future, setFuture] = useState<number[]>([]);
  const [zoom, setZoom] = useState(150);
  const [tool, setTool] = useState('select');

  function setZoomWithHistory(next: number) {
    const value = Math.min(400, Math.max(25, next));
    if (value === zoom) return;
    setPast([...past, zoom]); setFuture([]); setZoom(value);
  }
  function undo() { if (!past.length) return; setFuture([zoom, ...future]); setZoom(past[past.length - 1]); setPast(past.slice(0, -1)); }
  function redo() { if (!future.length) return; setPast([...past, zoom]); setZoom(future[0]); setFuture(future.slice(1)); }
  function onKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); if (event.shiftKey) redo(); else undo(); }
    if (event.key === '+' || event.key === '=') setZoomWithHistory(zoom + 25);
    if (event.key === '-') setZoomWithHistory(zoom - 25);
  }

  const group = 'flex overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900 [&>*+*]:border-l [&>*+*]:border-zinc-200 dark:[&>*+*]:border-zinc-700';
  const item = 'grid h-9 min-w-9 place-items-center px-2 text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-800';

  return (
    <div className="w-full max-w-xl rounded-2xl bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] bg-[size:16px_16px] p-6 dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]">
      <div role="toolbar" aria-label="Canvas controls" tabIndex={0} onKeyDown={onKeyDown} className="flex flex-wrap items-center gap-2 rounded-2xl p-1 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
        <div className={group}>
          <button type="button" aria-label="Undo" title="Undo (⌘Z)" disabled={!past.length} onClick={undo} className={item}><Undo2 aria-hidden className="size-4" /></button>
          <button type="button" aria-label="Redo" title="Redo (⌘⇧Z)" disabled={!future.length} onClick={redo} className={item}><Redo2 aria-hidden className="size-4" /></button>
        </div>
        <div className={group}>
          <button type="button" aria-label="Zoom out" title="Zoom out (−)" disabled={zoom <= 25} onClick={() => setZoomWithHistory(zoom - 25)} className={item}><Minus aria-hidden className="size-4" /></button>
          <button type="button" aria-label={`Zoom ${zoom}%, reset to 100%`} title="Reset zoom" onClick={() => setZoomWithHistory(100)} className={`${item} w-16 text-xs font-semibold tabular-nums`}>{zoom}%</button>
          <button type="button" aria-label="Zoom in" title="Zoom in (+)" disabled={zoom >= 400} onClick={() => setZoomWithHistory(zoom + 25)} className={item}><Plus aria-hidden className="size-4" /></button>
        </div>
        <div className={group} role="group" aria-label="Tool">
          {([['select', 'Select', MousePointer2, 'V'], ['hand', 'Hand', Hand, 'H'], ['comment', 'Comment', MessageCircle, 'C']] as const).map(([key, label, Icon, shortcut]) => <button key={key} type="button" aria-label={label} title={`${label} (${shortcut})`} aria-pressed={tool === key} onClick={() => setTool(key)} className={`${item} ${tool === key ? '!bg-indigo-600 !text-white' : ''}`}><Icon aria-hidden className="size-4" /></button>)}
        </div>
      </div>
      <div aria-live="polite" className="mt-6 grid h-32 place-items-center rounded-xl border border-dashed border-zinc-300 bg-white/70 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/70">
        <span className="rounded-lg bg-indigo-500/15 px-3 py-1.5 text-indigo-700 transition-transform dark:text-indigo-300" style={{ transform: `scale(${(zoom / 150).toFixed(2)})` }}>{tool} · {zoom}%</span>
      </div>
    </div>
  );
}
