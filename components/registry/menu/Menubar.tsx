/**
 * @registry
 * name: Menubar
 * category: Menu
 * style: Minimal
 * tags: featured, recent
 * description: Barre de menus d'application façon desktop (Fichier, Édition, Affichage) avec raccourcis, cases et choix exclusifs.
 * prompt: Create a desktop-style menubar (role="menubar") with File, Edit, View and Profiles triggers; once a menu is open, hovering or ArrowLeft/ArrowRight switches menus, Escape closes. Menus contain items with keyboard shortcut hints, separators, a disabled item, menuitemcheckbox items (View) and a menuitemradio group (Profiles). defaultOpen prop shows File open for previews (menu rendered in flow). Light and dark mode.
 */
'use client';
import { Check, Circle } from 'lucide-react';
import { useState, type KeyboardEvent, type ReactNode } from 'react';

const menus = ['File', 'Edit', 'View', 'Profiles'] as const;
type MenuName = (typeof menus)[number];

export function Menubar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState<MenuName | null>(defaultOpen ? 'File' : null);
  const [toggles, setToggles] = useState({ bookmarks: true, urls: false });
  const [profile, setProfile] = useState('Andy');

  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape') setOpen(null);
    if (!open || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const index = menus.indexOf(open);
    setOpen(menus[(index + (event.key === 'ArrowRight' ? 1 : menus.length - 1)) % menus.length]);
  }

  const item = 'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-zinc-800 outline-none hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800';
  const shortcut = (keys: string) => <span className="ml-auto pl-6 font-mono text-xs text-zinc-400">{keys}</span>;
  const separator = <div role="separator" className="-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-800" />;

  const content: Record<MenuName, ReactNode> = {
    File: (<>
      <button type="button" role="menuitem" className={item}>New Tab{shortcut('⌘T')}</button>
      <button type="button" role="menuitem" className={item}>New Window{shortcut('⌘N')}</button>
      <button type="button" role="menuitem" aria-disabled="true" className={`${item} cursor-not-allowed opacity-40 hover:bg-transparent dark:hover:bg-transparent`}>New Incognito Window</button>
      {separator}
      <button type="button" role="menuitem" className={item}>Share…</button>
      <button type="button" role="menuitem" className={item}>Print…{shortcut('⌘P')}</button>
    </>),
    Edit: (<>
      <button type="button" role="menuitem" className={item}>Undo{shortcut('⌘Z')}</button>
      <button type="button" role="menuitem" className={item}>Redo{shortcut('⇧⌘Z')}</button>
      {separator}
      <button type="button" role="menuitem" className={item}>Cut</button>
      <button type="button" role="menuitem" className={item}>Copy</button>
      <button type="button" role="menuitem" className={item}>Paste</button>
    </>),
    View: (<>
      {([['bookmarks', 'Always Show Bookmarks Bar'], ['urls', 'Always Show Full URLs']] as const).map(([key, text]) => (
        <button key={key} type="button" role="menuitemcheckbox" aria-checked={toggles[key]} onClick={() => setToggles((value) => ({ ...value, [key]: !value[key] }))} className={item}>
          <span className="grid size-4 place-items-center">{toggles[key] && <Check aria-hidden className="size-4" />}</span>{text}
        </button>
      ))}
      {separator}
      <button type="button" role="menuitem" className={item}><span className="size-4" />Reload{shortcut('⌘R')}</button>
      <button type="button" role="menuitem" className={item}><span className="size-4" />Toggle Fullscreen</button>
    </>),
    Profiles: (<div role="group" aria-label="Profiles">
      {['Andy', 'Benoit', 'Luis'].map((name) => (
        <button key={name} type="button" role="menuitemradio" aria-checked={profile === name} onClick={() => setProfile(name)} className={item}>
          <span className="grid size-4 place-items-center">{profile === name && <Circle aria-hidden className="size-2 fill-current" />}</span>{name}
        </button>
      ))}
    </div>),
  };

  return (
    <div className="w-[26rem]" onKeyDown={onKey}>
      <div role="menubar" aria-label="Application" className="inline-flex gap-1 rounded-lg border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        {menus.map((name) => (
          <button
            key={name}
            type="button"
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={open === name}
            onClick={() => setOpen((value) => (value === name ? null : name))}
            onMouseEnter={() => open && setOpen(name)}
            className={`rounded-md px-3 py-1 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 ${open === name ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50' : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`}
          >{name}</button>
        ))}
      </div>
      {open && (
        <div role="menu" aria-label={open} className="mt-1.5 w-64 rounded-lg border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950" style={{ marginLeft: menus.indexOf(open) * 52 }}>
          {content[open]}
        </div>
      )}
    </div>
  );
}
