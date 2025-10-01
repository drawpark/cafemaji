// JavaScript for header scroll effect
const header = document.querySelector('header');
const logo = document.getElementById('logo');
// Ensure navLinks are selected correctly for the multi-page structure
const navLinks = header.querySelectorAll('.nav-link');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuButtonIcon = mobileMenuButton.querySelector('i');

// This function needs to be robust for all pages
function handleScroll() {
    // Only apply scroll effect on the homepage
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        if (window.scrollY > 50) {
            header.classList.add('bg-white', 'shadow-lg');
            
            // Change text/icon colors for light background
            header.classList.remove('text-white');
            header.classList.add('text-gray-800');

            logo.classList.remove('text-amber-300');
            logo.classList.add('text-gray-800');

            navLinks.forEach(link => {
                link.classList.add('text-gray-700', 'hover:text-amber-700');
                link.classList.remove('text-white'); // Use text-white for initial state
            });

        } else {
            header.classList.remove('bg-white', 'shadow-lg');

            // Change text/icon colors for transparent background
            header.classList.add('text-white');
            header.classList.remove('text-gray-800');

            logo.classList.add('text-amber-300');
            logo.classList.remove('text-gray-800');
            
            navLinks.forEach(link => {
                link.classList.remove('text-gray-700', 'hover:text-amber-700');
                link.classList.add('text-white');
            });
        }
    }
}

// Set initial header style based on the page
document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Header Logic ---
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        // Homepage starts with a transparent header
        header.classList.add('text-white');
        window.addEventListener('scroll', handleScroll);
        // Initial check in case the page is reloaded halfway down
        handleScroll();
    } else {
        // All other pages start with a solid white header
        header.classList.add('bg-white', 'shadow-lg', 'text-gray-800');
        logo.classList.add('text-gray-800');
        logo.classList.remove('text-amber-300');
         navLinks.forEach(link => {
            link.classList.add('text-gray-700', 'hover:text-amber-700');
            link.classList.remove('text-white');
        });
    }

    // --- New Scroll Animation Logic ---
    // Select all elements with the class 'animate-on-scroll'
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Check if the browser supports IntersectionObserver
    if ("IntersectionObserver" in window) {
        // Set initial styles for elements to be animated
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            // Allow for staggered animations via data-delay attribute in HTML
            el.style.transitionDelay = el.dataset.delay || '0s';
        });

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // When the element is in the viewport
                if (entry.isIntersecting) {
                    // Make it visible
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Stop observing the element after it has been animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger the animation when 10% of the element is visible
        });

        // Start observing each element
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});


// JavaScript for mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
});

// Close menu if clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

