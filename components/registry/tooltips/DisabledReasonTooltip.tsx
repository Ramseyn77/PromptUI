/**
 * @registry
 * name: Disabled Reason Tooltip
 * category: Tooltips
 * style: SaaS
 * tags: recent
 * description: Bouton désactivé qui explique pourquoi dans une info-bulle, accessible au clavier grâce à aria-disabled.
 * prompt: Create a disabled-reason tooltip: a "Publish" button that is aria-disabled (still focusable, click does nothing) while required fields are missing; hovering or focusing shows a tooltip listing what's missing ("Add a title", "Pick a cover"); two checkboxes above let the user complete the requirements, which enables the button and hides the tooltip. Light and dark mode.
 */
'use client';
import { Lock } from 'lucide-react';
import { useId, useState } from 'react';

export function DisabledReasonTooltip() {
  const id = useId();
  const [title, setTitle] = useState(false);
  const [cover, setCover] = useState(false);
  const [published, setPublished] = useState(false);
  const missing = [!title && 'Add a title', !cover && 'Pick a cover image'].filter(Boolean) as string[];
  const disabled = missing.length > 0;

  return (
    <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={title} onChange={(event) => setTitle(event.target.checked)} className="accent-teal-600" />Title added</label>
      <label className="mt-2 flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={cover} onChange={(event) => setCover(event.target.checked)} className="accent-teal-600" />Cover selected</label>
      <div className="group relative mt-5 inline-block pt-0">
        <button type="button" aria-disabled={disabled} aria-describedby={disabled ? id : undefined} onClick={() => { if (!disabled) setPublished(true); }} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${disabled ? 'cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500' : 'bg-teal-600 text-white hover:bg-teal-500'}`}>
          {disabled && <Lock aria-hidden className="size-3.5" />}{published ? 'Published' : 'Publish'}
        </button>
        {disabled && (
          <span id={id} role="tooltip" className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-52 rounded-lg bg-zinc-900 p-2.5 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
            <span className="font-semibold">Can't publish yet:</span>
            <span className="mt-1 block">{missing.map((item) => <span key={item} className="block">• {item}</span>)}</span>
          </span>
        )}
      </div>
    </div>
  );
}
