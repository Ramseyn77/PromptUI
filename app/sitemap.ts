import type { MetadataRoute } from 'next';
import { components } from '@/data/components';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prompt-ui-steel.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/library`, changeFrequency: 'weekly', priority: 0.9 },
  ];

  return [
    ...pages,
    ...components.map((item) => ({
      url: `${siteUrl}/components/${item.slug}`,
      changeFrequency: 'monthly' as const,
      priority: item.featured ? 0.8 : 0.6,
    })),
  ];
}