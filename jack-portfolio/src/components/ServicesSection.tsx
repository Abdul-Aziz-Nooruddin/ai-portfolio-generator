import React from 'react';
import { SERVICES_DATA } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={30} duration={0.7}>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">
            Services
          </h2>
        </FadeIn>

        {/* 5 Service Items in Vertical List */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES_DATA.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={25}
              duration={0.6}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-12 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] transition-colors duration-300 hover:bg-black/[0.02]">
                {/* Large Number */}
                <span className="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] leading-none select-none tracking-tighter w-[120px] sm:w-[160px] md:w-[200px] flex-shrink-0">
                  {service.number}
                </span>

                {/* Name + Description stacked vertically on the right */}
                <div className="flex flex-col gap-2 md:gap-3 flex-grow">
                  <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] tracking-wide">
                    {service.name}
                  </h3>
                  <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-60">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
