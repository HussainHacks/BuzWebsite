/* ============================================
   CYBERPUNK MISSION CONTROL — MAIN SCRIPT
   ============================================ */

// --- Configuration ---
const CONFIG = {
  FORM_ENDPOINT: 'https://api.web3forms.com/submit',
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',  // Replace with your Web3Forms access key
  TRANSITION_DURATION: 650,
};

// --- Mission Data ---
const MISSION_DATA = {
  bootMessages: [
    '> INITIALIZING_SYSTEM_CORE...',
    '> LOADING_TACTICAL_PROTOCOLS...',
    '> ESTABLISHING_SECURE_CHANNEL...',
    '> CALIBRATING_NEURAL_INTERFACE...',
    '> MISSION_CONTROL_ONLINE',
  ],
  dataFeeds: [
    '[ ALPHA_PROTOCOL ] Asset acquisition methodology optimized',
    '[ BRAVO_SECTOR ] Intelligence gathering systems nominal',
    '[ CHARLIE_TEAM ] Tactical evaluation matrix activated',
    '[ DELTA_COMMAND ] Strategic positioning confirmed',
    '[ ECHO_GRID ] Network connectivity at maximum',
    '[ FOXTROT_SIGNAL ] Communications bandwidth: OPTIMAL',
    '[ GAMMA_PHASE ] System synchronization complete',
    '[ HOTEL_STATUS ] Mission readiness: CRITICAL',
  ],
  tickerMessages: [
    'SIGNAL_LOCKED',
    'ENCRYPTION_ACTIVE',
    'PAYLOAD_READY',
    'TARGET_ACQUIRED',
    'STANDBY',
  ],
};

/* ============================================
   1. BACKGROUND — WIREFRAME GLOBE
   ============================================ */
function initGlobe() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animFrame;
  const POINTS = [];
  const NUM_POINTS = 120;
  const RADIUS_FACTOR = 0.28;
  let rotation = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function generatePoints() {
    POINTS.length = 0;
    for (let i = 0; i < NUM_POINTS; i++) {
      const y = 1 - (i / (NUM_POINTS - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((Math.sqrt(5) - 1) / 2) * i * Math.PI * 2;
      POINTS.push({
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY,
      });
    }
  }

  function project(p) {
    const r = Math.min(width, height) * RADIUS_FACTOR;
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const x = p.x * cosR - p.z * sinR;
    const z = p.x * sinR + p.z * cosR;
    const scale = 1 / (1 + z * 0.3);
    return {
      px: width / 2 + x * r * scale,
      py: height / 2 + p.y * r * scale,
      depth: z,
      scale,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const projected = POINTS.map(project);
    ctx.lineWidth = 0.5;

    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].px - projected[j].px;
        const dy = projected[i].py - projected[j].py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(width, height) * 0.15;

        if (dist < maxDist) {
          const alpha = ((1 - dist / maxDist) *
            ((projected[i].depth + projected[j].depth) / 2 + 1) / 2);
          ctx.strokeStyle = `rgba(0, 255, 65, ${Math.max(0, alpha).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(projected[i].px, projected[i].py);
          ctx.lineTo(projected[j].px, projected[j].py);
          ctx.stroke();
        }
      }
    }

    for (const p of projected) {
      const alpha = ((p.depth + 1) / 2) * 0.6 + 0.1;
      const size = p.scale * 1.8;
      ctx.fillStyle = `rgba(0, 255, 65, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
      ctx.fill();
    }

    rotation += 0.003;
    animFrame = requestAnimationFrame(draw);
  }

  resize();
  generatePoints();
  draw();

  window.addEventListener('resize', () => {
    resize();
  });
}

/* ============================================
   2. BOOT SEQUENCE ANIMATION
   ============================================ */
function initBootSequence() {
  const bootLog = document.getElementById('boot-log');
  if (!bootLog) return;

  let index = 0;

  function addBootMessage() {
    if (index < MISSION_DATA.bootMessages.length) {
      const msg = MISSION_DATA.bootMessages[index];
      const div = document.createElement('div');
      div.textContent = msg;
      bootLog.appendChild(div);
      index++;
      setTimeout(addBootMessage, 200);
    }
  }

  addBootMessage();
}

/* ============================================
   3. LIVE DATA STREAM
   ============================================ */
function initLiveDataStream() {
  const streamContent = document.getElementById('stream-content');
  if (!streamContent) return;

  let feedIndex = 0;

  function addStreamItem() {
    const item = MISSION_DATA.dataFeeds[feedIndex % MISSION_DATA.dataFeeds.length];
    const div = document.createElement('div');
    div.className = 'stream-item';
    div.textContent = item;
    streamContent.appendChild(div);

    if (streamContent.children.length > 12) {
      streamContent.removeChild(streamContent.firstChild);
    }

    feedIndex++;
    setTimeout(addStreamItem, 2000 + Math.random() * 2000);
  }

  setTimeout(addStreamItem, 1500);
}

/* ============================================
   4. LIVE TICKER
   ============================================ */
function initLiveTicker() {
  const tickerText = document.getElementById('ticker-text');
  if (!tickerText) return;

  let index = 0;

  function rotateTicker() {
    const msg = MISSION_DATA.tickerMessages[index % MISSION_DATA.tickerMessages.length];
    tickerText.textContent = msg;
    index++;
    setTimeout(rotateTicker, 3000);
  }

  rotateTicker();
}

/* ============================================
   5. ANIMATED COUNTER
   ============================================ */
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = Math.ceil(target / 30);

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = current;
    }, 30);
  });
}

