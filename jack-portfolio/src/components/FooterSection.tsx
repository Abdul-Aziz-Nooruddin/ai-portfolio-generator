import React from 'react';
import { USER_PROFILE } from '../data/portfolioData';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-[#0C0C0C] border-t border-white/10 px-6 sm:px-10 py-16 sm:py-20 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <FadeIn delay={0} y={20}>
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">
              Get In Touch
            </span>
            <h3 className="hero-heading text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">
              Let&apos;s Create Together
            </h3>
            <p className="text-[#D7E2EA]/70 text-sm sm:text-base max-w-md mt-3 font-light">
              Open for smart contract engineering, spatial WebGL applications, decentralized protocols, and cutting-edge engineering collaborations.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} y={20} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <ContactButton href={`mailto:${USER_PROFILE.email}`} label="Contact Me" />
          
          <div className="flex items-center gap-4">
            <a
              href={USER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={USER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`mailto:${USER_PROFILE.email}`}
              aria-label="Email"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#D7E2EA]/50 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} {USER_PROFILE.fullName} -- Smart Contract & Full-Stack AI Engineer</span>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-[#D7E2EA] transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
};

