import { Profile } from '../types';

export const profileData: Profile = {
  name: 'Jatin Jethava',
  roleTitle: 'MERN Stack Developer',
  secondaryTitle: 'Full-Stack Developer',
  location: 'Surat, Gujarat, India',
  experienceYears: 0,
  avatarUrl: '/myImage.jpeg',
  status: {
    isAvailable: true,
    text: 'Open to High-Impact Opportunities',
    type: 'both',
  },
  shortBio: 'Full-Stack Developer who genuinely enjoys the entire development cycle, from brainstorming system architecture to shipping production-ready code with a strong academic foundation (8.4 CGPA).',
  aboutBio: [
    'I am a motivated Full-Stack Developer and MERN Stack fresher with a strong foundation in MongoDB, Express.js, React.js, Node.js, TypeScript, REST APIs, and responsive UI development.',
    'With a Bachelor’s degree in Computer Applications and an 8.4 CGPA, I have developed real-world projects including e-commerce platforms and web ordering systems. These projects have strengthened my understanding of frontend development, backend APIs, databases, authentication, and modern web technologies.',
    'As a quick learner with a strong problem-solving mindset, I enjoy learning new technologies, taking on challenging tasks, and continuously improving my skills. I may be at the beginning of my professional journey, but I bring curiosity, consistency, adaptability, and a strong willingness to learn and contribute to real-world projects.'
  ],
  philosophy: [
    'Zero-Trust System Design: Validate inputs at every boundary using Zod and strict schema contracts.',
    'Sub-100ms API Threshold: Utilize Redis caching, indexed MongoDB lookups, and minimal payload serialization.',
    'Predictable State: Treat frontend state as a state machine; prevent layout shifts and stale queries.',
    'Human-Centric UX: High-grade software must feel instantaneous, accessible, and delightful.'
  ],
  specializations: [
    'Full-Stack MERN Architectures',
    'Next.js 15 App Router & React 19',
    'High-Throughput Node.js / Express REST APIs',
    'JWT Authentication & API Integration',
    'Razorpay Integration',
    'Cloudinary Integration',
    'MongoDB Aggregation Pipelines',
    'SEO-Friendly Web Development'
  ],
  socialLinks: {
    github: 'https://github.com/jatinjethava',
    linkedin: 'https://linkedin.com/in/jatin-jethava-7096a42b3',
    twitter: 'https://x.com/jethava36641',
    email: 'jatinjethava3125@gmail.com',
  },
  stats: [
    {
      label: 'MERN Projects', value: '2+', helper: 'Built with React & Node.js'
    },
    {
      label: 'Frontend Development', value: '4+', helper: 'Responsive web interfaces'
    },
    {
      label: 'REST APIs', value: '300+', helper: 'Built with Node & Express'
    },
    {
      label: 'Database', value: 'MongoDB', helper: 'Mongoose & data modeling'
    }
  ]
};
