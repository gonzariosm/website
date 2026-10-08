import type { APIRoute } from 'astro';
import { buildResume } from '../lib/resume';
import { text } from '../lib/responses';

export const GET: APIRoute = () => text(JSON.stringify(buildResume('en'), null, 2) + '\n', 'application/json');
