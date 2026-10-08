/**
 * @registry
 * name: Submenu Dropdown
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Menu déroulant avec sous-menu qui s'ouvre à droite au survol ou avec la flèche droite.
 * prompt: Create a dropdown menu with a nested submenu: "Share" item (aria-haspopup, aria-expanded) opens a submenu to the right on hover, click or ArrowRight and closes on ArrowLeft; other items include a checkbox item (menuitemcheckbox, aria-checked) and a disabled item. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Check, ChevronDown, ChevronRight, Link2, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function SubmenuDropdown({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [sub, setSub] = useState(true);
  const [pinned, setPinned] = useState(true);
  const item = 'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900';

  return (
    <div className="relative w-[26rem]">
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">Options <ChevronDown aria-hidden className="size-4" /></button>
      {open && (
        <div role="menu" className="mt-2 w-52 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <button type="button" role="menuitemcheckbox" aria-checked={pinned} onClick={() => setPinned((value) => !value)} className={item}><span className="grid size-4 place-items-center">{pinned && <Check aria-hidden className="size-4 text-teal-600" />}</span>Pin to sidebar</button>
          <div className="relative" onMouseEnter={() => setSub(true)}>
            <button type="button" role="menuitem" aria-haspopup="menu" aria-expanded={sub} onClick={() => setSub((value) => !value)} onKeyDown={(event) => { if (event.key === 'ArrowRight') setSub(true); if (event.key === 'ArrowLeft') setSub(false); }} className={item}><span className="size-4" />Share<ChevronRight aria-hidden className="ml-auto size-4 text-zinc-400" /></button>
            {sub && (
              <div role="menu" aria-label="Share" className="absolute left-full top-0 ml-1 w-44 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                {[[Link2, 'Copy link'], [Mail, 'Email'], [MessageSquare, 'Message']].map(([Icon, label]) => {
                  const IconComponent = Icon as typeof Mail;
                  return <button key={label as string} type="button" role="menuitem" className={item}><IconComponent aria-hidden className="size-4 text-zinc-400" />{label as string}</button>;
                })}
              </div>
            )}
          </div>
          <button type="button" role="menuitem" aria-disabled="true" className={`${item} cursor-not-allowed opacity-40 hover:bg-transparent dark:hover:bg-transparent`}><span className="size-4" />Export (Pro)</button>
        </div>
      )}
    </div>
  );
}
