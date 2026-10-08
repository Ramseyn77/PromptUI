/**
 * @registry
 * name: Number Ticker
 * category: Text
 * style: Minimal
 * tags: featured, recent
 * description: Chiffres qui comptent jusqu'à leur valeur quand ils entrent à l'écran, avec easing.
 * prompt: Create animated stat counters that count up from 0 to their value with an ease-out curve (requestAnimationFrame) when they scroll into view (IntersectionObserver, once), formatted with Intl.NumberFormat and a suffix; the final value is rendered for SSR/reduced motion. 3 stats in a row. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

function Counter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShown(0);
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1600);
        setShown(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return (
    <div>
      <p ref={ref} className="text-4xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white">{new Intl.NumberFormat('en-US').format(shown)}{suffix}</p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}

export function NumberTicker() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-6 text-center sm:grid-cols-3">
      <Counter value={12480} suffix="+" label="Developers" />
      <Counter value={320} label="Components" />
      <Counter value={98} suffix="%" label="Satisfaction" />
    </div>
  );
}
