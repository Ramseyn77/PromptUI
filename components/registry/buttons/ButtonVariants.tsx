/**
 * @registry
 * name: Button Variants
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Jeu complet de boutons : primaire, secondaire, fantôme, destructif, lien, tailles et désactivé.
 * prompt: Create a small button system showcase from one cva-like helper (variant + size maps): primary, secondary, outline, ghost, destructive and link variants in sm/md/lg sizes, with icon support, focus-visible rings and disabled styles. Light and dark mode.
 */
import { Plus, Trash2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

const variants = {
  primary: 'bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700',
  outline: 'border border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900',
  ghost: 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
  destructive: 'bg-rose-600 text-white hover:bg-rose-700',
  link: 'text-teal-700 underline-offset-4 hover:underline dark:text-teal-400',
} as const;
const sizes = { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' } as const;

function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants; size?: keyof typeof sizes }) {
  return <button type="button" className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 dark:focus-visible:ring-offset-zinc-950 ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}

export function ButtonVariants() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(variants) as Array<keyof typeof variants>).map((variant) => <Button key={variant} variant={variant} className="capitalize">{variant}</Button>)}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm"><Plus aria-hidden className="size-3.5" />Small</Button>
        <Button size="md"><Plus aria-hidden className="size-4" />Medium</Button>
        <Button size="lg"><Plus aria-hidden className="size-5" />Large</Button>
        <Button variant="destructive" aria-label="Delete"><Trash2 className="size-4" /></Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
