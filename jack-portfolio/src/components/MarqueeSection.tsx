import React, { useRef, useState, useEffect } from 'react';
import { MARQUEE_ITEMS, MarqueeItem } from '../data/portfolioData';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);

  // Row 1: first 11 images, tripled
  const row1Base: MarqueeItem[] = MARQUEE_ITEMS.slice(0, 11);
  const row1Items: MarqueeItem[] = [...row1Base, ...row1Base, ...row1Base];

  // Row 2: remaining 10 images, tripled
  const row2Base: MarqueeItem[] = MARQUEE_ITEMS.slice(11);
  const row2Items: MarqueeItem[] = [...row2Base, ...row2Base, ...row2Base];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      // Scroll offset calculated as: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: Moves RIGHT on scroll: translateX(offset - 200) */}
        <div
          className="flex gap-4 sm:gap-5 w-max"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row1Items.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="group relative w-[280px] sm:w-[320px] h-[160px] sm:h-[185px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/10 shadow-lg transition-all duration-300 hover:border-white/30"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle tech gradient overlay with badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 sm:p-5 flex flex-col justify-end">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#D7E2EA]/70">
                  {item.tag}
                </span>
                <h4 className="text-white text-xs sm:text-sm font-medium uppercase tracking-wider mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll: translateX(-(offset - 200)) */}
        <div
          className="flex gap-4 sm:gap-5 w-max"
          style={{
            transform: `translateX(-${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row2Items.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="group relative w-[280px] sm:w-[320px] h-[160px] sm:h-[185px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/10 shadow-lg transition-all duration-300 hover:border-white/30"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle tech gradient overlay with badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 sm:p-5 flex flex-col justify-end">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#D7E2EA]/70">
                  {item.tag}
                </span>
                <h4 className="text-white text-xs sm:text-sm font-medium uppercase tracking-wider mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
