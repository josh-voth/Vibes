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
  miniConfetti();
  runCelebrationEffect(id);
  if (id === 'teegan') handleTeeginClick();
  if (id === 'kaleb') {
    setTimeout(() => {
      window.location.href = "https://www.google.com/search?q=rickrolling+video+no+adds&sca_esv=9be18ee3e64d646c&rlz=1C1GCEV_enUS1200US1200&biw=1536&bih=695&ei=MwOhacnwLIC4wN4PvNyfsAI&ved=0ahUKEwiJ1vDY0fiSAxUAHNAFHTzuByYQ4dUDCBE&uact=5&oq=rickrolling+video+no+adds&gs_lp=Egxnd3Mtd2l6LXNlcnAiGXJpY2tyb2xsaW5nIHZpZGVvIG5vIGFkZHMyBhAAGBYYHjILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFSKsQUMwDWJIPcAF4AJABAJgBXaAB_wSqAQE5uAEDyAEA-AEBmAIJoALxBMICChAAGLADGNYEGEfCAgUQABjvBZgDAIgGAZAGCJIHATmgB-ctsgcBOLgH7gTCBwMxLjjIBxCACAA&sclient=gws-wiz-serp#fpstate=ive&vld=cid:0f33c3b6,vid:2qBlE2-WL60,st:0";
    }, 2000);
  }
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

function miniConfetti() {
  if (!confettiLayer) return;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const count = 42;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';
    el.style.left = centerX + (Math.random() - 0.5) * 60 + 'px';
    el.style.top = centerY + (Math.random() - 0.5) * 60 + 'px';
    el.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    el.style.width = (5 + Math.random() * 8) + 'px';
    el.style.height = (5 + Math.random() * 8) + 'px';
    const dx = (Math.random() - 0.5) * 400;
    const dy = (Math.random() - 0.5) * 400 - 150;
    el.style.setProperty('--dx', dx + 'px');
    el.style.setProperty('--dy', dy + 'px');
    el.style.animationDuration = 1.2 + Math.random() * 0.6 + 's';
    el.style.animationDelay = Math.random() * 0.05 + 's';
    confettiLayer.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
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

function playScream() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const duration = 1.2;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      const freq = 200 + 800 * (1 - Math.exp(-t * 3));
      const env = Math.sin(Math.PI * t / duration) * (0.3 + 0.7 * Math.random());
      data[i] = env * Math.sin(2 * Math.PI * freq * t) * 0.4;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start(0);
  } catch (_) {}
}

