/**
 * Arcade Effects - Enhanced Retro 8-bit Gaming Experience
 * Professional arcade-style animations and effects - MORE INTENSE VERSION
 */

// Screen Effects Module - ENHANCED
const ScreenEffects = {
  shake(element = document.body, intensity = 8) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    element.classList.add('screen-shake');
    // Add RGB shift effect during shake
    element.style.filter = 'hue-rotate(5deg)';
    setTimeout(() => {
      element.classList.remove('screen-shake');
      element.style.filter = '';
    }, 500);
  },
  
  flash(type = 'success') {
    // Screen flash disabled
    return;
  },
  
  glitch(element) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    // Add RGB separation
    element.style.textShadow = `
      2px 0 #ff0000,
      -2px 0 #00ffff
    `;
    element.classList.add('glitch-effect');
    
    setTimeout(() => {
      element.classList.remove('glitch-effect');
      element.style.textShadow = '';
    }, 300);
  },
  
  // New: Chromatic aberration effect
  chromaticAberration(element) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    element.style.filter = 'hue-rotate(10deg) saturate(1.2)';
    setTimeout(() => {
      element.style.filter = '';
    }, 200);
  }
};

// Button Feedback Module - ENHANCED
const ButtonEffects = {
  init() {
    document.querySelectorAll('.retro-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.createRipple(e, btn);
        this.playPressAnimation(btn);
        // Screen flash removed for faster redirects
      });
      
      // Subtle hover effect only
      btn.addEventListener('mouseenter', () => {
        // Visual sound removed for performance
      });
    });
  },
  
  createRipple(event, button) {
    // Ripple effect disabled for faster redirects
    return;
  },
  
  playPressAnimation(button) {
    // Button click effects completely disabled
    return;
  }
};

// 8-bit Particle System - ENHANCED (More particles, more impact)
const ParticleSystem = {
  create(x, y, color = '#08b74f', count = 12) { // Increased from 8 to 12
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const particles = [];
    const colors = [color, '#fec84b', '#f07a1a', '#ddcfb5', '#08b74f', '#ff00ff'];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5; // Add randomness
      const velocity = 3 + Math.random() * 4; // Faster velocity
      const particleColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Random particle shapes
      const shapes = ['0%', '20%', '50%'];
      const borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
      
      particle.style.cssText = `
        position: fixed;
        width: ${4 + Math.random() * 4}px;
        height: ${4 + Math.random() * 4}px;
        background: ${particleColor};
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 99999;
        box-shadow: 
          0 0 6px ${particleColor},
          0 0 12px ${particleColor};
        border-radius: ${borderRadius};
      `;
      
      document.body.appendChild(particle);
      particles.push({
        element: particle,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.01 // Variable decay
      });
    }
    
    this.animate(particles);
  },
  
  animate(particles) {
    const update = () => {
      let active = false;
      particles.forEach(p => {
        if (p.life > 0) {
          active = true;
          p.life -= p.decay;
          const currentX = parseFloat(p.element.style.left);
          const currentY = parseFloat(p.element.style.top);
          
          // Enhanced physics with gravity and rotation
          p.element.style.left = `${currentX + p.vx}px`;
          p.element.style.top = `${currentY + p.vy + 1}px`; // Stronger gravity
          p.element.style.opacity = p.life;
          p.element.style.transform = `rotate(${p.life * 360}deg)`; // Add rotation
          
          // Trail effect
          if (p.life > 0.5 && Math.random() > 0.7) {
            this.createTrail(currentX, currentY, p.element.style.background);
          }
        } else {
          p.element.remove();
        }
      });
      
      if (active) requestAnimationFrame(update);
    };
    update();
  },
  
  createTrail(x, y, color) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      width: 3px;
      height: 3px;
      background: ${color};
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 99998;
      opacity: 0.5;
      border-radius: 50%;
    `;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 300);
  }
};

// Arcade Loading Animation
const LoadingEffects = {
  show(text = 'LOADING') {
    const loader = document.createElement('div');
    loader.id = 'arcade-loader';
    loader.innerHTML = `
      <div class="loader-container">
        <div class="loader-text">${text}</div>
        <div class="loader-bar">
          <div class="loader-progress"></div>
        </div>
        <div class="loader-dots"><span>.</span><span>.</span><span>.</span></div>
      </div>
    `;
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(26, 17, 8, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100000;
      font-family: 'Press Start 2P', cursive;
    `;
    document.body.appendChild(loader);
    return loader;
  },
  
  hide() {
    const loader = document.getElementById('arcade-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.3s';
      setTimeout(() => loader.remove(), 300);
    }
  },
  
  updateProgress(percent) {
    const progress = document.querySelector('.loader-progress');
    if (progress) progress.style.width = `${percent}%`;
  }
};

// Attract Mode (Idle Animation) - FASTER ACTIVATION
const AttractMode = {
  timeout: null,
  idleTime: 20000, // Reduced from 30000 to 20000 (20 seconds)
  isActive: false,
  
  init() {
    this.resetTimer();
    ['mousemove', 'keypress', 'click', 'touchstart', 'scroll'].forEach(event => {
      document.addEventListener(event, () => this.resetTimer());
    });
  },
  
  resetTimer() {
    clearTimeout(this.timeout);
    if (this.isActive) this.stop();
    this.timeout = setTimeout(() => this.start(), this.idleTime);
  },
  
  start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    this.isActive = true;
    document.body.classList.add('attract-mode');
    
    // More aggressive floating
    const title = document.querySelector('h1');
    if (title) {
      title.classList.add('attract-float');
      title.style.animationDuration = '2s'; // Faster animation
    }
    
    // Multiple blinking elements
    document.querySelectorAll('.retro-btn').forEach((btn, index) => {
      setTimeout(() => {
        btn.classList.add('press-start-blink');
      }, index * 200);
    });
  },
  
  stop() {
    this.isActive = false;
    document.body.classList.remove('attract-mode');
    
    const title = document.querySelector('h1');
    if (title) {
      title.classList.remove('attract-float');
      title.style.animationDuration = '';
    }
    
    document.querySelectorAll('.retro-btn').forEach(btn => {
      btn.classList.remove('press-start-blink');
    });
  }
};

