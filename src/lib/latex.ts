// Renders a JSON Resume document as a single-column, ATS-friendly LaTeX CV.
// Compiled to PDF with Tectonic (XeTeX) by scripts/build-cv.mjs.
import { copy, type Locale } from '../content/site';
import type { Resume } from './resume';

const SPECIAL: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '&': '\\&',
  '%': '\\%',
  $: '\\$',
  '#': '\\#',
  _: '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
};

/** Escapes LaTeX special characters; XeTeX handles Unicode (ñ, á, ’) natively. */
export const tex = (s: string) => s.replace(/[\\&%$#_{}~^]/g, (c) => SPECIAL[c]!);

/**
 * Link with a TeX-safe target: the URL is normalised, characters that could
 * escape the argument or form TeX commands ({ } \\ ^ ~ and whitespace) are
 * percent-encoded, and % / # are escaped for hyperref.
 */
const url = (href: string, label: string) => {
  const target = new URL(href).href
    .replace(/[{}\\^~\s]/g, (c) => encodeURIComponent(c))
    .replace(/[%#]/g, (c) => `\\${c}`);
  return `\\href{${target}}{${tex(label)}}`;
};

function period(locale: Locale, start: string, end: string | undefined, present: string): string {
  const fmt = (iso: string) => {
    if (/^\d{4}$/.test(iso)) return iso;
    const [y, m] = iso.split('-').map(Number);
    const label = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'es-ES', { month: 'short', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(Date.UTC(y!, m! - 1, 1)));
    return label.replace('.', '');
  };
  return `${fmt(start)} -- ${end ? fmt(end) : present}`;
}

export function renderLatex(locale: Locale, resume: Resume): string {
  const t = copy[locale].cv;
  const b = resume.basics;
  const host = (u: string) => new URL(u).host.replace(/^www\./, '') + new URL(u).pathname.replace(/\/$/, '');
  const contact = [
    tex('Barcelona, España'.replace('España', locale === 'en' ? 'Spain' : 'España')),
    url(`mailto:${b.email}`, b.email),
    url(b.url, host(b.url)),
    ...b.profiles.map((p) => url(p.url, host(p.url))),
  ].join(' \\quad{\\color{muted}·}\\quad ');

  const work = resume.work
    .map(
      // Highlights already cover the one-line summary, so the PDF lists only them.
      (w) => `\\role{${tex(w.position)}}{${w.url ? url(w.url, w.name) : tex(w.name)}}{${period(locale, w.startDate, w.endDate, t.present)}}{${tex(w.location)}}
\\begin{itemize}
${w.highlights.map((h) => `  \\item ${tex(h)}`).join('\n')}
\\end{itemize}`,
    )
    .join('\n\\vspace{5pt}\n');

  const projects = resume.projects
    .map((p) => `\\item \\textbf{${tex(p.name)}}${p.entity && p.entity !== p.name ? ` {\\color{muted}(${tex(p.entity)})}` : ''}: ${tex(p.description)}`)
    .join('\n');

  const skills = resume.skills
    .map((s) => `\\item \\textbf{${tex(s.name)}:} ${tex(s.keywords.join(', '))}`)
    .join('\n');

  const edu = resume.education
    .map((e) => `\\role{${tex(e.studyType)}}{${tex(e.institution)}}{${e.startDate} -- ${e.endDate}}{${tex(e.area)}}`)
    .join('\n');

  return `% ${b.name} — CV (${locale}). Generated from the website content
% (src/content/site.ts and src/content/resume.ts); do not edit by hand.
% Compile with Tectonic: tectonic gonzalo-rios-cv-${locale}.tex
\\documentclass[10pt]{article}
\\usepackage[a4paper,top=14mm,bottom=14mm,left=17mm,right=17mm]{geometry}
\\usepackage{polyglossia}
\\setmainlanguage{${locale === 'en' ? 'english' : 'spanish'}}
\\usepackage{fontspec}
\\setmainfont{texgyreheros}[Extension=.otf, UprightFont=*-regular, BoldFont=*-bold, ItalicFont=*-italic, BoldItalicFont=*-bolditalic]
\\usepackage{xcolor}
\\definecolor{ink}{HTML}{161B28}
\\definecolor{accent}{HTML}{1C2540}
\\definecolor{muted}{HTML}{565C6E}
\\usepackage{enumitem}
\\setlist[itemize]{leftmargin=1.1em, label={\\color{muted}\\textbullet}, itemsep=1pt, topsep=2pt, parsep=0pt}
\\usepackage[hidelinks]{hyperref}
\\hypersetup{pdftitle={${tex(b.name)} — CV}, pdfauthor={${tex(b.name)}}, pdfsubject={${tex(b.label)}}, pdflang={${locale}}, pdfkeywords={${tex(resume.skills.flatMap((s) => s.keywords).slice(0, 12).join(', '))}}}
\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}
\\linespread{1.08}
\\newcommand{\\cvsection}[1]{\\vspace{9pt}{\\color{accent}\\bfseries\\small\\addfontfeatures{LetterSpace=8}\\MakeUppercase{#1}}\\par\\vspace{-4pt}{\\color{accent}\\rule{\\linewidth}{0.5pt}}\\par\\vspace{3pt}}
% \\role{position}{organisation}{dates}{location}
\\newcommand{\\role}[4]{{\\bfseries #1}\\,{\\color{muted}·}\\,#2\\hfill{\\color{muted}\\small #3}\\par{\\color{muted}\\small #4}\\par\\vspace{2pt}}

\\begin{document}
\\color{ink}
{\\fontsize{24}{28}\\selectfont\\bfseries ${tex(b.name)}}\\par\\vspace{3pt}
{\\color{accent}\\large ${tex(b.label)}}\\par\\vspace{5pt}
{\\small ${contact}}\\par

\\cvsection{${tex(t.summary)}}
${tex(b.summary)}

\\cvsection{${tex(t.experience)}}
${work}

\\cvsection{${tex(t.projects)}}
\\begin{itemize}
${projects}
\\end{itemize}

\\cvsection{${tex(t.skills)}}
\\begin{itemize}
${skills}
\\end{itemize}

\\cvsection{${tex(t.education)}}
${edu}

\\cvsection{${tex(t.languages)}}
${resume.languages.map((l) => `${tex(l.language)} {\\color{muted}(${tex(l.fluency)})}`).join(' \\quad{\\color{muted}·}\\quad ')}

\\cvsection{${tex(t.certifications)}}
${resume.certificates.map((c) => tex(c.name)).join(' \\quad{\\color{muted}·}\\quad ')}
\\end{document}
`;
}
