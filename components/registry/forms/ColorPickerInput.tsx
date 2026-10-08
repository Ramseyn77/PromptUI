/**
 * @registry
 * name: Color Picker Input
 * category: Forms
 * style: Gradient
 * tags: featured, recent
 * description: Sélecteur de couleur de marque : nuancier, champ hex validé, pipette native et aperçu du contraste du texte.
 * prompt: Create a brand color picker: a radiogroup of 10 swatches, a hex text input (validated, aria-invalid on bad values) with a leading color dot, a native color input button labelled "Custom", and a live preview button using the color with automatic black/white text chosen from luminance plus the contrast ratio (AA pass/fail badge). Light and dark mode.
 */
'use client';
import { Pipette } from 'lucide-react';
import { useId, useState } from 'react';

const swatches = ['#0d9488', '#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#18181b'];

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ColorPickerInput() {
  const id = useId();
  const [color, setColor] = useState('#6366f1');
  const [draft, setDraft] = useState('#6366f1');
  const valid = /^#[0-9a-f]{6}$/i.test(draft);
  const lum = luminance(color);
  const text = lum > 0.4 ? '#000000' : '#ffffff';
  const ratio = (Math.max(lum, luminance(text)) + 0.05) / (Math.min(lum, luminance(text)) + 0.05);
  const pick = (value: string) => { setColor(value); setDraft(value); };

  return (
    <div className="w-full max-w-xs">
      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Brand color</p>
      <div role="radiogroup" aria-label="Preset colors" className="mt-2 grid grid-cols-5 gap-2">
        {swatches.map((swatch) => <button key={swatch} type="button" role="radio" aria-checked={color === swatch} aria-label={swatch} onClick={() => pick(swatch)} className={`size-9 rounded-lg ring-offset-2 transition hover:scale-110 dark:ring-offset-zinc-950 ${color === swatch ? 'ring-2 ring-zinc-900 dark:ring-white' : ''}`} style={{ background: swatch }} />)}
      </div>
      <div className="mt-3 flex gap-2">
        <label htmlFor={id} className="sr-only">Hex value</label>
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-2 dark:border-zinc-700 dark:bg-zinc-950">
          <span aria-hidden className="size-4 rounded" style={{ background: valid ? draft : color }} />
          <input id={id} value={draft} aria-invalid={!valid} onChange={(event) => { setDraft(event.target.value); if (/^#[0-9a-f]{6}$/i.test(event.target.value)) setColor(event.target.value); }} className={`w-full bg-transparent py-1.5 font-mono text-sm uppercase outline-none ${valid ? 'text-zinc-900 dark:text-zinc-100' : 'text-rose-600'}`} />
        </div>
        <label className="relative grid size-9 cursor-pointer place-items-center rounded-lg border border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"><Pipette aria-hidden className="size-4" /><span className="sr-only">Custom color</span><input type="color" value={color} onChange={(event) => pick(event.target.value)} className="absolute inset-0 cursor-pointer opacity-0" /></label>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="rounded-lg px-4 py-2 text-sm font-semibold" style={{ background: color, color: text }}>Get started</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${ratio >= 4.5 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300'}`}>{ratio.toFixed(1)}:1 · {ratio >= 4.5 ? 'AA pass' : 'AA large only'}</span>
      </div>
    </div>
  );
}
