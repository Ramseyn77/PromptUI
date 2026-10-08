/**
 * @registry
 * name: Candidate Pipeline Board
 * category: Boards
 * style: SaaS
 * tags: recent
 * description: Pipeline recruteur interactif : les candidats avancent d'étape en un clic, colonnes empilées sur mobile.
 * prompt: Create a responsive, interactive recruiting pipeline with three stages (New, Interview, Offer). Each candidate card shows initials, name, role and a match score; an "Advance" button moves the candidate to the next stage (the card animates in), and candidates in Offer show a "Ready to hire" badge instead. Show per-stage counts and a header summary of active candidates. On mobile the stages stack vertically with no horizontal scrolling; from md they sit side by side in three columns. Announce moves through aria-live, keep visible focus, support light/dark mode and prefers-reduced-motion.
 */
'use client';

import { ArrowRight, BadgeCheck, Briefcase, Star } from 'lucide-react';
import { useState } from 'react';

const stages = [
  { name: 'New', tone: 'bg-blue-500' },
  { name: 'Interview', tone: 'bg-amber-500' },
  { name: 'Offer', tone: 'bg-emerald-500' },
] as const;

type Candidate = { initials: string; name: string; role: string; score: number; stage: number };

const initialCandidates: Candidate[] = [
  { initials: 'AM', name: 'Amina Mensah', role: 'Product Designer', score: 92, stage: 0 },
  { initials: 'JL', name: 'Jon Lee', role: 'UX Researcher', score: 86, stage: 0 },
  { initials: 'KO', name: 'Kofi Owusu', role: 'Product Designer', score: 95, stage: 1 },
  { initials: 'SN', name: 'Sara Nwosu', role: 'Design Lead', score: 89, stage: 1 },
  { initials: 'TM', name: 'Tari Musa', role: 'UX Researcher', score: 97, stage: 2 },
];

export function CandidatePipelineBoard() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [announcement, setAnnouncement] = useState('');

  const advance = (name: string) => {
    const candidate = candidates.find((item) => item.name === name);
    if (!candidate || candidate.stage >= stages.length - 1) return;
    setCandidates((items) => items.map((item) => (item.name === name ? { ...item, stage: item.stage + 1 } : item)));
    setAnnouncement(`${name} moved to ${stages[candidate.stage + 1].name}.`);
  };

  return (
    <section className="w-full max-w-5xl rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
      <style>{`@keyframes pui-candidate-in{from{opacity:0;transform:translateY(-6px) scale(.98)}}@media(prefers-reduced-motion:reduce){.pui-candidate{animation:none!important}}`}</style>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-bold text-zinc-950 dark:text-white">Candidate pipeline</h2>
          <p className="text-xs text-zinc-500">Senior design roles · {candidates.length} active · {candidates.filter((item) => item.stage === stages.length - 1).length} at offer</p>
        </div>
        <Briefcase aria-hidden className="shrink-0 text-violet-500" size={20} />
      </div>
      <p className="sr-only" aria-live="polite">{announcement}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {stages.map((stage, stageIndex) => {
          const people = candidates.filter((item) => item.stage === stageIndex);
          return (
            <div key={stage.name} className="min-w-0 rounded-2xl bg-white p-3 dark:bg-zinc-900">
              <div className="flex items-center gap-2 px-1">
                <span aria-hidden className={`size-2 rounded-full ${stage.tone}`} />
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{stage.name}</h3>
                <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium tabular-nums text-zinc-500 dark:bg-zinc-800">{people.length}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {people.length === 0 && <li className="rounded-xl border border-dashed border-zinc-200 p-3 text-center text-xs text-zinc-400 dark:border-zinc-800">No candidates yet</li>}
                {people.map((person) => (
                  <li key={`${person.name}-${stageIndex}`} className="pui-candidate rounded-xl border border-zinc-200 p-3 motion-safe:animate-[pui-candidate-in_.35s_ease-out] dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">{person.initials}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{person.name}</p>
                        <p className="truncate text-[11px] text-zinc-500">{person.role}</p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-amber-600" aria-label={`Match score ${person.score}`}><Star aria-hidden size={11} fill="currentColor" />{person.score}</span>
                    </div>
                    <div className="mt-3 flex justify-end">
                      {stageIndex < stages.length - 1 ? (
                        <button type="button" onClick={() => advance(person.name)} aria-label={`Advance ${person.name} to ${stages[stageIndex + 1].name}`} className="inline-flex items-center gap-1 rounded-full bg-zinc-950 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-violet-300 dark:focus-visible:ring-offset-zinc-900">
                          Advance <ArrowRight aria-hidden size={12} />
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"><BadgeCheck aria-hidden size={12} />Ready to hire</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
