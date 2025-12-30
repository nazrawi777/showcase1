import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({ onPrev, onNext }) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="nav-arrow absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/20 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground hover:bg-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
      </button>
      <button
        onClick={onNext}
        className="nav-arrow absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/20 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground hover:bg-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
      </button>
    </>
  );
};

export default NavigationArrows;
