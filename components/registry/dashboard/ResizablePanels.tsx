/**
 * @registry
 * name: Resizable Panels
 * category: Dashboard
 * style: Minimal
 * tags: featured, recent
 * description: Disposition à panneaux redimensionnables façon shadcn : barre latérale, éditeur et console séparés par des poignées.
 * prompt: Create shadcn-style resizable panels: a horizontal group (sidebar | main) where the main panel is itself split vertically (editor / console). Handles are role="separator" with aria-orientation, aria-valuenow/min/max, a grip, pointer dragging (setPointerCapture) and ArrowLeft/Right or ArrowUp/Down keyboard resizing by 5%, clamped to min sizes; double-click resets. Each panel shows its size live. Light and dark mode.
 */
'use client';
import { GripVertical } from 'lucide-react';
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function Handle({ vertical, value, min, max, onChange, onReset, label }: { vertical?: boolean; value: number; min: number; max: number; onChange: (value: number) => void; onReset: () => void; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function drag(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const box = ref.current!.parentElement!.getBoundingClientRect();
    const ratio = vertical ? (event.clientY - box.top) / box.height : (event.clientX - box.left) / box.width;
    onChange(clamp(Math.round(ratio * 100), min, max));
  }

  function key(event: KeyboardEvent) {
    const back = vertical ? 'ArrowUp' : 'ArrowLeft';
    const forward = vertical ? 'ArrowDown' : 'ArrowRight';
    if (event.key === back || event.key === forward) { event.preventDefault(); onChange(clamp(value + (event.key === forward ? 5 : -5), min, max)); }
  }

  return (
    <div
      ref={ref}
      role="separator"
      tabIndex={0}
      aria-label={label}
      aria-orientation={vertical ? 'horizontal' : 'vertical'}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
      onPointerMove={drag}
      onKeyDown={key}
      onDoubleClick={onReset}
      className={`group relative z-10 flex shrink-0 touch-none items-center justify-center bg-zinc-200 outline-none transition-colors hover:bg-teal-400 focus-visible:bg-teal-500 dark:bg-zinc-800 dark:hover:bg-teal-400 ${vertical ? 'h-px cursor-row-resize' : 'w-px cursor-col-resize'}`}
    >
      <span className={`absolute ${vertical ? '-inset-y-2 inset-x-0' : '-inset-x-2 inset-y-0'}`} />
      <span className={`relative grid place-items-center rounded-sm border border-zinc-200 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 ${vertical ? 'h-3 w-4 rotate-90' : 'h-4 w-3'}`}><GripVertical aria-hidden className="size-2.5" /></span>
    </div>
  );
}

export function ResizablePanels() {
  const [left, setLeft] = useState(30);
  const [top, setTop] = useState(65);
  const panel = 'flex flex-col items-center justify-center gap-1 overflow-hidden p-4 text-center';

  return (
    <div className="flex h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className={`${panel} bg-zinc-50 dark:bg-zinc-900/50`} style={{ width: `${left}%` }}>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sidebar</span>
        <span className="font-mono text-xs text-zinc-500">{left}%</span>
      </div>
      <Handle value={left} min={15} max={60} onChange={setLeft} onReset={() => setLeft(30)} label="Resize sidebar" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className={panel} style={{ height: `${top}%` }}>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Editor</span>
          <span className="font-mono text-xs text-zinc-500">{top}%</span>
        </div>
        <Handle vertical value={top} min={25} max={85} onChange={setTop} onReset={() => setTop(65)} label="Resize console" />
        <div className={`${panel} flex-1 bg-zinc-950 dark:bg-black`}>
          <span className="text-sm font-semibold text-zinc-100">Console</span>
          <span className="font-mono text-xs text-emerald-400">$ ready in 182ms</span>
        </div>
      </div>
    </div>
  );
}
