import React from 'react';
import { SlideData } from './types';
import DiscountBadge from './DiscountBadge';
import CountdownTimer from './CountdownTimer';
import CTAButton from './CTAButton';

interface SlideContentProps {
  slide: SlideData;
  isActive: boolean;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide, isActive }) => {
  const getHeadlineGlow = () => {
    switch (slide.accentColor) {
      case 'pink':
        return 'text-glow-pink';
      case 'cyan':
        return 'text-glow-cyan';
      case 'gold':
        return 'text-glow-gold';
    }
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${slide.id}: ${slide.headline}`}
      aria-hidden={!isActive}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${slide.backgroundImage})` }}
        aria-hidden="true"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div 
        className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-20 ${
          isActive ? 'hero-content-enter' : ''
        }`}
      >
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <DiscountBadge 
            text={slide.badge} 
            icon={slide.badgeIcon} 
            accentColor={slide.accentColor} 
          />

          {/* Headline */}
          <h1 
            className={`hero-headline font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-tight ${getHeadlineGlow()}`}
          >
            {slide.headline}
          </h1>

          {/* Subtext */}
          <p className="hero-subtext font-body text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            {slide.subtext}
          </p>

          {/* Countdown Timer */}
          <CountdownTimer 
            hours={slide.countdownHours} 
            accentColor={slide.accentColor} 
          />

          {/* CTA Button */}
          <div className="pt-4">
            <CTAButton 
              text={slide.ctaText} 
              href={slide.ctaLink} 
              accentColor={slide.accentColor} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
