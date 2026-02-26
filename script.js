// Business Logic for DevOps Portfolio

// Theme Toggle Functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    document.body.className = savedTheme;
    updateThemeButton();
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton();
}

function updateThemeButton() {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
        const isDark = document.body.classList.contains('dark-mode');
        btn.textContent = isDark ? '☀️ LIGHT MODE' : '🌙 DARK MODE';
    }
}

// Skill Selection & Storage
function initializeSkills() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    const savedSkills = JSON.parse(localStorage.getItem('selectedSkills')) || [];
    
    skillBoxes.forEach(box => {
        if (savedSkills.includes(box.textContent)) {
            box.classList.add('selected');
        }
        
        box.addEventListener('click', function() {
            this.classList.toggle('selected');
            updateSelectedSkills();
        });
    });
}

function updateSelectedSkills() {
    const selected = Array.from(document.querySelectorAll('.skill-box.selected'))
        .map(box => box.textContent);
    localStorage.setItem('selectedSkills', JSON.stringify(selected));
    console.log('Selected skills:', selected);
}

// Smooth Scroll Behavior
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Section Animation on Scroll
function initializeScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => observer.observe(section));
}

// Email Validation for Contact Links
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initializeContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-info a');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('mailto:')) {
                const email = href.replace('mailto:', '');
                if (!validateEmail(email)) {
                    e.preventDefault();
                    console.warn('Invalid email address');
                    alert('Please update the email address in the contact information.');
                }
            }
        });
    });
}

// Analytics Tracker - Track user interactions
function initializeAnalytics() {
    const analytics = {
        pageViews: parseInt(localStorage.getItem('pageViews')) || 0,
        skillsClicked: parseInt(localStorage.getItem('skillsClicked')) || 0,
        themeToggles: parseInt(localStorage.getItem('themeToggles')) || 0
    };
    
    // Increment page views on load
    analytics.pageViews++;
    localStorage.setItem('pageViews', analytics.pageViews);
    
    // Track theme toggles
    const originalToggle = window.toggleTheme;
    window.toggleTheme = function() {
        analytics.themeToggles++;
        localStorage.setItem('themeToggles', analytics.themeToggles);
        return originalToggle.apply(this, arguments);
    };
    
    // Track skill clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('skill-box')) {
            analytics.skillsClicked++;
            localStorage.setItem('skillsClicked', analytics.skillsClicked);
        }
    });
    
    console.log('Analytics:', analytics);
}

// Print Analytics Report
function printAnalytics() {
    const analytics = {
        pageViews: parseInt(localStorage.getItem('pageViews')) || 0,
        skillsClicked: parseInt(localStorage.getItem('skillsClicked')) || 0,
        themeToggles: parseInt(localStorage.getItem('themeToggles')) || 0
    };
    
    console.log('=== Portfolio Analytics ===');
    console.log(`Page Views: ${analytics.pageViews}`);
    console.log(`Skills Clicked: ${analytics.skillsClicked}`);
    console.log(`Theme Toggles: ${analytics.themeToggles}`);
    console.log('===========================');
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeSkills();
    initializeSmoothScroll();
    initializeScrollAnimation();
    initializeContactLinks();
    initializeAnalytics();
    
    // Make printAnalytics available in console
    window.printAnalytics = printAnalytics;
    
    console.log('%cWelcome to Elad Alush DevOps Portfolio', 'color: #00ff00; font-size: 16px; font-weight: bold;');
    console.log('Type "printAnalytics()" to see visitor analytics');
});
