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

export type SectionId = 'about' | 'skills' | 'work' | 'experience' | 'achievements' | 'contact';
export const sectionIds: SectionId[] = ['about', 'skills', 'work', 'experience', 'achievements', 'contact'];

export type FamilyId = 'languages' | 'cloud' | 'containers' | 'automation' | 'data' | 'ai';
export const familyIds: FamilyId[] = ['languages', 'cloud', 'containers', 'automation', 'data', 'ai'];

/** Periodic-table elements. Notes are localized below in `elementNotes`. */
export const elements: { symbol: string; name: string; family: FamilyId }[] = [
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
  { symbol: 'Cl', name: 'Claude', family: 'ai' },
  { symbol: 'Mc', name: 'MCP', family: 'ai' },
  { symbol: 'Ag', name: 'AI agents', family: 'ai' },
  { symbol: 'Ev', name: 'LLM evals', family: 'ai' },
];

export type ProjectVisual = 'platform' | 'ingest' | 'containers' | 'terraform' | 'hosting';

export interface Project {
  id: string;
  visual: ProjectVisual;
  kicker: string;
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
  meta: { title: string; description: string };
  skipLink: string;
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
  footer: { rights: string; markdown: string; built: string; top: string };
  voice: {
    player: string;
    play: string;
    pause: string;
    stop: string;
    listenSection: string;
    captions: string;
    unavailable: string;
  };
  notFound: { title: string; body: string; back: string };
}

