/**
 * @registry
 * name: Move To Folder Menu
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Menu « Déplacer vers… » avec arborescence de dossiers dépliable, recherche, dossier courant désactivé et confirmation.
 * prompt: Create a "Move to…" menu (open by default) for a file: header with the file name, a search input, a folder tree with expand/collapse chevrons (aria-expanded) and indentation, the current folder disabled with a "current" tag, single selection highlighting the target, footer with Cancel and "Move here" (disabled until a target is chosen) and a success line "Moved to Design / Assets". Light and dark mode.
 */
'use client';
import { ChevronRight, Folder, FolderOpen } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type Node = { name: string; children?: Node[] };
const tree: Node[] = [
  { name: 'Design', children: [{ name: 'Assets' }, { name: 'Explorations', children: [{ name: '2025' }, { name: '2026' }] }] },
  { name: 'Engineering', children: [{ name: 'RFCs' }, { name: 'Runbooks' }] },
  { name: 'Marketing', children: [{ name: 'Launch' }] },
];
const current = 'Engineering / RFCs';

export function MoveToFolderMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState<string[]>(['Design']);
  const [target, setTarget] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [moved, setMoved] = useState<string | null>(null);

  function render(nodes: Node[], parent = '', depth = 0): ReactNode {
    return nodes.map((node) => {
      const path = parent ? `${parent} / ${node.name}` : node.name;
      const matches = !query || path.toLowerCase().includes(query.toLowerCase());
      const isOpen = expanded.includes(path) || Boolean(query);
      const childMatch = node.children && JSON.stringify(node.children).toLowerCase().includes(query.toLowerCase());
      if (!matches && !childMatch) return null;
      return (
        <li key={path}>
          <div className={`flex items-center rounded-md text-sm ${target === path ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-500/15 dark:text-indigo-100' : 'text-zinc-700 dark:text-zinc-200'}`} style={{ paddingLeft: depth * 16 }}>
            {node.children ? <button type="button" aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${node.name}`} aria-expanded={isOpen} onClick={() => setExpanded((list) => (list.includes(path) ? list.filter((item) => item !== path) : [...list, path]))} className="grid size-6 place-items-center rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"><ChevronRight aria-hidden className={`size-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} /></button> : <span className="size-6" />}
            <button type="button" disabled={path === current} aria-pressed={target === path} onClick={() => setTarget(path)} className="flex flex-1 items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-800">
              {isOpen && node.children ? <FolderOpen aria-hidden className="size-4 text-amber-500" /> : <Folder aria-hidden className="size-4 text-amber-500" />}{node.name}
              {path === current && <span className="ml-auto rounded bg-zinc-100 px-1.5 text-[10px] text-zinc-500 dark:bg-zinc-800">current</span>}
            </button>
          </div>
          {node.children && isOpen && <ul>{render(node.children, path, depth + 1)}</ul>}
        </li>
      );
    });
  }

  return (
    <div className="w-80">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">Move to…</button>
      {open && (
        <div role="dialog" aria-label="Move file" className="mt-2 rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 p-3 dark:border-zinc-800"><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Move “api-v3.md”</p><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search folders" aria-label="Search folders" className="mt-2 w-full rounded-md bg-zinc-100 px-2.5 py-1.5 text-sm text-zinc-900 outline-none dark:bg-zinc-800 dark:text-zinc-100" /></div>
          <ul className="max-h-56 overflow-y-auto p-1.5" data-lenis-prevent>{render(tree)}</ul>
          <div className="flex items-center justify-between gap-2 border-t border-zinc-100 p-3 dark:border-zinc-800">
            <p aria-live="polite" className="truncate text-xs text-emerald-600 dark:text-emerald-400">{moved ? `Moved to ${moved}` : ''}</p>
            <div className="flex shrink-0 gap-2"><button type="button" onClick={() => { setTarget(null); setOpen(false); }} className="rounded-md px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button><button type="button" disabled={!target} onClick={() => { setMoved(target); setTarget(null); }} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40">Move here</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
