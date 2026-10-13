/**
 * @registry
 * name: Upload Queue Loader
 * category: Loader
 * style: SaaS
 * tags: recent
 * description: File d'envoi multi-fichiers : progression par fichier, vitesse et temps restant, mise en pause, échec avec réessai et total global.
 * prompt: Create a multi-file upload queue loader: a header with overall progress "3 of 5 uploaded · 62%" and a thin global bar; rows per file with type icon, name, size, a progress bar, speed/ETA text and actions: pause/resume (aria-pressed), cancel, and for a failed file a red "Failed — Retry" state; progress advances on an interval only while unpaused; completed files show a check; progress bars use role=progressbar with values; a "Clear completed" button. Light and dark mode.
 */
'use client';
import { Check, FileImage, FileText, FileVideo, Pause, Play, RotateCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const initial = [
  { id: 1, name: 'brand-guidelines.pdf', size: 4.2, icon: FileText, progress: 100, paused: false, failed: false },
  { id: 2, name: 'hero-shot@2x.png', size: 2.8, icon: FileImage, progress: 64, paused: false, failed: false },
  { id: 3, name: 'launch-teaser.mp4', size: 48, icon: FileVideo, progress: 22, paused: false, failed: false },
  { id: 4, name: 'pricing-v3.pdf', size: 1.1, icon: FileText, progress: 40, paused: false, failed: true },
  { id: 5, name: 'team-photo.jpg', size: 3.4, icon: FileImage, progress: 0, paused: true, failed: false },
];

export function UploadQueueLoader() {
  const [files, setFiles] = useState(initial);
  const active = files.some((file) => file.progress < 100 && !file.paused && !file.failed);

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setFiles((list) => list.map((file) => (file.progress < 100 && !file.paused && !file.failed ? { ...file, progress: Math.min(100, file.progress + Math.max(1, Math.round(12 / file.size * 4))) } : file))), 400);
    return () => window.clearInterval(timer);
  }, [active]);

  const done = files.filter((file) => file.progress === 100).length;
  const overall = Math.round(files.reduce((sum, file) => sum + file.progress, 0) / Math.max(1, files.length));
  const patch = (id: number, change: Partial<(typeof initial)[number]>) => setFiles((list) => list.map((file) => (file.id === id ? { ...file, ...change } : file)));

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-zinc-950 dark:text-white">Uploads</h3><button type="button" onClick={() => setFiles((list) => list.filter((file) => file.progress < 100))} className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Clear completed</button></div>
      <p className="mt-1 text-xs text-zinc-500">{done} of {files.length} uploaded · {overall}%</p>
      <div className="mt-2 h-1 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${overall}%` }} /></div>
      <ul className="mt-4 space-y-3">
        {files.map((file) => {
          const Icon = file.icon;
          const complete = file.progress === 100;
          const remaining = Math.ceil(((100 - file.progress) / 100) * file.size * 2);
          return (
            <li key={file.id} className="flex items-center gap-3">
              <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${file.failed ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900'}`}><Icon aria-hidden className="size-4" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2 text-xs"><span className="truncate font-medium text-zinc-900 dark:text-zinc-100">{file.name}</span><span className="shrink-0 tabular-nums text-zinc-500">{file.size} MB</span></div>
                <div role="progressbar" aria-label={file.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={file.progress} className="mt-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full transition-all ${file.failed ? 'bg-rose-500' : complete ? 'bg-emerald-500' : file.paused ? 'bg-zinc-400' : 'bg-indigo-600'}`} style={{ width: `${file.progress}%` }} /></div>
                <p className={`mt-1 text-[11px] ${file.failed ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500'}`}>{file.failed ? 'Failed — network error' : complete ? 'Uploaded' : file.paused ? 'Paused' : `${file.progress}% · ${(file.size > 10 ? 3.2 : 1.4).toFixed(1)} MB/s · ${remaining}s left`}</p>
              </div>
              <div className="flex shrink-0">
                {complete ? <span className="grid size-7 place-items-center text-emerald-600 dark:text-emerald-400"><Check aria-label="Done" className="size-4" /></span>
                  : file.failed ? <button type="button" aria-label={`Retry ${file.name}`} onClick={() => patch(file.id, { failed: false })} className="grid size-7 place-items-center rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"><RotateCcw aria-hidden className="size-4" /></button>
                    : <button type="button" aria-pressed={file.paused} aria-label={`${file.paused ? 'Resume' : 'Pause'} ${file.name}`} onClick={() => patch(file.id, { paused: !file.paused })} className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">{file.paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}</button>}
                {!complete && <button type="button" aria-label={`Cancel ${file.name}`} onClick={() => setFiles((list) => list.filter((item) => item.id !== file.id))} className="grid size-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"><X aria-hidden className="size-4" /></button>}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
