/**
 * @registry
 * name: Signature Pad
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Zone de signature tactile avec effacement et confirmation.
 * prompt: Create a responsive signature pad using canvas with mouse and touch/pointer drawing, clear and confirm actions, a subtle baseline, dark mode and accessible labels.
 */
'use client';

import { Check, Eraser } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

export function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const image = canvas.width ? canvas.toDataURL() : '';
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.scale(ratio, ratio);
      context.lineCap = 'round'; context.lineJoin = 'round'; context.lineWidth = 2.4; context.strokeStyle = '#8b5cf6';
      if (image && hasInk) { const saved = new Image(); saved.onload = () => context.drawImage(saved, 0, 0, canvas.clientWidth, canvas.clientHeight); saved.src = image; }
    };
    resize(); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize);
  }, [hasInk]);

  const point = (event: PointerEvent<HTMLCanvasElement>) => { const box = event.currentTarget.getBoundingClientRect(); return [event.clientX - box.left, event.clientY - box.top] as const; };
  const start = (event: PointerEvent<HTMLCanvasElement>) => { event.currentTarget.setPointerCapture(event.pointerId); drawing.current = true; setConfirmed(false); const context = event.currentTarget.getContext('2d'); const [x, y] = point(event); context?.beginPath(); context?.moveTo(x, y); };
  const move = (event: PointerEvent<HTMLCanvasElement>) => { if (!drawing.current) return; const context = event.currentTarget.getContext('2d'); const [x, y] = point(event); context?.lineTo(x, y); context?.stroke(); setHasInk(true); };
  const clear = () => { const canvas = canvasRef.current; canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height); setHasInk(false); setConfirmed(false); };

  return (
    <section className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl shadow-violet-500/10 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
      <div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold text-zinc-950 dark:text-white">Your signature</h2><p className="mt-1 text-sm text-zinc-500">Draw inside the area below.</p></div>{confirmed && <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"><Check size={13} />Saved</span>}</div>
      <div className="relative mt-5 overflow-hidden rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"><canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={() => { drawing.current = false; }} onPointerCancel={() => { drawing.current = false; }} aria-label="Signature drawing area" className="block h-48 w-full touch-none cursor-crosshair" /><div className="pointer-events-none absolute bottom-10 left-7 right-7 border-b border-zinc-300 dark:border-zinc-700" /><span className="pointer-events-none absolute bottom-4 left-7 text-[10px] uppercase tracking-[.2em] text-zinc-400">Sign above</span></div>
      <div className="mt-4 flex gap-2"><button type="button" onClick={clear} disabled={!hasInk} className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 disabled:opacity-35 dark:border-zinc-800 dark:text-zinc-300"><Eraser size={16} />Clear</button><button type="button" onClick={() => setConfirmed(true)} disabled={!hasInk} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-35"><Check size={16} />Confirm signature</button></div>
    </section>
  );
}
