/**
 * @registry
 * name: Variable Weight Text
 * category: Text
 * style: Editorial
 * tags: featured, recent
 * description: Titre dont chaque lettre grossit selon la distance au curseur, comme une police variable vivante.
 * prompt: Create a proximity-weight headline: each letter is a span whose font-weight (300→900) and slight scale depend on its horizontal distance to the pointer, computed on pointermove over the heading and eased back to 300 on leave; the heading has the full text as aria-label and letters aria-hidden; inactive for touch and reduced motion. Uses a variable font stack. Light and dark mode.
 */
'use client';
import { useRef, useState, type PointerEvent } from 'react';

const text = 'Make it bolder';

export function VariableWeightText() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [weights, setWeights] = useState<number[]>(() => text.split('').map(() => 300));

  function move(event: PointerEvent<HTMLHeadingElement>) {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setWeights(refs.current.map((node) => {
      if (!node) return 300;
      const box = node.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (box.left + box.width / 2));
      return Math.round(300 + 600 * Math.max(0, 1 - distance / 160));
    }));
  }

  return (
    <h3 aria-label={text} onPointerMove={move} onPointerLeave={() => setWeights(text.split('').map(() => 300))} className="cursor-default select-none text-center font-sans text-5xl tracking-tight text-zinc-950 sm:text-7xl dark:text-zinc-50" style={{ fontFamily: 'Inter, "Segoe UI Variable", system-ui, sans-serif' }}>
      {text.split('').map((letter, index) => (
        <span key={index} ref={(node) => { refs.current[index] = node; }} aria-hidden className="inline-block transition-[font-weight,transform] duration-200" style={{ fontWeight: weights[index], transform: `scale(${1 + (weights[index] - 300) / 6000})` }}>{letter === ' ' ? ' ' : letter}</span>
      ))}
    </h3>
  );
}
