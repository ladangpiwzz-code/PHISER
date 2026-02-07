// ===== ENHANCED DEMONIC MATRIX RAIN EFFECT =====
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initMatrix();
}
resizeCanvas();

// Enhanced character set with demonic symbols
const chars = 'DEVILPHISHER悪魔ピウズスカイHELLGATE🔥💀👿👹👺☠️⚰️🩸🔪🖤₮฿€$¥£¢†‡§¶®©℗℠™0123456789';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];

// Matrix colors (cycling)
const matrixColors = ['#ff0000', '#8b0000', '#dc143c', '#b22222', '#8b0000'];
let currentColorIndex = 0;

// Initialize matrix
function initMatrix() {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    
    for(let i = 0; i < columns; i++) {
        drops[i] = {
            y: Math.random() * canvas.height,
            speed: Math.random() * 2 + 1,
            char: chars[Math.floor(Math.random() * chars.length)],
            brightness: Math.random() * 0.5 + 0.5,
            fontSize: fontSize + Math.random() * 4 - 2
        };
    }
}

// Enhanced draw function
function drawMatrix() {
    // Darken canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Cycle through colors every 100 frames
    if (Math.floor(Date.now() / 100) % 100 === 0) {
        currentColorIndex = (currentColorIndex + 1) % matrixColors.length;
    }
    
    const currentColor = matrixColors[currentColorIndex];
    
    // Draw matrix characters
    for(let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Randomly change character sometimes
        if (Math.random() > 0.97) {
            drop.char = chars[Math.floor(Math.random() * chars.length)];
        }
        
        // Set color with brightness variation
        const brightness = Math.sin(Date.now() / 1000 + i) * 0.3 + 0.7;
        ctx.fillStyle = adjustColorBrightness(currentColor, brightness);
        
        // Draw character with shadow
        ctx.font = `${drop.fontSize}px "Courier New", monospace`;
        
        // Character shadow for depth
        ctx.shadowColor = currentColor;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Draw main character
        ctx.fillText(drop.char, i * fontSize, drop.y);
        
        // Draw trailing character (faint)
        ctx.fillStyle = adjustColorBrightness(currentColor, brightness * 0.3);
        ctx.fillText(drop.char, i * fontSize, drop.y - fontSize);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Move drop down
        drop.y += drop.speed;
        
        // Reset if off screen
        if (drop.y > canvas.height + fontSize) {
            drop.y = -fontSize;
            drop.speed = Math.random() * 2 + 1;
            drop.char = chars[Math.floor(Math.random() * chars.length)];
            drop.brightness = Math.random() * 0.5 + 0.5;
        }
    }
    
    // Add occasional "glitch" effect
    if (Math.random() > 0.995) {
        matrixGlitch();
    }
}

// Color brightness adjustment
function adjustColorBrightness(color, brightness) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.min(255, Math.floor(r * brightness));
    const newG = Math.min(255, Math.floor(g * brightness));
    const newB = Math.min(255, Math.floor(b * brightness));
    
    return `rgb(${newR}, ${newG}, ${newB})`;
}

// Glitch effect
function matrixGlitch() {
    const glitchDuration = 100; // ms
    const startTime = Date.now();
    
    function applyGlitch() {
        const elapsed = Date.now() - startTime;
        if (elapsed > glitchDuration) return;
        
        // Save current state
        ctx.save();
        
        // Apply random distortion
        const distortionX = Math.random() * 20 - 10;
        const distortionY = Math.random() * 20 - 10;
        ctx.translate(distortionX, distortionY);
        
        // Draw glitched frame
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Restore and continue
        ctx.restore();
        requestAnimationFrame(applyGlitch);
    }
    
    applyGlitch();
}

// Special effects - occasional blood drip
function createBloodDrip() {
    if (Math.random() > 0.99) {
        const x = Math.random() * canvas.width;
        const drip = {
            x: x,
            y: 0,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 5 + 2,
            life: 100
        };
        
        bloodDrips.push(drip);
    }
}

let bloodDrips = [];
function drawBloodDrips() {
    for(let i = bloodDrips.length - 1; i >= 0; i--) {
        const drip = bloodDrips[i];
        
        // Draw drip
        ctx.fillStyle = '#8b0000';
        ctx.beginPath();
        ctx.arc(drip.x, drip.y, drip.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw trail
        ctx.fillStyle = 'rgba(139, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(drip.x, drip.y - 5, drip.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        drip.y += drip.speed;
        drip.life--;
        
        // Remove if dead or off screen
        if (drip.life <= 0 || drip.y > canvas.height) {
            bloodDrips.splice(i, 1);
        }
    }
}

// Enhanced draw loop
function enhancedDrawLoop() {
    drawMatrix();
    createBloodDrip();
    drawBloodDrips();
    requestAnimationFrame(enhancedDrawLoop);
}

// Start matrix effect
let matrixInterval = setInterval(() => {
    requestAnimationFrame(enhancedDrawLoop);
}, 35);

// Handle window resize
window.addEventListener('resize', function() {
    clearInterval(matrixInterval);
    resizeCanvas();
    matrixInterval = setInterval(() => {
        requestAnimationFrame(enhancedDrawLoop);
    }, 35);
});

// Performance optimization
let lastTime = 0;
const fps = 30;
const interval = 1000 / fps;

function optimizedDrawLoop(timestamp) {
    if (timestamp - lastTime >= interval) {
        drawMatrix();
        createBloodDrip();
        drawBloodDrips();
        lastTime = timestamp;
    }
    requestAnimationFrame(optimizedDrawLoop);
}

// Uncomment for optimized version:
// requestAnimationFrame(optimizedDrawLoop);

// Interactive effects
canvas.addEventListener('mousemove', function(e) {
    // Create ripple effect near mouse
    const x = e.clientX;
    const y = e.clientY;
    
    // Find nearest columns
    const columnIndex = Math.floor(x / fontSize);
    const affectRange = 5;
    
    for(let i = Math.max(0, columnIndex - affectRange); 
        i < Math.min(columns, columnIndex + affectRange); 
        i++) {
        
        // Speed up drops near cursor
        if (drops[i]) {
            const distance = Math.abs(i - columnIndex);
            const influence = 1 - (distance / affectRange);
            
            drops[i].speed += influence * 2;
            drops[i].brightness = 1;
        }
    }
});

// Add keyboard control for effect intensity
let effectIntensity = 1;
document.addEventListener('keydown', function(e) {
    if (e.key === '+') {
        effectIntensity = Math.min(3, effectIntensity + 0.1);
        updateEffectIntensity();
    } else if (e.key === '-') {
        effectIntensity = Math.max(0.5, effectIntensity - 0.1);
        updateEffectIntensity();
    } else if (e.key === '0') {
        effectIntensity = 1;
        updateEffectIntensity();
    }
});

function updateEffectIntensity() {
    for(let i = 0; i < drops.length; i++) {
        drops[i].speed = (Math.random() * 2 + 1) * effectIntensity;
    }
}

// Add toggle for matrix effect
let matrixEnabled = true;
function toggleMatrix() {
    matrixEnabled = !matrixEnabled;
    if (matrixEnabled) {
        matrixInterval = setInterval(() => {
            requestAnimationFrame(enhancedDrawLoop);
        }, 35);
    } else {
        clearInterval(matrixInterval);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Expose control to console for debugging
window.matrixController = {
    toggle: toggleMatrix,
    setIntensity: (val) => {
        effectIntensity = val;
        updateEffectIntensity();
    },
    glitch: matrixGlitch,
    reset: initMatrix
};
