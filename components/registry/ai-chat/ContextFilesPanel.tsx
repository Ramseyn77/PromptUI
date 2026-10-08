/**
 * @registry
 * name: Context Files Panel
 * category: AI Chat
 * style: SaaS
 * tags: recent
 * description: Panneau des fichiers de contexte d'un assistant : poids en tokens, activation par fichier et jauge de capacité.
 * prompt: Create an AI context files panel: header "Context" with a token budget meter (used/200k, turns amber above 80%); a list of attached files (icon by type, name, token count) each with an include switch (role="switch") and remove button; disabled files are dimmed and excluded from the meter; an "Add files" dashed button. Light and dark mode.
 */
'use client';
import { FileCode2, FileText, Image, Plus, X, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const initial: { name: string; tokens: number; icon: LucideIcon; on: boolean }[] = [
  { name: 'product-spec.pdf', tokens: 64000, icon: FileText, on: true },
  { name: 'checkout.tsx', tokens: 18000, icon: FileCode2, on: true },
  { name: 'api-schema.json', tokens: 72000, icon: FileCode2, on: true },
  { name: 'wireframe.png', tokens: 9000, icon: Image, on: false },
];

export function ContextFilesPanel() {
  const [files, setFiles] = useState(initial);
  const used = files.filter((file) => file.on).reduce((sum, file) => sum + file.tokens, 0);
  const pct = Math.min(100, (used / 200000) * 100);

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between"><h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Context</h3><span className="text-xs tabular-nums text-zinc-500">{Math.round(used / 1000)}k / 200k tokens</span></div>
      <div role="meter" aria-label="Context used" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} className="mt-2 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full transition-all ${pct > 80 ? 'bg-amber-500' : 'bg-teal-500'}`} style={{ width: `${pct}%` }} /></div>
      <ul className="mt-3 space-y-1">
        {files.map((file) => {
          const Icon = file.icon;
          return (
            <li key={file.name} className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 ${file.on ? '' : 'opacity-50'}`}>
              <Icon aria-hidden className="size-4 text-zinc-400" />
              <span className="min-w-0 flex-1"><span className="block truncate text-sm text-zinc-800 dark:text-zinc-200">{file.name}</span><span className="text-[11px] text-zinc-500">{Math.round(file.tokens / 1000)}k tokens</span></span>
              <button type="button" role="switch" aria-checked={file.on} aria-label={`Include ${file.name}`} onClick={() => setFiles((list) => list.map((item) => (item.name === file.name ? { ...item, on: !item.on } : item)))} className={`relative h-4 w-7 shrink-0 rounded-full transition ${file.on ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}><span className={`absolute top-0.5 size-3 rounded-full bg-white transition-transform ${file.on ? 'translate-x-3.5' : 'translate-x-0.5'}`} /></button>
              <button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((list) => list.filter((item) => item.name !== file.name))} className="grid size-6 place-items-center rounded text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"><X aria-hidden className="size-3.5" /></button>
            </li>
          );
        })}
      </ul>
      <button type="button" className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-300 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"><Plus aria-hidden className="size-4" />Add files</button>
    </section>
  );
}
