import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Story', href: '#story' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Studios', href: '#studios' },
  { name: 'Feedback', href: '#feedback' },
];

const STATS = [
  { value: '300', label: 'CRAFTED\nBRANDS', custom: 2 },
  { value: '200', label: 'DIGITAL\nPRODUCTS', custom: 3 },
  { value: '100', label: 'VENTURES\nFUNDED', custom: 4 },
];

const WORDS = ['Fearless', 'Vision', 'Delivered'];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// 1. fadeDown variant (nav elements)
const fadeDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: EASE,
    },
  }),
};

// 2. fadeUp variant (stats + bottom content)
const fadeUp: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.12,
      duration: 0.6,
      ease: EASE,
    },
  }),
};

// 3. Heading slide-up (main heading words reveal)
const headingWord: Variants = {
  initial: { y: '110%' },
  animate: (wordIndex: number) => ({
    y: 0,
    transition: {
      delay: 0.4 + wordIndex * 0.14,
      duration: 0.7,
      ease: EASE,
    },
  }),
};

export const HeroSection: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden font-['Inter',sans-serif] bg-white">
      {/* BACKGROUND: Full-screen looping muted video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 1. NAVIGATION BAR */}
      <header className="relative z-20 w-full px-5 sm:px-8 md:px-12 pt-5 md:pt-6">
        <nav className="flex items-center justify-between w-full">
          {/* Left: Circular Logo (32px round, 2px border #5E0ED7, 10px solid circle inside) */}
          <motion.div
            variants={fadeDown}
            initial="initial"
            animate="animate"
            custom={0}
            className="flex items-center"
          >
            <a
              href="#"
              aria-label="Home"
              className="w-8 h-8 rounded-full border-2 border-[#5E0ED7] flex items-center justify-center transition-transform hover:scale-105"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#5E0ED7] block" />
            </a>
          </motion.div>

          {/* Center: 4 Nav links (hidden on mobile, visible md+) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                variants={fadeDown}
                initial="initial"
                animate="animate"
                custom={idx + 1}
                className="text-[14px] font-semibold tracking-widest uppercase text-black hover:opacity-70 transition-opacity"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right: 36px round black hamburger button */}
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            variants={fadeDown}
            initial="initial"
            animate="animate"
            custom={5}
            className="w-9 h-9 rounded-full bg-black flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Open mobile menu"
          >
            <span className="w-4 h-0.5 bg-white rounded-full block" />
            <span className="w-4 h-0.5 bg-white rounded-full block" />
            <span className="w-4 h-0.5 bg-white rounded-full block" />
          </motion.button>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-between px-5 sm:px-8 py-5 sm:py-6"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full border-2 border-[#5E0ED7] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5E0ED7] block" />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                aria-label="Close mobile menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-8 mt-16">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-semibold tracking-widest uppercase text-black hover:text-[#5E0ED7] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-auto pt-8">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-semibold tracking-widest uppercase text-[#5E0ED7] flex items-center gap-2 hover:opacity-80 transition-opacity pb-2"
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. STATS ROW (middle section: vertically centered, right-aligned) */}
      <div className="relative z-20 flex-1 flex items-center justify-end px-5 sm:px-8 md:px-12 py-8 md:py-0 w-full">
        <div className="flex items-center justify-end gap-5 sm:gap-8 md:gap-10">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              custom={stat.custom}
              className="flex flex-col items-end text-right"
            >
              <div
                className="font-semibold text-black leading-none flex items-start"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
              >
                <span className="text-[#5E0ED7] text-[0.5em] align-top inline-block font-semibold mr-0.5">
                  +
                </span>
                <span>{stat.value}</span>
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-black whitespace-pre-line leading-tight text-right mt-1 sm:mt-1.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM SECTION (pinned to bottom with padding) */}
      <div className="relative z-20 px-5 sm:px-8 md:px-12 pb-8 md:pb-12 flex flex-col gap-6 md:gap-12 w-full">
        {/* Row A (tagline + CTA) */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Tagline */}
          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            custom={5}
            className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-black leading-snug max-w-[130px] sm:max-w-[160px] md:max-w-xs"
          >
            Shaping Bold
            <br />
            Visions Into Power
            <br />
            For Your Tribe
          </motion.p>

          {/* Right: CTA Link */}
          <motion.a
            href="#contact"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            custom={6}
            className="text-base sm:text-xl md:text-2xl font-semibold tracking-widest uppercase text-[#5E0ED7] whitespace-nowrap flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity"
          >
            <span>Work With Us</span>
            <ArrowUpRight className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] stroke-[2.2]" />
          </motion.a>
        </div>

        {/* Row B (description + main heading) */}
        <div className="flex items-end justify-between gap-3 sm:gap-4">
          {/* Left: Description Block */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            custom={7}
            className="w-[120px] sm:w-[180px] md:w-[280px] shrink-0"
          >
            <p className="text-[9px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-black leading-snug text-left md:text-right">
              Creative Studios Built Around Elevating Your Vision Into Striking Reality
            </p>
          </motion.div>

          {/* Right: Main Heading (3 words stacked vertically with clip reveal) */}
          <div className="text-right flex flex-col">
            {WORDS.map((word, wordIndex) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  variants={headingWord}
                  initial="initial"
                  animate="animate"
                  custom={wordIndex}
                  className="font-semibold uppercase text-black text-right block"
                  style={{
                    fontSize: 'clamp(2rem, 9vw, 9rem)',
                    lineHeight: 0.88,
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
