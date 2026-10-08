/**
 * @registry
 * name: Focus Blur Text
 * category: Text
 * style: Minimal
 * tags: featured, recent
 * description: Phrase dont un seul mot est net à la fois, la mise au point passant de mot en mot avec un cadre de visée.
 * prompt: Create a "focus" text effect: a sentence where all words are blurred and dimmed except one in sharp focus; the focus moves word to word every 1.4s with a camera-style bracket frame that slides and resizes around the active word (measured with refs); hovering a word focuses it and pauses the cycle; the sentence is readable to screen readers as plain text; no blur and no animation with reduced motion. Light and dark mode.
 */
'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const words = ['Design', 'with', 'intent,', 'ship', 'with', 'focus.'];

export function FocusBlurText() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [frame, setFrame] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % words.length), 1400);
    return () => window.clearInterval(timer);
  }, [paused]);

  useLayoutEffect(() => {
    const measure = () => { const node = refs.current[active]; if (node) setFrame({ x: node.offsetLeft, y: node.offsetTop, w: node.offsetWidth, h: node.offsetHeight }); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <p className="relative mx-auto max-w-xl text-center text-4xl font-bold leading-snug tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100" onMouseLeave={() => setPaused(false)}>
      {words.map((word, index) => (
        <span key={index}>
          <span ref={(node) => { refs.current[index] = node; }} onMouseEnter={() => { setPaused(true); setActive(index); }} className={`inline-block px-1 transition duration-500 motion-reduce:!opacity-100 motion-reduce:!blur-none ${active === index ? 'opacity-100 blur-0' : 'opacity-40 blur-[3px]'}`}>{word}</span>{' '}
        </span>
      ))}
      <span aria-hidden className="pointer-events-none absolute transition-all duration-500 motion-reduce:hidden" style={{ left: frame.x - 6, top: frame.y - 2, width: frame.w + 12, height: frame.h + 4 }}>
        {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((corner) => <span key={corner} className={`absolute size-3 border-rose-500 ${corner}`} />)}
      </span>
    </p>
  );
}
