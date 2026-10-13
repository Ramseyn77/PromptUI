/**
 * @registry
 * name: Checkbox Sizes Colors
 * category: Checkboxes
 * style: SaaS
 * tags: recent
 * description: Planche de cases à cocher façon daisyUI : quatre tailles, six couleurs sémantiques, états désactivé et indéterminé, avec bascule globale.
 * prompt: Create a checkbox showcase inspired by daisyUI: a row of four sizes (xs, sm, md, lg), a row of six semantic colors (primary, secondary, accent, success, warning, error) using accent-color on native inputs, a disabled checked and disabled unchecked pair, and an indeterminate "parent" that controls three children (sets indeterminate via ref); a "Check all" toggle button flips every enabled checkbox; each input has a visible label. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const sizes = [['xs', 'size-3'], ['sm', 'size-4'], ['md', 'size-5'], ['lg', 'size-6']];
const colors = [['Primary', 'accent-indigo-600'], ['Secondary', 'accent-pink-500'], ['Accent', 'accent-teal-500'], ['Success', 'accent-emerald-600'], ['Warning', 'accent-amber-500'], ['Error', 'accent-rose-600']];
const children = ['Email', 'Push', 'SMS'];

export function CheckboxSizesColors() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ md: true, Primary: true, Success: true, Email: true });
  const parentRef = useRef<HTMLInputElement>(null);
  const childCount = children.filter((name) => checked[name]).length;
  const set = (key: string, value: boolean) => setChecked((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    if (parentRef.current) parentRef.current.indeterminate = childCount > 0 && childCount < children.length;
  }, [childCount]);

  function checkAll() {
    const all = [...sizes.map(([key]) => key), ...colors.map(([key]) => key), ...children];
    const every = all.every((key) => checked[key]);
    setChecked(Object.fromEntries(all.map((key) => [key, !every])));
  }

  const label = 'flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300';
  return (
    <div className="w-full max-w-lg space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between"><p className="text-sm font-semibold text-zinc-950 dark:text-white">Checkbox</p><button type="button" onClick={checkAll} className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">Toggle all</button></div>
      <fieldset><legend className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Sizes</legend><div className="mt-2 flex flex-wrap items-center gap-4">{sizes.map(([key, size]) => <label key={key} className={label}><input type="checkbox" checked={!!checked[key]} onChange={(event) => set(key, event.target.checked)} className={`${size} accent-zinc-900 dark:accent-zinc-100`} />{key}</label>)}</div></fieldset>
      <fieldset><legend className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Colors</legend><div className="mt-2 grid grid-cols-3 gap-3">{colors.map(([key, accent]) => <label key={key} className={label}><input type="checkbox" checked={!!checked[key]} onChange={(event) => set(key, event.target.checked)} className={`size-4 ${accent}`} />{key}</label>)}</div></fieldset>
      <fieldset><legend className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">States</legend><div className="mt-2 flex flex-wrap gap-4"><label className={`${label} opacity-50`}><input type="checkbox" checked disabled readOnly className="size-4" />Disabled on</label><label className={`${label} opacity-50`}><input type="checkbox" disabled className="size-4" />Disabled off</label></div></fieldset>
      <fieldset>
        <legend className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Indeterminate</legend>
        <label className={`${label} mt-2 font-semibold`}><input ref={parentRef} type="checkbox" checked={childCount === children.length} onChange={(event) => children.forEach((name) => set(name, event.target.checked))} className="size-4 accent-indigo-600" />All channels</label>
        <div className="ml-5 mt-2 flex gap-4">{children.map((name) => <label key={name} className={label}><input type="checkbox" checked={!!checked[name]} onChange={(event) => set(name, event.target.checked)} className="size-4 accent-indigo-600" />{name}</label>)}</div>
      </fieldset>
    </div>
  );
}
