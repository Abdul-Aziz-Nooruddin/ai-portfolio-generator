import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectItem } from '../data/portfolioData';
import { LiveProjectButton } from './LiveProjectButton';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Target scale calculation: 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[680px] w-full flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(${index * 28}px + 6rem)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl mx-auto rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Top Row: Number, category label, project name, buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D7E2EA]/15">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[clamp(2.5rem,7vw,90px)] text-[#D7E2EA] leading-none select-none tracking-tighter">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase tracking-wider text-[#D7E2EA] mt-1">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub Repository for ${project.name}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-[#D7E2EA]/10 transition-colors duration-200"
              >
                <GithubIcon size={16} />
                <span>GitHub Repo</span>
              </a>
            )}
            <LiveProjectButton href={project.liveUrl} label="Live Project" />
          </div>
        </div>

        {/* Project Description & Tags */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#D7E2EA]/80 font-light">
          <p className="max-w-2xl leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs text-[#D7E2EA]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Single Relevant 3D Hero Viewport (Reasonable Size) */}
        <div className="w-full my-3 flex justify-center">
          <div className="w-full max-w-4xl h-[clamp(170px,20vw,280px)] rounded-[20px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden bg-[#141414] border border-[#D7E2EA]/15 relative group shadow-inner">
            <img
              src={project.image || project.col2Image}
              alt={`${project.name} 3D Visual Artwork`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
