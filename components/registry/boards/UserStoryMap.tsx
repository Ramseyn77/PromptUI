/**
 * @registry
 * name: User Story Map
 * category: Boards
 * style: SaaS
 * tags: recent
 * description: Carte de user stories : activités en colonnes, stories en dessous et lignes de release (MVP, v2) repliables.
 * prompt: Create a user story map: a top row of user activities (Discover, Sign up, Build, Share) as dark cards, under each a column of story cards split into horizontal release swimlanes (MVP, Release 2) separated by labeled dividers; each release lane can be collapsed (aria-expanded) and story cards show points; horizontal scroll on small screens. Light and dark mode.
 */
'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const activities = ['Discover', 'Sign up', 'Build', 'Share'];
const releases = [
  { name: 'MVP', stories: [['Landing page', 'Pricing'], ['Email signup'], ['Templates', 'Editor'], ['Public link']] },
  { name: 'Release 2', stories: [['Blog'], ['Google sign-in', 'Team invite'], ['AI assist'], ['Embed', 'Export PDF']] },
];

export function UserStoryMap() {
  const [closed, setClosed] = useState<string[]>([]);

  return (
    <div className="w-full max-w-3xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950" data-lenis-prevent>
      <div className="min-w-[38rem]">
        <div className="grid grid-cols-4 gap-2">{activities.map((activity) => <div key={activity} className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">{activity}</div>)}</div>
        {releases.map((release) => {
          const open = !closed.includes(release.name);
          return (
            <section key={release.name} className="mt-3">
              <button type="button" aria-expanded={open} onClick={() => setClosed((list) => (open ? [...list, release.name] : list.filter((item) => item !== release.name)))} className="flex w-full items-center gap-2 border-t-2 border-dashed border-zinc-300 pt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-700">
                <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? '' : '-rotate-90'}`} />{release.name}<span className="font-normal normal-case tracking-normal">· {release.stories.flat().length} stories</span>
              </button>
              {open && (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {release.stories.map((column, index) => (
                    <ul key={index} className="space-y-2">{column.map((story, i) => <li key={story} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">{story}<span className="mt-1 block text-[10px] font-semibold text-amber-700 dark:text-amber-300">{[3, 5, 2, 8][(index + i) % 4]} pts</span></li>)}</ul>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
