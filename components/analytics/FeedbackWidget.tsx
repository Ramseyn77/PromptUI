'use client';

import { MessageSquare } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { FeedbackPayload, trackEvent } from '@/utils/analytics';

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload: FeedbackPayload = {
      useful: String(form.get('useful') ?? 'Peut-etre') as FeedbackPayload['useful'],
      favorite: String(form.get('favorite') ?? 'Prompt IA') as FeedbackPayload['favorite'],
      missing: String(form.get('missing') ?? '').trim(),
    };
    trackEvent({ type: 'feedback', payload });
    setSent(true);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-2xl shadow-black/15">
          {sent ? (
            <div>
              <p className="font-semibold">Merci pour ton retour.</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Il est enregistre dans les analytics.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="font-semibold">Feedback rapide</p>
              <fieldset className="mt-4">
                <legend className="text-sm font-medium">Est-ce que ce site vous serait utile ?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Oui','Peut-etre','Non'].map((value) => (
                    <label key={value} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm"><input className="mr-1.5" type="radio" name="useful" value={value} defaultChecked={value === 'Peut-etre'}/>{value}</label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="mt-4">
                <legend className="text-sm font-medium">Qu'est-ce qui vous plait le plus ?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Code','Prompt IA','Preview','Autre'].map((value) => (
                    <label key={value} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm"><input className="mr-1.5" type="radio" name="favorite" value={value} defaultChecked={value === 'Prompt IA'}/>{value}</label>
                  ))}
                </div>
              </fieldset>
              <label className="mt-4 block text-sm font-medium">
                Qu'est-ce qui vous manque ?
                <textarea name="missing" rows={3} className="mt-2 w-full resize-none rounded-xl border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none" placeholder="Ex: plus de dashboards, composants animes..."/>
              </label>
              <button className="mt-4 w-full rounded-full bg-[var(--foreground)] px-4 py-2.5 text-sm font-semibold text-[var(--background)]">Envoyer</button>
            </form>
          )}
        </div>
      )}
      <button onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)] shadow-xl shadow-black/15">
        <MessageSquare size={16}/>
        Feedback
      </button>
    </div>
  );
}
