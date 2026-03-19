// ── STAR BACKGROUND ──
function initStars() {
    const container = document.querySelector('.stars-container');
    const starCount = 150;
    if (!container) return;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 5;
        const delay = Math.random() * 10;

        star.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: #fff;
            border-radius: 50%;
            opacity: ${Math.random()};
            box-shadow: 0 0 ${size * 5}px rgba(255, 255, 255, 0.8);
            animation: twinkle ${duration}s infinite ${delay}s ease-in-out;
        `;
        
        container.appendChild(star);
    }
}

// ── MAGNETIC BUTTON EFFECT ──
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.action-btn, .nav-link');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}

function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    });
}

// ── NAV LINK CONTENT (SELF-DOCUMENTING) ──
const NAV_CONTENT = {
    "System": [
        "> ANALYZING SYSTEM FILES...",
        "[base.css] : Root variables and reset.",
        "[navbar.css] : Glassmorphism nav logic.",
        "[animations.css] : Global keyframes.",
        "── CORE TOKENS ──",
        "  --neon-cyan: #00f2fe;",
        "  --glass-bg: rgba(255, 255, 255, 0.03);",
        "> SYSTEM STATUS: MODULAR/SCALABLE"
    ],
    "Datastream": [
        "> EXECUTING SCRIPT.JS...",
        "  [initStars] : Procedural star field.",
        "  [initMagnetic] : Physics-based hover.",
        "  [initHUD] : Real-time data loop.",
        "  [initNav] : State management.",
        "> LOGIC HUB: ACTIVE",
        "> ANIMATION_ENGINE: 60FPS STABLE"
    ],
    "Architecture": [
        "> MAPPING DOM ARCHITECTURE...",
        "  [index.html] : Semantic Skeleton.",
        "  - Header (Navbar & Logo)",
        "  - Main (Hero & Glitch Text)",
        "  - HUD (System Metrics)",
        "  - Modals (Terminal & Boot Overlay)",
        "> COMPONENTS: 5 CORE MODULES"
    ],
    "Uplink": [
        "> SYNCING UI TO STATE...",
        "  [modal.css] : High-Z level overlays.",
        "  [terminal] : Typing animation logic.",
        "  [boot] : Simulation sequence.",
        "  [uplink] : Connection to user input.",
        "> PROTOCOL: INTERACTIVE_USER_EX"
    ]
};

// ── NAV LINK SWITCHER ──
function initNav() {
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const label = item.querySelector('.link-label')?.textContent;
            if (label && NAV_CONTENT[label]) {
                openContentTerminal(label);
            }
        });
    });
}

function openContentTerminal(label) {
    const overlay = document.getElementById('terminal-overlay');
    const title = document.querySelector('.terminal-title');
    const content = document.getElementById('terminal-content');
    
    if (title) title.textContent = `SYSTEM_${label.toUpperCase()}_LOG`;
    overlay.classList.add('active');
    content.innerHTML = '';

    const lines = NAV_CONTENT[label];
    let i = 0;

    function typeLine() {
        if (i < lines.length) {
            const div = document.createElement('div');
            div.textContent = lines[i];
            content.appendChild(div);
            content.scrollTop = content.scrollHeight;
            i++;
            setTimeout(typeLine, 150);
        }
    }
    typeLine();
}

function initHUDUpdates() {
    const latencyEl = document.getElementById('hud-latency');
    const coresEl = document.getElementById('hud-cores');

    setInterval(() => {
        const lat = 10 + Math.floor(Math.random() * 5);
        latencyEl.textContent = `${lat}ms`;
        
        const load = 60 + Math.floor(Math.random() * 40);
        coresEl.style.color = load > 90 ? 'var(--neon-magenta)' : 'var(--text-primary)';
    }, 2000);
}

// ── SYSTEM ACTIONS ──
function initActions() {
    const btnBoot = document.getElementById('btn-initialize');
    const btnTerminal = document.getElementById('btn-terminal');

    btnBoot?.addEventListener('click', handleBoot);
    btnTerminal?.addEventListener('click', handleTerminal);
}

function handleBoot() {
    const overlay = document.getElementById('boot-overlay');
    const bar = document.getElementById('boot-progress-bar');
    const logs = document.getElementById('boot-logs');
    
    overlay.classList.add('active');
    let progress = 0;
    
    const steps = [
        "Connecting to Neural Link...",
        "Encrypting packets...",
        "Syncing Core 08...",
        "Bypassing firewall...",
        "Success: System Stable."
    ];

    const timer = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(timer);
            setTimeout(() => {
                overlay.classList.remove('active');
                bar.style.width = '0%';
                logs.textContent = '';
            }, 800);
        }
        bar.style.width = `${progress}%`;
        logs.textContent = steps[Math.floor((progress/100) * steps.length)] || steps[steps.length-1];
    }, 100);
}

function handleTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const content = document.getElementById('terminal-content');
    overlay.classList.add('active');
    content.innerHTML = '';

    const mockLogs = [
        '> INITIALIZING PROTOCOL 88...',
        '> SCANNING SECTORS...',
        '> DATASTREAM ENCRYPTED.',
        '> ACCESS GRANTED USER_ROOT.',
        '> WARNING: LATENCY SPIKE DETECTED.',
        '> SYSTEM_STATUS: [FLUID_CORE_ACTIVE]',
        '> READY FOR UPLINK.'
    ];

    let i = 0;
    function type() {
        if (i < mockLogs.length) {
            content.innerHTML += `<div>${mockLogs[i]}</div>`;
            content.scrollTop = content.scrollHeight;
            i++;
            setTimeout(type, 300);
        }
    }
    type();
}

window.closeTerminal = function() {
    document.getElementById('terminal-overlay').classList.remove('active');
}

// ── INITIALIZE ──
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initMagneticButtons();
    initCursorGlow();
    initNav();
    initHUDUpdates();
    initActions();
});
