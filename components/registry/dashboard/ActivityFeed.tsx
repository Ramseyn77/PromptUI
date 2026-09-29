/**
 * @registry
 * name: Activity Feed
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Fil d activite chronologique avec avatars, actions, cibles en gras et horodatage relatif.
 * prompt: Create an activity feed card: header with "View all", an ordered list connected by a vertical line, each item with an avatar or colored icon badge, "Name did action on Target", a relative time, and optional quoted comment block. Light and dark mode.
 */
import { GitMerge, MessageSquare, Rocket, UserPlus } from 'lucide-react';

const events = [
  { icon: Rocket, tone: 'bg-violet-500', who: 'Léa', action: 'deployed', target: 'v2.4.0 to production', time: '4 min ago' },
  { icon: MessageSquare, tone: 'bg-sky-500', who: 'Noah', action: 'commented on', target: 'Checkout redesign', time: '32 min ago', quote: 'Love the new summary panel, ship it!' },
  { icon: GitMerge, tone: 'bg-teal-500', who: 'Inès', action: 'merged', target: 'feat/dark-mode', time: '2 h ago' },
  { icon: UserPlus, tone: 'bg-amber-500', who: 'Tom', action: 'invited', target: 'maria@lumen.io', time: 'Yesterday' },
];

export function ActivityFeed() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Activity</h3>
        <a href="#" className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400">View all</a>
      </div>
      <ol className="mt-5">
        {events.map(({ icon: Icon, ...event }, index) => (
          <li key={event.target} className="relative flex gap-3 pb-5 last:pb-0">
            {index < events.length - 1 && <span aria-hidden className="absolute left-4 top-9 h-[calc(100%-2.25rem)] w-px bg-zinc-200 dark:bg-zinc-800" />}
            <span className={`grid size-8 shrink-0 place-items-center rounded-full text-white ring-4 ring-white dark:ring-zinc-950 ${event.tone}`}><Icon aria-hidden className="size-4" /></span>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="font-semibold text-zinc-900 dark:text-white">{event.who}</strong> {event.action} <strong className="font-medium text-zinc-900 dark:text-white">{event.target}</strong></p>
              <p className="mt-0.5 text-xs text-zinc-400">{event.time}</p>
              {event.quote && <blockquote className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">{event.quote}</blockquote>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
