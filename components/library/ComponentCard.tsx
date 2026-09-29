'use client';
import Link from 'next/link';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type { LibraryComponent } from '@/types/component';
import { ComponentPreview } from './ComponentPreview';
import { FitPreview } from './FitPreview';

type CardItem = Pick<LibraryComponent, 'slug' | 'name' | 'category' | 'style' | 'prompt'>;

const slugScore = (slug: string) => slug.split('').reduce((total, char) => total + char.charCodeAt(0), 0);

export function viewCount(slug: string) {
  const score = slugScore(slug);
  return `${(score % 8) + 2}.${score % 9}k vues`;
}

// Hover reveal: at rest the preview sits slightly low and the footer hides under the cell edge.
// Touch screens (below md) always show the footer.
const slide = 'transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:translate-y-0 group-focus-within/card:translate-y-0 max-md:translate-y-0';

/** Hairline grid: cells share 0.5px borders instead of being separate rounded cards. */
export function ComponentGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid border-l-[0.5px] border-t-[0.5px] border-[var(--line-soft)] [&>*]:border-b-[0.5px] [&>*]:border-r-[0.5px] [&>*]:border-[var(--line-soft)] ${className}`}>
      {children}
    </div>
  );
}

export function ComponentCard({ item, className = '' }: { item: CardItem; className?: string }) {
  const [copied, setCopied] = useState(false);
  const hue = slugScore(item.slug) % 360;

  async function copyPrompt() {
    await navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <article data-fit-host className={`group/card relative flex min-w-0 items-center justify-center overflow-hidden p-5 max-md:p-3 ${className}`}>
      <div className={`w-full translate-y-[18px] ${slide}`}>
        {/* Live, interactive preview: try the effect here, open the page from the footer. */}
        <div data-preview-name={item.name} className="relative aspect-[4/3] w-full">
          <div className="absolute inset-1">
            <FitPreview>
              <ComponentPreview slug={item.slug}/>
            </FitPreview>
          </div>
        </div>

        <div className={`flex w-full items-center gap-2 px-1 pt-3 translate-y-[30px] ${slide}`}>
          <span
            aria-hidden
            className="size-[18px] shrink-0 rounded-full shadow-sm ring-1 ring-[var(--line)]"
            style={{ background: `radial-gradient(circle at 50% 78%, hsl(${hue} 70% 82%), hsl(${(hue + 40) % 360} 55% 62%))` }}
          />
          <Link href={`/components/${item.slug}`} className="min-w-0 truncate rounded text-[13px] font-medium leading-[18px] text-[var(--foreground)]/80 outline-none hover:text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
            {item.name}
          </Link>
          <button
            type="button"
            onClick={copyPrompt}
            aria-label={`Copier le prompt de ${item.name}`}
            className="ml-auto flex shrink-0 items-center gap-1 rounded-md px-1 py-0.5 font-mono text-[11px] text-[var(--muted)] transition-[color,background-color,scale] hover:bg-[var(--hover)] hover:text-[var(--foreground)] active:scale-[0.97]"
          >
            {copied ? <Check size={14}/> : <Copy size={14}/>}
            {copied ? 'copié' : 'prompt'}
          </button>
          <Link
            href={`/components/${item.slug}`}
            aria-label={`Ouvrir ${item.name}`}
            className="grid size-6 shrink-0 place-items-center rounded-md text-[var(--muted)] transition-[color,background-color,scale] hover:bg-[var(--hover)] hover:text-[var(--foreground)] active:scale-[0.97]"
          >
            <ArrowUpRight size={14}/>
          </Link>
        </div>
      </div>
    </article>
  );
}
