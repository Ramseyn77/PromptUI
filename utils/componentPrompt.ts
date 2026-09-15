import type { LibraryComponent } from '@/types/component';

export type PromptLanguage = 'fr' | 'en';

type PromptComponent = Pick<LibraryComponent, 'name' | 'category' | 'style' | 'description'>;

export function getComponentPrompt(item: PromptComponent, language: PromptLanguage) {
  if (language === 'en') {
    return `Create a responsive ${item.category} component named "${item.name}" with React, TypeScript and Tailwind CSS. Style: ${item.style}. ${item.description} Keep it accessible, copy-ready and easy to customize.`;
  }

  return `Cree un composant ${item.category} responsive nomme "${item.name}" avec React, TypeScript et Tailwind CSS. Style : ${item.style}. ${item.description} Garde un code accessible, pret a copier et facile a personnaliser.`;
}
