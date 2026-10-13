/**
 * @registry
 * name: Profile Settings Form
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Formulaire de profil : avatar à initiales, nom, @pseudo vérifié, bio avec compteur, site web, détection des modifications et barre d'enregistrement collante.
 * prompt: Create a profile settings form: an avatar with initials and a "Change" button, display name, username with a prefix "@" and a live availability check (taken: admin, ava), a bio textarea with a 160-character counter, a website URL field with validation, and a timezone select; the form tracks dirty state and shows a sticky bottom bar "You have unsaved changes" with Discard and Save (Save disabled when invalid); saving shows a spinner then "Saved" toast via aria-live. Light and dark mode.
 */
'use client';
import { Check, Loader2 } from 'lucide-react';
import { useId, useState } from 'react';

const initial = { name: 'Awa Diop', username: 'awadiop', bio: 'Product designer in Dakar. I like calm interfaces and loud music.', website: 'https://awa.design', zone: 'Africa/Dakar' };

export function ProfileSettingsForm() {
  const uid = useId();
  const [saved, setSaved] = useState(initial);
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');
  const dirty = JSON.stringify(form) !== JSON.stringify(saved);
  const taken = ['admin', 'ava'].includes(form.username.toLowerCase());
  const usernameOk = /^[a-z0-9_]{3,20}$/i.test(form.username) && !taken;
  const urlOk = !form.website || /^https?:\/\/\S+\.\S+$/.test(form.website);
  const valid = form.name.trim().length > 1 && usernameOk && urlOk;
  const set = (key: keyof typeof initial, value: string) => { setForm({ ...form, [key]: value }); setToast(''); };
  const field = 'mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-zinc-950 dark:text-zinc-100';

  function save() {
    setBusy(true);
    window.setTimeout(() => { setBusy(false); setSaved(form); setToast('Profile saved'); }, 800);
  }

  return (
    <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <form onSubmit={(event) => { event.preventDefault(); if (valid && dirty) save(); }} className="space-y-4 p-5 pb-20">
        <div className="flex items-center gap-4"><span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-bold text-white">{form.name.split(' ').map((part) => part[0]).join('').slice(0, 2) || '?'}</span><button type="button" className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Change</button></div>
        <label htmlFor={`${uid}-name`} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Display name<input id={`${uid}-name`} value={form.name} onChange={(event) => set('name', event.target.value)} className={`${field} border-zinc-300 dark:border-zinc-700`} /></label>
        <div>
          <label htmlFor={`${uid}-user`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Username</label>
          <div className={`mt-1 flex items-center rounded-lg border focus-within:ring-2 focus-within:ring-indigo-500/20 ${usernameOk ? 'border-zinc-300 dark:border-zinc-700' : 'border-rose-500'}`}><span className="pl-3 text-sm text-zinc-400">@</span><input id={`${uid}-user`} value={form.username} aria-invalid={!usernameOk} aria-describedby={`${uid}-user-hint`} onChange={(event) => set('username', event.target.value)} className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100" />{usernameOk && <Check aria-hidden className="mr-3 size-4 text-emerald-500" />}</div>
          <p id={`${uid}-user-hint`} className={`mt-1 text-xs ${usernameOk ? 'text-zinc-500' : 'text-rose-600 dark:text-rose-400'}`}>{taken ? 'That username is taken.' : usernameOk ? 'Available' : '3–20 letters, numbers or underscores.'}</p>
        </div>
        <label htmlFor={`${uid}-bio`} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Bio<textarea id={`${uid}-bio`} rows={3} maxLength={160} value={form.bio} onChange={(event) => set('bio', event.target.value)} className={`${field} resize-none border-zinc-300 dark:border-zinc-700`} /><span className="block text-right text-[11px] font-normal tabular-nums text-zinc-400">{form.bio.length}/160</span></label>
        <label htmlFor={`${uid}-site`} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Website<input id={`${uid}-site`} type="url" value={form.website} aria-invalid={!urlOk} onChange={(event) => set('website', event.target.value)} className={`${field} ${urlOk ? 'border-zinc-300 dark:border-zinc-700' : 'border-rose-500'}`} />{!urlOk && <span className="mt-1 block text-xs font-normal text-rose-600 dark:text-rose-400">Start with https://</span>}</label>
        <label htmlFor={`${uid}-zone`} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Timezone<select id={`${uid}-zone`} value={form.zone} onChange={(event) => set('zone', event.target.value)} className={`${field} border-zinc-300 dark:border-zinc-700`}>{['Africa/Dakar', 'Africa/Lagos', 'Europe/Paris', 'America/New_York'].map((zone) => <option key={zone}>{zone}</option>)}</select></label>
        <div className={`absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-sm text-white shadow-2xl transition-all duration-300 dark:bg-white dark:text-zinc-950 ${dirty ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
          <span className="flex-1">You have unsaved changes</span>
          <button type="button" tabIndex={dirty ? 0 : -1} onClick={() => setForm(saved)} className="rounded-lg px-3 py-1 text-xs hover:bg-white/10 dark:hover:bg-zinc-100">Discard</button>
          <button type="submit" tabIndex={dirty ? 0 : -1} disabled={!valid || busy} className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1 text-xs font-semibold text-white disabled:opacity-40">{busy && <Loader2 aria-hidden className="size-3 motion-safe:animate-spin" />}Save</button>
        </div>
      </form>
      <p aria-live="polite" className="absolute bottom-4 left-5 text-sm text-emerald-600 dark:text-emerald-400">{!dirty && toast ? `✓ ${toast}` : ''}</p>
    </div>
  );
}
