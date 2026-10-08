/**
 * @registry
 * name: Feature Comparison Table
 * category: Tables
 * style: SaaS
 * tags: featured, recent
 * description: Tableau comparatif des offres avec coches, valeurs et colonne recommandée mise en avant.
 * prompt: Create a plan comparison table: plans as columns (Free, Pro highlighted with a "Popular" badge and tinted column, Team), features as rows with check icons, dashes or values; sr-only text for icons, sticky first column and horizontal scroll on mobile. Light and dark mode.
 */
import { Check, Minus } from 'lucide-react';

const plans = ['Free', 'Pro', 'Team'];
const features: Array<[string, Array<boolean | string>]> = [
  ['Projects', ['3', 'Unlimited', 'Unlimited']],
  ['AI prompts', [false, true, true]],
  ['Custom domain', [false, true, true]],
  ['Roles & permissions', [false, false, true]],
  ['Support', ['Community', 'Email', 'Priority']],
];

export function FeatureComparisonTable() {
  return (
    <div className="w-full max-w-2xl overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 bg-white px-4 py-4 text-left text-xs font-medium text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">Features</th>
            {plans.map((plan) => (
              <th key={plan} className={`px-4 py-4 text-center font-semibold text-zinc-900 dark:text-white ${plan === 'Pro' ? 'bg-teal-500/5' : ''}`}>
                {plan}{plan === 'Pro' && <span className="ml-1.5 rounded-full bg-teal-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">Popular</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {features.map(([feature, values]) => (
            <tr key={feature}>
              <th scope="row" className="sticky left-0 bg-white px-4 py-3 text-left font-normal text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">{feature}</th>
              {values.map((value, index) => (
                <td key={plans[index]} className={`px-4 py-3 text-center ${plans[index] === 'Pro' ? 'bg-teal-500/5' : ''}`}>
                  {value === true ? <><Check aria-hidden className="mx-auto size-4 text-teal-600 dark:text-teal-400" /><span className="sr-only">Included</span></>
                    : value === false ? <><Minus aria-hidden className="mx-auto size-4 text-zinc-300 dark:text-zinc-700" /><span className="sr-only">Not included</span></>
                    : <span className="text-zinc-700 dark:text-zinc-300">{value}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
