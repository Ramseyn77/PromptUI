/**
 * @registry
 * name: Swipe To Confirm
 * category: Buttons
 * style: Gradient
 * tags: featured, recent
 * description: Curseur « glisser pour payer » : la poignée se tire jusqu'au bout pour valider, revient sinon, accessible au clavier.
 * prompt: Create a "slide to confirm" control: a pill track with a draggable round handle (pointer capture) and a shimmering "Slide to pay €48" label that fades as you drag; releasing past 90% confirms (handle snaps to the end, track turns emerald, "Paid" with check), otherwise it springs back; keyboard users focus the handle (role="slider" with aria-valuenow) and press Enter or ArrowRight to confirm; Reset link. Light and dark mode.
 */
'use client';
import { Check, ChevronsRight } from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';

export function SwipeToConfirm() {
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);
  const max = () => (track.current ? track.current.clientWidth - 52 : 200);

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (!dragging || done || !track.current) return;
    const box = track.current.getBoundingClientRect();
    setX(Math.min(max(), Math.max(0, event.clientX - box.left - 26)));
  }
  function release() {
    setDragging(false);
    if (x >= max() * 0.9) { setX(max()); setDone(true); } else setX(0);
  }

  const pct = Math.round((x / max()) * 100) || 0;

  return (
    <div className="w-full max-w-xs">
      <style>{`@keyframes pui-swipe-shine{from{background-position:200% 0}to{background-position:-200% 0}}`}</style>
      <div ref={track} className={`relative h-14 overflow-hidden rounded-full p-1 transition-colors duration-300 ${done ? 'bg-emerald-500' : 'bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-800 dark:to-zinc-700'}`}>
        <span aria-hidden className="absolute inset-0 grid place-items-center bg-[linear-gradient(90deg,#a1a1aa_40%,#fff_50%,#a1a1aa_60%)] bg-[length:200%_100%] bg-clip-text text-sm font-semibold text-transparent motion-safe:animate-[pui-swipe-shine_2.5s_linear_infinite]" style={{ opacity: done ? 0 : 1 - pct / 100 }}>Slide to pay €48</span>
        {done && <span aria-live="polite" className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">Paid</span>}
        <button
          type="button"
          role="slider"
          aria-label="Slide to pay 48 euros"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={done ? 100 : pct}
          onPointerDown={(event) => { if (done) return; event.currentTarget.setPointerCapture(event.pointerId); setDragging(true); }}
          onPointerMove={move}
          onPointerUp={release}
          onKeyDown={(event) => { if (!done && (event.key === 'Enter' || event.key === 'ArrowRight')) { event.preventDefault(); setX(max()); setDone(true); } }}
          className={`relative grid size-12 touch-none place-items-center rounded-full bg-white text-zinc-900 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${dragging ? '' : 'transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]'}`}
          style={{ transform: `translateX(${x}px)` }}
        >{done ? <Check aria-hidden className="size-5 text-emerald-600" /> : <ChevronsRight aria-hidden className="size-5" />}</button>
      </div>
      {done && <button type="button" onClick={() => { setDone(false); setX(0); }} className="mt-2 w-full text-center text-xs text-zinc-500 underline">Reset demo</button>}
    </div>
  );
}
