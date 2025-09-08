document.addEventListener('DOMContentLoaded', function() {
    // AST Foundation Day Counter - Run this first
    function updateDaysCounter() {
        try {
            const foundingDate = new Date('2021-12-15'); // AST founding date
            const currentDate = new Date();
            const timeDifference = currentDate - foundingDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            
            const counter = document.getElementById('days-counter');
            if (counter) {
                counter.textContent = daysDifference.toLocaleString();
                console.log('Day counter updated:', daysDifference);
            } else {
                console.log('Day counter element not found');
            }
        } catch (error) {
            console.error('Error updating day counter:', error);
        }
    }

    // Update counter immediately
    updateDaysCounter();
    
    // Update counter every hour (3600000 milliseconds)
    setInterval(updateDaysCounter, 3600000);

    // Set dark mode as default
    document.documentElement.removeAttribute('data-theme');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const themeToggle = document.querySelector('.theme-toggle');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            // Restore body scroll when menu closes
            document.body.style.overflow = '';
        });
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }

    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        const isDarkMode = !document.documentElement.getAttribute('data-theme');
        
        if (window.scrollY > 100) {
            if (isDarkMode) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.4)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            }
        } else {
            if (isDarkMode) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Admin panel integration
    function updateElementFromStorage(storageKey, selector, isHTML = false) {
        const content = localStorage.getItem(storageKey);
        if (content) {
            const element = document.querySelector(selector);
            if (element) {
                if (isHTML) {
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
                }
            }
        }
    }

    function loadHeroContent() {
        updateElementFromStorage('ast_hero_title', '.hero h1');
        updateElementFromStorage('ast_hero_description', '.hero p');
    }

    function loadAboutContent() {
        updateElementFromStorage('ast_mission_text', '.about-text p');
        updateElementFromStorage('ast_achievements_text', '.esports-achievements p');
    }

    function loadLeadershipContent() {
        const leaders = [
            { key: 'ast_president_info', selector: '.leader:nth-child(1)', title: 'President Reno' },
            { key: 'ast_speaker_info', selector: '.leader:nth-child(2)', title: 'Speaker Michael' },
            { key: 'ast_vp_info', selector: '.leader:nth-child(3)', title: 'VP Frostbot' }
        ];

        leaders.forEach(leader => {
            const info = localStorage.getItem(leader.key);
            if (info) {
                updateElementFromStorage(leader.key, leader.selector, true);
                const element = document.querySelector(leader.selector);
                if (element) {
                    element.innerHTML = `<strong>${leader.title}</strong> - ${info}`;
                }
            }
        });

        updateElementFromStorage('ast_tournament_highlight', '.tournament-highlights p');
    }

    function loadServicesContent() {
        const services = [
            { key: 'ast_government_desc', selector: '.service-card:nth-child(1) p' },
            { key: 'ast_esports_desc', selector: '.service-card:nth-child(2) p' },
            { key: 'ast_weather_desc', selector: '.service-card:nth-child(3) p' }
        ];

        services.forEach(service => {
            updateElementFromStorage(service.key, service.selector);
        });
    }

    function loadAdminUpdates() {
        loadHeroContent();
        loadAboutContent();
        loadLeadershipContent();
        loadServicesContent();
    }

    // Listen for messages from admin panel
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'ast_admin_update') {
            const { section, data } = event.data;
            
            switch (section) {
                case 'hero':
                    if (data.title) {
                        const titleElement = document.querySelector('.hero h1');
                        if (titleElement) titleElement.textContent = data.title;
                    }
                    if (data.description) {
                        const descElement = document.querySelector('.hero p');
                        if (descElement) descElement.textContent = data.description;
                    }
                    break;
                    
                case 'about':
                    if (data.mission) {
                        const missionElement = document.querySelector('.about-text p');
                        if (missionElement) missionElement.textContent = data.mission;
                    }
                    if (data.achievements) {
                        const achievementsElement = document.querySelector('.esports-achievements p');
                        if (achievementsElement) achievementsElement.textContent = data.achievements;
                    }
                    break;
                    
                case 'leadership':
                    if (data.president) {
                        const presidentElement = document.querySelector('.leader:nth-child(1)');
                        if (presidentElement) {
                            presidentElement.innerHTML = `<strong>President Reno</strong> - ${data.president}`;
                        }
                    }
                    if (data.speaker) {
                        const speakerElement = document.querySelector('.leader:nth-child(2)');
                        if (speakerElement) {
                            speakerElement.innerHTML = `<strong>Speaker Michael</strong> - ${data.speaker}`;
                        }
                    }
                    if (data.vp) {
                        const vpElement = document.querySelector('.leader:nth-child(3)');
                        if (vpElement) {
                            vpElement.innerHTML = `<strong>VP Frostbot</strong> - ${data.vp}`;
                        }
                    }
                    if (data.tournament) {
                        const tournamentElement = document.querySelector('.tournament-highlights p');
                        if (tournamentElement) tournamentElement.textContent = data.tournament;
                    }
                    break;
                    
                case 'services':
                    if (data.government) {
                        const govElement = document.querySelector('.service-card:nth-child(1) p');
                        if (govElement) govElement.textContent = data.government;
                    }
                    if (data.esports) {
                        const esportsElement = document.querySelector('.service-card:nth-child(2) p');
                        if (esportsElement) esportsElement.textContent = data.esports;
                    }
                    if (data.weather) {
                        const weatherElement = document.querySelector('.service-card:nth-child(3) p');
                        if (weatherElement) weatherElement.textContent = data.weather;
                    }
                    break;
            }
        }
    });

    // Load any existing admin updates on page load
    loadAdminUpdates();

});