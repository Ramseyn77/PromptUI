/**
 * @registry
 * name: Typed Signature Field
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Zone de signature sur canvas au doigt ou à la souris, avec effacer, signature tapée en alternative et validation.
 * prompt: Create a signature pad field: a canvas (DPR-aware, touch-none) where pointer drags draw smooth strokes in ink color matching the theme, a dashed baseline with "Sign here", Clear and Undo buttons, an accessible alternative "Type your name instead" that renders the name in a script font, and an "I agree" submit that is disabled until signed. Light and dark mode.
 */
'use client';
import { Eraser, Undo2 } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

export function TypedSignatureField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<{ x: number; y: number }[][]>([]);
  const drawing = useRef(false);
  const [count, setCount] = useState(0);
  const [typed, setTyped] = useState('');
  const [mode, setMode] = useState<'draw' | 'type'>('draw');

  const redraw = () => {
    const element = canvas.current;
    if (!element) return;
    const context = element.getContext('2d')!;
    const ratio = window.devicePixelRatio || 1;
    element.width = element.clientWidth * ratio;
    element.height = element.clientHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 2.2;
    context.strokeStyle = element.closest('.dark') ? '#e4e4e7' : '#18181b';
    for (const stroke of strokes.current) {
      context.beginPath();
      stroke.forEach((point, index) => (index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y)));
      context.stroke();
    }
  };

  useEffect(() => {
    if (mode !== 'draw') return;
    redraw();
    const observer = new ResizeObserver(redraw);
    if (canvas.current) observer.observe(canvas.current);
    return () => observer.disconnect();
  }, [mode]);

  const point = (event: PointerEvent<HTMLCanvasElement>) => { const box = event.currentTarget.getBoundingClientRect(); return { x: ((event.clientX - box.left) / box.width) * event.currentTarget.clientWidth, y: ((event.clientY - box.top) / box.height) * event.currentTarget.clientHeight }; };
  const signed = mode === 'draw' ? count > 0 : typed.trim().length > 1;

  return (
    <form onSubmit={(event) => event.preventDefault()} className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Signature</p>
        <button type="button" onClick={() => setMode(mode === 'draw' ? 'type' : 'draw')} className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400">{mode === 'draw' ? 'Type your name instead' : 'Draw instead'}</button>
      </div>
      {mode === 'draw' ? (
        <div className="relative mt-2 h-36 rounded-xl bg-zinc-50 dark:bg-zinc-900">
          <canvas ref={canvas} role="img" aria-label={count ? 'Your signature' : 'Empty signature area'} className="absolute inset-0 size-full touch-none" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); drawing.current = true; strokes.current.push([point(event)]); }} onPointerMove={(event) => { if (!drawing.current) return; strokes.current[strokes.current.length - 1].push(point(event)); redraw(); }} onPointerUp={() => { drawing.current = false; setCount(strokes.current.length); }} />
          <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-8 border-b border-dashed border-zinc-300 dark:border-zinc-700" />
          {!count && <span aria-hidden className="pointer-events-none absolute bottom-3 left-6 text-xs text-zinc-400">✕ Sign here</span>}
        </div>
      ) : (
        <div className="mt-2">
          <input aria-label="Type your full name" value={typed} onChange={(event) => setTyped(event.target.value)} placeholder="Full name" className="w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-zinc-100" />
          <p aria-hidden className="mt-2 h-14 truncate rounded-xl bg-zinc-50 px-4 text-3xl [font-family:cursive] leading-[3.5rem] text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">{typed}</p>
        </div>
      )}
      <div className="mt-3 flex items-center gap-2">
        {mode === 'draw' && <>
          <button type="button" disabled={!count} onClick={() => { strokes.current.pop(); setCount(strokes.current.length); redraw(); }} className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-2.5 py-1.5 text-xs text-zinc-700 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300"><Undo2 aria-hidden className="size-3.5" />Undo</button>
          <button type="button" disabled={!count} onClick={() => { strokes.current = []; setCount(0); redraw(); }} className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-2.5 py-1.5 text-xs text-zinc-700 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300"><Eraser aria-hidden className="size-3.5" />Clear</button>
        </>}
        <button type="submit" disabled={!signed} className="ml-auto rounded-lg bg-zinc-950 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-30 dark:bg-white dark:text-zinc-950">I agree</button>
      </div>
    </form>
  );
}
