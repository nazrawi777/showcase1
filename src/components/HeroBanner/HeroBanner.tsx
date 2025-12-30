import React from 'react';
import { slides } from './slideData';
import { useSlider } from './useSlider';
import SlideContent from './SlideContent';
import SlideIndicators from './SlideIndicators';
import NavigationArrows from './NavigationArrows';

const HeroBanner: React.FC = () => {
  const {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
    containerRef,
    touchHandlers,
  } = useSlider({ totalSlides: slides.length, autoplayInterval: 5000 });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-background"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      {...touchHandlers}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero banner carousel with promotional offers"
      tabIndex={0}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <SlideContent
          key={slide.id}
          slide={slide}
          isActive={currentSlide === index}
        />
      ))}

      {/* Navigation Arrows */}
      <NavigationArrows onPrev={prevSlide} onNext={nextSlide} />

      {/* Slide Indicators */}
      <SlideIndicators
        totalSlides={slides.length}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
      />

      {/* No-JS Fallback - First slide displays statically */}
      <noscript>
        <style>{`
          .hero-slide:not(:first-child) { display: none; }
          .nav-arrow, .slide-indicator { display: none; }
        `}</style>
      </noscript>
    </section>
  );
};

export default HeroBanner;
