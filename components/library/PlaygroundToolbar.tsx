'use client';

import { Code2, Eye, EyeOff, LucideIcon, Monitor, Moon, MousePointerClick, Palette, RotateCcw, SlidersHorizontal, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const themeIcons: Record<'auto' | 'light' | 'dark', LucideIcon> = {
  auto: Monitor,
  light: Sun,
  dark: Moon,
};

const backgroundSwatches: Record<'warm' | 'clean' | 'dark', { label: string; swatch: string }> = {
  warm: { label: 'Chaud', swatch: 'bg-[#f1eee5]' },
  clean: { label: 'Neutre', swatch: 'border border-zinc-300 bg-white' },
  dark: { label: 'Sombre', swatch: 'bg-[#151512]' },
};

function iconButtonClass(active: boolean) {
  return `flex size-8 shrink-0 items-center justify-center rounded-lg border transition ${
    active
      ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
      : 'border-transparent text-[var(--muted)] hover:border-[var(--line)] hover:text-[var(--foreground)]'
  }`;
}

export function PlaygroundToolbar({
  mode,
  onModeChange,
  sizeOptions,
  size,
  onSizeChange,
  zoom,
  onZoomChange,
  padding,
  onPaddingChange,
  background,
  onBackgroundChange,
  theme,
  onThemeChange,
  showBounds,
  onToggleBounds,
  onReset,
}: {
  mode: 'original' | 'code' | 'visual';
  onModeChange: (mode: 'original' | 'code' | 'visual') => void;
  sizeOptions: Array<{ key: string; label: string; icon: LucideIcon }>;
  size: string;
  onSizeChange: (size: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  padding: number;
  onPaddingChange: (padding: number) => void;
  background: 'warm' | 'clean' | 'dark';
  onBackgroundChange: (background: 'warm' | 'clean' | 'dark') => void;
  theme: 'auto' | 'light' | 'dark';
  onThemeChange: (theme: 'auto' | 'light' | 'dark') => void;
  showBounds: boolean;
  onToggleBounds: () => void;
  onReset: () => void;
}) {
  const [openPanel, setOpenPanel] = useState<'adjust' | 'background' | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openPanel) return;
    const handleClick = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) setOpenPanel(null);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openPanel]);

  return (
    <div
      ref={toolbarRef}
      className="absolute bottom-4 left-1/2 z-10 flex w-fit max-w-[calc(100%-1rem)] -translate-x-1/2 flex-nowrap items-center gap-0.5 overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-1 shadow-lg backdrop-blur [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <button title="Original" aria-label="Original" onClick={() => onModeChange('original')} className={iconButtonClass(mode === 'original')}><Eye size={15}/></button>
      <button title="Edition visuelle" aria-label="Edition visuelle" onClick={() => onModeChange('visual')} className={iconButtonClass(mode === 'visual')}><MousePointerClick size={15}/></button>
      <button title="Code live" aria-label="Code live" onClick={() => onModeChange('code')} className={iconButtonClass(mode === 'code')}><Code2 size={15}/></button>

      <span className="mx-0.5 h-6 w-px shrink-0 bg-[var(--line)]"/>

      {sizeOptions.map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.key} title={item.label} aria-label={item.label} onClick={() => onSizeChange(item.key)} className={iconButtonClass(size === item.key)}>
            <Icon size={15}/>
          </button>
        );
      })}

      <span className="mx-0.5 h-6 w-px shrink-0 bg-[var(--line)]"/>

      <div className="relative">
        <button
          title="Zoom et marge"
          aria-label="Zoom et marge"
          onClick={() => setOpenPanel((current) => (current === 'adjust' ? null : 'adjust'))}
          className={iconButtonClass(openPanel === 'adjust')}
        >
          <SlidersHorizontal size={15}/>
        </button>
        {openPanel === 'adjust' && (
          <div className="absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-xl">
            <label className="block">
              <span className="text-xs font-semibold uppercase text-[var(--muted)]">Zoom: {zoom}%</span>
              <input type="range" min="70" max="115" value={zoom} onChange={(event) => onZoomChange(Number(event.target.value))} className="mt-2 w-full accent-teal-700"/>
            </label>
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase text-[var(--muted)]">Marge: {padding}px</span>
              <input type="range" min="12" max="56" value={padding} onChange={(event) => onPaddingChange(Number(event.target.value))} className="mt-2 w-full accent-teal-700"/>
            </label>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          title="Fond"
          aria-label="Fond"
          onClick={() => setOpenPanel((current) => (current === 'background' ? null : 'background'))}
          className={iconButtonClass(openPanel === 'background')}
        >
          <Palette size={15}/>
        </button>
        {openPanel === 'background' && (
          <div className="absolute bottom-full left-1/2 mb-2 flex w-44 -translate-x-1/2 gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl">
            {(Object.entries(backgroundSwatches) as Array<[keyof typeof backgroundSwatches, typeof backgroundSwatches[keyof typeof backgroundSwatches]]>).map(([key, item]) => (
              <button
                key={key}
                title={item.label}
                aria-label={item.label}
                onClick={() => { onBackgroundChange(key); setOpenPanel(null); }}
                className={`flex-1 rounded-xl border p-1.5 transition ${background === key ? 'border-[var(--accent)]' : 'border-[var(--line)]'}`}
              >
                <span className={`block h-8 w-full rounded-lg ${item.swatch}`}/>
              </button>
            ))}
          </div>
        )}
      </div>

      <span className="mx-0.5 h-6 w-px shrink-0 bg-[var(--line)]"/>

      {(Object.entries(themeIcons) as Array<[keyof typeof themeIcons, LucideIcon]>).map(([key, Icon]) => (
        <button key={key} title={`Theme ${key}`} aria-label={`Theme ${key}`} onClick={() => onThemeChange(key)} className={iconButtonClass(theme === key)}>
          <Icon size={15}/>
        </button>
      ))}

      <span className="mx-0.5 h-6 w-px shrink-0 bg-[var(--line)]"/>

      <button title="Voir les contours" aria-label="Voir les contours" onClick={onToggleBounds} className={iconButtonClass(showBounds)}>
        {showBounds ? <EyeOff size={15}/> : <Eye size={15}/>}
      </button>
      <button title="Reinitialiser" aria-label="Reinitialiser" onClick={onReset} className={iconButtonClass(false)}>
        <RotateCcw size={15}/>
      </button>
    </div>
  );
}
