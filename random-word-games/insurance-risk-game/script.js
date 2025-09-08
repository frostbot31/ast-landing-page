// Four Lives Insurance - Interactive Risk Assessment Game
// Incorporates all five words: four, live, withdraw, thin, insurance

class InsuranceRiskGame {
    constructor() {
        this.scenarios = {
            adventure: { riskLevel: 0, engaged: false, baseRisk: 15 },
            travel: { riskLevel: 0, engaged: false, baseRisk: 10 },
            health: { riskLevel: 0, engaged: false, baseRisk: -10 },
            career: { riskLevel: 0, engaged: false, baseRisk: 8 }
        };
        
        this.gameState = {
            coverageScore: 100,
            totalRisk: 0,
            premium: 150,
            gameTime: 0
        };
        
        this.updateInterval = null;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startLiveUpdates();
        this.addLiveUpdate("Welcome to Four Lives Insurance! Choose your scenarios to begin.");
    }
    
    bindEvents() {
        // Bind scenario buttons
        document.querySelectorAll('.engage-btn, .withdraw-btn').forEach(btn => {
            btn.addEventListener('click', this.handleScenarioAction.bind(this));
        });
        
        // Bind game action buttons
        document.getElementById('resetGame').addEventListener('click', this.resetGame.bind(this));
        document.getElementById('optimizePolicy').addEventListener('click', this.optimizePolicy.bind(this));
    }
    
    handleScenarioAction(event) {
        const scenario = event.target.closest('.scenario');
        const scenarioType = scenario.dataset.scenario;
        const action = event.target.dataset.action;
        
        if (action === 'engage') {
            this.engageScenario(scenarioType);
        } else if (action === 'withdraw') {
            this.withdrawScenario(scenarioType);
        }
        
        this.updateDisplay();
    }
    
    engageScenario(scenarioType) {
        const scenario = this.scenarios[scenarioType];
        if (!scenario.engaged) {
            scenario.engaged = true;
            scenario.riskLevel = scenario.baseRisk;
            
            // Update UI
            const scenarioElement = document.querySelector(`[data-scenario="${scenarioType}"]`);
            scenarioElement.classList.add('engaged');
            scenarioElement.querySelector('.engage-btn').disabled = true;
            scenarioElement.querySelector('.withdraw-btn').disabled = false;
            
            // Add live update
            const scenarioName = scenarioElement.querySelector('h3').textContent;
            this.addLiveUpdate(`Engaged with ${scenarioName} - Risk level increasing...`);
            
            this.recalculateStats();
        }
    }
    
    withdrawScenario(scenarioType) {
        const scenario = this.scenarios[scenarioType];
        if (scenario.engaged) {
            scenario.engaged = false;
            scenario.riskLevel = 0;
            
            // Update UI
            const scenarioElement = document.querySelector(`[data-scenario="${scenarioType}"]`);
            scenarioElement.classList.remove('engaged');
            scenarioElement.querySelector('.engage-btn').disabled = false;
            scenarioElement.querySelector('.withdraw-btn').disabled = true;
            
            // Reset risk meter
            const riskFill = scenarioElement.querySelector('.risk-fill');
            riskFill.style.width = '0%';
            
            // Update risk indicator
            const riskIndicator = scenarioElement.querySelector('.risk-indicator');
            riskIndicator.textContent = 'Low Risk';
            riskIndicator.className = 'risk-indicator low';
            
            // Add live update
            const scenarioName = scenarioElement.querySelector('h3').textContent;
            this.addLiveUpdate(`Withdrew from ${scenarioName} - Risk reduced successfully`);
            
            this.recalculateStats();
        }
    }
    
    recalculateStats() {
        // Calculate total risk from all engaged scenarios
        let totalRisk = 0;
        let engagedCount = 0;
        
        Object.values(this.scenarios).forEach(scenario => {
            if (scenario.engaged) {
                totalRisk += scenario.riskLevel;
                engagedCount++;
            }
        });
        
        // Calculate coverage score (decreases with higher risk)
        this.gameState.coverageScore = Math.max(50, 100 - Math.abs(totalRisk));
        
        // Calculate premium (increases with risk)
        this.gameState.premium = 150 + (totalRisk * 2);
        if (this.gameState.premium < 100) this.gameState.premium = 100;
        
        // Determine risk level
        this.gameState.totalRisk = totalRisk;
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update live stats
        document.getElementById('coverageScore').textContent = Math.round(this.gameState.coverageScore);
        document.getElementById('premium').textContent = `$${Math.round(this.gameState.premium)}/month`;
        
        // Update risk level
        const riskLevelElement = document.getElementById('riskLevel');
        if (this.gameState.totalRisk < 0) {
            riskLevelElement.textContent = 'Very Low';
            riskLevelElement.style.color = '#27ae60';
        } else if (this.gameState.totalRisk < 20) {
            riskLevelElement.textContent = 'Low';
            riskLevelElement.style.color = '#27ae60';
        } else if (this.gameState.totalRisk < 40) {
            riskLevelElement.textContent = 'Medium';
            riskLevelElement.style.color = '#f39c12';
        } else {
            riskLevelElement.textContent = 'High';
            riskLevelElement.style.color = '#e74c3c';
        }
    }
    
