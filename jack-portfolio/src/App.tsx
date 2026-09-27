import React from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FooterSection } from './components/FooterSection';

export const App: React.FC = () => {
  return (
    <main
      className="bg-[#0C0C0C] min-h-screen w-full relative text-[#D7E2EA] font-['Kanit',sans-serif]"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section with real Bio & Stats */}
      <AboutSection />

      {/* 4. Skills & Technical Matrix Section */}
      <SkillsSection />

      {/* 5. Experience, Education & Certifications Section */}
      <ExperienceSection />

      {/* 6. Services Section */}
      <ServicesSection />

      {/* 7. Projects Section with all 5 authentic GitHub Repos & 3D Imagery */}
      <ProjectsSection />

      {/* 8. Footer Section */}
      <FooterSection />
    </main>
  );
};

export default App;
