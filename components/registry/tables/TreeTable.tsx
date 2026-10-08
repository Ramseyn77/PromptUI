/**
 * @registry
 * name: Tree Table
 * category: Tables
 * style: SaaS
 * tags: featured, recent
 * description: Tableau hiérarchique façon Ant Design : lignes dépliables par niveau, indentation, totaux agrégés des enfants.
 * prompt: Create an Ant Design-style tree table (role="treegrid") of a budget: departments expand into teams and teams into line items via chevron buttons (aria-expanded), with indentation per level, aggregated totals on parent rows computed from children, Expand all / Collapse all buttons, and right-aligned currency columns. Horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type Node = { id: string; name: string; budget?: number; spent?: number; children?: Node[] };
const tree: Node[] = [
  { id: 'eng', name: 'Engineering', children: [
    { id: 'web', name: 'Web team', children: [{ id: 'w1', name: 'Cloud hosting', budget: 24000, spent: 19800 }, { id: 'w2', name: 'Monitoring', budget: 6000, spent: 6400 }] },
    { id: 'mob', name: 'Mobile team', children: [{ id: 'm1', name: 'Device lab', budget: 9000, spent: 4100 }] },
  ] },
  { id: 'mkt', name: 'Marketing', children: [{ id: 'k1', name: 'Paid ads', budget: 30000, spent: 27500 }, { id: 'k2', name: 'Events', budget: 12000, spent: 3000 }] },
];
const sum = (node: Node, key: 'budget' | 'spent'): number => node.children ? node.children.reduce((total, child) => total + sum(child, key), 0) : node[key] ?? 0;
const allIds = (nodes: Node[]): string[] => nodes.flatMap((node) => (node.children ? [node.id, ...allIds(node.children)] : []));
const money = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function TreeTable() {
  const [open, setOpen] = useState<string[]>(['eng', 'web']);

  const rows = (nodes: Node[], level: number): ReactNode[] => nodes.flatMap((node) => {
    const expanded = open.includes(node.id);
    const budget = sum(node, 'budget');
    const spent = sum(node, 'spent');
    const row = (
      <tr key={node.id} role="row" aria-level={level + 1} aria-expanded={node.children ? expanded : undefined} className={level === 0 ? 'bg-zinc-50/70 font-semibold dark:bg-zinc-900/40' : ''}>
        <td role="gridcell" className="py-2 pr-3" style={{ paddingLeft: 12 + level * 20 }}>
          <span className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100">
            {node.children ? <button type="button" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.name}`} onClick={() => setOpen((list) => (expanded ? list.filter((id) => id !== node.id) : [...list, node.id]))} className="grid size-5 place-items-center rounded text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"><ChevronRight aria-hidden className={`size-4 transition-transform ${expanded ? 'rotate-90' : ''}`} /></button> : <span className="w-5" />}
            {node.name}
          </span>
        </td>
        <td role="gridcell" className="px-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">{money(budget)}</td>
        <td role="gridcell" className={`px-3 text-right tabular-nums ${spent > budget ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-700 dark:text-zinc-300'}`}>{money(spent)}</td>
      </tr>
    );
    return node.children && expanded ? [row, ...rows(node.children, level + 1)] : [row];
  });

  return (
    <div className="w-full max-w-xl">
      <div className="mb-2 flex justify-end gap-2 text-xs">
        <button type="button" onClick={() => setOpen(allIds(tree))} className="rounded-md border border-zinc-300 px-2 py-1 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Expand all</button>
        <button type="button" onClick={() => setOpen([])} className="rounded-md border border-zinc-300 px-2 py-1 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Collapse all</button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
        <table role="treegrid" aria-label="Budget by department" className="w-full min-w-[26rem] text-sm">
          <thead className="border-b border-zinc-200 text-left text-xs text-zinc-500 dark:border-zinc-800"><tr><th className="px-3 py-2 font-medium">Name</th><th className="px-3 text-right font-medium">Budget</th><th className="px-3 text-right font-medium">Spent</th></tr></thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">{rows(tree, 0)}</tbody>
        </table>
      </div>
    </div>
  );
}
