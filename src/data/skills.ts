import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Component architecture, state management, render optimizations, and modern reactive UIs',
    skills: [
      {
        name: 'React',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Server Components, concurrent rendering, custom hooks, and reconciliation optimization.',
        tags: ['Hooks', 'Concurrent Mode', 'Custom Hooks', 'React 19']
      },
      {
        name: 'Next.js',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'App Router, dynamic routes, SSG/ISR, Server Actions, and metadata SEO.',
        tags: ['App Router', 'Server Actions', 'SEO']
      },
      {
        name: 'TypeScript',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'Strict typing, generics, utility types, discriminated unions, and Zod schema inference.',
        tags: ['Generics', 'Utility Types', 'Zod', 'Type Safety']
      },
      {
        name: 'JavaScript (ES6+)',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Event loop mechanics, closures, asynchronous streams, Promises, and memory management.',
        tags: ['Async/Await', 'Event Loop', 'Prototypes', 'ES6']
      },
      {
        name: 'Tailwind CSS',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'Design token architecture, fluid responsive layouts, dark mode systems, and custom plugins.',
        tags: ['Tailwind v4', 'Custom Design Systems', 'Dark Mode']
      },
      {
        name: 'HTML5 & CSS3',
        level: 'Advanced',
        experienceYears: "fresher",
        highlight: 'Semantic markup and responsiveness, CSS Grid, Flexbox.',
        tags: ['Semantics', 'CSS Grid', 'Accessibility']
      }
    ]
  },
  {
    id: 'backend',
    name: 'Backend & API Engineering',
    description: 'Scalable server runtimes, RESTful contracts, authentication, and asynchronous task execution',
    skills: [
      {
        name: 'Node.js',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Event loop tuning, stream piping, cluster modules, worker threads, and memory profiling.',
        tags: ['Event Loop', 'Streams', 'Worker Threads', 'Cluster']
      },
      {
        name: 'Express.js',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Modular routing, custom middleware pipelines, centralized error handlers, and security headers.',
        tags: ['Middleware', 'Error Handling', 'Router', 'Security']
      },
      {
        name: 'REST APIs',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'RESTful API versioning, idempotent mutations, status codes, cursor pagination, and OpenAPI.',
        tags: ['Versioning', 'Idempotency', 'Pagination']
      },
      {
        name: 'Authentication & JWT',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Dual-token rotation, HTTP-only cookie delivery, and OAuth2 social integration.',
        tags: ['JWT Rotation', 'OAuth2', 'Bcrypt', 'HTTP-only']
      },
      {
        name: 'BullMQ & Job Queues',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'Decoupled asynchronous background workers, exponential backoff, and dead-letter queues.',
        tags: ['Job Queues', 'BullMQ', 'Workers', 'Retries']
      }
    ]
  },
  {
    id: 'database',
    name: 'Database & Caching',
    description: 'Data modeling, aggregation optimization, distributed caching, and transactional integrity',
    skills: [
      {
        name: 'MongoDB',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Document schema design, compound indexing, aggregation framework pipelines, and sharding.',
        tags: ['Aggregation', 'Compound Indexes', 'Transactions', 'Sharding']
      },
      {
        name: 'Mongoose',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Schema validations, pre/post middleware hooks, virtual populates, and lean query performance.',
        tags: ['Schema Hooks', 'Virtuals', 'Lean Queries']
      },
      {
        name: 'Redis',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'In-memory caching and sliding-window rate limiting.',
        tags: ['Cache Invalidation', 'Rate Limiting']
      },
      {
        name: 'MySQL',
        level: 'Proficient',
        experienceYears: "fresher",
        highlight: 'Relational schema normalization, complex SQL joins, foreign key constraints, and indexing.',
        tags: ['Relational SQL', 'Joins', 'Normalization', 'ACID']
      }
    ]
  },
  {
    id: 'architecture',
    name: 'Architecture & Security',
    description: 'Resilient system principles, zero-trust security, caching tiers, and high-performance design',
    skills: [
      {
        name: 'REST API Development',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'Building and integrating REST APIs using Node.js and Express.js with structured routes, controllers, and error handling.',
        tags: ['REST APIs', 'Node.js', 'Express.js']
      },

      {
        name: 'Authentication & Authorization',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'Implementing user authentication and basic role-based access using JWT and protected API routes.',
        tags: ['JWT', 'Authentication', 'Protected Routes']
      },

      {
        name: 'Database Management',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'Working with MongoDB and Mongoose to design schemas, perform CRUD operations, and manage application data.',
        tags: ['MongoDB', 'Mongoose', 'CRUD']
      },

      {
        name: 'API Security Basics',
        level: 'Beginner',
        experienceYears: "fresher",
        highlight: 'Understanding common web security practices such as input validation, CORS configuration, authentication, and secure API development.',
        tags: ['Input Validation', 'CORS', 'JWT']
      },

      {
        name: 'Performance Optimization',
        level: 'Beginner',
        experienceYears: "fresher",
        highlight: 'Improving frontend performance through responsive development, optimized API usage, efficient rendering, and basic Core Web Vitals awareness.',
        tags: ['Web Performance', 'Core Web Vitals', 'Responsive UI']
      },

      {
        name: 'SEO Basics',
        level: 'Beginner',
        experienceYears: "fresher",
        highlight: 'Applying basic on-page and technical SEO practices including meta tags, headings, canonical URLs, sitemaps, robots.txt, and SEO-friendly content.',
        tags: ['On-Page SEO', 'Technical SEO', 'Sitemaps']
      }
    ]
  },
  {
    id: 'tools',
    name: 'DevOps & Tooling',
    description: 'Containerization, version control, automated testing, and development workflows',
    skills: [
      {
        name: 'Docker & Compose',
        level: 'Beginner',
        experienceYears: "fresher",
        highlight: 'Basic understanding of Docker for containerization and Compose for multi-container applications.',
        tags: ['Docker', 'Compose', 'Containerization']
      },
      {
        name: 'Git & GitHub',
        level: 'Intermediate',
        experienceYears: "fresher",
        highlight: 'Basic proficiency in using Git for version control and GitHub for code hosting.',
        tags: ['Git', 'GitHub', 'Version Control']
      },
      {
        name: 'Postman',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Using Postman for API testing, creating collections, and basic request automation.',
        tags: ['Postman', 'API Testing', 'Collections']
      },
      {
        name: 'VS Code & Development Tools',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Comfortable using VS Code for development, debugging, extensions, code formatting, and project management.',
        tags: ['VS Code', 'Debugging', 'Extensions']
      },
      {
        name: 'AI Tools & Development Assistance',
        level: 'Expert',
        experienceYears: "fresher",
        highlight: 'Using AI-powered development tools to improve productivity, explore solutions, generate ideas, and assist with coding and debugging.',
        tags: ['AI Tools', 'Prompting', 'Productivity']
      }
    ]
  }
];
