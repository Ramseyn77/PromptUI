/**
 * @registry
 * name: Team Member Card
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Carte de membre d'équipe qui se retourne au clic pour montrer bio, compétences et liens de contact.
 * prompt: Create a team member flip card: front with portrait (gradient), name, role and a "More" button; clicking flips the card in 3D (button aria-pressed) to the back with a short bio, skill chips and contact links (email, calendar); a "Back" button flips again and focus moves to it. Instant swap with reduced motion. Light and dark mode.
 */
'use client';
import { CalendarDays, Mail } from 'lucide-react';
import { useState } from 'react';

export function TeamMemberCard() {
  const [flipped, setFlipped] = useState(false);
  const face = 'absolute inset-0 rounded-3xl border border-zinc-200 bg-white p-6 [backface-visibility:hidden] dark:border-zinc-800 dark:bg-zinc-950';

  return (
    <div className="h-80 w-64 [perspective:1000px]">
      <div className="relative size-full transition-transform duration-700 [transform-style:preserve-3d] motion-reduce:transition-none" style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}>
        <div className={`${face} flex flex-col items-center text-center`} aria-hidden={flipped}>
          <span aria-hidden className="size-28 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-orange-300" />
          <h3 className="mt-4 font-semibold text-zinc-950 dark:text-zinc-50">Thomas Ndiaye</h3>
          <p className="text-sm text-zinc-500">Head of Engineering</p>
          <button type="button" tabIndex={flipped ? -1 : 0} aria-pressed={flipped} onClick={() => setFlipped(true)} className="mt-auto rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">More about Thomas</button>
        </div>
        <div className={`${face} flex flex-col [transform:rotateY(180deg)]`} aria-hidden={!flipped}>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Builds calm infrastructure. Previously at two fintechs in Dakar and Paris. Runs on coffee and Afrobeat.</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">{['Go', 'Postgres', 'Kubernetes', 'Mentoring'].map((skill) => <li key={skill} className="rounded-full bg-violet-100 px-2 py-0.5 text-xs text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">{skill}</li>)}</ul>
          <div className="mt-4 space-y-1.5 text-sm"><a href="#mail" tabIndex={flipped ? 0 : -1} className="flex items-center gap-2 text-zinc-700 hover:underline dark:text-zinc-300"><Mail aria-hidden className="size-4" />thomas@acme.dev</a><a href="#book" tabIndex={flipped ? 0 : -1} className="flex items-center gap-2 text-zinc-700 hover:underline dark:text-zinc-300"><CalendarDays aria-hidden className="size-4" />Book 30 min</a></div>
          <button type="button" tabIndex={flipped ? 0 : -1} onClick={() => setFlipped(false)} className="mt-auto rounded-full bg-zinc-950 px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-950">Back</button>
        </div>
      </div>
    </div>
  );
}
