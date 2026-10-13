/**
 * @registry
 * name: Persona Picker
 * category: AI Chat
 * style: Gradient
 * tags: recent
 * description: Choix de persona pour l'assistant IA : cartes avec avatar dégradé, ton et exemple de réponse, aperçu en direct et réglage de créativité.
 * prompt: Create an assistant persona picker: a radiogroup of 4 persona cards (Mentor, Critic, Cheerleader, Analyst) each with a gradient avatar, short description and tone tags; arrow keys move selection; a preview bubble below shows how that persona would answer a sample question; a creativity slider (0–100) changes a label (Precise / Balanced / Creative) and slightly varies the preview wording; a "Use persona" button. Light and dark mode.
 */
'use client';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

const personas = [
  { name: 'Mentor', emoji: '🧭', tone: ['Patient', 'Clear'], gradient: 'from-sky-400 to-indigo-500', reply: 'Let’s break it into three steps. First, list what the page must answer for a new visitor…' },
  { name: 'Critic', emoji: '🔍', tone: ['Direct', 'Honest'], gradient: 'from-rose-400 to-orange-500', reply: 'Your headline is vague. “All-in-one platform” says nothing. What is the one job you do best?' },
  { name: 'Cheerleader', emoji: '🎉', tone: ['Warm', 'Upbeat'], gradient: 'from-pink-400 to-fuchsia-500', reply: 'Love where this is going! Your pricing table is already clear — let’s make the hero just as bold.' },
  { name: 'Analyst', emoji: '📊', tone: ['Data-led', 'Concise'], gradient: 'from-emerald-400 to-teal-600', reply: 'Pages with one CTA convert ~13% better. You have three. Start by removing the secondary ones.' },
];

export function PersonaPicker() {
  const uid = useId();
  const [selected, setSelected] = useState(0);
  const [creativity, setCreativity] = useState(40);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const persona = personas[selected];
  const mood = creativity < 34 ? 'Precise' : creativity < 67 ? 'Balanced' : 'Creative';

  function onKeyDown(event: KeyboardEvent) {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const next = (selected + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + personas.length) % personas.length;
    setSelected(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <p id={`${uid}-label`} className="font-semibold text-zinc-950 dark:text-white">Choose a persona</p>
      <div role="radiogroup" aria-labelledby={`${uid}-label`} onKeyDown={onKeyDown} className="mt-3 grid grid-cols-2 gap-2">
        {personas.map((item, index) => (
          <button key={item.name} ref={(node) => { refs.current[index] = node; }} type="button" role="radio" aria-checked={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition ${selected === index ? 'border-transparent bg-zinc-950 text-white shadow-lg dark:bg-white dark:text-zinc-950' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800'}`}>
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-lg ${item.gradient}`}>{item.emoji}</span>
            <span><span className="block text-sm font-semibold">{item.name}</span><span className={`block text-[11px] ${selected === index ? 'opacity-70' : 'text-zinc-500'}`}>{item.tone.join(' · ')}</span></span>
          </button>
        ))}
      </div>
      <label className="mt-5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">Creativity · <span className="text-zinc-500">{mood}</span><input type="range" min={0} max={100} value={creativity} onChange={(event) => setCreativity(Number(event.target.value))} className="mt-1 w-full accent-fuchsia-600" /></label>
      <div aria-live="polite" className="mt-4 flex gap-3">
        <span className={`grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm ${persona.gradient}`}>{persona.emoji}</span>
        <p className="rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-2.5 text-sm leading-relaxed text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">{persona.reply}{mood === 'Creative' ? ' Want me to sketch two bolder alternatives?' : mood === 'Precise' ? '' : ' Shall we go through it together?'}</p>
      </div>
      <button type="button" className={`mt-5 w-full rounded-xl bg-gradient-to-r py-2.5 text-sm font-semibold text-white ${persona.gradient}`}>Use {persona.name}</button>
    </div>
  );
}
