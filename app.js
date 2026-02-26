const vibes = [
  { id: 'vibe-coding', label: 'Vibe Coding', default: true },
  { id: 'adam', label: 'Adam Vibes' },
  { id: 'niels', label: 'Niels Vibes' },
  { id: 'teegan', label: 'Teegin Vibes' },
  { id: 'josh', label: 'Josh Vibes' },
  { id: 'kaleb', label: 'Kaleb Vibes' },
];

/* Theme graphics: SVGs per vibe (bright, thematic) */
const vibeThemeSVGs = {
  'vibe-coding': `<svg class="vibe-theme-svg vibe-theme-svg--coding" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="70" fill="#00ff88" font-family="monospace" font-size="28" font-weight="bold">&lt;/&gt;</text>
    <text x="30" y="110" fill="#00ffaa" font-family="monospace" font-size="18" opacity="0.9">console</text>
    <text x="90" y="140" fill="#00ff66" font-family="monospace" font-size="16" opacity="0.8">.log( vibe )</text>
    <rect x="25" y="165" width="20" height="4" fill="#00ff88" opacity="0.8"><animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite"/></rect>
  </svg>`,
  'adam': `<svg class="vibe-theme-svg vibe-theme-svg--adam" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <text x="100" y="105" fill="#ff1493" font-size="36" font-weight="bold" text-anchor="middle">Adam</text>
    <circle cx="100" cy="140" r="25" fill="none" stroke="#ff69b4" stroke-width="3" opacity="0.9"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/></circle>
    <circle cx="100" cy="140" r="15" fill="none" stroke="#ff1493" stroke-width="2" opacity="0.8"/>
  </svg>`,
  'niels': `<svg class="vibe-theme-svg vibe-theme-svg--niels" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <text x="100" y="105" fill="#00d4ff" font-size="34" font-weight="bold" text-anchor="middle">Niels</text>
    <circle cx="100" cy="145" r="28" fill="none" stroke="#00aacc" stroke-width="3" opacity="0.9"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/></circle>
  </svg>`,
  'teegan': `<svg class="vibe-theme-svg vibe-theme-svg--teegan" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <text x="100" y="105" fill="#c77dff" font-size="32" font-weight="bold" text-anchor="middle">Teegin</text>
    <circle cx="100" cy="145" r="26" fill="none" stroke="#9d4edd" stroke-width="3" opacity="0.9"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite"/></circle>
  </svg>`,
  'josh': `<svg class="vibe-theme-svg vibe-theme-svg--josh" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <text x="100" y="105" fill="#00ff88" font-size="34" font-weight="bold" text-anchor="middle">Josh</text>
    <circle cx="100" cy="145" r="28" fill="none" stroke="#00cc66" stroke-width="3" opacity="0.9"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.4s" repeatCount="indefinite"/></circle>
  </svg>`,
  'kaleb': `<svg class="vibe-theme-svg vibe-theme-svg--kaleb" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <text x="100" y="105" fill="#ff9500" font-size="34" font-weight="bold" text-anchor="middle">Kaleb</text>
    <circle cx="100" cy="145" r="28" fill="none" stroke="#ffb340" stroke-width="3" opacity="0.9"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/></circle>
  </svg>`,
};

const grid = document.getElementById('vibe-grid');
const currentVibeName = document.getElementById('current-vibe-name');
const vibeHype = document.getElementById('vibe-hype');
const vibeVisual = document.getElementById('vibe-visual');
const vibeVisualTheme = document.getElementById('vibe-visual-theme');
const confettiLayer = document.getElementById('confetti-layer');

const HYPE_MESSAGES = [
  "🔥 ABSOLUTE FIRE 🔥",
  "✨ VIBES: MAXIMUM ✨",
  "💯 CHEF'S KISS 💯",
  "🚀 TO THE MOON 🚀",
  "⭐ CRUSHING IT ⭐",
  "💥 LEGENDARY 💥",
  "🎯 PEAK VIBES ACHIEVED 🎯",
  "🌟 NO CAP, ALL VIBES 🌟",
  "⚡ UNSTOPPABLE ⚡",
  "👑 VIBE CHECK: PASSED 👑",
  "🔥 LIT 🔥",
  "💎 DIAMOND HANDS 💎",
];

const CONFETTI_COLORS = ["#ffd700", "#e8a317", "#ff6b00", "#00ff88", "#00aaff", "#ff1493", "#ff69b4", "#fff"];

let selectedId = vibes.find((v) => v.default)?.id ?? vibes[0].id;

function setVibeVisual(id) {
  if (vibeVisual) {
    vibeVisual.className = 'vibe-visual vibe-visual--' + id;
  }
  if (vibeVisualTheme && vibeThemeSVGs[id]) {
    vibeVisualTheme.innerHTML = vibeThemeSVGs[id];
    vibeVisualTheme.className = 'vibe-visual__theme vibe-visual__theme--' + id;
  }
}

function renderCards() {
  grid.innerHTML = '';
  vibes.forEach((vibe) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'vibe-card' + (vibe.id === selectedId ? ' selected' : '');
    card.dataset.vibeId = vibe.id;
    card.setAttribute('aria-pressed', vibe.id === selectedId);

    const label = document.createElement('span');
    label.className = 'vibe-label';
    label.textContent = vibe.label;
    card.appendChild(label);

    card.addEventListener('click', () => selectVibe(vibe.id, card));
    card.addEventListener('mousemove', (e) => tiltCard(e, card));
    card.addEventListener('mouseleave', () => resetTilt(card));

    grid.appendChild(card);
  });
  if (currentVibeName) {
    const selected = vibes.find((v) => v.id === selectedId);
    currentVibeName.textContent = selected ? selected.label : 'Vibe Coding';
  }
}

