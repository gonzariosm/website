// CV-only details that the landing page does not show: ISO dates, highlights
// and education facts. Everything else (roles, companies, summaries, skills,
// projects) comes from site.ts, so the page, the Markdown twin, JSON Resume,
// LaTeX and PDF versions never drift apart.
import type { Locale } from './site';

type Localized<T> = Record<Locale, T>;

export interface RoleDetails {
  /** ISO 8601 (YYYY-MM). */
  start: string;
  /** ISO 8601 (YYYY-MM); omitted for the current role. */
  end?: string;
  highlights: Localized<string[]>;
}

/** Keyed by TimelineItem.id in site.ts. */
export const roleDetails: Record<string, RoleDetails> = {
  'rebrandly-director': {
    start: '2025-10',
    highlights: {
      en: [
        'Lead a team spread across the USA, Canada, Spain, Italy, Ireland, Ukraine and Pakistan.',
        'Own the platform for AI-assisted engineering: coding agents with scoped context and permissions, automated review, guardrails and CI/CD gates.',
        'Make code written with AI reach production as safely as any other change.',
      ],
      es: [
        'Lidero un equipo repartido entre EE. UU., Canadá, España, Italia, Irlanda, Ucrania y Pakistán.',
        'Responsable de la plataforma de ingeniería asistida por IA: agentes de código con contexto y permisos acotados, revisión automática, guardrails y gates de CI/CD.',
        'Que el código creado con IA llegue a producción tan seguro como cualquier otro cambio.',
      ],
    },
  },
  'rebrandly-lead': {
    start: '2024-04',
    end: '2025-10',
    highlights: {
      en: [
        'Led the team responsible for the uninterrupted operation of critical infrastructure.',
        'Documented and standardised the team’s processes so practices are easy to follow.',
        'Designed and led a Go API that inserts hundreds of thousands of records into DynamoDB in under a second, key to closing deals with strategic customers.',
      ],
      es: [
        'Lideré el equipo responsable de la operación continua de la infraestructura crítica.',
        'Documenté y estandaricé los procesos del equipo para que fueran fáciles de seguir.',
        'Diseñé y lideré una API en Go que inserta cientos de miles de registros en DynamoDB en menos de un segundo, clave para cerrar acuerdos con clientes estratégicos.',
      ],
    },
  },
  'rebrandly-devops': {
    start: '2023-06',
    end: '2024-04',
    highlights: {
      en: [
        'Optimised CI pipelines, dramatically reducing deployment times.',
        'Improved resource usage and kept container images up to date.',
        'Introduced auto-scaling and migrated legacy services to Amazon ECS.',
      ],
      es: [
        'Optimicé los pipelines de CI y reduje drásticamente los tiempos de despliegue.',
        'Mejoré el uso de recursos y mantuve actualizadas las imágenes de contenedores.',
        'Introduje auto-scaling y migré servicios legacy a Amazon ECS.',
      ],
    },
  },
  sitehost: {
    start: '2021-08',
    end: '2023-05',
    highlights: {
      en: [
        'Maintained a custom Docker-based container cloud running more than 15,000 containers.',
        'Managed Xen virtualisation and automated configuration with Ansible.',
        'Rolled out a Web Application Firewall and a system to filter bad traffic.',
        'Built tools to analyse and monitor events across thousands of servers.',
        'Contributed to version 1.0 of the SiteHost Terraform provider, so staff and customers deploy VPS servers as code.',
      ],
      es: [
        'Mantuve un cloud de contenedores propio sobre Docker con más de 15.000 contenedores.',
        'Gestioné virtualización Xen y automaticé la configuración con Ansible.',
        'Implementé un Web Application Firewall y un sistema para filtrar tráfico malicioso.',
        'Construí herramientas para analizar y monitorear eventos en miles de servidores.',
        'Participé en la versión 1.0 del proveedor de Terraform de SiteHost, para desplegar servidores VPS como código.',
      ],
    },
  },
  'agencia-blue': {
    start: '2012-07',
    end: '2014-02',
    highlights: {
      en: [
        'Trained and mentored the team as the agency grew.',
        'Delivered sites with WordPress, Drupal and PrestaShop, then moved the agency into custom development with Silex and Symfony 2.',
        'Introduced DevOps: server and software configuration for custom projects.',
      ],
      es: [
        'Formé y guié al equipo mientras la agencia crecía.',
        'Entregué sitios con WordPress, Drupal y PrestaShop, y luego llevé a la agencia al desarrollo a medida con Silex y Symfony 2.',
        'Incorporé DevOps: configuración de servidores y software para proyectos a medida.',
      ],
    },
  },
  silverhost: {
    start: '2011-08',
    end: '2021-08',
    highlights: {
      en: [
        'Grew a hosting company to more than 1,000 active clients across Chile, with 500+ projects delivered.',
        'Combined dedicated servers, AWS and DigitalOcean into a reliable, affordable platform.',
        'Built tooling for malicious-traffic handling, spam monitoring and real-time malware detection.',
        'Ran sales, negotiation, digital marketing and SEO.',
      ],
      es: [
        'Hice crecer una empresa de hosting a más de 1.000 clientes activos en Chile, con más de 500 proyectos entregados.',
        'Combiné servidores dedicados, AWS y DigitalOcean en una plataforma confiable y accesible.',
        'Construí herramientas para manejar tráfico malicioso, monitorear spam y detectar malware en tiempo real.',
        'Me encargué de ventas, negociación, marketing digital y SEO.',
      ],
    },
  },
  'valle-central': {
    start: '2011-10',
    end: '2012-07',
    highlights: {
      en: [
        'Installed, configured and monitored Apache, Nginx and IIS web servers, MySQL and SQL Server databases, BIND DNS, a SonicWall firewall and Cisco Call Manager VoIP.',
      ],
      es: [
        'Instalé, configuré y monitoreé servidores web Apache, Nginx e IIS, bases de datos MySQL y SQL Server, DNS BIND, un firewall SonicWall y VoIP Cisco Call Manager.',
      ],
    },
  },
};

/** Timeline items that are education rather than work. */
export const education: Record<string, { start: string; end: string; area: Localized<string> }> = {
  ucinf: { start: '2011', end: '2013', area: { en: 'Systems Engineering', es: 'Ingeniería en Sistemas' } },
};

export const certificates: Localized<{ name: string }[]> = {
  en: [{ name: 'Curso Profesional de Git y GitHub' }],
  es: [{ name: 'Curso Profesional de Git y GitHub' }],
};

/** Public file names of the downloadable CV, per locale. */
export const cvFiles = (locale: Locale) => ({
  pdf: `/cv/gonzalo-rios-cv-${locale}.pdf`,
  tex: `/cv/gonzalo-rios-cv-${locale}.tex`,
  json: locale === 'en' ? '/resume.json' : '/es/resume.json',
});
