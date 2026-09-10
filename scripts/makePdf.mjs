import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { jsPDF } from 'jspdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export function buildResumePdf() {
  // ===========================================================================
  // A4 DOCUMENT SETUP
  // ===========================================================================

  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = 595.28;
  const pageHeight = 841.89;

  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  const PAGE_TOP = 46;
  const CONTENT_BOTTOM = pageHeight - 58;

  // ===========================================================================
  // FOOTER
  // ===========================================================================

  const drawFooter = (pageNum, totalPages) => {
    const footerY = pageHeight - 20;

    doc.setDrawColor(209, 213, 219);
    doc.setLineWidth(0.6);

    doc.line(
      margin,
      footerY - 14,
      pageWidth - margin,
      footerY - 14
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(156, 163, 175);

    doc.text(
      'Jatin Jethava • Full-Stack MERN • Official Portfolio & Resume',
      margin,
      footerY
    );

    doc.text(
      `Page ${pageNum} of ${totalPages}`,
      pageWidth - margin,
      footerY,
      { align: 'right' }
    );
  };

  // ===========================================================================
  // PAGE 2 / CONTINUATION HEADER
  // ===========================================================================

  const drawContinuationHeader = () => {
    const headerY = PAGE_TOP;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(17, 24, 39);

    doc.text(
      'JATIN JETHAVA',
      margin,
      headerY
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(107, 114, 128);

    doc.text(
      'Technical Portfolio Projects & Architectural Deep-Dive',
      margin,
      headerY + 13
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.6);
    doc.setTextColor(55, 65, 81);

    doc.text(
      'jatinjethava3125@gmail.com',
      pageWidth - margin,
      headerY,
      { align: 'right' }
    );

    doc.setDrawColor(209, 213, 219);
    doc.setLineWidth(0.8);

    doc.line(
      margin,
      headerY + 24,
      pageWidth - margin,
      headerY + 24
    );

    return headerY + 43;
  };

  // ===========================================================================
  // PAGE BREAK
  // ===========================================================================

  const startNewContinuationPage = () => {
    doc.addPage();
    return drawContinuationHeader();
  };

  // ===========================================================================
  // SECTION HEADER
  // ===========================================================================

  const drawSectionHeader = (yPos, title) => {
    const requiredHeight = 30;

    if (yPos + requiredHeight > CONTENT_BOTTOM) {
      yPos = startNewContinuationPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(17, 24, 39);

    doc.text(
      title,
      margin,
      yPos
    );

    const lineY = yPos + 6;

    doc.setDrawColor(31, 41, 55);
    doc.setLineWidth(0.8);

    doc.line(
      margin,
      lineY,
      pageWidth - margin,
      lineY
    );

    return lineY + 16;
  };

  // ===========================================================================
  // PROJECT TITLE
  // ===========================================================================

  const drawProjectTitle = (yPos, title) => {
    const titleLines = doc.splitTextToSize(
      title,
      contentWidth
    );

    const requiredHeight =
      titleLines.length * 13 + 24;

    if (yPos + requiredHeight > CONTENT_BOTTOM) {
      yPos = startNewContinuationPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.2);
    doc.setTextColor(31, 41, 55);

    doc.text(
      titleLines,
      margin,
      yPos,
      {
        lineHeightFactor: 1.2,
      }
    );

    const lineY =
      yPos + titleLines.length * 12 + 6;

    doc.setDrawColor(55, 65, 81);
    doc.setLineWidth(0.7);

    doc.line(
      margin,
      lineY,
      pageWidth - margin,
      lineY
    );

    return lineY + 17;
  };

  // ===========================================================================
  // BULLET
  // ===========================================================================

  const drawBullet = (yPos, text) => {
    const textX = margin + 14;
    const textWidth = contentWidth - 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.1);

    const lineHeight = 12.2;

    const lines = doc.splitTextToSize(
      text,
      textWidth
    );

    const requiredHeight =
      lines.length * lineHeight + 7;

    // Prevent bullet from entering footer
    if (yPos + requiredHeight > CONTENT_BOTTOM) {
      yPos = startNewContinuationPage();
    }

    // Bullet dot
    doc.setFillColor(31, 41, 55);

    doc.circle(
      margin + 5.5,
      yPos - 3.2,
      1.7,
      'F'
    );

    // Text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.1);
    doc.setTextColor(55, 65, 81);

    doc.text(
      lines,
      textX,
      yPos,
      {
        lineHeightFactor: 1.34,
      }
    );

    return yPos + requiredHeight;
  };

  // ===========================================================================
  // TECHNOLOGY ROW
  // ===========================================================================

  const drawTechnologyRow = (
    yPos,
    technologies
  ) => {
    const label = 'Technologies:';

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.9);

    const labelWidth =
      doc.getTextWidth(label) + 8;

    const availableWidth =
      contentWidth - labelWidth - 15;

    doc.setFont('helvetica', 'normal');

    const lines = doc.splitTextToSize(
      technologies,
      availableWidth
    );

    const requiredHeight =
      lines.length * 11.5 + 10;

    if (yPos + requiredHeight > CONTENT_BOTTOM) {
      yPos = startNewContinuationPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.9);
    doc.setTextColor(31, 41, 55);

    doc.text(
      label,
      margin,
      yPos
    );

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);

    doc.text(
      lines,
      margin + labelWidth,
      yPos,
      {
        lineHeightFactor: 1.3,
      }
    );

    return yPos + requiredHeight;
  };

  // ===========================================================================
  // PROJECT META ROW
  // ===========================================================================

  const drawProjectMeta = (
    yPos,
    leftText,
    rightText
  ) => {
    const leftWidth =
      contentWidth * 0.58;

    const rightWidth =
      contentWidth * 0.36;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);

    const leftLines =
      doc.splitTextToSize(
        leftText,
        leftWidth
      );

    const rightLines =
      doc.splitTextToSize(
        rightText,
        rightWidth
      );

    const maxLines =
      Math.max(
        leftLines.length,
        rightLines.length
      );

    const requiredHeight =
      maxLines * 12 + 7;

    if (yPos + requiredHeight > CONTENT_BOTTOM) {
      yPos = startNewContinuationPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(31, 41, 55);

    doc.text(
      leftLines,
      margin,
      yPos,
      {
        lineHeightFactor: 1.25,
      }
    );

    doc.text(
      rightLines,
      pageWidth - margin,
      yPos,
      {
        align: 'right',
        lineHeightFactor: 1.25,
      }
    );

    return yPos + requiredHeight;
  };

  // ===========================================================================
  // PAGE 1
  // ===========================================================================

  let y = PAGE_TOP;

  // ---------------------------------------------------------------------------
  // MAIN HEADER
  // ---------------------------------------------------------------------------

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(25);
  doc.setTextColor(17, 24, 39);

  doc.text(
    'JATIN JETHAVA',
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  y += 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.2);
  doc.setTextColor(31, 41, 55);

  doc.text(
    'FULL-STACK MERN DEVELOPER',
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  y += 16;

  // ---------------------------------------------------------------------------
  // CONTACT INFORMATION
  // ---------------------------------------------------------------------------

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.7);
  doc.setTextColor(75, 85, 99);

  doc.text(
    'Surat, Gujarat, India   |   +91 81600 82638   |   jatinjethava3125@gmail.com',
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  y += 13;

  doc.text(
    'GitHub: github.com/jatinjethava   |   Portfolio: jatin-jethava.vercel.app',
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  y += 13;

  // ---------------------------------------------------------------------------
  // HEADER DIVIDER
  // ---------------------------------------------------------------------------

  doc.setDrawColor(31, 41, 55);
  doc.setLineWidth(1.3);

  doc.line(
    margin,
    y,
    pageWidth - margin,
    y
  );

  y += 23;

  // ===========================================================================
  // PROFESSIONAL SUMMARY
  // ===========================================================================

  y = drawSectionHeader(
    y,
    'PROFESSIONAL SUMMARY'
  );

  const summary =
    'Passionate Full-Stack Developer with comprehensive expertise across the entire web application development lifecycle, from system architecture design and reactive UI implementation to performant backend engineering and API deployment. Supported by an outstanding academic track record (8.4 CGPA in BCA), I specialize in building responsive React and Next.js client interfaces, scalable Node.js/Express RESTful microservices, Redis in-memory caching layers, and resilient MongoDB data schemas. Committed to writing clean, maintainable, production-ready code with strict security safeguards, automated validation pipelines, and seamless payment gateway integrations.';

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.1);
  doc.setTextColor(75, 85, 99);

  const summaryLines =
    doc.splitTextToSize(
      summary,
      contentWidth
    );

  const summaryHeight =
    summaryLines.length * 12.2 + 18;

  if (y + summaryHeight > CONTENT_BOTTOM) {
    y = startNewContinuationPage();
  }

  doc.text(
    summaryLines,
    margin,
    y,
    {
      lineHeightFactor: 1.34,
    }
  );

  y += summaryHeight;

  // ===========================================================================
  // TECHNICAL SKILLS
  // ===========================================================================

  y = drawSectionHeader(
    y,
    'TECHNICAL SKILLS'
  );

  const skills = [
    {
      category: 'Frontend Engineering:',
      list:
        'React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, RTK Query, TanStack Query, HTML5 & Modern CSS3, Responsive Design',
    },
    {
      category: 'Backend & APIs:',
      list:
        'Node.js, Express.js, RESTful Architecture, Socket.io (WebSockets), JWT Authentication, Role-Based Access Control (RBAC), Nodemailer, Async Event Handling',
    },
    {
      category: 'Databases & In-Memory:',
      list:
        'MongoDB (Mongoose ODM, Schema Validations), MySQL (Relational Modeling), Redis (L2 Caching, Sliding Window Rate Limiting, High-Speed Key-Value Store)',
    },
    {
      category: 'Architecture & Patterns:',
      list:
        'MVC Architecture, Decoupled Monoliths, Microservice Integration, Client-Side State Normalization, Code-Splitting, Lazy Loading, Database Indexing',
    },
    {
      category: 'DevOps, Tools & APIs:',
      list:
        'Git & GitHub (CI/CD Workflows), Docker, Docker Compose, Postman API Testing, Cloudinary Media API, Razorpay Payment Gateway, Linux/Bash CLI, Vite Bundler',
    },
  ];

  const SKILL_LABEL_WIDTH = 124;

  for (const skill of skills) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.9);

    const skillLines =
      doc.splitTextToSize(
        skill.list,
        contentWidth - SKILL_LABEL_WIDTH
      );

    const rowHeight =
      Math.max(
        skillLines.length * 11.5,
        11.5
      ) + 7;

    if (y + rowHeight > CONTENT_BOTTOM) {
      y = startNewContinuationPage();
    }

    // Category
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.9);
    doc.setTextColor(31, 41, 55);

    doc.text(
      skill.category,
      margin,
      y
    );

    // Skills
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);

    doc.text(
      skillLines,
      margin + SKILL_LABEL_WIDTH,
      y,
      {
        lineHeightFactor: 1.3,
      }
    );

    y += rowHeight;
  }

  y += 8;

  // ===========================================================================
  // EDUCATION
  // ===========================================================================

  y = drawSectionHeader(
    y,
    'EDUCATION'
  );

  // BCA
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.8);
  doc.setTextColor(17, 24, 39);

  doc.text(
    'Bachelor of Computer Applications (BCA)',
    margin,
    y
  );

  doc.text(
    'Current CGPA: 8.4 / 10 (Sem-6)',
    pageWidth - margin + 10,
    y,
    { align: 'right' }
  );

  y += 19;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(75, 85, 99);

  doc.text(
    'Sutex Bank College of Computer Application & Science (VNSGU), Surat, Gujarat',
    margin,
    y
  );

  doc.text(
    'Expected Graduation: March 2026',
    pageWidth - margin,
    y,
    { align: 'right' }
  );

  y += 14;

  doc.setFontSize(8.5);
  doc.setTextColor(107, 114, 128);

  doc.text(
    'Key Disciplines: Full-Stack Web Development, Data Structures & Algorithms, Relational Database Systems, Network Security',
    margin,
    y
  );

  y += 20;

  // HSC
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.8);
  doc.setTextColor(17, 24, 39);

  doc.text(
    'Higher Secondary Certificate (HSC – 12th Commerce)',
    margin,
    y
  );

  doc.text(
    'Score: 83.0%',
    pageWidth - margin,
    y,
    { align: 'right' }
  );

  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(75, 85, 99);

  doc.text(
    'Gujarat Secondary and Higher Secondary Education Board (GSEB)',
    margin,
    y
  );

  doc.text(
    'Completed: March 2023',
    pageWidth - margin,
    y,
    { align: 'right' }
  );

  y += 30;

  // SSC
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.8);
  doc.setTextColor(17, 24, 39);

  doc.text(
    'Secondary School Certificate (SSC – 10th)',
    margin,
    y
  );

  doc.text(
    'Score: 92.0%',
    pageWidth - margin,
    y,
    { align: 'right' }
  );

  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(75, 85, 99);

  doc.text(
    'Gujarat Secondary and Higher Secondary Education Board (GSEB)',
    margin,
    y
  );

  doc.text(
    'Completed: March 2021',
    pageWidth - margin,
    y,
    { align: 'right' }
  );

  y += 34;

  // ===========================================================================
  // KEY COMPETENCIES
  // ===========================================================================

  y = drawSectionHeader(
    y,
    'KEY COMPETENCIES & ENGINEERING PRACTICES'
  );

  const competencies = [
    'Architectural Design & Standards: Disciplined execution of MVC pattern, decoupled API routers, clean request-response lifecycles, structured error middleware, and strict input sanitation.',

    'Caching Strategies & Concurrency: Deployment of Redis L2 caching for frequently queried datasets, sliding window rate limiters to shield against DDoS, and normalized state slices with Redux Toolkit.',

    'Authentication & Security Hardening: Implementation of secure JWT token authentication with refresh cycles, role-based route guards (RBAC), bcrypt credential hashing, and CORS isolation.',

    'Version Control & Team Collaboration: Active Git workflows including feature branching, clear commit discipline, semantic versioning, pull request reviews, and environment parity across development and production.',
  ];

  for (const competency of competencies) {
    y = drawBullet(
      y,
      competency
    );
  }

  y += 10;

  // ===========================================================================
  // LANGUAGES
  // ===========================================================================

  y = drawSectionHeader(
    y,
    'LANGUAGES & COMMUNICATION'
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(31, 41, 55);

  doc.text(
    'Languages:',
    margin,
    y
  );

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);

  const languageText =
    'English (Professional Working)   |   Hindi (Full Professional)   |   Gujarati (Native / Mother Tongue)';

  const languageLines =
    doc.splitTextToSize(
      languageText,
      contentWidth - 70
    );

  doc.text(
    languageLines,
    margin + 70,
    y,
    {
      lineHeightFactor: 1.3,
    }
  );

  y += languageLines.length * 12 + 10;

  // ===========================================================================
  // PAGE 2
  // ===========================================================================

  doc.addPage();
  y = drawContinuationHeader();

  // ===========================================================================
  // PROJECT 1
  // ===========================================================================

  y = drawProjectTitle(
    y,
    'PROJECT 1: VASTRA VERSE – ENTERPRISE MERN E-COMMERCE PLATFORM'
  );

  y = drawProjectMeta(
    y,
    'Full-Stack Fashion Commerce Platform',
    'Lead Full-Stack Developer | Live Architecture'
  );

  y = drawTechnologyRow(
    y,
    'React.js, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS, Redux Toolkit, Socket.io, Razorpay API, Cloudinary'
  );

  const vastraBullets = [
    'Enterprise System Architecture: Architected and deployed an enterprise-grade fashion e-commerce ecosystem featuring decoupled frontend and backend applications with robust schema validations and normalized data models.',

    'Secure Authentication & RBAC: Engineered robust authentication utilizing JWT tokens, role-based authorization guards (User/Admin), automated OTP email verification, and bcrypt password hashing.',

    'Interactive Catalog & Storefront: Built an interactive and fully responsive customer storefront equipped with instant multi-facet filtering, debounced search, persistent cart drawer, and client-side state caching.',

    'Payment Gateway & Webhooks: Integrated Razorpay payment gateway enabling smooth checkout workflows, cryptographic payment signature verifications, webhook listeners, and integrated user wallet functionality.',

    'Real-Time WebSockets Engine: Integrated Socket.io WebSockets to power real-time order tracking notifications, live inventory decrementing, and instant dispatch updates for active shoppers.',

    'Administrative Operations Suite: Constructed an administrative back-office console with comprehensive CRUD tools for managing product inventories, categories, discount coupons, and dynamic hero banners.',

    'Invoicing & Media Optimization: Automated dynamic PDF invoice generation for completed transactions and integrated Cloudinary CDN for responsive, bandwidth-optimized image delivery.',
  ];

  for (const bullet of vastraBullets) {
    y = drawBullet(
      y,
      bullet
    );
  }

  y += 10;

  // ===========================================================================
  // PROJECT 2
  // ===========================================================================

  y = drawProjectTitle(
    y,
    'PROJECT 2: BUNSTORY – RESTAURANT & FOOD ORDERING PLATFORM'
  );

  y = drawProjectMeta(
    y,
    'Full-Stack Food Ordering Web Platform',
    'Full-Stack Engineer | Responsive Application'
  );

  y = drawTechnologyRow(
    y,
    'React.js, Node.js, Express.js, MongoDB, RESTful APIs, Tailwind CSS, LocalStorage Session Sync'
  );

  const bunBullets = [
    'Ordering Flow & Real-Time Cart: Designed an intuitive burger ordering web platform featuring responsive customer ordering flows, ingredient add-ons, dynamic tax calculations, and persistent cart sessions.',

    'Backend API Infrastructure: Structured backend RESTful APIs using Node.js and Express.js to facilitate product catalog browsing, cart operations, user profile management, and order processing.',

    'Kitchen Management Console: Built dedicated administrative screens allowing store managers to create, update, and organize menu categories, food items, pricing tiers, and incoming order statuses.',

    'Resilience & UX Engineering: Implemented client-side form validation schemas, custom toast notifications, and centralized server-side error handling middleware to deliver a smooth end-user experience.',
  ];

  for (const bullet of bunBullets) {
    y = drawBullet(
      y,
      bullet
    );
  }

  y += 10;

  // ===========================================================================
  // PROJECT 3
  // ===========================================================================

  y = drawProjectTitle(
    y,
    'PROJECT 3: MERN PORTFOLIO & PRODUCTION CONTAINER ARCHITECTURE'
  );

  y = drawProjectMeta(
    y,
    'Full-Stack Monolith & Production Infrastructure',
    'DevOps & Full-Stack Engineer | Live System'
  );

  y = drawTechnologyRow(
    y,
    'TypeScript, Next 15, Express.js, Docker Compose, Redis 7 (Alpine), MongoDB Atlas, Tailwind CSS v4'
  );

  const portfolioBullets = [
    'Monolithic Container Packaging: Architected multi-stage Docker build packaging both Vite React static frontend and Express backend into a unified production container serving port 8100.',

    'Redis Caching & Sliding Rate Limiter: Engineered Redis L2 cache layer with LRU eviction and automated IP-based rate limiting to protect public endpoints and contact inquiry dispatchers.',

    'Dynamic In-Browser PDF Engine: Developed custom jsPDF client-side document compiler with pixel-perfect vector rules, hanging bullet indentation, and ATS-optimized executive layout.',
  ];

  for (const bullet of portfolioBullets) {
    y = drawBullet(
      y,
      bullet
    );
  }

  y += 12;

  // ===========================================================================
  // DECLARATION
  // ===========================================================================

  y = drawSectionHeader(
    y,
    'DECLARATION & SIGN-OFF'
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.1);
  doc.setTextColor(75, 85, 99);

  const declaration =
    'I hereby confirm that all the details furnished in this curriculum vitae are authentic, complete, and accurately reflect my academic qualifications and technical project engineering experience.';

  const declarationLines =
    doc.splitTextToSize(
      declaration,
      contentWidth
    );

  const declarationHeight =
    declarationLines.length * 12.2 + 30;

  if (y + declarationHeight > CONTENT_BOTTOM) {
    y = startNewContinuationPage();

    y = drawSectionHeader(
      y,
      'DECLARATION & SIGN-OFF'
    );
  }

  doc.text(
    declarationLines,
    margin,
    y,
    {
      lineHeightFactor: 1.34,
    }
  );

  y +=
    declarationLines.length * 12.2 + 28;

  // Signature line
  doc.setDrawColor(156, 163, 175);
  doc.setLineWidth(0.5);

  doc.line(
    pageWidth - margin - 150,
    y - 18,
    pageWidth - margin,
    y - 18
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(31, 41, 55);

  doc.text(
    'Place: Surat, Gujarat, India',
    margin,
    y
  );

  doc.text(
    'Candidate: Jatin Jethava',
    pageWidth - margin,
    y,
    { align: 'right' }
  );

  // ===========================================================================
  // ADD FOOTERS AFTER ALL PAGES ARE GENERATED
  // ===========================================================================

  const totalPages =
    doc.internal.getNumberOfPages();

  for (
    let pageNum = 1;
    pageNum <= totalPages;
    pageNum++
  ) {
    doc.setPage(pageNum);

    drawFooter(
      pageNum,
      totalPages
    );
  }

  return doc;
}

