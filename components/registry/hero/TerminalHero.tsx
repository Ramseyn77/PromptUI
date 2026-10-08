/**
 * @registry
 * name: Terminal Hero
 * category: Hero
 * style: Dark
 * tags: recent
 * description: Hero pour outil développeur avec commande d'installation copiable et sortie de terminal.
 * prompt: Create a developer-tool hero: headline, subtitle, a copyable install command pill (copies to clipboard, shows a check), and a terminal window with prompt lines and green success output. Dark terminal in both themes, page surface adapts to light and dark.
 */
'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const command = 'npx promptui add hero';

export function TerminalHero() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="grid w-full max-w-5xl items-center gap-10 rounded-3xl bg-zinc-100 px-6 py-12 lg:grid-cols-2 lg:px-12 dark:bg-zinc-900">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Add a component in one command.</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">No package lock-in. The source lands in your repo, ready to edit.</p>
        <button type="button" onClick={copy} className="mt-8 inline-flex items-center gap-3 rounded-xl border border-zinc-300 bg-white px-4 py-3 font-mono text-sm text-zinc-800 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
          <span className="text-teal-600 dark:text-teal-400">$</span> {command}
          {copied ? <Check aria-label="Copied" className="size-4 text-emerald-500" /> : <Copy aria-label="Copy command" className="size-4 text-zinc-400" />}
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          {['bg-rose-400', 'bg-amber-400', 'bg-emerald-400'].map((color) => <span key={color} className={`size-2.5 rounded-full ${color}`} />)}
          <span className="ml-3 font-mono text-xs text-zinc-500">~/my-app</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-zinc-300">
          <span className="text-zinc-500">$</span> {command}{'\n'}
          <span className="text-zinc-500">›</span> Resolving hero…{'\n'}
          <span className="text-emerald-400">✓</span> Created components/Hero.tsx{'\n'}
          <span className="text-emerald-400">✓</span> Added prompt to .promptui/hero.md{'\n'}
          <span className="text-teal-300">Done in 0.8s</span>
        </pre>
      </div>
    </section>
  );
}
