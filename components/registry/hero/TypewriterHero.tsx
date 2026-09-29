/**
 * @registry
 * name: Typewriter Hero
 * category: Hero
 * style: Dark
 * tags: recent
 * description: Hero qui tape puis efface des phrases avec un curseur clignotant.
 * prompt: Create a hero where a phrase types itself character by character, pauses, deletes and moves to the next one, with a blinking caret. Provide the phrases as sr-only text, freeze on the first phrase with prefers-reduced-motion. Light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const phrases = ['a landing page', 'a pricing table', 'an admin dashboard', 'a checkout flow'];

export function TypewriterHero() {
  const [phrase, setPhrase] = useState(0);
  const [length, setLength] = useState(phrases[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const current = phrases[phrase];
    const done = !deleting && length === current.length;
    const cleared = deleting && length === 0;
    const timer = window.setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) { setDeleting(false); setPhrase((value) => (value + 1) % phrases.length); }
      else setLength((value) => value + (deleting ? -1 : 1));
    }, done ? 1400 : deleting ? 35 : 70);
    return () => window.clearTimeout(timer);
  }, [phrase, length, deleting]);

  return (
    <>
      <style>{`@keyframes pui-caret{50%{opacity:0}}`}</style>
      <section className="w-full max-w-4xl rounded-3xl bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
        <p className="font-mono text-sm text-teal-700 dark:text-teal-400">// describe it, get the code</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
          <span className="sr-only">Build a landing page, a pricing table, an admin dashboard or a checkout flow.</span>
          <span aria-hidden>
            Build <span className="text-teal-600 dark:text-teal-400">{phrases[phrase].slice(0, length)}</span>
            <span className="ml-1 inline-block h-[.9em] w-[3px] translate-y-1 bg-current motion-safe:animate-[pui-caret_1s_steps(1)_infinite]" />
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-zinc-600 dark:text-zinc-400">Type a sentence, preview the result, copy clean React you fully own.</p>
      </section>
    </>
  );
}
