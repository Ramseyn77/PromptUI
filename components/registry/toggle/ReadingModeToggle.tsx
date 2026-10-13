/**
 * @registry
 * name: Reading Mode Toggle
 * category: Toggle
 * style: Editorial
 * tags: featured, recent
 * description: Réglages de lecture façon liseuse : thème Clair / Sépia / Nuit, taille de texte, police serif ou sans, interligne, appliqués en direct à un extrait.
 * prompt: Create reader display settings: a theme radiogroup of three swatches (Light, Sepia, Night) that restyle the article preview background and text, an "Aa" text size stepper (5 steps), a font toggle (Serif / Sans) and a line-height toggle (Compact / Relaxed); the preview paragraph updates live with smooth color transitions; settings are announced briefly via aria-live; all controls are keyboard accessible. The surrounding card supports light and dark mode.
 */
'use client';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const themes = { Light: 'bg-white text-zinc-900', Sepia: 'bg-[#f4ecd8] text-[#5b4636]', Night: 'bg-zinc-900 text-zinc-300' };
type Theme = keyof typeof themes;
const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];

export function ReadingModeToggle() {
  const [theme, setTheme] = useState<Theme>('Sepia');
  const [size, setSize] = useState(2);
  const [serif, setSerif] = useState(true);
  const [relaxed, setRelaxed] = useState(true);
  const toggle = 'rounded-md px-2.5 py-1 text-xs font-medium';

  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center gap-3">
        <div role="radiogroup" aria-label="Reading theme" className="flex gap-1.5">{(Object.keys(themes) as Theme[]).map((name) => <button key={name} type="button" role="radio" aria-checked={theme === name} aria-label={name} onClick={() => setTheme(name)} className={`grid size-9 place-items-center rounded-full border text-xs font-serif ${themes[name]} ${theme === name ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-950' : 'border-zinc-300 dark:border-zinc-700'}`}>Aa</button>)}</div>
        <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700"><button type="button" aria-label="Smaller text" disabled={size === 0} onClick={() => setSize(size - 1)} className="grid size-8 place-items-center text-zinc-700 disabled:opacity-30 dark:text-zinc-300"><Minus aria-hidden className="size-3.5" /></button><span className="w-8 text-center text-xs tabular-nums text-zinc-600 dark:text-zinc-400">{size + 1}/5</span><button type="button" aria-label="Larger text" disabled={size === sizes.length - 1} onClick={() => setSize(size + 1)} className="grid size-8 place-items-center text-zinc-700 disabled:opacity-30 dark:text-zinc-300"><Plus aria-hidden className="size-3.5" /></button></div>
        <div role="group" aria-label="Font" className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900">{[['Serif', true], ['Sans', false]].map(([label, value]) => <button key={label as string} type="button" aria-pressed={serif === value} onClick={() => setSerif(value as boolean)} className={`${toggle} ${serif === value ? 'bg-white shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'} ${value ? 'font-serif' : ''}`}>{label as string}</button>)}</div>
        <div role="group" aria-label="Line spacing" className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900">{[['Compact', false], ['Relaxed', true]].map(([label, value]) => <button key={label as string} type="button" aria-pressed={relaxed === value} onClick={() => setRelaxed(value as boolean)} className={`${toggle} ${relaxed === value ? 'bg-white shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{label as string}</button>)}</div>
      </div>
      <p aria-live="polite" className="sr-only">{theme} theme, size {size + 1}, {serif ? 'serif' : 'sans-serif'}, {relaxed ? 'relaxed' : 'compact'} spacing</p>
      <article className={`mt-4 rounded-xl p-6 transition-colors duration-300 ${themes[theme]}`}>
        <h3 className={`font-semibold ${serif ? 'font-serif' : ''} ${sizes[Math.min(4, size + 1)]}`}>The slow web</h3>
        <p className={`mt-2 ${sizes[size]} ${serif ? 'font-serif' : 'font-sans'} ${relaxed ? 'leading-relaxed' : 'leading-snug'}`}>Some pages ask nothing of you. They load, they let you read, and they get out of the way. Reading mode is a small promise: the words come first, and everything else waits politely.</p>
      </article>
    </div>
  );
}
