/**
 * @registry
 * name: File Dropzone
 * category: Forms
 * style: SaaS
 * tags: featured, recent
 * description: Zone de dépôt de fichiers avec glisser-déposer, parcourir, liste avec progression et suppression.
 * prompt: Create a file uploader: dashed dropzone that highlights on dragover, a visually hidden file input triggered by a "browse" button (keyboard accessible), accepted types/size hint, and an uploaded-files list with icon, name, size, simulated progress bar, done check and remove button. Light and dark mode.
 */
'use client';
import { CheckCircle2, FileText, UploadCloud, X } from 'lucide-react';
import { useEffect, useRef, useState, type DragEvent } from 'react';

type Upload = { name: string; size: string; progress: number };
const format = (bytes: number) => (bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} KB`);

export function FileDropzone() {
  const [files, setFiles] = useState<Upload[]>([{ name: 'moodboard.pdf', size: '2.4 MB', progress: 100 }]);
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!files.some((file) => file.progress < 100)) return;
    const timer = window.setTimeout(() => setFiles((current) => current.map((file) => ({ ...file, progress: Math.min(100, file.progress + 12) }))), 150);
    return () => window.clearTimeout(timer);
  }, [files]);

  function add(list: FileList | null) {
    if (!list) return;
    setFiles((current) => [...current, ...Array.from(list).map((file) => ({ name: file.name, size: format(file.size), progress: 0 }))]);
  }
  function onDrop(event: DragEvent) { event.preventDefault(); setOver(false); add(event.dataTransfer.files); }

  return (
    <div className="w-full max-w-md">
      <div onDragOver={(event) => { event.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={onDrop} className={`flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${over ? 'border-teal-500 bg-teal-500/5' : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950'}`}>
        <span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"><UploadCloud aria-hidden className="size-5" /></span>
        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300"><button type="button" onClick={() => input.current?.click()} className="font-semibold text-teal-700 hover:underline dark:text-teal-400">Click to upload</button> or drag and drop</p>
        <p className="mt-1 text-xs text-zinc-500">PNG, JPG or PDF · max 10 MB</p>
        <input ref={input} type="file" multiple className="sr-only" tabIndex={-1} aria-label="Upload files" onChange={(event) => add(event.target.files)} />
      </div>
      <ul className="mt-3 space-y-2">
        {files.map((file, index) => (
          <li key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <FileText aria-hidden className="size-5 shrink-0 text-teal-600" />
            <div className="min-w-0 flex-1">
              <p className="flex justify-between gap-2 text-sm"><span className="truncate font-medium text-zinc-900 dark:text-white">{file.name}</span><span className="shrink-0 text-xs text-zinc-500">{file.size}</span></p>
              <div role="progressbar" aria-label={`Uploading ${file.name}`} aria-valuenow={file.progress} aria-valuemin={0} aria-valuemax={100} className="mt-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${file.progress}%` }} /></div>
            </div>
            {file.progress === 100 ? <CheckCircle2 aria-label="Uploaded" className="size-5 text-emerald-500" /> : null}
            <button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((_, i) => i !== index))} className="grid size-7 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900"><X className="size-4" /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
