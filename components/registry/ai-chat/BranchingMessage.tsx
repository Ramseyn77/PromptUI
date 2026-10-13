/**
 * @registry
 * name: Branching Message
 * category: AI Chat
 * style: Minimal
 * tags: featured, recent
 * description: Message utilisateur modifiable qui crée des branches de conversation, navigation « ‹ 2/3 › » entre versions avec la réponse associée.
 * prompt: Create a branching chat message: a user bubble with an Edit button that turns it into a textarea with Cancel / Send; sending creates a new branch; a "‹ 2 / 3 ›" pager under the bubble switches between branches (aria-label "Previous version"/"Next version", aria-live counter) and the assistant answer below changes to the one tied to that branch; the edit textarea supports Escape to cancel and ⌘/Ctrl+Enter to send. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight, Pencil, Sparkles } from 'lucide-react';
import { useState } from 'react';

const answerFor = (question: string) => (question.toLowerCase().includes('short') ? 'Sure — “Ship small, ship often.”' : question.toLowerCase().includes('playful') ? '“Fewer meetings, more launches 🚀” — want a few more in that tone?' : 'Here are three options: “Build what matters”, “From idea to impact” and “Make it real, faster”.');

export function BranchingMessage() {
  const [branches, setBranches] = useState(['Give me a tagline for our launch', 'Give me a short tagline for our launch']);
  const [index, setIndex] = useState(1);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  function send() {
    if (!draft.trim()) return;
    setBranches((list) => [...list, draft.trim()]);
    setIndex(branches.length);
    setEditing(false);
  }

  return (
    <div className="w-full max-w-lg space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col items-end">
        {editing ? (
          <div className="w-full max-w-sm rounded-2xl border border-zinc-300 p-2 dark:border-zinc-700">
            <textarea aria-label="Edit message" rows={2} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setEditing(false); if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) send(); }} className="w-full resize-none bg-transparent px-1 text-sm text-zinc-900 outline-none dark:text-zinc-100" />
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setEditing(false)} className="rounded-lg px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button><button type="button" onClick={send} className="rounded-lg bg-zinc-950 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Send</button></div>
          </div>
        ) : (
          <div className="group flex items-start gap-1">
            <button type="button" aria-label="Edit message" onClick={() => { setDraft(branches[index]); setEditing(true); }} className="mt-1.5 grid size-7 place-items-center rounded-full text-zinc-400 opacity-60 hover:bg-zinc-100 hover:text-zinc-700 group-hover:opacity-100 dark:hover:bg-zinc-800"><Pencil aria-hidden className="size-3.5" /></button>
            <p className="max-w-xs rounded-2xl rounded-br-md bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">{branches[index]}</p>
          </div>
        )}
        {!editing && branches.length > 1 && (
          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <button type="button" aria-label="Previous version" disabled={index === 0} onClick={() => setIndex(index - 1)} className="grid size-6 place-items-center rounded hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ChevronLeft aria-hidden className="size-3.5" /></button>
            <span aria-live="polite" className="tabular-nums">{index + 1} / {branches.length}</span>
            <button type="button" aria-label="Next version" disabled={index === branches.length - 1} onClick={() => setIndex(index + 1)} className="grid size-6 place-items-center rounded hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ChevronRight aria-hidden className="size-3.5" /></button>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"><Sparkles aria-hidden className="size-3.5" /></span>
        <p key={index} className="text-sm leading-relaxed text-zinc-700 motion-safe:animate-[pui-branch-in_.3s_ease-out] dark:text-zinc-300">{answerFor(branches[index])}</p>
      </div>
      <style>{`@keyframes pui-branch-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }`}</style>
    </div>
  );
}
