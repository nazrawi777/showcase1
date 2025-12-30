/**
 * Anime Store Hero Banner - Vanilla JavaScript
 * Production-ready slider with countdown timers
 * Pure CSS/JS animations - no external libraries
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    autoplayInterval: 5000,
    transitionDuration: 500,
    minSwipeDistance: 50,
  };

  // State
  let currentSlide = 0;
  let isPaused = false;
  let autoplayTimer = null;
  let touchStartX = null;
  let touchEndX = null;

  // DOM Elements
  const banner = document.getElementById('hero-banner');
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');
  const totalSlides = slides.length;

  // Countdown timers per slide (stored as remaining seconds)
  const countdowns = [];

  /**
   * Initialize the slider
   */
  function init() {
    if (!banner || slides.length === 0) return;

    initCountdowns();
    bindEvents();
    startAutoplay();
    updateSlide(0);
    startCountdownTimers();
  }

  /**
   * Initialize countdown data for each slide
   */
  function initCountdowns() {
    slides.forEach((slide, index) => {
      const hours = parseInt(slide.dataset.countdownHours, 10) || 24;
      const totalSeconds = hours * 3600;
      
      // Simulate a countdown that started some time ago for variety
      const now = Math.floor(Date.now() / 1000);
      const offset = (now % totalSeconds);
      const remaining = totalSeconds - offset;
      
      countdowns[index] = {
        total: totalSeconds,
        remaining: remaining
      };
    });
  }

  /**
   * Bind all event listeners
   */
  function bindEvents() {
    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
    if (nextBtn) nextBtn.addEventListener('click', goToNext);

    // Indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation
    banner.addEventListener('keydown', handleKeyDown);

    // Pause on hover/focus
    banner.addEventListener('mouseenter', pauseAutoplay);
    banner.addEventListener('mouseleave', resumeAutoplay);
    banner.addEventListener('focusin', pauseAutoplay);
    banner.addEventListener('focusout', resumeAutoplay);

    // Touch events for swipe
    banner.addEventListener('touchstart', handleTouchStart, { passive: true });
    banner.addEventListener('touchmove', handleTouchMove, { passive: true });
    banner.addEventListener('touchend', handleTouchEnd);

    // Reduced motion preference
    checkReducedMotion();
  }

  /**
   * Check for reduced motion preference
   */
  function checkReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      CONFIG.autoplayInterval = 10000; // Slower autoplay
      CONFIG.transitionDuration = 100; // Faster transitions
    }
  }

  /**
   * Go to a specific slide
   */
  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    updateSlide(index);
    currentSlide = index;
    resetAutoplay();
  }

  /**
   * Go to previous slide
   */
  function goToPrev() {
    goToSlide(currentSlide - 1);
  }

  /**
   * Go to next slide
   */
  function goToNext() {
    goToSlide(currentSlide + 1);
  }

  /**
   * Update the visible slide
   */
  function updateSlide(index) {
    // Update slides
    slides.forEach((slide, i) => {
      const content = slide.querySelector('.slide-content');
      
      if (i === index) {
        slide.classList.add('slide-active');
        slide.setAttribute('aria-hidden', 'false');
        if (content) {
          content.classList.add('hero-content-enter');
        }
      } else {
        slide.classList.remove('slide-active');
        slide.setAttribute('aria-hidden', 'true');
        if (content) {
          content.classList.remove('hero-content-enter');
        }
      }
    });

    // Update indicators
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('indicator-active');
        indicator.setAttribute('aria-selected', 'true');
        indicator.setAttribute('tabindex', '0');
      } else {
        indicator.classList.remove('indicator-active');
        indicator.setAttribute('aria-selected', 'false');
        indicator.setAttribute('tabindex', '-1');
      }
    });
  }

  /**
   * Start autoplay
   */
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (!isPaused) goToNext();
    }, CONFIG.autoplayInterval);
  }

  /**
   * Pause autoplay
   */
  function pauseAutoplay() {
    isPaused = true;
  }

  /**
   * Resume autoplay
   */
  function resumeAutoplay() {
    isPaused = false;
  }

  /**
   * Reset autoplay timer
   */
  function resetAutoplay() {
    startAutoplay();
  }

  /**
   * Handle keyboard navigation
   */
  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
    }
  }

  /**
   * Handle touch start
   */
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchEndX = null;
  }

  /**
   * Handle touch move
   */
  function handleTouchMove(e) {
    touchEndX = e.changedTouches[0].screenX;
  }

  /**
   * Handle touch end
   */
  function handleTouchEnd() {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > CONFIG.minSwipeDistance;
    const isRightSwipe = distance < -CONFIG.minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    touchStartX = null;
    touchEndX = null;
  }

  /**
   * Start countdown timers
   */
  function startCountdownTimers() {
    setInterval(updateCountdowns, 1000);
    updateCountdowns(); // Initial update
  }

  /**
   * Update all countdown timers
   */
  function updateCountdowns() {
    slides.forEach((slide, index) => {
      const countdown = countdowns[index];
      if (!countdown) return;

      // Decrease remaining time
      countdown.remaining--;
      if (countdown.remaining <= 0) {
        countdown.remaining = countdown.total;
      }

      // Calculate hours, minutes, seconds
      const hours = Math.floor(countdown.remaining / 3600);
      const minutes = Math.floor((countdown.remaining % 3600) / 60);
      const seconds = countdown.remaining % 60;

      // Update DOM
      const timerEl = slide.querySelector('.timer');
      if (timerEl) {
        const hoursEl = timerEl.querySelector('.digit-hours');
        const minutesEl = timerEl.querySelector('.digit-minutes');
        const secondsEl = timerEl.querySelector('.digit-seconds');

        if (hoursEl) {
          const newHours = String(hours).padStart(2, '0');
          if (hoursEl.textContent !== newHours) {
            hoursEl.textContent = newHours;
            animateDigit(hoursEl);
          }
        }

        if (minutesEl) {
          const newMinutes = String(minutes).padStart(2, '0');
          if (minutesEl.textContent !== newMinutes) {
            minutesEl.textContent = newMinutes;
            animateDigit(minutesEl);
          }
        }

        if (secondsEl) {
          const newSeconds = String(seconds).padStart(2, '0');
          if (secondsEl.textContent !== newSeconds) {
            secondsEl.textContent = newSeconds;
            animateDigit(secondsEl);
          }
        }

        // Update aria-label
        timerEl.setAttribute('aria-label', 
          `Sale ends in ${hours} hours, ${minutes} minutes, and ${seconds} seconds`
        );
      }
    });
  }

  /**
   * Animate a digit element
   */
  function animateDigit(el) {
    el.classList.remove('tick');
    // Trigger reflow
    void el.offsetWidth;
    el.classList.add('tick');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
