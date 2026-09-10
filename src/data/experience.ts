import { Experience } from '../types';

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    role: 'Vastra Verse — MERN E-Commerce Platform',
    company: 'Full-Stack Developer',
    location: 'Surat, India',
    link: 'https://vastra-verse.vercel.app/',
    period: '2026 — Present',
    current: true,
    description: 'Designed and built a full-stack fashion e-commerce platform with decoupled frontend and backend, secure authentication, real-time features, and payment integration.',
    achievements: [
      'Architected an enterprise-grade e-commerce ecosystem with React.js, Node.js, Express.js, and MongoDB featuring robust schema validations and normalized data models.',
      'Engineered secure JWT authentication with role-based authorization (User/Admin), automated OTP email verification via Nodemailer, and bcrypt password hashing.',
      'Integrated Razorpay payment gateway with cryptographic signature verification, webhook listeners, and user wallet functionality for smooth checkout workflows.',
      'Built real-time order tracking and live inventory updates using Socket.io WebSockets, and an admin console with full CRUD for products, categories, coupons, and banners.',
    ],
    technologies: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Redux', 'Socket.io', 'Razorpay', 'Cloudinary']
  },
  {
    id: 'exp-2',
    role: 'BunStory — Restaurant & Food Ordering Platform',
    company: 'Full-Stack Developer',
    location: 'Surat, India',
    period: '2026',
    current: false,
    description: 'Built a full-stack food ordering web platform with responsive customer flows, backend REST APIs, and a kitchen management console for store managers.',
    achievements: [
      'Designed an intuitive burger ordering platform with responsive UI, ingredient add-ons, dynamic tax calculations, and persistent cart sessions using LocalStorage.',
      'Structured backend RESTful APIs with Node.js and Express.js for product catalog browsing, cart operations, user profile management, and order processing.',
      'Built dedicated admin screens for store managers to create, update, and organize menu categories, food items, pricing tiers, and incoming order statuses.',
      'Implemented client-side form validation, custom toast notifications, and centralized server-side error handling middleware for a smooth user experience.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'LocalStorage']
  },
  {
    id: 'exp-3',
    role: 'MERN Portfolio — Production Container Architecture',
    company: 'Full-Stack Developer',
    location: 'Surat, India',
    period: '2026',
    current: false,
    description: 'Built a full-stack developer portfolio with production-grade Docker containerization, Redis caching, rate limiting, and an in-browser PDF resume engine.',
    achievements: [
      'Architected multi-stage Docker build packaging both Vite React static frontend and Express backend into a unified production container serving on port 8100.',
      'Engineered Redis L2 cache layer with automated IP-based sliding-window rate limiting to protect public API endpoints and contact inquiry dispatchers.',
      'Built a custom in-browser PDF engine using jsPDF with pixel-perfect vector formatting, hanging bullet indentation, and ATS-optimized executive layout.',
    ],
    technologies: ['TypeScript', 'React.js', 'Express.js', 'Docker Compose', 'Redis', 'MongoDB', 'Tailwind CSS', 'Vite']
  }
];

export const educationData = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Sutex Bank College of Computer Application & Science (VNSGU), Surat',
    period: 'Expected Graduation: March 2026',
    details: 'Current CGPA: 8.4 / 10 (Sem-6) • Key Disciplines: Full-Stack Web Development, Data Structures, Relational Databases.'
  },
  {
    degree: 'Higher Secondary Certificate (HSC — 12th Commerce)',
    institution: 'Gujarat Secondary and Higher Secondary Education Board (GSEB)',
    period: 'Completed: March 2023',
    details: 'Score: 83% • Strong foundation in Commerce, Mathematics, and Analytical Problem Solving.'
  },
  {
    degree: 'Secondary School Certificate (SSC — 10th)',
    institution: 'Gujarat Secondary and Higher Secondary Education Board (GSEB)',
    period: 'Completed: March 2021',
    details: 'Score: 92% • Graduated with Distinction and top academic honors.'
  }
];

export const certificationsData = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    issuer: 'Sutex Bank College (VNSGU), Surat',
    year: '2026',
    credentialId: 'CGPA: 8.4 / 10'
  },
  {
    title: 'Higher Secondary Certificate (HSC — 12th Commerce)',
    issuer: 'GSEB (Gujarat Board)',
    year: '2023',
    credentialId: 'Score: 83%'
  },
  {
    title: 'Secondary School Certificate (SSC — 10th)',
    issuer: 'GSEB (Gujarat Board)',
    year: '2021',
    credentialId: 'Score: 92%'
  }
];
