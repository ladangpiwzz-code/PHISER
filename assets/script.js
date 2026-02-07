// ===== MATRIX RAIN EFFECT =====
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'DEVILPHISHER悪魔ピウズスカイHELLGATE0123456789$€¥£¢†‡§¶®©℗℠™';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for(let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ff0000';
    ctx.font = `${fontSize}px monospace`;
    
    for(let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

const matrixInterval = setInterval(drawMatrix, 35);

// ===== LOADING SEQUENCE =====
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loginContainer = document.getElementById('loginContainer');
    const terminal = document.getElementById('terminal');
    
    // Add more terminal lines dynamically
    setTimeout(() => {
        const newLine = document.createElement('div');
        newLine.className = 'terminal-line';
        newLine.innerHTML = '<span class="prompt">root@devil-phisher:~#</span> <span class="command">load_admin_panel</span>';
        terminal.appendChild(newLine);
        
        setTimeout(() => {
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-line response';
            responseLine.textContent = '> Admin panel ready for authentication';
            terminal.appendChild(responseLine);
            terminal.scrollTop = terminal.scrollHeight;
        }, 300);
    }, 2500);
    
    // Transition to login after 4 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            loginContainer.style.display = 'flex';
            
            // Add flames effect
            const flames = document.createElement('div');
            flames.className = 'flames';
            document.body.appendChild(flames);
        }, 500);
    }, 4000);
});

// ===== LOGIN HANDLER =====
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.querySelector('.login-btn');
    const loginBox = document.querySelector('.login-box');
    
    // Original credentials
    const validCredentials = [
        { user: 'piwzsky', pass: 'piwzsky30' },
        { user: 'admin', pass: 'devil666' },
        { user: 'root', pass: 'toor' }
    ];
    
    // Check credentials
    const isValid = validCredentials.some(cred => 
        cred.user === username && cred.pass === password
    );
    
    if (isValid) {
        // Success
        loginBtn.innerHTML = '<i class="fas fa-check"></i> ACCESS GRANTED';
        loginBtn.style.background = 'linear-gradient(45deg, #00ff00, #008000)';
        
        // Save session
        localStorage.setItem('devil_auth', 'true');
        localStorage.setItem('devil_user', username);
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = '/admin/dashboard.html';
        }, 1000);
        
    } else {
        // Failed login
        loginBox.classList.add('shake');
        loginBtn.innerHTML = '<i class="fas fa-times"></i> ACCESS DENIED';
        loginBtn.style.background = 'linear-gradient(45deg, #ff0000, #8b0000)';
        
        // Reset after animation
        setTimeout(() => {
            loginBox.classList.remove('shake');
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> ENTER HELL GATE';
            loginBtn.style.background = 'linear-gradient(45deg, var(--dark-red), var(--blood-red))';
            
            // Clear inputs
            document.getElementById('password').value = '';
            
            // Show warning
            alert('🚨 INTRUDER DETECTED!\nUnauthorized access attempt logged!');
        }, 500);
    }
});

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Ctrl+Alt+D for quick access (dev mode)
    if (e.ctrlKey && e.altKey && e.key === 'd') {
        document.getElementById('username').value = 'piwzsky';
        document.getElementById('password').value = 'piwzsky30';
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
});

// ===== CHECK FOR SESSION =====
function checkSession() {
    const auth = localStorage.getItem('devil_auth');
    if (auth === 'true') {
        // Already logged in, redirect to dashboard
        window.location.href = '/admin/dashboard.html';
    }
}

// Run session check
checkSession();
