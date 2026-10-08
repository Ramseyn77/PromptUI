/**
 * @registry
 * name: Swap Icon Checkbox
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Cases à icône qui s'échangent en tournant (signet, étoile, épingle), façon swap daisyUI.
 * prompt: Create daisyUI-style "swap" checkboxes: three icon toggles (bookmark, star, pin) built on visually hidden checkboxes; when checked the outline icon rotates out and a filled colored icon rotates in (rotate + scale transition), with a visible focus ring on the wrapper and a text label for each. Reduced motion swaps instantly. Light and dark mode.
 */
'use client';
import { Bookmark, Pin, Star, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

const items: { label: string; icon: LucideIcon; tone: string }[] = [
  { label: 'Save', icon: Bookmark, tone: 'text-sky-500 fill-sky-500' },
  { label: 'Favorite', icon: Star, tone: 'text-amber-400 fill-amber-400' },
  { label: 'Pin', icon: Pin, tone: 'text-rose-500 fill-rose-500' },
];

export function SwapIconCheckbox() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ Favorite: true });

  return (
    <div className="flex gap-4">
      {items.map(({ label, icon: Icon, tone }) => {
        const on = !!checked[label];
        return (
          <label key={label} className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-2 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500">
            <input type="checkbox" className="sr-only" checked={on} onChange={() => setChecked((value) => ({ ...value, [label]: !on }))} />
            <span className="relative grid size-12 place-items-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <Icon aria-hidden className={`absolute size-6 text-zinc-400 transition duration-300 motion-reduce:transition-none ${on ? 'rotate-45 scale-0 opacity-0' : ''}`} />
              <Icon aria-hidden className={`absolute size-6 transition duration-300 motion-reduce:transition-none ${tone} ${on ? '' : '-rotate-45 scale-0 opacity-0'}`} />
            </span>
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
          </label>
        );
      })}
    </div>
  );
}
