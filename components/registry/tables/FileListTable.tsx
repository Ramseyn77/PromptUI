/**
 * @registry
 * name: File List Table
 * category: Tables
 * style: SaaS
 * tags: recent
 * description: Liste de fichiers avec icônes par type, taille, date, partage et actions au survol.
 * prompt: Create a file manager table: file-type icon tile (PDF red, image violet, sheet green, folder amber), name, owner avatars, size and modified date (hidden below sm), and row actions (download, more) revealed on hover and on focus-within. Light and dark mode.
 */
import { Download, FileSpreadsheet, FileText, Folder, ImageIcon, MoreHorizontal } from 'lucide-react';

const files = [
  { name: 'Brand assets', type: 'folder', size: '—', date: 'Sep 24' },
  { name: 'Q3 report.pdf', type: 'pdf', size: '2.1 MB', date: 'Sep 22' },
  { name: 'Hero shot.png', type: 'image', size: '860 KB', date: 'Sep 20' },
  { name: 'Budget 2026.xlsx', type: 'sheet', size: '48 KB', date: 'Sep 18' },
];
const types = {
  folder: { icon: Folder, tone: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
  pdf: { icon: FileText, tone: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
  image: { icon: ImageIcon, tone: 'bg-violet-500/15 text-violet-600 dark:text-violet-400' },
  sheet: { icon: FileSpreadsheet, tone: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
} as const;

export function FileListTable() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"><tr><th className="px-4 py-3 font-medium">Name</th><th className="hidden px-4 py-3 font-medium sm:table-cell">Size</th><th className="hidden px-4 py-3 font-medium sm:table-cell">Modified</th><th className="w-24" /></tr></thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {files.map((file) => {
            const { icon: Icon, tone } = types[file.type as keyof typeof types];
            return (
              <tr key={file.name} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
                <td className="px-4 py-3"><div className="flex items-center gap-3"><span className={`grid size-9 place-items-center rounded-lg ${tone}`}><Icon aria-hidden className="size-4" /></span><span className="font-medium text-zinc-900 dark:text-white">{file.name}</span></div></td>
                <td className="hidden px-4 py-3 text-zinc-500 sm:table-cell dark:text-zinc-400">{file.size}</td>
                <td className="hidden px-4 py-3 text-zinc-500 sm:table-cell dark:text-zinc-400">{file.date}</td>
                <td className="px-3 py-3">
                  <div className="flex justify-end gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                    <button type="button" aria-label={`Download ${file.name}`} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"><Download className="size-4" /></button>
                    <button type="button" aria-label={`More actions for ${file.name}`} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"><MoreHorizontal className="size-4" /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
