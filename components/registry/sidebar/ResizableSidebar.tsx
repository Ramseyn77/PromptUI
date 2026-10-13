/**
 * @registry
 * name: Resizable Sidebar
 * category: Sidebar
 * style: Glass
 * tags: recent
 * description: Barre latérale redimensionnable à la souris ou au clavier (poignée en séparateur), qui se replie en rail d'icônes sous un seuil.
 * prompt: Create a resizable sidebar: a glass sidebar with nav items (icon + label) and a drag handle on its right edge implemented as role="separator" with aria-orientation="vertical", aria-valuenow/min/max and keyboard support (ArrowLeft/Right by 16px, Home collapses, End expands); dragging uses pointer capture; below 120px it snaps into a 64px icon-only rail with tooltips via title and sr-only labels; double-clicking the handle toggles collapsed; width shown in a small badge while dragging; on mobile the sidebar is a fixed 64px rail. Light and dark mode.
 */
'use client';
import { BarChart3, FolderKanban, Home, Inbox, Settings, Users } from 'lucide-react';
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

const items = [['Home', Home], ['Inbox', Inbox], ['Projects', FolderKanban], ['Reports', BarChart3], ['Team', Users], ['Settings', Settings]] as const;
const MIN = 64;
const MAX = 320;

export function ResizableSidebar() {
  const [width, setWidth] = useState(220);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState('Projects');
  const lastOpen = useRef(220);
  const boxRef = useRef<HTMLDivElement>(null);
  const collapsed = width <= MIN;

  const set = (value: number) => {
    const next = value < 120 ? MIN : Math.min(MAX, value);
    if (next > MIN) lastOpen.current = next;
    setWidth(next);
  };

  function onPointer(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    set(event.clientX - boxRef.current!.getBoundingClientRect().left);
  }

  function onKey(event: KeyboardEvent) {
    const map: Record<string, number> = { ArrowLeft: width - 16, ArrowRight: width + 16, Home: MIN, End: MAX };
    if (map[event.key] === undefined) return;
    event.preventDefault();
    set(map[event.key]);
  }

  return (
    <div ref={boxRef} className="flex h-[24rem] w-full max-w-3xl overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#e0e7ff,#cffafe,#fce7f3)] p-2 dark:bg-[linear-gradient(135deg,#1e1b4b,#083344,#500724)]">
      <nav aria-label="Main" className={`relative shrink-0 rounded-2xl border border-white/60 bg-white/60 p-2 backdrop-blur-xl max-sm:!w-16 dark:border-white/10 dark:bg-zinc-950/60 ${dragging ? '' : 'transition-[width] duration-200'}`} style={{ width }}>
        <p className={`px-2 py-2 text-sm font-bold text-zinc-950 dark:text-white ${collapsed ? 'text-center' : ''} max-sm:text-center`}>{collapsed ? 'P' : <><span className="max-sm:hidden">Prism</span><span className="sm:hidden">P</span></>}</p>
        <ul className="mt-2 space-y-1">
          {items.map(([label, Icon]) => <li key={label}><a href="#" title={collapsed ? label : undefined} aria-current={active === label ? 'page' : undefined} onClick={(event) => { event.preventDefault(); setActive(label); }} className={`flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl px-3 py-2 text-sm ${collapsed ? 'justify-center' : ''} max-sm:justify-center ${active === label ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:bg-white/50 dark:text-zinc-300 dark:hover:bg-white/5'}`}><Icon aria-hidden className="size-4 shrink-0" /><span className={collapsed ? 'sr-only' : 'max-sm:sr-only'}>{label}</span></a></li>)}
        </ul>
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
          aria-valuenow={width}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          tabIndex={0}
          onKeyDown={onKey}
          onDoubleClick={() => set(collapsed ? lastOpen.current : MIN)}
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging(true); }}
          onPointerMove={onPointer}
          onPointerUp={() => setDragging(false)}
          className="group absolute -right-2 inset-y-4 hidden w-4 cursor-col-resize touch-none place-items-center outline-none sm:grid"
        >
          <span className="h-10 w-1 rounded-full bg-zinc-400/60 transition group-hover:h-16 group-hover:bg-indigo-500 group-focus-visible:h-16 group-focus-visible:bg-indigo-500" />
          {dragging && <span className="absolute left-5 top-1/2 rounded bg-zinc-950 px-1.5 py-0.5 text-[10px] tabular-nums text-white dark:bg-white dark:text-zinc-950">{Math.round(width)}px</span>}
        </div>
      </nav>
      <main className="ml-3 flex-1 rounded-2xl border border-white/60 bg-white/40 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/40">
        <h3 className="font-semibold text-zinc-950 dark:text-white">{active}</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Drag the handle, or focus it and use ← → · Home collapses · End expands · double-click toggles.</p>
      </main>
    </div>
  );
}
