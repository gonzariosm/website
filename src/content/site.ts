// Single source of truth for all site copy. HTML pages, Markdown twins,
// llms.txt and voice narration are all generated from this file.

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const person = {
  name: 'Gonzalo Ríos',
  firstName: 'Gonzalo',
  email: 'contacto@gonzalorios.cl',
  linkedin: 'https://www.linkedin.com/in/gonzariosm',
  github: 'https://github.com/gonzariosm',
  site: 'https://gonzalorios.cl',
};

/** Text-to-speech provider behind the narration, credited in the player and footer. */
export const voiceProvider = { name: 'ElevenLabs', url: 'https://try.elevenlabs.io/x8yskvshd2hd' };

/** Companies linked from the CV. Outbound links are nofollow and carry UTM parameters. */
export type OrgId = 'rebrandly' | 'sitehost' | 'silverhost';
export const orgs: Record<OrgId, { name: string; url: string; domain: string }> = {
  rebrandly: { name: 'Rebrandly', url: 'https://www.rebrandly.com/', domain: 'rebrandly.com' },
  sitehost: { name: 'SiteHost', url: 'https://sitehost.nz/', domain: 'sitehost.nz' },
  silverhost: { name: 'Silverhost', url: 'https://www.silverhost.cl/', domain: 'silverhost.cl' },
};

/** Outbound URL for a company, tagged so the visit is attributed to this site. */
export function orgUrl(id: OrgId, content: string): string {
  const url = new URL(orgs[id].url);
  url.searchParams.set('utm_source', 'gonzalorios.cl');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'portfolio');
  url.searchParams.set('utm_content', content);
  return url.toString();
}

export type SectionId = 'about' | 'skills' | 'work' | 'experience' | 'achievements' | 'contact';
export const sectionIds: SectionId[] = ['about', 'skills', 'work', 'experience', 'achievements', 'contact'];

export type FamilyId = 'languages' | 'cloud' | 'containers' | 'automation' | 'data' | 'ai';
export const familyIds: FamilyId[] = ['ai', 'languages', 'cloud', 'containers', 'automation', 'data'];

/** Periodic-table elements. Notes are localized below in `elementNotes`. */
export const elements: { symbol: string; name: string; family: FamilyId }[] = [
  { symbol: 'Cl', name: 'Claude', family: 'ai' },
  { symbol: 'Mc', name: 'MCP', family: 'ai' },
  { symbol: 'Ag', name: 'AI agents', family: 'ai' },
  { symbol: 'Ev', name: 'LLM evals', family: 'ai' },
  { symbol: 'Go', name: 'Golang', family: 'languages' },
  { symbol: 'Py', name: 'Python', family: 'languages' },
  { symbol: 'Ph', name: 'PHP', family: 'languages' },
  { symbol: 'Sh', name: 'Bash', family: 'languages' },
  { symbol: 'Gq', name: 'GraphQL', family: 'languages' },
  { symbol: 'Rp', name: 'gRPC', family: 'languages' },
  { symbol: 'Aw', name: 'AWS', family: 'cloud' },
  { symbol: 'Ec', name: 'Amazon ECS', family: 'cloud' },
  { symbol: 'La', name: 'AWS Lambda', family: 'cloud' },
  { symbol: 'Do', name: 'DigitalOcean', family: 'cloud' },
  { symbol: 'Wf', name: 'WAF', family: 'cloud' },
  { symbol: 'Li', name: 'Linux', family: 'containers' },
  { symbol: 'Dk', name: 'Docker', family: 'containers' },
  { symbol: 'K8', name: 'Kubernetes', family: 'containers' },
  { symbol: 'Xn', name: 'Xen', family: 'containers' },
  { symbol: 'Ng', name: 'Nginx', family: 'containers' },
  { symbol: 'Tf', name: 'Terraform', family: 'automation' },
  { symbol: 'An', name: 'Ansible', family: 'automation' },
  { symbol: 'Gh', name: 'GitHub Actions', family: 'automation' },
  { symbol: 'Gl', name: 'GitLab CI/CD', family: 'automation' },
  { symbol: 'Ch', name: 'ClickHouse', family: 'data' },
  { symbol: 'Kf', name: 'Apache Kafka', family: 'data' },
  { symbol: 'Dy', name: 'DynamoDB', family: 'data' },
  { symbol: 'My', name: 'MySQL', family: 'data' },
];

export type ProjectVisual = 'platform' | 'ingest' | 'containers' | 'terraform' | 'hosting';

export interface Project {
  id: string;
  visual: ProjectVisual;
  kicker: string;
  orgId?: OrgId;
  title: string;
  summary: string;
  points: string[];
  tags: string[];
}

