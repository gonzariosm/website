import type { APIRoute } from 'astro';
import { homePath, locales } from '../content/site';
import { text } from '../lib/responses';

export const GET: APIRoute = ({ site }) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const href = (l: (typeof locales)[number]) => new URL(homePath(l), site).href;
  const alternates = [
    ...locales.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${href(l)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${href('en')}"/>`,
  ].join('\n');
  const urls = locales
    .map((l) => `  <url>\n    <loc>${href(l)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return text(body, 'application/xml');
};
