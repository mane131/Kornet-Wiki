// Main JavaScript for Kornet Wiki
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        wikiName: 'Kornet Wiki',
        version: '1.0.0',
        discordInvite: 'https://discord.gg/u5En32wvwM',
        kornetWebsite: 'https://kornet.lat',
        kornetLogo: 'https://raw.githubusercontent.com/mane131/Kornet-Wiki/refs/heads/main/kornet.png'
    };
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log(`${CONFIG.wikiName} v${CONFIG.version} initialized`);
        console.log(`Kornet Logo: ${CONFIG.kornetLogo}`);
        
        // Set up external link tracking
        setupExternalLinks();
        
        // Set up smooth scrolling for anchor links
        setupSmoothScrolling();
        
        // Add any additional functionality here
        setupWikiFeatures();
        
        // Display current year in footer (optional)
        updateFooterYear();
        
        // Log initialization complete
        console.log('Wiki initialization complete');
    });
    
    // Set up external links with tracking
    function setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            // Add external link indicator
            if (!link.querySelector('.external-indicator')) {
                link.innerHTML += ' <span class="external-indicator" style="font-size: 0.7em;">↗</span>';
            }
            
            // Add click event listener
            link.addEventListener('click', function(e) {
                console.log(`Opening external link: ${this.href}`);
                // You could add analytics tracking here
                // Example: sendAnalyticsEvent('external_link_click', { url: this.href });
            });
        });
        
        console.log(`Set up ${externalLinks.length} external links`);
    }
    
    // Set up smooth scrolling for anchor links
    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add visual feedback (optional)
                    targetElement.style.outline = '2px dashed #ff0000';
                    setTimeout(() => {
                        targetElement.style.outline = 'none';
                    }, 1000);
                }
            });
        });
    }
    
    // Set up additional wiki features
    function setupWikiFeatures() {
        // Add copy to clipboard functionality for Discord invite
        const discordLink = document.querySelector('a[href*="discord.gg/u5En32wvwM"]');
        if (discordLink) {
            discordLink.title = 'Join Kornet Discord Server';
            
            // Add click handler for Discord link
            discordLink.addEventListener('click', function(e) {
                console.log('Kornet Discord invite clicked');
                // Optional: Track Discord clicks
            });
        }
        
        // Add click handler for Kornet website link
        const websiteLink = document.querySelector('a[href*="kornet.lat"]');
        if (websiteLink) {
            websiteLink.title = 'Visit Kornet Website';
        }
        
        console.log('Wiki features initialized');
    }
    
    // Update footer with current year
    function updateFooterYear() {
        const currentYear = new Date().getFullYear();
        const footer = document.querySelector('footer');
        
        if (footer) {
            // Find and replace 2025 with current year
            footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
        }
    }
    
    // Utility function to get section by name
    window.getWikiSection = function(sectionName) {
        const sections = document.querySelectorAll('section');
        for (const section of sections) {
            const heading = section.querySelector('h2');
            if (heading && heading.textContent.toLowerCase().includes(sectionName.toLowerCase())) {
                return section;
            }
        }
        return null;
    };
    
    // Public API for Kornet Wiki
    window.KornetWiki = {
        config: CONFIG,
        
        // Get staff list as organized object
        getStaffList: function() {
            const staffList = document.querySelector('.staff-list');
            if (!staffList) return { owners: [], admins: [], mods: [], devs: [] };
            
            const staff = {
                owners: [],
                admins: [],
                mods: [],
                devs: []
            };
            
            const lines = staffList.textContent.split('\n');
            
            lines.forEach(line => {
                if (line.includes('Owners:')) {
                    const names = line.split('Owners:')[1].trim();
                    staff.owners = names.split(',').map(name => name.trim());
                } else if (line.includes('Administrators:')) {
                    const names = line.split('Administrators:')[1].trim();
                    staff.admins = names.split(',').map(name => name.trim());
                } else if (line.includes('Moderators:')) {
                    const names = line.split('Moderators:')[1].trim();
                    staff.mods = names.split(',').map(name => name.trim());
                } else if (line.includes('Developers / Leads:')) {
                    const names = line.split('Developers / Leads:')[1].trim();
                    staff.devs = names.split(',').map(name => name.trim());
                }
            });
            
            return staff;
        },
        
        // Navigate to section
        navigateToSection: function(sectionName) {
            const section = getWikiSection(sectionName);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return true;
            }
            return false;
        },
        
        // Get all section names
        getSectionNames: function() {
            const sections = document.querySelectorAll('section h2');
            return Array.from(sections).map(h2 => h2.textContent.trim());
        },
        
        // Get Discord invite
        getDiscordInvite: function() {
            return CONFIG.discordInvite;
        },
        
        // Get Kornet website
        getKornetWebsite: function() {
            return CONFIG.kornetWebsite;
        },
        
        // Get logo URL
        getLogoUrl: function() {
            return CONFIG.kornetLogo;
        }
    };
    
    // Log initialization
    console.log(`${CONFIG.wikiName} JavaScript loaded`);
})();
