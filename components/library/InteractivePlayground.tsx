'use client';

import { Maximize2, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useState } from 'react';
import { ComponentPreview } from './ComponentPreview';

const sizes = {
  mobile: { label: 'Mobile', width: 360, icon: Smartphone },
  tablet: { label: 'Tablette', width: 620, icon: Tablet },
  desktop: { label: 'Desktop', width: 760, icon: Monitor },
} as const;

const backgrounds = {
  warm: 'bg-[#f1eee5] dark:bg-black/20',
  clean: 'bg-white dark:bg-zinc-950',
  dark: 'bg-[#151512]',
} as const;

export function InteractivePlayground({ slug, name }: { slug: string; name?: string }) {
  const [size, setSize] = useState<keyof typeof sizes>('desktop');
  const [zoom, setZoom] = useState(90);
  const [padding, setPadding] = useState(32);
  const [background, setBackground] = useState<keyof typeof backgrounds>('warm');
  const canvasWidth = Math.round(sizes[size].width * (zoom / 100));

  return (
    <section className="grid w-full min-w-0 max-w-full gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="min-w-0 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Maximize2 size={15}/>
          Reglages live
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-[var(--muted)]">Format</p>
            <div className="grid gap-2">
              {(Object.entries(sizes) as Array<[keyof typeof sizes, typeof sizes[keyof typeof sizes]]>).map(([key, item]) => {
                const Icon = item.icon;
                return (
                  <button key={key} onClick={() => setSize(key)} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${size === key ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--foreground)]'}`}>
                    <Icon size={15}/>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase text-[var(--muted)]">Zoom: {zoom}%</span>
            <input type="range" min="70" max="115" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="mt-2 w-full accent-teal-700"/>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase text-[var(--muted)]">Marge: {padding}px</span>
            <input type="range" min="12" max="56" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="mt-2 w-full accent-teal-700"/>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase text-[var(--muted)]">Fond</span>
            <select value={background} onChange={(e) => setBackground(e.target.value as keyof typeof backgrounds)} className="mt-2 h-10 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 text-sm outline-none">
              <option value="warm">Chaud</option>
              <option value="clean">Neutre</option>
              <option value="dark">Sombre</option>
            </select>
          </label>
        </div>
      </aside>

      <div className={`preview-grid w-full min-w-0 max-w-full overflow-hidden rounded-[1.75rem] border border-[var(--line)] ${backgrounds[background]}`} style={{ padding, minHeight: 520 }}>
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)]/90 px-4 py-3 text-xs font-medium text-[var(--muted)] shadow-sm">
          <span>{name ?? slug}</span>
          <span>{sizes[size].label} / {zoom}%</span>
        </div>
        <div className="grid w-full min-w-0 max-w-full place-items-center overflow-hidden">
          <div className="mx-auto w-full max-w-full transition-all duration-300" style={{ maxWidth: canvasWidth }}>
            <ComponentPreview slug={slug}/>
          </div>
        </div>
      </div>
    </section>
  );
}