// ============================================================================
// BUILD PDF
// ============================================================================

const isMainModule =
  import.meta.url ===
  `file://${process.argv[1]}`;

if (isMainModule || !isMainModule) {
  console.log('Generating PDF...');

  const doc =
    buildResumePdf();

  // --------------------------------------------------------------------------
  // PUBLIC DIRECTORY
  // --------------------------------------------------------------------------

  const publicDir =
    path.join(
      rootDir,
      'public'
    );

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(
      publicDir,
      { recursive: true }
    );
  }

  // --------------------------------------------------------------------------
  // DIST DIRECTORY
  // --------------------------------------------------------------------------

  const distDir =
    path.join(
      rootDir,
      'dist'
    );

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(
      distDir,
      { recursive: true }
    );
  }

  // --------------------------------------------------------------------------
  // CREATE PDF BUFFER
  // --------------------------------------------------------------------------

  const pdfOutput =
    doc.output('arraybuffer');

  const buffer =
    Buffer.from(pdfOutput);

  // --------------------------------------------------------------------------
  // SAVE TO PUBLIC
  // --------------------------------------------------------------------------

  const publicPath =
    path.join(
      publicDir,
      'Jatin_Jethava_Resume.pdf'
    );

  fs.writeFileSync(
    publicPath,
    buffer
  );

  // --------------------------------------------------------------------------
  // SAVE TO DIST
  // --------------------------------------------------------------------------

  const distPath =
    path.join(
      distDir,
      'Jatin_Jethava_Resume.pdf'
    );

  fs.writeFileSync(
    distPath,
    buffer
  );

  console.log(
    'PDF successfully generated!'
  );

  console.log(
    `Saved to: ${publicPath}`
  );

  console.log(
    `Saved to: ${distPath}`
  );
}