// Loading Screen Functionality for Kornet Wiki
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        loadingTime: 4000, // 4 seconds total loading time
        fadeOutTime: 800,  // 800ms fade out animation
        fallbackTime: 5000 // 5 second fallback timeout
    };
    
    // Kornet logo URL (using your GitHub URL)
    const KORNET_LOGO_URL = "https://raw.githubusercontent.com/mane131/Kornet-Wiki/refs/heads/main/kornet.png";
    
    // Preload the logo image to ensure smooth loading
    function preloadLogoImage() {
        const logoImg = document.getElementById('kornet-logo');
        
        // Ensure the image has the correct URL
        if (logoImg) {
            if (!logoImg.src || logoImg.src.includes('placeholder')) {
                logoImg.src = KORNET_LOGO_URL;
            }
            
            console.log('Preloading Kornet logo image:', logoImg.src);
            
            // Create new image object to preload
            const img = new Image();
            img.onload = function() {
                console.log('Kornet logo image loaded successfully');
                // Adjust image styling based on actual dimensions if needed
                adjustLogoStyle(img.width, img.height);
            };
            img.onerror = function() {
                console.error('Failed to load Kornet logo image from:', KORNET_LOGO_URL);
                // Fallback to text if image fails to load
                fallbackToTextLogo();
            };
            img.src = logoImg.src;
        }
    }
    
    // Adjust logo style based on actual image dimensions
    function adjustLogoStyle(width, height) {
        const logoImg = document.getElementById('kornet-logo');
        if (!logoImg) return;
        
        // If image is very wide, adjust max-width
        if (width > 400) {
            logoImg.style.maxWidth = '400px';
        }
        
        // If image is tall, adjust max-height
        if (height > 150) {
            logoImg.style.maxHeight = '150px';
        }
        
        // Center the image
        logoImg.style.display = 'block';
        logoImg.style.margin = '0 auto';
    }
    
    // Fallback to text logo if image fails to load
    function fallbackToTextLogo() {
        const logoContainer = document.querySelector('.loading-logo');
        if (logoContainer) {
            logoContainer.innerHTML = `
                <div style="color: #ff0000; font-size: 3em; text-shadow: 0 0 15px rgba(255, 0, 0, 0.7); font-family: 'Press Start 2P', cursive; animation: pulse 2s infinite;">
                    KORNET
                </div>
            `;
            console.log('Using fallback text logo');
        }
    }
    
    // Main loading screen handler
    function handleLoadingScreen() {
        // Wait for the page to fully load
        window.addEventListener('load', function() {
            console.log('Page fully loaded, starting loading screen transition');
            
            // Add a small delay to ensure the loading animation completes
            setTimeout(function() {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                
                // Remove loading screen from DOM after transition
                setTimeout(function() {
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                        console.log('Loading screen hidden');
                    }
                }, CONFIG.fadeOutTime);
            }, CONFIG.loadingTime);
        });

        // Fallback: If page takes too long to load, show content anyway
        setTimeout(function() {
            if (document.body.classList.contains('loading')) {
                console.log('Fallback timeout triggered, forcing content display');
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                
                setTimeout(function() {
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                        console.log('Loading screen hidden (fallback)');
                    }
                }, CONFIG.fadeOutTime);
            }
        }, CONFIG.fallbackTime);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM ready, initializing loading screen');
            preloadLogoImage();
            handleLoadingScreen();
        });
    } else {
        console.log('DOM already ready, initializing loading screen');
        preloadLogoImage();
        handleLoadingScreen();
    }
    
    // Public API for testing and manual control
    window.KornetLoading = {
        // Function to manually show loading screen
        show: function() {
            document.body.classList.add('loading');
            document.body.classList.remove('loaded');
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'flex';
                loadingScreen.style.opacity = '1';
                loadingScreen.style.visibility = 'visible';
            }
            console.log('Loading screen manually shown');
        },
        
        // Function to manually hide loading screen
        hide: function() {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            setTimeout(function() {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            }, CONFIG.fadeOutTime);
            console.log('Loading screen manually hidden');
        },
        
        // Function to simulate loading (for testing)
        simulate: function(duration = 3000) {
            this.show();
            
            setTimeout(() => {
                this.hide();
            }, duration);
        },
        
        // Update logo image
        updateLogo: function(newSrc) {
            const logoImg = document.getElementById('kornet-logo');
            if (logoImg) {
                logoImg.src = newSrc;
                preloadLogoImage();
                console.log('Logo image updated to:', newSrc);
            }
        },
        
        // Get current logo URL
        getLogoUrl: function() {
            const logoImg = document.getElementById('kornet-logo');
            return logoImg ? logoImg.src : KORNET_LOGO_URL;
        }
    };
})();
