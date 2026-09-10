export type ProjectCategory = 'all' | 'fullstack' | 'ecommerce' | 'admin' | 'api' | 'experimental' | 'ai-built';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  featured: boolean;
  coverImage: string;
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
  };
  metrics: {
    label: string;
    value: string;
  }[];
  architecture: {
    overview: string;
    flowSteps: string[];
    databaseSchemaNotes: string;
    apiEndpoints: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      path: string;
      description: string;
    }[];
  };
  performanceNotes: string[];
  securityNotes: string[];
  lessonsLearned: string[];
  githubUrl: string;
  liveUrl?: string;
  date: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Intermediate' | 'Beginner';
  experienceYears: number | string;
  highlight: string;
  tags: string[];
  iconName?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  link?: string,
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  deliverables: string[];
  techStack: string[];
  typicalTimeline: string;
}

export interface Profile {
  name: string;
  roleTitle: string;
  secondaryTitle: string;
  location: string;
  experienceYears: number;
  avatarUrl: string;
  status: {
    isAvailable: boolean;
    text: string;
    type: 'fulltime' | 'contract' | 'both';
  };
  shortBio: string;
  aboutBio: string[];
  philosophy: string[];
  specializations: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
  };
  stats: {
    label: string;
    value: string;
    helper: string;
  }[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
  status: 'new' | 'reviewed' | 'archived';
  ip?: string;
}

export interface SystemStats {
  apiUptime: string;
  avgLatencyMs: number;
  activeConnections: number;
  redisMemoryKb: number;
  cacheHitRatioPercent: number;
  totalRequestsServed: number;
  dockerContainers: {
    name: string;
    status: 'healthy' | 'running';
    port: string;
  }[];
}
