/**
 * @registry
 * name: Before After Slider CTA
 * category: CTA
 * style: Minimal
 * tags: featured, recent
 * description: CTA avec comparateur avant/après glissable (souris, tactile et clavier) entre un dashboard brouillon et soigné.
 * prompt: Create a CTA with a before/after comparison slider: two stacked mock dashboards (left "Before" messy spreadsheet-like grey layout, right "After" clean card layout), a draggable vertical divider handle with pointer capture, keyboard support via a range input (arrow keys, aria-valuetext "62% after"), Before/After labels; beside it a headline "From spreadsheet chaos to clarity" and a CTA button; stacks on mobile. Light and dark mode.
 */
'use client';
import { GripVertical } from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';

export function BeforeAfterSliderCta() {
  const [split, setSplit] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);

  function fromPointer(event: PointerEvent) {
    const rect = frameRef.current!.getBoundingClientRect();
    setSplit(Math.round(Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100))));
  }

  return (
    <section className="grid w-full max-w-4xl items-center gap-8 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-[1fr_1.3fr] dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <h3 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">From spreadsheet chaos to clarity</h3>
        <p className="mt-3 text-sm text-zinc-500">Drag the slider to see what your weekly report looks like after a five-minute import.</p>
        <button type="button" className="mt-5 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900">Import my sheet</button>
      </div>
      <div ref={frameRef} className="relative aspect-[4/3] touch-none select-none overflow-hidden rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); fromPointer(event); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) fromPointer(event); }}>
        <div aria-hidden className="absolute inset-0 bg-zinc-100 p-3 dark:bg-zinc-900">
          <div className="grid h-full grid-cols-5 grid-rows-8 gap-px bg-zinc-300 dark:bg-zinc-700">{Array.from({ length: 40 }, (_, index) => <span key={index} className="bg-white px-1 font-mono text-[8px] leading-[1.6] text-zinc-400 dark:bg-zinc-950">{index % 5 === 0 ? `Row ${index / 5 + 1}` : (index * 137) % 999}</span>)}</div>
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white p-4 dark:from-indigo-950 dark:to-zinc-950" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          <div className="grid grid-cols-3 gap-2">{[['Revenue', '$84k'], ['Users', '12.4k'], ['Churn', '1.9%']].map(([label, value]) => <div key={label} className="rounded-xl bg-white p-2 shadow-sm dark:bg-zinc-900"><p className="text-[9px] text-zinc-500">{label}</p><p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{value}</p></div>)}</div>
          <div className="mt-2 flex h-[55%] items-end gap-1.5 rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-900">{[40, 55, 48, 70, 62, 85, 78, 92].map((height, index) => <span key={index} className="flex-1 rounded-t bg-indigo-500" style={{ height: `${height}%` }} />)}</div>
        </div>
        <span aria-hidden className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">Before</span>
        <span aria-hidden className="absolute right-3 top-3 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">After</span>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" style={{ left: `${split}%` }}><span className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-zinc-600 shadow-lg"><GripVertical className="size-4" /></span></div>
        <input type="range" min={0} max={100} value={split} onChange={(event) => setSplit(Number(event.target.value))} aria-label="Compare before and after" aria-valuetext={`${100 - split}% after`} className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500" />
      </div>
    </section>
  );
}
