import React from 'react';
import { EXPERIENCES_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';
import { FadeIn } from './FadeIn';
import { Award, ExternalLink } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-28 relative z-10 w-full border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center mb-14 sm:mb-20">
          <FadeIn delay={0} y={30} duration={0.7}>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-2 block">
              Career Trajectory & Credentials
            </span>
            <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.8rem,10vw,140px)] leading-none tracking-tight">
              Experience
            </h2>
          </FadeIn>
        </div>

        {/* Experience List */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {EXPERIENCES_DATA.map((item, idx) => (
            <FadeIn
              key={item.number}
              delay={idx * 0.1}
              y={25}
              duration={0.7}
              className="p-6 sm:p-8 md:p-10 rounded-[36px] bg-[#121212] border border-[#D7E2EA]/15 shadow-xl hover:border-[#D7E2EA]/40 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-black text-3xl sm:text-4xl md:text-5xl text-[#D7E2EA] font-mono select-none">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-medium uppercase tracking-wider text-[#D7E2EA]">
                      {item.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/60 uppercase tracking-widest mt-0.5">
                      {item.organization}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs text-[#D7E2EA]/80 font-mono">
                    {item.period}
                  </span>
                  {item.badge && (
                    <span className="px-3 py-1 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/40 text-xs text-white font-medium uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#D7E2EA]/80 font-light leading-relaxed mt-4 max-w-3xl">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-[#D7E2EA]/70"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Verified Certifications Sub-block (Only rendered if candidate provided real verified credentials) */}
        {CERTIFICATIONS_DATA.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <FadeIn delay={0.2} y={20}>
              <h3 className="text-xl sm:text-2xl font-medium uppercase tracking-wider text-[#D7E2EA] mb-6 flex items-center gap-3">
                <Award className="text-[#D7E2EA]" size={24} />
                <span>Verified Certifications</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {CERTIFICATIONS_DATA.map((cert) => (
                  <a
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-[#141414] border border-white/10 hover:border-white/30 flex items-center justify-between gap-4 transition-all duration-200 group"
                  >
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-white group-hover:text-[#D7E2EA]">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-[#D7E2EA]/60 mt-0.5">
                        {cert.issuer} • {cert.badge}
                      </p>
                    </div>
                    <ExternalLink size={18} className="text-[#D7E2EA]/50 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </section>
  );
};
