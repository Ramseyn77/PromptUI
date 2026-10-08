/**
 * @registry
 * name: Quiz CTA
 * category: CTA
 * style: SaaS
 * tags: featured, recent
 * description: CTA en mini-quiz de 3 questions qui recommande un plan à la fin, avec barre de progression et retour arrière.
 * prompt: Create a quiz-style CTA: "Find your plan in 30 seconds" with a progress bar and three single-choice questions (team size, main goal, budget) as large radio cards; Back/Next navigation; after the last answer a result card recommends a plan ("Team — $24/mo") with reasons based on answers and a "Start free trial" button plus "Retake"; focus moves to the step heading on step change. Light and dark mode.
 */
'use client';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useId, useRef, useState } from 'react';

const questions = [
  { title: 'How big is your team?', options: ['Just me', '2–10', '11–50', '50+'] },
  { title: 'What’s your main goal?', options: ['Ship faster', 'Collaborate', 'Analytics', 'Security'] },
  { title: 'Monthly budget?', options: ['Free', 'Under $50', '$50–200', 'Custom'] },
];

export function QuizCta() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const done = step === questions.length;
  const plan = (answers[0] ?? 0) >= 2 || answers[2] === 3 ? { name: 'Business', price: '$59' } : (answers[0] ?? 0) === 1 ? { name: 'Team', price: '$24' } : { name: 'Starter', price: '$0' };

  function go(next: number) {
    setStep(next);
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  return (
    <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"><Sparkles aria-hidden className="size-3.5" />Find your plan in 30 seconds</p>
      <div className="mt-3 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={step}><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${(step / questions.length) * 100}%` }} /></div>
      {!done ? (
        <fieldset className="mt-5">
          <legend><h3 ref={headingRef} tabIndex={-1} className="text-lg font-semibold text-zinc-900 outline-none dark:text-zinc-100">{questions[step].title}</h3></legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {questions[step].options.map((option, index) => (
              <label key={option} className={`cursor-pointer rounded-xl border p-3 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 ${answers[step] === index ? 'border-indigo-600 bg-indigo-50 text-indigo-900 dark:bg-indigo-500/10 dark:text-indigo-100' : 'border-zinc-200 text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-300'}`}>
                <input type="radio" name={`${uid}-q${step}`} className="sr-only" checked={answers[step] === index} onChange={() => { const next = [...answers]; next[step] = index; setAnswers(next); }} />
                {option}
              </label>
            ))}
          </div>
          <div className="mt-5 flex justify-between">
            <button type="button" disabled={step === 0} onClick={() => go(step - 1)} className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 disabled:invisible dark:hover:text-zinc-100"><ArrowLeft aria-hidden className="size-4" />Back</button>
            <button type="button" disabled={answers[step] === undefined} onClick={() => go(step + 1)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40">{step === questions.length - 1 ? 'See my plan' : 'Next'}</button>
          </div>
        </fieldset>
      ) : (
        <div className="mt-5">
          <h3 ref={headingRef} tabIndex={-1} className="text-lg font-semibold text-zinc-900 outline-none dark:text-zinc-100">We recommend <span className="text-indigo-600 dark:text-indigo-400">{plan.name}</span> — {plan.price}/mo</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>✓ Sized for teams of {questions[0].options[answers[0]]}</li>
            <li>✓ Built for: {questions[1].options[answers[1]].toLowerCase()}</li>
            <li>✓ Fits a {questions[2].options[answers[2]].toLowerCase()} budget</li>
          </ul>
          <button type="button" className="mt-5 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">Start free trial</button>
          <button type="button" onClick={() => { setAnswers([]); go(0); }} className="mt-2 w-full py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Retake quiz</button>
        </div>
      )}
    </section>
  );
}
