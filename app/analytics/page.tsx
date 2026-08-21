import type { Metadata } from 'next';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Dashboard local de feedback et comportement produit.',
};

export default function AnalyticsPage() {
  return <main><AnalyticsDashboard/></main>;
}
