/**
 * @registry
 * name: Ecommerce Trust Footer
 * category: Footer
 * style: Editorial
 * tags: recent
 * description: Pied de page boutique avec garanties (livraison, retours, paiement sécurisé), moyens de paiement et liens.
 * prompt: Create an e-commerce footer: a top row of four trust badges with icons (Free shipping over €60, 30-day returns, Secure payment, Support 7/7), then link columns (Shop, Help, About) and a newsletter line, and a bottom row with payment method chips (VISA, MC, AMEX, PayPal, Apple Pay as text chips) and copyright. 2 columns of badges on mobile, 4 from md. Light and dark mode.
 */
import { Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

const trust = [[Truck, 'Free shipping', 'On orders over €60'], [RotateCcw, '30-day returns', 'No questions asked'], [ShieldCheck, 'Secure payment', '3-D Secure checkout'], [Headphones, 'Support 7/7', 'Chat or email']] as const;

export function EcommerceTrustFooter() {
  return (
    <footer className="w-full max-w-5xl rounded-3xl border border-zinc-200 bg-[#faf8f5] px-6 py-8 dark:border-zinc-800 dark:bg-zinc-950">
      <ul className="grid grid-cols-2 gap-4 border-b border-zinc-200 pb-8 md:grid-cols-4 dark:border-zinc-800">
        {trust.map(([Icon, title, text]) => <li key={title} className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-zinc-800 shadow-sm dark:bg-zinc-900 dark:text-zinc-100"><Icon aria-hidden className="size-5" /></span><span><span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</span><span className="block text-xs text-zinc-500">{text}</span></span></li>)}
      </ul>
      <div className="grid gap-8 py-8 sm:grid-cols-2 md:grid-cols-4">
        {[['Shop', ['New in', 'Women', 'Men', 'Gift cards']], ['Help', ['Shipping', 'Returns', 'Size guide', 'FAQ']], ['About', ['Our story', 'Stores', 'Sustainability']]].map(([title, links]) => (
          <nav key={title as string} aria-label={title as string}><p className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title as string}</p><ul className="mt-2 space-y-1.5">{(links as string[]).map((link) => <li key={link}><a href="#shop" className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">{link}</a></li>)}</ul></nav>
        ))}
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-100">10% off your first order
            <span className="mt-2 flex gap-2"><input type="email" placeholder="Email" className="min-w-0 flex-1 rounded-full border border-zinc-300 bg-white px-3 py-2 font-sans text-sm font-normal dark:border-zinc-700 dark:bg-zinc-900" /><button type="submit" className="rounded-full bg-zinc-950 px-4 font-sans text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Join</button></span>
          </label>
        </form>
      </div>
      <div className="flex flex-col gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <ul aria-label="Accepted payment methods" className="flex flex-wrap gap-1.5">{['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay'].map((method) => <li key={method} className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-[10px] font-bold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">{method}</li>)}</ul>
        <p className="text-xs text-zinc-500">© 2026 Maison Lin</p>
      </div>
    </footer>
  );
}
