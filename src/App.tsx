import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { ArchitectureExplorer } from './components/sections/ArchitectureExplorer';
import { Services } from './components/sections/Services';
import { ResumeView } from './components/sections/ResumeView';
import { Contact } from './components/sections/Contact';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { getStoredProjects } from './services/api';
import { Project, Service } from './types';
import confetti from 'canvas-confetti';
import { Toaster } from 'sonner';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string>('');

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: Service) => {
    setContactSubject(`Inquiry regarding ${service.title}`);
    scrollToSection('contact');
  };

  const handleDownloadResume = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#10b981', '#38bdf8', '#ffffff']
    });

    const link = document.createElement('a');
    link.href = '/Jatin_Jethava_Resume_RealProjects.pdf';
    link.download = 'Jatin_Jethava_Resume_RealProjects.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    scrollToSection('resume');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      <Toaster richColors closeButton={true} duration={2000} />
      <Navbar onAdminClick={() => setIsAdminOpen(true)} />

      <main>
        <Hero
          onExploreProjects={() => scrollToSection('projects')}
          onExploreArchitecture={() => scrollToSection('architecture')}
          onDownloadResume={handleDownloadResume}
        />

        <About />

        <Skills />

        <Projects
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ArchitectureExplorer />

        {/* <Services onSelectService={handleSelectService} /> */}

        <ResumeView />

        <Contact initialSubject={contactSubject} />
      </main>

      <Footer onAdminClick={() => setIsAdminOpen(true)} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

