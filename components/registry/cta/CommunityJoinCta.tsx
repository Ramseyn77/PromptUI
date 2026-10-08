/**
 * @registry
 * name: Community Join CTA
 * category: CTA
 * style: Glass
 * tags: recent
 * description: Invitation à rejoindre la communauté avec avatars en orbite, compteur de membres en ligne et bouton.
 * prompt: Create a community CTA: glass card over a soft gradient, a cluster of avatars arranged around a center icon, "3,412 members online" with a pulsing dot, headline and a Join button. Stacks nicely on mobile; light and dark mode, reduced-motion safe pulse.
 */
import { MessagesSquare } from 'lucide-react';

const avatars = [[0, -52, 180], [48, -22, 250], [40, 32, 30], [-40, 32, 320], [-48, -22, 120]];

export function CommunityJoinCta() {
  return (
    <>
      <style>{`@keyframes pui-online{0%{box-shadow:0 0 0 0 rgba(16,185,129,.6)}100%{box-shadow:0 0 0 7px rgba(16,185,129,0)}}`}</style>
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-teal-100 via-sky-100 to-violet-200 p-6 dark:from-teal-950 dark:via-zinc-950 dark:to-violet-950">
        <section className="rounded-2xl border border-white/60 bg-white/60 p-6 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div aria-hidden className="relative mx-auto size-36">
            {avatars.map(([x, y, hue]) => <span key={hue} className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white dark:border-zinc-900" style={{ marginLeft: x, marginTop: y, background: `hsl(${hue} 65% 60%)` }} />)}
            <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"><MessagesSquare className="size-5" /></span>
          </div>
          <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300"><span className="size-2 rounded-full bg-emerald-500 motion-safe:animate-[pui-online_1.6s_ease-out_infinite]" />3,412 members online</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Build alongside the community</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Share work, get feedback, find collaborators.</p>
          <a href="#" className="mt-5 inline-block rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Join the community</a>
        </section>
      </div>
    </>
  );
}
