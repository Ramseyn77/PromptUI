/**
 * @registry
 * name: Export Menu
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Menu d'export avec formats (CSV, Excel, PDF, JSON), options de périmètre et progression simulée jusqu'au téléchargement.
 * prompt: Create an export menu (open by default) from a split "Export" button: format options as menuitemradio rows with icon, name and file-size estimate (CSV, Excel, PDF, JSON); a scope radio group (Current view 248 rows / All data 12,480 rows); an "Include archived" checkbox; clicking Export shows an inline progress bar that fills, then a "report.csv ready — Download" success row with aria-live. Light and dark mode.
 */
'use client';
import { Braces, ChevronDown, Download, FileSpreadsheet, FileText, Sheet } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

const formats = [{ id: 'csv', label: 'CSV', icon: Sheet, size: 0.4 }, { id: 'xlsx', label: 'Excel', icon: FileSpreadsheet, size: 0.9 }, { id: 'pdf', label: 'PDF', icon: FileText, size: 2.4 }, { id: 'json', label: 'JSON', icon: Braces, size: 1.1 }];

export function ExportMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [format, setFormat] = useState('csv');
  const [scope, setScope] = useState<'view' | 'all'>('view');
  const [archived, setArchived] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const factor = scope === 'all' ? 50 : 1;

  useEffect(() => {
    if (progress === null || progress >= 100) return;
    const timer = window.setTimeout(() => setProgress((value) => Math.min(100, (value ?? 0) + 12)), 120);
    return () => window.clearTimeout(timer);
  }, [progress]);

  return (
    <div className="w-80">
      <div className="inline-flex overflow-hidden rounded-lg bg-zinc-900 text-sm font-medium text-white dark:bg-white dark:text-zinc-900">
        <button type="button" onClick={() => setProgress(0)} className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-zinc-700 dark:hover:bg-zinc-200"><Download aria-hidden className="size-4" />Export</button>
        <button type="button" aria-label="Export options" aria-expanded={open} onClick={() => setOpen(!open)} className="border-l border-white/20 px-2 hover:bg-zinc-700 dark:border-zinc-900/20 dark:hover:bg-zinc-200"><ChevronDown aria-hidden className="size-4" /></button>
      </div>
      {open && (
        <div className="mt-2 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div role="menu" aria-label="Format">
            {formats.map(({ id, label, icon: Icon, size }) => <button key={id} type="button" role="menuitemradio" aria-checked={format === id} onClick={() => setFormat(id)} className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm ${format === id ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100' : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/60'}`}><Icon aria-hidden className="size-4" />{label}<span className="ml-auto text-xs tabular-nums text-zinc-400">~{(size * factor).toFixed(1)} MB</span></button>)}
          </div>
          <fieldset className="mt-1 border-t border-zinc-100 px-2.5 pt-2 dark:border-zinc-800">
            <legend className="sr-only">Scope</legend>
            {([['view', 'Current view', '248 rows'], ['all', 'All data', '12,480 rows']] as const).map(([value, label, rows]) => <label key={value} className="flex items-center gap-2 py-1 text-sm text-zinc-700 dark:text-zinc-300"><input type="radio" name={`${uid}-scope`} checked={scope === value} onChange={() => setScope(value)} className="accent-indigo-600" />{label}<span className="ml-auto text-xs text-zinc-400">{rows}</span></label>)}
            <label className="flex items-center gap-2 py-1 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={archived} onChange={(event) => setArchived(event.target.checked)} className="accent-indigo-600" />Include archived</label>
          </fieldset>
          <div className="mt-1 border-t border-zinc-100 p-2.5 dark:border-zinc-800" aria-live="polite">
            {progress === null ? <button type="button" onClick={() => setProgress(0)} className="w-full rounded-lg bg-indigo-600 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500">Export {formats.find((item) => item.id === format)!.label}</button>
              : progress < 100 ? <div><p className="text-xs text-zinc-500">Preparing export… {progress}%</p><div className="mt-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} /></div></div>
              : <div className="flex items-center justify-between text-sm"><span className="text-emerald-600 dark:text-emerald-400">report.{format} ready</span><button type="button" onClick={() => setProgress(null)} className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">Download</button></div>}
          </div>
        </div>
      )}
    </div>
  );
}
