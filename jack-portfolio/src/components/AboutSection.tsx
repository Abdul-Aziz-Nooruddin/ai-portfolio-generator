import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { USER_PROFILE } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const bioText = USER_PROFILE.bio;

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden"
    >
      {/* 4 Decorative 3D Corner Images */}
      {/* Top-left: Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon 3D Decor"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain animate-float"
          />
        </FadeIn>
      </div>

      {/* Bottom-left: 3D object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Floating Sphere Object"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain animate-float-delayed"
          />
        </FadeIn>
      </div>

      {/* Top-right: Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego 3D Decor"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain animate-float"
          />
        </FadeIn>
      </div>

      {/* Bottom-right: 3D group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Geometric Structure"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain animate-float-delayed"
          />
        </FadeIn>
      </div>

      {/* Main Center Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        {/* Subtitle identifier */}
        <FadeIn delay={0} y={20} duration={0.6}>
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-3 block">
            {USER_PROFILE.fullName} • {USER_PROFILE.location}
          </span>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.05} y={40} duration={0.7}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading & text */}
        <div className="mt-8 sm:mt-12 md:mt-14 w-full flex justify-center">
          <AnimatedText text={bioText} />
        </div>

        {/* Real Stats Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
          {USER_PROFILE.stats.map((stat, idx) => (
            <FadeIn
              key={stat.label}
              delay={0.2 + idx * 0.08}
              y={20}
              className="p-4 sm:p-5 rounded-3xl bg-[#141414] border border-white/10 flex flex-col items-center text-center shadow-lg"
            >
              <span className="hero-heading text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs text-[#D7E2EA]/60 uppercase tracking-wider font-light mt-1">
                {stat.label}
              </span>
            </FadeIn>
          ))}
        </div>

        {/* Contact Button */}
        <div className="mt-12 sm:mt-16">
          <FadeIn delay={0.4} y={20} duration={0.7}>
            <ContactButton href="mailto:abdulaziznoor9876@gmail.com" label="Contact Me" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
