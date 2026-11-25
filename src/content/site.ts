// Single source of truth for all site copy. HTML pages, Markdown twins,
// llms.txt and voice narration are all generated from this file.

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const person = {
  name: 'Gonzalo Ríos',
  firstName: 'Gonzalo',
  /** What friends call him; the giant word in the hero and the "aka" lines. */
  nickname: 'Gonzalito',
  email: 'contacto@gonzalorios.cl',
  linkedin: 'https://www.linkedin.com/in/gonzariosm',
  github: 'https://github.com/gonzariosm',
  site: 'https://gonzalorios.cl',
};

/** Text-to-speech provider behind the narration, credited in the player and footer. */
/**
 * Branded short links (Rebrandly, workspace "Gonzalo Clicks", domain
 * links.gonzalorios.cl) used for every outbound link a visitor clicks, so clicks
 * are measured in one place. UTM parameters live in each link's destination.
 * Structured data (JSON-LD, JSON Resume, LaTeX/PDF, llms.txt) keeps the
 * canonical URLs instead.
 */
export const shortLinks = {
  linkedin: 'https://links.gonzalorios.cl/linkedin',
  github: 'https://links.gonzalorios.cl/github',
  elevenlabs: 'https://links.gonzalorios.cl/elevenlabs',
  rebrandly: 'https://links.gonzalorios.cl/rebrandly',
  sitehost: 'https://links.gonzalorios.cl/sitehost',
  silverhost: 'https://links.gonzalorios.cl/silverhost',
} as const;

export const voiceProvider = { name: 'ElevenLabs', url: shortLinks.elevenlabs };

/** Companies linked from the CV. `url` is canonical (structured data); visitors get the short link via orgUrl(). */
export type OrgId = 'rebrandly' | 'sitehost' | 'silverhost';
export const orgs: Record<OrgId, { name: string; url: string; domain: string }> = {
  rebrandly: { name: 'Rebrandly', url: 'https://www.rebrandly.com/', domain: 'rebrandly.com' },
  sitehost: { name: 'SiteHost', url: 'https://sitehost.nz/', domain: 'sitehost.nz' },
  silverhost: { name: 'Silverhost', url: 'https://www.silverhost.cl/', domain: 'silverhost.cl' },
};

/** Outbound link for a company: its branded short link (UTMs are set in Rebrandly). */
export function orgUrl(id: OrgId): string {
  return shortLinks[id];
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
  { symbol: 'Br', name: 'AWS Bedrock', family: 'ai' },
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
  { symbol: 'Ot', name: 'OpenTelemetry', family: 'data' },
];

export type ProjectVisual = 'platform' | 'pipeline' | 'ingest' | 'containers' | 'terraform' | 'hosting';

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
  /** Stable id, shared by both locales; links the item to its CV details in resume.ts. */
  id: string;
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
  /** Theme button. `button` is the accessible name: {current} and {next} are option names. */
  theme: { button: string; changed: string; system: string; light: string; dark: string };
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
    aka: string;
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
    copyFailed: string;
    newTab: string;
    linkedin: string;
    location: string;
  };
  cv: {
    title: string;
    lead: string;
    pdf: string;
    /** Footer and Markdown link label. */
    pdfLink: string;
    pages: string;
    alsoAs: string;
    json: string;
    latex: string;
    summary: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    languages: string;
    certifications: string;
    present: string;
    languageList: { language: string; fluency: string }[];
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
  notFound: {
    eyebrow: string;
    title: string;
    body: string;
    back: string;
    /** `{s}` is replaced with the seconds left. */
    countdown: string;
    stay: string;
    stayed: string;
  };
}