export interface TimelineItem {
  year: string;
  period: string;
  kind: string;
  role: string;
  org: string;
  orgId?: OrgId;
  place: string;
  text: string;
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
}

export interface Copy {
  meta: { title: string; description: string; ogTagline: string; ogImageAlt: string };
  skipLink: string;
  externalLink: string;
  nav: Record<SectionId, string> & { label: string; home: string };
  langSwitch: { label: string; short: string; full: string };
  hero: {
    eyebrow: string;
    titleLines: [string, string];
    lead: string;
    ctaWork: string;
    ctaTalk: string;
    listen: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string[];
    factsTitle: string;
    facts: { label: string; value: string }[];
    quote: string;
    badge: {
      front: string;
      sub: string;
      role: string;
      fields: { label: string; value: string }[];
      backTitle: string;
      back: { title: string; detail: string }[];
      flip: string;
      flipBack: string;
    };
  };
  statement: string;
  skills: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    filterLabel: string;
    all: string;
    families: Record<FamilyId, string>;
    hint: string;
    asList: string;
  };
  elementNotes: Record<string, string>;
  work: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    projects: Project[];
    open: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    items: TimelineItem[];
  };
  achievements: {
    eyebrow: string;
    title: string;
    accent: string;
    stats: Stat[];
    learningTitle: string;
    learningAccent: string;
    learningEyebrow: string;
    learning: { title: string; detail: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    email: string;
    copy: string;
    copied: string;
    linkedin: string;
    location: string;
  };
  footer: { rights: string; markdown: string; madeWith: string; love: string; byAgents: string; top: string };
  voice: {
    player: string;
    play: string;
    pause: string;
    stop: string;
    listenSection: string;
    captions: string;
    unavailable: string;
    credit: string;
  };
  notFound: { title: string; body: string; back: string };
}

