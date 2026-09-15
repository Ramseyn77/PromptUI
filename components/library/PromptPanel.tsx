'use client';

import { Languages, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { LibraryComponent } from '@/types/component';
import { getComponentPrompt, type PromptLanguage } from '@/utils/componentPrompt';
import { CopyButton } from '@/components/ui/CopyButton';

export function PromptPanel({ item }: { item: LibraryComponent }) {
  const [language, setLanguage] = useState<PromptLanguage>('fr');
  const prompt = useMemo(() => getComponentPrompt(item, language), [item, language]);

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles size={16} className="text-[var(--accent)]"/>
          Prompt IA
        </div>
        <div className="inline-flex rounded-full border border-[var(--line)] bg-[var(--background)] p-1">
          {(['fr', 'en'] as PromptLanguage[]).map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={language === value}
              onClick={() => setLanguage(value)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase transition ${language === value ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'}`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 max-h-32 overflow-auto whitespace-pre-wrap rounded-xl bg-[var(--background)] p-3 text-xs leading-6 text-[var(--muted)]">
        {prompt}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]"><Languages size={13}/>{language.toUpperCase()}</span>
        <CopyButton value={prompt} label="Copier" analyticsType="prompt_copied" componentSlug={item.slug} componentName={item.name}/>
      </div>
    </div>
  );
}
