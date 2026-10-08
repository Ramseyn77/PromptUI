/**
 * @registry
 * name: Folder Tree Sidebar
 * category: Sidebar
 * style: Dark
 * tags: recent
 * description: Explorateur de fichiers en arbre avec dossiers dépliables, icônes et fichier sélectionné.
 * prompt: Create a file-explorer tree sidebar (role="tree"/"treeitem", aria-expanded on folders): recursive folders that open/close with chevrons and folder-open icons, files with type-colored icons, depth-based indentation, and the selected file highlighted (aria-selected). IDE-like, light and dark mode.
 */
'use client';
import { ChevronRight, FileCode2, FileJson, FileText, Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';

type Node = { name: string; children?: Node[] };
const tree: Node[] = [
  { name: 'app', children: [{ name: 'layout.tsx' }, { name: 'page.tsx' }, { name: 'library', children: [{ name: 'page.tsx' }] }] },
  { name: 'components', children: [{ name: 'Button.tsx' }, { name: 'Card.tsx' }] },
  { name: 'package.json' },
  { name: 'README.md' },
];

function fileIcon(name: string) {
  if (name.endsWith('.json')) return <FileJson aria-hidden className="size-4 text-amber-500" />;
  if (name.endsWith('.md')) return <FileText aria-hidden className="size-4 text-sky-500" />;
  return <FileCode2 aria-hidden className="size-4 text-teal-500" />;
}

export function FolderTreeSidebar() {
  const [open, setOpen] = useState<string[]>(['app', 'app/library']);
  const [selected, setSelected] = useState('app/library/page.tsx');

  const render = (nodes: Node[], path = '', depth = 0) => nodes.map((node) => {
    const id = path ? `${path}/${node.name}` : node.name;
    const expanded = open.includes(id);
    return (
      <li key={id} role="treeitem" aria-expanded={node.children ? expanded : undefined} aria-selected={!node.children && selected === id}>
        <button type="button" onClick={() => (node.children ? setOpen((current) => (expanded ? current.filter((item) => item !== id) : [...current, id])) : setSelected(id))} className={`flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left text-[13px] ${!node.children && selected === id ? 'bg-teal-500/15 text-teal-800 dark:text-teal-200' : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`} style={{ paddingLeft: depth * 14 + 6 }}>
          {node.children ? <><ChevronRight aria-hidden className={`size-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />{expanded ? <FolderOpen aria-hidden className="size-4 text-violet-500" /> : <Folder aria-hidden className="size-4 text-violet-500" />}</> : <><span className="w-3.5" />{fileIcon(node.name)}</>}
          {node.name}
        </button>
        {node.children && expanded && <ul role="group">{render(node.children, id, depth + 1)}</ul>}
      </li>
    );
  });

  return (
    <aside className="w-64 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 font-mono dark:border-zinc-800 dark:bg-zinc-900">
      <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Explorer</p>
      <ul role="tree" aria-label="Project files">{render(tree)}</ul>
    </aside>
  );
}
