/**
 * @registry
 * name: Social Wall Footer
 * category: Footer
 * style: Dark
 * tags: recent
 * description: Pied de page sombre avec grande rangée de réseaux sociaux en tuiles, compteurs d'abonnés et liens.
 * prompt: Create a dark footer centered on community: a heading "Follow the journey", a row of large social tiles (Video, Newsletter, Podcast, Forum, Code — generic lucide icons, no brand logos) each with follower count that lift and glow on hover, then a compact link line and copyright. Tiles wrap to 2–3 per row on mobile. Dark in both themes.
 */
import { Code2, Mail, MessagesSquare, Mic, PlaySquare } from 'lucide-react';

const tiles = [[PlaySquare, 'Video', '48k', 'hover:shadow-rose-500/30 hover:text-rose-300'], [Mail, 'Newsletter', '21k', 'hover:shadow-amber-500/30 hover:text-amber-300'], [Mic, 'Podcast', '9k', 'hover:shadow-violet-500/30 hover:text-violet-300'], [MessagesSquare, 'Forum', '12k', 'hover:shadow-sky-500/30 hover:text-sky-300'], [Code2, 'Code', '6.4k', 'hover:shadow-emerald-500/30 hover:text-emerald-300']] as const;

export function SocialWallFooter() {
  return (
    <footer className="w-full max-w-4xl rounded-3xl bg-zinc-950 px-6 py-10 text-center text-white ring-1 ring-white/10">
      <p className="text-2xl font-semibold tracking-tight">Follow the journey</p>
      <p className="mt-1 text-sm text-zinc-400">Behind-the-scenes, tutorials and weekly drops.</p>
      <ul className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {tiles.map(([Icon, label, count, hover]) => (
          <li key={label}><a href={`#${label.toLowerCase()}`} className={`flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-zinc-300 shadow-lg shadow-transparent transition hover:-translate-y-1 hover:bg-white/10 ${hover}`}><Icon aria-hidden className="size-6" /><span className="text-sm font-semibold text-white">{label}</span><span className="text-xs text-zinc-400">{count} followers</span></a></li>
        ))}
      </ul>
      <nav aria-label="Footer" className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-zinc-400">{['About', 'Press kit', 'Sponsor', 'Privacy', 'Terms'].map((link) => <a key={link} href="#footer" className="hover:text-white">{link}</a>)}</nav>
      <p className="mt-4 text-xs text-zinc-500">© 2026 Studio Nord</p>
    </footer>
  );
}
