import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  href = 'mailto:abdulaziznoor9876@gmail.com',
  className = '',
  label = 'Contact Me',
}) => {
  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
    outline: '2px solid white',
    outlineOffset: '-3px',
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {label}
    </span>
  );

  const classes = `inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 active:scale-95 hover:scale-[1.03] select-none ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        style={buttonStyle}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      className={classes}
    >
      {content}
    </button>
  );
};
