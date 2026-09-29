/**
 * @registry
 * name: Settings Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Navigation de parametres par groupes qui devient un select sur mobile, avec panneau de contenu.
 * prompt: Create a settings layout: on md+ a left nav with grouped items (Account, Workspace) and an active indicator bar; below md the same items become a labeled <select> for compact navigation; the right panel shows the selected section title. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const groups = [
  { title: 'Account', items: ['Profile', 'Security', 'Notifications'] },
  { title: 'Workspace', items: ['General', 'Members', 'Billing', 'Integrations'] },
];

export function SettingsSidebar() {
  const [active, setActive] = useState('Security');

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 md:flex-row dark:border-zinc-800 dark:bg-zinc-950">
      <label className="md:hidden">
        <span className="sr-only">Settings section</span>
        <select value={active} onChange={(event) => setActive(event.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
          {groups.map((group) => <optgroup key={group.title} label={group.title}>{group.items.map((item) => <option key={item}>{item}</option>)}</optgroup>)}
        </select>
      </label>
      <nav aria-label="Settings" className="hidden w-48 shrink-0 space-y-5 md:block">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{group.title}</p>
            <ul className="mt-1.5 space-y-0.5">
              {group.items.map((item) => (
                <li key={item}><button type="button" aria-current={active === item ? 'page' : undefined} onClick={() => setActive(item)} className={`relative w-full rounded-lg px-3 py-1.5 text-left text-sm ${active === item ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}>{active === item && <span aria-hidden className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-teal-500" />}{item}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <section className="flex-1 rounded-xl border border-dashed border-zinc-200 p-5 dark:border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{active}</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage your {active.toLowerCase()} preferences.</p>
      </section>
    </div>
  );
}
