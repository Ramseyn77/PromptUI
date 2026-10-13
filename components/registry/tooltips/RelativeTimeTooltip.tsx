/**
 * @registry
 * name: Relative Time Tooltip
 * category: Tooltips
 * style: Minimal
 * tags: recent
 * description: Horodatages relatifs (« il y a 3 min ») qui révèlent au survol ou au focus la date exacte, le fuseau et l'équivalent UTC, avec copie ISO.
 * prompt: Create relative timestamps in an activity list ("3 min ago", "2 h ago", "yesterday", "Sep 30") computed from a fixed demo "now" (no runtime clock in render); each is a <time dateTime> element inside a focusable button that shows a tooltip on hover/focus after 300ms with the full date, local time with timezone, the UTC equivalent and a "Copy ISO" button (tooltip stays while hovered); Escape hides it; the button is aria-describedby the tooltip. Light and dark mode.
 */
'use client';
import { useId, useRef, useState } from 'react';

const now = Date.UTC(2026, 9, 13, 14, 20);
const events = [['Awa merged #482', 3 * 60e3], ['Leo commented on the design brief', 2 * 3600e3], ['Deploy to production', 26 * 3600e3], ['Mei closed 4 issues', 13 * 86400e3]] as const;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = (value: number) => String(value).padStart(2, '0');

function relative(ago: number, date: Date) {
  if (ago < 3600e3) return `${Math.round(ago / 60e3)} min ago`;
  if (ago < 86400e3) return `${Math.round(ago / 3600e3)} h ago`;
  if (ago < 2 * 86400e3) return 'yesterday';
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
}

export function RelativeTimeTooltip() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  const show = (index: number) => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => { setOpen(index); setCopied(false); }, 300); };
  const hide = () => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(null), 150); };

  return (
    <ul className="w-full max-w-md divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white px-4 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(null); }}>
      {events.map(([text, ago], index) => {
        const date = new Date(now - ago);
        const iso = date.toISOString();
        const local = new Date(now - ago + 3600e3);
        return (
          <li key={text} className="flex items-center gap-3 py-3 text-sm">
            <span className="flex-1 text-zinc-800 dark:text-zinc-200">{text}</span>
            <span className="relative" onMouseEnter={() => show(index)} onMouseLeave={hide}>
              <button type="button" aria-describedby={open === index ? `${uid}-tip` : undefined} onFocus={() => show(index)} onBlur={hide} className="rounded text-xs text-zinc-500 underline decoration-dotted underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"><time dateTime={iso}>{relative(ago, date)}</time></button>
              {open === index && (
                <span id={`${uid}-tip`} role="tooltip" className="absolute right-0 top-full z-10 mt-2 w-56 rounded-xl bg-zinc-950 p-3 text-xs text-zinc-300 shadow-xl dark:bg-zinc-800">
                  <span className="block font-semibold text-white">{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][local.getUTCDay()]}, {months[local.getUTCMonth()]} {local.getUTCDate()}, {local.getUTCFullYear()}</span>
                  <span className="mt-1 block">{pad(local.getUTCHours())}:{pad(local.getUTCMinutes())} · Africa/Lagos (UTC+1)</span>
                  <span className="block text-zinc-500">{pad(date.getUTCHours())}:{pad(date.getUTCMinutes())} UTC</span>
                  <button type="button" onFocus={() => window.clearTimeout(timer.current)} onClick={() => { navigator.clipboard?.writeText(iso).catch(() => {}); setCopied(true); }} className="mt-2 rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] text-white hover:bg-white/20">{copied ? 'Copied ✓' : 'Copy ISO'}</button>
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
