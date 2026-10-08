/**
 * @registry
 * name: Orbiting Circles
 * category: Cards
 * style: Minimal
 * tags: featured, recent
 * description: Carte intégrations où des icônes gravitent sur deux orbites autour du logo central.
 * prompt: Create an integrations card: a central logo tile with two dashed concentric orbits; icons travel along each orbit (outer clockwise, inner counter-clockwise) using a rotating wrapper and counter-rotation so icons stay upright. Pause with reduced motion. Title and caption below. Light and dark mode.
 */
import { Calendar, Cloud, Database, FileText, Mail, MessageSquare, Workflow, Zap } from 'lucide-react';

const outer = [Database, Cloud, Mail, Calendar, FileText];
const inner = [Zap, MessageSquare, Workflow];

function Orbit({ icons, radius, duration, reverse }: { icons: typeof outer; radius: number; duration: number; reverse?: boolean }) {
  const spin = { animation: `pui-orbit ${duration}s linear infinite${reverse ? ' reverse' : ''}` };
  return (
    <>
      <div aria-hidden className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700" style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }} />
      <div aria-hidden className="pui-orbit-spin absolute left-1/2 top-1/2 size-0" style={spin}>
        {icons.map((Icon, index) => {
          const angle = (index / icons.length) * Math.PI * 2;
          return (
            <span key={index} className="absolute" style={{ left: Math.round(Math.cos(angle) * radius), top: Math.round(Math.sin(angle) * radius) }}>
              <span className="pui-orbit-spin -ml-5 -mt-5 grid size-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200" style={{ animation: `pui-orbit ${duration}s linear infinite${reverse ? '' : ' reverse'}` }}>
                <Icon className="size-4.5" />
              </span>
            </span>
          );
        })}
      </div>
    </>
  );
}

export function OrbitingCircles() {
  return (
    <article className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-orbit{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){.pui-orbit-spin{animation:none!important}}`}</style>
      <div className="relative mx-auto h-72 w-full overflow-hidden">
        <Orbit icons={outer} radius={120} duration={28} />
        <Orbit icons={inner} radius={64} duration={18} reverse />
        <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-lg font-black text-white shadow-lg shadow-teal-500/30">P</div>
      </div>
      <h3 className="mt-2 text-center font-semibold text-zinc-950 dark:text-zinc-50">Connects to everything</h3>
      <p className="mt-1 text-center text-sm text-zinc-500 dark:text-zinc-400">40+ integrations sync your data in real time.</p>
    </article>
  );
}
