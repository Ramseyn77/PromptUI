/**
 * @registry
 * name: Underline Tabs Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: Navigation secondaire en onglets avec soulignement qui glisse vers l'onglet actif.
 * prompt: Create secondary navigation tabs with a sliding underline indicator (measured from the active tab's offsetLeft/width, CSS transition), horizontal scroll on small screens, role="tablist" semantics and count badges. Light and dark mode.
 */
'use client';
import { useLayoutEffect, useRef, useState } from 'react';

const tabs = [['Overview', null], ['Activity', 12], ['Members', 8], ['Settings', null]] as const;

export function UnderlineTabsNavbar() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const tab = refs.current[active];
    if (tab) setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
  }, [active]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div role="tablist" aria-label="Project sections" className="relative flex gap-6 overflow-x-auto">
        {tabs.map(([label, count], index) => (
          <button
            key={label}
            ref={(node) => { refs.current[index] = node; }}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={`flex shrink-0 items-center gap-2 py-4 text-sm font-medium transition ${active === index ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
          >
            {label}
            {count !== null && <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{count}</span>}
          </button>
        ))}
        <span aria-hidden className="absolute bottom-0 h-0.5 rounded-full bg-teal-600 transition-all duration-300 dark:bg-teal-400" style={{ left: indicator.left, width: indicator.width }} />
      </div>
    </div>
  );
}
