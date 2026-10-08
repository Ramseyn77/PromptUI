/**
 * @registry
 * name: Animated Beam Card
 * category: Cards
 * style: SaaS
 * tags: featured, recent
 * description: Schéma d'intégration où des faisceaux lumineux circulent des sources vers le hub puis vers la sortie.
 * prompt: Create an integration diagram card: three source nodes on the left, a central hub and one output node on the right, linked by curved SVG paths; a short gradient dash (pathLength 100, dasharray 14 86) travels along each path with staggered delays to suggest data flowing. Nodes are positioned with percentages over a fixed-ratio box so it scales. Static paths with reduced motion. Light and dark mode.
 */
import { Bot, Database, FileText, Mail, User } from 'lucide-react';

const sources = [{ icon: Database, y: 18 }, { icon: Mail, y: 50 }, { icon: FileText, y: 82 }];

export function AnimatedBeamCard() {
  return (
    <article className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-beam{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}@media (prefers-reduced-motion:reduce){.pui-beam{display:none}}`}</style>
      <div className="relative aspect-[16/9] w-full">
        <svg viewBox="0 0 160 90" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="pui-beam-gradient" x1="0" x2="1">
              <stop offset="0" stopColor="#2dd4bf" stopOpacity="0" />
              <stop offset=".5" stopColor="#2dd4bf" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          {[...sources.map((source) => `M16 ${source.y * 0.9} C 50 ${source.y * 0.9}, 50 45, 80 45`), 'M80 45 L144 45'].map((d, index) => (
            <g key={d}>
              <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={2} className="stroke-zinc-200 dark:stroke-zinc-800" />
              <path d={d} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={2.5} strokeLinecap="round" stroke="url(#pui-beam-gradient)" pathLength={100} strokeDasharray="14 86" className="pui-beam" style={{ animation: `pui-beam 2.6s ${index * 0.45}s linear infinite`, strokeDashoffset: 100 }} />
            </g>
          ))}
        </svg>
        {sources.map(({ icon: Icon, y }) => (
          <span key={y} className="absolute left-[10%] grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200" style={{ top: `${y}%` }}><Icon aria-hidden className="size-5" /></span>
        ))}
        <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-zinc-200 bg-white text-teal-600 shadow-lg shadow-teal-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-teal-400"><Bot aria-hidden className="size-7" /></span>
        <span className="absolute left-[90%] top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"><User aria-hidden className="size-5" /></span>
      </div>
      <h3 className="mt-4 font-semibold text-zinc-950 dark:text-zinc-50">Your data, one assistant</h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Databases, inbox and docs flow into a single AI agent that answers your team.</p>
    </article>
  );
}
