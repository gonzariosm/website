// Builds the CV as a JSON Resume document (https://jsonresume.org/schema,
// v1.0.0) from the same content as the landing page.
import { copy, elements, familyIds, orgs, person, type Locale, type TimelineItem } from '../content/site';
import { certificates, cvFiles, education, roleDetails } from '../content/resume';

export const JSON_RESUME_SCHEMA = 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json';

/** Current role first, then by end date, then by start date (newest first). */
const byRecency = (a: { startDate: string; endDate?: string }, b: { startDate: string; endDate?: string }) =>
  (b.endDate ?? '9999').localeCompare(a.endDate ?? '9999') || b.startDate.localeCompare(a.startDate);

function orgSite(item: TimelineItem): string | undefined {
  return item.orgId ? orgs[item.orgId].url : undefined;
}

/** Always uses the production domain: the CV is the same file wherever the site is previewed. */
export function buildResume(locale: Locale) {
  const site = new URL(person.site);
  const t = copy[locale];
  const items = t.experience.items;
  const current = items.find((i) => roleDetails[i.id] && !roleDetails[i.id]!.end) ?? items.at(-1)!;
  const abs = (path: string) => new URL(path, site).href;
  const username = (url: string) => new URL(url).pathname.split('/').filter(Boolean).at(-1) ?? '';

  return {
    $schema: JSON_RESUME_SCHEMA,
    basics: {
      name: person.name,
      label: current.role,
      image: abs('/avatar/face-320.webp'),
      email: person.email,
      url: new URL(locale === 'en' ? '/' : '/es/', site).href,
      summary: t.about.body.join(' '),
      location: { city: 'Barcelona', region: 'Catalonia', countryCode: 'ES' },
      profiles: [
        { network: 'LinkedIn', username: username(person.linkedin), url: person.linkedin },
        { network: 'GitHub', username: username(person.github), url: person.github },
      ],
    },
    work: items
      .filter((item) => roleDetails[item.id])
      .map((item) => {
        const d = roleDetails[item.id]!;
        return {
          name: item.org,
          position: item.role,
          url: orgSite(item),
          location: item.place,
          startDate: d.start,
          ...(d.end ? { endDate: d.end } : {}),
          summary: item.text,
          highlights: d.highlights[locale],
        };
      })
      .sort(byRecency),
    education: items
      .filter((item) => education[item.id])
      .map((item) => {
        const e = education[item.id]!;
        return { institution: item.org, area: e.area[locale], studyType: item.role, startDate: e.start, endDate: e.end };
      }),
    certificates: certificates[locale],
    skills: familyIds.map((f) => ({
      name: t.skills.families[f],
      keywords: elements.filter((el) => el.family === f).map((el) => el.name),
    })),
    languages: t.cv.languageList.map((l) => ({ language: l.language, fluency: l.fluency })),
    projects: t.work.projects.map((p) => ({
      name: p.title,
      description: p.summary,
      highlights: p.points,
      keywords: p.tags,
      ...(p.orgId ? { entity: orgs[p.orgId].name, url: orgs[p.orgId].url } : {}),
    })),
    // No lastModified: a build date would change the file without any content change.
    meta: { canonical: abs(cvFiles(locale).json), version: 'v1.0.0' },
  };
}

export type Resume = ReturnType<typeof buildResume>;
