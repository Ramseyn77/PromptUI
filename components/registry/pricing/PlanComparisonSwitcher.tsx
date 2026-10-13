/**
 * @registry
 * name: Plan Comparison Switcher
 * category: Pricing
 * style: SaaS
 * tags: featured, recent
 * description: Comparatif de plans adapté au mobile : onglets de plan qui affichent une colonne à la fois sur petit écran et le tableau complet sur grand écran.
 * prompt: Create a responsive plan comparison: on xl screens a full table with three plan columns (Starter, Pro highlighted, Enterprise) and grouped feature rows (Core, Collaboration, Security) using checks, dashes and text values; below xl a plan tablist shows one plan column at a time next to the feature names so nothing overflows; the header shows price and a CTA per plan; group headings span the row; checks have sr-only "Included"/"Not included". Light and dark mode.
 */
'use client';
import { Check, Minus } from 'lucide-react';
import { Fragment, useState } from 'react';

const plans = [{ name: 'Starter', price: '$0' }, { name: 'Pro', price: '$24' }, { name: 'Enterprise', price: 'Custom' }];
const groups: [string, [string, ...(boolean | string)[]][]][] = [
  ['Core', [['Projects', '3', 'Unlimited', 'Unlimited'], ['Storage', '2 GB', '100 GB', '1 TB'], ['Custom domains', false, true, true]]],
  ['Collaboration', [['Guests', false, '10', 'Unlimited'], ['Comments & mentions', true, true, true], ['Approval flows', false, false, true]]],
  ['Security', [['SSO / SAML', false, false, true], ['Audit log', false, '30 days', '1 year'], ['SLA', false, false, '99.99%']]],
];

function Value({ value }: { value: boolean | string }) {
  if (value === true) return <><Check aria-hidden className="mx-auto size-4 text-emerald-600 dark:text-emerald-400" /><span className="sr-only">Included</span></>;
  if (value === false) return <><Minus aria-hidden className="mx-auto size-4 text-zinc-300 dark:text-zinc-600" /><span className="sr-only">Not included</span></>;
  return <span className="text-sm text-zinc-800 dark:text-zinc-200">{value}</span>;
}

export function PlanComparisonSwitcher() {
  const [plan, setPlan] = useState(1);
  const shown = (index: number) => (index === plan ? '' : 'hidden xl:table-cell');

  return (
    <div className="w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div role="tablist" aria-label="Plan" className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-zinc-100 p-1 xl:hidden dark:bg-zinc-900">
        {plans.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={plan === index} onClick={() => setPlan(index)} className={`rounded-lg py-2 text-sm font-semibold ${plan === index ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{item.name}</button>)}
      </div>
      <table className="w-full table-fixed text-left">
        <caption className="sr-only">Plan comparison</caption>
        <thead>
          <tr>
            <th scope="col" className="w-2/5 pb-4 align-bottom text-sm font-medium text-zinc-500 xl:w-1/4">Features</th>
            {plans.map((item, index) => (
              <th key={item.name} scope="col" className={`pb-4 text-center align-bottom ${shown(index)}`}>
                <div className={`rounded-2xl p-3 ${index === 1 ? 'bg-indigo-50 dark:bg-indigo-500/10' : ''}`}>
                  {index === 1 && <span className="mb-1 inline-block rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">Popular</span>}
                  <p className="text-sm font-semibold text-zinc-950 dark:text-white">{item.name}</p>
                  <p className="text-2xl font-bold text-zinc-950 dark:text-white">{item.price}<span className="text-xs font-normal text-zinc-500">{item.price.startsWith('$') ? '/mo' : ''}</span></p>
                  <a href="#" className={`mt-2 block rounded-lg py-1.5 text-xs font-semibold ${index === 1 ? 'bg-indigo-600 text-white' : 'border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200'}`}>{index === 2 ? 'Contact sales' : 'Choose'}</a>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map(([group, rows]) => (
            <Fragment key={group}>
              <tr><th scope="colgroup" colSpan={4} className="pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">{group}</th></tr>
              {rows.map(([feature, ...values]) => (
                <tr key={feature} className="border-t border-zinc-100 dark:border-zinc-800">
                  <th scope="row" className="py-2.5 pr-2 text-sm font-normal text-zinc-700 dark:text-zinc-300">{feature}</th>
                  {values.map((value, index) => <td key={index} className={`py-2.5 text-center ${shown(index)} ${index === 1 ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''}`}><Value value={value} /></td>)}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
