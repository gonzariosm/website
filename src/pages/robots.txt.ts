import type { APIRoute } from 'astro';
import { text } from '../lib/responses';

export const GET: APIRoute = ({ site }) =>
  text(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, 'text/plain');
