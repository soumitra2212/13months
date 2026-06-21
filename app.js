/**
 * 13-Month Anniversary Website - Main Logic
 * Soumitra & Bhuvi ❤️
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Global State ----
  let heartsFound = 0;
  const TOTAL_HEARTS = 13;
  let musicPlaying = false;
  const audio = document.getElementById('bg-music');
  audio.volume = 0.5; // Set volume to 50%

  // ---- Data Structures ----
  const reasonsData = [
    { text: 'Your smile.', emoji: '😊' },
    { text: 'Your kindness.', emoji: '🌸' },
    { text: 'Your patience.', emoji: '⏳' },
    { text: 'The way you care.', emoji: '🤗' },
    { text: 'The way you understand me.', emoji: '🫂' },
    { text: 'Your laugh.', emoji: '😂' },
    { text: 'Your beautiful eyes.', emoji: '👀' },
    { text: 'Your support.', emoji: '💪' },
    { text: 'Your honesty.', emoji: '🗣️' },
    { text: 'Your strength.', emoji: '🦸‍♀️' },
    { text: 'Your warmth.', emoji: '🔥' },
    { text: 'The happiness you bring.', emoji: '☀️' },
    { text: 'Simply because you\'re you.', emoji: '❤️' }
  ];



  const finaleSequence = [
    "13 months ago...",
    "You became my favorite hello.",
    "My safest place.",
    "My happiest memory.",
    "My greatest blessing."
  ];

  // ---- Particle System (Background) ----
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? 'rgba(255, 107, 157, 0.5)' : 'rgba(196, 113, 237, 0.5)';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    // Occasional shooting stars
    setInterval(() => {
      if (Math.random() > 0.7) createShootingStar();
    }, 4000);
  }

  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * (window.innerHeight / 2) + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1000);
  }

  function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['❤️', '💖', '💗', '💓'][Math.floor(Math.random() * 4)];
    heart.style.left = (x || Math.random() * window.innerWidth) + 'px';
    if (y) heart.style.top = y + 'px';
    heart.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
    heart.style.setProperty('--duration', (Math.random() * 2 + 3) + 's');
    heart.style.setProperty('--heart-size', (Math.random() * 1 + 1) + 'rem');
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }

  // ---- Envelope Opening (Section 0) ----
  function initEnvelope() {
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelope = document.getElementById('envelope');
    const mainContent = document.getElementById('main-content');
    const musicToggle = document.getElementById('music-toggle');

    envelope.addEventListener('click', () => {
      // Animate envelope opening
      envelope.classList.add('open');
      
      // Try to play music
      tryPlayMusic();
      
      // Hide envelope overlay, show main content
      setTimeout(() => {
        envelopeOverlay.classList.add('hidden');
        mainContent.classList.add('visible');
        musicToggle.style.display = 'flex';
        document.body.style.overflowY = 'auto'; // Re-enable scrolling
        

      }, 1500);

      // Heart burst
      for(let i=0; i<15; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
      }
    });

    // Disable scrolling while envelope is active
    document.body.style.overflow = 'hidden';
  }

  // ---- Music Logic ----
  function tryPlayMusic() {
    if (audio.src && audio.src.includes('music.mp3')) {
      audio.play().then(() => {
        musicPlaying = true;
        updateMusicIcon();
      }).catch(e => console.log("Audio play failed, user interaction might be needed further.", e));
    }
  }

  function updateMusicIcon() {
    const toggle = document.getElementById('music-toggle');
    if (musicPlaying) {
      toggle.innerHTML = '🔊';
      toggle.classList.add('playing');
    } else {
      toggle.innerHTML = '🔇';
      toggle.classList.remove('playing');
    }
  }

  document.getElementById('music-toggle').addEventListener('click', () => {
    if (musicPlaying) {
      audio.pause();
      musicPlaying = false;
    } else {
      audio.play();
      musicPlaying = true;
    }
    updateMusicIcon();
  });




  // ---- 13 Reasons (Section 3) ----
  function initReasons() {
    const grid = document.getElementById('reasons-grid');
    
    reasonsData.forEach((reason, index) => {
      const el = document.createElement('div');
      el.className = 'reason-card-wrapper';
      el.innerHTML = `
        <div class="reason-card">
          <div class="reason-front">
            <div class="reason-number">#${index + 1}</div>
            <div class="reason-prompt">Click to reveal</div>
          </div>
          <div class="reason-back">
            <div class="reason-emoji">${reason.emoji}</div>
            <div class="reason-text">${reason.text}</div>
          </div>
        </div>
      `;

      const card = el.querySelector('.reason-card');
      card.addEventListener('click', function() {
        this.classList.toggle('flipped');
      });

      grid.appendChild(el);
    });
  }

  // ---- Love Meter (Section 4) ----
  function initLoveMeter() {
    const btn = document.getElementById('measure-love-btn');
    const fill = document.getElementById('meter-fill');
    const text = document.getElementById('meter-text');
    const errorMsg = document.getElementById('meter-error-msg');
    const display = document.querySelector('.meter-display');
    
    let isMeasuring = false;

    btn.addEventListener('click', () => {
      if (isMeasuring) return;
      isMeasuring = true;
      btn.disabled = true;
      btn.textContent = "Calculating...";
      
      let percent = 0;
      fill.classList.add('active');
      
      const interval = setInterval(() => {
        // Accelerating increase
        percent += Math.pow(1.5, percent / 20) + 1;
        
        if (percent > 100 && percent < 1000) {
           text.style.color = '#ff6b9d';
        } else if (percent >= 1000 && percent < 10000) {
           text.style.color = '#c471ed';
           display.classList.add('meter-shake'); // defined in css as shake
        } else if (percent >= 100000) {
           display.classList.add('meter-glitch');
        }

        if (percent > 1000000) {
          clearInterval(interval);
          text.textContent = "∞";
          errorMsg.classList.add('visible');
          btn.textContent = "Unmeasurable ❤️";
        } else {
          text.textContent = Math.floor(percent);
          // Visual fill cap at 100%
          const visualPercent = Math.min(percent, 100);
          fill.style.setProperty('--meter-percent', visualPercent + '%');
        }
      }, 50);
    });
  }



  // ---- 13 Months Counter (Section 6) ----
  function initCounter() {
    // Start date: May 22, 2025
    const startDate = new Date('2025-05-22T00:00:00');
    
    const elMonths = document.getElementById('count-months');
    const elDays = document.getElementById('count-days');
    const elHours = document.getElementById('count-hours');
    const elMinutes = document.getElementById('count-minutes');
    const elSeconds = document.getElementById('count-seconds');

    function update() {
      const now = new Date();
      let diff = now.getTime() - startDate.getTime();
      
      if (diff < 0) diff = 0; // Prevent negative if testing dates

      // Approximate month calculation (assuming 30.44 days per month)
      const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(daysTotal / 30.436875);
      const days = Math.floor(daysTotal % 30.436875);
      
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      elMonths.textContent = months;
      elDays.textContent = days;
      elHours.textContent = hours;
      elMinutes.textContent = minutes;
      elSeconds.textContent = seconds;
    }

    setInterval(update, 1000);
    update();
  }

  // ---- Hidden Hearts Hunt (Section 7) ----
  function initHiddenHearts() {
    const counterDiv = document.getElementById('hearts-counter');
    const countDisplay = document.getElementById('hearts-found');
    const modal = document.getElementById('hearts-success-modal');
    
    // Create random hearts across sections
    const sections = ['reasons', 'lovemeter', 'counter', 'finale'];
    
    for(let i=0; i<TOTAL_HEARTS; i++) {
      const heart = document.createElement('div');
      heart.className = 'hidden-heart';
      heart.textContent = '❤️';
      heart.title = "You found a piece of my heart!";
      
      // Random positioning
      heart.style.top = Math.random() * 80 + 10 + '%';
      heart.style.left = Math.random() * 80 + 10 + '%';
      
      heart.addEventListener('click', function() {
        if (this.classList.contains('found')) return;
        
        this.classList.add('found');
        heartsFound++;
        countDisplay.textContent = heartsFound;
        counterDiv.classList.add('show'); // show UI if not visible
        
        // Pop animation
        createFloatingHeart(this.getBoundingClientRect().left, this.getBoundingClientRect().top);

        if (heartsFound === TOTAL_HEARTS) {
          setTimeout(() => {
            modal.classList.add('active');
          }, 1000);
        }
      });

      // Append to a random section
      const randomSectionId = sections[Math.floor(Math.random() * sections.length)];
      document.getElementById(randomSectionId).appendChild(heart);
    }

    document.getElementById('close-hearts-modal').addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }



  // ---- Cinematic Finale (Section 9) ----
  function initFinale() {
    const container = document.getElementById('finale-container');
    
    // Inject lines
    finaleSequence.forEach(text => {
      const p = document.createElement('p');
      p.className = 'finale-line';
      p.textContent = text;
      container.appendChild(p);
    });

    // Add final reveal elements
    const h1 = document.createElement('h1');
    h1.className = 'finale-big';
    h1.innerHTML = '❤️ Happy 13 Months Bhuvi ❤️';
    container.appendChild(h1);

    const h2 = document.createElement('h2');
    h2.className = 'finale-sub';
    h2.textContent = 'Forever My Favorite Person';
    container.appendChild(h2);

    const btn = document.createElement('button');
    btn.className = 'finale-letter-button';
    btn.textContent = 'Open My Final Letter 💌';
    container.appendChild(btn);

    // Letter Modal Logic
    const letterModal = document.getElementById('letter-modal');
    btn.style.pointerEvents = 'auto'; // Force clickability
    btn.addEventListener('click', () => {
      console.log('Letter button clicked!');
      letterModal.classList.add('active');
      // Fallback to guarantee it shows if CSS fails
      letterModal.style.visibility = 'visible';
      letterModal.style.opacity = '1';
    });
    document.getElementById('letter-close').addEventListener('click', () => {
      letterModal.classList.remove('active');
      letterModal.style.visibility = 'hidden';
      letterModal.style.opacity = '0';
    });

    // Scroll trigger for sequence
    const lines = container.querySelectorAll('.finale-line');
    
    // Use intersection observer to reveal lines one by one as user scrolls
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // If it's the last line, trigger the big reveal shortly after
          if (entry.target === lines[lines.length - 1]) {
             setTimeout(() => {
               h1.classList.add('visible');
               h2.classList.add('visible');
               btn.classList.add('visible');
               
               // Fireworks effect
               for(let i=0; i<30; i++) {
                 setTimeout(() => createFloatingHeart(), i*100);
               }
             }, 1500);
          }
        }
      });
    }, { threshold: 0.5, rootMargin: '-10% 0px' });

    lines.forEach(line => observer.observe(line));
  }


  // ---- Initialization Sequence ----
  initParticles();
  initEnvelope();
  // Call others that don't depend on canvas dimensions heavily
  initReasons();
  initLoveMeter();

  initCounter();
  initHiddenHearts();

  initFinale();

});
