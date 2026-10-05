import { NextResponse, type NextRequest } from 'next/server';

// Routes live under app/[lang]. English (default) keeps unprefixed URLs: /library is
// served by /en/library. French is public under /fr. Kept self-contained, as Proxy expects.
const DEFAULT_LOCALE = 'en';
const PREFIXED_LOCALES = ['fr'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first] = pathname.split('/');

  if (PREFIXED_LOCALES.includes(first)) return NextResponse.next();

  // /en/... is not a public URL: send it to its unprefixed twin so each page has one address.
  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (icon.svg, robots.txt, sitemap.xml...).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
