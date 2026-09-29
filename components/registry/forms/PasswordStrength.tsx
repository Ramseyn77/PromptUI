/**
 * @registry
 * name: Password Strength
 * category: Forms
 * style: Minimal
 * tags: featured, recent
 * description: Champ mot de passe avec jauge de robustesse en 4 segments et regles cochees en direct.
 * prompt: Create a new-password field with a 4-segment strength meter (colors rose → amber → teal → emerald with a text label) and a live checklist of rules (8+ chars, uppercase, number, symbol) that tick as they're met; aria-describedby links the checklist, strength announced politely. Light and dark mode.
 */
'use client';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

const rules = [
  { label: 'At least 8 characters', test: (value: string) => value.length >= 8 },
  { label: 'One uppercase letter', test: (value: string) => /[A-Z]/.test(value) },
  { label: 'One number', test: (value: string) => /\d/.test(value) },
  { label: 'One symbol', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];
const levels = [['Too weak', 'bg-rose-500'], ['Weak', 'bg-rose-500'], ['Fair', 'bg-amber-500'], ['Good', 'bg-teal-500'], ['Strong', 'bg-emerald-500']];

export function PasswordStrength() {
  const [value, setValue] = useState('Prompt1');
  const score = rules.filter((rule) => rule.test(value)).length;
  const [label, color] = levels[score];

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="new-password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">New password</label>
      <input id="new-password" type="password" value={value} onChange={(event) => setValue(event.target.value)} aria-describedby="password-rules" autoComplete="new-password" className="mt-1.5 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" />
      <div aria-hidden className="mt-3 grid grid-cols-4 gap-1.5">{[1, 2, 3, 4].map((segment) => <span key={segment} className={`h-1.5 rounded-full transition-colors ${segment <= score ? color : 'bg-zinc-200 dark:bg-zinc-800'}`} />)}</div>
      <p aria-live="polite" className="mt-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">Strength: {label}</p>
      <ul id="password-rules" className="mt-3 space-y-1.5">
        {rules.map((rule) => {
          const ok = rule.test(value);
          return <li key={rule.label} className={`flex items-center gap-2 text-sm ${ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-400'}`}>{ok ? <Check aria-hidden className="size-4" /> : <X aria-hidden className="size-4" />}{rule.label}<span className="sr-only">{ok ? ' (met)' : ' (not met)'}</span></li>;
        })}
      </ul>
    </div>
  );
}
