/**
 * @registry
 * name: Public Private Toggle
 * category: Toggle
 * style: Gradient
 * tags: recent
 * description: Bascule de visibilité Privé / Public avec confirmation avant de rendre public, cadenas animé et aperçu de qui peut voir.
 * prompt: Create a visibility toggle for a project: a large switch (role=switch) with a lock icon that opens into a globe when public, the track turning from zinc to a gradient; switching to Public first shows an inline confirmation ("Anyone with the link can view. Continue?" with Cancel / Make public) while switching back to Private is immediate; below, an audience line updates ("Only you and 4 members" vs "Anyone on the internet") with avatar initials; aria-live announces the change. Light and dark mode.
 */
'use client';
import { Globe, Lock } from 'lucide-react';
import { useState } from 'react';

export function PublicPrivateToggle() {
  const [isPublic, setPublic] = useState(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-4">
        <div><p className="font-semibold text-zinc-950 dark:text-white">Project visibility</p><p aria-live="polite" className="text-xs text-zinc-500">{isPublic ? 'Public — anyone with the link can view' : 'Private — only members'}</p></div>
        <button type="button" role="switch" aria-checked={isPublic} aria-label="Public project" onClick={() => (isPublic ? setPublic(false) : setConfirming(true))} className={`relative h-9 w-16 shrink-0 rounded-full transition-colors ${isPublic ? 'bg-gradient-to-r from-emerald-500 to-sky-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
          <span className={`absolute top-1 grid size-7 place-items-center rounded-full bg-white shadow transition-all duration-300 ${isPublic ? 'left-8' : 'left-1'}`}>{isPublic ? <Globe aria-hidden className="size-4 text-sky-600" /> : <Lock aria-hidden className="size-4 text-zinc-600" />}</span>
        </button>
      </div>
      {confirming && (
        <div role="alertdialog" aria-label="Confirm making project public" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-100 dark:ring-amber-500/30">
          <p>Anyone with the link will be able to view this project. Continue?</p>
          <div className="mt-3 flex justify-end gap-2"><button type="button" onClick={() => setConfirming(false)} className="rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-500/10">Cancel</button><button type="button" onClick={() => { setPublic(true); setConfirming(false); }} className="rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Make public</button></div>
        </div>
      )}
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
        <ul className="flex -space-x-2">{(isPublic ? ['🌍'] : ['AD', 'LM', 'MT', 'KM']).map((item) => <li key={item} className="grid size-7 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold text-white ring-2 ring-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-zinc-900">{item}</li>)}</ul>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">{isPublic ? 'Anyone on the internet' : 'Only you and 4 members'}</p>
      </div>
    </section>
  );
}
