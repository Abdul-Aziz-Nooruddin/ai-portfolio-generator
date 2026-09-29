import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Menu, X } from 'lucide-react';

const LOGOS = [
  'Wired',
  'Shopify',
  'The Economist',
  'Nordea',
  'SXSW',
  'Deutsche Bahn',
  'Monzo',
  'Web Summit',
  'Financial Times',
  'Slush',
];

const TALKS = [
  {
    title: 'The Consensus Tax',
    description: 'Why agreement costs more than conflict, and how to price it.',
    venue: 'Web Summit, Lisbon',
    thumb: '/project-keynote.jpg',
  },
  {
    title: 'Deciding at Speed',
    description: 'A practical method for making reversible decisions in under an hour.',
    venue: 'SXSW, Austin',
    thumb: '/project-stage.jpg',
  },
  {
    title: 'The Meeting That Should Have Been Three',
    description: 'On organisational scar tissue and how to cut it.',
    venue: 'Slush, Helsinki',
    thumb: '/project-workshop.jpg',
  },
  {
    title: 'Nobody Reads the Strategy',
    description: 'What leaders think they communicated versus what landed.',
    venue: 'Nordea Leadership Summit, Stockholm',
    thumb: '/project-book.jpg',
  },
];

const PROJECTS = [
  {
    client: 'Deutsche Bahn',
    result: 'Cut a nine-week planning cycle to eleven days across four teams.',
    image: '/project-keynote.jpg',
  },
  {
    client: 'Monzo',
    result: 'Two-day decision workshop with the leadership team before a product reorganisation.',
    image: '/project-workshop.jpg',
  },
  {
    client: 'The Economist',
    result: 'Closing keynote, Innovation Summit 2026.',
    image: '/project-stage.jpg',
  },
  {
    client: 'Shopify',
    result: 'Advisory retainer on internal decision frameworks, twelve months.',
    image: '/project-book.jpg',
  },
];

const WRITING = [
  {
    title: 'The Consensus Tax',
    publication: 'Book, Penguin Business',
    year: '2025',
    link: '#',
  },
  {
    title: 'Your strategy deck is a coping mechanism',
    publication: 'Financial Times',
    year: '2026',
    link: '#',
  },
  {
    title: 'Speed is a culture problem, not a process one',
    publication: 'Wired',
    year: '2026',
    link: '#',
  },
  {
    title: 'What I got wrong about flat teams',
    publication: 'Personal essay',
    year: '2025',
    link: '#',
  },
  {
    title: 'The case against the quarterly cycle',
    publication: 'The Economist',
    year: '2025',
    link: '#',
  },
  {
    title: 'How to disagree in writing',
    publication: 'Personal essay',
    year: '2024',
    link: '#',
  },
];

