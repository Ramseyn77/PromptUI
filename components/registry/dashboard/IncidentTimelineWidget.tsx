/**
 * @registry
 * name: Incident Timeline Widget
 * category: Dashboard
 * style: Dark
 * tags: recent
 * description: Chronologie d'incident en cours : sévérité, durée qui défile, étapes (détecté, investigation, identifié, résolu), mises à jour et responsable.
 * prompt: Create a dark live incident widget: header with severity badge (SEV-2), title "Elevated API error rate", a live duration counter (after mount), commander initials and affected services chips; a status stepper (Detected → Investigating → Identified → Monitoring → Resolved) with the current step pulsing; a vertical timeline of updates with time, author and message; an input to post an update (Enter adds it at the top) and a select to advance the status; aria-live announces new updates. Dark in both themes.
 */
'use client';
import { useEffect, useState, type FormEvent } from 'react';

const steps = ['Detected', 'Investigating', 'Identified', 'Monitoring', 'Resolved'];

export function IncidentTimelineWidget() {
  const [step, setStep] = useState(2);
  const [elapsed, setElapsed] = useState(47 * 60 + 12);
  const [updates, setUpdates] = useState([
    { time: '14:31', author: 'LM', text: 'Root cause: a bad config push to the rate limiter. Rolling back.' },
    { time: '14:12', author: 'AD', text: 'Errors limited to EU region. Paging the platform team.' },
    { time: '13:58', author: 'Bot', text: 'Alert: 5xx rate above 4% for 5 minutes on api-gateway.' },
  ]);
  const [draft, setDraft] = useState('');
  const resolved = step === steps.length - 1;

  useEffect(() => {
    if (resolved) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [resolved]);

  function post(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    setUpdates([{ time: '14:45', author: 'You', text: draft.trim() }, ...updates]);
    setDraft('');
  }

  return (
    <section className="w-full max-w-lg rounded-2xl bg-zinc-950 p-5 text-zinc-300 ring-1 ring-white/10">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${resolved ? 'bg-emerald-400/15 text-emerald-300' : 'bg-orange-500/20 text-orange-300'}`}>{resolved ? 'RESOLVED' : 'SEV-2'}</span>
        <h3 className="flex-1 text-sm font-semibold text-white">Elevated API error rate</h3>
        <span className="font-mono text-xs tabular-nums text-zinc-400">{Math.floor(elapsed / 3600)}h {String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')}m {String(elapsed % 60).padStart(2, '0')}s</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">{['api-gateway', 'billing', 'EU region'].map((service) => <span key={service} className="rounded bg-white/5 px-1.5 py-0.5 ring-1 ring-white/10">{service}</span>)}<span className="ml-auto text-zinc-500">Commander <span className="rounded-full bg-violet-500 px-1.5 font-bold text-white">LM</span></span></div>
      <ol className="mt-4 flex items-center" aria-label="Incident status">{steps.map((label, index) => <li key={label} aria-current={index === step ? 'step' : undefined} className="flex flex-1 flex-col items-center gap-1 text-center"><span className={`relative size-3 rounded-full ${index < step ? 'bg-emerald-400' : index === step ? (resolved ? 'bg-emerald-400' : 'bg-orange-400') : 'bg-white/15'}`}>{index === step && !resolved && <span aria-hidden className="absolute inset-0 rounded-full bg-orange-400 motion-safe:animate-ping" />}</span><span className={`text-[9px] ${index === step ? 'font-semibold text-white' : 'text-zinc-500'}`}>{label}</span></li>)}</ol>
      <form onSubmit={post} className="mt-4 flex gap-2"><input aria-label="Post an update" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Post an update…" className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-white/30" /><select aria-label="Status" value={step} onChange={(event) => setStep(Number(event.target.value))} className="rounded-lg bg-white/5 px-2 text-xs ring-1 ring-white/10">{steps.map((label, index) => <option key={label} value={index} className="bg-zinc-900">{label}</option>)}</select></form>
      <ol aria-live="polite" className="mt-4 space-y-3 border-l border-white/10 pl-4">
        {updates.map((update, index) => <li key={`${update.time}-${index}`} className="relative"><span aria-hidden className="absolute -left-[1.3rem] top-1.5 size-2 rounded-full bg-zinc-600 ring-4 ring-zinc-950" /><p className="text-[11px] text-zinc-500"><span className="font-mono">{update.time}</span> · {update.author}</p><p className="text-sm text-zinc-200">{update.text}</p></li>)}
      </ol>
    </section>
  );
}
