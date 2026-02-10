/**
 * Landing Animation - Simple Fade In
 * Minimal intro animation for homepage
 */

const LandingAnimation = {
  init() {
    // Only run simple fade in
    this.simpleFadeIn();
  },
  
  simpleFadeIn() {
    // Add fade-in class to body
    document.body.classList.add('loaded');
    
    // Simple element animations
    const elements = document.querySelectorAll('.landing-animate');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Only run on homepage
  if (document.body.classList.contains('home-page') || 
      window.location.pathname === '/' || 
      window.location.pathname === '/index/') {
    LandingAnimation.init();
  }
});

// Export for global access
window.LandingAnimation = LandingAnimation;
