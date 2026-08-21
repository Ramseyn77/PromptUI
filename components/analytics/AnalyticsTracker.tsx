'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackVisit } from '@/utils/analytics';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackVisit(pathname);
  }, [pathname]);

  return null;
}
