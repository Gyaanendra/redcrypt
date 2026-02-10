/**
 * Smooth Scroll System
 * Custom smooth scrolling with arcade feel
 */

const SmoothScroll = {
  isScrolling: false,
  
  init() {
    // Add CSS for smooth scroll
    this.addSmoothScrollCSS();
    
    // Handle anchor links
    this.bindAnchorLinks();
    
    // Create back to top button
    this.createBackToTopButton();
    
    // Create scroll progress indicator
    this.createScrollProgress();
    
    // Listen for scroll events
    this.bindScrollEvents();
  },
  
  addSmoothScrollCSS() {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
      }
    `;
    document.head.appendChild(style);
  },
  
  bindAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          this.scrollTo(target);
        }
      });
    });
  },
  
  scrollTo(element, offset = 80) {
    if (this.isScrolling) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;
    
    this.isScrolling = true;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const ease = 1 - Math.pow(1 - progress, 3);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        this.isScrolling = false;
      }
    };
    
    requestAnimationFrame(animation);
  },
  
  scrollToTop() {
    this.scrollTo(document.body, 0);
  },
  
  createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.className = 'back-to-top retro-btn';
    button.innerHTML = '<i class="ph-bold ph-arrow-up"></i>';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
      this.scrollToTop();
    });
    
    this.backToTopButton = button;
  },
  
  createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    this.progressBar = progressBar;
  },
  
  bindScrollEvents() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  },
  
  handleScroll() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update progress bar
    if (this.progressBar) {
      this.progressBar.style.width = scrollPercent + '%';
    }
    
    // Show/hide back to top button
    if (this.backToTopButton) {
      if (scrollTop > 300) {
        this.backToTopButton.classList.add('visible');
      } else {
        this.backToTopButton.classList.remove('visible');
      }
    }
    
    // Reveal elements on scroll
    this.revealOnScroll();
  },
  
  revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('revealed');
      }
    });
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  SmoothScroll.init();
});

// Export
window.SmoothScroll = SmoothScroll;
