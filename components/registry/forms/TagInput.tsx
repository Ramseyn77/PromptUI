/**
 * @registry
 * name: Tag Input
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Champ de saisie d etiquettes : Entree ou virgule pour ajouter, doublons refuses, limite de 6.
 * prompt: Create a tag input: typing then Enter or comma adds a trimmed lowercase tag chip (duplicates rejected with a brief shake, max 6 tags with a counter), Backspace on empty input removes the last tag, each chip has a remove button. Label and hint via aria-describedby. Light and dark mode.
 */
'use client';
import { X } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const max = 6;

export function TagInput() {
  const [tags, setTags] = useState(['design', 'react']);
  const [draft, setDraft] = useState('');
  const [shake, setShake] = useState(false);

  function onKey(event: KeyboardEvent<HTMLInputElement>) {
    if ((event.key === 'Enter' || event.key === ',') && draft.trim()) {
      event.preventDefault();
      const tag = draft.trim().toLowerCase();
      if (tags.includes(tag) || tags.length >= max) { setShake(true); window.setTimeout(() => setShake(false), 400); return; }
      setTags((current) => [...current, tag]);
      setDraft('');
    }
    if (event.key === 'Backspace' && !draft) setTags((current) => current.slice(0, -1));
  }

  return (
    <>
      <style>{`@keyframes pui-shake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}`}</style>
      <div className="w-full max-w-sm">
        <label htmlFor="tag-input" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tags</label>
        <div className={`mt-1.5 flex flex-wrap gap-1.5 rounded-xl border border-zinc-300 bg-white p-1.5 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/15 dark:border-zinc-700 dark:bg-zinc-900 ${shake ? 'motion-safe:animate-[pui-shake_.3s_ease-in-out]' : ''}`}>
          {tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-lg bg-zinc-100 py-1 pl-2 pr-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">#{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => setTags((current) => current.filter((item) => item !== tag))} className="grid size-4 place-items-center rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"><X className="size-3" /></button></span>)}
          <input id="tag-input" value={draft} onChange={(event) => setDraft(event.target.value.replace(',', ''))} onKeyDown={onKey} aria-describedby="tag-hint" disabled={tags.length >= max} placeholder={tags.length >= max ? 'Limit reached' : 'Add a tag…'} className="min-w-24 flex-1 bg-transparent px-1.5 py-1 text-sm text-zinc-900 outline-none disabled:cursor-not-allowed dark:text-white" />
        </div>
        <p id="tag-hint" className="mt-1.5 flex justify-between text-xs text-zinc-500 dark:text-zinc-400"><span>Press Enter or comma to add</span><span className="tabular-nums">{tags.length}/{max}</span></p>
      </div>
    </>
  );
}
