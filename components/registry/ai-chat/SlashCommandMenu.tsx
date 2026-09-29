/**
 * @registry
 * name: Slash Command Menu
 * category: AI Chat
 * style: SaaS
 * tags: featured, recent
 * description: Saisie qui ouvre un menu de commandes quand on tape « / », avec filtre et navigation au clavier.
 * prompt: Create a chat input that opens a command menu when the text starts with "/": commands (summarize, translate, explain code, tone) filter as you type, ArrowUp/ArrowDown move the active option (aria-activedescendant), Enter inserts it. role="combobox" + listbox. Light and dark mode.
 */
'use client';
import { Code2, FileText, Languages, Smile } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const commands = [
  { id: 'summarize', icon: FileText, label: 'Summarize', hint: 'Condense the thread' },
  { id: 'translate', icon: Languages, label: 'Translate', hint: 'Into any language' },
  { id: 'explain', icon: Code2, label: 'Explain code', hint: 'Line by line' },
  { id: 'tone', icon: Smile, label: 'Change tone', hint: 'Friendlier or formal' },
];

export function SlashCommandMenu() {
  const [value, setValue] = useState('/');
  const [active, setActive] = useState(0);
  const open = value.startsWith('/') && !value.includes(' ');
  const matches = commands.filter((command) => command.id.startsWith(value.slice(1).toLowerCase()));

  function pick(index: number) {
    setValue(`/${matches[index].id} `);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!open || !matches.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((index) => (index + 1) % matches.length); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((index) => (index - 1 + matches.length) % matches.length); }
    if (event.key === 'Enter') { event.preventDefault(); pick(active); }
  }

  return (
    <div className="w-full max-w-md">
      {open && matches.length > 0 && (
        <ul id="slash-commands" role="listbox" aria-label="Commands" className="mb-2 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {matches.map(({ id, icon: Icon, label, hint }, index) => (
            <li key={id} id={`slash-${id}`} role="option" aria-selected={index === active} onMouseEnter={() => setActive(index)} onMouseDown={(event) => { event.preventDefault(); pick(index); }} className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 ${index === active ? 'bg-zinc-100 dark:bg-zinc-900' : ''}`}>
              <span className="grid size-8 place-items-center rounded-lg border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"><Icon aria-hidden className="size-4" /></span>
              <span><span className="block text-sm font-medium text-zinc-900 dark:text-white">{label}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">{hint}</span></span>
              <kbd className="ml-auto font-mono text-[11px] text-zinc-400">/{id}</kbd>
            </li>
          ))}
        </ul>
      )}
      <input
        role="combobox"
        aria-expanded={open}
        aria-controls="slash-commands"
        aria-activedescendant={open && matches[active] ? `slash-${matches[active].id}` : undefined}
        aria-label="Message, type / for commands"
        value={value}
        onChange={(event) => { setValue(event.target.value); setActive(0); }}
        onKeyDown={onKeyDown}
        className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
      />
    </div>
  );
}
