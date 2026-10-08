import type { APIRoute } from 'astro';
import { renderMarkdown } from '../lib/markdown';
import { text } from '../lib/responses';

export const GET: APIRoute = ({ site }) => text(renderMarkdown('en', site!), 'text/markdown');
