/**
 * @registry
 * name: Code Editor Hero
 * category: Hero
 * style: Dark
 * tags: featured, recent
 * description: Hero développeur avec éditeur de code qui se tape tout seul et aperçu de la réponse de l'API à côté.
 * prompt: Create a developer hero on a dark background: left column with badge, headline, subtitle and two CTAs; right column an editor window (tabs, line numbers) where a short SDK snippet types itself with syntax colors, then a response panel slides in showing JSON; Replay button; full code shown instantly with reduced motion. Columns from lg, stacked before. Dark in both themes.
 */
'use client';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const code = `import { Acme } from '@acme/sdk';

const acme = new Acme(process.env.ACME_KEY);

const invoice = await acme.invoices.create({
  customer: 'cus_8fk2',
  amount: 4900,
  currency: 'eur',
});`;

function colorize(line: string) {
  return line.split(/('[^']*'|\b(?:import|from|const|await|new)\b|\d+)/).map((part, index) => {
    if (/^'/.test(part)) return <span key={index} className="text-emerald-300">{part}</span>;
    if (/^(import|from|const|await|new)$/.test(part)) return <span key={index} className="text-violet-300">{part}</span>;
    if (/^\d+$/.test(part)) return <span key={index} className="text-amber-300">{part}</span>;
    return <span key={index}>{part}</span>;
  });
}

export function CodeEditorHero() {
  const [length, setLength] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setLength(code.length); return; }
    setLength(0);
    const timer = window.setInterval(() => setLength((value) => { if (value >= code.length) { window.clearInterval(timer); return value; } return value + 3; }), 30);
    return () => window.clearInterval(timer);
  }, [run]);

  const done = length >= code.length;
  const lines = code.slice(0, length).split('\n');

  return (
    <section className="grid w-full max-w-5xl items-center gap-10 rounded-3xl bg-[#0b0d12] px-6 py-12 text-white lg:grid-cols-2 lg:px-10">
      <div>
        <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-200">SDK v5 · TypeScript-first</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Billing in eight lines of code.</h1>
        <p className="mt-4 text-zinc-400">Typed SDKs, idempotent requests and webhooks that just work.</p>
        <div className="mt-7 flex flex-wrap gap-3"><a href="#docs" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950">Read the docs</a><a href="#keys" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold">Get API keys</a></div>
      </div>
      <div className="relative">
        <div className="overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10">
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs"><span className="rounded-md bg-white/10 px-2 py-0.5 text-zinc-200">invoice.ts</span><span className="text-zinc-500">webhook.ts</span><button type="button" aria-label="Replay typing" onClick={() => setRun((value) => value + 1)} className="ml-auto grid size-6 place-items-center rounded text-zinc-400 hover:bg-white/10"><RotateCcw aria-hidden className="size-3.5" /></button></div>
          <pre aria-label="Code example" className="min-h-56 overflow-x-auto p-4 font-mono text-[13px] leading-6 text-zinc-200"><code>{lines.map((line, index) => <span key={index} className="block"><span aria-hidden className="mr-4 inline-block w-4 select-none text-right text-zinc-600">{index + 1}</span>{colorize(line)}{index === lines.length - 1 && !done && <span aria-hidden className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-violet-300" />}</span>)}</code></pre>
        </div>
        <div className={`-mt-6 ml-auto w-64 rounded-xl bg-zinc-800 p-3 font-mono text-xs shadow-2xl ring-1 ring-white/10 transition duration-500 ${done ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
          <p className="text-emerald-400">200 OK · 84ms</p>
          <p className="mt-1 text-zinc-300">{'{ "id": "in_31Jf", "status": "open" }'}</p>
        </div>
      </div>
    </section>
  );
}
