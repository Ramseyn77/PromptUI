/**
 * @registry
 * name: Bookmark Checkbox
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Case à cocher en forme de marque-page qui se remplit en tombant avec un petit rebond, utilisée sur une liste d'articles.
 * prompt: Create a bookmark checkbox: a native checkbox visually hidden inside a label, rendered as a bookmark ribbon SVG that fills with color and drops down with a small bounce when checked (and lifts back when unchecked), focus-visible ring on the icon; shown on three article rows with titles, each with its own accessible label "Save “Title”"; a footer counts saved items. Reduced motion removes the bounce. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const articles = ['Designing for slow networks', 'The case for boring tech', 'How we cut our build time in half'];

export function BookmarkCheckbox() {
  const [saved, setSaved] = useState<string[]>([articles[1]]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-900">
      <style>{`@keyframes pui-bookmark-drop { 0% { transform: translateY(-10px) } 60% { transform: translateY(3px) } 100% { transform: translateY(0) } }`}</style>
      <ul>
        {articles.map((title) => {
          const on = saved.includes(title);
          return (
            <li key={title} className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-zinc-950 dark:text-white">{title}</p><p className="text-xs text-zinc-500">5 min read</p></div>
              <label className="relative cursor-pointer">
                <input type="checkbox" checked={on} onChange={() => setSaved((list) => (on ? list.filter((item) => item !== title) : [...list, title]))} className="peer sr-only" />
                <span className="sr-only">Save “{title}”</span>
                <svg viewBox="0 0 24 24" aria-hidden className={`size-7 rounded-md p-0.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 ${on ? 'text-indigo-600 motion-safe:animate-[pui-bookmark-drop_.4s_ease-out] dark:text-indigo-400' : 'text-zinc-400'}`}>
                  <path d="M6 3h12v18l-6-4-6 4z" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className="transition-[fill]" />
                </svg>
              </label>
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="border-t border-zinc-100 px-3 pt-2 text-xs text-zinc-500 dark:border-zinc-800">{saved.length} saved for later</p>
    </div>
  );
}
