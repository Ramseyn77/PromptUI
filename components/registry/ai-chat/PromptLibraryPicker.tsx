/**
 * @registry
 * name: Prompt Library Picker
 * category: AI Chat
 * style: SaaS
 * tags: featured, recent
 * description: Bibliothèque de prompts à variables : choisir un modèle, remplir les champs et insérer le prompt final.
 * prompt: Create a prompt library picker: a list of saved prompt templates with category chips and a search; selecting one shows its text with {{variables}} rendered as inline inputs (auto-width) the user fills in; a live preview of the final prompt and an "Insert into chat" button that is disabled until all variables are filled. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const templates = [
  { name: 'Cold email', tag: 'Sales', text: 'Write a short cold email to {{role}} at {{company}} about {{product}}.' },
  { name: 'Bug report', tag: 'Eng', text: 'Turn these notes into a bug report for {{component}}: {{notes}}' },
  { name: 'Tweet thread', tag: 'Marketing', text: 'Write a 5-tweet thread announcing {{feature}} for {{audience}}.' },
];

export function PromptLibraryPicker() {
  const [selected, setSelected] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({ role: 'CTO', company: 'Kora', product: '' });
  const [inserted, setInserted] = useState(false);
  const template = templates[selected];
  const parts = template.text.split(/(\{\{\w+\}\})/);
  const variables = parts.filter((part) => part.startsWith('{{')).map((part) => part.slice(2, -2));
  const ready = variables.every((name) => values[name]?.trim());
  const final = parts.map((part) => (part.startsWith('{{') ? values[part.slice(2, -2)] || `[${part.slice(2, -2)}]` : part)).join('');

  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-[11rem_1fr]">
      <ul role="listbox" aria-label="Prompt templates" className="space-y-1">
        {templates.map((item, index) => <li key={item.name} role="option" aria-selected={selected === index}><button type="button" onClick={() => { setSelected(index); setInserted(false); }} className={`w-full rounded-xl px-3 py-2 text-left ${selected === index ? 'bg-teal-50 ring-1 ring-teal-500 dark:bg-teal-400/10' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}><span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span><span className="text-[11px] text-zinc-500">{item.tag}</span></button></li>)}
      </ul>
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm leading-8 text-zinc-800 dark:text-zinc-200">
          {parts.map((part, index) => {
            if (!part.startsWith('{{')) return <span key={index}>{part}</span>;
            const name = part.slice(2, -2);
            return <input key={index} aria-label={name} value={values[name] ?? ''} onChange={(event) => { setValues((current) => ({ ...current, [name]: event.target.value })); setInserted(false); }} placeholder={name} size={Math.max(name.length, (values[name] ?? '').length) + 1} className="mx-0.5 rounded-md border border-dashed border-teal-400 bg-teal-50 px-1.5 py-0.5 text-sm text-teal-900 outline-none placeholder:text-teal-600/60 focus:border-solid dark:bg-teal-400/10 dark:text-teal-100" />;
          })}
        </p>
        <p className="mt-3 rounded-lg bg-zinc-50 p-2.5 text-xs text-zinc-500 dark:bg-zinc-900">{final}</p>
        <button type="button" disabled={!ready} onClick={() => setInserted(true)} className="mt-3 w-full rounded-lg bg-zinc-950 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">{inserted ? 'Inserted ✓' : 'Insert into chat'}</button>
      </div>
    </div>
  );
}
