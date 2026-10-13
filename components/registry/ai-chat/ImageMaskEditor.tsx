/**
 * @registry
 * name: Image Mask Editor
 * category: AI Chat
 * style: Dark
 * tags: recent
 * description: Éditeur d'image IA par masque : peindre la zone à modifier au pinceau (taille réglable), décrire le changement et générer des variantes.
 * prompt: Create a dark AI inpainting editor: an image area (gradient landscape placeholder) with a canvas overlay where the user paints a translucent magenta mask with the pointer; a brush size slider, Undo stroke and Clear mask buttons; a prompt input "Replace with…" and a Generate button disabled until there is a mask and a prompt; generating shows a shimmer then three variant thumbnails to pick from (aria-pressed); DPR-aware canvas; keyboard users get a "Mask center area" button as an alternative to painting. Dark in both themes.
 */
'use client';
import { Brush, Eraser, Sparkles, Undo2 } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

export function ImageMaskEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState(24);
  const [strokes, setStrokes] = useState<{ points: [number, number][]; size: number }[]>([]);
  const [prompt, setPrompt] = useState('a hot air balloon');
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [variant, setVariant] = useState(0);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    const context = canvas.getContext('2d')!;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.strokeStyle = 'rgba(217, 70, 239, 0.55)';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    for (const stroke of strokes) {
      context.lineWidth = stroke.size;
      context.beginPath();
      stroke.points.forEach(([x, y], index) => (index ? context.lineTo(x * canvas.clientWidth, y * canvas.clientHeight) : context.moveTo(x * canvas.clientWidth, y * canvas.clientHeight)));
      if (stroke.points.length === 1) context.lineTo(stroke.points[0][0] * canvas.clientWidth + 0.1, stroke.points[0][1] * canvas.clientHeight);
      context.stroke();
    }
  }, [strokes]);

  const point = (event: PointerEvent<HTMLCanvasElement>): [number, number] => { const rect = event.currentTarget.getBoundingClientRect(); return [(event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height]; };

  function generate() {
    setState('busy');
    window.setTimeout(() => setState('done'), 1300);
  }

  return (
    <div className="w-full max-w-lg rounded-3xl bg-zinc-950 p-4 text-zinc-300 ring-1 ring-white/10">
      <style>{`@keyframes pui-mask-shimmer { to { background-position: -200% 0 } }`}</style>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#38bdf8_0%,#a5f3fc_55%,#4ade80_56%,#15803d_100%)]">
        {state === 'done' && <span aria-hidden className="absolute left-[44%] top-[22%] text-5xl">{['🎈', '🪁', '🛸'][variant]}</span>}
        <canvas ref={canvasRef} role="img" aria-label={strokes.length ? `${strokes.length} mask strokes painted` : 'Paint the area to change'} className={`absolute inset-0 size-full touch-none ${state === 'done' ? 'opacity-0' : 'cursor-crosshair'}`} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); drawing.current = true; setState('idle'); setStrokes((list) => [...list, { points: [point(event)], size }]); }} onPointerMove={(event) => { if (!drawing.current) return; const next = point(event); setStrokes((list) => list.map((stroke, index) => (index === list.length - 1 ? { ...stroke, points: [...stroke.points, next] } : stroke))); }} onPointerUp={() => { drawing.current = false; }} />
        {state === 'busy' && <span aria-hidden className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] bg-[length:200%_100%] motion-safe:animate-[pui-mask-shimmer_1s_linear_infinite]" />}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <label className="flex items-center gap-2"><Brush aria-hidden className="size-4" /><span className="sr-only">Brush size</span><input type="range" min={8} max={60} value={size} onChange={(event) => setSize(Number(event.target.value))} className="w-24 accent-fuchsia-400" /><span className="tabular-nums">{size}px</span></label>
        <button type="button" disabled={!strokes.length} onClick={() => setStrokes(strokes.slice(0, -1))} className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1 ring-1 ring-white/10 hover:bg-white/5 disabled:opacity-30"><Undo2 aria-hidden className="size-3.5" />Undo</button>
        <button type="button" disabled={!strokes.length} onClick={() => { setStrokes([]); setState('idle'); }} className="flex items-center gap-1 rounded-lg px-2 py-1 ring-1 ring-white/10 hover:bg-white/5 disabled:opacity-30"><Eraser aria-hidden className="size-3.5" />Clear</button>
        <button type="button" onClick={() => setStrokes([...strokes, { points: [[0.45, 0.3], [0.55, 0.3], [0.55, 0.42], [0.45, 0.42]], size: 40 }])} className="rounded-lg px-2 py-1 ring-1 ring-white/10 hover:bg-white/5">Mask center</button>
      </div>
      <div className="mt-3 flex gap-2"><input aria-label="Replace masked area with" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Replace with…" className="min-w-0 flex-1 rounded-xl bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-fuchsia-400" /><button type="button" disabled={!strokes.length || !prompt.trim() || state === 'busy'} onClick={generate} className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-4 text-sm font-semibold text-white disabled:opacity-40"><Sparkles aria-hidden className="size-4" />Generate</button></div>
      <div aria-live="polite">{state === 'done' && <div role="group" aria-label="Variants" className="mt-3 grid grid-cols-3 gap-2">{['🎈', '🪁', '🛸'].map((emoji, index) => <button key={emoji} type="button" aria-pressed={variant === index} aria-label={`Variant ${index + 1}`} onClick={() => setVariant(index)} className={`grid aspect-video place-items-center rounded-xl bg-[linear-gradient(180deg,#38bdf8,#4ade80)] text-2xl ${variant === index ? 'ring-2 ring-fuchsia-400' : 'opacity-70 hover:opacity-100'}`}>{emoji}</button>)}</div>}</div>
    </div>
  );
}
