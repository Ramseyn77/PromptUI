/**
 * @registry
 * name: Theme Controller Radios
 * category: Toggle
 * style: SaaS
 * tags: featured, recent
 * description: Choix de thème façon daisyUI theme-controller : vignettes de palette qui recolorent un aperçu.
 * prompt: Create a daisyUI theme-controller style picker: a radiogroup of theme swatch cards (Light, Dark, Cupcake, Forest, Synthwave) each showing four color dots; selecting one recolors a small preview card below (background, text, primary button, accent) using inline CSS variables; selected swatch has a ring and check. Keyboard arrows move between radios natively. Self-contained (does not change the site theme).
 */
'use client';
import { Check } from 'lucide-react';
import { useId, useState } from 'react';

const themes = {
  Light: { bg: '#ffffff', fg: '#18181b', primary: '#0d9488', accent: '#f59e0b' },
  Dark: { bg: '#18181b', fg: '#fafafa', primary: '#2dd4bf', accent: '#a78bfa' },
  Cupcake: { bg: '#faf7f5', fg: '#291334', primary: '#65c3c8', accent: '#ef9fbc' },
  Forest: { bg: '#171212', fg: '#e5e7da', primary: '#1eb854', accent: '#d99330' },
  Synthwave: { bg: '#1a103d', fg: '#f9f7fd', primary: '#e779c1', accent: '#58c7f3' },
} as const;
type Name = keyof typeof themes;

export function ThemeControllerRadios() {
  const [theme, setTheme] = useState<Name>('Cupcake');
  const group = useId();
  const t = themes[theme];

  return (
    <div className="w-full max-w-md">
      <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {(Object.keys(themes) as Name[]).map((name) => {
          const colors = themes[name];
          return (
            <label key={name} className={`relative cursor-pointer rounded-xl border p-2 text-center transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${theme === name ? 'border-teal-500 ring-1 ring-teal-500' : 'border-zinc-200 dark:border-zinc-800'}`} style={{ background: colors.bg, color: colors.fg }}>
              <input type="radio" name={group} className="sr-only" checked={theme === name} onChange={() => setTheme(name)} />
              <span aria-hidden className="flex justify-center gap-1">{Object.values(colors).slice(1).map((color) => <span key={color} className="size-2.5 rounded-full" style={{ background: color }} />)}</span>
              <span className="mt-1.5 block text-[11px] font-semibold">{name}</span>
              {theme === name && <Check aria-hidden className="absolute right-1 top-1 size-3 text-teal-500" />}
            </label>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl p-5 shadow-sm ring-1 ring-black/5 transition-colors duration-300" style={{ background: t.bg, color: t.fg }}>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: t.accent }}>Preview</p>
        <p className="mt-1 text-lg font-bold">Hello from {theme}</p>
        <p className="text-sm opacity-70">Every surface follows the chosen palette.</p>
        <button type="button" className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold" style={{ background: t.primary, color: t.bg }}>Primary action</button>
      </div>
    </div>
  );
}
