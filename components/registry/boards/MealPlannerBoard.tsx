/**
 * @registry
 * name: Meal Planner Board
 * category: Boards
 * style: Minimal
 * tags: recent
 * description: Planning de repas de la semaine : grille jours × repas, recettes à placer depuis une liste, calories du jour et liste de courses générée.
 * prompt: Create a weekly meal planner board: a grid of 7 days × 3 meals (Breakfast, Lunch, Dinner) where each slot shows a recipe chip (emoji, name, kcal) or an empty "+ Add" button; clicking a slot makes it the target and clicking a recipe from the side list fills it; chips have a remove ×; each day column shows total kcal; a "Shopping list" panel aggregates ingredients from the planned recipes with counts; horizontal scroll on small screens. Light and dark mode.
 */
'use client';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const recipes = { Oats: ['🥣', 380, ['oats', 'milk', 'berries']], Salad: ['🥗', 450, ['lettuce', 'chickpeas', 'feta']], Jollof: ['🍛', 620, ['rice', 'tomatoes', 'chicken']], Tacos: ['🌮', 580, ['tortillas', 'beans', 'avocado']], Omelette: ['🍳', 340, ['eggs', 'spinach']], Soup: ['🍲', 410, ['lentils', 'carrots', 'tomatoes']] } as const;
type Recipe = keyof typeof recipes;
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];

export function MealPlannerBoard() {
  const [plan, setPlan] = useState<Record<string, Recipe>>({ 'Mon-Breakfast': 'Oats', 'Mon-Dinner': 'Jollof', 'Tue-Lunch': 'Salad', 'Wed-Breakfast': 'Omelette', 'Wed-Dinner': 'Tacos' });
  const [target, setTarget] = useState<string | null>('Tue-Dinner');
  const shopping = Object.values(plan).flatMap((recipe) => recipes[recipe][2] as readonly string[]).reduce<Record<string, number>>((acc, item) => ({ ...acc, [item]: (acc[item] ?? 0) + 1 }), {});

  return (
    <div className="grid w-full max-w-5xl gap-4 rounded-2xl border border-zinc-200 bg-white p-4 lg:grid-cols-[1fr_14rem] dark:border-zinc-800 dark:bg-zinc-950">
      <div className="overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[40rem] table-fixed border-separate border-spacing-1 text-xs">
          <thead><tr><th className="w-20" />{days.map((day) => <th key={day} className="pb-1 font-semibold text-zinc-900 dark:text-zinc-100">{day}<span className="block font-normal tabular-nums text-zinc-400">{meals.reduce((sum, meal) => sum + (plan[`${day}-${meal}`] ? recipes[plan[`${day}-${meal}`]][1] : 0), 0)} kcal</span></th>)}</tr></thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal}>
                <th scope="row" className="pr-1 text-left font-medium text-zinc-500">{meal}</th>
                {days.map((day) => {
                  const key = `${day}-${meal}`;
                  const recipe = plan[key];
                  return (
                    <td key={key} className="h-16 align-top">
                      {recipe ? (
                        <div className="relative h-full rounded-lg bg-emerald-50 p-1.5 dark:bg-emerald-500/10"><span aria-hidden className="text-base">{recipes[recipe][0]}</span><p className="truncate font-medium text-zinc-900 dark:text-zinc-100">{recipe}</p><button type="button" aria-label={`Remove ${recipe} from ${day} ${meal}`} onClick={() => setPlan(({ [key]: _, ...rest }) => rest)} className="absolute right-0.5 top-0.5 grid size-5 place-items-center rounded text-zinc-400 hover:bg-white hover:text-zinc-700 dark:hover:bg-zinc-800"><X aria-hidden className="size-3" /></button></div>
                      ) : (
                        <button type="button" aria-pressed={target === key} aria-label={`Choose ${day} ${meal}`} onClick={() => setTarget(key)} className={`grid h-full w-full place-items-center rounded-lg border border-dashed ${target === key ? 'border-emerald-500 bg-emerald-50/60 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'border-zinc-200 text-zinc-300 hover:text-zinc-500 dark:border-zinc-800 dark:text-zinc-700'}`}><Plus aria-hidden className="size-4" /></button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <aside className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">Recipes</h3>
          <p className="text-[11px] text-zinc-500">{target ? `Adding to ${target.replace('-', ' ')}` : 'Pick an empty slot first'}</p>
          <ul className="mt-2 grid grid-cols-2 gap-1.5">{(Object.keys(recipes) as Recipe[]).map((recipe) => <li key={recipe}><button type="button" disabled={!target} onClick={() => { if (target) { setPlan({ ...plan, [target]: recipe }); setTarget(null); } }} className="flex w-full items-center gap-1.5 rounded-lg border border-zinc-200 px-2 py-1.5 text-left text-xs text-zinc-800 hover:border-emerald-400 disabled:opacity-40 dark:border-zinc-800 dark:text-zinc-200"><span aria-hidden>{recipes[recipe][0]}</span>{recipe}</button></li>)}</ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">Shopping list</h3>
          <ul aria-live="polite" className="mt-2 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">{Object.entries(shopping).sort().map(([item, count]) => <li key={item} className="flex justify-between capitalize"><span>{item}</span><span className="tabular-nums text-zinc-400">×{count}</span></li>)}</ul>
        </div>
      </aside>
    </div>
  );
}
