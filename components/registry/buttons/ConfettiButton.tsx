/**
 * @registry
 * name: Confetti Button
 * category: Buttons
 * style: SaaS
 * tags: recent
 * description: Bouton de validation qui déclenche une explosion de confettis sur canvas et passe en état terminé.
 * prompt: Create a confetti button: clicking "Complete order" fires 120 confetti pieces from the button center on a canvas overlay (gravity, drag, wobble, rotating rectangles in brand colors) for ~2.5s, and the button switches to a "Order placed" success state with a check icon (aria-live). The canvas is aria-hidden and sized with devicePixelRatio; no confetti with reduced motion. Light and dark mode.
 */
'use client';
import { Check, ShoppingBag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const colors = ['#14b8a6', '#8b5cf6', '#f43f5e', '#facc15', '#0ea5e9'];

export function ConfettiButton() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const raf = useRef(0);
  const [done, setDone] = useState(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function fire() {
    setDone(true);
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (!canvas || !button || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = canvas.getContext('2d')!;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const box = canvas.getBoundingClientRect();
    const origin = button.getBoundingClientRect();
    const cx = origin.left + origin.width / 2 - box.left;
    const cy = origin.top + origin.height / 2 - box.top;
    const pieces = Array.from({ length: 120 }, () => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
      const speed = 5 + Math.random() * 7;
      return { x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3, w: 5 + Math.random() * 5, color: colors[Math.floor(Math.random() * colors.length)], wobble: Math.random() * 10 };
    });
    const start = performance.now();
    cancelAnimationFrame(raf.current);
    const step = (time: number) => {
      const t = (time - start) / 2500;
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (const piece of pieces) {
        piece.vx *= 0.985; piece.vy = piece.vy * 0.985 + 0.18; piece.wobble += 0.1;
        piece.x += piece.vx + Math.sin(piece.wobble); piece.y += piece.vy; piece.r += piece.vr;
        context.save();
        context.globalAlpha = Math.max(0, 1 - t);
        context.translate(piece.x, piece.y); context.rotate(piece.r);
        context.fillStyle = piece.color;
        context.fillRect(-piece.w / 2, -piece.w / 4, piece.w, piece.w / 2);
        context.restore();
      }
      if (t < 1) raf.current = requestAnimationFrame(step);
      else context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    };
    raf.current = requestAnimationFrame(step);
  }

  return (
    <div className="relative grid h-72 w-full max-w-sm place-items-center">
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="flex flex-col items-center gap-3">
        <button
          ref={buttonRef}
          type="button"
          onClick={fire}
          className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${done ? 'bg-emerald-600 shadow-emerald-600/25 focus-visible:ring-emerald-400' : 'bg-zinc-950 shadow-zinc-950/20 hover:bg-zinc-800 focus-visible:ring-teal-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200'}`}
        >
          {done ? <Check aria-hidden className="size-4" /> : <ShoppingBag aria-hidden className="size-4" />}
          {done ? 'Order placed' : 'Complete order'}
        </button>
        <p aria-live="polite" className="text-xs text-zinc-500 dark:text-zinc-400">{done ? 'Thank you! A receipt is on its way.' : 'Total €84.00 · 3 items'}</p>
        {done && <button type="button" onClick={() => setDone(false)} className="text-xs font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-400">Reset demo</button>}
      </div>
    </div>
  );
}
