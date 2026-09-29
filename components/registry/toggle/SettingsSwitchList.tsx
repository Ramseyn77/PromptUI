/**
 * @registry
 * name: Settings Switch List
 * category: Toggle
 * style: SaaS
 * tags: featured, recent
 * description: Liste de reglages avec interrupteurs, descriptions, interrupteur maitre et enregistrement automatique.
 * prompt: Create a notification settings card: a master switch that enables/disables the whole group, then rows (label + description) each with a switch (button role="switch", aria-checked, aria-labelledby/-describedby); child switches are disabled when the master is off; an "All changes saved" status appears after each change. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const rows = [
  { id: 'mentions', label: 'Mentions', text: 'When someone @mentions you' },
  { id: 'comments', label: 'Comments', text: 'Replies on your threads' },
  { id: 'digest', label: 'Weekly digest', text: 'A summary every Monday' },
];

function Switch({ checked, onChange, disabled, labelledBy, describedBy }: { checked: boolean; onChange: () => void; disabled?: boolean; labelledBy: string; describedBy?: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-labelledby={labelledBy} aria-describedby={describedBy} disabled={disabled} onClick={onChange} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:focus-visible:ring-offset-zinc-950 ${checked ? 'bg-teal-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
      <span className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export function SettingsSwitchList() {
  const [master, setMaster] = useState(true);
  const [values, setValues] = useState<Record<string, boolean>>({ mentions: true, comments: true, digest: false });
  const [saved, setSaved] = useState(false);
  const flash = () => { setSaved(true); window.setTimeout(() => setSaved(false), 1500); };

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 p-4 dark:border-zinc-800">
        <div><p id="master-label" className="font-semibold text-zinc-900 dark:text-white">Email notifications</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Turn off to pause all emails</p></div>
        <Switch checked={master} onChange={() => { setMaster((value) => !value); flash(); }} labelledBy="master-label" />
      </div>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
        {rows.map((row) => (
          <li key={row.id} className={`flex items-center justify-between gap-4 p-4 transition-opacity ${master ? '' : 'opacity-60'}`}>
            <div><p id={`${row.id}-label`} className="text-sm font-medium text-zinc-900 dark:text-white">{row.label}</p><p id={`${row.id}-text`} className="text-xs text-zinc-500 dark:text-zinc-400">{row.text}</p></div>
            <Switch checked={master && values[row.id]} disabled={!master} onChange={() => { setValues((current) => ({ ...current, [row.id]: !current[row.id] })); flash(); }} labelledBy={`${row.id}-label`} describedBy={`${row.id}-text`} />
          </li>
        ))}
      </ul>
      <p role="status" className={`px-4 pb-3 text-xs text-emerald-600 transition-opacity dark:text-emerald-400 ${saved ? 'opacity-100' : 'opacity-0'}`}>All changes saved</p>
    </section>
  );
}
