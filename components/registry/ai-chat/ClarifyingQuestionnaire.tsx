/**
 * @registry
 * name: Clarifying Questionnaire
 * category: AI Chat
 * style: SaaS
 * tags: featured, recent
 * description: L'assistant pose des questions de clarification une par une avant de générer, avec réponse libre et récap.
 * prompt: Create an AI clarifying questionnaire card shown inside a chat: the assistant asks 3 questions one at a time (radio options as selectable cards with role="radiogroup", plus an "Other" option revealing a text input), a progress bar and "Question 2 of 3", Back/Skip/Next buttons, then a summary of answers with an "Generate" button and an edit link per answer. Keyboard friendly, aria-live on step change. Light and dark mode.
 */
'use client';
import { Check, Sparkles } from 'lucide-react';
import { useId, useState } from 'react';

const questions = [
  { title: 'What are you building?', options: ['Landing page', 'Dashboard', 'Mobile app'] },
  { title: 'Which visual tone fits best?', options: ['Minimal', 'Playful', 'Corporate'] },
  { title: 'Do you need dark mode?', options: ['Yes, both themes', 'Light only', 'Dark only'] },
];

export function ClarifyingQuestionnaire() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [other, setOther] = useState('');
  const done = step === questions.length;
  const question = questions[step];
  const current = answers[step];

  function choose(value: string) {
    setAnswers((list) => list.map((item, index) => (index === step ? value : item)));
  }

  function next() {
    if (current === 'Other') choose(other || 'Other');
    setOther('');
    setStep((value) => value + 1);
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-violet-500 text-white"><Sparkles aria-hidden className="size-4" /></span>
        <div aria-live="polite" className="flex-1 rounded-2xl rounded-tl-sm border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          {done ? (
            <>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Here is what I understood</p>
              <dl className="mt-3 divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
                {questions.map((item, index) => (
                  <div key={item.title} className="flex items-center justify-between gap-3 py-2">
                    <dt className="text-zinc-500 dark:text-zinc-400">{item.title}</dt>
                    <dd className="flex items-center gap-2 text-right font-medium text-zinc-900 dark:text-zinc-100">{answers[index] || 'Skipped'}<button type="button" onClick={() => setStep(index)} className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400">Edit</button></dd>
                  </div>
                ))}
              </dl>
              <button type="button" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"><Sparkles aria-hidden className="size-4" />Generate</button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>Question {step + 1} of {questions.length}</span>
                <button type="button" onClick={() => { setOther(''); setStep((value) => value + 1); }} className="font-medium hover:text-zinc-900 dark:hover:text-zinc-100">Skip</button>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-teal-500 transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
              <p id={`${id}-q`} className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{question.title}</p>
              <div role="radiogroup" aria-labelledby={`${id}-q`} className="mt-3 grid gap-2">
                {[...question.options, 'Other'].map((option) => {
                  const selected = current === option || (option === 'Other' && !!current && !question.options.includes(current));
                  return (
                    <button key={option} type="button" role="radio" aria-checked={selected} onClick={() => choose(option)} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected ? 'border-teal-500 bg-teal-50 text-teal-900 dark:bg-teal-400/10 dark:text-teal-100' : 'border-zinc-200 text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700'}`}>
                      {option}{selected && <Check aria-hidden className="size-4 text-teal-600 dark:text-teal-400" />}
                    </button>
                  );
                })}
              </div>
              {current === 'Other' && <input aria-label="Your answer" autoFocus value={other} onChange={(event) => setOther(event.target.value)} placeholder="Type your answer…" className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-zinc-100" />}
              <div className="mt-4 flex justify-between">
                <button type="button" disabled={step === 0} onClick={() => setStep((value) => value - 1)} className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-800">Back</button>
                <button type="button" disabled={!current} onClick={next} className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:opacity-40">{step === questions.length - 1 ? 'Review' : 'Next'}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
