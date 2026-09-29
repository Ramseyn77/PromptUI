/**
 * @registry
 * name: Expand Icon Button
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Boutons icones ronds qui s elargissent au survol pour reveler leur libelle.
 * prompt: Create a row of circular icon buttons that expand horizontally on hover/focus-visible to reveal a text label (max-width transition from 0), each with its own accent color; aria-label always present so collapsed state stays accessible. Light and dark mode.
 */
import { Download, Heart, Share2 } from 'lucide-react';

const actions = [
  { icon: Heart, label: 'Save', tone: 'hover:bg-rose-500 focus-visible:bg-rose-500' },
  { icon: Share2, label: 'Share', tone: 'hover:bg-sky-500 focus-visible:bg-sky-500' },
  { icon: Download, label: 'Download', tone: 'hover:bg-teal-500 focus-visible:bg-teal-500' },
];

export function ExpandIconButton() {
  return (
    <div className="flex items-center gap-3">
      {actions.map(({ icon: Icon, label, tone }) => (
        <button key={label} type="button" aria-label={label} className={`group flex h-12 items-center overflow-hidden rounded-full bg-zinc-100 px-3.5 text-zinc-700 transition-all duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none dark:bg-zinc-800 dark:text-zinc-200 ${tone}`}>
          <Icon aria-hidden className="size-5 shrink-0" />
          <span aria-hidden className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-24 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-24 group-focus-visible:opacity-100">{label}</span>
        </button>
      ))}
    </div>
  );
}
