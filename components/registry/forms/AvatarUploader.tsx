/**
 * @registry
 * name: Avatar Uploader
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Envoi de photo de profil avec aperçu rond, glisser-déposer, zoom au curseur et suppression.
 * prompt: Create an avatar uploader: a circular preview (initials fallback) that accepts a dropped or chosen image (hidden file input with a visible "Upload photo" button and label), shows the image via object URL, a zoom range slider (labelled) scaling the image inside the circle, a Remove button, and helper text "PNG or JPG, max 2 MB" with a size error. Light and dark mode.
 */
'use client';
import { Camera, Trash2 } from 'lucide-react';
import { useEffect, useId, useRef, useState, type DragEvent } from 'react';

export function AvatarUploader() {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState('');
  const [over, setOver] = useState(false);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  function use(file?: File) {
    if (!file) return;
    if (!/image\/(png|jpe?g)/.test(file.type)) return setError('Only PNG or JPG files.');
    if (file.size > 2 * 1024 * 1024) return setError('File is larger than 2 MB.');
    setError('');
    setZoom(1);
    setUrl(URL.createObjectURL(file));
  }

  const drop = (event: DragEvent) => { event.preventDefault(); setOver(false); use(event.dataTransfer.files[0]); };

  return (
    <div className="flex w-full max-w-sm items-center gap-5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div onDragOver={(event) => { event.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={drop} className={`relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-teal-400 to-sky-500 text-2xl font-bold text-white ring-offset-2 transition dark:ring-offset-zinc-950 ${over ? 'ring-2 ring-teal-500' : ''}`}>
        {url ? <img src={url} alt="Avatar preview" className="size-full object-cover" style={{ transform: `scale(${zoom})` }} /> : 'AK'}
        <span aria-hidden className="absolute bottom-1 right-1 grid size-7 place-items-center rounded-full bg-zinc-900 text-white ring-2 ring-white dark:ring-zinc-950"><Camera className="size-3.5" /></span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex gap-2">
          <input ref={input} id={id} type="file" accept="image/png,image/jpeg" className="peer sr-only" onChange={(event) => use(event.target.files?.[0])} />
          <label htmlFor={id} className="cursor-pointer rounded-lg bg-zinc-950 px-3 py-1.5 text-sm font-semibold text-white peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 dark:bg-white dark:text-zinc-950">Upload photo</label>
          {url && <button type="button" aria-label="Remove photo" onClick={() => { setUrl(null); if (input.current) input.current.value = ''; }} className="grid size-8 place-items-center rounded-lg border border-zinc-300 text-zinc-500 hover:text-rose-600 dark:border-zinc-700"><Trash2 aria-hidden className="size-4" /></button>}
        </div>
        {url && <label className="mt-3 block text-xs text-zinc-500">Zoom<input type="range" min={1} max={2.5} step={0.05} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="mt-1 w-full accent-teal-600" /></label>}
        <p aria-live="polite" className={`mt-2 text-xs ${error ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500'}`}>{error || 'PNG or JPG, max 2 MB. Drop an image on the circle.'}</p>
      </div>
    </div>
  );
}
