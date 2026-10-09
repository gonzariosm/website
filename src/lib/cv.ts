// Download links for the CV, with the PDF size from public/cv/manifest.json.
// The manifest stores the hash of the LaTeX each PDF was compiled from, so the
// build can warn when the PDF no longer matches the content (run `npm run cv`).
import { createHash } from 'node:crypto';
import { statSync } from 'node:fs';
import { join } from 'node:path';
import { cvFiles, cvLinks } from '../content/resume';
import type { Locale } from '../content/site';
import { renderLatex } from './latex';
import { buildResume } from './resume';

type Manifest = Partial<Record<Locale, { tex: string; bytes: number; pages?: number }>>;
const manifest =
  Object.values(import.meta.glob<Manifest>('../../public/cv/manifest.json', { eager: true, import: 'default' }))[0] ?? {};

const warned = new Set<Locale>();

export function cvDownloads(locale: Locale) {
  const files = cvFiles(locale);
  // Builds run from the website root, where public/ lives.
  const bytes = statSync(join(process.cwd(), 'public', files.pdf), { throwIfNoEntry: false })?.size;
  const pages = bytes ? manifest[locale]?.pages : undefined;
  const current = createHash('sha256').update(renderLatex(locale, buildResume(locale))).digest('hex');
  if ((!bytes || manifest[locale]?.tex !== current) && !warned.has(locale)) {
    warned.add(locale);
    console.warn(`[cv] ${files.pdf} is missing or out of date with the CV content. Run \`npm run cv\`.`);
  }
  // Links shown to visitors go through the short links; sizes come from the real files.
  return { ...cvLinks(locale), pdfKb: bytes ? Math.max(1, Math.round(bytes / 1024)) : undefined, pdfPages: pages || undefined };
}
