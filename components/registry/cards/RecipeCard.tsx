/**
 * @registry
 * name: Recipe Card
 * category: Cards
 * style: Editorial
 * tags: recent
 * description: Fiche recette avec visuel, temps, difficulté, portions ajustables qui recalculent les ingrédients et favori.
 * prompt: Create a recipe card: illustrated gradient header with a favorite heart toggle (aria-pressed), title in serif, meta chips (time, difficulty, calories), a servings stepper (−/+) that rescales the ingredient quantities live, and a checklist of ingredients that strike through when checked. Warm palette; light and dark mode.
 */
'use client';
import { Clock, Flame, Heart, Minus, Plus, Signal } from 'lucide-react';
import { useState } from 'react';

const ingredients = [['Rice', 300, 'g'], ['Tomatoes', 4, ''], ['Onions', 2, ''], ['Fish fillets', 600, 'g'], ['Tomato paste', 2, 'tbsp']] as const;

export function RecipeCard() {
  const [servings, setServings] = useState(4);
  const [liked, setLiked] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const scale = servings / 4;

  return (
    <article className="w-full max-w-sm overflow-hidden rounded-3xl bg-[#fffaf3] shadow-sm ring-1 ring-amber-900/10 dark:bg-[#1d1915] dark:ring-white/10">
      <div className="relative h-36 bg-[radial-gradient(circle_at_30%_40%,#fb923c,transparent_45%),radial-gradient(circle_at_70%_60%,#facc15,transparent_45%),linear-gradient(#7c2d12,#7c2d12)]">
        <button type="button" aria-pressed={liked} aria-label="Save recipe" onClick={() => setLiked((value) => !value)} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-rose-500 shadow"><Heart aria-hidden className={`size-4 ${liked ? 'fill-current' : ''}`} /></button>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-2xl font-semibold text-amber-950 dark:text-amber-50">Thieboudienne</h3>
        <ul className="mt-2 flex flex-wrap gap-1.5 text-xs text-amber-900 dark:text-amber-100">{([[Clock, '1h 30'], [Signal, 'Medium'], [Flame, '540 kcal']] as const).map(([Icon, text]) => <li key={text} className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 dark:bg-amber-500/15"><Icon aria-hidden className="size-3" />{text}</li>)}</ul>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-amber-950 dark:text-amber-50">Ingredients</span>
          <div role="group" aria-label="Servings" className="flex items-center gap-2 text-sm text-amber-950 dark:text-amber-50">
            <button type="button" aria-label="Fewer servings" disabled={servings <= 1} onClick={() => setServings((value) => value - 1)} className="grid size-7 place-items-center rounded-full border border-amber-900/20 disabled:opacity-30 dark:border-white/20"><Minus aria-hidden className="size-3.5" /></button>
            <output aria-live="polite" className="w-16 text-center tabular-nums">{servings} serv.</output>
            <button type="button" aria-label="More servings" disabled={servings >= 12} onClick={() => setServings((value) => value + 1)} className="grid size-7 place-items-center rounded-full border border-amber-900/20 disabled:opacity-30 dark:border-white/20"><Plus aria-hidden className="size-3.5" /></button>
          </div>
        </div>
        <ul className="mt-2 space-y-1">
          {ingredients.map(([name, amount, unit]) => {
            const done = checked.includes(name);
            const value = Math.round(amount * scale * 10) / 10;
            return <li key={name}><label className={`flex items-center gap-2 text-sm text-amber-950 dark:text-amber-50 ${done ? 'line-through opacity-50' : ''}`}><input type="checkbox" checked={done} onChange={() => setChecked((list) => (done ? list.filter((item) => item !== name) : [...list, name]))} className="accent-orange-600" /><span className="w-16 tabular-nums text-amber-800 dark:text-amber-200">{value}{unit && ` ${unit}`}</span>{name}</label></li>;
          })}
        </ul>
      </div>
    </article>
  );
}