    startLiveUpdates() {
        // Live updates every 2 seconds for engaged scenarios
        this.updateInterval = setInterval(() => {
            this.gameState.gameTime += 2;
            let hasEngaged = false;
            
            Object.entries(this.scenarios).forEach(([type, scenario]) => {
                if (scenario.engaged) {
                    hasEngaged = true;
                    // Gradually increase risk over time
                    const timeMultiplier = 1 + (this.gameState.gameTime / 100);
                    const newRisk = scenario.baseRisk * timeMultiplier;
                    
                    // Random risk fluctuations for realism
                    const fluctuation = (Math.random() - 0.5) * 5;
                    scenario.riskLevel = newRisk + fluctuation;
                    
                    this.updateScenarioDisplay(type);
                }
            });
            
            if (hasEngaged) {
                this.recalculateStats();
                
                // Add periodic live updates
                if (this.gameState.gameTime % 10 === 0) {
                    const messages = [
                        "Risk assessment updated based on current activities...",
                        "Premium calculations refreshed with live market data...",
                        "Coverage optimization suggestions available...",
                        "Real-time risk monitoring active..."
                    ];
                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                    this.addLiveUpdate(randomMessage);
                }
            }
        }, 2000);
    }
    
    updateScenarioDisplay(scenarioType) {
        const scenario = this.scenarios[scenarioType];
        const scenarioElement = document.querySelector(`[data-scenario="${scenarioType}"]`);
        
        if (!scenario.engaged) return;
        
        // Update risk meter
        const riskFill = scenarioElement.querySelector('.risk-fill');
        const riskPercentage = Math.min(100, Math.max(0, (scenario.riskLevel + 20) * 2));
        riskFill.style.width = `${riskPercentage}%`;
        
        // Update risk indicator
        const riskIndicator = scenarioElement.querySelector('.risk-indicator');
        if (scenario.riskLevel < 10) {
            riskIndicator.textContent = 'Low Risk';
            riskIndicator.className = 'risk-indicator low';
        } else if (scenario.riskLevel < 25) {
            riskIndicator.textContent = 'Medium Risk';
            riskIndicator.className = 'risk-indicator medium';
        } else {
            riskIndicator.textContent = 'High Risk';
            riskIndicator.className = 'risk-indicator high';
        }
    }
    
    addLiveUpdate(message) {
        const updatesFeed = document.getElementById('updatesFeed');
        const updateElement = document.createElement('p');
        updateElement.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
        
        // Add to top of feed
        updatesFeed.insertBefore(updateElement, updatesFeed.firstChild);
        
        // Keep only last 10 updates for thin, clean interface
        const updates = updatesFeed.querySelectorAll('p');
        if (updates.length > 10) {
            updatesFeed.removeChild(updates[updates.length - 1]);
        }
    }
    
    resetGame() {
        // Reset all scenarios
        Object.keys(this.scenarios).forEach(type => {
            this.withdrawScenario(type);
        });
        
        // Reset game state
        this.gameState = {
            coverageScore: 100,
            totalRisk: 0,
            premium: 150,
            gameTime: 0
        };
        
        this.updateDisplay();
        this.addLiveUpdate("Game reset - All scenarios withdrawn and stats restored");
    }
    
    optimizePolicy() {
        let optimizationMessage = "Policy optimization complete: ";
        let changes = [];
        
        // Automatically withdraw high-risk scenarios
        Object.entries(this.scenarios).forEach(([type, scenario]) => {
            if (scenario.engaged && scenario.riskLevel > 20) {
                this.withdrawScenario(type);
                const scenarioName = document.querySelector(`[data-scenario="${type}"] h3`).textContent;
                changes.push(`withdrew from ${scenarioName}`);
            }
        });
        
        // Engage health scenario if not already engaged (reduces risk)
        if (!this.scenarios.health.engaged) {
            this.engageScenario('health');
            changes.push("engaged Health Conscious lifestyle");
        }
        
        if (changes.length > 0) {
            optimizationMessage += changes.join(', ');
        } else {
            optimizationMessage += "No changes needed, policy already optimized";
        }
        
        this.addLiveUpdate(optimizationMessage);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InsuranceRiskGame();
});

// Additional interactive features for enhanced user experience
document.addEventListener('keydown', (event) => {
    // Quick keyboard shortcuts
    switch(event.key) {
        case 'r':
        case 'R':
            if (event.ctrlKey) {
                event.preventDefault();
                document.getElementById('resetGame').click();
            }
            break;
        case 'o':
        case 'O':
            if (event.ctrlKey) {
                event.preventDefault();
                document.getElementById('optimizePolicy').click();
            }
            break;
    }
});

// Add visual feedback for interactions
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (!button.disabled) {
            button.style.transform = 'translateY(-1px)';
        }
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});