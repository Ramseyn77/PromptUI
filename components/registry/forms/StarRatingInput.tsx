/**
 * @registry
 * name: Star Rating Input
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Notation par etoiles au clavier et a la souris avec apercu au survol et libelle de la note.
 * prompt: Create an accessible star rating input as a radiogroup of 5 visually-hidden radio inputs with star labels: hover previews the rating, click/Space selects, arrow keys move natively, the selected label text (Terrible → Excellent) shows beside it. Amber stars, light and dark mode.
 */
'use client';
import { Star } from 'lucide-react';
import { useState } from 'react';

const labels = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];

export function StarRatingInput() {
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <fieldset className="w-full max-w-sm">
      <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300">How was your experience?</legend>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex" onMouseLeave={() => setHover(0)}>
          {labels.map((label, index) => {
            const rating = index + 1;
            return (
              <label key={label} onMouseEnter={() => setHover(rating)} className="cursor-pointer p-0.5 has-[:focus-visible]:rounded-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber-500">
                <input type="radio" name="experience-rating" value={rating} checked={value === rating} onChange={() => setValue(rating)} className="sr-only" />
                <Star aria-hidden className={`size-8 transition ${rating <= shown ? 'scale-100 fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-700'} ${hover === rating ? 'scale-110' : ''}`} />
                <span className="sr-only">{label}</span>
              </label>
            );
          })}
        </div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{labels[shown - 1]}</span>
      </div>
    </fieldset>
  );
}
