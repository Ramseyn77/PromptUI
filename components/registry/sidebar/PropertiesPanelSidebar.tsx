/**
 * @registry
 * name: Properties Panel Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Panneau de propriétés façon outil de design : position, dimensions, rayon, remplissage et ombre, avec aperçu en direct.
 * prompt: Create a design-tool properties sidebar next to a live preview: collapsible sections (Layout, Fill, Effects) with aria-expanded; numeric inputs for X/Y/W/H with labels, a corner radius slider, a fill color swatch input with hex text and opacity, a shadow toggle with blur slider; the preview box on the canvas updates live; on mobile the panel becomes a bottom sheet toggled by a "Properties" button with aria-expanded. Light and dark mode.
 */
'use client';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

function Section({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="border-b border-zinc-100 py-3 dark:border-zinc-800">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-100">{title}<ChevronDown aria-hidden className={`size-3.5 text-zinc-400 transition-transform ${open ? '' : '-rotate-90'}`} /></button>
      {open && <div className="mt-2 space-y-2 px-3">{children}</div>}
    </section>
  );
}

export function PropertiesPanelSidebar() {
  const uid = useId();
  const [box, setBox] = useState({ x: 40, y: 30, w: 140, h: 96, radius: 16, fill: '#6366f1', opacity: 100, shadow: true, blur: 24 });
  const [sheet, setSheet] = useState(false);
  const set = (key: keyof typeof box, value: number | string | boolean) => setBox((current) => ({ ...current, [key]: value }));
  const field = 'w-full rounded-md bg-zinc-100 px-2 py-1 text-xs tabular-nums text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500/40 dark:bg-zinc-800 dark:text-zinc-100';

  return (
    <div className="relative flex h-[26rem] w-full max-w-2xl overflow-hidden rounded-2xl border sm:min-w-[36rem] border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative flex-1 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]">
        <div className="absolute outline outline-1 outline-sky-500 transition-[box-shadow]" style={{ left: box.x, top: box.y, width: box.w, height: box.h, borderRadius: box.radius, background: box.fill, opacity: box.opacity / 100, boxShadow: box.shadow ? `0 12px ${box.blur}px rgba(0,0,0,0.25)` : 'none' }} />
        <button type="button" aria-expanded={sheet} aria-controls={`${uid}-panel`} onClick={() => setSheet(!sheet)} className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg sm:hidden dark:bg-white dark:text-zinc-900"><SlidersHorizontal aria-hidden className="size-3.5" />Properties</button>
      </div>
      <aside id={`${uid}-panel`} aria-label="Properties" className={`${sheet ? 'visible translate-y-0' : 'invisible translate-y-full sm:visible'} absolute inset-x-0 bottom-0 max-h-[70%] overflow-y-auto rounded-t-2xl border-t border-zinc-200 bg-white shadow-2xl transition-transform sm:static sm:max-h-none sm:w-60 sm:translate-y-0 sm:rounded-none sm:border-l sm:border-t-0 sm:shadow-none dark:border-zinc-800 dark:bg-zinc-950`} data-lenis-prevent>
        <p className="px-3 pt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Rectangle</p>
        <Section title="Layout">
          <div className="grid grid-cols-2 gap-2">{(['x', 'y', 'w', 'h'] as const).map((key) => <label key={key} className="flex items-center gap-1.5 text-[11px] uppercase text-zinc-500">{key}<input type="number" value={box[key]} onChange={(event) => set(key, Number(event.target.value))} className={field} /></label>)}</div>
          <label className="block text-[11px] text-zinc-500">Radius {box.radius}px<input type="range" min={0} max={48} value={box.radius} onChange={(event) => set('radius', Number(event.target.value))} className="mt-1 w-full accent-indigo-600" /></label>
        </Section>
        <Section title="Fill">
          <div className="flex items-center gap-2"><input type="color" aria-label="Fill color" value={box.fill} onChange={(event) => set('fill', event.target.value)} className="size-7 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0" /><input aria-label="Fill hex" value={box.fill} onChange={(event) => /^#[0-9a-f]{0,6}$/i.test(event.target.value) && set('fill', event.target.value)} className={`${field} font-mono uppercase`} /><label className="flex w-20 shrink-0 items-center gap-1 text-[11px] text-zinc-500"><span className="sr-only">Opacity</span><input type="number" min={0} max={100} value={box.opacity} onChange={(event) => set('opacity', Math.min(100, Math.max(0, Number(event.target.value))))} className={field} />%</label></div>
        </Section>
        <Section title="Effects">
          <label className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">Drop shadow<input type="checkbox" role="switch" checked={box.shadow} onChange={(event) => set('shadow', event.target.checked)} className="accent-indigo-600" /></label>
          {box.shadow && <label className="block text-[11px] text-zinc-500">Blur {box.blur}px<input type="range" min={0} max={60} value={box.blur} onChange={(event) => set('blur', Number(event.target.value))} className="mt-1 w-full accent-indigo-600" /></label>}
        </Section>
      </aside>
    </div>
  );
}
