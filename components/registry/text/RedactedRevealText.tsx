/**
 * @registry
 * name: Redacted Reveal Text
 * category: Text
 * style: Editorial
 * tags: recent
 * description: Paragraphe façon document classifié : passages caviardés en barres noires qui se révèlent au survol, au focus ou d'un clic, avec bascule globale.
 * prompt: Create a redacted document text effect: a typewriter-style memo paragraph where certain phrases are covered by black redaction bars; each redaction is a button (aria-pressed, aria-label "Reveal redacted text") that slides the bar away to reveal the phrase on hover, focus or click (click keeps it revealed); a "Declassify all" toggle reveals everything; hidden text is exposed to screen readers only when revealed; reduced motion swaps instantly. Light (paper) and dark mode.
 */
'use client';
import { useState } from 'react';

const parts: (string | [string])[] = ['MEMO 07 — Project ', ['Aurora'], ' launches on ', ['November 18'], '. The pricing will start at ', ['$19 per seat'], ', and the first partner is ', ['Kora Bank'], '. Do not share this outside the ', ['design guild'], '.'];

export function RedactedRevealText() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [all, setAll] = useState(false);

  return (
    <div className="w-full max-w-lg rounded-2xl bg-[#f3efe4] p-7 shadow-sm ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-white/10">
      <div className="flex items-center justify-between"><p className="rounded border-2 border-rose-700 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-rose-700 dark:border-rose-400 dark:text-rose-400">Confidential</p><label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400"><input type="checkbox" checked={all} onChange={(event) => setAll(event.target.checked)} className="accent-zinc-900" />Declassify all</label></div>
      <p className="mt-5 font-mono text-[15px] leading-8 text-zinc-800 dark:text-zinc-200">
        {parts.map((part, index) => {
          if (typeof part === 'string') return <span key={index}>{part}</span>;
          const open = all || revealed.includes(index);
          return (
            <button key={index} type="button" aria-pressed={open} aria-label={open ? part[0] : 'Reveal redacted text'} onClick={() => setRevealed((list) => (list.includes(index) ? list.filter((item) => item !== index) : [...list, index]))} className="group relative inline rounded-sm px-0.5 align-baseline outline-none focus-visible:ring-2 focus-visible:ring-rose-600">
              <span aria-hidden={!open} className={open ? 'bg-amber-200/70 dark:bg-amber-500/30' : ''}>{part[0]}</span>
              <span aria-hidden className={`absolute inset-y-1 left-0 right-0 origin-right bg-zinc-950 transition-transform duration-300 motion-reduce:duration-0 dark:bg-zinc-100 ${open ? 'scale-x-0' : 'group-hover:scale-x-0 group-focus-visible:scale-x-0'}`} />
            </button>
          );
        })}
      </p>
      <p className="mt-5 font-mono text-[11px] text-zinc-500">Hover, focus or click the bars.</p>
    </div>
  );
}
