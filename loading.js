// Loading Screen Functionality
(function() {
    'use strict';
    
    // Wait for the page to fully load
    window.addEventListener('load', function() {
        // Add a small delay to ensure the loading animation completes
        setTimeout(function() {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Remove loading screen from DOM after transition
            setTimeout(function() {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            }, 800); // Match the CSS transition time
        }, 1000); // Total loading time (3s animation + 1s delay)
    });

    // Fallback: If page takes too long to load, show content anyway
    setTimeout(function() {
        if (document.body.classList.contains('loading')) {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            setTimeout(function() {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            }, 800);
        }
    }, 5000); // 5 second fallback
    
    // Preload image if using an image logo
    function preloadLogoImage() {
        const logoImg = document.querySelector('.loading-logo img');
        if (logoImg && logoImg.src) {
            const img = new Image();
            img.src = logoImg.src;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadLogoImage);
    } else {
        preloadLogoImage();
    }
})();
