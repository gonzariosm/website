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

## CV files

- [JSON Resume (English)](${abs('/resume.json')}): the CV in the JSON Resume v1.0.0 standard.
- [JSON Resume (Español)](${abs('/es/resume.json')}): el CV en el estándar JSON Resume v1.0.0.
- [PDF (English)](${abs('/cv/gonzalo-rios-cv-en.pdf')}) · [PDF (Español)](${abs('/cv/gonzalo-rios-cv-es.pdf')})
- [LaTeX (English)](${abs('/cv/gonzalo-rios-cv-en.tex')}) · [LaTeX (Español)](${abs('/cv/gonzalo-rios-cv-es.tex')})

## Contact

- Email: ${person.email}
- LinkedIn: ${person.linkedin}
`;
  return text(body, 'text/plain');
};
