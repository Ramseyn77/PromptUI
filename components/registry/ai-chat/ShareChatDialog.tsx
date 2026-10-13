/**
 * @registry
 * name: Share Chat Dialog
 * category: AI Chat
 * style: Glass
 * tags: recent
 * description: Fenêtre de partage d'une conversation IA : aperçu, visibilité (privé / lien / public), anonymiser le nom, copier le lien et révoquer.
 * prompt: Create a glassy "Share chat" dialog rendered in flow (defaultOpen): a preview card of the conversation (title + two message snippets), a visibility radiogroup (Private, Anyone with the link, Public & indexed) with descriptions, a toggle "Hide my name", a read-only link field with a Copy button that shows "Copied" (aria-live), and a "Revoke link" text button when shared; Escape and the close button dismiss it. Light and dark mode.
 */
'use client';
import { Check, Copy, Globe, Link2, Lock, X } from 'lucide-react';
import { useId, useState } from 'react';

const options = [{ id: 'private', label: 'Private', hint: 'Only you can see this chat', icon: Lock }, { id: 'link', label: 'Anyone with the link', hint: 'Not listed or searchable', icon: Link2 }, { id: 'public', label: 'Public', hint: 'Indexed and shown on your profile', icon: Globe }] as const;

export function ShareChatDialog({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [visibility, setVisibility] = useState<string>('link');
  const [anonymous, setAnonymous] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try { await navigator.clipboard.writeText('https://chat.example.com/s/8f3k2'); } catch { /* clipboard unavailable */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (!open) return <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Share chat</button>;

  return (
    <div className="w-full max-w-md rounded-3xl bg-[linear-gradient(135deg,#bae6fd,#ddd6fe,#fbcfe8)] p-4 dark:bg-[linear-gradient(135deg,#0c4a6e,#3b0764,#500724)]">
      <section role="dialog" aria-labelledby={`${uid}-title`} onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }} className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/70">
        <div className="flex items-center justify-between"><h3 id={`${uid}-title`} className="font-semibold text-zinc-950 dark:text-white">Share chat</h3><button type="button" aria-label="Close" onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-full text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10"><X aria-hidden className="size-4" /></button></div>
        <div className="mt-3 rounded-xl bg-white/80 p-3 text-xs dark:bg-zinc-900/80"><p className="font-semibold text-zinc-950 dark:text-white">Onboarding email ideas</p><p className="mt-1 truncate text-zinc-500">{anonymous ? 'Anonymous' : 'Awa'}: Draft three welcome emails for…</p><p className="truncate text-zinc-500">Assistant: Here are three options, each under 90 words…</p></div>
        <fieldset className="mt-4 space-y-1.5">
          <legend className="sr-only">Visibility</legend>
          {options.map(({ id, label, hint, icon: Icon }) => (
            <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-xl p-2.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-violet-500 ${visibility === id ? 'bg-white shadow-sm dark:bg-zinc-800' : 'hover:bg-white/50 dark:hover:bg-white/5'}`}>
              <input type="radio" name={`${uid}-visibility`} checked={visibility === id} onChange={() => setVisibility(id)} className="sr-only" />
              <Icon aria-hidden className="size-4 text-zinc-500" /><span className="flex-1"><span className="block text-sm font-medium text-zinc-950 dark:text-white">{label}</span><span className="block text-xs text-zinc-500">{hint}</span></span>
              <span aria-hidden className={`size-4 rounded-full border-2 ${visibility === id ? 'border-[5px] border-violet-600' : 'border-zinc-300 dark:border-zinc-600'}`} />
            </label>
          ))}
        </fieldset>
        <label className="mt-3 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">Hide my name<input type="checkbox" role="switch" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} className="size-4 accent-violet-600" /></label>
        {visibility !== 'private' && (
          <>
            <div className="mt-4 flex gap-2"><input readOnly aria-label="Share link" value="chat.example.com/s/8f3k2" className="min-w-0 flex-1 rounded-lg bg-white/80 px-3 py-2 font-mono text-xs text-zinc-700 outline-none dark:bg-zinc-900 dark:text-zinc-300" /><button type="button" onClick={copy} className="flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">{copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}<span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span></button></div>
            <button type="button" onClick={() => setVisibility('private')} className="mt-2 text-xs text-rose-600 hover:underline dark:text-rose-400">Revoke link</button>
          </>
        )}
      </section>
    </div>
  );
}
