/**
 * @registry
 * name: Retro Checkbox
 * category: Checkboxes
 * style: Dark
 * tags: recent
 * description: Cases à cocher style terminal rétro [x] / [ ] en police mono verte avec curseur clignotant sur la ligne active.
 * prompt: Create retro terminal checkboxes: a green-on-black monospace panel listing install options as "[x] option" / "[ ] option" lines; each line is a real checkbox (hidden input inside label) toggled by click or Space, the focused line shows a blinking block cursor and inverse highlight; a footer prints "3 packages selected". Same look in both themes.
 */
'use client';
import { useState } from 'react';

const options = ['typescript', 'eslint', 'tailwindcss', 'vitest', 'storybook'];

export function RetroCheckbox() {
  const [on, setOn] = useState<string[]>(['typescript', 'tailwindcss']);

  return (
    <fieldset className="w-full max-w-sm rounded-xl bg-black p-4 font-mono text-sm text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,.15)] ring-1 ring-emerald-500/30">
      <style>{`@keyframes pui-cursor{50%{opacity:0}}`}</style>
      <legend className="sr-only">Packages to install</legend>
      <p className="text-emerald-600">$ create-app --interactive</p>
      <p className="mt-1 text-emerald-300">? Select packages (space to toggle)</p>
      <div className="mt-2">
        {options.map((option) => {
          const checked = on.includes(option);
          return (
            <label key={option} className="group flex cursor-pointer items-center gap-2 px-1 has-[:focus-visible]:bg-emerald-400 has-[:focus-visible]:text-black">
              <input type="checkbox" className="sr-only" checked={checked} onChange={() => setOn((list) => (checked ? list.filter((item) => item !== option) : [...list, option]))} />
              <span aria-hidden>{checked ? '[x]' : '[ ]'}</span>{option}
              <span aria-hidden className="ml-auto hidden h-4 w-2 bg-current motion-safe:animate-[pui-cursor_1s_steps(1)_infinite] group-has-[:focus-visible]:block" />
            </label>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-emerald-600">✔ {on.length} package{on.length === 1 ? '' : 's'} selected</p>
    </fieldset>
  );
}
