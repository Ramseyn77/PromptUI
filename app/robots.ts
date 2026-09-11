import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prompt-ui-steel.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/analytics', '/playground/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}