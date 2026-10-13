/**
 * @registry
 * name: Achievement Badge Card
 * category: Cards
 * style: Dark
 * tags: recent
 * description: Carte de succès débloqué : médaille hexagonale brillante, rareté, progression vers le niveau suivant et grille de badges verrouillés.
 * prompt: Create a dark achievement card: a glowing hexagonal medal (CSS clip-path) with a flame emoji and a subtle shine sweep on hover/focus, title "30-day streak", rarity "Earned by 4% of learners", XP reward pill, a progress bar toward the next tier "60-day streak · 34/60", and a row of six smaller badges where locked ones are greyscale with a lock and an accessible label; reduced motion disables the shine. Dark in both themes.
 */
import { Lock } from 'lucide-react';

const badges = [['🔥', 'First streak', true], ['📚', 'Bookworm', true], ['⚡', 'Speed run', true], ['🎯', 'Perfect week', false], ['🏆', 'Top 10', false], ['🌙', 'Night owl', false]] as const;
const hex = 'polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)';

export function AchievementBadgeCard() {
  return (
    <article tabIndex={0} className="group w-full max-w-sm rounded-3xl bg-zinc-950 p-6 text-center text-white outline-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-amber-400">
      <style>{`@keyframes pui-medal-shine { from { transform: translateX(-120%) skewX(-20deg) } to { transform: translateX(220%) skewX(-20deg) } }`}</style>
      <div className="relative mx-auto size-32">
        <span aria-hidden className="absolute inset-0 rounded-full bg-amber-500/30 blur-2xl" />
        <div className="relative grid size-32 place-items-center overflow-hidden bg-gradient-to-br from-amber-300 via-orange-500 to-rose-600" style={{ clipPath: hex }}>
          <div className="grid size-24 place-items-center bg-zinc-950/30" style={{ clipPath: hex }}><span className="text-5xl" role="img" aria-label="Flame">🔥</span></div>
          <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-white/40 motion-safe:group-hover:animate-[pui-medal-shine_.9s_ease-out] motion-safe:group-focus-visible:animate-[pui-medal-shine_.9s_ease-out]" />
        </div>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-amber-400">Achievement unlocked</p>
      <h3 className="mt-1 text-2xl font-bold">30-day streak</h3>
      <p className="mt-1 text-sm text-zinc-400">Earned by 4% of learners</p>
      <span className="mt-3 inline-block rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-300">+500 XP</span>
      <div className="mt-6 text-left"><div className="flex justify-between text-xs text-zinc-400"><span>Next: 60-day streak</span><span className="tabular-nums">34/60</span></div><div className="mt-1.5 h-2 rounded-full bg-white/10"><div className="h-full w-[57%] rounded-full bg-gradient-to-r from-amber-400 to-rose-500" /></div></div>
      <ul className="mt-6 grid grid-cols-6 gap-2">
        {badges.map(([icon, name, earned]) => <li key={name} className={`relative grid aspect-square place-items-center rounded-xl text-lg ${earned ? 'bg-white/10' : 'bg-white/5 grayscale'}`} title={name}><span aria-hidden className={earned ? '' : 'opacity-30'}>{icon}</span>{!earned && <Lock aria-hidden className="absolute bottom-1 right-1 size-3 text-zinc-500" />}<span className="sr-only">{name}{earned ? ', earned' : ', locked'}</span></li>)}
      </ul>
    </article>
  );
}
