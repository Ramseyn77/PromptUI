/**
 * @registry
 * name: View Mode Toggle
 * category: Toggle
 * style: Minimal
 * tags: recent
 * description: Bascule grille/liste avec pastille glissante qui réorganise réellement les fichiers affichés.
 * prompt: Create a grid/list view toggle: a two-option segmented control (role="radiogroup", icon + visually hidden label) with a sliding pill indicator; switching re-lays out a set of 6 file items between a 3-column card grid and a compact list with metadata, with a short fade. Light and dark mode.
 */
'use client';
import { FileText, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

const files = ['Brief.pdf', 'Moodboard.fig', 'Copy.docx', 'Logo.svg', 'Budget.xlsx', 'Notes.md'];

export function ViewModeToggle() {
  const [mode, setMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="w-full max-w-md">
      <style>{`@keyframes pui-fade{from{opacity:0;transform:translateY(4px)}}`}</style>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Project files</p>
        <div role="radiogroup" aria-label="View" className="relative flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
          <span aria-hidden className={`absolute top-1 size-8 rounded-md bg-white shadow transition-transform duration-300 dark:bg-zinc-950 ${mode === 'list' ? 'translate-x-8' : ''}`} />
          {([['grid', LayoutGrid, 'Grid view'], ['list', List, 'List view']] as const).map(([value, Icon, label]) => (
            <button key={value} type="button" role="radio" aria-checked={mode === value} aria-label={label} onClick={() => setMode(value)} className={`relative grid size-8 place-items-center rounded-md ${mode === value ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-500'}`}><Icon aria-hidden className="size-4" /></button>
          ))}
        </div>
      </div>
      <ul key={mode} className={`mt-3 motion-safe:animate-[pui-fade_.25s_ease-out] ${mode === 'grid' ? 'grid grid-cols-3 gap-2' : 'divide-y divide-zinc-100 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800'}`}>
        {files.map((file, index) => (
          <li key={file} className={mode === 'grid' ? 'rounded-xl border border-zinc-200 p-3 text-center dark:border-zinc-800' : 'flex items-center gap-3 px-3 py-2'}>
            <FileText aria-hidden className={`text-teal-600 dark:text-teal-400 ${mode === 'grid' ? 'mx-auto size-6' : 'size-4'}`} />
            <span className={`truncate text-zinc-800 dark:text-zinc-200 ${mode === 'grid' ? 'mt-2 block text-xs' : 'flex-1 text-sm'}`}>{file}</span>
            {mode === 'list' && <span className="text-xs text-zinc-400">{(index + 1) * 120} KB</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