const en: Copy = {
  meta: {
    title: 'Gonzalo Ríos — Director of AI Platform',
    ogTagline: 'I lead the platform that lets engineers ship AI-written code to production, safely.',
    ogImageAlt: 'Illustrated 3D avatar of Gonzalo wearing a Rebrandly t-shirt. gonzalorios.cl, Barcelona.',
    description:
      'Director of AI Platform at Rebrandly. I build the platform that lets engineers ship AI-written code to production safely, backed by 15 years in infrastructure.',
  },
  skipLink: 'Skip to content',
  externalLink: 'external site, opens in a new tab',
  nav: {
    label: 'Sections',
    home: 'Gonzalo Ríos, home',
    about: 'About',
    skills: 'Skills',
    work: 'Work',
    experience: 'Experience',
    achievements: 'Achievements',
    contact: 'Contact',
  },
  langSwitch: { label: 'Leer en español', short: 'ES', full: 'Español' },
  hero: {
    eyebrow: 'Gonzalo Ríos',
    titleLines: ['Director of', 'AI Platform.'],
    lead: "I lead the platform that lets Rebrandly's engineers ship AI-written code to production safely. I've been keeping servers alive for fifteen years.",
    ctaWork: 'Explore my work',
    ctaTalk: "Let's talk",
    listen: 'Hear my intro',
    scroll: 'Scroll to explore',
  },
  about: {
    eyebrow: 'About',
    title: "Hi, I'm",
    accent: 'Gonzalo.',
    body: [
      'Director of AI Platform at Rebrandly. My team builds the paved road for AI-assisted engineering: coding agents with the right context and permissions, automated review, guardrails and CI/CD gates, so code written with AI reaches production as safely as any other.',
      'I got here through fifteen years of DevOps and SRE. Docker, Kubernetes, Terraform and AWS are still my daily tools, and I write Go and Python to automate everything that should not need a human.',
    ],
    factsTitle: 'Quick facts',
    facts: [
      { label: 'Based in', value: 'Barcelona, Spain' },
      { label: 'Role', value: 'Director of AI Platform · Rebrandly' },
      { label: 'Focus', value: 'Coding agents · Guardrails · Safe delivery' },
      { label: 'In production since', value: '2011' },
      { label: 'Worked from', value: 'Chile · New Zealand · Spain' },
      { label: 'My team', value: 'USA · Canada · Spain · Italy · Ireland · Ukraine · Pakistan' },
    ],
    quote: 'From bare-metal servers to AI platforms.',
    badge: {
      front: 'Staff ID',
      sub: 'Portfolio · 2026',
      role: 'Director · AI Platform',
      fields: [
        { label: 'ID no.', value: 'GR-2011' },
        { label: 'Dept.', value: 'AI Platform' },
        { label: 'Uptime', value: '99.99%' },
      ],
      backTitle: 'What I am',
      back: [
        { title: 'AI platform leader', detail: 'Coding agents · guardrails · CI/CD' },
        { title: 'Team lead', detail: 'Standards, mentoring, delivery' },
        { title: 'Platform engineer', detail: 'Docker · Kubernetes · Terraform' },
        { title: 'Builder', detail: 'Go APIs at enterprise scale' },
        { title: 'Founder', detail: 'Silverhost, ten years' },
      ],
      flip: 'Flip the badge',
      flipBack: 'Flip the badge back',
    },
  },
  statement:
    'Code written with AI should ship like any other: reviewed, tested, secure and reversible, so teams move faster without gambling with production.',
  skills: {
    eyebrow: 'Skills',
    title: 'The periodic table of',
    accent: 'my stack.',
    intro: 'Twenty-eight elements in six families, from the AI layer down to the metal. Pick a family to light it up, or select a tile to read about it.',
    filterLabel: 'Filter by family',
    all: 'All',
    families: {
      languages: 'Languages & APIs',
      cloud: 'Cloud',
      containers: 'Systems & containers',
      automation: 'Automation & CI/CD',
      data: 'Data & streaming',
      ai: 'AI',
    },
    hint: 'Select any element to see how I use it.',
    asList: 'View all skills as a list',
  },
  elementNotes: {
    Go: 'My go-to for high-throughput services, like an API that writes hundreds of thousands of records in under a second.',
    Py: 'Automation, tooling and glue between systems.',
    Ph: 'Years of backend work with Symfony and Silex, plus the hosting world it powers.',
    Sh: 'The duct tape of every server I have ever touched.',
    Gq: 'Exposing services to product teams with typed contracts.',
    Rp: 'Fast service-to-service communication.',
    Aw: 'My main cloud: compute, storage, networking and serverless.',
    Ec: 'Migrated legacy services to ECS with auto-scaling.',
    La: 'Event-driven glue and lightweight services.',
    Do: 'Part of the hybrid infrastructure behind Silverhost.',
    Wf: 'Rolled out a web application firewall to stop bad traffic early.',
    Li: 'Administering Linux servers since 2011.',
    Dk: 'Ran a custom Docker cloud with more than 15,000 containers.',
    K8: 'Orchestrating containers when the scale calls for it.',
    Xn: 'Managed Xen virtualization for a hosting provider.',
    Ng: 'Web serving and reverse proxying, everywhere.',
    Tf: 'Infrastructure as code, and co-author of a Terraform provider v1.0.',
    An: 'Configuration management for fleets of servers.',
    Gh: 'The CI/CD gates every change passes, whether a person or an agent wrote it.',
    Gl: 'Pipelines that cut deployment times dramatically.',
    Ch: 'Analytics at scale. One of my top skills.',
    Kf: 'Streaming events between services. One of my top skills.',
    Dy: 'Single-digit-millisecond storage for high-volume APIs.',
    My: 'The relational workhorse behind countless sites.',
    Cl: 'The model behind our coding agents and internal tooling. One of my top skills.',
    Mc: 'Giving coding agents safe, scoped access to internal tools and data.',
    Ag: 'Coding agents that open real pull requests, with humans reviewing what ships.',
    Ev: 'Measuring what agents produce before it reaches production.',
  },
  work: {
    eyebrow: 'Work',
    title: "Things I've",
    accent: 'built.',
    intro: 'From the AI platform I lead today back to the systems that taught me how to run production. Open a panel to see more.',
    open: 'Show project',
    projects: [
      {
        id: 'ai-platform',
        visual: 'platform',
        kicker: 'Rebrandly · 2025 – present',
        orgId: 'rebrandly',
        title: 'AI Platform',
        summary:
          'The paved road for AI-assisted engineering at Rebrandly: coding agents, automated review, guardrails and delivery gates on one platform, so code written with AI can ship to production safely.',
        points: ['Coding agents with scoped context and permissions', 'Automated review and quality gates in CI/CD', 'Guardrails, audit trail and cost visibility'],
        tags: ['Claude', 'MCP', 'GitHub Actions', 'AWS', 'Go'],
      },
      {
        id: 'bulk-ingest',
        visual: 'ingest',
        kicker: 'Rebrandly · Lead DevOps',
        orgId: 'rebrandly',
        title: 'Bulk ingest API',
        summary:
          'A Golang API that writes hundreds of thousands of records into DynamoDB in under a second. It was key to closing deals with strategic customers.',
        points: ['Sub-second bulk writes', 'Parallel batching', 'Built for enterprise volume'],
        tags: ['Go', 'DynamoDB', 'AWS', 'ECS'],
      },
      {
        id: 'container-cloud',
        visual: 'containers',
        kicker: 'SiteHost · Auckland',
        orgId: 'sitehost',
        title: 'Container cloud',
        summary:
          'A custom Docker-based cloud running more than 15,000 containers, with tools to monitor events across thousands of servers.',
        points: ['15,000+ containers', 'Fleet-wide event analysis', 'WAF and bad-traffic filtering'],
        tags: ['Docker', 'Xen', 'Ansible', 'Linux'],
      },
      {
        id: 'terraform-provider',
        visual: 'terraform',
        kicker: 'SiteHost · Auckland',
        orgId: 'sitehost',
        title: 'Terraform provider v1.0',
        summary:
          'Helped ship version 1.0 of the SiteHost Terraform provider, so staff and customers could deploy VPS servers as code.',
        points: ['Infrastructure as code', 'Self-service VPS', 'Customer-facing tooling'],
        tags: ['Terraform', 'Go', 'APIs'],
      },
      {
        id: 'silverhost',
        visual: 'hosting',
        kicker: 'Co-founder · 2011 – 2021',
        orgId: 'silverhost',
        title: 'Silverhost',
        summary:
          'A Chilean hosting company built for small businesses on a budget: dedicated servers, AWS and DigitalOcean combined, with real-time malware and spam defenses.',
        points: ['1,000+ active clients', '500+ projects delivered', 'Ten years of operations'],
        tags: ['Linux', 'AWS', 'DigitalOcean', 'Security'],
      },
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Fifteen years,',
    accent: 'in production.',
    intro: 'From a school data center in Santiago to leading an AI platform in Europe.',
    items: [
      {
        year: '2011',
        period: 'Oct 2011 – Jul 2012',
        kind: 'Experience',
        role: 'System Engineer',
        org: 'Instituto Profesional Valle Central',
        place: 'Santiago, Chile',
        text: 'Installed and ran web, database, DNS, firewall and VoIP services for a national education institute.',
      },
      {
        year: '2011',
        period: '2011 – 2013',
        kind: 'Education',
        role: 'Ingeniero de Ejecución en Informática',
        org: 'Universidad de Ciencias de la Informática',
        place: 'Santiago, Chile',
        text: 'Systems engineering degree, studied while running production systems.',
      },
      {
        year: '2011',
        period: 'Aug 2011 – Aug 2021',
        kind: 'Founder',
        role: 'DevOps & Co-founder',
        org: 'Silverhost Hosting Chile',
        orgId: 'silverhost',
        place: 'Las Condes, Chile',
        text: 'Built a hosting company to more than 1,000 active clients, learning sales, negotiation, marketing and SEO along the way.',
      },
      {
        year: '2012',
        period: 'Jul 2012 – Feb 2014',
        kind: 'Experience',
        role: 'Backend Engineer',
        org: 'Agencia Blue',
        place: 'Providencia, Chile',
        text: 'Mentored the team, moved the agency into custom development with Symfony and brought DevOps into delivery.',
      },
      {
        year: '2021',
        period: 'Aug 2021 – May 2023',
        kind: 'Experience',
        role: 'System Engineer',
        org: 'SiteHost',
        orgId: 'sitehost',
        place: 'Auckland, New Zealand',
        text: 'Kept a 15,000-container cloud healthy, rolled out a WAF and helped ship the Terraform provider v1.0.',
      },
      {
        year: '2023',
        period: 'Jun 2023 – Apr 2024',
        kind: 'Experience',
        role: 'DevOps Engineer',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remote · USA & Europe',
        text: 'Sped up CI pipelines, introduced auto-scaling and migrated legacy services to Amazon ECS.',
      },
      {
        year: '2024',
        period: 'Apr 2024 – Oct 2025',
        kind: 'Experience',
        role: 'Lead DevOps Engineer',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remote · USA & Europe',
        text: 'Led the team behind critical infrastructure, standardised our processes and built a sub-second bulk ingest API in Go.',
      },
      {
        year: '2025',
        period: 'Oct 2025 – present',
        kind: 'Experience',
        role: 'Director of AI Platform',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Barcelona, Spain',
        text: 'Leading a team spread across seven countries and time zones that builds the platform for shipping AI-generated code safely: coding agents, automated review, guardrails and delivery gates.',
      },
    ],
  },
  achievements: {
    eyebrow: 'Achievements',
    title: 'Proud',
    accent: 'moments.',
    stats: [
      { value: 15000, suffix: '+', label: 'containers', context: 'Run on a custom Docker cloud at SiteHost.' },
      { value: 1000, suffix: '+', label: 'active clients', context: 'Served by Silverhost across Chile.' },
      { value: 500, suffix: '+', label: 'projects', context: 'Delivered by the Silverhost team.' },
      { value: 1, prefix: '<', suffix: 's', label: 'bulk ingest', context: 'Hundreds of thousands of records into DynamoDB.' },
      { value: 15, label: 'years in production', context: 'Since my first server in 2011.' },
      { value: 3, label: 'continents', context: 'South America, Oceania and Europe.' },
    ],
    learningEyebrow: 'Education & certifications',
    learningTitle: 'Always',
    learningAccent: 'learning.',
    learning: [
      { title: 'Ingeniero de Ejecución en Informática', detail: 'Universidad de Ciencias de la Informática · 2011 – 2013' },
      { title: 'Professional Git & GitHub', detail: 'Certification' },
      { title: 'English, professional working proficiency', detail: 'Ten years working in English with teams across the USA, Europe and Oceania' },
      { title: 'Current focus: AI-assisted engineering', detail: 'Claude, MCP, coding agents and evaluation-driven development' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's ship AI-written code,",
    accent: 'safely.',
    body: 'Open to conversations about AI-assisted engineering, coding agents in production and platform engineering leadership.',
    email: 'Write me an email',
    copy: 'Copy email address',
    copied: 'Email address copied',
    linkedin: 'LinkedIn',
    location: 'Barcelona · Central European Time',
  },
  footer: {
    rights: 'Gonzalo Ríos',
    markdown: 'Read this page as Markdown',
    madeWith: 'Made with',
    love: 'love',
    byAgents: 'by my agents',
    top: 'Back to top',
  },
  voice: {
    player: 'Voice narration',
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop narration',
    listenSection: 'Listen to this section',
    captions: 'Captions',
    unavailable: 'Narration is not available right now.',
    credit: 'AI voice powered by',
  },
  notFound: {
    title: 'This page took the day off.',
    body: 'The address you followed does not exist, or it moved.',
    back: 'Go to the home page',
  },
};

const es: Copy = {
  meta: {
    title: 'Gonzalo Ríos — Director de Plataforma de IA',
    ogTagline: 'Lidero la plataforma que permite llevar a producción, de forma segura, el código creado con IA.',
    ogImageAlt: 'Avatar 3D ilustrado de Gonzalo con una polera de Rebrandly. gonzalorios.cl, Barcelona.',
    description:
      'Director de Plataforma de IA en Rebrandly. Construyo la plataforma que permite llevar a producción, de forma segura, el código creado con IA. 15 años en infraestructura.',
  },
  skipLink: 'Saltar al contenido',
  externalLink: 'sitio externo, se abre en una pestaña nueva',
  nav: {
    label: 'Secciones',
    home: 'Gonzalo Ríos, inicio',
    about: 'Sobre mí',
    skills: 'Skills',
    work: 'Proyectos',
    experience: 'Experiencia',
    achievements: 'Logros',
    contact: 'Contacto',
  },
  langSwitch: { label: 'Read in English', short: 'EN', full: 'English' },
  hero: {
    eyebrow: 'Gonzalo Ríos',
    titleLines: ['Director de', 'Plataforma IA.'],
    lead: 'Lidero la plataforma que permite a los ingenieros de Rebrandly llevar a producción, de forma segura, el código creado con IA. Llevo quince años manteniendo servidores con vida.',
    ctaWork: 'Ver mi trabajo',
    ctaTalk: 'Hablemos',
    listen: 'Escucha mi intro',
    scroll: 'Desliza para explorar',
  },
  about: {
    eyebrow: 'Sobre mí',
    title: 'Hola, soy',
    accent: 'Gonzalo.',
    body: [
      'Director de Plataforma de IA en Rebrandly. Mi equipo construye el camino pavimentado para la ingeniería asistida por IA: agentes de código con el contexto y los permisos justos, revisión automática, guardrails y gates de CI/CD, para que el código creado con IA llegue a producción tan seguro como cualquier otro.',
      'Llegué aquí tras quince años de DevOps y SRE. Docker, Kubernetes, Terraform y AWS siguen siendo mis herramientas diarias, y escribo Go y Python para automatizar todo lo que no debería necesitar a una persona.',
    ],
    factsTitle: 'En corto',
    facts: [
      { label: 'Vivo en', value: 'Barcelona, España' },
      { label: 'Rol', value: 'Director de Plataforma de IA · Rebrandly' },
      { label: 'Foco', value: 'Agentes de código · Guardrails · Despliegue seguro' },
      { label: 'En producción desde', value: '2011' },
      { label: 'He trabajado desde', value: 'Chile · Nueva Zelanda · España' },
      { label: 'Mi equipo', value: 'EE. UU. · Canadá · España · Italia · Irlanda · Ucrania · Pakistán' },
    ],
    quote: 'De servidores bare-metal a plataformas de IA.',
    badge: {
      front: 'Credencial',
      sub: 'Portafolio · 2026',
      role: 'Director · Plataforma IA',
      fields: [
        { label: 'N.º ID', value: 'GR-2011' },
        { label: 'Área', value: 'Plataforma IA' },
        { label: 'Uptime', value: '99,99 %' },
      ],
      backTitle: 'Lo que soy',
      back: [
        { title: 'Líder de plataforma IA', detail: 'Agentes de código · guardrails · CI/CD' },
        { title: 'Líder de equipo', detail: 'Estándares, mentoría, entrega' },
        { title: 'Ingeniero de plataforma', detail: 'Docker · Kubernetes · Terraform' },
        { title: 'Constructor', detail: 'APIs en Go a escala enterprise' },
        { title: 'Fundador', detail: 'Silverhost, diez años' },
      ],
      flip: 'Voltear la credencial',
      flipBack: 'Volver a voltear la credencial',
    },
  },
  statement:
    'El código creado con IA debería desplegarse como cualquier otro: revisado, probado, seguro y reversible, para que los equipos avancen más rápido sin apostar con producción.',
  skills: {
    eyebrow: 'Skills',
    title: 'La tabla periódica de',
    accent: 'mi stack.',
    intro: 'Veintiocho elementos en seis familias, desde la capa de IA hasta el metal. Elige una familia para iluminarla, o selecciona un elemento para leer sobre él.',
    filterLabel: 'Filtrar por familia',
    all: 'Todas',
    families: {
      languages: 'Lenguajes y APIs',
      cloud: 'Cloud',
      containers: 'Sistemas y contenedores',
      automation: 'Automatización y CI/CD',
      data: 'Datos y streaming',
      ai: 'IA',
    },
    hint: 'Selecciona cualquier elemento para ver cómo lo uso.',
    asList: 'Ver todas las skills como lista',
  },
  elementNotes: {
    Go: 'Mi opción para servicios de alto rendimiento, como una API que escribe cientos de miles de registros en menos de un segundo.',
    Py: 'Automatización, herramientas y pegamento entre sistemas.',
    Ph: 'Años de backend con Symfony y Silex, más el mundo del hosting que mueve.',
    Sh: 'La cinta adhesiva de cada servidor que he tocado.',
    Gq: 'Exponer servicios a los equipos de producto con contratos tipados.',
    Rp: 'Comunicación rápida entre servicios.',
    Aw: 'Mi cloud principal: cómputo, almacenamiento, redes y serverless.',
    Ec: 'Migré servicios legacy a ECS con auto-scaling.',
    La: 'Pegamento orientado a eventos y servicios livianos.',
    Do: 'Parte de la infraestructura híbrida de Silverhost.',
    Wf: 'Implementé un firewall de aplicaciones web para frenar el tráfico malicioso a tiempo.',
    Li: 'Administrando servidores Linux desde 2011.',
    Dk: 'Operé un cloud propio en Docker con más de 15.000 contenedores.',
    K8: 'Orquestando contenedores cuando la escala lo pide.',
    Xn: 'Gestioné virtualización Xen para un proveedor de hosting.',
    Ng: 'Servidor web y proxy inverso, en todas partes.',
    Tf: 'Infraestructura como código, y coautor de un proveedor de Terraform v1.0.',
    An: 'Gestión de configuración para flotas de servidores.',
    Gh: 'Los gates de CI/CD que pasa cada cambio, lo haya escrito una persona o un agente.',
    Gl: 'Pipelines que redujeron drásticamente los tiempos de despliegue.',
    Ch: 'Analítica a escala. Una de mis principales skills.',
    Kf: 'Streaming de eventos entre servicios. Una de mis principales skills.',
    Dy: 'Almacenamiento con latencia de milisegundos para APIs de alto volumen.',
    My: 'El caballo de batalla relacional detrás de incontables sitios.',
    Cl: 'El modelo detrás de nuestros agentes de código y herramientas internas. Una de mis principales skills.',
    Mc: 'Dar a los agentes de código acceso seguro y acotado a herramientas y datos internos.',
    Ag: 'Agentes de código que abren pull requests reales, con personas revisando lo que se despliega.',
    Ev: 'Medir lo que producen los agentes antes de que llegue a producción.',
  },
  work: {
    eyebrow: 'Proyectos',
    title: 'Cosas que he',
    accent: 'construido.',
    intro: 'Desde la plataforma de IA que lidero hoy hasta los sistemas que me enseñaron a operar producción. Abre un panel para ver más.',
    open: 'Ver proyecto',
    projects: [
      {
        id: 'ai-platform',
        visual: 'platform',
        kicker: 'Rebrandly · 2025 – hoy',
        orgId: 'rebrandly',
        title: 'Plataforma de IA',
        summary:
          'El camino pavimentado para la ingeniería asistida por IA en Rebrandly: agentes de código, revisión automática, guardrails y gates de despliegue en una sola plataforma, para que el código creado con IA llegue a producción de forma segura.',
        points: ['Agentes de código con contexto y permisos acotados', 'Revisión automática y quality gates en CI/CD', 'Guardrails, trazabilidad y visibilidad de costos'],
        tags: ['Claude', 'MCP', 'GitHub Actions', 'AWS', 'Go'],
      },
      {
        id: 'bulk-ingest',
        visual: 'ingest',
        kicker: 'Rebrandly · Lead DevOps',
        orgId: 'rebrandly',
        title: 'API de ingesta masiva',
        summary:
          'Una API en Golang que escribe cientos de miles de registros en DynamoDB en menos de un segundo. Fue clave para cerrar acuerdos con clientes estratégicos.',
        points: ['Escrituras masivas en menos de un segundo', 'Batching en paralelo', 'Hecha para volumen enterprise'],
        tags: ['Go', 'DynamoDB', 'AWS', 'ECS'],
      },
      {
        id: 'container-cloud',
        visual: 'containers',
        kicker: 'SiteHost · Auckland',
        orgId: 'sitehost',
        title: 'Cloud de contenedores',
        summary:
          'Un cloud propio basado en Docker con más de 15.000 contenedores, con herramientas para monitorear eventos en miles de servidores.',
        points: ['Más de 15.000 contenedores', 'Análisis de eventos de toda la flota', 'WAF y filtrado de tráfico malicioso'],
        tags: ['Docker', 'Xen', 'Ansible', 'Linux'],
      },
      {
        id: 'terraform-provider',
        visual: 'terraform',
        kicker: 'SiteHost · Auckland',
        orgId: 'sitehost',
        title: 'Proveedor de Terraform v1.0',
        summary:
          'Participé en la versión 1.0 del proveedor de Terraform de SiteHost, para que el equipo y los clientes desplegaran servidores VPS como código.',
        points: ['Infraestructura como código', 'VPS autoservicio', 'Herramientas para clientes'],
        tags: ['Terraform', 'Go', 'APIs'],
      },
      {
        id: 'silverhost',
        visual: 'hosting',
        kicker: 'Cofundador · 2011 – 2021',
        orgId: 'silverhost',
        title: 'Silverhost',
        summary:
          'Una empresa chilena de hosting para pymes con presupuesto ajustado: servidores dedicados, AWS y DigitalOcean combinados, con defensas en tiempo real contra malware y spam.',
        points: ['Más de 1.000 clientes activos', 'Más de 500 proyectos entregados', 'Diez años de operación'],
        tags: ['Linux', 'AWS', 'DigitalOcean', 'Seguridad'],
      },
    ],
  },
  experience: {
    eyebrow: 'Experiencia',
    title: 'Quince años,',
    accent: 'en producción.',
    intro: 'Del data center de un instituto en Santiago a liderar una plataforma de IA en Europa.',
    items: [
      {
        year: '2011',
        period: 'oct. 2011 – jul. 2012',
        kind: 'Experiencia',
        role: 'Ingeniero de Sistemas',
        org: 'Instituto Profesional Valle Central',
        place: 'Santiago, Chile',
        text: 'Instalé y operé servicios web, de bases de datos, DNS, firewall y VoIP para un instituto educativo nacional.',
      },
      {
        year: '2011',
        period: '2011 – 2013',
        kind: 'Educación',
        role: 'Ingeniero de Ejecución en Informática',
        org: 'Universidad de Ciencias de la Informática',
        place: 'Santiago, Chile',
        text: 'Ingeniería en sistemas, estudiada mientras operaba sistemas en producción.',
      },
      {
        year: '2011',
        period: 'ago. 2011 – ago. 2021',
        kind: 'Fundador',
        role: 'DevOps y Cofundador',
        org: 'Silverhost Hosting Chile',
        orgId: 'silverhost',
        place: 'Las Condes, Chile',
        text: 'Hice crecer una empresa de hosting a más de 1.000 clientes activos, aprendiendo ventas, negociación, marketing y SEO en el camino.',
      },
      {
        year: '2012',
        period: 'jul. 2012 – feb. 2014',
        kind: 'Experiencia',
        role: 'Backend Engineer',
        org: 'Agencia Blue',
        place: 'Providencia, Chile',
        text: 'Formé al equipo, llevé a la agencia al desarrollo a medida con Symfony e incorporé DevOps a la entrega.',
      },
      {
        year: '2021',
        period: 'ago. 2021 – may. 2023',
        kind: 'Experiencia',
        role: 'Ingeniero de Sistemas',
        org: 'SiteHost',
        orgId: 'sitehost',
        place: 'Auckland, Nueva Zelanda',
        text: 'Mantuve sano un cloud de 15.000 contenedores, implementé un WAF y ayudé a lanzar el proveedor de Terraform v1.0.',
      },
      {
        year: '2023',
        period: 'jun. 2023 – abr. 2024',
        kind: 'Experiencia',
        role: 'DevOps Engineer',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remoto · EE. UU. y Europa',
        text: 'Aceleré los pipelines de CI, introduje auto-scaling y migré servicios legacy a Amazon ECS.',
      },
      {
        year: '2024',
        period: 'abr. 2024 – oct. 2025',
        kind: 'Experiencia',
        role: 'Lead DevOps Engineer',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remoto · EE. UU. y Europa',
        text: 'Lideré el equipo de la infraestructura crítica, estandaricé nuestros procesos y construí una API de ingesta masiva en Go que responde en menos de un segundo.',
      },
      {
        year: '2025',
        period: 'oct. 2025 – hoy',
        kind: 'Experiencia',
        role: 'Director de Plataforma de IA',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Barcelona, España',
        text: 'Lidero un equipo repartido en siete países y zonas horarias que construye la plataforma para desplegar código creado con IA de forma segura: agentes de código, revisión automática, guardrails y gates de despliegue.',
      },
    ],
  },
  achievements: {
    eyebrow: 'Logros',
    title: 'Momentos de',
    accent: 'orgullo.',
    stats: [
      { value: 15000, suffix: '+', label: 'contenedores', context: 'En un cloud propio sobre Docker en SiteHost.' },
      { value: 1000, suffix: '+', label: 'clientes activos', context: 'Atendidos por Silverhost en todo Chile.' },
      { value: 500, suffix: '+', label: 'proyectos', context: 'Entregados por el equipo de Silverhost.' },
      { value: 1, prefix: '<', suffix: 's', label: 'ingesta masiva', context: 'Cientos de miles de registros en DynamoDB.' },
      { value: 15, label: 'años en producción', context: 'Desde mi primer servidor en 2011.' },
      { value: 3, label: 'continentes', context: 'Sudamérica, Oceanía y Europa.' },
    ],
    learningEyebrow: 'Educación y certificaciones',
    learningTitle: 'Siempre',
    learningAccent: 'aprendiendo.',
    learning: [
      { title: 'Ingeniero de Ejecución en Informática', detail: 'Universidad de Ciencias de la Informática · 2011 – 2013' },
      { title: 'Curso Profesional de Git y GitHub', detail: 'Certificación' },
      { title: 'Inglés, nivel profesional', detail: 'Diez años trabajando en inglés con equipos de EE. UU., Europa y Oceanía' },
      { title: 'Foco actual: ingeniería asistida por IA', detail: 'Claude, MCP, agentes de código y desarrollo guiado por evaluaciones' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Despleguemos código con IA',
    accent: 'de forma segura.',
    body: 'Abierto a conversar sobre ingeniería asistida por IA, agentes de código en producción y liderazgo en ingeniería de plataformas.',
    email: 'Escríbeme un email',
    copy: 'Copiar dirección de email',
    copied: 'Dirección de email copiada',
    linkedin: 'LinkedIn',
    location: 'Barcelona · Hora de Europa Central',
  },
  footer: {
    rights: 'Gonzalo Ríos',
    markdown: 'Leer esta página en Markdown',
    madeWith: 'Hecho con',
    love: 'amor',
    byAgents: 'por mis agentes',
    top: 'Volver arriba',
  },
  voice: {
    player: 'Narración de voz',
    play: 'Reproducir',
    pause: 'Pausar',
    stop: 'Detener narración',
    listenSection: 'Escuchar esta sección',
    captions: 'Subtítulos',
    unavailable: 'La narración no está disponible ahora.',
    credit: 'Voz con IA de',
  },
  notFound: {
    title: 'Esta página se tomó el día libre.',
    body: 'La dirección que seguiste no existe o se movió.',
    back: 'Ir a la página de inicio',
  },
};

export const copy: Record<Locale, Copy> = { en, es };

/** Path of the home page for a locale. English lives at the root. */
export const homePath = (locale: Locale) => (locale === 'en' ? '/' : '/es/');
export const markdownPath = (locale: Locale) => (locale === 'en' ? '/index.md' : '/es/index.md');
export const htmlLang: Record<Locale, string> = { en: 'en', es: 'es' };
export const ogLocale: Record<Locale, string> = { en: 'en_US', es: 'es_ES' };
