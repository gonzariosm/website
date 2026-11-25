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
        'Lead the Platform & AI team: 4 engineers in Spain, Italy and Pakistan, across DevOps, data and platform.',
        'Led the Claude Code rollout, from the SOC 2 and HIPAA assessment to 100% of engineers building with AI agents, and drove the internal plugin marketplace (7 plugins, ~40 skills, subagents and hooks).',
        'Introduced spec-driven development (Engineering Design Specs and ADRs as the input for AI agents), ran internal AI training and rolled out org-wide Claude rules for pull requests: draft-first PRs went from 7% to 93%.',
        'Conceived and prototyped Rebrandly’s MCP server in Go, now the customer-facing connector; moved production LLM calls to AWS Bedrock with guardrails and set up Claude as an on-call assistant that triages alerts.',
        'Built a Go Kafka → ClickHouse pipeline handling billions of events a month, backfilled 11.4B historical clicks with zero drift and made conversion lookups on a 2B-row table 230× faster (106 s → 0.46 s).',
        'Led the GitLab → GitHub migration (~400 repositories) and the move from the Serverless Framework to OpenTofu; designed the OpenTelemetry + Coralogix observability stack.',
        'Lead the SOC 2, HIPAA and GDPR programs and own vendor negotiations with AWS, ClickHouse, Coralogix and DoiT.',
      ],
      es: [
        'Lidero el equipo de Plataforma e IA: 4 ingenieros en España, Italia y Pakistán, entre DevOps, datos y plataforma.',
        'Implanté Claude Code, desde la evaluación de SOC 2 y HIPAA hasta que el 100% de ingeniería desarrolla con agentes de IA, e impulsé el marketplace interno de plugins (7 plugins, ~40 skills, subagentes y hooks).',
        'Introduje el desarrollo guiado por especificaciones, impartí formación interna en IA y desplegué reglas de Claude para las pull requests: las que pasan primero por borrador subieron del 7% al 93%.',
        'Ideé y prototipé el servidor MCP de Rebrandly en Go, hoy nuestro conector para clientes; migré los LLM en producción a AWS Bedrock con guardrails y configuré Claude como asistente de guardia que clasifica alertas.',
        'Construí en Go un pipeline Kafka → ClickHouse con miles de millones de eventos al mes, recuperé 11.400 millones de clics históricos sin diferencias y aceleré 230 veces las búsquedas de conversiones.',
        'Lideré la migración de GitLab a GitHub (~400 repositorios) y el paso del Serverless Framework a OpenTofu; diseñé el stack de observabilidad con OpenTelemetry y Coralogix.',
        'Lidero SOC 2, HIPAA y GDPR y gestiono las negociaciones con AWS, ClickHouse, Coralogix y DoiT.',
      ],
    },
  },
  'rebrandly-lead': {
    start: '2024-04',
    end: '2025-10',
    highlights: {
      en: [
        'Led the DevOps team behind Rebrandly’s production infrastructure on AWS, including incident response and root-cause analysis.',
        'Owned the 2025 SOC 2 recertification, including remediation of the AWS pentest findings before the audit.',
        'Built a Go bulk-links API that inserts hundreds of thousands of records into DynamoDB in under a second, key to closing deals with strategic customers.',
        'Selected and deployed ClickHouse, the foundation for conversion tracking and analytics, and stood up the Redshift data warehouse with its production database migrations, with no incidents.',
        'Built security services: Google Safe Browsing v5 URL scanning and an npm supply-chain (Shai-Hulud) scanner.',
      ],
      es: [
        'Lideré el equipo de DevOps de producción en AWS, con respuesta a incidentes y análisis de causa raíz.',
        'Lideré la recertificación SOC 2 de 2025, corrigiendo antes de la auditoría los hallazgos del pentest de AWS.',
        'Desarrollé en Go una API de creación masiva de enlaces que inserta cientos de miles de registros en DynamoDB en menos de un segundo, clave para cerrar acuerdos con clientes estratégicos.',
        'Seleccioné e implanté ClickHouse, la base del seguimiento de conversiones y la analítica, y puse en marcha el data warehouse en Redshift con sus migraciones de bases de datos de producción, sin incidencias.',
        'Desarrollé servicios de seguridad: URLs con Google Safe Browsing v5 y un escáner npm (Shai-Hulud).',
      ],
    },
  },
  'rebrandly-devops': {
    start: '2023-06',
    end: '2024-04',
    highlights: {
      en: [
        'Halved deployment times (20–30 → 10–15 min) by optimising GitLab CI pipelines and container images.',
        'Migrated legacy services to Amazon ECS, adding auto-scaling and deployment circuit breakers.',
        'Optimised resource usage and modernised container images and front proxies.',
      ],
      es: [
        'Reduje los despliegues a la mitad (de 20–30 a 10–15 min) optimizando GitLab CI y las imágenes.',
        'Migré servicios legacy a Amazon ECS, con auto-scaling y circuit breakers en los despliegues.',
        'Optimicé el uso de recursos y modernicé las imágenes de contenedores y los proxies de entrada.',
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

/**
 * Branded short links (Rebrandly, links.gonzalorios.cl) for the CV downloads,
 * so each format's clicks are measured. They redirect to cvFiles() below.
 */
export const cvLinks = (locale: Locale) => ({
  pdf: `https://links.gonzalorios.cl/cv-pdf-${locale}`,
  json: `https://links.gonzalorios.cl/cv-json-${locale}`,
  tex: `https://links.gonzalorios.cl/cv-latex-${locale}`,
});

/** Public file names of the downloadable CV, per locale. */
export const cvFiles = (locale: Locale) => ({
  pdf: `/cv/gonzalo-rios-cv-${locale}.pdf`,
  tex: `/cv/gonzalo-rios-cv-${locale}.tex`,
  json: locale === 'en' ? '/resume.json' : '/es/resume.json',
});
