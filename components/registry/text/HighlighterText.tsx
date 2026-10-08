/**
 * @registry
 * name: Highlighter Text
 * category: Text
 * style: Editorial
 * tags: recent
 * description: Paragraphe où certains mots sont surlignés au marqueur, le trait se dessine de gauche à droite.
 * prompt: Create a paragraph with <mark> words highlighted by a hand-drawn marker effect: a skewed, slightly rotated background bar that grows from 0 to 100% width (background-size transition) with staggered delays after mount; different marker colors. Readable in light and dark mode.
 */
'use client';
import { useEffect, useState } from 'react';

const marks = [
  { text: 'less time', color: 'bg-[linear-gradient(transparent_55%,rgba(250,204,21,.6)_55%)]' },
  { text: 'better decisions', color: 'bg-[linear-gradient(transparent_55%,rgba(45,212,191,.55)_55%)]' },
  { text: 'fewer meetings', color: 'bg-[linear-gradient(transparent_55%,rgba(244,114,182,.5)_55%)]' },
];

export function HighlighterText() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setDrawn(true), 300); return () => window.clearTimeout(timer); }, []);
  const mark = (index: number) => (
    <mark className={`bg-transparent bg-no-repeat px-0.5 text-inherit transition-[background-size] duration-700 ease-out ${marks[index].color}`} style={{ backgroundSize: drawn ? '100% 100%' : '0% 100%', transitionDelay: `${index * 350}ms` }}>{marks[index].text}</mark>
  );

  return (
    <p className="max-w-xl font-serif text-2xl leading-relaxed text-zinc-800 dark:text-zinc-100">
      Good tools help you spend {mark(0)} on busywork, make {mark(1)} with clear data, and have {mark(2)} because everyone already knows the plan.
    </p>
  );
}
