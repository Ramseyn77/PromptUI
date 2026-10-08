/**
 * @registry
 * name: Text Toggle Group
 * category: Toggle
 * style: SaaS
 * tags: recent
 * description: Barre d'outils de mise en forme : groupes de boutons bascule exclusifs et cumulables.
 * prompt: Create a rich-text toolbar with toggle groups: Bold/Italic/Underline as independent toggle buttons (aria-pressed) and Left/Center/Right alignment as an exclusive group (role="radiogroup" of role="radio" buttons); a preview paragraph reflects the state. Light and dark mode.
 */
'use client';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react';
import { useState } from 'react';

export function TextToggleGroup() {
  const [marks, setMarks] = useState({ bold: true, italic: false, underline: false });
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const button = (active: boolean) => `grid size-9 place-items-center rounded-lg transition ${active ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`;

  return (
    <div className="w-full max-w-sm">
      <div role="toolbar" aria-label="Text formatting" className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
        {([['bold', Bold], ['italic', Italic], ['underline', Underline]] as const).map(([key, Icon]) => <button key={key} type="button" aria-label={key} aria-pressed={marks[key]} onClick={() => setMarks((current) => ({ ...current, [key]: !current[key] }))} className={button(marks[key])}><Icon className="size-4" /></button>)}
        <span aria-hidden className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
        <div role="radiogroup" aria-label="Alignment" className="flex gap-1">
          {([['left', AlignLeft], ['center', AlignCenter], ['right', AlignRight]] as const).map(([key, Icon]) => <button key={key} type="button" role="radio" aria-label={`Align ${key}`} aria-checked={align === key} onClick={() => setAlign(key)} className={button(align === key)}><Icon className="size-4" /></button>)}
        </div>
      </div>
      <p className={`mt-4 rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-800 dark:border-zinc-700 dark:text-zinc-200 ${marks.bold ? 'font-bold' : ''} ${marks.italic ? 'italic' : ''} ${marks.underline ? 'underline' : ''} ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>The quick brown fox jumps over the lazy dog.</p>
    </div>
  );
}
