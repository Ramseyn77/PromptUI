/**
 * @registry
 * name: Copy Tooltip
 * category: Tooltips
 * style: Dark
 * tags: recent
 * description: Info-bulle « Copier » qui devient « Copié ! » avec coche verte après le clic, sur un bloc de commande.
 * prompt: Create a copy-to-clipboard tooltip: a dark code line with an icon button; hovering or focusing shows a "Copy" tooltip, clicking copies the command and the tooltip switches to "Copied!" with a green check for 1.5s (also announced via aria-live). Works on keyboard. Same dark styling in both themes.
 */
'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const command = 'pnpm dlx promptui@latest add tooltip';

export function CopyTooltip() {
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);

  async function copy() {
    try { await navigator.clipboard.writeText(command); } catch {}
    setCopied(true);
    setShow(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl bg-zinc-950 px-4 py-3 font-mono text-sm text-zinc-200 ring-1 ring-white/10">
      <span className="text-teal-400">$</span>
      <span className="min-w-0 flex-1 truncate">{command}</span>
      <span className="relative">
        <button type="button" aria-label={copied ? 'Copied' : 'Copy command'} onClick={copy} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)} className="grid size-8 place-items-center rounded-md text-zinc-400 outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-400">
          {copied ? <Check aria-hidden className="size-4 text-emerald-400" /> : <Copy aria-hidden className="size-4" />}
        </button>
        <span role="tooltip" className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 font-sans text-xs font-medium shadow transition ${show || copied ? 'opacity-100' : 'opacity-0'} ${copied ? 'bg-emerald-500 text-emerald-950' : 'bg-white text-zinc-900'}`}>{copied ? 'Copied!' : 'Copy'}</span>
      </span>
      <span aria-live="polite" className="sr-only">{copied ? 'Command copied to clipboard' : ''}</span>
    </div>
  );
}
