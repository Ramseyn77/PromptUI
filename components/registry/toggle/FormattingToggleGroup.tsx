/**
 * @registry
 * name: Formatting Toggle Group
 * category: Toggle
 * style: SaaS
 * tags: featured, recent
 * description: Barre de mise en forme façon Radix : groupe multiple (gras, italique, souligné, barré) et groupe exclusif d'alignement, appliqués à un texte.
 * prompt: Create a text formatting toolbar in the style of Radix Toggle Group: a role=toolbar with arrow-key roving focus across all buttons; a multiple-selection group (Bold, Italic, Underline, Strikethrough) with aria-pressed, and a single-selection alignment group (Left, Center, Right, Justify) as a radiogroup; keyboard shortcuts ⌘B / ⌘I / ⌘U work while the preview text is focused; a sample paragraph below reflects the active formatting. Light and dark mode.
 */
'use client';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, Strikethrough, Underline } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

const marks = [['bold', 'Bold', Bold, 'B'], ['italic', 'Italic', Italic, 'I'], ['underline', 'Underline', Underline, 'U'], ['strike', 'Strikethrough', Strikethrough, '']] as const;
const aligns = [['left', 'Align left', AlignLeft], ['center', 'Align center', AlignCenter], ['right', 'Align right', AlignRight], ['justify', 'Justify', AlignJustify]] as const;

export function FormattingToggleGroup() {
  const [active, setActive] = useState<string[]>(['bold']);
  const [align, setAlign] = useState('left');
  const [focus, setFocus] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const toggle = (key: string) => setActive((list) => (list.includes(key) ? list.filter((item) => item !== key) : [...list, key]));

  function roving(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (focus + (event.key === 'ArrowRight' ? 1 : -1) + 8) % 8;
    setFocus(next);
    refs.current[next]?.focus();
  }

  function shortcuts(event: KeyboardEvent) {
    if (!(event.metaKey || event.ctrlKey)) return;
    const mark = marks.find(([, , , key]) => key && key === event.key.toUpperCase());
    if (mark) { event.preventDefault(); toggle(mark[0]); }
  }

  const button = (on: boolean) => `grid size-9 place-items-center rounded-md transition ${on ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`;

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <div role="toolbar" aria-label="Text formatting" onKeyDown={roving} className="flex items-center gap-1">
        <div role="group" aria-label="Style" className="flex gap-0.5">{marks.map(([key, label, Icon, shortcut], index) => <button key={key} ref={(node) => { refs.current[index] = node; }} type="button" aria-pressed={active.includes(key)} aria-label={label} aria-keyshortcuts={shortcut ? `Meta+${shortcut}` : undefined} title={shortcut ? `${label} (⌘${shortcut})` : label} tabIndex={focus === index ? 0 : -1} onFocus={() => setFocus(index)} onClick={() => toggle(key)} className={button(active.includes(key))}><Icon aria-hidden className="size-4" /></button>)}</div>
        <span aria-hidden className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
        <div role="radiogroup" aria-label="Alignment" className="flex gap-0.5">{aligns.map(([key, label, Icon], offset) => { const index = offset + 4; return <button key={key} ref={(node) => { refs.current[index] = node; }} type="button" role="radio" aria-checked={align === key} aria-label={label} tabIndex={focus === index ? 0 : -1} onFocus={() => setFocus(index)} onClick={() => setAlign(key)} className={button(align === key)}><Icon aria-hidden className="size-4" /></button>; })}</div>
      </div>
      <p tabIndex={0} onKeyDown={shortcuts} aria-label="Preview text, use Command B, I or U to format" className={`mt-3 rounded-xl bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-800 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-zinc-900 dark:text-zinc-200 ${active.includes('bold') ? 'font-bold' : ''} ${active.includes('italic') ? 'italic' : ''} ${active.includes('underline') ? 'underline' : ''} ${active.includes('strike') ? 'line-through' : ''}`} style={{ textAlign: align as 'left' }}>
        Good tools disappear. You stop noticing the toolbar and start noticing your ideas. Focus this text and press ⌘B, ⌘I or ⌘U.
      </p>
    </div>
  );
}
