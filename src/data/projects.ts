import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    slug: 'vastra-verse',
    title: 'Vastra Verse',
    subtitle: 'Full-Stack MERN E-Commerce Platform with Razorpay, Socket.io & Admin Console',
    category: 'ecommerce',
    featured: true,
    coverImage: '/Screenshot 2026-09-10 152521.png',
    description: 'A full-stack fashion e-commerce platform with decoupled frontend and backend, secure JWT authentication, role-based access, real-time order tracking, Razorpay payments, and a complete admin console.',
    problem: 'Building a complete e-commerce solution that handles user authentication, product management, secure payments, real-time updates, and admin operations — all in a single cohesive platform.',
    solution: 'Designed and developed a decoupled MERN stack application with React.js frontend, Express.js REST APIs, MongoDB data layer, Razorpay payment integration, Socket.io for real-time features, and Cloudinary for media.',
    keyFeatures: [
      'Secure JWT authentication with role-based authorization (User/Admin), OTP email verification via Nodemailer, and bcrypt password hashing',
      'Razorpay payment gateway with cryptographic signature verification and integrated user wallet functionality',
      'Live Chat Support using socket.io',
      'Implemented essential e-commerce features including product search, category filters, shopping cart, and responsive design',
      'Admin console with full CRUD for products, categories, discount coupons, hero banners, and order management',
      'Automated PDF invoice generation and Cloudinary CDN for optimized image delivery'
    ],
    techStack: {
      frontend: ['React.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
      backend: ['Node.js', 'Express.js', 'Socket.io', 'Nodemailer'],
      database: ['MongoDB', 'Mongoose'],
      devops: ['Razorpay', 'Cloudinary', 'Vercel']
    },
    metrics: [
      { label: 'Tech Stack', value: 'Full MERN' },
      { label: 'Auth System', value: 'JWT + RBAC' },
      { label: 'Payments', value: 'Razorpay' },
      { label: 'Real-Time', value: 'Socket.io' }
    ],
    architecture: {
      overview: 'Decoupled frontend (React.js) and backend (Express.js) architecture with MongoDB for data persistence, Razorpay for payments, Socket.io for real-time features, and Cloudinary for media.',
      flowSteps: [
        'User registers/logs in via JWT authentication with OTP email verification',
        'Browses product catalog with filtering, search, and persistent cart sessions',
        'Proceeds to checkout with Razorpay payment integration and signature verification',
        'order status updates delivered via Notifications',
        'Admin manages products, categories, coupons, banners, and orders through the admin console'
      ],
      databaseSchemaNotes: 'MongoDB collections for Users, Products, Categories, Orders, Coupons, and Wallets. Mongoose schemas with validations, pre/post hooks, and virtual populates.',
      apiEndpoints: [
        { method: 'POST', path: '/register', description: 'User registration with OTP email verification' },
        { method: 'POST', path: '/login', description: 'JWT authentication with access and refresh tokens' },
        { method: 'GET', path: '/products', description: 'Product catalog with filtering and pagination' },
        { method: 'POST', path: '/orders/checkout', description: 'Razorpay payment and order creation' }
      ]
    },
    performanceNotes: [
      'Responsive UI across all devices with Tailwind CSS',
      'Implemented efficient state management to improve application responsiveness',
      'Cloudinary CDN for fast, optimized image loading'
    ],
    securityNotes: [
      'JWT access tokens with refresh token rotation',
      'Bcrypt password hashing with secure salt rounds',
      'Razorpay webhook signature verification for payment integrity'
    ],
    lessonsLearned: [
      'Learned how to integrate real-time features with Socket.io alongside REST APIs',
      'Understood the importance of payment signature verification for secure transactions'
    ],
    githubUrl: 'https://github.com/jatinjethava/VASTRA-VERSE',
    liveUrl: 'https://vastra-verse.vercel.app/',
    date: '2026'
  },
  {
    id: 'proj-2',
    slug: 'bunstory',
    title: 'BunStory',
    subtitle: 'Full-Stack Restaurant & Food Ordering Platform with Admin Kitchen Console',
    category: 'fullstack',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    description: 'A full-stack food ordering web platform featuring responsive customer ordering flows, ingredient customization, dynamic pricing, backend REST APIs, and a dedicated kitchen management console for store managers.',
    problem: 'Creating a complete food ordering system that handles menu management, customer ordering with customizations, cart persistence, and admin order processing.',
    solution: 'Built a responsive React.js frontend with Node.js/Express.js backend, MongoDB data layer, structured REST APIs for all operations, and a kitchen management console for store managers.',
    keyFeatures: [
      'Intuitive ordering interface with ingredient add-ons, dynamic tax calculations, and responsive design',
      'Persistent cart sessions using LocalStorage for seamless user experience across browser sessions',
      'Backend REST APIs for product catalog, cart operations, user profiles, and order processing',
      'Kitchen management console for store managers to manage menu items, categories, pricing, and order statuses',
      'Client-side form validation, custom toast notifications, and centralized error handling middleware'
    ],
    techStack: {
      frontend: ['React.js', 'Tailwind CSS', 'LocalStorage'],
      backend: ['Node.js', 'Express.js', 'REST APIs'],
      database: ['MongoDB', 'Mongoose'],
      devops: ['Git', 'Vercel']
    },
    metrics: [
      { label: 'Tech Stack', value: 'MERN' },
      { label: 'API Endpoints', value: '25+' },
      { label: 'UI', value: 'Fully Responsive' },
      { label: 'Cart', value: 'Persistent' }
    ],
    architecture: {
      overview: 'Classic MERN architecture with React.js frontend consuming REST APIs from Express.js backend, MongoDB for menu and order storage, and LocalStorage for client-side cart persistence.',
      flowSteps: [
        'Customer browses the menu catalog with categories and item details',
        'Adds items to cart with ingredient customizations and quantity selection',
        'Cart persists across sessions via LocalStorage sync',
        'Places order through backend API with form validation',
        'Order status updates'
      ],
      databaseSchemaNotes: 'MongoDB collections for MenuItems, Categories, Orders, and Users. Mongoose schemas with input validation and structured error responses.',
      apiEndpoints: [
        { method: 'GET', path: '/api/menu', description: 'Fetches menu items with category filtering' },
        { method: 'POST', path: '/api/orders', description: 'Creates a new customer order' },
        { method: 'GET', path: '/api/admin/orders', description: 'Lists orders for kitchen management' },
        { method: 'PUT', path: '/api/admin/menu/:id', description: 'Updates menu item details and pricing' }
      ]
    },
    performanceNotes: [
      'LocalStorage cart sync eliminates unnecessary server round-trips',
      'Responsive design ensures smooth experience on mobile and desktop'
    ],
    securityNotes: [
      'Server-side input validation on all API endpoints',
      'Centralized error handling middleware for consistent error responses'
    ],
    lessonsLearned: [
      'Learned the full cycle of building a MERN application from scratch',
      'Understood the importance of structured REST API design and error handling'
    ],
    githubUrl: 'https://github.com/jatinjethava/BunStory-website-MERN-',
    date: '2026'
  },
  {
    id: 'proj-3',
    slug: 'mern-portfolio',
    title: 'MERN Portfolio',
    subtitle: 'Full-Stack Developer Portfolio with Docker, Redis Caching & Contact System',
    category: 'ai-built',
    featured: true,
    coverImage: '/Screenshot 2026-09-10 152718.png',
    description: 'A production-grade developer portfolio built with React.js and Express.js, containerized with Docker Compose, featuring Redis caching, IP-based rate limiting, and a live contact form with Nodemailer.',
    problem: 'Building a portfolio that goes beyond a static page — demonstrating real backend engineering, containerization, caching, and production deployment skills.',
    solution: 'Architected a multi-stage Docker build packaging both Vite React frontend and Express.js backend into a unified production container, with Redis for caching and rate limiting.',
    keyFeatures: [
      'Multi-stage Docker build packaging frontend and backend into a single production container',
      'Redis L2 cache layer with automated IP-based sliding-window rate limiting on public endpoints',
      'Live contact form with Nodemailer email dispatch and server-side validation',
      'Responsive, animated UI with Motion (Framer Motion) and Tailwind CSS',
      'In-browser PDF resume with direct download functionality'
    ],
    techStack: {
      frontend: ['React.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
      backend: ['Express.js', 'Nodemailer', 'Redis'],
      database: ['Redis', 'In-Memory State'],
      devops: ['Docker', 'Docker Compose', 'Vite']
    },
    metrics: [
      { label: 'Container', value: 'Docker' },
      { label: 'Caching', value: 'Redis L2' },
      { label: 'Rate Limiting', value: 'Sliding Window' },
      { label: 'Build', value: 'Multi-Stage' }
    ],
    architecture: {
      overview: 'Monolithic container architecture with Vite-built React static assets served by Express.js, Redis for caching and rate limiting, and Nodemailer for email dispatch.',
      flowSteps: [
        'Vite builds React frontend into static dist folder',
        'Express.js serves static assets and handles API routes',
        'Redis caches API responses and enforces IP-based rate limiting',
        'Contact form submissions validated server-side and dispatched via Nodemailer',
        'Docker Compose orchestrates the entire stack (app + Redis) in production'
      ],
      databaseSchemaNotes: 'Redis stores cached API responses with TTL-based expiration and rate limit counters using sliding window algorithm.',
      apiEndpoints: [
        { method: 'POST', path: '/api/v1/contact', description: 'Handles contact form submissions with rate limiting' },
        { method: 'GET', path: '/api/v1/stats', description: 'Returns system metrics and Redis cache statistics' }
      ]
    },
    performanceNotes: [
      'Redis caching reduces MongoDB queries on frequently accessed data',
      'Vite build with code splitting for optimized frontend bundle size'
    ],
    securityNotes: [
      'IP-based sliding window rate limiting protects against spam and DDoS',
      'Server-side input validation on all contact form submissions'
    ],
    lessonsLearned: [
      'Learned Docker multi-stage builds for production-ready containerization',
      'Understood Redis caching patterns and rate limiting implementation'
    ],
    githubUrl: 'https://github.com/jatinjethava',
    liveUrl: 'https://jatin-jethava.vercel.app/',
    date: '2026'
  },
  {
    id: 'proj-4',
    slug: 'vastra-verse-admin',
    title: 'Vastra Verse — Admin Dashboard',
    subtitle: 'E-Commerce Admin Panel with Product, Order, Coupon & Banner Management',
    category: 'admin',
    featured: true,
    coverImage: '/Screenshot 2026-09-10 153024.png',
    description: 'The dedicated admin dashboard for the Vastra Verse e-commerce platform. Provides comprehensive CRUD operations for managing products, categories, orders, discount coupons, hero banners, and user management.',
    problem: 'E-commerce platforms need a powerful admin interface for store managers to manage inventory, process orders, create promotions, and monitor business operations efficiently.',
    solution: 'Built a separate admin dashboard application with role-based access, real-time order management, product CRUD operations, coupon management, and dynamic banner configuration.',
    keyFeatures: [
      'Complete product management with image uploads via Cloudinary, categories, pricing, and inventory tracking',
      'Order management console with real-time status updates and order processing workflow',
      'Discount coupon system with customizable rules, expiry dates, and usage limits',
      'Dynamic hero banner management for the storefront with drag-and-drop ordering',
      'Role-based admin authentication with JWT and secure session management'
    ],
    techStack: {
      frontend: ['React.js', 'Tailwind CSS', 'Redux'],
      backend: ['Node.js', 'Express.js', 'REST APIs'],
      database: ['MongoDB', 'Mongoose'],
      devops: ['Cloudinary', 'Vercel']
    },
    metrics: [
      { label: 'CRUD Operations', value: 'Full' },
      { label: 'Auth', value: 'JWT + RBAC' },
      { label: 'Media', value: 'Cloudinary' },
      { label: 'UI', value: 'Responsive' }
    ],
    architecture: {
      overview: 'Decoupled admin frontend consuming the same Express.js backend APIs as the customer-facing Vastra Verse storefront, with admin-only protected routes and role verification.',
      flowSteps: [
        'Admin logs in with JWT authentication and role verification',
        'Dashboard loads with overview stats, recent orders, and inventory alerts',
        'Admin manages products, categories, coupons, and banners through dedicated CRUD interfaces',
        'Order status updates are reflected in real-time on the customer storefront',
        'Media uploads processed through Cloudinary CDN for optimized delivery'
      ],
      databaseSchemaNotes: 'Shares the same MongoDB database as the main Vastra Verse platform. Admin routes are protected with role-based middleware.',
      apiEndpoints: [
        { method: 'GET', path: '/api/admin/products', description: 'Lists all products with filtering and pagination' },
        { method: 'POST', path: '/api/admin/products', description: 'Creates a new product with image upload' },
        { method: 'PUT', path: '/api/admin/orders/:id', description: 'Updates order status and processing' },
        { method: 'POST', path: '/api/admin/coupons', description: 'Creates discount coupons with rules' }
      ]
    },
    performanceNotes: [
      'Cloudinary CDN for fast image delivery and automatic resizing',
      'Paginated data loading for large product and order lists'
    ],
    securityNotes: [
      'Admin-only JWT middleware with role verification on all routes',
      'Secure image upload with file type validation'
    ],
    lessonsLearned: [
      'Learned to build admin dashboards with complex CRUD operations',
      'Understood role-based access control patterns in full-stack applications'
    ],
    githubUrl: 'https://github.com/jatinjethava/VASTRA-VERSE/tree/main/ADMIN',
    liveUrl: 'https://vastra-verse-admin.vercel.app/',
    date: '2026'
  },
  {
    id: 'proj-5',
    slug: 'build-architect',
    title: 'Build Architect — ZROBIM',
    subtitle: 'Premium Architectural Firm Website with 3D Villa Walkthrough, Interactive Blueprints & Pricing',
    category: 'ai-built',
    featured: false,
    coverImage: '/Screenshot 2026-09-10 153229.png',
    description: 'A premium architectural firm website featuring a cinematic 3D villa walkthrough controlled by scroll, interactive CAD-style blueprint floorplans, project portfolio, image gallery with carousel, and tiered pricing plans.',
    problem: 'Designing a visually stunning, Awwwards-quality website for an architectural firm that showcases luxury villa projects with immersive 3D experiences and interactive blueprint exploration.',
    solution: 'Built a high-end single-page application with scroll-driven 3D frame sequences, interactive SVG floorplans with room specifications, multilingual support, and a complete pricing section.',
    keyFeatures: [
      'Cinematic 3D villa walkthrough with 140-frame scroll-controlled camera rotation around a luxury residence',
      'Interactive architectural blueprint with clickable room blocks showing real-time space specifications (m²)',
      'Theme switching between Electric Blueprint and Dark CAD visual modes with layer visibility controls',
      'Featured projects portfolio showcasing flagship architectural designs with detailed specs',
      'Image gallery carousel with pause/play controls, fullscreen expansion, and architectural specification overlays',
      'Three-tier pricing plans (Basic ₹40K, Pro ₹190K, Turnkey ₹250K) with detailed service breakdowns',
      'Multilingual support (English, Hindi, Gujarati) with global office directory'
    ],
    techStack: {
      frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
      backend: ['Static Site'],
      database: ['N/A'],
      devops: ['Vercel', 'AI Tools']
    },
    metrics: [
      { label: 'Built With', value: 'AI Tools' },
      { label: 'Design', value: 'Awwwards Quality' },
      { label: '3D Frames', value: '140 Frames' },
      { label: 'Languages', value: '3 (EN/HI/GU)' }
    ],
    architecture: {
      overview: 'Static frontend website with scroll-driven animations, interactive SVG blueprints, and responsive design. Built using AI-assisted development tools.',
      flowSteps: [
        'User lands on the hero section with cinematic 3D villa walkthrough',
        'Scrolling controls the 140-frame camera rotation around the luxury villa',
        'Interactive blueprint section allows clicking room blocks for space specifications',
        'Project portfolio showcases flagship designs with images and specs',
        'Pricing section presents three tiers with detailed service breakdowns'
      ],
      databaseSchemaNotes: 'Static website with no backend database. All content is rendered client-side.',
      apiEndpoints: []
    },
    performanceNotes: [
      'Optimized frame sequence loading for smooth 3D scroll experience',
      'Responsive design ensures great experience across all devices'
    ],
    securityNotes: [
      'Static site with no server-side attack surface'
    ],
    lessonsLearned: [
      'Learned to create immersive scroll-driven 3D experiences',
      'Explored AI-assisted development for rapid prototyping of premium designs'
    ],
    githubUrl: 'https://github.com/jatinjethava/Real-Estate-UI',
    liveUrl: 'https://build-architect.vercel.app/',
    date: '2026'
  },
  {
    id: 'proj-6',
    slug: 'animex-portfolio',
    title: 'Animex — Anime Character Showcase',
    subtitle: 'Interactive Anime Character Portfolio with Power Rankings, Timelines & Domain Expansion Effects',
    category: 'ai-built',
    featured: false,
    coverImage: '/Screenshot 2026-09-10 153525.png',
    description: 'A premium, cyberpunk-themed anime character showcase featuring detailed character lore, power rankings, story arc timelines, artwork galleries, and interactive Domain Expansion visual effects.',
    problem: 'Creating an immersive, visually stunning digital showcase for iconic anime characters that goes beyond a simple gallery — featuring interactive elements, rankings, and rich lore exploration.',
    solution: 'Built a futuristic, Awwwards-inspired website with glassmorphism UI, interactive character spotlights, filterable character catalogs, power leaderboards, and story timeline exploration.',
    keyFeatures: [
      'Featured Legend Spotlight with interactive character switching, power stats (99/100), tier badges (S+), and iconic quotes',
      'Domain Expansion interactive visual effect with full-screen overlay animation',
      'Filterable Archive Catalog with franchise tabs (Jujutsu Kaisen, Demon Slayer, Attack on Titan, Bleach, One Piece)',
      'Global Power Rankings leaderboard with combat power scores and animated progress bars',
      'Character Evolution Timeline showing chronological story arcs and key events',
      'Artwork Gallery & Collections with high-definition anime art showcase',
      'Audio Ambience player for immersive background soundtrack',
      'Global search modal for characters, anime franchises, and power techniques'
    ],
    techStack: {
      frontend: ['HTML', 'CSS', 'JavaScript', 'Next JS', 'Tailwind CSS'],
      backend: ['Static Site'],
      database: ['N/A'],
      devops: ['Vercel', 'AI Tools']
    },
    metrics: [
      { label: 'Built With', value: 'AI Tools' },
      { label: 'Design', value: 'Cyberpunk Theme' },
      { label: 'Characters', value: '8+ Legends' },
      { label: 'Franchises', value: '5+ Anime' }
    ],
    architecture: {
      overview: 'Static frontend application with rich interactive elements, glassmorphism UI, and cyberpunk-themed design. Built using AI-assisted development tools.',
      flowSteps: [
        'User lands on the Featured Legend Spotlight with Satoru Gojo',
        'Can switch between characters, activate Domain Expansion effect, and explore lore',
        'Archive Catalog allows filtering characters by anime franchise',
        'Power Rankings show combat scores with animated progress bars',
        'Timeline section reveals character evolution across story arcs'
      ],
      databaseSchemaNotes: 'Static website with no backend database. All character data and content rendered client-side.',
      apiEndpoints: []
    },
    performanceNotes: [
      'Glassmorphism effects optimized with CSS backdrop-filter for smooth rendering',
      'Responsive design with mobile-friendly character cards and navigation'
    ],
    securityNotes: [
      'Static site with no server-side attack surface'
    ],
    lessonsLearned: [
      'Learned to create immersive, theme-driven websites with rich visual effects',
      'Explored AI-assisted development for rapid prototyping of complex interactive UIs'
    ],
    githubUrl: 'https://github.com/jatinjethava/ANIMEX',
    liveUrl: 'https://animex-gold-sigma.vercel.app/',
    date: '2026'
  }
];
