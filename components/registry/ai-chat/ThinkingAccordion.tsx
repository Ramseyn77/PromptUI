/**
 * @registry
 * name: Thinking Accordion
 * category: AI Chat
 * style: Minimal
 * tags: recent
 * description: Bloc repliable « Reflexion pendant 8 s » qui revele le raisonnement de l assistant.
 * prompt: Create a collapsible "Thought for 8 seconds" reasoning block above an answer: a disclosure button (aria-expanded, chevron rotates) revealing a bordered list of reasoning steps with a smooth grid-rows height transition. Light and dark mode.
 */
'use client';
import { Brain, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const thoughts = ['The user wants fewer support tickets about billing.', 'Most tickets ask where invoices live.', 'A visible "Invoices" link in settings is the smallest fix.'];

export function ThinkingAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <button type="button" aria-expanded={open} aria-controls="thinking-steps" onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">
        <Brain aria-hidden className="size-4" /> Thought for 8 seconds
        <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id="thinking-steps" className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <ol className="overflow-hidden">
          {thoughts.map((thought, index) => (
            <li key={thought} className="ml-4 border-l-2 border-zinc-200 py-1.5 pl-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"><span className="mr-1 font-mono text-xs text-zinc-400">{index + 1}.</span>{thought}</li>
          ))}
        </ol>
      </div>
      <p className="mt-3 text-sm leading-7 text-zinc-800 dark:text-zinc-200">Add an <strong>Invoices</strong> link to the billing settings and mention it in the receipt email.</p>
    </div>
  );
}
