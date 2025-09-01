// Admin credentials
const ADMIN_CREDENTIALS = {
    username: 'astfrostbot',
    password: 'aggie2009'
};

// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const adminContainer = document.getElementById('adminContainer');
    const errorMessage = document.getElementById('errorMessage');

    // Check if already logged in
    if (sessionStorage.getItem('astAdminAuth') === 'true') {
        showAdminPanel();
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            sessionStorage.setItem('astAdminAuth', 'true');
            showAdminPanel();
            errorMessage.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    });
});

function showAdminPanel() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'block';
}

function logout() {
    sessionStorage.removeItem('astAdminAuth');
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('adminContainer').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Tab functionality
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Hide all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

function showSuccessMessage() {
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}

// Content saving functions
function saveHeroContent() {
    const title = document.getElementById('heroTitle').value;
    const description = document.getElementById('heroDescription').value;
    
    // Store in localStorage for persistence
    localStorage.setItem('ast_hero_title', title);
    localStorage.setItem('ast_hero_description', description);
    
    // Apply changes to main website
    updateMainWebsite('hero', {
        title: title,
        description: description
    });
    
    showSuccessMessage();
}

function saveAboutContent() {
    const mission = document.getElementById('missionText').value;
    const achievements = document.getElementById('achievementsText').value;
    
    localStorage.setItem('ast_mission_text', mission);
    localStorage.setItem('ast_achievements_text', achievements);
    
    updateMainWebsite('about', {
        mission: mission,
        achievements: achievements
    });
    
    showSuccessMessage();
}

function saveLeadershipContent() {
    const presidentInfo = document.getElementById('presidentInfo').value;
    const speakerInfo = document.getElementById('speakerInfo').value;
    const vpInfo = document.getElementById('vpInfo').value;
    const tournamentHighlight = document.getElementById('tournamentHighlight').value;
    
    localStorage.setItem('ast_president_info', presidentInfo);
    localStorage.setItem('ast_speaker_info', speakerInfo);
    localStorage.setItem('ast_vp_info', vpInfo);
    localStorage.setItem('ast_tournament_highlight', tournamentHighlight);
    
    updateMainWebsite('leadership', {
        president: presidentInfo,
        speaker: speakerInfo,
        vp: vpInfo,
        tournament: tournamentHighlight
    });
    
    showSuccessMessage();
}

function saveServicesContent() {
    const government = document.getElementById('governmentDesc').value;
    const esports = document.getElementById('esportsDesc').value;
    const weather = document.getElementById('weatherDesc').value;
    
    localStorage.setItem('ast_government_desc', government);
    localStorage.setItem('ast_esports_desc', esports);
    localStorage.setItem('ast_weather_desc', weather);
    
    updateMainWebsite('services', {
        government: government,
        esports: esports,
        weather: weather
    });
    
    showSuccessMessage();
}

// Function to update main website content
function updateMainWebsite(section, data) {
    // Store the update in localStorage with timestamp
    const update = {
        section: section,
        data: data,
        timestamp: new Date().toISOString()
    };
    
    // Get existing updates or create new array
    let updates = JSON.parse(localStorage.getItem('ast_pending_updates') || '[]');
    updates.push(update);
    localStorage.setItem('ast_pending_updates', JSON.stringify(updates));
    
    // Send message to parent window if this is opened from main site
    if (window.opener) {
        window.opener.postMessage({
            type: 'ast_admin_update',
            section: section,
            data: data
        }, '*');
    }
}

// Load saved content on page load
function loadSavedContent() {
    // Load hero content
    const heroTitle = localStorage.getItem('ast_hero_title');
    const heroDesc = localStorage.getItem('ast_hero_description');
    if (heroTitle) document.getElementById('heroTitle').value = heroTitle;
    if (heroDesc) document.getElementById('heroDescription').value = heroDesc;
    
    // Load about content
    const missionText = localStorage.getItem('ast_mission_text');
    const achievementsText = localStorage.getItem('ast_achievements_text');
    if (missionText) document.getElementById('missionText').value = missionText;
    if (achievementsText) document.getElementById('achievementsText').value = achievementsText;
    
    // Load leadership content
    const presidentInfo = localStorage.getItem('ast_president_info');
    const speakerInfo = localStorage.getItem('ast_speaker_info');
    const vpInfo = localStorage.getItem('ast_vp_info');
    const tournamentHighlight = localStorage.getItem('ast_tournament_highlight');
    if (presidentInfo) document.getElementById('presidentInfo').value = presidentInfo;
    if (speakerInfo) document.getElementById('speakerInfo').value = speakerInfo;
    if (vpInfo) document.getElementById('vpInfo').value = vpInfo;
    if (tournamentHighlight) document.getElementById('tournamentHighlight').value = tournamentHighlight;
    
    // Load services content
    const governmentDesc = localStorage.getItem('ast_government_desc');
    const esportsDesc = localStorage.getItem('ast_esports_desc');
    const weatherDesc = localStorage.getItem('ast_weather_desc');
    if (governmentDesc) document.getElementById('governmentDesc').value = governmentDesc;
    if (esportsDesc) document.getElementById('esportsDesc').value = esportsDesc;
    if (weatherDesc) document.getElementById('weatherDesc').value = weatherDesc;
}

// Load content when admin panel is shown
window.addEventListener('load', function() {
    setTimeout(loadSavedContent, 100);
});