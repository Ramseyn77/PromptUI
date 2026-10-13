/**
 * @registry
 * name: AI Chat Demo Hero
 * category: Hero
 * style: Dark
 * tags: featured, recent
 * description: Hero sombre avec démo de chat IA qui se joue toute seule : question tapée lettre à lettre, réponse en streaming et carte de résultat.
 * prompt: Create a dark AI product hero with a self-playing chat demo: left side headline, subcopy and CTA; right side a chat window where a user question types itself character by character, then a "thinking" shimmer, then the assistant answer streams word by word and ends with a small result card (a mini bar chart "Revenue by region"); a Replay button restarts it; the demo runs only after mount and is fully shown at once with reduced motion; aria-live is off for the animation, with an sr-only summary. Dark in both themes.
 */
'use client';
import { RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const question = 'Which region grew fastest last quarter?';
const answer = 'West Africa grew fastest at +38%, driven by mobile money payments. Europe followed at +12%.'.split(' ');

export function AiChatDemoHero() {
  const [typed, setTyped] = useState(question.length);
  const [words, setWords] = useState(answer.length);
  const [phase, setPhase] = useState<'typing' | 'thinking' | 'answer' | 'done'>('done');
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setTyped(0); setWords(0); setPhase('typing');
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      if (step <= question.length) setTyped(step);
      else if (step <= question.length + 12) setPhase('thinking');
      else if (step <= question.length + 12 + answer.length * 2) { setPhase('answer'); setWords(Math.ceil((step - question.length - 12) / 2)); }
      else { setPhase('done'); window.clearInterval(timer); }
    }, 45);
    return () => window.clearInterval(timer);
  }, [run]);

  return (
    <section className="w-full bg-zinc-950 px-6 py-14 text-white">
      <style>{`@keyframes pui-think { to { background-position: -200% 0 } }`}</style>
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10"><Sparkles aria-hidden className="size-3.5 text-violet-400" />Ask your data</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Answers, not dashboards.</h1>
          <p className="mt-4 max-w-md text-zinc-400">Ask a question in plain language and get a chart with the reasoning behind it.</p>
          <a href="#" className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950">Try it free</a>
        </div>
        <div className="rounded-2xl bg-zinc-900 p-4 ring-1 ring-white/10">
          <p className="sr-only">Demo: a user asks “{question}” and the assistant answers that West Africa grew fastest at plus 38 percent.</p>
          <div aria-hidden className="space-y-3">
            <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-violet-600 px-4 py-2.5 text-sm">{question.slice(0, typed)}{phase === 'typing' && <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-white motion-safe:animate-pulse" />}</p>
            {phase === 'thinking' && <p className="w-fit bg-[linear-gradient(90deg,#71717a,#fafafa,#71717a)] bg-[length:200%_100%] bg-clip-text text-sm text-transparent motion-safe:animate-[pui-think_1.2s_linear_infinite]">Analyzing 4 tables…</p>}
            {(phase === 'answer' || phase === 'done') && (
              <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-white/5 px-4 py-3 text-sm leading-relaxed text-zinc-200">
                {answer.slice(0, words).join(' ')}
                {phase === 'done' && (
                  <div className="mt-3 rounded-xl bg-zinc-950 p-3 ring-1 ring-white/10">
                    <p className="text-xs text-zinc-400">Revenue growth by region</p>
                    <div className="mt-2 flex h-20 items-end gap-2">{[['W. Africa', 38], ['Europe', 12], ['Americas', 9], ['APAC', 6]].map(([label, value]) => <div key={label as string} className="flex flex-1 flex-col items-center gap-1"><div className="w-full rounded-t bg-gradient-to-t from-violet-600 to-fuchsia-400" style={{ height: `${(value as number) * 1.8}px` }} /><span className="text-[9px] text-zinc-500">{label as string}</span></div>)}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <button type="button" onClick={() => setRun(run + 1)} className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white"><RotateCcw aria-hidden className="size-3.5" />Replay demo</button>
        </div>
      </div>
    </section>
  );
}
