
(function() {
  'use strict';
  
  // 1. Live Light / Dark Theme Switcher
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
    });
  }

  // 2. Confetti Cannon
  window.fireConfetti = function() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // 3. Copy Email Helper with Confetti
  window.copyEmail = function(email) {
    if (!email) return;
    navigator.clipboard.writeText(email).then(() => {
      window.fireConfetti();
      const btn = document.querySelector('.copy-email-btn span');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied to Clipboard! ✓';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
    });
  };

  // 4. Interactive Project Filter Tabs
  window.filterProjects = function(category, btn) {
    document.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cards = document.querySelectorAll('.bento-projects-grid .bento-card');
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      if (category === 'all' || tags.includes(category.toLowerCase())) {
        card.style.display = 'flex';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => { card.style.display = 'none'; }, 200);
      }
    });
  };

  // 5. Interactive Skill Tag Highlighting
  window.highlightSkill = function(skillName, chip) {
    const isAlreadyActive = chip.classList.contains('active-highlight');
    document.querySelectorAll('.skill-chip').forEach(c => c.classList.remove('active-highlight'));
    document.querySelectorAll('.bento-card').forEach(c => c.style.borderColor = '');

    if (!isAlreadyActive) {
      chip.classList.add('active-highlight');
      document.querySelectorAll('.bento-card').forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        if (tags.includes(skillName.toLowerCase())) {
          card.style.borderColor = 'var(--primary)';
          card.style.boxShadow = '0 0 25px var(--glow)';
        }
      });
    }
  };

  // 6. Interactive Terminal Tabs Switcher
  window.switchTab = function(tabName, btn) {
    document.querySelectorAll('.terminal-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-code-view').forEach(v => v.style.display = 'none');
    const activeView = document.getElementById('tab-' + tabName);
    if (activeView) activeView.style.display = 'block';
  };

  // 7. 3D Card Hover Tilt Perspective
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // 8. Canvas Sparkles Particle Simulation
  const canvas = document.getElementById('sparklesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
})();