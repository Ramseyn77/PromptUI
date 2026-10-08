/**
 * @registry
 * name: Newsletter Topics Form
 * category: Forms
 * style: Editorial
 * tags: recent
 * description: Préférences de newsletter : sujets à choisir en cartes, fréquence, format et aperçu de la prochaine édition.
 * prompt: Create newsletter preferences: topic cards (Design, Engineering, Product, Careers) as checkbox labels with emoji; a frequency radiogroup (Daily / Weekly / Monthly) and a format select (Full / Digest); a live sentence "You'll get a weekly digest about design and product" and Save / Unsubscribe from all buttons. Serif headings. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const topics = [['🎨', 'Design'], ['⚙️', 'Engineering'], ['🧭', 'Product'], ['💼', 'Careers']] as const;

export function NewsletterTopicsForm() {
  const uid = useId();
  const [on, setOn] = useState<string[]>(['Design', 'Product']);
  const [frequency, setFrequency] = useState('weekly');
  const [format, setFormat] = useState('digest');
  const list = on.map((topic) => topic.toLowerCase());
  const joined = list.length > 1 ? `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}` : list[0];

  return (
    <form onSubmit={(event) => event.preventDefault()} className="w-full max-w-md rounded-3xl bg-[#fbf9f4] p-6 dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800">
      <h3 className="font-serif text-2xl text-zinc-950 dark:text-zinc-50">Your newsletter</h3>
      <fieldset className="mt-4"><legend className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Topics</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">{topics.map(([emoji, name]) => { const checked = on.includes(name); return <label key={name} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-zinc-900 ${checked ? 'border-zinc-900 bg-white font-medium text-zinc-900 dark:border-white dark:bg-zinc-900 dark:text-white' : 'border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400'}`}><input type="checkbox" className="sr-only" checked={checked} onChange={() => setOn((value) => (checked ? value.filter((item) => item !== name) : [...value, name]))} /><span aria-hidden>{emoji}</span>{name}</label>; })}</div>
      </fieldset>
      <fieldset className="mt-4"><legend className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Frequency</legend>
        <div className="mt-2 flex gap-4">{['daily', 'weekly', 'monthly'].map((value) => <label key={value} className="flex items-center gap-1.5 text-sm capitalize text-zinc-700 dark:text-zinc-300"><input type="radio" name={`${uid}-frequency`} checked={frequency === value} onChange={() => setFrequency(value)} className="accent-zinc-900 dark:accent-white" />{value}</label>)}</div>
      </fieldset>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Format<select value={format} onChange={(event) => setFormat(event.target.value)} className="mt-2 block w-full rounded-lg border border-zinc-300 bg-white px-2 py-2 text-sm font-normal normal-case tracking-normal text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"><option value="full">Full articles</option><option value="digest">Digest (5 min read)</option></select></label>
      <p aria-live="polite" className="mt-4 rounded-xl bg-white p-3 font-serif text-sm italic text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">{on.length ? `You’ll get a ${frequency} ${format === 'digest' ? 'digest' : 'edition'} about ${joined}.` : 'Pick at least one topic.'}</p>
      <div className="mt-4 flex items-center justify-between"><button type="button" onClick={() => setOn([])} className="text-xs text-zinc-500 underline">Unsubscribe from all</button><button type="submit" disabled={!on.length} className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">Save preferences</button></div>
    </form>
  );
}
