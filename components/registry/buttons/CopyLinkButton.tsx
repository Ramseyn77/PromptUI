/**
 * @registry
 * name: Copy Link Button
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Champ de lien en lecture seule avec bouton copier qui morphe en coche et bulle « Copie ! ».
 * prompt: Create a share-link control: a read-only input showing a URL (select-all on focus) joined to a Copy button; on click copy to clipboard, swap the icon to a check with a rotate/scale transition, show a small "Copied!" tooltip bubble above for 1.5s, and announce it via aria-live. Light and dark mode.
 */
'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const url = 'https://promptui.dev/c/aurora-hero';

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="share-url" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Share link</label>
      <div className="mt-1.5 flex rounded-xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <input id="share-url" readOnly value={url} onFocus={(event) => event.target.select()} className="min-w-0 flex-1 truncate bg-transparent px-3 text-sm text-zinc-600 outline-none dark:text-zinc-300" />
        <div className="relative">
          <span aria-hidden className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white transition dark:bg-white dark:text-zinc-900 ${copied ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}>Copied!</span>
          <button type="button" onClick={copy} aria-label="Copy link" className="grid h-11 w-12 place-items-center rounded-r-xl border-l border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <span className="relative size-4">
              <Copy aria-hidden className={`absolute inset-0 size-4 transition duration-300 ${copied ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
              <Check aria-hidden className={`absolute inset-0 size-4 text-emerald-500 transition duration-300 ${copied ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </span>
          </button>
        </div>
      </div>
      <p aria-live="polite" className="sr-only">{copied ? 'Link copied to clipboard' : ''}</p>
    </div>
  );
}
