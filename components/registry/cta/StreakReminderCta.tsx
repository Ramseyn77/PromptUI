/**
 * @registry
 * name: Streak Reminder CTA
 * category: CTA
 * style: Dark
 * tags: recent
 * description: Rappel de série en danger façon appli d'apprentissage : flamme qui vacille, semaine de jours validés, temps restant avant minuit et leçon de 5 minutes.
 * prompt: Create a dark "don't lose your streak" CTA: a flickering flame emoji with the streak count (47 days), a week row of 7 day circles (done ones filled orange, today outlined and pulsing), a countdown "4h 12m left today" (after mount, from a fixed value), a "Start 5-min lesson" primary button that marks today done (flame grows, count +1, confetti-free celebration text via aria-live) and a "Use streak freeze (2 left)" secondary action; reduced motion removes flicker and pulse. Dark in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function StreakReminderCta() {
  const [streak, setStreak] = useState(47);
  const [doneToday, setDoneToday] = useState(false);
  const [freezes, setFreezes] = useState(2);
  const [left, setLeft] = useState(4 * 3600 + 12 * 60);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (doneToday) return;
    const timer = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [doneToday]);

  return (
    <section className="w-full max-w-sm rounded-3xl bg-zinc-950 p-6 text-center text-white ring-1 ring-white/10">
      <style>{`@keyframes pui-flame { 0%, 100% { transform: scale(1) rotate(-2deg) } 50% { transform: scale(1.08) rotate(3deg) } }`}</style>
      <span aria-hidden className={`inline-block origin-bottom transition-transform duration-500 motion-safe:animate-[pui-flame_1.2s_ease-in-out_infinite] ${doneToday ? 'scale-125 text-6xl' : 'text-5xl grayscale-[40%]'}`}>🔥</span>
      <p className="mt-2 text-3xl font-black tabular-nums">{streak} days</p>
      <p className="text-sm text-zinc-400">{doneToday ? 'Streak saved for today' : 'Your streak is at risk'}</p>
      <ol aria-label="This week" className="mt-5 flex justify-center gap-2">{week.map((day, index) => { const today = index === 3; const done = index < 3 || (today && doneToday); return <li key={index} className="flex flex-col items-center gap-1 text-[10px] text-zinc-500"><span className={`grid size-8 place-items-center rounded-full text-xs font-bold ${done ? 'bg-orange-500 text-white' : today ? 'ring-2 ring-orange-400 motion-safe:animate-pulse' : 'bg-white/5'}`}>{done ? '✓' : ''}</span>{day}<span className="sr-only">{done ? 'done' : today ? 'today, not done' : 'upcoming'}</span></li>; })}</ol>
      {!doneToday && <p className="mt-4 text-sm text-orange-300"><span className="font-mono tabular-nums">{Math.floor(left / 3600)}h {String(Math.floor((left % 3600) / 60)).padStart(2, '0')}m</span> left today</p>}
      <p aria-live="polite" className="mt-2 h-5 text-sm text-emerald-300">{message}</p>
      <button type="button" disabled={doneToday} onClick={() => { setDoneToday(true); setStreak(streak + 1); setMessage('Lesson complete — 48 days and counting!'); }} className="mt-2 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 py-3 text-sm font-bold text-zinc-950 disabled:opacity-40">{doneToday ? 'Done for today ✓' : 'Start 5-min lesson'}</button>
      <button type="button" disabled={doneToday || freezes === 0} onClick={() => { setFreezes(freezes - 1); setDoneToday(true); setMessage('Streak freeze used. See you tomorrow!'); }} className="mt-2 w-full rounded-2xl py-2.5 text-sm text-sky-300 ring-1 ring-white/10 hover:bg-white/5 disabled:opacity-40">🧊 Use streak freeze ({freezes} left)</button>
    </section>
  );
}