function selectVibe(id, cardEl) {
  selectedId = id;
  setVibeVisual(id);
  const label = vibes.find((v) => v.id === id)?.label ?? id;
  currentVibeName.textContent = label;

  document.querySelectorAll('.vibe-card').forEach((c) => {
    c.classList.remove('selected');
    c.setAttribute('aria-pressed', c.dataset.vibeId === id ? 'true' : 'false');
  });
  cardEl.classList.add('selected');
  cardEl.setAttribute('aria-pressed', 'true');

  pulseCard(cardEl);
  createRipple(cardEl);
  runCelebrationEffect(id);
  screenShake();
  if (vibeHype) {
    vibeHype.textContent = HYPE_MESSAGES[Math.floor(Math.random() * HYPE_MESSAGES.length)];
  }
  if (currentVibeName) {
    currentVibeName.classList.remove('pop');
    currentVibeName.offsetHeight;
    currentVibeName.classList.add('pop');
  }
}

const CELEBRATION_EFFECTS = {
  'vibe-coding': 'confetti',
  'adam': 'rocket',
  'niels': 'fireworks',
  'teegan': 'sparklers',
  'josh': 'shootingStars',
  'kaleb': 'fireworks',
};

function runCelebrationEffect(vibeId) {
  const effect = CELEBRATION_EFFECTS[vibeId] || 'confetti';
  if (effect === 'confetti') massiveConfetti();
  else if (effect === 'rocket') rocketBlast();
  else if (effect === 'fireworks') fireworks();
  else if (effect === 'sparklers') sparklers();
  else if (effect === 'shootingStars') shootingStars();
}

function massiveConfetti() {
  if (!confettiLayer) return;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const count = 280;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';
    el.style.left = centerX + (Math.random() - 0.5) * 120 + 'px';
    el.style.top = centerY + (Math.random() - 0.5) * 120 + 'px';
    el.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    el.style.width = (6 + Math.random() * 10) + 'px';
    el.style.height = (6 + Math.random() * 10) + 'px';
    const dx = (Math.random() - 0.5) * 900;
    const dy = (Math.random() - 0.5) * 900 - 300;
    el.style.setProperty('--dx', dx + 'px');
    el.style.setProperty('--dy', dy + 'px');
    el.style.animationDuration = 2 + Math.random() * 1.2 + 's';
    el.style.animationDelay = Math.random() * 0.3 + 's';
    confettiLayer.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

function rocketBlast() {
  if (!confettiLayer) return;
  const rocket = document.createElement('div');
  rocket.className = 'celebration-rocket';
  rocket.innerHTML = '<span class="rocket-flame"></span><span class="rocket-flame rocket-flame--2"></span><span class="rocket-flame rocket-flame--3"></span><span class="rocket-body">🚀</span>';
  rocket.style.left = '-80px';
  rocket.style.top = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2 + 'px';
  confettiLayer.appendChild(rocket);
  rocket.offsetHeight;
  rocket.classList.add('celebration-rocket--flying');
  setTimeout(() => rocket.remove(), 3200);
}

function fireworks() {
  if (!confettiLayer) return;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.35;
  const colors = ['#ff0', '#f80', '#f0f', '#0ff', '#8f8', '#ff4444'];
  for (let burst = 0; burst < 3; burst++) {
    setTimeout(() => {
      const x = centerX + (Math.random() - 0.5) * 200;
      const y = centerY + (Math.random() - 0.5) * 100;
      const particleCount = 48;
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'firework-particle';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
        const vel = 180 + Math.random() * 120;
        const tx = Math.cos(angle) * vel;
        const ty = Math.sin(angle) * vel;
        p.style.setProperty('--tx', tx + 'px');
        p.style.setProperty('--ty', ty + 'px');
        p.style.animationDelay = burst * 0.15 + 's';
        confettiLayer.appendChild(p);
        setTimeout(() => p.remove(), 2200);
      }
    }, burst * 280);
  }
}

function sparklers() {
  if (!confettiLayer) return;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const count = 120;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'sparkler-particle';
    p.style.left = centerX + (Math.random() - 0.5) * 60 + 'px';
    p.style.top = centerY + (Math.random() - 0.5) * 60 + 'px';
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 220;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    p.style.setProperty('--tx', tx + 'px');
    p.style.setProperty('--ty', ty + 'px');
    p.style.animationDuration = 0.8 + Math.random() * 0.5 + 's';
    p.style.animationDelay = Math.random() * 0.1 + 's';
    confettiLayer.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }
}

function shootingStars() {
  if (!confettiLayer) return;
  const starCount = 5;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 60 + 10 + '%';
    star.style.left = Math.random() * 30 + 5 + '%';
    star.style.animationDelay = i * 0.2 + 's';
    star.style.animationDuration = 1.2 + Math.random() * 0.4 + 's';
    confettiLayer.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  }
}

function screenShake() {
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 400);
}

function pulseCard(card) {
  card.style.transform = '';
  card.classList.remove('pulse');
  card.offsetHeight;
  card.classList.add('pulse');
  setTimeout(() => card.classList.remove('pulse'), 500);
}

function createRipple(card) {
  const rect = card.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = rect.width / 2 - size / 2 + 'px';
  ripple.style.top = rect.height / 2 - size / 2 + 'px';
  card.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function tiltCard(e, card) {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  const tiltX = y * 10;
  const tiltY = -x * 10;
  card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.15)`;
}

function resetTilt(card) {
  card.style.transform = '';
}

setVibeVisual(selectedId);
renderCards();
