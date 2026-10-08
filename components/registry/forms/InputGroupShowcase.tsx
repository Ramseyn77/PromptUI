/**
 * @registry
 * name: Input Group Showcase
 * category: Forms
 * style: Minimal
 * tags: featured, recent
 * description: Champs avec addons façon shadcn : préfixe d'URL, recherche avec raccourci, montant avec devise, mot de passe et zone de message.
 * prompt: Create shadcn-style input groups sharing one bordered container per field with focus-within ring: URL field with "https://" prefix and ".com" suffix, search field with icon and a ⌘K kbd, amount field with currency select addon, password field with show/hide toggle button (aria-pressed), and a textarea with a footer toolbar (attach button, character counter, send button disabled when empty). Every field has a visible label. Light and dark mode.
 */
'use client';
import { ArrowUp, Eye, EyeOff, Paperclip, Search } from 'lucide-react';
import { useId, useState } from 'react';

const group = 'flex items-center overflow-hidden rounded-lg border border-zinc-300 bg-white transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-950';
const input = 'min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100';
const addon = 'flex items-center self-stretch bg-zinc-50 px-3 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400';
const label = 'mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200';

export function InputGroupShowcase() {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <form onSubmit={(event) => event.preventDefault()} className="grid w-full max-w-md gap-4">
      <div>
        <label htmlFor={`${id}-url`} className={label}>Website</label>
        <div className={group}><span className={`${addon} border-r border-zinc-300 dark:border-zinc-700`}>https://</span><input id={`${id}-url`} className={input} placeholder="acme" /><span className={`${addon} border-l border-zinc-300 dark:border-zinc-700`}>.com</span></div>
      </div>
      <div>
        <label htmlFor={`${id}-search`} className={label}>Search</label>
        <div className={group}><Search aria-hidden className="ml-3 size-4 text-zinc-400" /><input id={`${id}-search`} type="search" className={input} placeholder="Search docs…" /><kbd className="mr-2 rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[11px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">⌘K</kbd></div>
      </div>
      <div>
        <label htmlFor={`${id}-amount`} className={label}>Amount</label>
        <div className={group}>
          <span className="pl-3 text-sm text-zinc-500">€</span>
          <input id={`${id}-amount`} inputMode="decimal" className={`${input} tabular-nums`} placeholder="0.00" />
          <select aria-label="Currency" className="self-stretch border-l border-zinc-300 bg-zinc-50 px-2 text-sm text-zinc-700 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"><option>EUR</option><option>USD</option><option>XOF</option></select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-password`} className={label}>Password</label>
        <div className={group}>
          <input id={`${id}-password`} type={visible ? 'text' : 'password'} className={input} defaultValue="correct-horse" />
          <button type="button" aria-label="Show password" aria-pressed={visible} onClick={() => setVisible((value) => !value)} className="mr-1 grid size-8 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">{visible ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}</button>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={label}>Message</label>
        <div className={`${group} flex-col items-stretch`}>
          <textarea id={`${id}-message`} rows={3} maxLength={280} value={message} onChange={(event) => setMessage(event.target.value)} className={`${input} resize-none`} placeholder="Ask anything…" />
          <div className="flex items-center gap-2 border-t border-zinc-200 px-2 py-1.5 dark:border-zinc-800">
            <button type="button" aria-label="Attach file" className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Paperclip aria-hidden className="size-4" /></button>
            <span className="ml-auto text-xs tabular-nums text-zinc-400">{message.length}/280</span>
            <button type="submit" aria-label="Send" disabled={!message.trim()} className="grid size-7 place-items-center rounded-md bg-zinc-950 text-white disabled:opacity-30 dark:bg-white dark:text-zinc-950"><ArrowUp aria-hidden className="size-4" /></button>
          </div>
        </div>
      </div>
    </form>
  );
}
