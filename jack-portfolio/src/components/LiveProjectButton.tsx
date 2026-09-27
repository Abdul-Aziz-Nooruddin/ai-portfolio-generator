import React from 'react';
import { ExternalLink } from 'lucide-react';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href,
  onClick,
  label = 'Live Project',
  className = '',
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10 active:scale-95 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        <span>{label}</span>
        <ExternalLink size={16} className="opacity-80" />
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      <span>{label}</span>
      <ExternalLink size={16} className="opacity-80" />
    </button>
  );
};
