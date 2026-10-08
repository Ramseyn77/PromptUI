/**
 * @registry
 * name: Code Answer
 * category: AI Chat
 * style: Dark
 * tags: recent
 * description: Réponse d'assistant contenant un bloc de code avec langage, copie et explication.
 * prompt: Create an assistant answer containing a short explanation, a code block with a header (language label, filename, copy button that shows "Copied"), line numbers and simple syntax colors, and a follow-up note. Code block is dark in both themes; surrounding text adapts.
 */
'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const code = `export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((value) => !value);
  return [on, toggle] as const;
}`;

export function CodeAnswer() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="w-full max-w-lg space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
      <p>Here is a tiny hook that keeps a boolean and returns a stable toggle:</p>
      <figure className="overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-white/10">
        <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
          <span><span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-zinc-200">ts</span> useToggle.ts</span>
          <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-white/10 hover:text-white">{copied ? <Check aria-hidden className="size-3.5 text-emerald-400" /> : <Copy aria-hidden className="size-3.5" />}{copied ? 'Copied' : 'Copy'}</button>
        </figcaption>
        <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6">
          {code.split('\n').map((line, index) => (
            <div key={index} className="flex gap-4">
              <span aria-hidden className="w-4 select-none text-right text-zinc-600">{index + 1}</span>
              <code className="text-zinc-200">{line.split(/(\b(?:export|function|const|return|as)\b)/).map((part, i) => /^(export|function|const|return|as)$/.test(part) ? <span key={i} className="text-violet-300">{part}</span> : part)}</code>
            </div>
          ))}
        </pre>
      </figure>
      <p>Use it as <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">const [open, toggle] = useToggle()</code>.</p>
    </div>
  );
}
