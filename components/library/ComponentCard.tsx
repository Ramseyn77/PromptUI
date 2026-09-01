import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { LibraryComponent } from '@/types/component';
import { ComponentPreview } from './ComponentPreview';

export function ComponentCard({ item }: { item: LibraryComponent }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[.07]">
      <Link href={`/components/${item.slug}`} className="block">
        <div className="preview-grid flex h-64 items-center overflow-hidden bg-[#f1eee5] p-4 dark:bg-black/20">
          <ComponentPreview slug={item.slug} compact/>
        </div>
        <div className="border-t border-[var(--line)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-[var(--accent)]">{item.category} / {item.style}</p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">{item.name}</h3>
            </div>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]">
              <ArrowUpRight size={17}/>
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.responsiveModes.map((mode) => (
              <span key={mode} className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[10px] font-medium text-[var(--muted)]">{mode}</span>
            ))}
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/10 px-2.5 py-1 text-[10px] font-semibold text-[var(--accent)]"><ShieldCheck size={11}/>Checks MVP</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full bg-[var(--background)] px-2.5 py-1 text-[10px] font-medium text-[var(--muted)]">{tech}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
