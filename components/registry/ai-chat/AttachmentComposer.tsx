/**
 * @registry
 * name: Attachment Composer
 * category: AI Chat
 * style: SaaS
 * tags: recent
 * description: Saisie de chat avec pieces jointes en vignettes, taille des fichiers et suppression.
 * prompt: Create a chat composer with attachment chips above the input: each chip shows a file-type icon tile, name (truncated), size and a remove button (aria-label "Remove file"); an attach button adds a demo file. Light and dark mode.
 */
'use client';
import { FileText, ImageIcon, Paperclip, SendHorizontal, X } from 'lucide-react';
import { useState } from 'react';

type Attachment = { name: string; size: string; kind: 'doc' | 'image' };

export function AttachmentComposer() {
  const [files, setFiles] = useState<Attachment[]>([
    { name: 'brand-guidelines.pdf', size: '2.4 MB', kind: 'doc' },
    { name: 'hero-reference.png', size: '840 KB', kind: 'image' },
  ]);

  return (
    <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      {files.length > 0 && (
        <ul className="flex flex-wrap gap-2 pb-3">
          {files.map((file) => {
            const Icon = file.kind === 'image' ? ImageIcon : FileText;
            return (
              <li key={file.name} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-1.5 pl-1.5 pr-2 dark:border-zinc-800 dark:bg-zinc-900">
                <span className={`grid size-8 place-items-center rounded-lg ${file.kind === 'image' ? 'bg-violet-500/15 text-violet-600 dark:text-violet-300' : 'bg-rose-500/15 text-rose-600 dark:text-rose-300'}`}><Icon aria-hidden className="size-4" /></span>
                <span className="max-w-[9rem]"><span className="block truncate text-xs font-medium text-zinc-900 dark:text-white">{file.name}</span><span className="block text-[11px] text-zinc-500">{file.size}</span></span>
                <button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item.name !== file.name))} className="grid size-5 place-items-center rounded-full text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"><X className="size-3.5" /></button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Attach file" onClick={() => setFiles((current) => [...current, { name: `notes-${current.length + 1}.txt`, size: '4 KB', kind: 'doc' }])} className="grid size-9 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"><Paperclip className="size-4" /></button>
        <input aria-label="Message" placeholder="Ask about these files…" className="h-9 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white" />
        <button type="button" aria-label="Send" className="grid size-9 place-items-center rounded-full bg-teal-600 text-white hover:bg-teal-700"><SendHorizontal className="size-4" /></button>
      </div>
    </div>
  );
}