const en: Copy = {
  meta: {
    title: 'Gonzalo Ríos — Director of AI Platform & Lead DevOps Engineer',
    description:
      'Gonzalo Ríos designs, automates and runs cloud infrastructure and AI platforms. Fifteen years across DevOps, SRE and cloud architecture, from Chile to New Zealand to Ireland.',
  },
  skipLink: 'Skip to content',
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
    titleLines: ['AI Platforms', '& DevOps.'],
    lead: 'Director of AI Platform at Rebrandly. Fifteen years designing, automating and running the infrastructure that keeps products online.',
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
      'Lead DevOps engineer turned Director of AI Platform. I design, build and maintain highly scalable, highly available cloud infrastructure, and lately the platform that lets teams ship AI safely.',
      'I work daily with Docker, Kubernetes, Terraform, Ansible and AWS, and I write Go, Python, PHP and Bash to automate everything that should not need a human.',
    ],
    factsTitle: 'Quick facts',
    facts: [
      { label: 'Based in', value: 'Barcelona, Spain' },
      { label: 'Role', value: 'Director of AI Platform · Rebrandly' },
      { label: 'In production since', value: '2011' },
      { label: 'Worked from', value: 'Chile · New Zealand · Ireland · Spain' },
      { label: 'Languages', value: 'Spanish (native) · English (professional)' },
    ],
    quote: 'From bare-metal servers to AI platforms.',
    badge: {
      front: 'Engineer ID',
      sub: 'Portfolio · 2026',
      role: 'AI Platform · DevOps',
      fields: [
        { label: 'ID no.', value: 'GR-2011' },
        { label: 'Dept.', value: 'Platform' },
        { label: 'Uptime', value: '99.99%' },
      ],
      backTitle: 'What I am',
      back: [
        { title: 'Platform leader', detail: 'Director of AI Platform' },
        { title: 'DevOps engineer', detail: 'Docker · Kubernetes · Terraform' },
        { title: 'Builder', detail: 'Go APIs at enterprise scale' },
        { title: 'Founder', detail: 'Silverhost, ten years' },
        { title: 'Lifelong learner', detail: 'AI agents, evals, MCP' },
      ],
      flip: 'Flip the badge',
      flipBack: 'Flip the badge back',
    },
  },
  statement:
    'I make infrastructure boring: fast, secure and always on, so the people building the product never have to think about it.',
  skills: {
    eyebrow: 'Skills',
    title: 'The periodic table of',
    accent: 'my stack.',
    intro: 'Twenty-eight elements in six families. Pick a family to light it up, or select a tile to read about it.',
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
    Gh: 'CI/CD pipelines that turn merges into deploys.',
    Gl: 'Pipelines that cut deployment times dramatically.',
    Ch: 'Analytics at scale. One of my top skills.',
    Kf: 'Streaming events between services. One of my top skills.',
    Dy: 'Single-digit-millisecond storage for high-volume APIs.',
    My: 'The relational workhorse behind countless sites.',
    Cl: 'Building with Anthropic Claude. One of my top skills.',
    Mc: 'Connecting models to tools and internal data.',
    Ag: 'Designing agent workflows that do real work.',
    Ev: 'Measuring AI quality before it reaches users.',
  },
  work: {
    eyebrow: 'Work',
    title: "Things I've",
    accent: 'built.',
    intro: 'Five systems from fifteen years in production. Open a panel to see more.',
    open: 'Show project',
    projects: [
      {
        id: 'ai-platform',
        visual: 'platform',
        kicker: 'Rebrandly · 2025 – present',
        title: 'AI Platform',
        summary:
          'The platform that lets every team at Rebrandly ship AI features safely: models, agents, evaluations and guardrails behind one paved road.',
        points: ['Shared agent tooling', 'Evaluation before release', 'Cost and usage visibility'],
        tags: ['Claude', 'MCP', 'AWS', 'Go', 'Python'],
      },
      {
        id: 'bulk-ingest',
        visual: 'ingest',
        kicker: 'Rebrandly · Lead DevOps',
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
    intro: 'From a school data center in Santiago to platform leadership in Europe.',
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
        place: 'Auckland, New Zealand',
        text: 'Kept a 15,000-container cloud healthy, rolled out a WAF and helped ship the Terraform provider v1.0.',
      },
      {
        year: '2023',
        period: 'Jun 2023 – Apr 2024',
        kind: 'Experience',
        role: 'DevOps Engineer',
        org: 'Rebrandly',
        place: 'Dublin, Ireland',
        text: 'Sped up CI pipelines, introduced auto-scaling and migrated legacy services to Amazon ECS.',
      },
      {
        year: '2024',
        period: 'Apr 2024 – Oct 2025',
        kind: 'Experience',
        role: 'Lead DevOps Engineer',
        org: 'Rebrandly',
        place: 'Dublin, Ireland',
        text: 'Led the team behind critical infrastructure, standardised our processes and built a sub-second bulk ingest API in Go.',
      },
      {
        year: '2025',
        period: 'Oct 2025 – present',
        kind: 'Experience',
        role: 'Director of AI Platform',
        org: 'Rebrandly',
        place: 'Barcelona, Spain',
        text: 'Leading the platform that brings AI into every team, safely and at scale.',
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
      { title: 'English, professional working proficiency', detail: 'Ten years working in English across three countries' },
      { title: 'Now learning: AI agents and evals', detail: 'Claude, MCP and evaluation-driven development' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's build something",
    accent: 'reliable.',
    body: 'Open to conversations about platform engineering, AI infrastructure and DevOps leadership.',
    email: 'Write me an email',
    copy: 'Copy email address',
    copied: 'Email address copied',
    linkedin: 'LinkedIn',
    location: 'Barcelona · Central European Time',
  },
  footer: {
    rights: 'Gonzalo Ríos',
    markdown: 'Read this page as Markdown',
    built: 'Built with Astro. No trackers.',
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
  },
  notFound: {
    title: 'This page took the day off.',
    body: 'The address you followed does not exist, or it moved.',
    back: 'Go to the home page',
  },
};

const es: Copy = {
  meta: {
    title: 'Gonzalo Ríos — Director de Plataforma de IA y Lead DevOps Engineer',
    description:
      'Gonzalo Ríos diseña, automatiza y opera infraestructura cloud y plataformas de IA. Quince años en DevOps, SRE y arquitectura cloud, de Chile a Nueva Zelanda e Irlanda.',
  },
  skipLink: 'Saltar al contenido',
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
    titleLines: ['Plataformas IA', 'y DevOps.'],
    lead: 'Director de Plataforma de IA en Rebrandly. Quince años diseñando, automatizando y operando la infraestructura que mantiene los productos en línea.',
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
      'Lead DevOps convertido en Director de Plataforma de IA. Diseño, construyo y mantengo infraestructura cloud altamente escalable y disponible, y últimamente la plataforma que permite a los equipos llevar IA a producción de forma segura.',
      'Trabajo a diario con Docker, Kubernetes, Terraform, Ansible y AWS, y escribo Go, Python, PHP y Bash para automatizar todo lo que no debería necesitar a una persona.',
    ],
    factsTitle: 'En corto',
    facts: [
      { label: 'Vivo en', value: 'Barcelona, España' },
      { label: 'Rol', value: 'Director de Plataforma de IA · Rebrandly' },
      { label: 'En producción desde', value: '2011' },
      { label: 'He trabajado desde', value: 'Chile · Nueva Zelanda · Irlanda · España' },
      { label: 'Idiomas', value: 'Español (nativo) · Inglés (profesional)' },
    ],
    quote: 'De servidores bare-metal a plataformas de IA.',
    badge: {
      front: 'Credencial',
      sub: 'Portafolio · 2026',
      role: 'Plataforma IA · DevOps',
      fields: [
        { label: 'N.º ID', value: 'GR-2011' },
        { label: 'Área', value: 'Plataforma' },
        { label: 'Uptime', value: '99,99 %' },
      ],
      backTitle: 'Lo que soy',
      back: [
        { title: 'Líder de plataforma', detail: 'Director de Plataforma de IA' },
        { title: 'Ingeniero DevOps', detail: 'Docker · Kubernetes · Terraform' },
        { title: 'Constructor', detail: 'APIs en Go a escala enterprise' },
        { title: 'Fundador', detail: 'Silverhost, diez años' },
        { title: 'Aprendiz constante', detail: 'Agentes de IA, evals, MCP' },
      ],
      flip: 'Voltear la credencial',
      flipBack: 'Volver a voltear la credencial',
    },
  },
  statement:
    'Hago que la infraestructura sea aburrida: rápida, segura y siempre disponible, para que quienes construyen el producto nunca tengan que pensar en ella.',
  skills: {
    eyebrow: 'Skills',
    title: 'La tabla periódica de',
    accent: 'mi stack.',
    intro: 'Veintiocho elementos en seis familias. Elige una familia para iluminarla, o selecciona un elemento para leer sobre él.',
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
    Gh: 'Pipelines de CI/CD que convierten un merge en un deploy.',
    Gl: 'Pipelines que redujeron drásticamente los tiempos de despliegue.',
    Ch: 'Analítica a escala. Una de mis principales skills.',
    Kf: 'Streaming de eventos entre servicios. Una de mis principales skills.',
    Dy: 'Almacenamiento con latencia de milisegundos para APIs de alto volumen.',
    My: 'El caballo de batalla relacional detrás de incontables sitios.',
    Cl: 'Construyendo con Anthropic Claude. Una de mis principales skills.',
    Mc: 'Conectar modelos con herramientas y datos internos.',
    Ag: 'Diseñar flujos de agentes que hacen trabajo real.',
    Ev: 'Medir la calidad de la IA antes de que llegue a los usuarios.',
  },
  work: {
    eyebrow: 'Proyectos',
    title: 'Cosas que he',
    accent: 'construido.',
    intro: 'Cinco sistemas de quince años en producción. Abre un panel para ver más.',
    open: 'Ver proyecto',
    projects: [
      {
        id: 'ai-platform',
        visual: 'platform',
        kicker: 'Rebrandly · 2025 – hoy',
        title: 'Plataforma de IA',
        summary:
          'La plataforma que permite a cada equipo de Rebrandly lanzar funcionalidades de IA de forma segura: modelos, agentes, evaluaciones y guardrails en un solo camino pavimentado.',
        points: ['Herramientas de agentes compartidas', 'Evaluación antes de lanzar', 'Visibilidad de costos y uso'],
        tags: ['Claude', 'MCP', 'AWS', 'Go', 'Python'],
      },
      {
        id: 'bulk-ingest',
        visual: 'ingest',
        kicker: 'Rebrandly · Lead DevOps',
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
    intro: 'Del data center de un instituto en Santiago a liderar plataforma en Europa.',
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
        place: 'Auckland, Nueva Zelanda',
        text: 'Mantuve sano un cloud de 15.000 contenedores, implementé un WAF y ayudé a lanzar el proveedor de Terraform v1.0.',
      },
      {
        year: '2023',
        period: 'jun. 2023 – abr. 2024',
        kind: 'Experiencia',
        role: 'DevOps Engineer',
        org: 'Rebrandly',
        place: 'Dublín, Irlanda',
        text: 'Aceleré los pipelines de CI, introduje auto-scaling y migré servicios legacy a Amazon ECS.',
      },
      {
        year: '2024',
        period: 'abr. 2024 – oct. 2025',
        kind: 'Experiencia',
        role: 'Lead DevOps Engineer',
        org: 'Rebrandly',
        place: 'Dublín, Irlanda',
        text: 'Lideré el equipo de la infraestructura crítica, estandaricé nuestros procesos y construí una API de ingesta masiva en Go que responde en menos de un segundo.',
      },
      {
        year: '2025',
        period: 'oct. 2025 – hoy',
        kind: 'Experiencia',
        role: 'Director de Plataforma de IA',
        org: 'Rebrandly',
        place: 'Barcelona, España',
        text: 'Lidero la plataforma que lleva la IA a cada equipo, de forma segura y a escala.',
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
      { title: 'Inglés, nivel profesional', detail: 'Diez años trabajando en inglés en tres países' },
      { title: 'Aprendiendo ahora: agentes de IA y evals', detail: 'Claude, MCP y desarrollo guiado por evaluaciones' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Construyamos algo',
    accent: 'confiable.',
    body: 'Abierto a conversar sobre ingeniería de plataformas, infraestructura de IA y liderazgo DevOps.',
    email: 'Escríbeme un email',
    copy: 'Copiar dirección de email',
    copied: 'Dirección de email copiada',
    linkedin: 'LinkedIn',
    location: 'Barcelona · Hora de Europa Central',
  },
  footer: {
    rights: 'Gonzalo Ríos',
    markdown: 'Leer esta página en Markdown',
    built: 'Hecho con Astro. Sin trackers.',
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
