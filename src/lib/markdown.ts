import { copy, elements, familyIds, person, homePath, markdownPath, type Locale } from '../content/site';

/** Renders the full page content as Markdown, from the same source as the HTML. */
export function renderMarkdown(locale: Locale, site: URL): string {
  const t = copy[locale];
  const url = new URL(homePath(locale), site).href;
  const other: Locale = locale === 'en' ? 'es' : 'en';
  const lines: string[] = [];
  const push = (...l: string[]) => lines.push(...l);

  push(
    `# ${person.name}`,
    '',
    `> ${t.hero.titleLines.join(' ')} ${t.hero.lead}`,
    '',
    `- ${t.contact.email}: <mailto:${person.email}>`,
    `- LinkedIn: <${person.linkedin}>`,
    `- HTML: <${url}>`,
    `- ${t.langSwitch.full}: <${new URL(markdownPath(other), site).href}>`,
    '',
    `## ${t.nav.about}`,
    '',
    `### ${t.about.title} ${t.about.accent}`,
    '',
    ...t.about.body.flatMap((p) => [p, '']),
    `**${t.about.factsTitle}**`,
    '',
    ...t.about.facts.map((f) => `- **${f.label}:** ${f.value}`),
    '',
    `> ${t.about.quote}`,
    '',
    t.statement,
    '',
    `## ${t.nav.skills}`,
    '',
    t.skills.intro,
    '',
  );

  for (const fam of familyIds) {
    push(`### ${t.skills.families[fam]}`, '');
    for (const el of elements.filter((e) => e.family === fam)) {
      push(`- **${el.name}** — ${t.elementNotes[el.symbol]}`);
    }
    push('');
  }

  push(`## ${t.nav.work}`, '', t.work.intro, '');
  for (const p of t.work.projects) {
    push(`### ${p.title}`, '', `*${p.kicker}*`, '', p.summary, '', ...p.points.map((pt) => `- ${pt}`), '', `${p.tags.join(' · ')}`, '');
  }

  push(`## ${t.nav.experience}`, '', t.experience.intro, '');
  for (const item of [...t.experience.items].reverse()) {
    push(`### ${item.role} — ${item.org}`, '', `${item.period} · ${item.place} · ${item.kind}`, '', item.text, '');
  }

  push(`## ${t.nav.achievements}`, '');
  for (const s of t.achievements.stats) {
    const nf = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-CL');
    push(`- **${s.prefix ?? ''}${nf.format(s.value)}${s.suffix ?? ''} ${s.label}** — ${s.context}`);
  }
  push('', `### ${t.achievements.learningEyebrow}`, '');
  for (const l of t.achievements.learning) push(`- **${l.title}** — ${l.detail}`);

  push('', `## ${t.nav.contact}`, '', `${t.contact.title} ${t.contact.accent}`, '', t.contact.body, '', `- <mailto:${person.email}>`, `- <${person.linkedin}>`, `- ${t.contact.location}`, '');

  return lines.join('\n');
}
