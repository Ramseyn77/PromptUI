'use client';

import { Share2 } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

export function ShareButton({ slug, name }: { slug: string; name: string }) {
  async function share() {
    const url = window.location.href;
    trackEvent({ type: 'share', componentSlug: slug, componentName: name });
    if (navigator.share) {
      await navigator.share({ title: name, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  }

  return (
    <button onClick={share} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5">
      <Share2 size={16}/>
      Partager
    </button>
  );
}
