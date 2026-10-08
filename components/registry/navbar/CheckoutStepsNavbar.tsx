/**
 * @registry
 * name: Checkout Steps Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: En-tête de tunnel d'achat avec étapes numérotées, étape courante et paiement sécurisé.
 * prompt: Create a checkout header: logo, an ordered steps indicator (Cart, Shipping, Payment, Review) with completed steps checked, the current step highlighted (aria-current="step") and connecting lines; labels hidden below sm. "Secure checkout" lock hint on the right. Light and dark mode.
 */
import { Check, Lock } from 'lucide-react';

const steps = ['Cart', 'Shipping', 'Payment', 'Review'];
const current = 2;

export function CheckoutStepsNavbar() {
  return (
    <header className="flex w-full max-w-3xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <span className="font-bold text-zinc-900 dark:text-white">Shoply</span>
      <nav aria-label="Checkout progress">
        <ol className="flex items-center gap-2">
          {steps.map((step, index) => (
            <li key={step} aria-current={index === current ? 'step' : undefined} className="flex items-center gap-2">
              <span className={`grid size-6 place-items-center rounded-full text-xs font-bold ${index < current ? 'bg-teal-600 text-white' : index === current ? 'bg-zinc-950 text-white ring-4 ring-zinc-950/10 dark:bg-white dark:text-zinc-950 dark:ring-white/15' : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800'}`}>
                {index < current ? <Check aria-hidden className="size-3.5" /> : index + 1}
              </span>
              <span className={`hidden text-sm sm:inline ${index === current ? 'font-semibold text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>{step}</span>
              {index < steps.length - 1 && <span aria-hidden className={`h-px w-4 sm:w-8 ${index < current ? 'bg-teal-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />}
            </li>
          ))}
        </ol>
      </nav>
      <span className="hidden items-center gap-1.5 text-xs text-zinc-500 md:inline-flex dark:text-zinc-400"><Lock aria-hidden className="size-3.5" /> Secure checkout</span>
    </header>
  );
}
