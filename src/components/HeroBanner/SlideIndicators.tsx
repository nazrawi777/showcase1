import React from 'react';

interface SlideIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const SlideIndicators: React.FC<SlideIndicatorsProps> = ({
  totalSlides,
  currentSlide,
  onSlideChange,
}) => {
  return (
    <div 
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
      role="tablist"
      aria-label="Slide navigation"
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`slide-indicator w-3 h-3 rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
            currentSlide === index
              ? 'active bg-primary border-primary w-8'
              : 'bg-transparent border-muted-foreground/50 hover:border-primary hover:bg-primary/30'
          }`}
          role="tab"
          aria-selected={currentSlide === index}
          aria-label={`Go to slide ${index + 1}`}
          tabIndex={currentSlide === index ? 0 : -1}
        />
      ))}
    </div>
  );
};

export default SlideIndicators;
