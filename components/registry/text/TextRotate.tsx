/**
 * @registry
 * name: Text Rotate
 * category: Text
 * style: Gradient
 * tags: featured, recent
 * description: Titre dont le mot final change en boucle avec une entree floue.
 * prompt: Create a headline "Build beautiful ___" where the last word cycles every 2.2s through a list, each word entering with a rise + blur keyframe and a teal-to-violet gradient. Provide the full sentence as sr-only text and stop cycling with prefers-reduced-motion.
 */
'use client';
import { useEffect, useState } from 'react';

const words = ['interfaces', 'dashboards', 'landing pages', 'AI agents'];

export function TextRotate() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`@keyframes pui-rise{from{opacity:0;transform:translateY(60%);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}`}</style>
      <h2 className="text-center text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
        <span className="sr-only">Build beautiful interfaces, dashboards, landing pages and AI agents.</span>
        <span aria-hidden>
          Build beautiful
          <span className="mt-1 block overflow-hidden pb-1">
            <span
              key={words[index]}
              className="inline-block bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text text-transparent motion-safe:animate-[pui-rise_.5s_cubic-bezier(.22,1,.36,1)]"
            >
              {words[index]}
            </span>
          </span>
        </span>
      </h2>
    </>
  );
}
