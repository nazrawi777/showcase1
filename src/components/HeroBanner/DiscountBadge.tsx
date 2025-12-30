import React from 'react';
import { Tag, Gift, Sparkles } from 'lucide-react';

interface DiscountBadgeProps {
  text: string;
  icon: string;
  accentColor: 'pink' | 'cyan' | 'gold';
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ text, icon, accentColor }) => {
  const getColorClasses = () => {
    switch (accentColor) {
      case 'pink':
        return 'bg-primary text-primary-foreground';
      case 'cyan':
        return 'bg-secondary text-secondary-foreground';
      case 'gold':
        return 'bg-accent text-accent-foreground';
    }
  };

  const IconComponent = () => {
    switch (icon) {
      case 'tag':
        return <Tag className="w-4 h-4" aria-hidden="true" />;
      case 'gift':
        return <Gift className="w-4 h-4" aria-hidden="true" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4" aria-hidden="true" />;
      default:
        return <Tag className="w-4 h-4" aria-hidden="true" />;
    }
  };

  return (
    <div 
      className={`hero-badge badge-pulse inline-flex items-center gap-2 px-4 py-2 rounded-full font-display font-bold text-sm uppercase tracking-wider ${getColorClasses()}`}
      role="status"
      aria-label={`Special offer: ${text}`}
    >
      <IconComponent />
      <span>{text}</span>
    </div>
  );
};

export default DiscountBadge;
