/**
 * @registry
 * name: Validated Checkbox
 * category: Checkboxes
 * style: Minimal
 * tags: recent
 * description: Case obligatoire façon validator daisyUI : erreur en rouge au submit, puis vert une fois cochée.
 * prompt: Create a daisyUI "validator"-style required checkbox in a small form: before submit it is neutral; submitting unchecked turns the box and text rose with an error message linked via aria-describedby and aria-invalid; checking it turns it emerald with a "Thanks" hint. Submit shows a success line. Light and dark mode.
 */
'use client';
import { useId, useState, type FormEvent } from 'react';

export function ValidatedCheckbox() {
  const id = useId();
  const [checked, setChecked] = useState(false);
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);
  const invalid = tried && !checked;

  function submit(event: FormEvent) {
    event.preventDefault();
    setTried(true);
    setDone(checked);
  }

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          required
          aria-invalid={invalid}
          aria-describedby={`${id}-hint`}
          checked={checked}
          onChange={(event) => { setChecked(event.target.checked); setDone(false); }}
          className={`mt-0.5 size-5 rounded ${invalid ? 'accent-rose-600 outline outline-2 outline-rose-500' : checked && tried ? 'accent-emerald-600' : 'accent-teal-600'}`}
        />
        <span className={`text-sm ${invalid ? 'text-rose-700 dark:text-rose-400' : 'text-zinc-700 dark:text-zinc-300'}`}>I have read the <a href="#terms" className="font-medium underline underline-offset-2">data processing agreement</a>.</span>
      </label>
      <p id={`${id}-hint`} aria-live="polite" className={`mt-2 pl-8 text-xs ${invalid ? 'text-rose-600 dark:text-rose-400' : checked && tried ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500'}`}>
        {invalid ? 'You must accept to continue.' : checked && tried ? 'Thanks, you are all set.' : 'Required'}
      </p>
      <button type="submit" className="mt-4 w-full rounded-lg bg-zinc-950 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">Continue</button>
      {done && <p className="mt-2 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400">Agreement saved.</p>}
    </form>
  );
}
