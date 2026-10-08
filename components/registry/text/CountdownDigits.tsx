/**
 * @registry
 * name: Countdown Digits
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Compte à rebours façon daisyUI countdown : chaque chiffre glisse verticalement vers la valeur suivante.
 * prompt: Create a daisyUI-style countdown: days, hours, minutes, seconds blocks where each number is a vertical strip of 0–59 values translated with a transition so digits roll to the next value every second; computed after mount from a fixed target date (hydration safe), labels under each block, aria-live off with a visually hidden full sentence updated every minute. Reduced motion: no roll. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const target = new Date('2026-12-31T23:00:00Z').getTime();

function Roll({ value, max }: { value: number; max: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden leading-none tabular-nums">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none" style={{ transform: `translateY(-${value}em)` }}>
        {Array.from({ length: max }, (_, index) => <span key={index} className="h-[1em]">{String(index).padStart(2, '0')}</span>)}
      </span>
    </span>
  );
}

export function CountdownDigits() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = left === null ? [0, 0, 0, 0] : [Math.min(99, Math.floor(left / 86400000)), Math.floor(left / 3600000) % 24, Math.floor(left / 60000) % 60, Math.floor(left / 1000) % 60];
  const labels = ['days', 'hours', 'min', 'sec'];
  const max = [100, 24, 60, 60];

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">New year in</p>
      <div className="mt-3 flex gap-2">
        {parts.map((value, index) => (
          <div key={labels[index]} className="flex w-20 flex-col items-center rounded-2xl bg-zinc-950 py-4 text-white dark:bg-white dark:text-zinc-950">
            <span aria-hidden className="font-mono text-4xl font-bold"><Roll value={value} max={max[index]} /></span>
            <span className="mt-1 text-[11px] uppercase tracking-wider opacity-60">{labels[index]}</span>
          </div>
        ))}
      </div>
      <p className="sr-only">{left === null ? '' : `${parts[0]} days, ${parts[1]} hours and ${parts[2]} minutes left`}</p>
    </div>
  );
}
