/**
 * @registry
 * name: Forum Thread Testimonial
 * category: Testimonials
 * style: SaaS
 * tags: recent
 * description: Témoignages présentés comme un fil de forum communautaire : question initiale, réponses votables, réponse acceptée et badges de membres.
 * prompt: Create a testimonials section styled as a community forum thread: an original post "Anyone using Prism for client reporting?" with author, time and tags; three replies with upvote buttons (aria-pressed, count changes), member badges (Pro user, 2 yrs), one reply marked "Accepted answer" with a green check; replies are indented with a thread line; a footer "Join 30k makers in the community" link. Light and dark mode.
 */
'use client';
import { ArrowBigUp, CheckCircle2, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const replies = [
  { id: 1, name: 'Ines R.', badge: 'Pro user · 2 yrs', text: 'Yes — we send every client a branded report each Monday. Setup took an afternoon and clients actually read them.', votes: 48, accepted: true },
  { id: 2, name: 'Tunde A.', badge: 'Agency', text: 'The white-label export alone paid for itself. We dropped two other tools.', votes: 31, accepted: false },
  { id: 3, name: 'Sara K.', badge: 'New member', text: 'Switched last month, the template gallery saved me hours. Support was quick too.', votes: 12, accepted: false },
];

export function ForumThreadTestimonial() {
  const [voted, setVoted] = useState<number[]>([]);

  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <article>
        <div className="flex items-center gap-2 text-xs text-zinc-500"><span className="grid size-6 place-items-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">MB</span>Marc B. · 3 days ago</div>
        <h3 className="mt-2 font-semibold text-zinc-950 dark:text-white">Anyone using Prism for client reporting?</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Running a small agency and our reporting is a mess of spreadsheets. Worth it?</p>
        <div className="mt-2 flex gap-1.5">{['agencies', 'reporting'].map((tag) => <span key={tag} className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">#{tag}</span>)}</div>
      </article>
      <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-zinc-500"><MessageSquare aria-hidden className="size-3.5" />{replies.length} replies</p>
      <ol className="mt-2 space-y-3 border-l-2 border-zinc-100 pl-4 dark:border-zinc-800">
        {replies.map((reply) => {
          const on = voted.includes(reply.id);
          return (
            <li key={reply.id} className={`flex gap-3 rounded-xl p-3 ${reply.accepted ? 'bg-emerald-50 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:ring-emerald-500/30' : ''}`}>
              <button type="button" aria-pressed={on} aria-label={`Upvote ${reply.name}, ${reply.votes + (on ? 1 : 0)} votes`} onClick={() => setVoted((list) => (on ? list.filter((id) => id !== reply.id) : [...list, reply.id]))} className={`flex h-fit flex-col items-center rounded-lg px-1.5 py-1 text-xs font-semibold tabular-nums ${on ? 'text-orange-600 dark:text-orange-400' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}><ArrowBigUp aria-hidden className={`size-5 ${on ? 'fill-current' : ''}`} />{reply.votes + (on ? 1 : 0)}</button>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-xs"><span className="font-semibold text-zinc-950 dark:text-white">{reply.name}</span><span className="rounded-full bg-indigo-50 px-1.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">{reply.badge}</span>{reply.accepted && <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400"><CheckCircle2 aria-hidden className="size-3.5" />Accepted answer</span>}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{reply.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <a href="#" className="mt-4 block text-center text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">Join 30k makers in the community →</a>
    </section>
  );
}
