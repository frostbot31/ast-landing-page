// Game Selection JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page animations
    initializeAnimations();
});

function initializeAnimations() {
    // Stagger card animations
    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 800 + (index * 150));
    });
}

function showGameInfo(gameType) {
    const modal = document.getElementById('gameModal');
    const modalContent = document.getElementById('modalContent');
    
    let content = '';
    
    switch(gameType) {
        case 'insurance':
            content = `
                <h2>Four Lives Insurance - Risk Assessment Game</h2>
                <div style="margin: 1.5rem 0;">
                    <h3 style="color: #667eea; margin-bottom: 1rem;">Game Overview</h3>
                    <p style="margin-bottom: 1rem;">Navigate through four different life scenarios and make strategic insurance decisions. This game teaches risk management while providing an engaging interactive experience.</p>
                    
                    <h3 style="color: #667eea; margin-bottom: 1rem;">How to Play</h3>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
                        <li>Choose which of the four life scenarios to engage with</li>
                        <li>Watch your risk levels update in real-time</li>
                        <li>Use strategic thinking to balance risk and reward</li>
                        <li>Optimize your insurance policy for the best outcome</li>
                    </ul>
                    
                    <h3 style="color: #667eea; margin-bottom: 1rem;">Game Features</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                        <span style="background: #e3f2fd; color: #1976d2; padding: 0.3rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">Live Risk Assessment</span>
                        <span style="background: #e8f5e8; color: #2e7d32; padding: 0.3rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">Interactive Scenarios</span>
                        <span style="background: #fff3e0; color: #f57c00; padding: 0.3rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">Strategic Gameplay</span>
                        <span style="background: #f3e5f5; color: #7b1fa2; padding: 0.3rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">Policy Optimization</span>
                    </div>
                    
                    <div style="text-align: center; margin-top: 2rem;">
                        <a href="insurance-risk-game/" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 0.8rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600;">Start Playing</a>
                    </div>
                </div>
            `;
            break;
        default:
            content = '<p>Game information not available.</p>';
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    
    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add keyboard support for closing modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Add subtle hover effects to game cards
document.addEventListener('DOMContentLoaded', function() {
    const gameCards = document.querySelectorAll('.game-card:not(.coming-soon)');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
    
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect styles dynamically
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .play-btn, .info-btn {
        position: relative;
        overflow: hidden;
    }
`;

// Inject ripple styles
const style = document.createElement('style');
style.textContent = rippleStyles;
document.head.appendChild(style);

// Apply ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.play-btn, .info-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});