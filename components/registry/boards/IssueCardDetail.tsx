/**
 * @registry
 * name: Issue Card Detail
 * category: Boards
 * style: Minimal
 * tags: recent
 * description: Carte de ticket riche : etiquettes, sous-taches, echeance, assignes, commentaires et pieces jointes.
 * prompt: Create a rich kanban card: colored labels, title, a checklist progress bar "3/5", footer with due date chip (amber when soon), attachment and comment counts, and stacked assignee avatars. Hover lift. Light and dark mode.
 */
import { CalendarClock, MessageSquare, Paperclip } from 'lucide-react';

export function IssueCardDetail() {
  return (
    <article className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:text-violet-300">Design</span>
        <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300">High</span>
      </div>
      <h3 className="mt-3 text-sm font-semibold leading-5 text-zinc-900 dark:text-white">Redesign the empty states across the dashboard</h3>
      <div className="mt-3">
        <div className="flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400"><span>Checklist</span><span>3/5</span></div>
        <div className="mt-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full w-3/5 rounded-full bg-teal-500" /></div>
      </div>
      <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-1.5 py-0.5 font-medium text-amber-700 dark:text-amber-400"><CalendarClock aria-hidden className="size-3.5" /> Tomorrow</span>
        <span className="inline-flex items-center gap-1"><Paperclip aria-hidden className="size-3.5" />2<span className="sr-only"> attachments</span></span>
        <span className="inline-flex items-center gap-1"><MessageSquare aria-hidden className="size-3.5" />5<span className="sr-only"> comments</span></span>
        <span className="ml-auto flex -space-x-1.5">{['#14b8a6', '#8b5cf6'].map((color) => <span key={color} className="size-6 rounded-full border-2 border-white dark:border-zinc-950" style={{ background: color }} />)}</span>
      </div>
    </article>
  );
}
