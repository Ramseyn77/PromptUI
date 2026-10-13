/**
 * @registry
 * name: Word Cloud Chart
 * category: Charts
 * style: Gradient
 * tags: recent
 * description: Nuage de mots de retours clients : taille selon la fréquence, couleur selon le sentiment, filtre de sentiment et détail au clic.
 * prompt: Create a word cloud of customer feedback terms: 20 words laid out in a flowing centered flex-wrap with font sizes scaled by frequency and colors by sentiment (positive emerald, neutral zinc, negative rose), slight deterministic rotations for a few words; a segmented filter (All, Positive, Negative) fades out other words; clicking a word (button) shows its count and two example quotes in a panel (aria-live); an accessible ranked list is available in a details element. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const words: [string, number, 'pos' | 'neu' | 'neg'][] = [['easy', 92, 'pos'], ['fast', 81, 'pos'], ['pricing', 64, 'neu'], ['support', 58, 'pos'], ['slow', 44, 'neg'], ['export', 40, 'neu'], ['beautiful', 38, 'pos'], ['bugs', 33, 'neg'], ['mobile', 31, 'neu'], ['intuitive', 29, 'pos'], ['expensive', 27, 'neg'], ['templates', 25, 'pos'], ['sync', 22, 'neu'], ['confusing', 20, 'neg'], ['reliable', 19, 'pos'], ['offline', 17, 'neu'], ['crash', 14, 'neg'], ['clean', 13, 'pos'], ['login', 11, 'neg'], ['dark mode', 10, 'pos']];
const tone = { pos: 'text-emerald-600 dark:text-emerald-400', neu: 'text-zinc-600 dark:text-zinc-300', neg: 'text-rose-600 dark:text-rose-400' };
const order = [10, 3, 15, 0, 7, 12, 1, 18, 5, 9, 2, 14, 6, 19, 4, 11, 16, 8, 13, 17];

export function WordCloudChart() {
  const [filter, setFilter] = useState<'all' | 'pos' | 'neg'>('all');
  const [picked, setPicked] = useState<number | null>(0);

  return (
    <figure className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-rose-50 p-6 dark:from-emerald-950/30 dark:via-zinc-950 dark:to-rose-950/30">
      <div className="flex items-center justify-between gap-3"><figcaption className="font-semibold text-zinc-950 dark:text-white">What customers say</figcaption><div role="group" aria-label="Sentiment" className="flex rounded-full bg-white/80 p-0.5 text-xs dark:bg-white/10">{([['all', 'All'], ['pos', 'Positive'], ['neg', 'Negative']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)} className={`rounded-full px-2.5 py-1 ${filter === value ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'text-zinc-600 dark:text-zinc-400'}`}>{label}</button>)}</div></div>
      <div className="mt-5 flex min-h-[12rem] flex-wrap items-center justify-center gap-x-4 gap-y-1 leading-none">
        {order.map((index) => {
          const [word, count, sentiment] = words[index];
          const dim = filter !== 'all' && filter !== sentiment;
          return <button key={word} type="button" aria-pressed={picked === index} onClick={() => setPicked(index)} className={`rounded-md font-bold transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${tone[sentiment]} ${dim ? 'opacity-15' : ''} ${picked === index ? 'underline decoration-2 underline-offset-4' : ''}`} style={{ fontSize: `${(0.75 + (count / 92) * 1.9).toFixed(2)}rem`, rotate: index % 6 === 4 ? '-8deg' : index % 7 === 3 ? '6deg' : undefined }}>{word}</button>;
        })}
      </div>
      <div aria-live="polite" className="mt-4 rounded-xl bg-white/80 p-3 text-sm dark:bg-white/5">{picked !== null && <><p className="font-semibold text-zinc-950 dark:text-white">“{words[picked][0]}” · {words[picked][1]} mentions</p><p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">“Honestly so {words[picked][0]} compared to what we used before.” · “The {words[picked][0]} part stood out in our trial.”</p></>}</div>
      <details className="mt-3 text-xs text-zinc-500"><summary className="cursor-pointer">Ranked list</summary><ol className="mt-2 columns-2">{words.map(([word, count]) => <li key={word}>{word} — {count}</li>)}</ol></details>
    </figure>
  );
}
