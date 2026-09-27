import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-28 relative z-10 w-full border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center mb-14 sm:mb-20">
          <FadeIn delay={0} y={30} duration={0.7}>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-2 block">
              Core Technical Competencies
            </span>
            <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.8rem,10vw,140px)] leading-none tracking-tight">
              Skills
            </h2>
          </FadeIn>
        </div>

        {/* 4 Skill Category Bentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <FadeIn
              key={category.title}
              delay={idx * 0.1}
              y={25}
              duration={0.7}
              className="p-6 sm:p-8 rounded-[36px] bg-[#121212] border border-[#D7E2EA]/15 shadow-xl hover:border-[#D7E2EA]/40 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <h3 className="text-lg sm:text-xl font-medium uppercase tracking-wider text-[#D7E2EA]">
                    {category.title}
                  </h3>
                  <span className="text-xs text-[#D7E2EA]/40 font-mono">
                    0{idx + 1} // MATRIX
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#D7E2EA]/50 uppercase tracking-widest">
                <span>Production Tested</span>
                <span>✦ Verified</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
