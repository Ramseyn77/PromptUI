/**
 * @registry
 * name: Image Picker Checkbox
 * category: Checkboxes
 * style: Gradient
 * tags: featured, recent
 * description: Sélection multiple de photos dans une grille, avec numéro d'ordre de sélection et barre d'action en bas.
 * prompt: Create a photo picker: a 3-column grid of gradient "photos" (labels with hidden checkboxes); selected photos scale down slightly with a ring and show a numbered badge reflecting selection order (1, 2, 3…); unselected show an empty circle on hover/focus; a bottom bar shows "3 selected" with Clear and "Add to album" buttons. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const photos = ['from-rose-300 to-orange-400', 'from-sky-300 to-indigo-500', 'from-emerald-300 to-teal-600', 'from-amber-200 to-yellow-500', 'from-fuchsia-300 to-violet-600', 'from-cyan-200 to-sky-500'];

export function ImagePickerCheckbox() {
  const [order, setOrder] = useState<number[]>([1, 4]);
  const toggle = (index: number) => setOrder((list) => (list.includes(index) ? list.filter((item) => item !== index) : [...list, index]));

  return (
    <div className="w-full max-w-sm">
      <div className="grid grid-cols-3 gap-1.5">
        {photos.map((tone, index) => {
          const position = order.indexOf(index);
          const checked = position >= 0;
          return (
            <label key={tone} className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500">
              <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(index)} aria-label={`Photo ${index + 1}`} />
              <span aria-hidden className={`absolute inset-0 bg-gradient-to-br transition-transform duration-200 ${tone} ${checked ? 'scale-90 rounded-lg' : ''}`} />
              <span aria-hidden className={`absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full text-xs font-bold transition ${checked ? 'bg-teal-600 text-white' : 'border-2 border-white/90 opacity-0 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100'}`}>{checked ? position + 1 : ''}</span>
            </label>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-zinc-950 px-4 py-2.5 text-sm text-white dark:bg-zinc-800">
        <span aria-live="polite">{order.length} selected</span>
        <span className="flex gap-2"><button type="button" onClick={() => setOrder([])} className="text-zinc-300 hover:text-white">Clear</button><button type="button" disabled={!order.length} className="rounded-lg bg-white px-3 py-1 font-semibold text-zinc-950 disabled:opacity-40">Add to album</button></span>
      </div>
    </div>
  );
}
