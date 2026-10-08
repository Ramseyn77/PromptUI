/**
 * @registry
 * name: User Menu Navbar
 * category: Navbar
 * style: SaaS
 * tags: featured, recent
 * description: Navigation avec menu compte déroulant : profil, plan, raccourcis et déconnexion.
 * prompt: Create a navbar whose avatar button (aria-haspopup="menu", aria-expanded) opens an account menu: user name/email header, items with icons and keyboard shortcuts, a plan usage bar, and a destructive "Log out" item. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { CreditCard, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';

const items = [
  { icon: User, label: 'Profile', shortcut: '⇧P' },
  { icon: CreditCard, label: 'Billing', shortcut: '⇧B' },
  { icon: Settings, label: 'Settings', shortcut: '⌘,' },
];

export function UserMenuNavbar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full max-w-lg">
      <nav aria-label="Main" className="flex h-14 items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
        <span className="font-semibold text-zinc-900 dark:text-white">Atlas</span>
        <button type="button" aria-label="Account menu" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="size-9 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-xs font-bold text-white ring-2 ring-transparent transition hover:ring-zinc-300 dark:hover:ring-zinc-700">CM</button>
      </nav>
      {open && (
        <div role="menu" aria-label="Account" className="ml-auto mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">Camille Martin</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">camille@atlas.dev</p>
          </div>
          <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          {items.map(({ icon: Icon, label, shortcut }) => (
            <button key={label} type="button" role="menuitem" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900">
              <Icon aria-hidden className="size-4 text-zinc-500" />{label}<kbd className="ml-auto font-mono text-[11px] text-zinc-400">{shortcut}</kbd>
            </button>
          ))}
          <div className="mx-3 my-2 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
            <p className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400"><span>Pro plan</span><span>7 / 10 seats</span></p>
            <div className="mt-2 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"><div className="h-full w-[70%] rounded-full bg-teal-500" /></div>
          </div>
          <button type="button" role="menuitem" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"><LogOut aria-hidden className="size-4" />Log out</button>
        </div>
      )}
    </div>
  );
}
