'use client';

import { Maximize2, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { EmulatedComponentPreview } from './EmulatedComponentPreview';

const sizes = {
  mobile: { label: 'Mobile', width: 360, height: 640, frameWidth: 376, frameHeight: 656, icon: Smartphone },
  tablet: { label: 'Tablette', width: 768, height: 600, frameWidth: 788, frameHeight: 620, icon: Tablet },
  desktop: { label: 'Desktop', width: 760, height: 480, frameWidth: 762, frameHeight: 514, icon: Monitor },
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
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const viewport = sizes[size];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      setStageSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const requestedScale = zoom / 100;
  const availableScale = stageSize.width && stageSize.height
    ? Math.min(stageSize.width / viewport.frameWidth, stageSize.height / viewport.frameHeight)
    : 1;
  const renderedScale = Math.min(requestedScale, availableScale);

  return (
    <section className="grid w-full min-w-0 max-w-full gap-4 xl:grid-cols-[240px_minmax(0,1fr)]">
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

      <div className={`preview-grid grid min-h-[680px] min-w-0 max-w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[1.75rem] border border-[var(--line)] p-4 ${backgrounds[background]}`}>
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/90 px-4 py-3 text-xs font-medium text-[var(--muted)] shadow-sm">
          <span className="truncate">{name ?? slug}</span>
          <span>{viewport.label} / {viewport.width}x{viewport.height} / {Math.round(renderedScale * 100)}%</span>
        </div>

        <div ref={stageRef} className="flex min-h-0 min-w-0 items-center justify-center overflow-hidden">
          <EmulatedComponentPreview
            slug={slug}
            device={size}
            width={viewport.width}
            height={viewport.height}
            padding={padding}
            scale={renderedScale}
          />
        </div>
      </div>
    </section>
  );
}
