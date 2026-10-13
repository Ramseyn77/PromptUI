/**
 * @registry
 * name: App Launcher Menu
 * category: Menu
 * style: Glass
 * tags: recent
 * description: Lanceur d'applications en grille 3×3 (bouton « gaufre ») : icônes colorées, recherche, épingler en favori et navigation au clavier par flèches.
 * prompt: Create an app launcher menu triggered by a 3×3 "waffle" button (open by default): a glass panel with a search field and a 3-column grid of app tiles (colored rounded icons with initials and names); arrow keys move focus in 2D across the grid (roving tabindex), Enter opens (announces "Opening Mail"), a small star button per tile pins it to a "Pinned" row at the top; Escape closes and returns focus to the trigger. Light and dark mode.
 */
'use client';
import { Grip, Star } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const apps = [['Mail', '#0ea5e9'], ['Calendar', '#f97316'], ['Drive', '#10b981'], ['Docs', '#6366f1'], ['Sheets', '#16a34a'], ['Chat', '#14b8a6'], ['Meet', '#ef4444'], ['Photos', '#eab308'], ['Notes', '#a855f7']] as const;

export function AppLauncherMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(0);
  const [pinned, setPinned] = useState<string[]>(['Docs']);
  const [status, setStatus] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const list = apps.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));

  function move(event: KeyboardEvent, index: number) {
    const delta = ({ ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 } as Record<string, number>)[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    const next = Math.min(list.length - 1, Math.max(0, index + delta));
    setFocus(next);
    tiles.current[next]?.focus();
  }

  return (
    <div className="w-full max-w-xs" onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); } }}>
      <button ref={triggerRef} type="button" aria-label="Apps" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"><Grip aria-hidden className="size-5" /></button>
      {open && (
        <div className="mt-2 rounded-3xl bg-[linear-gradient(135deg,#dbeafe,#fce7f3)] p-2 dark:bg-[linear-gradient(135deg,#172554,#500724)]">
          <div className="rounded-2xl border border-white/60 bg-white/60 p-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
            <input aria-label="Search apps" value={query} onChange={(event) => { setQuery(event.target.value); setFocus(0); }} placeholder="Search apps" className="w-full rounded-xl bg-white/70 px-3 py-2 text-sm text-zinc-900 outline-none dark:bg-white/10 dark:text-zinc-100" />
            {pinned.length > 0 && !query && <p className="mt-3 px-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Pinned · {pinned.join(', ')}</p>}
            <ul role="menu" aria-label="Apps" className="mt-2 grid grid-cols-3 gap-1">
              {list.map(([name, color], index) => (
                <li key={name} role="none" className="relative">
                  <button ref={(node) => { tiles.current[index] = node; }} type="button" role="menuitem" tabIndex={focus === index ? 0 : -1} onKeyDown={(event) => move(event, index)} onFocus={() => setFocus(index)} onClick={() => setStatus(`Opening ${name}`)} className="flex w-full flex-col items-center gap-1.5 rounded-xl p-2.5 text-xs text-zinc-800 hover:bg-white/70 focus:bg-white/70 focus:outline-none dark:text-zinc-200 dark:hover:bg-white/10 dark:focus:bg-white/10">
                    <span className="grid size-10 place-items-center rounded-xl text-sm font-bold text-white shadow-md" style={{ background: color }}>{name.slice(0, 2)}</span>{name}
                  </button>
                  <button type="button" tabIndex={-1} aria-label={`${pinned.includes(name) ? 'Unpin' : 'Pin'} ${name}`} aria-pressed={pinned.includes(name)} onClick={() => setPinned((value) => (value.includes(name) ? value.filter((item) => item !== name) : [...value, name]))} className={`absolute right-1 top-1 grid size-5 place-items-center rounded-full ${pinned.includes(name) ? 'text-amber-500' : 'text-zinc-400 opacity-0 hover:opacity-100 focus:opacity-100'}`}><Star aria-hidden className={`size-3 ${pinned.includes(name) ? 'fill-current' : ''}`} /></button>
                </li>
              ))}
            </ul>
            {!list.length && <p className="py-4 text-center text-sm text-zinc-500">No apps found</p>}
            <p aria-live="polite" className="mt-1 h-4 text-center text-[11px] text-zinc-500">{status}</p>
          </div>
        </div>
      )}
    </div>
  );
}
