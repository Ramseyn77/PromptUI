/**
 * @registry
 * name: Chip Checkboxes
 * category: Checkboxes
 * style: Gradient
 * tags: recent
 * description: Puces cochables façon Mantine Chip : une coche glisse dans la puce et la teinte change.
 * prompt: Create Mantine-style chip checkboxes: pill-shaped labels wrapping hidden checkboxes; when checked a check icon slides in from the left (width + opacity transition) and the chip fills with a teal-to-sky gradient and white text; focus ring via has-[:focus-visible]. Wraps on small screens. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const tags = ['React', 'Vue', 'Svelte', 'Solid', 'Angular', 'Qwik', 'Astro'];

export function ChipCheckboxes() {
  const [on, setOn] = useState<string[]>(['React', 'Astro']);

  return (
    <fieldset className="max-w-sm">
      <legend className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Frameworks you use</legend>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const checked = on.includes(tag);
          return (
            <label key={tag} className={`inline-flex cursor-pointer items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${checked ? 'border-transparent bg-gradient-to-r from-teal-500 to-sky-500 text-white' : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'}`}>
              <input type="checkbox" className="sr-only" checked={checked} onChange={() => setOn((list) => (checked ? list.filter((item) => item !== tag) : [...list, tag]))} />
              <span aria-hidden className={`overflow-hidden transition-all duration-200 ${checked ? 'mr-1.5 w-4 opacity-100' : 'w-0 opacity-0'}`}><Check className="size-4" /></span>
              {tag}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
