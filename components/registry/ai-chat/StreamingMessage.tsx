/**
 * @registry
 * name: Streaming Message
 * category: AI Chat
 * style: Minimal
 * tags: featured, recent
 * description: Reponse d assistant qui s ecrit mot a mot avec curseur, puis bouton pour relancer.
 * prompt: Create an assistant message that streams its answer word by word (interval), shows a blinking block cursor while streaming, then reveals a "Regenerate" button that replays it. Full text in an aria-live region only once complete. Light and dark mode.
 */
'use client';
import { RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const answer = 'A good empty state tells people where they are, why it is empty, and what to do next. Keep one clear action and a friendly, specific sentence.';
const words = answer.split(' ');

export function StreamingMessage() {
  const [count, setCount] = useState(0);
  const [run, setRun] = useState(0);
  const done = count >= words.length;

  useEffect(() => {
    setCount(0);
    const timer = window.setInterval(() => setCount((value) => (value >= words.length ? value : value + 1)), 70);
    return () => window.clearInterval(timer);
  }, [run]);

  return (
    <>
      <style>{`@keyframes pui-cursor{50%{opacity:0}}`}</style>
      <div className="flex w-full max-w-lg gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-white"><Sparkles aria-hidden className="size-4" /></span>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-7 text-zinc-800 dark:text-zinc-200" aria-hidden={!done}>
            {words.slice(0, count).join(' ')}
            {!done && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-zinc-800 motion-safe:animate-[pui-cursor_.8s_steps(1)_infinite] dark:bg-zinc-200" />}
          </p>
          <p className="sr-only" aria-live="polite">{done ? answer : ''}</p>
          {done && (
            <button type="button" onClick={() => setRun((value) => value + 1)} className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">
              <RotateCcw aria-hidden className="size-3.5" /> Regenerate
            </button>
          )}
        </div>
      </div>
    </>
  );
}
