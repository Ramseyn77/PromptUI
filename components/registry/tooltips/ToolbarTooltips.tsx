/**
 * @registry
 * name: Toolbar Tooltips
 * category: Tooltips
 * style: Dark
 * tags: recent
 * description: Barre d'outils d'éditeur où chaque icône affiche son nom et son raccourci, navigation aux flèches.
 * prompt: Create an editor toolbar (role="toolbar") of icon buttons with roving tabindex (ArrowLeft/ArrowRight move focus, Home/End jump); each button shows a tooltip below with its label and keyboard shortcut in kbd chips on hover or focus. Dark floating toolbar in both themes.
 */
'use client';
import { Bold, Code, Heading2, Image, Italic, Link2, List, Quote, type LucideIcon } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const tools: [LucideIcon, string, string][] = [[Bold, 'Bold', '⌘B'], [Italic, 'Italic', '⌘I'], [Heading2, 'Heading', '⌘⌥2'], [List, 'Bulleted list', '⌘⇧8'], [Quote, 'Quote', '⌘⇧9'], [Code, 'Code', '⌘E'], [Link2, 'Link', '⌘K'], [Image, 'Image', '⌘⇧I']];

export function ToolbarTooltips() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(event: KeyboardEvent) {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tools.length - 1 };
    if (!(event.key in map)) return;
    event.preventDefault();
    const next = (map[event.key] + tools.length) % tools.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div role="toolbar" aria-label="Formatting" onKeyDown={onKey} className="flex items-center gap-0.5 rounded-xl bg-zinc-900 p-1 shadow-2xl ring-1 ring-white/10">
      {tools.map(([Icon, label, keys], index) => (
        <span key={label} className="group relative">
          <button ref={(node) => { refs.current[index] = node; }} type="button" tabIndex={index === active ? 0 : -1} aria-label={label} aria-keyshortcuts={keys} onFocus={() => setActive(index)} className="grid size-9 place-items-center rounded-lg text-zinc-300 outline-none hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-teal-400">
            <Icon aria-hidden className="size-4" />
          </button>
          <span role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg ring-1 ring-white/10 transition group-hover:opacity-100 group-focus-within:opacity-100">
            {label}<kbd className="rounded bg-white/10 px-1 font-mono text-[10px] text-zinc-300">{keys}</kbd>
          </span>
        </span>
      ))}
    </div>
  );
}
