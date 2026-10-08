/**
 * @registry
 * name: Overflow Tags Popover
 * category: Tooltips
 * style: Minimal
 * tags: recent
 * description: Liste de tags tronquée avec pastille « +4 » qui ouvre un popover listant les tags restants, avec retrait possible.
 * prompt: Create an overflow tags pattern: a row shows the first 3 tag chips and a "+N" chip button; activating it (click, Enter) opens an in-flow popover (defaultOpen) with an arrow, a heading "6 more tags" and the hidden tags as removable chips (× buttons with aria-labels); Escape closes it and returns focus to the +N button; removing tags updates the count. Light and dark mode.
 */
'use client';
import { X } from 'lucide-react';
import { useId, useRef, useState } from 'react';

export function OverflowTagsPopover({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [tags, setTags] = useState(['design-system', 'react', 'a11y', 'tokens', 'figma', 'motion', 'dark-mode', 'docs', 'testing']);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shown = tags.slice(0, 3);
  const hidden = tags.slice(3);

  function close() { setOpen(false); triggerRef.current?.focus(); }

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">PromptUI Kit</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {shown.map((tag) => <span key={tag} className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{tag}</span>)}
        {hidden.length > 0 && <button ref={triggerRef} type="button" aria-expanded={open} aria-controls={`${uid}-pop`} onClick={() => setOpen(!open)} className="rounded-md border border-dashed border-zinc-300 px-2 py-0.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900">+{hidden.length}</button>}
      </div>
      {open && hidden.length > 0 && (
        <div id={`${uid}-pop`} role="dialog" aria-labelledby={`${uid}-title`} onKeyDown={(event) => { if (event.key === 'Escape') close(); }} className="relative mt-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <span aria-hidden className="absolute -top-1.5 left-[9.5rem] size-3 rotate-45 border-l border-t border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900" />
          <p id={`${uid}-title`} className="text-xs font-semibold text-zinc-500">{hidden.length} more tags</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {hidden.map((tag) => <li key={tag} className="flex items-center gap-1 rounded-md bg-zinc-100 py-0.5 pl-2 pr-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => setTags((list) => list.filter((item) => item !== tag))} className="grid size-4 place-items-center rounded text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"><X aria-hidden className="size-3" /></button></li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
