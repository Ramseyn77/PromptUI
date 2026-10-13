/**
 * @registry
 * name: Segmented Date Input
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Saisie de date par segments JJ / MM / AAAA (façon React Aria) : flèches haut/bas pour ajuster, passage auto au segment suivant et validation.
 * prompt: Create a segmented date field like React Aria's DateField: three focusable spinbutton segments (DD, MM, YYYY) inside one input-looking box; typing digits fills a segment and auto-advances; ArrowUp/Down increments with wrapping and month-length clamping (including leap years); Backspace clears; Left/Right move between segments; a format toggle (DD/MM vs MM/DD); the field shows an error for impossible dates and the parsed date in words below (computed without locale APIs). Light and dark mode.
 */
'use client';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

type Part = 'day' | 'month' | 'year';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysIn = (month: number, year: number) => new Date(year || 2024, month, 0).getDate();
const limits: Record<Part, [number, number]> = { day: [1, 31], month: [1, 12], year: [1900, 2100] };

export function SegmentedDateInput() {
  const uid = useId();
  const [value, setValue] = useState<Record<Part, number | null>>({ day: 14, month: 2, year: 2028 });
  const [usFormat, setUsFormat] = useState(false);
  const refs = useRef<Record<Part, HTMLSpanElement | null>>({ day: null, month: null, year: null });
  const order: Part[] = usFormat ? ['month', 'day', 'year'] : ['day', 'month', 'year'];
  const { day, month, year } = value;
  const max = month && year ? daysIn(month, year) : 31;
  const invalid = day !== null && day > max;

  function onKeyDown(part: Part, event: KeyboardEvent) {
    const index = order.indexOf(part);
    const [min, top] = part === 'day' ? [1, max] : limits[part];
    const current = value[part];
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const delta = event.key === 'ArrowUp' ? 1 : -1;
      const next = current === null ? (delta > 0 ? min : top) : current + delta > top ? min : current + delta < min ? top : current + delta;
      setValue({ ...value, [part]: next });
    } else if (event.key === 'ArrowRight' && index < 2) { event.preventDefault(); refs.current[order[index + 1]]?.focus(); }
    else if (event.key === 'ArrowLeft' && index > 0) { event.preventDefault(); refs.current[order[index - 1]]?.focus(); }
    else if (event.key === 'Backspace') { event.preventDefault(); setValue({ ...value, [part]: null }); }
    else if (/^\d$/.test(event.key)) {
      event.preventDefault();
      const digits = part === 'year' ? 4 : 2;
      const typed = Number(`${current !== null && String(current).length < digits ? current : ''}${event.key}`);
      setValue({ ...value, [part]: typed });
      if (String(typed).length >= digits || (part !== 'year' && typed * 10 > limits[part][1])) refs.current[order[index + 1]]?.focus();
    }
  }

  const label = (part: Part) => (part === 'day' ? 'Day' : part === 'month' ? 'Month' : 'Year');
  const display = (part: Part) => (value[part] === null ? (part === 'year' ? 'yyyy' : part === 'day' ? 'dd' : 'mm') : String(value[part]).padStart(part === 'year' ? 4 : 2, '0'));

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between"><span id={`${uid}-label`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Date of travel</span><button type="button" onClick={() => setUsFormat(!usFormat)} className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">{usFormat ? 'MM/DD' : 'DD/MM'} ⇄</button></div>
      <div role="group" aria-labelledby={`${uid}-label`} aria-describedby={`${uid}-hint`} className={`mt-1.5 flex items-center rounded-lg border bg-white px-3 py-2 font-mono text-sm dark:bg-zinc-950 ${invalid ? 'border-rose-500' : 'border-zinc-300 focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/10 dark:border-zinc-700 dark:focus-within:border-zinc-300'}`}>
        {order.map((part, index) => (
          <span key={part} className="flex items-center">
            <span ref={(node) => { refs.current[part] = node; }} role="spinbutton" tabIndex={0} aria-label={label(part)} aria-valuenow={value[part] ?? undefined} aria-valuemin={limits[part][0]} aria-valuemax={part === 'day' ? max : limits[part][1]} aria-valuetext={value[part] === null ? 'Empty' : String(value[part])} aria-invalid={part === 'day' && invalid} onKeyDown={(event) => onKeyDown(part, event)} className={`rounded px-0.5 tabular-nums outline-none focus:bg-indigo-600 focus:text-white ${value[part] === null ? 'text-zinc-400' : 'text-zinc-900 dark:text-zinc-100'}`}>{display(part)}</span>
            {index < 2 && <span aria-hidden className="px-0.5 text-zinc-400">/</span>}
          </span>
        ))}
      </div>
      <p id={`${uid}-hint`} aria-live="polite" className={`mt-1.5 text-xs ${invalid ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500'}`}>{invalid ? `${months[(month ?? 1) - 1]} ${year} only has ${max} days.` : day && month && year ? `${day} ${months[month - 1]} ${year}` : 'Use ↑ ↓ or type digits'}</p>
    </div>
  );
}
