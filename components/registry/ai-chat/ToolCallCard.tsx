/**
 * @registry
 * name: Tool Call Card
 * category: AI Chat
 * style: SaaS
 * tags: recent
 * description: Carte d'appel d'outil d'un agent : nom de fonction, statut, arguments JSON et résultat repliables.
 * prompt: Create an AI tool-call card shown inside a chat: header with a wrench icon, function name in mono (get_weather), status pill that goes Running (spinner) → Completed (check) with duration; two collapsible sections (Arguments, Result) using details/summary with syntax-colored JSON; "Approve" / "Deny" buttons when a second call requires confirmation. Light and dark mode.
 */
'use client';
import { Check, Loader2, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ToolCallCard() {
  const [done, setDone] = useState(false);
  const [approval, setApproval] = useState<'pending' | 'approved' | 'denied'>('pending');

  useEffect(() => { const timer = window.setTimeout(() => setDone(true), 1400); return () => window.clearTimeout(timer); }, []);

  const json = (entries: [string, string | number][]) => (
    <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 font-mono text-xs leading-5 text-zinc-300">{'{\n'}{entries.map(([key, value], index) => <span key={key}>  <span className="text-sky-300">&quot;{key}&quot;</span>: <span className={typeof value === 'number' ? 'text-amber-300' : 'text-emerald-300'}>{typeof value === 'number' ? value : `"${value}"`}</span>{index < entries.length - 1 ? ',' : ''}{'\n'}</span>)}{'}'}</pre>
  );

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"><Wrench aria-hidden className="size-4" /></span>
          <code className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">get_weather</code>
          <span aria-live="polite" className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${done ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-sky-50 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300'}`}>{done ? <><Check aria-hidden className="size-3" />Completed · 1.4s</> : <><Loader2 aria-hidden className="size-3 animate-spin" />Running</>}</span>
        </div>
        <details className="mt-3 group" open>
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-zinc-500">Arguments</summary>
          <div className="mt-2">{json([['city', 'Dakar'], ['units', 'metric']])}</div>
        </details>
        {done && <details className="mt-3"><summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-zinc-500">Result</summary><div className="mt-2">{json([['temp', 29], ['condition', 'Sunny'], ['humidity', 64]])}</div></details>}
      </div>
      {done && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
          <p className="text-sm text-amber-900 dark:text-amber-100">The agent wants to run <code className="font-semibold">send_email</code> to 3 recipients.</p>
          {approval === 'pending' ? (
            <div className="mt-3 flex gap-2"><button type="button" onClick={() => setApproval('approved')} className="rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Approve</button><button type="button" onClick={() => setApproval('denied')} className="rounded-lg border border-amber-400 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:text-amber-100">Deny</button></div>
          ) : <p role="status" className="mt-2 text-xs font-semibold text-amber-900 dark:text-amber-100">{approval === 'approved' ? 'Approved — email sent.' : 'Denied — the agent will continue without sending.'}</p>}
        </div>
      )}
    </div>
  );
}
