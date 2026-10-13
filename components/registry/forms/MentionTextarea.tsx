/**
 * @registry
 * name: Mention Textarea
 * category: Forms
 * style: SaaS
 * tags: featured, recent
 * description: Zone de commentaire avec mentions @ : liste de suggestions filtrée au clavier, insertion du nom et puces des personnes mentionnées.
 * prompt: Create a comment textarea with @mentions: typing "@" followed by letters opens a suggestion listbox under the field filtered by name (avatar initials, name, role); ArrowUp/Down moves the active option (aria-activedescendant), Enter or Tab inserts "@Name " at the caret, Escape closes; mentioned people appear as chips under the field "Will notify: …"; Comment button disabled when empty. Light and dark mode.
 */
'use client';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

const people = [['Ava Chen', 'Design lead'], ['Leo Martin', 'Engineering'], ['Maya Patel', 'Product'], ['Noah Kim', 'Data'], ['Awa Diop', 'Marketing']];

export function MentionTextarea() {
  const uid = useId();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('Looks great! cc @Ma');
  const [caret, setCaret] = useState(value.length);
  const [active, setActive] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const match = value.slice(0, caret).match(/@(\w*)$/);
  const matches = match && !dismissed ? people.filter(([name]) => name.toLowerCase().startsWith(match[1].toLowerCase()) || name.split(' ')[1].toLowerCase().startsWith(match[1].toLowerCase())) : [];
  const mentioned = people.filter(([name]) => value.includes(`@${name}`));

  function insert(name: string) {
    const start = caret - (match?.[0].length ?? 0);
    const next = `${value.slice(0, start)}@${name} ${value.slice(caret)}`;
    setValue(next);
    const position = start + name.length + 2;
    setCaret(position);
    window.requestAnimationFrame(() => { ref.current?.setSelectionRange(position, position); ref.current?.focus(); });
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!matches.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((active + 1) % matches.length); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setActive((active - 1 + matches.length) % matches.length); }
    else if (event.key === 'Enter' || event.key === 'Tab') { event.preventDefault(); insert(matches[Math.min(active, matches.length - 1)][0]); }
    else if (event.key === 'Escape') setDismissed(true);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <label htmlFor={`${uid}-input`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Comment</label>
      <textarea ref={ref} id={`${uid}-input`} rows={3} value={value} role="combobox" aria-expanded={matches.length > 0} aria-controls={`${uid}-list`} aria-autocomplete="list" aria-activedescendant={matches.length ? `${uid}-opt-${Math.min(active, matches.length - 1)}` : undefined} onChange={(event) => { setValue(event.target.value); setCaret(event.target.selectionStart); setActive(0); setDismissed(false); }} onSelect={(event) => setCaret(event.currentTarget.selectionStart)} onKeyDown={onKeyDown} className="mt-1.5 w-full resize-none rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:text-zinc-100" />
      {matches.length > 0 && (
        <ul id={`${uid}-list`} role="listbox" aria-label="People" className="mt-1 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {matches.map(([name, role], index) => <li key={name} id={`${uid}-opt-${index}`} role="option" aria-selected={index === Math.min(active, matches.length - 1)} onMouseDown={(event) => { event.preventDefault(); insert(name); }} className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${index === Math.min(active, matches.length - 1) ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-500/15 dark:text-indigo-100' : 'text-zinc-700 dark:text-zinc-300'}`}><span className="grid size-6 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">{name.split(' ').map((part) => part[0]).join('')}</span>{name}<span className="ml-auto text-xs text-zinc-400">{role}</span></li>)}
        </ul>
      )}
      <div className="mt-3 flex items-center gap-2">
        <p className="flex min-w-0 flex-1 flex-wrap items-center gap-1 text-xs text-zinc-500">{mentioned.length ? <>Will notify:{mentioned.map(([name]) => <span key={name} className="rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">{name}</span>)}</> : 'Type @ to mention someone'}</p>
        <button type="button" disabled={!value.trim()} className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-40">Comment</button>
      </div>
    </div>
  );
}
