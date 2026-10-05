'use client';

import { Code2, Eye, EyeOff, LucideIcon, Monitor, Moon, MousePointerClick, Palette, RotateCcw, SlidersHorizontal, Sun } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

type Mode = 'original' | 'code' | 'visual';
type Background = 'warm' | 'clean' | 'dark';
type Theme = 'auto' | 'light' | 'dark';

// Labels come from the dictionary (playground.modes / themes / backgrounds).
const modes: Array<{ key: Mode; icon: LucideIcon }> = [
  { key: 'original', icon: Eye },
  { key: 'visual', icon: MousePointerClick },
  { key: 'code', icon: Code2 },
];

const themeOptions: Array<{ key: Theme; icon: LucideIcon }> = [
  { key: 'auto', icon: Monitor },
  { key: 'light', icon: Sun },
  { key: 'dark', icon: Moon },
];

const backgroundSwatches: Record<Background, { swatch: string }> = {
  warm: { swatch: 'bg-[#f1eee5]' },
  clean: { swatch: 'border border-zinc-300 bg-white' },
  dark: { swatch: 'bg-[#151512]' },
};

/** Segmented control: one rounded track, the active item gets a raised surface. */
function Segment({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex shrink-0 items-center gap-0.5 rounded-xl bg-[var(--hover)] p-0.5">
      {children}
    </div>
  );
}

function segmentButton(active: boolean, withLabel = false) {
  return `flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-[10px] font-ui text-xs font-semibold transition ${withLabel ? 'px-3' : 'w-8'} ${
    active ? 'bg-[var(--surface)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
  }`;
}

function toolButton(active: boolean) {
  return `grid size-9 shrink-0 place-items-center rounded-xl transition ${
    active ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
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
  status,
}: {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  sizeOptions: Array<{ key: string; label: string; icon: LucideIcon }>;
  size: string;
  onSizeChange: (size: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  padding: number;
  onPaddingChange: (padding: number) => void;
  background: Background;
  onBackgroundChange: (background: Background) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  showBounds: boolean;
  onToggleBounds: () => void;
  onReset: () => void;
  status?: string;
}) {
  const [openPanel, setOpenPanel] = useState<'adjust' | 'background' | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();
  const tp = t.playground;

  useEffect(() => {
    if (!openPanel) return;
    const close = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) setOpenPanel(null);
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpenPanel(null); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [openPanel]);

  const togglePanel = (panel: 'adjust' | 'background') => setOpenPanel((current) => (current === panel ? null : panel));

  return (
    <div
      ref={toolbarRef}
      role="toolbar"
      aria-label={tp.toolbar}
      className="relative z-40 flex min-w-0 flex-wrap items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-sm"
    >
      <Segment label={tp.mode}>
        {modes.map(({ key, icon: Icon }) => (
          <button key={key} type="button" aria-pressed={mode === key} onClick={() => onModeChange(key)} className={segmentButton(mode === key, true)}>
            <Icon size={15}/><span className="hidden sm:inline">{tp.modes[key]}</span>
          </button>
        ))}
      </Segment>

      <Segment label={tp.device}>
        {sizeOptions.map(({ key, label, icon: Icon }) => (
          <button key={key} type="button" title={label} aria-label={label} aria-pressed={size === key} onClick={() => onSizeChange(key)} className={segmentButton(size === key)}>
            <Icon size={15}/>
          </button>
        ))}
      </Segment>

      <Segment label={tp.componentTheme}>
        {themeOptions.map(({ key, icon: Icon }) => (
          <button key={key} type="button" title={tp.themes[key]} aria-label={tp.themes[key]} aria-pressed={theme === key} onClick={() => onThemeChange(key)} className={segmentButton(theme === key)}>
            <Icon size={15}/>
          </button>
        ))}
      </Segment>

      <div className="flex items-center gap-0.5">
        <div className="relative">
          <button type="button" title={tp.zoomAndMargin} aria-label={tp.zoomAndMargin} aria-expanded={openPanel === 'adjust'} onClick={() => togglePanel('adjust')} className={toolButton(openPanel === 'adjust')}>
            <SlidersHorizontal size={16}/>
          </button>
          {openPanel === 'adjust' && (
            <div className="absolute left-0 top-full z-50 mt-2 w-60 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-xl">
              <label className="block">
                <span className="flex justify-between font-mono text-[11px] uppercase text-[var(--muted)]"><span>{tp.zoom}</span><span>{zoom}%</span></span>
                <input type="range" min="70" max="115" value={zoom} onChange={(event) => onZoomChange(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]"/>
              </label>
              <label className="mt-4 block">
                <span className="flex justify-between font-mono text-[11px] uppercase text-[var(--muted)]"><span>{tp.margin}</span><span>{padding}px</span></span>
                <input type="range" min="12" max="56" value={padding} onChange={(event) => onPaddingChange(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]"/>
              </label>
            </div>
          )}
        </div>

        <div className="relative">
          <button type="button" title={tp.background} aria-label={tp.background} aria-expanded={openPanel === 'background'} onClick={() => togglePanel('background')} className={toolButton(openPanel === 'background')}>
            <Palette size={16}/>
          </button>
          {openPanel === 'background' && (
            <div className="absolute left-0 top-full z-50 mt-2 flex w-48 gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl">
              {(Object.entries(backgroundSwatches) as Array<[Background, { swatch: string }]>).map(([key, item]) => (
                <button type="button" key={key} title={tp.backgrounds[key]} aria-label={tp.backgrounds[key]} aria-pressed={background === key} onClick={() => { onBackgroundChange(key); setOpenPanel(null); }} className={`flex-1 rounded-xl border p-1.5 transition ${background === key ? 'border-[var(--accent)]' : 'border-[var(--line)]'}`}>
                  <span className={`block h-8 w-full rounded-lg ${item.swatch}`}/>
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="button" title={tp.showBounds} aria-label={tp.showBounds} aria-pressed={showBounds} onClick={onToggleBounds} className={toolButton(showBounds)}>
          {showBounds ? <EyeOff size={16}/> : <Eye size={16}/>}
        </button>
        <button type="button" title={tp.reset} aria-label={tp.reset} onClick={onReset} className={toolButton(false)}>
          <RotateCcw size={16}/>
        </button>
      </div>

      {status && <span className="ml-auto hidden pr-2 font-mono text-[11px] text-[var(--muted)] md:inline">{status}</span>}
    </div>
  );
}
