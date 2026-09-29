'use client';

import { Code2, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CodeEditorPane } from './CodeEditorPane';
import { ComponentPreview } from './ComponentPreview';
import { EmulatedComponentPreview, EmulatedComponentPreviewHandle } from './EmulatedComponentPreview';
import { PlaygroundToolbar } from './PlaygroundToolbar';
import { VisualEditorPanel } from './VisualEditorPanel';
import { formatHtml } from '@/utils/formatHtml';
import { previewDevices, validatePreviewDevices } from '@/utils/previewDevices';

validatePreviewDevices();

const sizes = {
  mobile: { label: 'Mobile', ...previewDevices.mobile, icon: Smartphone },
  tablet: { label: 'Tablette', ...previewDevices.tablet, icon: Tablet },
  desktop: { label: 'Desktop', ...previewDevices.desktop, icon: Monitor },
} as const;

const sizeOptions = (Object.entries(sizes) as Array<[keyof typeof sizes, typeof sizes[keyof typeof sizes]]>).map(([key, item]) => ({
  key,
  label: item.label,
  icon: item.icon,
}));

const backgrounds = {
  warm: 'bg-[#f1eee5] dark:bg-black/20',
  clean: 'bg-white dark:bg-zinc-950',
  dark: 'bg-[#151512]',
} as const;

const themes = {
  auto: 'Auto',
  light: 'Clair',
  dark: 'Sombre',
} as const;

export function InteractivePlayground({ slug, name }: { slug: string; name?: string }) {
  const [size, setSize] = useState<keyof typeof sizes>('desktop');
  const [zoom, setZoom] = useState(90);
  const [padding, setPadding] = useState(32);
  const [background, setBackground] = useState<keyof typeof backgrounds>('warm');
  const [theme, setTheme] = useState<keyof typeof themes>('auto');
  const [showBounds, setShowBounds] = useState(false);
  const [mode, setMode] = useState<'original' | 'code' | 'visual'>('original');
  const [liveCode, setLiveCode] = useState('');
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<EmulatedComponentPreviewHandle>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const viewport = sizes[size];
  const captureSourceHtml = () => formatHtml(captureRef.current?.innerHTML ?? '');
  const syncCodeFromPreview = () => setLiveCode(formatHtml(previewRef.current?.getHtml() ?? liveCode));

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      setStageSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setLiveCode(captureSourceHtml());
  }, [slug]);

  // On a phone, start with the phone frame instead of a heavily shrunk desktop.
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) setSize('mobile');
  }, []);

  const requestedScale = zoom / 100;
  const availableScale = stageSize.width && stageSize.height
    ? Math.min(stageSize.width / viewport.frameWidth, stageSize.height / viewport.frameHeight)
    : 1;
  const renderedScale = Math.min(requestedScale, availableScale);
  const reset = () => {
    setSize('desktop');
    setZoom(90);
    setPadding(32);
    setBackground('warm');
    setTheme('auto');
    setShowBounds(false);
    setMode('original');
    setSelectedElement(null);
    setLiveCode(captureSourceHtml());
  };

  const handleModeChange = (next: 'original' | 'code' | 'visual') => {
    setMode(next);
    setSelectedElement(null);
  };

  const handleBackgroundChange = (next: keyof typeof backgrounds) => {
    setBackground(next);
    if (next === 'dark') setTheme('dark');
    if (next !== 'dark' && theme === 'dark') setTheme('auto');
  };

  return (
    <section className="w-full min-w-0 max-w-full">
      <div ref={captureRef} aria-hidden className="hidden">
        <ComponentPreview slug={slug}/>
      </div>

      <PlaygroundToolbar
        mode={mode}
        onModeChange={handleModeChange}
        sizeOptions={sizeOptions}
        size={size}
        onSizeChange={(key) => setSize(key as keyof typeof sizes)}
        zoom={zoom}
        onZoomChange={setZoom}
        padding={padding}
        onPaddingChange={setPadding}
        background={background}
        onBackgroundChange={handleBackgroundChange}
        theme={theme}
        onThemeChange={setTheme}
        showBounds={showBounds}
        onToggleBounds={() => setShowBounds((value) => !value)}
        onReset={reset}
        status={`${viewport.label} · ${viewport.width}×${viewport.height} · ${Math.round(renderedScale * 100)}%`}
      />

      {/* The workspace fills the rest of the screen; editing splits it evenly with the editor panel. */}
      <div className={`mt-3 grid min-w-0 max-w-full gap-3 ${mode !== 'original' ? 'lg:grid-cols-2' : ''}`}>
        <div className={`relative flex h-[min(72vh,760px)] min-h-[420px] min-w-0 max-w-full overflow-hidden rounded-[1.75rem] border border-[var(--line)] p-3 lg:h-[calc(100dvh-15rem)] ${backgrounds[background]}`}>
          <div ref={stageRef} className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden">
            <EmulatedComponentPreview
              key={`${slug}-${mode}`}
              ref={previewRef}
              slug={slug}
              device={size}
              width={viewport.width}
              height={viewport.height}
              padding={padding}
              scale={renderedScale}
              theme={theme}
              showBounds={showBounds}
              editableHtml={mode !== 'original' ? liveCode : undefined}
              interactive={mode === 'visual'}
              onSelectElement={setSelectedElement}
            />
          </div>
        </div>

        {mode === 'code' && (
          <div data-lenis-prevent className="flex h-[min(72vh,760px)] min-h-[420px] min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111113] text-zinc-200 lg:h-[calc(100dvh-15rem)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold"><Code2 size={16}/>Code live HTML</div>
              <button onClick={() => setLiveCode(captureSourceHtml())} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10">Reset code</button>
            </div>
            <CodeEditorPane value={liveCode} onChange={setLiveCode}/>
            <p className="border-t border-white/10 px-4 py-3 text-xs text-zinc-500">HTML/Tailwind du composant reel, pret a copier ou modifier. La preview applique tes changements en direct.</p>
          </div>
        )}

        {mode === 'visual' && (
          <VisualEditorPanel element={selectedElement} onChange={syncCodeFromPreview}/>
        )}
      </div>
    </section>
  );
}