// Visual Sound Effects - ENHANCED
const VisualSound = {
  play(type = 'click') {
    const effects = {
      click: { color: '#08b74f', size: 40, duration: 600 },
      hover: { color: '#08b74f', size: 25, duration: 400 },
      success: { color: '#0ac955', size: 50, duration: 800 },
      error: { color: '#dc2626', size: 50, duration: 800 },
      coin: { color: '#fec84b', size: 45, duration: 700 }
    };
    
    const effect = effects[type];
    if (effect) {
      this.showWave(effect.color, effect.size, effect.duration);
    }
  },
  
  showWave(color, size = 40, duration = 600) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const wave = document.createElement('div');
    wave.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: ${size}px;
      height: ${size}px;
      border: 4px solid ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      box-shadow: 0 0 20px ${color}, 0 0 40px ${color};
      animation: soundWave ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `;
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), duration);
  }
};

// Score Counter Animation - ENHANCED
const ScoreCounter = {
  animate(element, targetValue, duration = 1200) { // Slightly slower for drama
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = targetValue.toLocaleString();
      return;
    }
    
    const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const startTime = performance.now();
    
    // Add counting sound effect visual
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        VisualSound.play('click');
      }
    }, 100);
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // More dramatic easing
      const current = Math.floor(startValue + (targetValue - startValue) * easeProgress);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        clearInterval(interval);
        element.textContent = targetValue.toLocaleString();
        // Success flash when done
        element.classList.add('score-updated');
        ScreenEffects.flash('success');
        setTimeout(() => element.classList.remove('score-updated'), 500);
      }
    };
    
    requestAnimationFrame(update);
  }
};

// Text Scramble Effect - ENHANCED
const TextScramble = {
  chars: '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  
  scramble(element, finalText, duration = 1500) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = finalText;
      return;
    }
    
    let iteration = 0;
    const totalIterations = finalText.length * 4; // More iterations
    
    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 4) return finalText[index];
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');
      
      // Add glitch effect during scramble
      if (iteration % 5 === 0) {
        element.style.textShadow = `
          ${Math.random() * 4 - 2}px 0 #ff0000,
          ${Math.random() * 4 - 2}px 0 #00ffff
        `;
      }
      
      iteration++;
      
      if (iteration >= totalIterations) {
        clearInterval(interval);
        element.textContent = finalText;
        element.style.textShadow = '';
        ScreenEffects.flash('success');
      }
    }, duration / totalIterations);
  }
};

// Typewriter Effect
const Typewriter = {
  type(element, text, speed = 40) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = text;
      return;
    }
    
    element.textContent = '';
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        // Variable speed for realism
        const variableSpeed = speed + (Math.random() - 0.5) * 20;
        setTimeout(type, Math.max(10, variableSpeed));
      }
    };
    
    type();
  }
};

// Random Glitch Trigger - SUBTLE VERSION
const RandomGlitch = {
  init() {
    // Random glitch on headings every 15-20 seconds (less frequent)
    setInterval(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (Math.random() > 0.85) { // Only 15% chance
        const headings = document.querySelectorAll('h1, h2');
        const randomHeading = headings[Math.floor(Math.random() * headings.length)];
        if (randomHeading) {
          ScreenEffects.glitch(randomHeading);
        }
      }
    }, 18000);
    
    // Random screen flicker - very rare
    setInterval(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (Math.random() > 0.95) { // Only 5% chance
        document.body.style.opacity = '0.98';
        setTimeout(() => {
          document.body.style.opacity = '1';
        }, 40);
      }
    }, 5000);
  }
};

// Main Initialization - ENHANCED
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all effects
  ButtonEffects.init();
  AttractMode.init();
  RandomGlitch.init(); // Start random glitches
  
  // Click effects removed for faster redirects
  // Particles and visual sound disabled to prevent redirect delays
  
  // Form validation - no visual effects
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        // All click effects disabled
      }
    });
  });
  
  // Glitch effect on headings hover - MORE FREQUENT
  document.querySelectorAll('h1, h2').forEach(heading => {
    heading.addEventListener('mouseenter', () => {
      ScreenEffects.glitch(heading);
      // Double glitch for extra effect
      setTimeout(() => ScreenEffects.glitch(heading), 150);
    });
  });
  
  // Animate score numbers on page load - ENHANCED
  document.querySelectorAll('.score-number').forEach(el => {
    const value = parseInt(el.dataset.value) || parseInt(el.textContent);
    if (value) {
      el.textContent = '0';
      setTimeout(() => {
        ScoreCounter.animate(el, value);
      }, 800);
    }
  });
  
  // Scramble text effect on load
  document.querySelectorAll('.scramble-text').forEach(el => {
    const finalText = el.textContent;
    el.textContent = '';
    setTimeout(() => {
      TextScramble.scramble(el, finalText);
    }, 500);
  });
  
  // Add breathing animation to cards
  document.querySelectorAll('.retro-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
});

// Export for global access
window.ArcadeEffects = {
  ScreenEffects,
  ButtonEffects,
  ParticleSystem,
  LoadingEffects,
  AttractMode,
  VisualSound,
  ScoreCounter,
  TextScramble,
  Typewriter,
  RandomGlitch
};
