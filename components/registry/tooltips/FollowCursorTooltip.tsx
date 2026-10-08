/**
 * @registry
 * name: Follow Cursor Tooltip
 * category: Tooltips
 * style: Gradient
 * tags: recent
 * description: Étiquette qui suit le curseur au-dessus d'une image ou d'un projet, avec léger retard.
 * prompt: Create a cursor-following label over a project thumbnail: on pointermove inside the card a pill tooltip ("View case study →") follows the pointer with a smoothed lerp (requestAnimationFrame), fades in on enter and out on leave; the card is a link with an accessible name so the tooltip is decorative (aria-hidden). Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

export function FollowCursorTooltip() {
  const [visible, setVisible] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const tip = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (tip.current) tip.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -140%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <a
      href="#"
      aria-label="Lumen redesign, view case study"
      onPointerEnter={(event) => { const rect = event.currentTarget.getBoundingClientRect(); pos.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }; setVisible(true); }}
      onPointerLeave={() => setVisible(false)}
      onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); target.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }; }}
      className="relative block aspect-[4/3] w-80 cursor-none overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_30%_30%,#99f6e4,transparent_45%),linear-gradient(135deg,#8b5cf6,#0f766e)] shadow-xl"
    >
      <span className="absolute bottom-4 left-4 text-lg font-semibold text-white">Lumen redesign</span>
      <span ref={tip} aria-hidden className={`pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-lg transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>View case study →</span>
    </a>
  );
}