const en: Copy = {
  meta: {
    title: 'Gonzalo Ríos — Director of AI Platform',
    ogTagline: 'I lead platform and AI engineering: boring infrastructure, and engineers made faster with AI.',
    ogImageAlt: 'Flat illustrated avatar of Gonzalo wearing a Rebrandly t-shirt. gonzalorios.cl, Barcelona.',
    description:
      'Director of AI Platform at Rebrandly. I lead platform and AI engineering: AI-native development, data, observability and compliance, backed by 15 years in infrastructure.',
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
  theme: {
    button: 'Theme: {current}. Switch to {next}',
    changed: 'Theme: {current}',
    system: 'system',
    light: 'light',
    dark: 'dark',
  },
  hero: {
    eyebrow: 'Gonzalo Ríos · aka Gonzalito',
    titleLines: ['Director of', 'AI Platform.'],
    lead: "I lead platform and AI engineering at Rebrandly: keeping infrastructure boring and making engineers faster with AI. I've been keeping servers alive for fifteen years.",
    ctaWork: 'Explore my work',
    ctaTalk: "Let's talk",
    listen: 'Hear my intro',
    scroll: 'Scroll to explore',
  },
  about: {
    eyebrow: 'About',
    title: "Hi, I'm",
    accent: 'Gonzalo.',
    aka: 'aka Gonzalito',
    body: [
      'Director of AI Platform at Rebrandly (now Radiate, after merging with IntelligenceBank). I lead the Platform & AI team, which owns infrastructure, the data platform, observability, compliance and AI adoption across the company. Every one of our engineers now builds with AI coding agents, with the context, permissions, review and CI/CD gates that let code written with AI reach production as safely as any other.',
      'I got here through fifteen years of DevOps and SRE: co-founding a hosting company in Chile, running more than 15,000 containers in New Zealand, and growing at Rebrandly from DevOps Engineer to Lead DevOps to Director. AWS, Kubernetes and Terraform are still my daily tools, and I write Go and Python to automate everything that should not need a human.',
    ],
    factsTitle: 'Quick facts',
    facts: [
      { label: 'Based in', value: 'Barcelona, Spain' },
      { label: 'Role', value: 'Director of AI Platform · Rebrandly' },
      { label: 'Focus', value: 'AI-native engineering · Platform · Data' },
      { label: 'In production since', value: '2011' },
      { label: 'Worked from', value: 'Chile · New Zealand · Spain' },
      { label: 'My team', value: '4 engineers · Spain · Italy · Pakistan' },
      { label: 'Engineering at Rebrandly', value: 'USA · Canada · Spain · Italy · Ireland · Ukraine · Pakistan' },
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
        { title: 'AI platform leader', detail: 'Claude Code · MCP · Bedrock' },
        { title: 'Team lead', detail: 'Platform & AI · SOC 2 · HIPAA' },
        { title: 'Platform engineer', detail: 'AWS · Kubernetes · OpenTofu' },
        { title: 'Builder', detail: 'Go services, billions of events' },
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
      data: 'Data & observability',
      ai: 'AI',
    },
    hint: 'Select any element to see how I use it.',
    asList: 'View all skills as a list',
  },
  elementNotes: {
    Go: 'My go-to for high-throughput services: a Kafka to ClickHouse pipeline with billions of events a month, and an API that writes hundreds of thousands of records in under a second.',
    Py: 'Automation, tooling and glue between systems.',
    Ph: 'Years of backend work with Symfony and Silex, plus the hosting world it powers.',
    Sh: 'The duct tape of every server I have ever touched.',
    Gq: 'Exposing services to product teams with typed contracts.',
    Rp: 'Fast service-to-service communication.',
    Aw: 'My main cloud: ECS, Lambda, Bedrock, DynamoDB and the networking around them.',
    Ec: 'Migrated legacy services to ECS with auto-scaling and deployment circuit breakers.',
    La: 'Event-driven services, which I moved from the Serverless Framework to OpenTofu.',
    Do: 'Part of the hybrid infrastructure behind Silverhost.',
    Wf: 'Rolled out a web application firewall to stop bad traffic early.',
    Li: 'Administering Linux servers since 2011.',
    Dk: 'Ran a custom Docker cloud with more than 15,000 containers.',
    K8: 'Orchestrating containers when the scale calls for it.',
    Xn: 'Managed Xen virtualization for a hosting provider.',
    Ng: 'Web serving and reverse proxying, everywhere.',
    Tf: 'Infrastructure as code, today with OpenTofu too, and co-author of a Terraform provider v1.0.',
    An: 'Configuration management for fleets of servers.',
    Gh: 'Home of our ~400 repositories since I led the move from GitLab, and the CI/CD gates every change passes, whether a person or an agent wrote it.',
    Gl: 'Pipelines I tuned to halve deployment times, from 20–30 to 10–15 minutes.',
    Ch: 'I chose and deployed it at Rebrandly. Conversion lookups on a 2-billion-row table now run 230× faster.',
    Kf: 'The stream behind billions of click events a month, consumed by Go services into ClickHouse.',
    Dy: 'Single-digit-millisecond storage for high-volume APIs.',
    Ot: 'One central collector and in-house SDKs for Node.js, Python, Go and .NET, sending everything to Coralogix.',
    Cl: 'Every one of our engineers builds with Claude Code. I drove our internal plugin marketplace: 7 plugins, ~40 skills, subagents and hooks.',
    Mc: 'I prototyped Rebrandly’s MCP server in Go, and it grew into our customer-facing connector.',
    Ag: 'AI agents in production, from coding agents that open real pull requests to an on-call assistant that triages alerts.',
    Br: 'Where our production LLM calls run, with guardrails.',
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
          'AI-native engineering at Rebrandly: every engineer builds with AI coding agents, on an internal Claude Code plugin marketplace and internal MCP servers.',
        points: ['100% of engineers build with AI agents', '7 auto-installed plugins, ~40 skills, subagents and hooks', 'Draft-first pull requests up from 7% to 93%'],
        tags: ['Claude Code', 'MCP', 'AWS Bedrock', 'GitHub Actions', 'Go'],
      },
      {
        id: 'click-pipeline',
        visual: 'pipeline',
        kicker: 'Rebrandly · Data platform',
        orgId: 'rebrandly',
        title: 'Click data pipeline',
        summary:
          'A Go pipeline that streams billions of click events a month from Kafka into ClickHouse, with 11.4 billion historical clicks backfilled at zero drift.',
        points: ['Billions of events a month', '11.4B clicks backfilled, zero drift', 'Lookups from 106 s to 0.46 s'],
        tags: ['Go', 'Kafka', 'ClickHouse', 'AWS'],
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
        id: 'valle-central',
        year: '2011',
        period: 'Oct 2011 – Jul 2012',
        kind: 'Experience',
        role: 'System Engineer',
        org: 'Instituto Profesional Valle Central',
        place: 'Santiago, Chile',
        text: 'Installed and ran web, database, DNS, firewall and VoIP services for a national education institute.',
      },
      {
        id: 'ucinf',
        year: '2011',
        period: '2011 – 2013',
        kind: 'Education',
        role: 'Ingeniero de Ejecución en Informática',
        org: 'Universidad de Ciencias de la Informática',
        place: 'Santiago, Chile',
        text: 'Systems engineering degree, studied while running production systems.',
      },
      {
        id: 'silverhost',
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
        id: 'agencia-blue',
        year: '2012',
        period: 'Jul 2012 – Feb 2014',
        kind: 'Experience',
        role: 'Backend Engineer',
        org: 'Agencia Blue',
        place: 'Providencia, Chile',
        text: 'Mentored the team, moved the agency into custom development with Symfony and brought DevOps into delivery.',
      },
      {
        id: 'sitehost',
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
        id: 'rebrandly-devops',
        year: '2023',
        period: 'Jun 2023 – Apr 2024',
        kind: 'Experience',
        role: 'DevOps Engineer',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remote · HQ in Dublin, Ireland',
        text: 'Halved deployment times, introduced auto-scaling and migrated legacy services to Amazon ECS.',
      },
      {
        id: 'rebrandly-lead',
        year: '2024',
        period: 'Apr 2024 – Oct 2025',
        kind: 'Experience',
        role: 'Lead DevOps Engineer',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remote · HQ in Dublin, Ireland',
        text: 'Led DevOps for production on AWS: owned the 2025 SOC 2 recertification, brought in ClickHouse and built a sub-second bulk ingest API in Go.',
      },
      {
        id: 'rebrandly-director',
        year: '2025',
        period: 'Oct 2025 – present',
        kind: 'Experience',
        role: 'Director of AI Platform',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remote from Barcelona · HQ in Dublin',
        text: 'Leading the Platform & AI team (4 engineers in Spain, Italy and Pakistan): infrastructure, data, observability, compliance and AI adoption. 100% of engineering now builds with AI coding agents.',
      },
    ],
  },
  achievements: {
    eyebrow: 'Achievements',
    title: 'Proud',
    accent: 'moments.',
    stats: [
      { value: 100, suffix: '%', label: 'of engineers on AI agents', context: 'Everyone in Rebrandly engineering builds with AI coding agents.' },
      { value: 230, suffix: '×', label: 'faster lookups', context: 'Conversion lookups on a 2-billion-row ClickHouse table.' },
      { value: 400, prefix: '~', label: 'repositories migrated', context: 'From GitLab to GitHub, with a migration CLI I built.' },
      { value: 15000, suffix: '+', label: 'containers', context: 'Run on a custom Docker cloud at SiteHost.' },
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
      { title: 'Current focus: AI-native engineering', detail: 'Claude Code, MCP, AI agents and spec-driven development' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's ship AI-written code,",
    accent: 'safely.',
    body: 'Open to conversations about AI-native engineering, AI agents in production, and platform and DevOps leadership.',
    email: 'Write me an email',
    copy: 'Copy email address',
    copied: 'Email address copied',
    copyFailed: 'Could not copy. Use the email link above.',
    newTab: 'opens in a new tab',
    linkedin: 'LinkedIn',
    location: 'Barcelona · Central European Time',
  },
  cv: {
    title: 'Take the CV with you',
    lead: 'The same CV as this page, in the format you need.',
    pdf: 'Download PDF',
    pdfLink: 'Download CV (PDF)',
    pages: 'pages',
    alsoAs: 'Also as',
    json: 'JSON Resume',
    latex: 'LaTeX source',
    summary: 'Summary',
    experience: 'Experience',
    projects: 'Selected projects',
    skills: 'Skills',
    education: 'Education',
    languages: 'Languages',
    certifications: 'Certifications',
    present: 'Present',
    languageList: [
      { language: 'Spanish', fluency: 'Native' },
      { language: 'English', fluency: 'Professional working proficiency' },
    ],
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
    eyebrow: 'Error 404',
    title: 'This page shipped without a code review.',
    body: 'It does not exist, or it moved and forgot to tell anyone. Not even my AI agents could find it, and they looked everywhere. Twice.',
    back: 'Take me home now',
    countdown: 'Rolling you back to the home page in {s} seconds.',
    stay: 'Stay here',
    stayed: 'Rollback cancelled. Enjoy the void.',
  },
};

const es: Copy = {
  meta: {
    title: 'Gonzalo Ríos — Director de Plataforma de IA',
    ogTagline: 'Lidero ingeniería de plataforma e IA: infraestructura aburrida e ingenieros más rápidos gracias a la IA.',
    ogImageAlt: 'Avatar ilustrado en estilo plano de Gonzalo con una polera de Rebrandly. gonzalorios.cl, Barcelona.',
    description:
      'Director de Plataforma de IA en Rebrandly. Lidero ingeniería de plataforma e IA: desarrollo AI-native, datos, observabilidad y cumplimiento normativo. 15 años en infraestructura.',
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
  theme: {
    button: 'Tema: {current}. Cambiar a {next}',
    changed: 'Tema: {current}',
    system: 'sistema',
    light: 'claro',
    dark: 'oscuro',
  },
  hero: {
    eyebrow: 'Gonzalo Ríos · aka Gonzalito',
    titleLines: ['Director de', 'Plataforma IA.'],
    lead: 'Lidero ingeniería de plataforma e IA en Rebrandly: que la infraestructura sea aburrida y que los ingenieros sean más rápidos gracias a la IA. Llevo quince años manteniendo servidores con vida.',
    ctaWork: 'Ver mi trabajo',
    ctaTalk: 'Hablemos',
    listen: 'Escucha mi intro',
    scroll: 'Desliza para explorar',
  },
  about: {
    eyebrow: 'Sobre mí',
    title: 'Hola, soy',
    accent: 'Gonzalo.',
    aka: 'aka Gonzalito',
    body: [
      'Director de Plataforma de IA en Rebrandly (ahora Radiate, tras su fusión con IntelligenceBank). Lidero el equipo de Plataforma e IA, responsable de la infraestructura, la plataforma de datos, la observabilidad, el cumplimiento normativo y la adopción de IA en toda la empresa. Hoy todos nuestros ingenieros desarrollan con agentes de IA, con el contexto, los permisos, la revisión y los gates de CI/CD que permiten que el código creado con IA llegue a producción tan seguro como cualquier otro.',
      'Llegué aquí tras quince años de DevOps y SRE: cofundé una empresa de hosting en Chile, operé más de 15.000 contenedores en Nueva Zelanda y en Rebrandly pasé de DevOps Engineer a Lead DevOps y a Director. AWS, Kubernetes y Terraform siguen siendo mis herramientas diarias, y escribo Go y Python para automatizar todo lo que no debería necesitar a una persona.',
    ],
    factsTitle: 'En corto',
    facts: [
      { label: 'Vivo en', value: 'Barcelona, España' },
      { label: 'Rol', value: 'Director de Plataforma de IA · Rebrandly' },
      { label: 'Foco', value: 'Ingeniería AI-native · Plataforma · Datos' },
      { label: 'En producción desde', value: '2011' },
      { label: 'He trabajado desde', value: 'Chile · Nueva Zelanda · España' },
      { label: 'Mi equipo', value: '4 ingenieros · España · Italia · Pakistán' },
      { label: 'Ingeniería en Rebrandly', value: 'EE. UU. · Canadá · España · Italia · Irlanda · Ucrania · Pakistán' },
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
        { title: 'Líder de plataforma IA', detail: 'Claude Code · MCP · Bedrock' },
        { title: 'Líder de equipo', detail: 'Plataforma e IA · SOC 2 · HIPAA' },
        { title: 'Ingeniero de plataforma', detail: 'AWS · Kubernetes · OpenTofu' },
        { title: 'Constructor', detail: 'Servicios en Go, miles de millones de eventos' },
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
      data: 'Datos y observabilidad',
      ai: 'IA',
    },
    hint: 'Selecciona cualquier elemento para ver cómo lo uso.',
    asList: 'Ver todas las skills como lista',
  },
  elementNotes: {
    Go: 'Mi opción para servicios de alto rendimiento: un pipeline de Kafka a ClickHouse con miles de millones de eventos al mes y una API que escribe cientos de miles de registros en menos de un segundo.',
    Py: 'Automatización, herramientas y pegamento entre sistemas.',
    Ph: 'Años de backend con Symfony y Silex, más el mundo del hosting que mueve.',
    Sh: 'La cinta adhesiva de cada servidor que he tocado.',
    Gq: 'Exponer servicios a los equipos de producto con contratos tipados.',
    Rp: 'Comunicación rápida entre servicios.',
    Aw: 'Mi cloud principal: ECS, Lambda, Bedrock, DynamoDB y las redes que los conectan.',
    Ec: 'Migré servicios legacy a ECS con auto-scaling y circuit breakers en los despliegues.',
    La: 'Servicios orientados a eventos, que pasé del Serverless Framework a OpenTofu.',
    Do: 'Parte de la infraestructura híbrida de Silverhost.',
    Wf: 'Implementé un firewall de aplicaciones web para frenar el tráfico malicioso a tiempo.',
    Li: 'Administrando servidores Linux desde 2011.',
    Dk: 'Operé un cloud propio en Docker con más de 15.000 contenedores.',
    K8: 'Orquestando contenedores cuando la escala lo pide.',
    Xn: 'Gestioné virtualización Xen para un proveedor de hosting.',
    Ng: 'Servidor web y proxy inverso, en todas partes.',
    Tf: 'Infraestructura como código, hoy también con OpenTofu, y coautor de un proveedor de Terraform v1.0.',
    An: 'Gestión de configuración para flotas de servidores.',
    Gh: 'Donde viven nuestros ~400 repositorios desde que lideré la migración desde GitLab, y los gates de CI/CD que pasa cada cambio, lo haya escrito una persona o un agente.',
    Gl: 'Pipelines que optimicé para reducir a la mitad los despliegues, de 20–30 a 10–15 minutos.',
    Ch: 'Lo elegí e implanté en Rebrandly. Las búsquedas de conversiones sobre una tabla de 2.000 millones de filas ahora son 230 veces más rápidas.',
    Kf: 'El stream detrás de miles de millones de clics al mes, que servicios en Go llevan a ClickHouse.',
    Dy: 'Almacenamiento con latencia de milisegundos para APIs de alto volumen.',
    Ot: 'Un collector central y SDK propios para Node.js, Python, Go y .NET, que envían todo a Coralogix.',
    Cl: 'Todos nuestros ingenieros desarrollan con Claude Code. Impulsé nuestro marketplace interno de plugins: 7 plugins, ~40 skills, subagentes y hooks.',
    Mc: 'Prototipé el servidor MCP de Rebrandly en Go, que evolucionó hasta ser nuestro conector para clientes.',
    Ag: 'Agentes de IA en producción, desde agentes de código que abren pull requests reales hasta un asistente de guardia que clasifica alertas.',
    Br: 'Donde corren nuestras llamadas a LLM en producción, con guardrails.',
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
          'Ingeniería AI-native en Rebrandly: todos los ingenieros desarrollan con agentes de IA, sobre un marketplace interno de plugins de Claude Code y servidores MCP internos.',
        points: ['El 100% de los ingenieros desarrolla con agentes de IA', '7 plugins instalados automáticamente, ~40 skills, subagentes y hooks', 'Pull requests en borrador primero: del 7% al 93%'],
        tags: ['Claude Code', 'MCP', 'AWS Bedrock', 'GitHub Actions', 'Go'],
      },
      {
        id: 'click-pipeline',
        visual: 'pipeline',
        kicker: 'Rebrandly · Plataforma de datos',
        orgId: 'rebrandly',
        title: 'Pipeline de clics',
        summary:
          'Un pipeline en Go que lleva miles de millones de clics al mes de Kafka a ClickHouse, con 11.400 millones de clics históricos recuperados sin diferencias.',
        points: ['Miles de millones de eventos al mes', '11.400 millones de clics recuperados, sin diferencias', 'Búsquedas de 106 s a 0,46 s'],
        tags: ['Go', 'Kafka', 'ClickHouse', 'AWS'],
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
        id: 'valle-central',
        year: '2011',
        period: 'oct. 2011 – jul. 2012',
        kind: 'Experiencia',
        role: 'Ingeniero de Sistemas',
        org: 'Instituto Profesional Valle Central',
        place: 'Santiago, Chile',
        text: 'Instalé y operé servicios web, de bases de datos, DNS, firewall y VoIP para un instituto educativo nacional.',
      },
      {
        id: 'ucinf',
        year: '2011',
        period: '2011 – 2013',
        kind: 'Educación',
        role: 'Ingeniero de Ejecución en Informática',
        org: 'Universidad de Ciencias de la Informática',
        place: 'Santiago, Chile',
        text: 'Ingeniería en sistemas, estudiada mientras operaba sistemas en producción.',
      },
      {
        id: 'silverhost',
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
        id: 'agencia-blue',
        year: '2012',
        period: 'jul. 2012 – feb. 2014',
        kind: 'Experiencia',
        role: 'Backend Engineer',
        org: 'Agencia Blue',
        place: 'Providencia, Chile',
        text: 'Formé al equipo, llevé a la agencia al desarrollo a medida con Symfony e incorporé DevOps a la entrega.',
      },
      {
        id: 'sitehost',
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
        id: 'rebrandly-devops',
        year: '2023',
        period: 'jun. 2023 – abr. 2024',
        kind: 'Experiencia',
        role: 'DevOps Engineer',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remoto · sede en Dublín, Irlanda',
        text: 'Reduje a la mitad los tiempos de despliegue, introduje auto-scaling y migré servicios legacy a Amazon ECS.',
      },
      {
        id: 'rebrandly-lead',
        year: '2024',
        period: 'abr. 2024 – oct. 2025',
        kind: 'Experiencia',
        role: 'Lead DevOps Engineer',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remoto · sede en Dublín, Irlanda',
        text: 'Lideré DevOps de la infraestructura de producción en AWS: fui responsable de la recertificación SOC 2 de 2025, implanté ClickHouse y construí una API de ingesta masiva en Go que responde en menos de un segundo.',
      },
      {
        id: 'rebrandly-director',
        year: '2025',
        period: 'oct. 2025 – hoy',
        kind: 'Experiencia',
        role: 'Director de Plataforma de IA',
        org: 'Rebrandly',
        orgId: 'rebrandly',
        place: 'Remoto desde Barcelona · sede en Dublín',
        text: 'Lidero el equipo de Plataforma e IA (4 ingenieros en España, Italia y Pakistán): infraestructura, datos, observabilidad, cumplimiento normativo y adopción de IA. El 100% de ingeniería ya desarrolla con agentes de IA.',
      },
    ],
  },
  achievements: {
    eyebrow: 'Logros',
    title: 'Momentos de',
    accent: 'orgullo.',
    stats: [
      { value: 100, suffix: '%', label: 'de ingenieros con agentes de IA', context: 'Todo el equipo de ingeniería de Rebrandly desarrolla con agentes de IA.' },
      { value: 230, suffix: '×', label: 'búsquedas más rápidas', context: 'Conversiones sobre una tabla de ClickHouse de 2.000 millones de filas.' },
      { value: 400, prefix: '~', label: 'repositorios migrados', context: 'De GitLab a GitHub, con una herramienta de migración propia.' },
      { value: 15000, suffix: '+', label: 'contenedores', context: 'En un cloud propio sobre Docker en SiteHost.' },
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
      { title: 'Foco actual: ingeniería AI-native', detail: 'Claude Code, MCP, agentes de IA y desarrollo guiado por especificaciones' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Despleguemos código con IA',
    accent: 'de forma segura.',
    body: 'Abierto a conversar sobre ingeniería AI-native, agentes de IA en producción y liderazgo de plataforma y DevOps.',
    email: 'Escríbeme un email',
    copy: 'Copiar dirección de email',
    copied: 'Dirección de email copiada',
    copyFailed: 'No se pudo copiar. Usa el enlace del email.',
    newTab: 'se abre en una pestaña nueva',
    linkedin: 'LinkedIn',
    location: 'Barcelona · Hora de Europa Central',
  },
  cv: {
    title: 'Llévate el CV',
    lead: 'El mismo CV de esta página, en el formato que necesites.',
    pdf: 'Descargar PDF',
    pdfLink: 'Descargar CV (PDF)',
    pages: 'páginas',
    alsoAs: 'También en',
    json: 'JSON Resume',
    latex: 'Fuente LaTeX',
    summary: 'Resumen',
    experience: 'Experiencia',
    projects: 'Proyectos destacados',
    skills: 'Skills',
    education: 'Educación',
    languages: 'Idiomas',
    certifications: 'Certificaciones',
    present: 'Actualidad',
    languageList: [
      { language: 'Español', fluency: 'Nativo' },
      { language: 'Inglés', fluency: 'Profesional' },
    ],
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
    eyebrow: 'Error 404',
    title: 'Esta página salió a producción sin code review.',
    body: 'No existe, o se movió y no le avisó a nadie. Ni mis agentes de IA la encontraron, y buscaron en todas partes. Dos veces.',
    back: 'Llévame al inicio',
    countdown: 'Haciendo rollback a la página de inicio en {s} segundos.',
    stay: 'Quedarme aquí',
    stayed: 'Rollback cancelado. Disfruta el vacío.',
  },
};

export const copy: Record<Locale, Copy> = { en, es };

/** Path of the home page for a locale. English lives at the root. */
export const homePath = (locale: Locale) => (locale === 'en' ? '/' : '/es/');
export const markdownPath = (locale: Locale) => (locale === 'en' ? '/index.md' : '/es/index.md');
export const htmlLang: Record<Locale, string> = { en: 'en', es: 'es' };
export const ogLocale: Record<Locale, string> = { en: 'en_US', es: 'es_ES' };
