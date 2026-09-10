import { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'srv-1',
    title: 'Full-Stack Architecture & Development',
    iconName: 'Layers',
    summary: 'End-to-end web applications engineered from scratch with clean TypeScript MERN stack, robust database schemas, and intuitive modern interfaces.',
    deliverables: [
      'Production-ready Next.js / React frontend with Tailwind CSS',
      'Modular Node.js / Express backend with layered service architecture',
      'Optimized MongoDB / PostgreSQL database schema with automated indexes',
      'Docker containerization and environment configuration'
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Docker'],
    typicalTimeline: '3 — 6 Weeks'
  },
  {
    id: 'srv-2',
    title: 'E-Commerce Platforms & Payment Integrations',
    iconName: 'ShoppingBag',
    summary: 'High-converting, resilient digital storefronts equipped with distributed inventory reservation, Stripe checkout idempotency, and automated invoicing.',
    deliverables: [
      'High-speed product catalog with faceted search & instant filtering',
      'Idempotent Stripe / payment gateway integration with replay protection',
      'Redis-backed inventory locking to prevent flash-sale overselling',
      'Customer order management portal with real-time tracking'
    ],
    techStack: ['Next.js 15', 'Stripe API', 'Redis 7', 'MongoDB', 'BullMQ'],
    typicalTimeline: '4 — 8 Weeks'
  },
  {
    id: 'srv-3',
    title: 'Admin Dashboards & Internal Tooling',
    iconName: 'LayoutDashboard',
    summary: 'Data-dense operational command centers featuring granular role-based access control (RBAC), virtualized tables, and live WebSocket telemetry.',
    deliverables: [
      'Granular permission matrix (SuperAdmin, Staff, Auditor roles)',
      'Virtualized data grids rendering 50k+ rows with smooth 60fps scrolling',
      'Audit log streams with immutable mutation records',
      'CSV / Excel bulk streaming export engine with zero memory leaks'
    ],
    techStack: ['React 19', 'TanStack Table', 'Socket.io', 'Mongoose', 'JWT'],
    typicalTimeline: '3 — 5 Weeks'
  },
  {
    id: 'srv-4',
    title: 'REST API Design & Microservices',
    iconName: 'Cpu',
    summary: 'Contract-first RESTful APIs with strict Zod validation, sliding-window rate limiting, centralized error handling, and comprehensive documentation.',
    deliverables: [
      'Clean OpenAPI / Swagger specification documentation',
      'Stateless dual JWT authentication with refresh token rotation',
      'Redis cache-aside layer cutting database read pressure by up to 80%',
      'Automated Postman test collections with integration assertions'
    ],
    techStack: ['Node.js', 'Express', 'Redis', 'Zod', 'Postman', 'Docker'],
    typicalTimeline: '2 — 4 Weeks'
  },
  {
    id: 'srv-5',
    title: 'React & Next.js Performance Optimization',
    iconName: 'Zap',
    summary: 'Deep diagnostic audit and code overhaul to transform sluggish applications into lightning-fast, high-converting digital products.',
    deliverables: [
      'Bundle size reduction and code-splitting implementation',
      'Elimination of excessive React re-renders with memoization and state decoupling',
      'Database query optimization with MongoDB explain-plan analysis',
      'Core Web Vitals scores brought into 90+ green zone'
    ],
    techStack: ['Next.js', 'Chrome DevTools', 'Bundle Analyzer', 'Redis'],
    typicalTimeline: '1 — 2 Weeks'
  },
  {
    id: 'srv-6',
    title: 'SEO-Friendly Web Architecture',
    iconName: 'Globe',
    summary: 'Technical search engine optimization ensuring maximum crawlability, high domain authority indexing, and lightning-fast social previews.',
    deliverables: [
      'Dynamic JSON-LD structured schema markup (Person, Product, Article, Organization)',
      'Server-side rendering (SSR) and Incremental Static Regeneration (ISR)',
      'Automated dynamic Open Graph image generation and Twitter cards',
      'Self-updating XML sitemaps and optimized robots.txt rules'
    ],
    techStack: ['Next.js App Router', 'Schema.org', 'Open Graph', 'Lighthouse'],
    typicalTimeline: '1 — 2 Weeks'
  }
];
