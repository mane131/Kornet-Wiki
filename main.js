// Main JavaScript for Kornet Wiki
(function() {
    'use strict';
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Kornet Wiki loaded successfully');
        
        // Add any additional functionality here
        // For example: smooth scrolling, form validation, etc.
        
        // Example: Add click event listeners to all external links
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Opening external link:', this.href);
                // You could add analytics tracking here
            });
        });
        
        // Example: Add smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });
    
    // Function to simulate loading (for testing)
    window.simulateLoading = function() {
        document.body.classList.add('loading');
        document.body.classList.remove('loaded');
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
            loadingScreen.style.visibility = 'visible';
        }
        
        // Hide loading screen after 3 seconds
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            }, 800);
        }, 3000);
    };
    
    // Export functions if using modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            simulateLoading: simulateLoading
        };
    }
})();