/* ============================================
   6. PAGE TRANSITION
   ============================================ */
function initPageTransitions() {
  document.querySelectorAll('[data-transition]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      const overlay = document.querySelector('.page-transition');

      if (!overlay) {
        window.location.href = target;
        return;
      }

      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = target;
      }, CONFIG.TRANSITION_DURATION / 2);
    });
  });
}

/* ============================================
   7. TYPEWRITER EFFECT
   ============================================ */
function typewriterEffect(element, text, speed = 40) {
  if (!element) return;
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

function initContactSubtitle() {
  const sub1 = document.getElementById('contact-sub-1');
  const sub2 = document.getElementById('contact-sub-2');

  if (sub1) {
    setTimeout(() => {
      typewriterEffect(sub1, 'Encrypting session...', 35);
    }, 300);
  }
  if (sub2) {
    setTimeout(() => {
      typewriterEffect(sub2, 'Handshake complete.', 35);
    }, 1500);
  }
}

/* ============================================
   8. CONTACT FORM HANDLER
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');
  const submitBtn = form.querySelector('.submit-btn');
  const originalBtnText = submitBtn.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    // Web3Forms keys are now natively extracted from the HTML hidden inputs

    submitBtn.disabled = true;
    submitBtn.textContent = '> TRANSMITTING...';
    statusEl.textContent = '> sending packets...';
    statusEl.className = 'form-status sending';

    await new Promise((r) => setTimeout(r, 1200));

    try {
      const response = await fetch(CONFIG.FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        statusEl.textContent = '> TRANSMISSION COMPLETE';
        statusEl.className = 'form-status success';
        form.reset();
        submitBtn.textContent = '> TRANSMITTED ✓';
        setTimeout(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          statusEl.textContent = '';
          statusEl.className = 'form-status';
        }, 4000);
      } else {
        throw new Error('Server returned error');
      }
    } catch (err) {
      statusEl.textContent = '> ERROR: TRANSMISSION FAILED';
      statusEl.className = 'form-status error';
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }, 4000);
    }
  });
}

/* ============================================
   9. RANDOM STAT FLICKER
   ============================================ */
function initStatFlicker() {
  const values = document.querySelectorAll('.stat-value');
  if (!values.length) return;

  setInterval(() => {
    const randomVal = values[Math.floor(Math.random() * values.length)];
    randomVal.style.opacity = '0.3';
    setTimeout(() => {
      randomVal.style.opacity = '1';
    }, 100);
  }, 3000);
}

/* ============================================
   10. HEADING GLITCH BURST
   ============================================ */
function initGlitchBurst() {
  const glitch = document.querySelector('.glitch');
  if (!glitch) return;

  setInterval(() => {
    glitch.style.animation = 'none';
    void glitch.offsetWidth;
    glitch.style.animation = '';
  }, 6000);
}

/* ============================================
   11. RADAR BLIPS
   ============================================ */
function initRadarBlips() {
  const container = document.getElementById('radar-blips');
  if (!container) return;

  function createBlip() {
    const blip = document.createElement('div');
    blip.className = 'radar-blip';
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 45; // max radius 50
    
    // Convert polar to cartesian (centered at 60px radius for 120px parent)
    const x = 60 + Math.cos(angle) * distance - 2;
    const y = 60 + Math.sin(angle) * distance - 2;
    
    blip.style.left = `${x}px`;
    blip.style.top = `${y}px`;
    
    container.appendChild(blip);
    
    setTimeout(() => {
      if (container.contains(blip)) blip.remove();
    }, 2500);
    
    setTimeout(createBlip, 1200 + Math.random() * 2000);
  }
  
  createBlip();
  setTimeout(createBlip, 1800);
}

/* ============================================
   12. AMBIENT SIDE LOGS
   ============================================ */
function initSideLogs() {
  const leftLog = document.getElementById('left-log');
  const rightLog = document.getElementById('right-log');
  if (!leftLog || !rightLog) return;
  
  const leftLines = [
    "> SECURE CONNECTION ESTABLISHED FROM 192.168.1.105",
    "> PORT 8080 BINDING",
    "> USER ADDED TO SUDOERS",
    "def recurse_network(node):",
    "    if node.is_leaf(): return 1",
    "    return sum(recurse_network(n) for n in node.children())",
    "0x00A1 FF E0 4A 2B 9F",
    "0x00A6 33 21 00 00 A1",
    "systemctl reload firewall.service",
    "[ OK ] Kernel integrity verified",
    "SSH login successful for operator JR",
    "Initiating packet trace: route -n",
    "Resolving ghost nodes..."
  ];

  const rightLines = [
    "0x10008: mov eax, ebx",
    "0x1000C: add ecx, 4",
    "0x10010: jmp 0x1004A",
    "0x10014: push ebp",
    "0x10015: mov ebp, esp",
    "0x10017: sub esp, 16",
    "[0x00400000] 3e000008 lui  sp, 0x10008",
    "[0x00400004] 341c0000 ori  sp, sp, 0x80",
    "[0x00400008] 27bdffe0 addiu sp, sp, -32",
    "[0x0040000c] afbf001c sw   ra, 28(sp)",
    "[x86_64] kernel panic - not syncing: VFS:",
    "0FFF AC 12 BD 44 F1",
    "cmp dword ptr [rbp-4], 0"
  ];

  function pushLog(el, linesArray) {
    const p = document.createElement('div');
    p.textContent = linesArray[Math.floor(Math.random() * linesArray.length)];
    el.prepend(p);
    if (el.children.length > 50) {
      el.removeChild(el.lastChild);
    }
    setTimeout(() => pushLog(el, linesArray), 150 + Math.random() * 350);
  }
  
  pushLog(leftLog, leftLines);
  setTimeout(() => pushLog(rightLog, rightLines), 300);
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initGlobe();
  initBootSequence();
  initLiveDataStream();
  initLiveTicker();
  initPageTransitions();
  initStatFlicker();
  initGlitchBurst();
  initRadarBlips();
  initSideLogs();
  initContactSubtitle();
  initContactForm();
  animateCounters();

  // Add slight delay before animating counters for better UX
  setTimeout(animateCounters, 1000);
});
