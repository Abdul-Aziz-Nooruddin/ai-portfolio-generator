import React from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { FadeIn } from './FadeIn';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-28 pb-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading: "Project" (singular) using .hero-heading gradient */}
        <div className="mb-14 sm:mb-20 text-center">
          <FadeIn delay={0} y={30} duration={0.7}>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-2 block">
              All 05 Verified Repositories & Protocols
            </span>
            <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">
              Projects
            </h2>
          </FadeIn>
        </div>

        {/* 3 Sticky-stacking project cards */}
        <div className="relative flex flex-col gap-12 sm:gap-16 pb-20">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