function showScaryFace() {
  const overlay = document.createElement('div');
  overlay.className = 'scary-face-overlay';
  overlay.innerHTML = `<svg class="scary-face-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="100" rx="85" ry="95" fill="#1a0a0a" stroke="#330000" stroke-width="4"/>
    <ellipse cx="65" cy="75" rx="22" ry="28" fill="#fff"/><ellipse cx="135" cy="75" rx="22" ry="28" fill="#fff"/>
    <circle cx="68" cy="78" r="8" fill="#000"/><circle cx="138" cy="78" r="8" fill="#000"/>
    <path d="M50 120 Q100 165 150 120" stroke="#330000" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M70 125 L80 140 L95 128 L110 142 L125 128 L130 140" fill="#1a0a0a" stroke="#330000" stroke-width="2"/>
    <path d="M40 55 L55 45 M160 55 L145 45" stroke="#330000" stroke-width="3" fill="none"/>
  </svg>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('scary-face-overlay--zoom'));
  setTimeout(() => overlay.classList.add('scary-face-overlay--shake'), 350);
  setTimeout(() => {
    overlay.classList.add('scary-face-overlay--out');
    setTimeout(() => overlay.remove(), 600);
  }, 2000);
}

function kalebScare() {
  playScream();
  showScaryFace();
}

/* Teegin Easter egg: 5 clicks within 4s triggers glitch sequence */
let teeginClicks = 0;
let teeginResetTimer = null;

function handleTeeginClick() {
  teeginClicks++;
  if (teeginResetTimer) clearTimeout(teeginResetTimer);
  teeginResetTimer = setTimeout(() => {
    teeginClicks = 0;
    teeginResetTimer = null;
  }, 4000);
  if (teeginClicks >= 5) {
    if (teeginResetTimer) clearTimeout(teeginResetTimer);
    teeginResetTimer = null;
    teeginClicks = 0;
    runTeeginSequence();
  }
}

const TEEGIN_TERMINAL_LINES = [
  "> ACCESS GRANTED",
  "> LOADING TEEGIN.EXE",
  "> INJECTING VIBES...",
  "> VIBES.EXE CORRUPTED",
  "> MAXIMUM MODE ENGAGED",
  "> ERROR: TOO MUCH VIBE",
  "> DONE. HAVE A NICE DAY.",
];

function runTeeginSequence() {
  const overlay = document.createElement("div");
  overlay.className = "glitch-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const scanlines = document.createElement("div");
  scanlines.className = "glitch-overlay__scanlines";
  const vignette = document.createElement("div");
  vignette.className = "glitch-overlay__vignette";
  const chromatic = document.createElement("div");
  chromatic.className = "glitch-overlay__chromatic";
  const tears = document.createElement("div");
  tears.className = "glitch-overlay__tears";
  for (let i = 0; i < 12; i++) {
    const tear = document.createElement("div");
    tear.className = "glitch-tear";
    tears.appendChild(tear);
  }
  const terminalWrap = document.createElement("div");
  terminalWrap.className = "glitch-overlay__terminal";
  const terminal = document.createElement("div");
  terminal.className = "glitch-terminal";
  terminal.innerHTML = '<div class="glitch-terminal__line"></div><span class="glitch-terminal__cursor"></span>';
  terminalWrap.appendChild(terminal);
  const staticEl = document.createElement("div");
  staticEl.className = "glitch-overlay__static";

  overlay.appendChild(scanlines);
  overlay.appendChild(vignette);
  overlay.appendChild(chromatic);
  overlay.appendChild(tears);
  overlay.appendChild(terminalWrap);
  overlay.appendChild(staticEl);
  document.body.appendChild(overlay);

  playGlitchBeep();

  const lineEl = terminal.querySelector(".glitch-terminal__line");
  const cursorEl = terminal.querySelector(".glitch-terminal__cursor");
  let lineIndex = 0;
  let charIndex = 0;

  function typeNext() {
    if (lineIndex >= TEEGIN_TERMINAL_LINES.length) {
      setTimeout(() => startShutdown(), 3000);
      return;
    }
    const line = TEEGIN_TERMINAL_LINES[lineIndex];
    if (charIndex < line.length) {
      lineEl.textContent += line[charIndex];
      charIndex++;
      setTimeout(typeNext, 22 + Math.random() * 18);
    } else {
      lineEl.textContent += "\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 120 + Math.random() * 80);
    }
  }

  function startShutdown() {
    lineEl.textContent += "\n> SHUTTING DOWN...";
    cursorEl.style.display = "none";
    doStaticFlash();
    setTimeout(() => {
      overlay.classList.add("glitch-overlay--black");
      setTimeout(() => {
        overlay.classList.add("glitch-overlay--swirl");
        setTimeout(() => overlay.remove(), 1600);
      }, 3000);
    }, 1800);
  }

  typeNext();

  setTimeout(() => {
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 400);
  }, 800);

  function doStaticFlash() {
    staticEl.classList.remove("glitch-overlay__static--flash");
    staticEl.offsetHeight;
    staticEl.classList.add("glitch-overlay__static--flash");
    setTimeout(() => staticEl.classList.remove("glitch-overlay__static--flash"), 150);
  }

  setTimeout(doStaticFlash, 600);
  setTimeout(doStaticFlash, 2200);
  setTimeout(doStaticFlash, 3800);
}

function playGlitchBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
    osc.type = "square";
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);
  } catch (_) {}
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

/* Custom cursor: emoji trail + burst on clickable hover */
(function () {
  const cursorLayer = document.getElementById('cursor-layer');
  const customCursor = document.getElementById('custom-cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  if (!cursorLayer || !customCursor || !cursorTrail) return;

  const TRAIL_EMOJIS = ['🔮', '✨', '🌈'];
  const BURST_COLORS = ['#ffd700', '#ff69b4', '#00d4ff', '#00ff88', '#c77dff', '#ff9500'];
  let mouseX = 0, mouseY = 0;
  let trailTick = 0;
  let isOverClickable = false;

  customCursor.textContent = '🔮';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    customCursor.style.left = mouseX + 'px';
    customCursor.style.top = mouseY + 'px';

    trailTick++;
    if (trailTick % 4 === 0) {
      const p = document.createElement('span');
      p.className = 'cursor-trail-particle';
      p.textContent = TRAIL_EMOJIS[Math.floor(Math.random() * TRAIL_EMOJIS.length)];
      p.style.left = mouseX + 'px';
      p.style.top = mouseY + 'px';
      const tx = (Math.random() - 0.5) * 40;
      const ty = (Math.random() - 0.5) * 40 - 20;
      p.style.setProperty('--tx', tx + 'px');
      p.style.setProperty('--ty', ty + 'px');
      cursorTrail.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  });

  document.body.addEventListener('mouseover', (e) => {
    const target = e.target;
    const clickable = target.closest('button, a[href], [role="button"], .vibe-card');
    if (clickable && !isOverClickable) {
      isOverClickable = true;
      customCursor.classList.add('cursor--hover');
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('span');
        p.className = 'cursor-burst-particle';
        p.style.left = mouseX + 'px';
        p.style.top = mouseY + 'px';
        const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 50 + Math.random() * 60;
        const bx = Math.cos(angle) * dist;
        const by = Math.sin(angle) * dist;
        p.style.setProperty('--bx', bx + 'px');
        p.style.setProperty('--by', by + 'px');
        p.style.background = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
        p.style.animationDuration = 0.4 + Math.random() * 0.2 + 's';
        cursorTrail.appendChild(p);
        setTimeout(() => p.remove(), 600);
      }
    }
  });

  document.body.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest('button, a[href], [role="button"], .vibe-card')) {
      isOverClickable = false;
      customCursor.classList.remove('cursor--hover');
    }
  });
})();
