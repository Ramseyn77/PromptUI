'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';

export function ComponentViewTracker({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    trackEvent({ type: 'component_view', componentSlug: slug, componentName: name });
  }, [slug, name]);

  return null;
}
