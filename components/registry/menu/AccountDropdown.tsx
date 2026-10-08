/**
 * @registry
 * name: Account Dropdown
 * category: Menu
 * style: SaaS
 * tags: recent
 * description: Menu de compte façon shadcn avec profil, groupes d'actions, raccourcis, choix d'affichage en cases et déconnexion.
 * prompt: Create a shadcn-style account dropdown: trigger is an avatar + name button (aria-haspopup, aria-expanded); the menu has a header with name and email, a group of items with icons and shortcut hints (Profile ⇧⌘P, Billing ⌘B, Settings ⌘S), a "Panel position" menuitemradio group (Top/Bottom/Right), a "Show status bar" menuitemcheckbox, and a destructive "Log out" item. ArrowUp/ArrowDown move focus between items, Escape closes. defaultOpen prop for previews (menu in flow). Light and dark mode.
 */
'use client';
import { Check, ChevronsUpDown, CreditCard, LogOut, Settings, User } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

export function AccountDropdown({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [position, setPosition] = useState('Bottom');
  const [statusBar, setStatusBar] = useState(true);
  const menu = useRef<HTMLDivElement>(null);

  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape') { setOpen(false); return; }
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const items = Array.from(menu.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[(index + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus();
  }

  const item = 'flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm text-zinc-800 outline-none hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800';
  const label = 'px-2 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400';
  const separator = <div role="separator" className="-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-800" />;

  return (
    <div className="w-64" onKeyDown={onKey}>
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white p-2 text-left outline-none transition hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
        <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-amber-300 to-rose-400 text-xs font-bold text-white">SN</span>
        <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sofia Nkemelu</span><span className="block truncate text-xs text-zinc-500">Pro plan</span></span>
        <ChevronsUpDown aria-hidden className="size-4 text-zinc-400" />
      </button>
      {open && (
        <div ref={menu} role="menu" aria-label="Account" className="mt-1.5 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <div className="px-2 py-1.5"><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sofia Nkemelu</p><p className="text-xs text-zinc-500">sofia@acme.dev</p></div>
          {separator}
          {([[User, 'Profile', '⇧⌘P'], [CreditCard, 'Billing', '⌘B'], [Settings, 'Settings', '⌘S']] as const).map(([Icon, text, keys]) => (
            <button key={text} type="button" role="menuitem" className={item}><Icon aria-hidden className="size-4 text-zinc-500" />{text}<span className="ml-auto font-mono text-xs text-zinc-400">{keys}</span></button>
          ))}
          {separator}
          <p className={label}>Panel position</p>
          <div role="group" aria-label="Panel position">
            {['Top', 'Bottom', 'Right'].map((value) => (
              <button key={value} type="button" role="menuitemradio" aria-checked={position === value} onClick={() => setPosition(value)} className={item}><span className="grid size-4 place-items-center">{position === value && <span className="size-2 rounded-full bg-current" />}</span>{value}</button>
            ))}
          </div>
          <button type="button" role="menuitemcheckbox" aria-checked={statusBar} onClick={() => setStatusBar((value) => !value)} className={item}><span className="grid size-4 place-items-center">{statusBar && <Check aria-hidden className="size-4" />}</span>Show status bar</button>
          {separator}
          <button type="button" role="menuitem" className={`${item} text-rose-600 hover:bg-rose-50 focus-visible:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 dark:focus-visible:bg-rose-500/10`}><LogOut aria-hidden className="size-4" />Log out<span className="ml-auto font-mono text-xs opacity-70">⇧⌘Q</span></button>
        </div>
      )}
    </div>
  );
}
