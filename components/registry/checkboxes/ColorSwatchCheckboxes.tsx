/**
 * @registry
 * name: Color Swatch Checkboxes
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Selection multiple de couleurs par pastilles, coche contrastee automatique et resume textuel.
 * prompt: Create a multi-select color filter: round swatches as sr-only checkboxes with visible names on hover (title) and in the accessible label; checked swatches show a ring and a check whose color adapts to the swatch luminance (white on dark, black on light); summary line lists chosen colors. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const swatches = [['Black', '#18181b'], ['White', '#fafafa'], ['Sand', '#e7d8c1'], ['Olive', '#65743a'], ['Teal', '#0d9488'], ['Coral', '#fb7185'], ['Navy', '#1e3a8a']];

function isLight(hex: string) {
  const [r, g, b] = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
  return r * 0.299 + g * 0.587 + b * 0.114 > 160;
}

export function ColorSwatchCheckboxes() {
  const [picked, setPicked] = useState(['Sand', 'Teal']);

  return (
    <fieldset className="w-full max-w-sm">
      <legend className="text-sm font-semibold text-zinc-900 dark:text-white">Color</legend>
      <div className="mt-3 flex flex-wrap gap-3">
        {swatches.map(([name, hex]) => {
          const on = picked.includes(name);
          return (
            <label key={name} title={name} className="cursor-pointer">
              <input type="checkbox" className="peer sr-only" checked={on} onChange={() => setPicked((current) => (on ? current.filter((item) => item !== name) : [...current, name]))} />
              <span className={`grid size-9 place-items-center rounded-full border border-black/10 ring-offset-2 ring-offset-white transition peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 dark:border-white/15 dark:ring-offset-zinc-950 ${on ? 'ring-2 ring-zinc-900 dark:ring-white' : ''}`} style={{ background: hex }}>
                {on && <Check aria-hidden className={`size-4 ${isLight(hex) ? 'text-zinc-900' : 'text-white'}`} />}
              </span>
              <span className="sr-only">{name}</span>
            </label>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{picked.length ? `Selected: ${picked.join(', ')}` : 'All colors'}</p>
    </fieldset>
  );
}
