/**
 * @registry
 * name: Shared Cursor Tooltip
 * category: Tooltips
 * style: SaaS
 * tags: featured, recent
 * description: Curseurs multijoueurs avec étiquette de nom colorée qui suivent des trajectoires et affichent un message éphémère.
 * prompt: Create a multiplayer canvas preview with collaborator cursors: three colored cursor arrows with name-label tooltips glide between waypoints on a mock design canvas (CSS transitions, deterministic paths); one cursor periodically shows a chat bubble ("Love this!") under its label; your own pointer gets a "You" label that follows it inside the area; cursors freeze in place with reduced motion; aria-hidden decorations plus an sr-only "3 collaborators are viewing". Light and dark mode.
 */
'use client';
import { useEffect, useState, type PointerEvent } from 'react';

const people = [
  { name: 'Ava', color: '#8b5cf6', path: [[18, 30], [55, 22], [70, 60], [32, 70]] as const },
  { name: 'Leo', color: '#f97316', path: [[75, 25], [40, 50], [20, 60], [62, 40]] as const },
  { name: 'Maya', color: '#10b981', path: [[45, 75], [80, 70], [60, 30], [28, 42]] as const },
];

function Cursor({ color, name, message }: { color: string; name: string; message?: string }) {
  return (
    <>
      <svg viewBox="0 0 16 16" className="size-4 drop-shadow" aria-hidden><path d="M1 1l5 14 2-6 6-2z" fill={color} stroke="white" strokeWidth="1.2" strokeLinejoin="round" /></svg>
      <span className="ml-3 -mt-1 block w-max rounded-full px-2 py-0.5 text-[11px] font-semibold text-white shadow" style={{ background: color }}>{name}</span>
      {message && <span className="ml-3 mt-1 block w-max rounded-xl rounded-tl-sm px-2.5 py-1 text-xs text-white shadow" style={{ background: color }}>{message}</span>}
    </>
  );
}

export function SharedCursorTooltip() {
  const [step, setStep] = useState(0);
  const [me, setMe] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setStep((value) => value + 1), 1600);
    return () => window.clearInterval(timer);
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setMe({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
  }

  return (
    <div onPointerMove={move} onPointerLeave={() => setMe(null)} className="relative h-72 w-full max-w-xl cursor-none overflow-hidden rounded-2xl border border-zinc-200 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] bg-[size:18px_18px] dark:border-zinc-800 dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]">
      <span className="sr-only">3 collaborators are viewing this canvas</span>
      <div aria-hidden className="absolute left-[12%] top-[18%] h-24 w-40 rounded-xl bg-white shadow-md dark:bg-zinc-900"><div className="m-3 h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" /><div className="mx-3 h-2 w-28 rounded bg-zinc-100 dark:bg-zinc-800" /></div>
      <div aria-hidden className="absolute bottom-[14%] right-[10%] size-28 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 opacity-80" />
      {people.map((person, index) => {
        const [x, y] = person.path[(step + index) % person.path.length];
        return <div key={person.name} aria-hidden className="pointer-events-none absolute transition-all duration-[1500ms] ease-in-out" style={{ left: `${x}%`, top: `${y}%` }}><Cursor color={person.color} name={person.name} message={index === 0 && step % 4 === 2 ? 'Love this!' : undefined} /></div>;
      })}
      {me && <div aria-hidden className="pointer-events-none absolute" style={{ left: `${me.x}%`, top: `${me.y}%` }}><Cursor color="#0ea5e9" name="You" /></div>}
    </div>
  );
}
