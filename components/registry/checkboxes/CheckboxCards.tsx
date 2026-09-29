/**
 * @registry
 * name: Checkbox Cards
 * category: Checkboxes
 * style: SaaS
 * tags: featured, recent
 * description: Options selectionnables en cartes avec icone, description et coche dans le coin.
 * prompt: Create multi-select option cards: each card is a <label> wrapping a visually hidden checkbox, with icon tile, title, description and a corner check badge; checked cards get a teal border/tint, focus-visible ring via has-[:focus-visible]. 1 column mobile, 2 from sm. Light and dark mode.
 */
'use client';
import { BarChart3, Check, Mail, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';

const options = [
  { id: 'analytics', icon: BarChart3, title: 'Analytics', text: 'Dashboards and reports' },
  { id: 'email', icon: Mail, title: 'Email', text: 'Campaigns and automations' },
  { id: 'team', icon: Users, title: 'Team', text: 'Roles and permissions' },
  { id: 'security', icon: ShieldCheck, title: 'Security', text: 'SSO and audit logs' },
];

export function CheckboxCards() {
  const [checked, setChecked] = useState<string[]>(['analytics', 'team']);

  return (
    <fieldset className="w-full max-w-lg">
      <legend className="text-sm font-semibold text-zinc-900 dark:text-white">Which modules do you need?</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map(({ id, icon: Icon, title, text }) => {
          const on = checked.includes(id);
          return (
            <label key={id} className={`relative flex cursor-pointer gap-3 rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${on ? 'border-teal-500 bg-teal-500/5' : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950'}`}>
              <input type="checkbox" className="sr-only" checked={on} onChange={() => setChecked((current) => (on ? current.filter((item) => item !== id) : [...current, id]))} />
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${on ? 'bg-teal-600 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}><Icon aria-hidden className="size-5" /></span>
              <span><span className="block text-sm font-semibold text-zinc-900 dark:text-white">{title}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">{text}</span></span>
              <span aria-hidden className={`absolute right-3 top-3 grid size-5 place-items-center rounded-full border transition ${on ? 'border-teal-600 bg-teal-600 text-white' : 'border-zinc-300 dark:border-zinc-600'}`}>{on && <Check className="size-3" />}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
