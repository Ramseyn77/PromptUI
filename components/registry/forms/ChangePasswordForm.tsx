/**
 * @registry
 * name: Change Password Form
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Changement de mot de passe : ancien, nouveau avec critères en direct, confirmation qui doit correspondre et déconnexion des autres appareils.
 * prompt: Create a change-password form: current password, new password with a live criteria list (8+ chars, number, symbol, different from current) whose items turn green with checks, confirm password showing "Passwords match" / "Don't match" (aria-invalid), a "Sign out other devices" checkbox, and Save enabled only when valid; show/hide toggles on fields. Light and dark mode.
 */
'use client';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { useId, useState } from 'react';

export function ChangePasswordForm() {
  const id = useId();
  const [current, setCurrent] = useState('hunter22');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const rules = [['At least 8 characters', next.length >= 8], ['Contains a number', /\d/.test(next)], ['Contains a symbol', /[^\w\s]/.test(next)], ['Different from current', !!next && next !== current]] as const;
  const matches = confirm.length > 0 && confirm === next;
  const valid = rules.every(([, ok]) => ok) && matches;
  const field = 'mt-1 flex items-center rounded-lg border bg-white pr-1 focus-within:ring-2 focus-within:ring-teal-500/20 dark:bg-zinc-950';

  return (
    <form onSubmit={(event) => { event.preventDefault(); if (valid) setSaved(true); }} className="w-full max-w-sm space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Change password</h3>
      {([['current', 'Current password', current, setCurrent], ['next', 'New password', next, setNext]] as const).map(([key, label, value, set]) => (
        <div key={key}>
          <label htmlFor={`${id}-${key}`} className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</label>
          <div className={`${field} border-zinc-300 dark:border-zinc-700`}><input id={`${id}-${key}`} type={show ? 'text' : 'password'} value={value} onChange={(event) => { set(event.target.value); setSaved(false); }} autoComplete={key === 'current' ? 'current-password' : 'new-password'} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100" />{key === 'next' && <button type="button" aria-label={show ? 'Hide passwords' : 'Show passwords'} aria-pressed={show} onClick={() => setShow((value) => !value)} className="grid size-8 place-items-center rounded text-zinc-400">{show ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}</button>}</div>
        </div>
      ))}
      <ul className="grid grid-cols-2 gap-1 text-xs">{rules.map(([label, ok]) => <li key={label} className={`flex items-center gap-1 ${ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`}>{ok ? <Check aria-hidden className="size-3.5" /> : <X aria-hidden className="size-3.5" />}{label}</li>)}</ul>
      <div>
        <label htmlFor={`${id}-confirm`} className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Confirm new password</label>
        <div className={`${field} ${confirm && !matches ? 'border-rose-500' : 'border-zinc-300 dark:border-zinc-700'}`}><input id={`${id}-confirm`} type={show ? 'text' : 'password'} value={confirm} aria-invalid={!!confirm && !matches} aria-describedby={`${id}-match`} onChange={(event) => setConfirm(event.target.value)} autoComplete="new-password" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100" /></div>
        <p id={`${id}-match`} aria-live="polite" className={`mt-1 text-xs ${matches ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{confirm ? (matches ? 'Passwords match' : 'Passwords don’t match') : ''}</p>
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" defaultChecked className="accent-teal-600" />Sign out of other devices</label>
      <button type="submit" disabled={!valid} className="w-full rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white disabled:opacity-40">{saved ? 'Password updated ✓' : 'Save password'}</button>
    </form>
  );
}
