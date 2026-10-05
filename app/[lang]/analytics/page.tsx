import type { Metadata } from 'next';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { isLocale } from '@/i18n/config';
import { dictionaries } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: 'Analytics',
    description: dictionaries[lang].meta.analyticsDescription,
  };
}

export default function AnalyticsPage() {
  return <main><AnalyticsDashboard/></main>;
}
