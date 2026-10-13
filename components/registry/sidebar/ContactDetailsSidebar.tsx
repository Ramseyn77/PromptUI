/**
 * @registry
 * name: Contact Details Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: recent
 * description: Panneau de détails d'un contact CRM : profil, actions rapides, propriétés éditables en ligne, étiquettes et activité récente, refermable.
 * prompt: Create a CRM contact details sidebar panel beside a conversation: header with avatar initials, name, title and company, a close button; quick actions (Email, Call, Meeting) as icon buttons with labels; a "Details" section of key/value properties (Email, Phone, Owner, Stage, Deal value) where Stage and Owner are inline-editable selects; tags with add/remove; a "Recent activity" timeline; collapsible sections with aria-expanded; closing collapses the panel and a "Show details" button brings it back. Full width below the conversation on mobile. Light and dark mode.
 */
'use client';
import { Calendar, ChevronDown, Mail, PanelRightOpen, Phone, Plus, X } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

function Section({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="border-t border-zinc-100 py-3 dark:border-zinc-800">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500">{title}<ChevronDown aria-hidden className={`size-3.5 transition-transform ${open ? '' : '-rotate-90'}`} /></button>
      {open && <div className="mt-2">{children}</div>}
    </section>
  );
}

export function ContactDetailsSidebar() {
  const uid = useId();
  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState('Proposal');
  const [owner, setOwner] = useState('Awa Diop');
  const [tags, setTags] = useState(['Enterprise', 'Fintech']);
  const [tag, setTag] = useState('');

  return (
    <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white md:min-h-[28rem] md:flex-row dark:border-zinc-800 dark:bg-zinc-950">
      <main className="flex-1 p-5">
        <div className="flex items-center justify-between"><h3 className="font-semibold text-zinc-950 dark:text-white">Re: Q4 rollout plan</h3>{!open && <button type="button" aria-expanded={open} aria-controls={`${uid}-panel`} onClick={() => setOpen(true)} className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"><PanelRightOpen aria-hidden className="size-4" />Show details</button>}</div>
        <div className="mt-4 space-y-3 text-sm">
          <p className="max-w-sm rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-2.5 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">Hi Awa — could we move the rollout to the second week of November?</p>
          <p className="ml-auto max-w-sm rounded-2xl rounded-tr-md bg-indigo-600 px-4 py-2.5 text-white">Absolutely. I’ll send an updated plan today.</p>
        </div>
      </main>
      {open && (
        <aside id={`${uid}-panel`} aria-label="Contact details" className="w-full shrink-0 border-t border-zinc-200 p-4 md:w-72 md:border-l md:border-t-0 dark:border-zinc-800">
          <div className="flex items-start gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">NK</span>
            <div className="flex-1"><p className="font-semibold text-zinc-950 dark:text-white">Noah Kim</p><p className="text-xs text-zinc-500">VP Operations · Kora Bank</p></div>
            <button type="button" aria-label="Close details" onClick={() => setOpen(false)} className="grid size-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"><X aria-hidden className="size-4" /></button>
          </div>
          <div className="my-4 grid grid-cols-3 gap-2">{[[Mail, 'Email'], [Phone, 'Call'], [Calendar, 'Meeting']].map(([Icon, label]) => { const I = Icon as typeof Mail; return <button key={label as string} type="button" className="flex flex-col items-center gap-1 rounded-xl border border-zinc-200 py-2 text-[11px] text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"><I aria-hidden className="size-4" />{label as string}</button>; })}</div>
          <Section title="Details">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-2"><dt className="text-zinc-500">Email</dt><dd className="truncate text-zinc-900 dark:text-zinc-100">noah@kora.io</dd></div>
              <div className="flex justify-between gap-2"><dt className="text-zinc-500">Phone</dt><dd className="text-zinc-900 dark:text-zinc-100">+221 77 555 01 34</dd></div>
              <div className="flex items-center justify-between gap-2"><dt className="text-zinc-500"><label htmlFor={`${uid}-owner`}>Owner</label></dt><dd><select id={`${uid}-owner`} value={owner} onChange={(event) => setOwner(event.target.value)} className="rounded-md bg-transparent text-right text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"><option>Awa Diop</option><option>Leo Martin</option></select></dd></div>
              <div className="flex items-center justify-between gap-2"><dt className="text-zinc-500"><label htmlFor={`${uid}-stage`}>Stage</label></dt><dd><select id={`${uid}-stage`} value={stage} onChange={(event) => setStage(event.target.value)} className="rounded-md bg-transparent text-right text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800">{['Lead', 'Qualified', 'Proposal', 'Won', 'Lost'].map((value) => <option key={value}>{value}</option>)}</select></dd></div>
              <div className="flex justify-between gap-2"><dt className="text-zinc-500">Deal value</dt><dd className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">$48,000</dd></div>
            </dl>
          </Section>
          <Section title="Tags">
            <ul className="flex flex-wrap gap-1.5">{tags.map((item) => <li key={item} className="flex items-center gap-1 rounded-full bg-zinc-100 py-0.5 pl-2 pr-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{item}<button type="button" aria-label={`Remove ${item}`} onClick={() => setTags(tags.filter((value) => value !== item))} className="grid size-4 place-items-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"><X aria-hidden className="size-3" /></button></li>)}</ul>
            <form onSubmit={(event) => { event.preventDefault(); if (tag.trim() && !tags.includes(tag.trim())) setTags([...tags, tag.trim()]); setTag(''); }} className="mt-2 flex gap-1"><input aria-label="New tag" value={tag} onChange={(event) => setTag(event.target.value)} placeholder="Add tag" className="min-w-0 flex-1 rounded-md border border-zinc-200 bg-transparent px-2 py-1 text-xs dark:border-zinc-700 dark:text-zinc-100" /><button type="submit" aria-label="Add tag" className="grid size-7 place-items-center rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"><Plus aria-hidden className="size-3.5" /></button></form>
          </Section>
          <Section title="Recent activity">
            <ol className="space-y-2 border-l border-zinc-200 pl-3 text-xs dark:border-zinc-700">{[['Stage changed to Proposal', '2h ago'], ['Meeting: rollout review', 'Yesterday'], ['Email opened ×3', 'Mon']].map(([text, time]) => <li key={text}><p className="text-zinc-800 dark:text-zinc-200">{text}</p><p className="text-zinc-500">{time}</p></li>)}</ol>
          </Section>
        </aside>
      )}
    </div>
  );
}
