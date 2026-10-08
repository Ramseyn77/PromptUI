/**
 * @registry
 * name: Neon Checkbox
 * category: Checkboxes
 * style: Dark
 * tags: recent
 * description: Cases à cocher néon lumineuses qui s'allument avec un halo coloré sur fond sombre.
 * prompt: Create neon checkboxes on a dark panel: sr-only inputs with square boxes outlined in cyan/magenta/lime; when checked the box fills and glows (layered box-shadows) and the label text lights up with a text-shadow. Focus ring included; the panel stays dark in both themes.
 */
'use client';
import { useState } from 'react';

const options = [['Lasers', '#22d3ee'], ['Synths', '#e879f9'], ['Fog', '#a3e635']];

export function NeonCheckbox() {
  const [on, setOn] = useState<string[]>(['Synths']);

  return (
    <fieldset className="space-y-4 rounded-3xl bg-zinc-950 px-8 py-7">
      <legend className="sr-only">Stage effects</legend>
      {options.map(([label, color]) => {
        const checked = on.includes(label);
        return (
          <label key={label} className="flex cursor-pointer items-center gap-4 font-mono text-sm uppercase tracking-[.2em]">
            <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => setOn((current) => (checked ? current.filter((item) => item !== label) : [...current, label]))} />
            <span className="size-5 rounded-sm border-2 transition duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-white" style={{ borderColor: color, background: checked ? color : 'transparent', boxShadow: checked ? `0 0 8px ${color}, 0 0 20px ${color}` : 'none' }} />
            <span className="transition duration-300" style={{ color: checked ? color : '#71717a', textShadow: checked ? `0 0 10px ${color}` : 'none' }}>{label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
