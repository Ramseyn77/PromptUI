/**
 * @registry
 * name: Inline Edit Field
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Fiche de profil dont chaque champ s'édite sur place : clic sur le crayon, Entrée pour valider, Échap pour annuler.
 * prompt: Create inline editable fields in a profile card (Display name, Email, Website): each row shows the value with a pencil button (aria-label "Edit display name"); editing swaps to an input with Save/Cancel icon buttons, Enter saves, Escape cancels and restores focus to the pencil; saved rows briefly flash teal and show "Saved" in an aria-live region. Light and dark mode.
 */
'use client';
import { Check, Pencil, X } from 'lucide-react';
import { useRef, useState } from 'react';

function Row({ label, initial, type = 'text' }: { label: string; initial: string; type?: string }) {
  const [value, setValue] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const pencil = useRef<HTMLButtonElement>(null);
  const close = () => { setEditing(false); window.setTimeout(() => pencil.current?.focus()); };
  const save = () => { setValue(draft); setSaved(true); window.setTimeout(() => setSaved(false), 1200); close(); };

  return (
    <div className={`flex min-h-14 items-center gap-3 border-b border-zinc-100 px-4 py-2 transition-colors last:border-0 dark:border-zinc-900 ${saved ? 'bg-teal-50 dark:bg-teal-400/10' : ''}`}>
      <span className="w-24 shrink-0 text-xs font-medium text-zinc-500">{label}</span>
      {editing ? (
        <>
          <input autoFocus type={type} aria-label={label} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') save(); if (event.key === 'Escape') { setDraft(value); close(); } }} className="min-w-0 flex-1 rounded-md border border-teal-500 bg-transparent px-2 py-1 text-sm text-zinc-900 outline-none dark:text-zinc-100" />
          <button type="button" aria-label="Save" onClick={save} className="grid size-7 place-items-center rounded-md bg-teal-600 text-white"><Check aria-hidden className="size-4" /></button>
          <button type="button" aria-label="Cancel" onClick={() => { setDraft(value); close(); }} className="grid size-7 place-items-center rounded-md border border-zinc-300 text-zinc-500 dark:border-zinc-700"><X aria-hidden className="size-4" /></button>
        </>
      ) : (
        <>
          <span className="min-w-0 flex-1 truncate text-sm text-zinc-900 dark:text-zinc-100">{value}</span>
          <span aria-live="polite" className="text-xs text-teal-700 dark:text-teal-400">{saved ? 'Saved' : ''}</span>
          <button ref={pencil} type="button" aria-label={`Edit ${label.toLowerCase()}`} onClick={() => { setDraft(value); setEditing(true); }} className="grid size-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"><Pencil aria-hidden className="size-3.5" /></button>
        </>
      )}
    </div>
  );
}

export function InlineEditField() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <p className="border-b border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">Profile</p>
      <Row label="Display name" initial="Awa Ndiaye" />
      <Row label="Email" initial="awa@studio.sn" type="email" />
      <Row label="Website" initial="awandiaye.design" type="url" />
    </div>
  );
}
