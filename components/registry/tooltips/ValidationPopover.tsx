/**
 * @registry
 * name: Validation Popover
 * category: Tooltips
 * style: Gradient
 * tags: recent
 * description: Popover de règles de validation attaché à un champ nom d'utilisateur : règles cochées en direct et disponibilité.
 * prompt: Create a username field with a validation popover that appears while the field is focused (and is shown by default for the demo): a gradient-bordered card with an arrow listing rules (3–20 characters, letters/numbers/underscores only, starts with a letter, not taken) each turning from grey circle to green check live; "not taken" is simulated against a small list with a brief "checking…" state; the input is aria-describedby the rule list and aria-invalid when a rule fails after blur. Light and dark mode.
 */
'use client';
import { Check, Circle, Loader2 } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

const taken = ['admin', 'promptui', 'ava', 'design'];

export function ValidationPopover({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [value, setValue] = useState('ava');
  const [focused, setFocused] = useState(defaultOpen);
  const [touched, setTouched] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setChecking(true);
    const timer = window.setTimeout(() => setChecking(false), 450);
    return () => window.clearTimeout(timer);
  }, [value]);

  const rules = [
    { label: '3–20 characters', ok: value.length >= 3 && value.length <= 20 },
    { label: 'Letters, numbers and underscores only', ok: /^\w*$/.test(value) && value.length > 0 },
    { label: 'Starts with a letter', ok: /^[a-z]/i.test(value) },
    { label: 'Not already taken', ok: !checking && value.length > 0 && !taken.includes(value.toLowerCase()), pending: checking },
  ];
  const valid = rules.every((rule) => rule.ok);

  return (
    <div className="w-full max-w-xs">
      <label htmlFor={`${uid}-name`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Username</label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">@</span>
        <input id={`${uid}-name`} value={value} onChange={(event) => setValue(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); setTouched(true); }} aria-invalid={touched && !valid} aria-describedby={`${uid}-rules`} autoComplete="username" className={`w-full rounded-lg border bg-white py-2 pl-7 pr-3 text-sm text-zinc-900 outline-none focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 ${touched && !valid ? 'border-rose-500 focus:ring-rose-500/20' : valid ? 'border-emerald-500 focus:ring-emerald-500/20' : 'border-zinc-300 focus:ring-violet-500/20 dark:border-zinc-700'}`} />
      </div>
      <div className={`relative mt-3 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 p-px shadow-lg transition ${focused ? 'opacity-100' : 'pointer-events-none h-0 overflow-hidden opacity-0'}`}>
        <span aria-hidden className="absolute -top-1 left-6 size-2.5 rotate-45 bg-violet-500" />
        <ul id={`${uid}-rules`} aria-label="Username requirements" className="space-y-1.5 rounded-[11px] bg-white p-3 text-xs dark:bg-zinc-900">
          {rules.map((rule) => (
            <li key={rule.label} className={`flex items-center gap-2 ${rule.ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-500'}`}>
              {rule.pending ? <Loader2 aria-hidden className="size-3.5 motion-safe:animate-spin" /> : rule.ok ? <Check aria-hidden className="size-3.5" /> : <Circle aria-hidden className="size-3.5" />}
              {rule.label}<span className="sr-only">{rule.pending ? ': checking' : rule.ok ? ': met' : ': not met'}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-2 text-xs text-zinc-400">Try “ava”, then “ava_studio”.</p>
    </div>
  );
}
