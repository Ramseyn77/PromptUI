/**
 * @registry
 * name: Mood Board
 * category: Boards
 * style: Editorial
 * tags: recent
 * description: Planche d inspiration en mosaique : couleurs, typographie, citations et textures.
 * prompt: Create a design mood board as a CSS masonry (columns-2 on mobile, columns-3 on sm) mixing tiles: gradient "photos", color swatches with hex codes that copy on click, a type specimen "Aa", a quote card and a texture tile. Rounded tiles, light and dark mode.
 */
'use client';
import { useState } from 'react';

const swatches = ['#0f766e', '#f5e6c8', '#8b5cf6', '#1c1917'];

export function MoodBoard() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    window.setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="w-full max-w-2xl columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
      <div aria-hidden className="h-40 break-inside-avoid rounded-2xl bg-[linear-gradient(160deg,#99f6e4,#0f766e)]" />
      <div className="break-inside-avoid rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="font-serif text-5xl text-zinc-900 dark:text-white">Aa</p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Instrument Serif · 400</p>
      </div>
      <div className="grid break-inside-avoid grid-cols-2 gap-1 rounded-2xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
        {swatches.map((hex) => (
          <button key={hex} type="button" onClick={() => copy(hex)} aria-label={`Copy ${hex}`} className="flex h-16 items-end rounded-xl p-1.5 text-left" style={{ background: hex }}>
            <span className="rounded bg-white/85 px-1 font-mono text-[10px] text-zinc-900">{copied === hex ? 'Copied' : hex}</span>
          </button>
        ))}
      </div>
      <blockquote className="break-inside-avoid rounded-2xl bg-[#f5e6c8] p-4 font-serif text-lg italic leading-6 text-stone-800 dark:bg-stone-800 dark:text-stone-100">“Warm, slow, honest materials.”</blockquote>
      <div aria-hidden className="h-56 break-inside-avoid rounded-2xl bg-[linear-gradient(200deg,#c4b5fd,#8b5cf6_60%,#1c1917)]" />
      <div aria-hidden className="h-28 break-inside-avoid rounded-2xl bg-[repeating-linear-gradient(45deg,#e7e5e4_0_6px,#d6d3d1_6px_12px)] dark:bg-[repeating-linear-gradient(45deg,#292524_0_6px,#1c1917_6px_12px)]" />
    </div>
  );
}
