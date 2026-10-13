/**
 * @registry
 * name: Agent Approval Card
 * category: AI Chat
 * style: Dark
 * tags: featured, recent
 * description: Demande d'autorisation d'un agent IA (humain dans la boucle) : action proposée, paramètres, niveau de risque, approuver / refuser / toujours autoriser.
 * prompt: Create a human-in-the-loop approval card for an AI agent on a dark panel: header "Agent wants to send an email" with a risk pill (Medium), a collapsible parameters block (to, subject, body preview) rendered as key/value rows, a checkbox "Always allow sending to this domain", and actions Deny / Edit / Approve; Approve shows a running then done state, Deny shows a short reason input; every state change is announced via aria-live; buttons are keyboard accessible. Dark in both themes.
 */
'use client';
import { Check, ChevronDown, Loader2, Mail, ShieldAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AgentApprovalCard() {
  const [state, setState] = useState<'pending' | 'running' | 'approved' | 'denied'>('pending');
  const [details, setDetails] = useState(true);
  const [always, setAlways] = useState(false);

  useEffect(() => {
    if (state !== 'running') return;
    const timer = window.setTimeout(() => setState('approved'), 1200);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <section className="w-full max-w-md rounded-2xl bg-zinc-950 p-5 text-zinc-200 ring-1 ring-white/10">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-500/15 text-sky-300"><Mail aria-hidden className="size-4" /></span>
        <div className="flex-1"><p className="text-sm font-semibold text-white">Agent wants to send an email</p><p className="text-xs text-zinc-500">Tool · gmail.send · step 4 of 6</p></div>
        <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-semibold text-amber-300"><ShieldAlert aria-hidden className="size-3" />Medium risk</span>
      </div>
      <button type="button" aria-expanded={details} onClick={() => setDetails(!details)} className="mt-4 flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300">Parameters<ChevronDown aria-hidden className={`size-4 transition-transform ${details ? 'rotate-180' : ''}`} /></button>
      {details && (
        <dl className="mt-2 space-y-1.5 rounded-xl bg-white/5 p-3 font-mono text-xs">
          {[['to', 'finance@kora.io'], ['subject', 'Q3 invoice #2291'], ['body', 'Hi team, please find attached the Q3 invoice for…']].map(([key, value]) => <div key={key} className="flex gap-3"><dt className="w-14 shrink-0 text-zinc-500">{key}</dt><dd className="min-w-0 truncate text-zinc-200">{value}</dd></div>)}
        </dl>
      )}
      <div aria-live="polite" className="mt-4">
        {state === 'pending' && (
          <>
            <label className="flex items-center gap-2 text-xs text-zinc-400"><input type="checkbox" checked={always} onChange={(event) => setAlways(event.target.checked)} className="accent-sky-400" />Always allow sending to @kora.io</label>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setState('denied')} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-zinc-300 ring-1 ring-white/10 hover:bg-white/5"><X aria-hidden className="size-4" />Deny</button>
              <button type="button" className="rounded-lg px-3 py-2 text-sm text-zinc-300 ring-1 ring-white/10 hover:bg-white/5">Edit</button>
              <button type="button" onClick={() => setState('running')} className="ml-auto flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"><Check aria-hidden className="size-4" />Approve</button>
            </div>
          </>
        )}
        {state === 'running' && <p className="flex items-center gap-2 text-sm text-sky-300"><Loader2 aria-hidden className="size-4 motion-safe:animate-spin" />Sending email…</p>}
        {state === 'approved' && <p className="flex items-center gap-2 text-sm text-emerald-300"><Check aria-hidden className="size-4" />Sent to finance@kora.io{always ? ' · future emails to this domain auto-approved' : ''}</p>}
        {state === 'denied' && (
          <div>
            <p className="text-sm text-rose-300">Denied. Tell the agent why (optional):</p>
            <div className="mt-2 flex gap-2"><input aria-label="Reason" placeholder="Wrong recipient…" className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-1.5 text-sm outline-none ring-1 ring-white/10 focus:ring-white/30" /><button type="button" onClick={() => setState('pending')} className="rounded-lg px-3 text-sm ring-1 ring-white/10 hover:bg-white/5">Undo</button></div>
          </div>
        )}
      </div>
    </section>
  );
}
