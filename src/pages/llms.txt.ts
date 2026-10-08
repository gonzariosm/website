import type { APIRoute } from 'astro';
import { copy, person } from '../content/site';
import { text } from '../lib/responses';

export const GET: APIRoute = ({ site }) => {
  const en = copy.en;
  const abs = (p: string) => new URL(p, site).href;
  const body = `# ${person.name}

> ${en.meta.description}

${en.about.body[0]}

## Pages

- [${person.name} (English)](${abs('/index.md')}): Full CV in Markdown, English.
- [${person.name} (Español)](${abs('/es/index.md')}): CV completo en Markdown, español.

## Contact

- Email: ${person.email}
- LinkedIn: ${person.linkedin}
`;
  return text(body, 'text/plain');
};
