import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  href: string;
  accentColor: 'pink' | 'cyan' | 'gold';
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, href, accentColor }) => {
  const getColorClasses = () => {
    switch (accentColor) {
      case 'pink':
        return 'bg-primary hover:bg-primary/90 text-primary-foreground box-glow-pink';
      case 'cyan':
        return 'bg-secondary hover:bg-secondary/90 text-secondary-foreground box-glow-cyan';
      case 'gold':
        return 'bg-accent hover:bg-accent/90 text-accent-foreground box-glow-gold';
    }
  };

  return (
    <a
      href={href}
      className={`hero-cta cta-button inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-lg uppercase tracking-wider ${getColorClasses()} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
      aria-label={text}
    >
      <span>{text}</span>
      <ArrowRight className="w-5 h-5" aria-hidden="true" />
    </a>
  );
};

export default CTAButton;
