/**
 * @registry
 * name: Indeterminate Tree
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Cases a cocher parent et enfants : le parent devient indetermine quand la selection est partielle.
 * prompt: Create nested permission checkboxes: each group has a parent checkbox that checks/unchecks all children and shows the indeterminate state (set via ref) when only some are checked; children are indented with a guide line; a summary shows the total selected. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const groups = { Projects: ['View', 'Create', 'Delete'], Billing: ['View invoices', 'Change plan'] } as const;
type Group = keyof typeof groups;

function Parent({ group, selected, toggleAll }: { group: Group; selected: string[]; toggleAll: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const count = groups[group].filter((item) => selected.includes(`${group}:${item}`)).length;
  const all = count === groups[group].length;
  useEffect(() => { if (ref.current) ref.current.indeterminate = count > 0 && !all; }, [count, all]);
  return <label className="flex items-center gap-2.5 text-sm font-semibold text-zinc-900 dark:text-white"><input ref={ref} type="checkbox" checked={all} onChange={toggleAll} className="size-4 accent-teal-600" />{group}<span className="text-xs font-normal text-zinc-400">{count}/{groups[group].length}</span></label>;
}

export function IndeterminateTree() {
  const [selected, setSelected] = useState<string[]>(['Projects:View', 'Projects:Create']);
  const toggle = (key: string) => setSelected((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));

  return (
    <fieldset className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <legend className="sr-only">Permissions</legend>
      {(Object.keys(groups) as Group[]).map((group) => {
        const keys = groups[group].map((item) => `${group}:${item}`);
        const allOn = keys.every((key) => selected.includes(key));
        return (
          <div key={group} className="mb-4 last:mb-0">
            <Parent group={group} selected={selected} toggleAll={() => setSelected((current) => (allOn ? current.filter((key) => !keys.includes(key)) : [...new Set([...current, ...keys])]))} />
            <div className="ml-2 mt-2 space-y-2 border-l border-zinc-200 pl-5 dark:border-zinc-800">
              {groups[group].map((item) => <label key={item} className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={selected.includes(`${group}:${item}`)} onChange={() => toggle(`${group}:${item}`)} className="size-4 accent-teal-600" />{item}</label>)}
            </div>
          </div>
        );
      })}
      <p className="mt-4 border-t border-zinc-200 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">{selected.length} permissions selected</p>
    </fieldset>
  );
}
