/**
 * @registry
 * name: Share Menu
 * category: Menu
 * style: Glass
 * tags: featured, recent
 * description: Menu de partage avec lien copiable, accès (privé / équipe / public) et raccourcis d'envoi.
 * prompt: Create a share menu panel (in flow under a Share button with aria-expanded): a read-only link input with a Copy button that confirms "Copied", an access selector as a radiogroup (Private / Team / Anyone with link) updating a caption, and a row of share targets (Email, Message, QR code) as icon buttons with labels. defaultOpen prop for previews. Glassy surface. Light and dark mode.
 */
'use client';
import { Check, Copy, Globe, Lock, Mail, MessageSquare, QrCode, Share2, Users } from 'lucide-react';
import { useState } from 'react';

const access = [
  { key: 'private', label: 'Private', icon: Lock, text: 'Only you can open this link.' },
  { key: 'team', label: 'Team', icon: Users, text: 'Anyone at Acme can view.' },
  { key: 'public', label: 'Public', icon: Globe, text: 'Anyone with the link can view.' },
] as const;

export function ShareMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [mode, setMode] = useState<string>('team');
  const [copied, setCopied] = useState(false);

  async function copy() {
    try { await navigator.clipboard.writeText('https://acme.app/s/q4-roadmap'); } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="w-80 rounded-3xl bg-gradient-to-br from-teal-100 to-violet-100 p-4 dark:from-teal-950/60 dark:to-violet-950/60">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white"><Share2 aria-hidden className="size-4" />Share</button>
      {open && (
        <div role="dialog" aria-label="Share" className="mt-2 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70">
          <div className="flex gap-1.5">
            <input readOnly aria-label="Share link" value="acme.app/s/q4-roadmap" className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white/80 px-2.5 py-1.5 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-200" />
            <button type="button" onClick={copy} className="inline-flex items-center gap-1 rounded-lg bg-zinc-950 px-2.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">{copied ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <div role="radiogroup" aria-label="Who can access" className="mt-3 grid grid-cols-3 gap-1">
            {access.map(({ key, label, icon: Icon }) => (
              <button key={key} type="button" role="radio" aria-checked={mode === key} onClick={() => setMode(key)} className={`flex flex-col items-center gap-1 rounded-lg py-2 text-[11px] font-medium transition ${mode === key ? 'bg-white text-teal-700 shadow-sm dark:bg-white/15 dark:text-teal-300' : 'text-zinc-600 hover:bg-white/50 dark:text-zinc-300 dark:hover:bg-white/5'}`}><Icon aria-hidden className="size-4" />{label}</button>
            ))}
          </div>
          <p aria-live="polite" className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">{access.find((item) => item.key === mode)!.text}</p>
          <div className="mt-3 flex justify-around border-t border-zinc-200/70 pt-3 dark:border-white/10">
            {([[Mail, 'Email'], [MessageSquare, 'Message'], [QrCode, 'QR code']] as const).map(([Icon, label]) => <button key={label} type="button" className="flex flex-col items-center gap-1 text-[11px] text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"><span className="grid size-9 place-items-center rounded-full bg-white shadow-sm dark:bg-white/10"><Icon aria-hidden className="size-4" /></span>{label}</button>)}
          </div>
        </div>
      )}
    </div>
  );
}
