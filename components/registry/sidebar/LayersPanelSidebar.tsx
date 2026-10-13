/**
 * @registry
 * name: Layers Panel Sidebar
 * category: Sidebar
 * style: Dark
 * tags: recent
 * description: Panneau de calques façon outil de design : arborescence de frames et groupes dépliables, visibilité, verrouillage, renommage et sélection synchronisée.
 * prompt: Create a dark design-tool layers sidebar next to a small canvas: a tree of layers (Frame › Header group › Logo, Nav; Hero image; Button) with expand/collapse chevrons (aria-expanded), type icons, and per-row eye (visibility) and lock toggles (aria-pressed) shown on hover/focus or when active; double-click or F2 renames a layer inline; selecting a layer highlights it in the tree and outlines the matching element on the canvas; hidden layers disappear from the canvas and are dimmed in the tree. Dark in both themes.
 */
'use client';
import { ChevronRight, Eye, EyeOff, Frame, Image as ImageIcon, Lock, LockOpen, Square, Type } from 'lucide-react';
import { useState } from 'react';

type Layer = { id: string; name: string; kind: 'frame' | 'group' | 'text' | 'image' | 'shape'; depth: number; parent?: string };
const initial: Layer[] = [
  { id: 'frame', name: 'Landing · Desktop', kind: 'frame', depth: 0 },
  { id: 'header', name: 'Header', kind: 'group', depth: 1, parent: 'frame' },
  { id: 'logo', name: 'Logo', kind: 'text', depth: 2, parent: 'header' },
  { id: 'nav', name: 'Nav links', kind: 'text', depth: 2, parent: 'header' },
  { id: 'hero', name: 'Hero image', kind: 'image', depth: 1, parent: 'frame' },
  { id: 'cta', name: 'Primary button', kind: 'shape', depth: 1, parent: 'frame' },
];
const icons = { frame: Frame, group: Frame, text: Type, image: ImageIcon, shape: Square };

export function LayersPanelSidebar() {
  const [layers, setLayers] = useState(initial);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const [locked, setLocked] = useState<string[]>(['hero']);
  const [selected, setSelected] = useState('cta');
  const [renaming, setRenaming] = useState<string | null>(null);
  const toggle = (list: string[], set: (value: string[]) => void, id: string) => set(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  const isCollapsedPath = (layer: Layer): boolean => Boolean(layer.parent && (collapsed.includes(layer.parent) || isCollapsedPath(layers.find((item) => item.id === layer.parent)!)));
  const visible = (id: string) => !hidden.includes(id) && !hidden.includes(layers.find((item) => item.id === id)?.parent ?? '');
  const outline = (id: string) => (selected === id ? 'outline outline-2 outline-sky-400' : '');

  return (
    <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-zinc-950 text-zinc-300 ring-1 ring-white/10 sm:flex-row">
      <aside aria-label="Layers" className="w-full shrink-0 border-b border-white/10 p-2 sm:w-64 sm:border-b-0 sm:border-r">
        <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Layers</p>
        <ul role="tree" aria-label="Layers">
          {layers.filter((layer) => !isCollapsedPath(layer)).map((layer) => {
            const Icon = icons[layer.kind];
            const hasChildren = layers.some((item) => item.parent === layer.id);
            const isHidden = hidden.includes(layer.id);
            const isLocked = locked.includes(layer.id);
            return (
              <li key={layer.id} role="treeitem" aria-selected={selected === layer.id} aria-expanded={hasChildren ? !collapsed.includes(layer.id) : undefined} className={`group flex items-center gap-1 rounded-md py-1 pr-1 text-xs ${selected === layer.id ? 'bg-sky-500/20 text-white' : 'hover:bg-white/5'} ${isHidden ? 'opacity-40' : ''}`} style={{ paddingLeft: 4 + layer.depth * 14 }}>
                {hasChildren ? <button type="button" aria-label={`${collapsed.includes(layer.id) ? 'Expand' : 'Collapse'} ${layer.name}`} onClick={() => toggle(collapsed, setCollapsed, layer.id)} className="grid size-5 place-items-center rounded hover:bg-white/10"><ChevronRight aria-hidden className={`size-3 transition-transform ${collapsed.includes(layer.id) ? '' : 'rotate-90'}`} /></button> : <span className="size-5" />}
                <Icon aria-hidden className="size-3.5 shrink-0 text-zinc-500" />
                {renaming === layer.id ? <input ref={(node) => { if (node && document.activeElement !== node) { node.focus(); node.select(); } }} aria-label="Layer name" defaultValue={layer.name} onBlur={(event) => { setLayers(layers.map((item) => (item.id === layer.id ? { ...item, name: event.target.value || item.name } : item))); setRenaming(null); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === 'Escape') event.currentTarget.blur(); }} className="min-w-0 flex-1 rounded bg-zinc-800 px-1 text-xs text-white outline-none ring-1 ring-sky-400" />
                  : <button type="button" onClick={() => setSelected(layer.id)} onDoubleClick={() => setRenaming(layer.id)} onKeyDown={(event) => { if (event.key === 'F2') setRenaming(layer.id); }} className="min-w-0 flex-1 truncate rounded px-1 py-0.5 text-left outline-none focus-visible:ring-1 focus-visible:ring-sky-400">{layer.name}</button>}
                <button type="button" aria-pressed={isLocked} aria-label={`${isLocked ? 'Unlock' : 'Lock'} ${layer.name}`} onClick={() => toggle(locked, setLocked, layer.id)} className={`grid size-5 place-items-center rounded hover:bg-white/10 focus-visible:opacity-100 ${isLocked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{isLocked ? <Lock aria-hidden className="size-3" /> : <LockOpen aria-hidden className="size-3" />}</button>
                <button type="button" aria-pressed={isHidden} aria-label={`${isHidden ? 'Show' : 'Hide'} ${layer.name}`} onClick={() => toggle(hidden, setHidden, layer.id)} className={`grid size-5 place-items-center rounded hover:bg-white/10 focus-visible:opacity-100 ${isHidden ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{isHidden ? <EyeOff aria-hidden className="size-3" /> : <Eye aria-hidden className="size-3" />}</button>
              </li>
            );
          })}
        </ul>
        <p className="px-2 pt-2 text-[10px] text-zinc-600">Double-click or F2 to rename</p>
      </aside>
      <div className="grid flex-1 place-items-center bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:14px_14px] p-6">
        {visible('frame') && (
          <div className={`w-full max-w-xs rounded-lg bg-white p-3 text-zinc-900 ${outline('frame')}`}>
            {visible('header') && <div className={`flex items-center justify-between rounded ${outline('header')}`}>{visible('logo') && <span className={`text-sm font-bold ${outline('logo')}`}>Prism</span>}{visible('nav') && <span className={`text-[10px] text-zinc-500 ${outline('nav')}`}>Product · Pricing · Docs</span>}</div>}
            {visible('hero') && <div className={`mt-3 h-24 rounded-md bg-gradient-to-br from-sky-300 to-violet-400 ${outline('hero')}`} />}
            {visible('cta') && <span className={`mt-3 inline-block rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white ${outline('cta')}`}>Get started</span>}
          </div>
        )}
      </div>
    </div>
  );
}
