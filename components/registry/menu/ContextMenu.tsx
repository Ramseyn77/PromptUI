/**
 * @registry
 * name: Context Menu
 * category: Menu
 * style: Minimal
 * tags: recent
 * description: Menu contextuel au clic droit, positionné au curseur, avec raccourcis, séparateurs et action destructive.
 * prompt: Create a right-click context menu inside a canvas area: contextmenu event opens a role="menu" at the pointer (clamped inside the area), items with icons and shortcuts, a separator and a destructive Delete item; ArrowUp/Down move focus between menuitems, Escape/outside click closes. Shift+F10 on the focused area opens it too. Light and dark mode.
 */
'use client';
import { Copy, Pencil, Scissors, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';

const items = [
  { icon: Pencil, label: 'Rename', shortcut: 'F2' },
  { icon: Copy, label: 'Duplicate', shortcut: '⌘D' },
  { icon: Scissors, label: 'Cut', shortcut: '⌘X' },
];

export function ContextMenu() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const area = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function openAt(x: number, y: number) {
    const rect = area.current!.getBoundingClientRect();
    setMenu({ x: Math.min(x, rect.width - 200), y: Math.min(y, rect.height - 170) });
  }
  function onContext(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    openAt(event.clientX - rect.left, event.clientY - rect.top);
  }

  useEffect(() => {
    // Listen on the document that renders the component: it may live in an iframe (previews, embeds).
    const doc = area.current?.ownerDocument ?? document;
    if (!menu) return;
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    const close = (event: globalThis.MouseEvent) => { if (!menuRef.current?.contains(event.target as Node)) setMenu(null); };
    doc.addEventListener('mousedown', close);
    return () => doc.removeEventListener('mousedown', close);
  }, [menu]);

  function onMenuKey(event: KeyboardEvent<HTMLDivElement>) {
    const all = [...(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];
    const index = all.indexOf((area.current?.ownerDocument ?? document).activeElement as HTMLElement);
    if (event.key === 'ArrowDown') { event.preventDefault(); all[(index + 1) % all.length]?.focus(); }
    if (event.key === 'ArrowUp') { event.preventDefault(); all[(index - 1 + all.length) % all.length]?.focus(); }
    if (event.key === 'Escape') { setMenu(null); area.current?.focus(); }
  }

  return (
    <div ref={area} tabIndex={0} onContextMenu={onContext} onKeyDown={(event) => { if (event.shiftKey && event.key === 'F10') { event.preventDefault(); openAt(40, 40); } }} aria-label="Canvas, right-click or Shift+F10 for options" className="relative grid h-64 w-full max-w-md place-items-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-500 outline-none focus-visible:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
      Right-click anywhere
      {menu && (
        <div ref={menuRef} role="menu" aria-label="Item actions" onKeyDown={onMenuKey} className="absolute z-10 w-48 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-950" style={{ left: menu.x, top: menu.y }}>
          {items.map(({ icon: Icon, label, shortcut }) => <button key={label} type="button" role="menuitem" tabIndex={-1} onClick={() => setMenu(null)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-zinc-700 outline-none hover:bg-zinc-100 focus:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900"><Icon aria-hidden className="size-4 text-zinc-400" />{label}<kbd className="ml-auto font-mono text-[11px] text-zinc-400">{shortcut}</kbd></button>)}
          <div role="separator" className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <button type="button" role="menuitem" tabIndex={-1} onClick={() => setMenu(null)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-rose-600 outline-none hover:bg-rose-50 focus:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 dark:focus:bg-rose-500/10"><Trash2 aria-hidden className="size-4" />Delete<kbd className="ml-auto font-mono text-[11px]">⌫</kbd></button>
        </div>
      )}
    </div>
  );
}
