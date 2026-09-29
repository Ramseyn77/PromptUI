/**
 * @registry
 * name: Word Reveal
 * category: Text
 * style: Minimal
 * tags: featured, recent
 * description: Paragraphe dont les mots sortent du flou un par un quand il entre dans l ecran.
 * prompt: Create a word-by-word reveal paragraph: each word is a span that goes from blurred/transparent/translated to sharp with a staggered delay, triggered once by IntersectionObserver; the plain paragraph is readable by screen readers and fully visible with reduced motion. A "Replay" button restarts it. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const text = 'Great interfaces are not decorated. They are clarified, one small decision at a time, until nothing is left to explain.';

export function WordReveal() {
  const [shown, setShown] = useState(true);
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShown(false);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setShown(true); observer.disconnect(); } });
    const timer = window.setTimeout(() => observer.observe(node), 50);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, [run]);

  return (
    <div className="max-w-xl">
      <p ref={ref} aria-label={text} className="text-2xl font-semibold leading-snug text-zinc-900 dark:text-white">
        {text.split(' ').map((word, index) => (
          <span key={index} aria-hidden className="mr-[.25em] inline-block transition-all duration-700 ease-out" style={{ opacity: shown ? 1 : 0, filter: shown ? 'blur(0)' : 'blur(8px)', transform: shown ? 'none' : 'translateY(8px)', transitionDelay: `${index * 45}ms` }}>{word}</span>
        ))}
      </p>
      <button type="button" onClick={() => setRun((value) => value + 1)} className="mt-4 text-sm font-medium text-teal-700 hover:underline dark:text-teal-400">Replay</button>
    </div>
  );
}
