const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

const symbols = [
    "∑", "∫", "π", "∞", "√", "∇", "≠", "≈", "÷", "≥", "≤", "⊕", "∴", "∂", "∛", "∜",
    "+", "-", "*", "/", "=", "%", "!", "^", ">", "<",
    "(", ")", "{", "}", "[", "]", "|", "∥", "∠", "⊥", "∡", "⊙",
    "⊂", "⊃", "⊆", "⊇", "∩", "∪", "∈", "∉", "∋", "∌", "⊖", "⊗", "⊘", "⊢", "⊣",
    "∅", "∃", "∀", "∴", "∵", "∔", "⊎", "∘", "∙", "⋆", "⧫", "≅", "∝",
    "ℵ", "ℶ", "ℷ", "ℸ", "ℇ", "∂", "⍟", "⎔", "⨁", "⨂", "⨅", "⨆", "⨀", "⨂",
    "±", "∓", "√", "∛", "∜", "∑", "∏", "∂", "∆", "∇", "∞", "∟", "∡", "⊥",
    "¬", "⊤", "⊥", "∧", "∨", "⊻", "→", "↔", "↦", "↞", "↠", "↶", "↷",
    "ℂ", "ℕ", "ℚ", "ℝ", "ℤ", "ℙ", "ℤ⁺", "𝒞", "𝔽", "ℵ₀", "ℵ₁", "𝑒", "𝑖", "𝜋"
];

let ripples = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const fontSize = 16;
const columns = Math.ceil(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px 'Matrix Code NFI', monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = symbols[Math.floor(Math.random() * symbols.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    // Draw ripples
    ripples.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.size, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(0, 255, 0, ${ripple.alpha})`;
        ctx.stroke();

        ripple.size += 2;
        ripple.alpha -= 0.02;

        if (ripple.alpha <= 0) {
            ripples.splice(index, 1);
        }
    });

    // Draw centered text
    ctx.font = 'bold 48px "Matrix Code NFI", monospace';
    ctx.fillStyle = '#0F0';
    const headingText = '𓋴 ᛁ ᚷ ᚾ 𓋴 ᛗᛃ𓃀';
    const headingWidth = ctx.measureText(headingText).width;
    ctx.fillText(headingText, (canvas.width - headingWidth) / 2, canvas.height / 2);

    requestAnimationFrame(draw);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripples.push({ x, y, size: 0, alpha: 1 });
});

// Parallax effect
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    canvas.style.transform = `translateY(${scrollY * 0.5}px)`;
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const menuIcon = menuToggle.querySelector('.menu-icon');
const closeIcon = menuToggle.querySelector('.close-icon');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// Start the animation
draw();

