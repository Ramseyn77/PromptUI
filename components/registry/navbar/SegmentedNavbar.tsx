/**
 * @registry
 * name: Segmented Navbar
 * category: Navbar
 * style: SaaS
 * tags: recent
 * description: Navigation en controle segmente avec pastille qui glisse sous l element actif.
 * prompt: Create a segmented-control navigation: equal-width items inside a rounded track with a sliding white pill (translateX by index, spring easing) behind the active item; icons + labels, labels hidden below sm. Light and dark mode.
 */
'use client';
import { Calendar, Inbox, LayoutGrid, Settings } from 'lucide-react';
import { useState } from 'react';

const items = [
  { label: 'Board', icon: LayoutGrid },
  { label: 'Inbox', icon: Inbox },
  { label: 'Calendar', icon: Calendar },
  { label: 'Settings', icon: Settings },
];

export function SegmentedNavbar() {
  const [active, setActive] = useState(0);

  return (
    <nav aria-label="Views" className="relative grid w-full max-w-md grid-cols-4 rounded-2xl bg-zinc-100 p-1 dark:bg-zinc-900">
      <span
        aria-hidden
        className="absolute bottom-1 left-1 top-1 w-[calc((100%-.5rem)/4)] rounded-xl bg-white shadow-sm transition-transform duration-500 ease-[cubic-bezier(.34,1.4,.64,1)] dark:bg-zinc-700"
        style={{ transform: `translateX(${active * 100}%)` }}
      />
      {items.map(({ label, icon: Icon }, index) => (
        <button key={label} type="button" aria-current={active === index ? 'page' : undefined} onClick={() => setActive(index)} className={`relative flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors ${active === index ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'}`}>
          <Icon aria-hidden className="size-4" /><span className="hidden sm:inline">{label}</span><span className="sr-only sm:hidden">{label}</span>
        </button>
      ))}
    </nav>
  );
}
