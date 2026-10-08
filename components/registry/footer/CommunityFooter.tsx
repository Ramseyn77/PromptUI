/**
 * @registry
 * name: Community Footer
 * category: Footer
 * style: Gradient
 * tags: recent
 * description: Pied de page communautaire avec compteur de membres, avatars et invitations à rejoindre.
 * prompt: Create a community footer: gradient headline "Join 24,000 builders", overlapping avatar stack with "+24k", three join cards (Chat, Newsletter, Events) with icons and short descriptions, then copyright. Cards in 3 columns from sm. Light and dark mode.
 */
import { CalendarDays, Mail, MessagesSquare } from 'lucide-react';

const channels = [
  { icon: MessagesSquare, title: 'Community chat', text: 'Ask questions, share builds.' },
  { icon: Mail, title: 'Weekly newsletter', text: 'New components every Friday.' },
  { icon: CalendarDays, title: 'Live events', text: 'Monthly build-alongs.' },
];

export function CommunityFooter() {
  return (
    <footer className="w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex justify-center -space-x-2">
        {Array.from({ length: 6 }, (_, index) => <span key={index} className="size-9 rounded-full border-2 border-white dark:border-zinc-950" style={{ background: `hsl(${index * 50 + 160} 65% 60%)` }} />)}
        <span className="grid size-9 place-items-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-bold text-zinc-700 dark:border-zinc-950 dark:bg-zinc-800 dark:text-zinc-200">+24k</span>
      </div>
      <p className="mt-4 bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">Join 24,000 builders</p>
      <ul className="mt-6 grid gap-3 text-left sm:grid-cols-3">
        {channels.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <a href="#" className="flex h-full gap-3 rounded-2xl border border-zinc-200 p-4 transition hover:border-teal-500/50 hover:shadow-md dark:border-zinc-800">
              <Icon aria-hidden className="size-5 shrink-0 text-teal-600 dark:text-teal-400" />
              <span><span className="block text-sm font-semibold text-zinc-900 dark:text-white">{title}</span><span className="block text-xs text-zinc-500 dark:text-zinc-400">{text}</span></span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">© 2026 Builders Club</p>
    </footer>
  );
}
