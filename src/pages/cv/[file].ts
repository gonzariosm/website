import type { APIRoute, GetStaticPaths } from 'astro';
import { locales, type Locale } from '../../content/site';
import { renderLatex } from '../../lib/latex';
import { buildResume } from '../../lib/resume';
import { text } from '../../lib/responses';

// LaTeX source of the CV, e.g. /cv/gonzalo-rios-cv-en.tex. The PDF next to it
// is compiled from this file by scripts/build-cv.mjs.
export const getStaticPaths: GetStaticPaths = () =>
  locales.map((locale) => ({ params: { file: `gonzalo-rios-cv-${locale}.tex` }, props: { locale } }));

export const GET: APIRoute = ({ props }) => {
  const locale = props.locale as Locale;
  return text(renderLatex(locale, buildResume(locale)), 'text/x-tex');
};
