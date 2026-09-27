import React from 'react';
import { motion } from 'framer-motion';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn
        delay={0}
        y={-20}
        duration={0.7}
        className="w-full z-30"
      >
        <header className="w-full px-6 md:px-10 pt-6 md:pt-8">
          <nav className="flex items-center justify-between w-full flex-wrap gap-2">
            <a
              href="#about"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.25rem] transition-opacity duration-200 hover:opacity-70"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.25rem] transition-opacity duration-200 hover:opacity-70"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.25rem] transition-opacity duration-200 hover:opacity-70"
            >
              Experience
            </a>
            <a
              href="#services"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.25rem] transition-opacity duration-200 hover:opacity-70"
            >
              Services
            </a>
            <a
              href="#projects"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.25rem] transition-opacity duration-200 hover:opacity-70"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.25rem] transition-opacity duration-200 hover:opacity-70"
            >
              Contact
            </a>
          </nav>
        </header>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden z-0">
        <FadeIn delay={0.15} y={40} duration={0.8}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
            Hi, i&apos;m aziz
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Absolute Center/Bottom) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="flex items-end justify-center w-full"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack 3D Creator Portrait"
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
              loading="eager"
            />
          </Magnet>
        </motion.div>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[180px] sm:max-w-[240px] md:max-w-[300px]">
            a smart contract & full-stack ai engineer driven by crafting striking, high-performance web3 protocols
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton href="mailto:abdulaziznoor9876@gmail.com" label="Contact Me" />
        </FadeIn>
      </div>
    </section>
  );
};
