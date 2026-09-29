/**
 * @registry
 * name: Truncated Text Tooltip
 * category: Tooltips
 * style: SaaS
 * tags: recent
 * description: Info-bulle qui n apparait que si le texte est reellement tronque, pour afficher le nom complet.
 * prompt: Create a list of file names in a narrow column where each name is truncated with an ellipsis; a tooltip with the full name appears on hover/focus only when the element is actually overflowing (measure scrollWidth > clientWidth on pointer enter/focus). Light and dark mode.
 */
'use client';
import { FileText } from 'lucide-react';
import { useState, type FocusEvent, type PointerEvent } from 'react';

const files = ['Q3-board-meeting-final-v7-approved.pdf', 'logo.svg', 'customer-interviews-summary-september-2026.docx', 'notes.md'];

function Row({ name }: { name: string }) {
  const [tip, setTip] = useState(false);
  const check = (event: PointerEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
    const text = event.currentTarget.querySelector('span');
    setTip(Boolean(text && text.scrollWidth > text.clientWidth));
  };

  return (
    <li className="relative">
      <a href="#" onPointerEnter={check} onFocus={check} onPointerLeave={() => setTip(false)} onBlur={() => setTip(false)} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">
        <FileText aria-hidden className="size-4 shrink-0 text-zinc-400" />
        <span className="truncate">{name}</span>
      </a>
      {tip && <span role="tooltip" className="absolute left-2 top-full z-10 mt-1 max-w-xs break-all rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-white dark:text-zinc-900">{name}</span>}
    </li>
  );
}

export function TruncatedTextTooltip() {
  return (
    <ul className="w-52 rounded-2xl border border-zinc-200 bg-white p-2 pb-10 dark:border-zinc-800 dark:bg-zinc-950">
      {files.map((file) => <Row key={file} name={file} />)}
    </ul>
  );
}
