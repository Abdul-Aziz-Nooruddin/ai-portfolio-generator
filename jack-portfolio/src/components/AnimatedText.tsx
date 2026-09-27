import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedChar: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder for accurate DOM layout and line breaks */}
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {char}
      </span>
      {/* Absolute animated character */}
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 select-text"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalChars = text.length;
  const words = text.split(' ');

  let globalCharIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');

        return (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const charIdx = globalCharIndex++;
              // Calculate scroll progress slice for each character
              const start = charIdx / totalChars;
              const end = Math.min(1, start + (1 / totalChars) * 1.5);

              return (
                <AnimatedChar
                  key={`char-${charIdx}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block whitespace-pre">
                {(() => {
                  const spaceIdx = globalCharIndex++;
                  const start = spaceIdx / totalChars;
                  const end = Math.min(1, start + (1 / totalChars) * 1.5);
                  return (
                    <AnimatedChar
                      char=" "
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  );
                })()}
              </span>
            )}
          </span>
        );
      })}
    </p>
  );
};
