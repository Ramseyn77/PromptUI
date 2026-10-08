/**
 * @registry
 * name: Date Shortcuts Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Menu de plages de dates prédéfinies (aujourd'hui, 7 jours, trimestre…) avec mini calendrier et comparaison.
 * prompt: Create a date range shortcuts menu (open by default): left column of preset menuitemradio options (Today, Yesterday, Last 7 days, Last 30 days, This quarter, Year to date) with keyboard shortcuts shown (T, Y, 7, 3, Q, A) that work while the menu is focused; right side shows a compact month grid highlighting the resolved range relative to a fixed demo date (Oct 8, 2026); a "Compare to previous period" switch; Apply updates the trigger label. Light and dark mode.
 */
'use client';
import { CalendarDays } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const presets = [
  { label: 'Today', key: 'T', from: 8, to: 8 }, { label: 'Yesterday', key: 'Y', from: 7, to: 7 }, { label: 'Last 7 days', key: '7', from: 2, to: 8 },
  { label: 'Last 30 days', key: '3', from: 1, to: 8 }, { label: 'This quarter', key: 'Q', from: 1, to: 8 }, { label: 'Year to date', key: 'A', from: 1, to: 8 },
];
const ranges = ['Oct 8', 'Oct 7', 'Oct 2 – 8', 'Sep 9 – Oct 8', 'Oct 1 – 8', 'Jan 1 – Oct 8'];

export function DateShortcutsMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [choice, setChoice] = useState(2);
  const [applied, setApplied] = useState(2);
  const [compare, setCompare] = useState(false);
  const preset = presets[choice];

  function onKeyDown(event: KeyboardEvent) {
    if ((event.target as HTMLElement).tagName === 'INPUT') return;
    const index = presets.findIndex((item) => item.key === event.key.toUpperCase());
    if (index >= 0) { event.preventDefault(); setChoice(index); }
  }

  return (
    <div className="w-full max-w-md">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"><CalendarDays aria-hidden className="size-4 text-zinc-400" />{presets[applied].label} <span className="text-zinc-400">· {ranges[applied]}</span></button>
      {open && (
        <div onKeyDown={onKeyDown} className="mt-2 flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg sm:flex-row dark:border-zinc-800 dark:bg-zinc-900">
          <div role="menu" aria-label="Date presets" className="border-b border-zinc-100 p-1.5 sm:w-44 sm:border-b-0 sm:border-r dark:border-zinc-800">
            {presets.map((item, index) => <button key={item.label} type="button" role="menuitemradio" aria-checked={choice === index} aria-keyshortcuts={item.key} onClick={() => setChoice(index)} className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm ${choice === index ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`}>{item.label}<kbd className="font-mono text-[10px] opacity-60">{item.key}</kbd></button>)}
          </div>
          <div className="flex-1 p-3">
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">October 2026</p>
            <div className="mt-2 grid grid-cols-7 gap-0.5 text-center text-[11px]" aria-hidden>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span key={index} className="py-1 text-zinc-400">{day}</span>)}
              {Array.from({ length: 3 }, (_, index) => <span key={`pad${index}`} />)}
              {Array.from({ length: 14 }, (_, index) => { const day = index + 1; const inRange = day >= preset.from && day <= preset.to; const edge = day === preset.from || day === preset.to; return <span key={day} className={`py-1 tabular-nums ${edge ? 'rounded-md bg-indigo-600 font-semibold text-white' : inRange ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-500/15 dark:text-indigo-100' : day > 8 ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-700 dark:text-zinc-300'}`}>{day}</span>; })}
            </div>
            <p className="mt-2 text-xs text-zinc-500">{ranges[choice]}{choice >= 3 && choice !== 4 ? ' (spans earlier months)' : ''}</p>
            <label className="mt-3 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">Compare to previous period<input type="checkbox" role="switch" checked={compare} onChange={(event) => setCompare(event.target.checked)} className="size-4 accent-indigo-600" /></label>
            <button type="button" onClick={() => setApplied(choice)} className="mt-3 w-full rounded-lg bg-indigo-600 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500">Apply{compare ? ' with comparison' : ''}</button>
          </div>
        </div>
      )}
    </div>
  );
}
