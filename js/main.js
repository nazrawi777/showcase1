(function() {
  'use strict';
  const CONFIG = {
    autoplayInterval: 5000,
    transitionDuration: 500,
    minSwipeDistance: 50,
  };
  let currentSlide = 0;
  let isPaused = false;
  let autoplayTimer = null;
  let touchStartX = null;
  let touchEndX = null;
  const banner = document.getElementById('hero-banner');
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');
  const totalSlides = slides.length;
  const countdowns = [];

  function init() {
    if (!banner || slides.length === 0) return;
    initCountdowns();
    bindEvents();
    startAutoplay();
    updateSlide(0);
    startCountdownTimers();
  }

  function initCountdowns() {
    slides.forEach((slide, index) => {
      const hours = parseInt(slide.dataset.countdownHours, 10) || 24;
      const totalSeconds = hours * 3600;
      const now = Math.floor(Date.now() / 1000);
      const offset = (now % totalSeconds);
      const remaining = totalSeconds - offset;
      countdowns[index] = { total: totalSeconds, remaining: remaining };
    });
  }

  function bindEvents() {
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index));
    });
    banner.addEventListener('keydown', handleKeyDown);
    banner.addEventListener('mouseenter', pauseAutoplay);
    banner.addEventListener('mouseleave', resumeAutoplay);
    banner.addEventListener('focusin', pauseAutoplay);
    banner.addEventListener('focusout', resumeAutoplay);
    banner.addEventListener('touchstart', handleTouchStart, { passive: true });
    banner.addEventListener('touchmove', handleTouchMove, { passive: true });
    banner.addEventListener('touchend', handleTouchEnd);
    checkReducedMotion();
  }

  function checkReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      CONFIG.autoplayInterval = 10000;
      CONFIG.transitionDuration = 100;
    }
  }

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    updateSlide(index);
    currentSlide = index;
    resetAutoplay();
  }

  function goToPrev() { goToSlide(currentSlide - 1); }
  function goToNext() { goToSlide(currentSlide + 1); }

  function updateSlide(index) {
    slides.forEach((slide, i) => {
      const content = slide.querySelector('.slide-content');
      if (i === index) {
        slide.classList.add('slide-active');
        slide.setAttribute('aria-hidden', 'false');
        if (content) content.classList.add('hero-content-enter');
      } else {
        slide.classList.remove('slide-active');
        slide.setAttribute('aria-hidden', 'true');
        if (content) content.classList.remove('hero-content-enter');
      }
    });
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

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => { if (!isPaused) goToNext(); }, CONFIG.autoplayInterval);
  }

  function pauseAutoplay() { isPaused = true; }
  function resumeAutoplay() { isPaused = false; }
  function resetAutoplay() { startAutoplay(); }

  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft': e.preventDefault(); goToPrev(); break;
      case 'ArrowRight': e.preventDefault(); goToNext(); break;
      case 'Home': e.preventDefault(); goToSlide(0); break;
      case 'End': e.preventDefault(); goToSlide(totalSlides - 1); break;
    }
  }

  function handleTouchStart(e) { touchStartX = e.changedTouches[0].screenX; touchEndX = null; }
  function handleTouchMove(e) { touchEndX = e.changedTouches[0].screenX; }
  function handleTouchEnd() {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > CONFIG.minSwipeDistance) goToNext();
    else if (distance < -CONFIG.minSwipeDistance) goToPrev();
    touchStartX = null;
    touchEndX = null;
  }

  function startCountdownTimers() {
    setInterval(updateCountdowns, 1000);
    updateCountdowns();
  }

  function updateCountdowns() {
    slides.forEach((slide, index) => {
      const countdown = countdowns[index];
      if (!countdown) return;
      countdown.remaining--;
      if (countdown.remaining <= 0) countdown.remaining = countdown.total;
      const hours = Math.floor(countdown.remaining / 3600);
      const minutes = Math.floor((countdown.remaining % 3600) / 60);
      const seconds = countdown.remaining % 60;
      const timerEl = slide.querySelector('.timer');
      if (timerEl) {
        const hoursEl = timerEl.querySelector('.digit-hours');
        const minutesEl = timerEl.querySelector('.digit-minutes');
        const secondsEl = timerEl.querySelector('.digit-seconds');
        if (hoursEl) { const newHours = String(hours).padStart(2, '0'); if (hoursEl.textContent !== newHours) { hoursEl.textContent = newHours; animateDigit(hoursEl); } }
        if (minutesEl) { const newMinutes = String(minutes).padStart(2, '0'); if (minutesEl.textContent !== newMinutes) { minutesEl.textContent = newMinutes; animateDigit(minutesEl); } }
        if (secondsEl) { const newSeconds = String(seconds).padStart(2, '0'); if (secondsEl.textContent !== newSeconds) { secondsEl.textContent = newSeconds; animateDigit(secondsEl); } }
        timerEl.setAttribute('aria-label', `Sale ends in ${hours} hours, ${minutes} minutes, and ${seconds} seconds`);
      }
    });
  }

  function animateDigit(el) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

})();