const NUMBERS = [
  { value: '180', label: 'talks given' },
  { value: '31', label: 'countries' },
  { value: '140,000', label: 'people in the room' },
  { value: '62,000', label: 'books sold' },
];

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTalkThumb, setActiveTalkThumb] = useState<string | null>(null);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Custom Coral Spring Cursor Dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkTouch);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkTouch);
    };
  }, [mouseX, mouseY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F3F1EF] selection:bg-[#FF4D30] selection:text-[#0F0F0F]">
      {/* EFFECT 2: Coral Cursor Dot (Disabled on Touch) */}
      {!isTouchDevice && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-medium uppercase tracking-wider text-xs"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width: isHoveringProject ? 64 : 10,
            height: isHoveringProject ? 64 : 10,
            backgroundColor: '#FF4D30',
            color: '#0F0F0F',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {isHoveringProject && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] font-bold tracking-widest"
            >
              VIEW
            </motion.span>
          )}
        </motion.div>
      )}

      {/* Floating Talk Hover Thumbnail */}
      {!isTouchDevice && activeTalkThumb && (
        <motion.div
          className="fixed pointer-events-none z-50 w-64 h-40 rounded-lg overflow-hidden border border-[#292929] shadow-2xl"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '20px',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <img src={activeTalkThumb} alt="Talk venue" className="w-full h-full object-cover" />
        </motion.div>
      )}

      {/* 1. NAVBAR */}
      <header className="fixed top-0 left-0 right-0 h-[72px] z-40 bg-[#0F0F0F]/80 backdrop-blur-md px-6 md:px-10 flex items-center justify-between border-b border-[#292929]/50">
        <a href="#" className="font-syne font-bold text-lg tracking-tight text-[#F3F1EF] md:invisible">
          NADIA OKONJO
        </a>

        {/* Desktop Links (Right-aligned at 11px letterspaced) */}
        <div className="hidden md:flex items-center gap-10 ml-auto">
          {['Talks', 'Work', 'Writing', 'About'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#979491] hover:text-[#F3F1EF] transition-colors"
            >
              {link}
            </a>
          ))}

          {/* Coral 'Book me' Pill */}
          <a
            href="#booking"
            className="px-5 py-2.5 rounded-full bg-[#FF4D30] text-[#0F0F0F] text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Book me
          </a>
        </div>

        {/* Mobile controls (<768px) */}
        <div className="md:hidden flex items-center gap-4">
          <a
            href="#booking"
            className="px-4 py-1.5 rounded-full bg-[#FF4D30] text-[#0F0F0F] text-xs font-semibold tracking-wider uppercase"
          >
            Book me
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 text-[#F3F1EF] hover:text-[#FF4D30] transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0F0F0F] flex flex-col justify-between p-8"
        >
          <div className="flex items-center justify-between">
            <span className="font-syne font-bold text-lg tracking-tight text-[#F3F1EF]">
              NADIA OKONJO
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#979491] hover:text-[#F3F1EF] transition-colors"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 items-start my-auto">
            {['Talks', 'Work', 'Writing', 'About'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-syne text-3xl font-bold uppercase tracking-tight text-[#F3F1EF] hover:text-[#FF4D30] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#292929] flex flex-col gap-3">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-full bg-[#FF4D30] text-[#0F0F0F] font-bold tracking-wider uppercase text-sm"
            >
              Book me
            </a>
            <span className="text-xs text-[#979491] uppercase tracking-[0.24em] text-center">
              hello@nadiaokonjo.com
            </span>
          </div>
        </motion.div>
      )}

      <main>
        {/* 2. HERO (100vh) */}
        <section className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between items-center px-4 sm:px-6 md:px-10 overflow-hidden">
          {/* Top Label */}
          <div className="text-center pt-2">
            <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#FF4D30]">
              SPEAKER · ADVISOR · WRITER
            </span>
          </div>

          {/* EFFECT 1: Name and Portrait Overlap */}
          {/* Desktop/Tablet Overlap Layout */}
          <div className="relative w-full max-w-[1500px] mx-auto my-auto hidden md:block">
            {/* Top Name: NADIA (z-0) */}
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-0 text-center font-syne font-extrabold uppercase leading-[0.82] tracking-[-0.04em] text-[#F3F1EF] select-none text-[clamp(56px,15vw,260px)]"
            >
              NADIA
            </motion.h1>

            {/* Cut-out Portrait (z-10) */}
            <motion.div
              initial={{ scale: 1.06, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="relative z-10 mx-auto -mt-[12vw] h-[58vh] flex justify-center pointer-events-none"
            >
              <img
                src="/nadia_portrait_nobg.png"
                alt="Nadia Okonjo"
                className="h-full w-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            {/* Bottom Name: OKONJO (z-20) */}
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 -mt-[22vw] text-center font-syne font-extrabold uppercase leading-[0.82] tracking-[-0.04em] text-[#F3F1EF] select-none mix-blend-normal text-[clamp(56px,15vw,260px)]"
            >
              OKONJO
            </motion.h1>
          </div>

          {/* Mobile Hero (<768px): Stacks into 2 lines at 56px with portrait below */}
          <div className="flex md:hidden flex-col items-center justify-center my-auto w-full gap-6">
            <div className="text-center font-syne font-extrabold text-[56px] leading-[0.9] tracking-[-0.04em] uppercase text-[#F3F1EF]">
              NADIA<br />OKONJO
            </div>
            <div className="w-full max-w-[280px] h-[36vh] flex justify-center">
              <img
                src="/nadia_portrait_nobg.png"
                alt="Nadia Okonjo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* Positioning Statement beneath */}
          <div className="text-center max-w-2xl px-4 z-20">
            <p className="text-[17px] md:text-[18px] font-light leading-[1.7] text-[#979491]">
              I help large organisations make decisions faster without making them worse.
            </p>
          </div>
        </section>

        {/* 3. LOGO MARQUEE (Effect 3) */}
        <section className="py-6 border-y border-[#292929] overflow-hidden bg-[#0F0F0F]">
          <div className="animate-marquee flex items-center gap-16 md:gap-24 opacity-55 hover:opacity-100 transition-opacity duration-300">
            {[...LOGOS, ...LOGOS].map((logo, idx) => (
              <span
                key={`${logo}-${idx}`}
                className="font-syne font-semibold text-lg md:text-xl uppercase tracking-wider text-[#979491] whitespace-nowrap"
              >
                {logo}
              </span>
            ))}
          </div>
        </section>

        {/* 4. WHAT I DO (Three Columns) */}
        <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {/* 01 Speaking */}
            <div className="flex flex-col justify-between border-t border-[#292929] pt-8">
              <div>
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#FF4D30]">
                  01 — Speaking
                </span>
                <h3 className="font-syne font-semibold text-2xl md:text-3xl text-[#F3F1EF] mt-4 mb-4">
                  Keynotes & Addresses
                </h3>
                <p className="text-base md:text-[17px] font-light text-[#979491] leading-[1.7]">
                  Keynotes and closing talks on decision-making, organisational speed and the cost of
                  consensus. Around twenty a year, half of them in Europe.
                </p>
              </div>
              <a
                href="#talks"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF4D30] font-medium mt-8 hover:translate-x-1 transition-transform"
              >
                See talks <ArrowRight size={14} />
              </a>
            </div>

            {/* 02 Advising */}
            <div className="flex flex-col justify-between border-t border-[#292929] pt-8">
              <div>
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#FF4D30]">
                  02 — Advising
                </span>
                <h3 className="font-syne font-semibold text-2xl md:text-3xl text-[#F3F1EF] mt-4 mb-4">
                  Executive Intensive
                </h3>
                <p className="text-base md:text-[17px] font-light text-[#979491] leading-[1.7]">
                  Two-day workshops with leadership teams who are stuck between too much data and too
                  little nerve. Six engagements a year, no more.
                </p>
              </div>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF4D30] font-medium mt-8 hover:translate-x-1 transition-transform"
              >
                How it works <ArrowRight size={14} />
              </a>
            </div>

            {/* 03 Writing */}
            <div className="flex flex-col justify-between border-t border-[#292929] pt-8">
              <div>
                <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#FF4D30]">
                  03 — Writing
                </span>
                <h3 className="font-syne font-semibold text-2xl md:text-3xl text-[#F3F1EF] mt-4 mb-4">
                  Books & Essays
                </h3>
                <p className="text-base md:text-[17px] font-light text-[#979491] leading-[1.7]">
                  A book, a fortnightly letter to 24,000 people, and occasional essays for people who
                  pay properly.
                </p>
              </div>
              <a
                href="#writing"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF4D30] font-medium mt-8 hover:translate-x-1 transition-transform"
              >
                Read the letter <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* 5. TALKS */}
        <section id="talks" className="py-24 md:py-32 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-[#292929]">
          <h2 className="font-syne font-semibold text-[clamp(30px,4vw,60px)] tracking-[-0.02em] text-[#F3F1EF] mb-16">
            What I speak about.
          </h2>

          <div className="divide-y divide-[#292929]">
            {TALKS.map((talk, idx) => (
              <div
                key={talk.title}
                onMouseEnter={() => setActiveTalkThumb(talk.thumb)}
                onMouseLeave={() => setActiveTalkThumb(null)}
                className="group py-8 md:py-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4 cursor-pointer transition-all duration-300"
              >
                <div className="flex items-start md:items-baseline gap-4 md:gap-8 group-hover:translate-x-1.5 transition-transform duration-300">
                  <span className="text-xs font-mono text-[#979491]">0{idx + 1}</span>
                  <div>
                    <h3 className="font-syne font-semibold text-2xl md:text-4xl text-[#F3F1EF] group-hover:text-[#FF4D30] transition-colors">
                      {talk.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-[#979491] max-w-xl font-light">
                      {talk.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pl-8 md:pl-0">
                  <span className="text-xs uppercase tracking-wider text-[#979491] italic font-light">
                    {talk.venue}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#292929] flex items-center justify-center text-[#FF4D30] group-hover:border-[#FF4D30] group-hover:translate-x-2.5 transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. SELECTED WORK (Two-Column Grid) */}
        <section id="work" className="py-24 md:py-32 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-[#292929]">
          <h2 className="font-syne font-semibold text-[clamp(30px,4vw,60px)] tracking-[-0.02em] text-[#F3F1EF] mb-16">
            Recent <span className="italic font-light text-[#FF4D30]">engagements</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PROJECTS.map((proj) => (
              <div
                key={proj.client}
                onMouseEnter={() => setIsHoveringProject(true)}
                onMouseLeave={() => setIsHoveringProject(false)}
                className="group flex flex-col cursor-pointer"
              >
                {/* Project Image Card */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[#171717] border border-[#292929]">
                  <img
                    src={proj.image}
                    alt={proj.client}
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Details */}
                <div className="pt-6">
                  <h3 className="font-syne font-semibold text-2xl text-[#F3F1EF] group-hover:text-[#FF4D30] transition-colors">
                    {proj.client}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-[#979491] font-light leading-[1.6]">
                    {proj.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. WRITING */}
        <section id="writing" className="py-24 md:py-32 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-[#292929]">
          <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#FF4D30] block mb-12">
            SELECTED WRITING
          </span>

          <div className="divide-y divide-[#292929]">
            {WRITING.map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="group py-6 md:py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-2 hover:bg-[#171717]/40 px-3 -mx-3 rounded transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-syne font-medium text-lg md:text-xl text-[#F3F1EF] group-hover:text-[#FF4D30] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-8 text-sm text-[#979491]">
                  <span>{item.publication}</span>
                  <span className="font-mono text-xs text-[#979491]/80">{item.year}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 8. NUMBERS */}
        <section className="py-20 md:py-28 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-[#292929]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {NUMBERS.map((num) => (
              <div key={num.label} className="flex flex-col">
                <span className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#FF4D30] tracking-tight">
                  {num.value}
                </span>
                <span className="mt-3 text-xs md:text-sm font-light text-[#979491] tracking-wide">
                  {num.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 9. QUOTE */}
        <section className="py-24 md:py-36 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-[#292929]">
          <blockquote className="font-syne font-semibold text-2xl sm:text-3xl md:text-5xl leading-[1.25] text-[#F3F1EF] tracking-[-0.02em]">
            &ldquo;She closed a conference of four thousand people and the corridor conversation
            afterwards was still about her talk two days later.&rdquo;
          </blockquote>
          <p className="mt-8 text-sm md:text-base text-[#979491] font-light">
            — <span className="text-[#F3F1EF] font-medium">Marta Lindqvist</span>, Programme Director,
            Slush
          </p>
        </section>

        {/* 10. BIO */}
        <section id="about" className="py-24 md:py-32 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-[#292929]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Left Column: Portrait in soft frame */}
            <div className="md:col-span-5 rounded-lg overflow-hidden border border-[#292929] bg-[#171717] shadow-xl">
              <img
                src="/nadia_bio.jpg"
                alt="Nadia Okonjo"
                className="w-full h-auto object-cover aspect-[4/5] filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Right Column: Bio copy */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <h2 className="font-syne font-semibold text-[clamp(30px,4vw,60px)] tracking-[-0.02em] text-[#F3F1EF] mb-8">
                About Nadia.
              </h2>
              <div className="space-y-6 text-base md:text-lg font-light leading-[1.7] text-[#979491]">
                <p>
                  I spent eleven years inside large organisations watching good decisions die in
                  committee. In 2021 I left to work on the problem from outside, and I have been
                  doing it ever since.
                </p>
                <p>
                  My work sits between organisational design and plain stubbornness. I am not a
                  motivational speaker. I do not do fireside chats about resilience. I come with a
                  method, and I expect the room to use it.
                </p>
                <p>
                  I live in Lisbon, speak English, Portuguese and Igbo, and answer my own email.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-[#292929]">
                <a
                  href="mailto:hello@nadiaokonjo.com?subject=Press%20Kit%20Request"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF4D30] font-semibold hover:translate-x-1 transition-transform"
                >
                  Download press kit and photos <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 11. BOOKING (Coral Section, Black Text) */}
        <section id="booking" className="bg-[#FF4D30] text-[#0F0F0F] py-24 md:py-32 px-6 md:px-10">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-syne font-semibold text-[clamp(32px,5vw,72px)] tracking-[-0.03em] leading-[1.1] mb-10">
              Let&apos;s talk about the room.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-base md:text-lg font-light leading-[1.7] mb-12">
              <p>
                Tell me the date, the city, the audience size and what the previous speaker got
                wrong. That last one is genuinely the most useful thing you can include.
              </p>
              <p>
                Fees typically £8,000–£18,000 depending on travel and format. Reduced rates for
                education and non-profits, always.
              </p>
            </div>

            <div>
              <a
                href="mailto:hello@nadiaokonjo.com"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0F0F0F] text-[#F3F1EF] text-sm md:text-base font-semibold tracking-wider hover:bg-black hover:scale-105 transition-all shadow-xl"
              >
                hello@nadiaokonjo.com <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER */}
      <footer className="bg-[#0F0F0F] border-t border-[#292929] py-10 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#979491]">
          <span className="font-syne font-bold uppercase tracking-wider text-[#F3F1EF]">
            NADIA OKONJO
          </span>

          <a href="mailto:hello@nadiaokonjo.com" className="hover:text-[#FF4D30] transition-colors">
            hello@nadiaokonjo.com
          </a>

          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#FF4D30] transition-colors">
              LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#FF4D30] transition-colors">
              Instagram
            </a>
          </div>

          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
