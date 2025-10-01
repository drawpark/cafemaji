// JavaScript for header scroll effect
const header = document.querySelector('header');
const logo = document.getElementById('logo');
const navLinks = header.querySelectorAll('.nav-link');
const mobileMenuButton = document.getElementById('mobile-menu-button');

// Function to handle header style changes
function handleHeaderScroll() {
    if (window.scrollY > 50 || !header.classList.contains('text-white')) {
        header.classList.add('bg-white', 'shadow-lg');
        logo.classList.remove('text-amber-300');
        logo.classList.add('text-amber-700');
        mobileMenuButton.classList.remove('text-white');
        mobileMenuButton.classList.add('text-gray-800');
        navLinks.forEach(link => {
            link.classList.remove('text-gray-200', 'hover:text-white');
            link.classList.add('text-gray-700', 'hover:text-amber-700');
        });
    } else {
        header.classList.remove('bg-white', 'shadow-lg');
        logo.classList.add('text-amber-300');
        logo.classList.remove('text-amber-700');
        mobileMenuButton.classList.add('text-white');
        mobileMenuButton.classList.remove('text-gray-800');
        navLinks.forEach(link => {
            link.classList.add('text-gray-200', 'hover:text-white');
            link.classList.remove('text-gray-700', 'hover:text-amber-700');
        });
    }
}

// Initial check for pages that are not the homepage (e.g., menu.html)
// On these pages, the header should be white from the start.
if (window.location.pathname.includes('menu.html') /* Add other pages here like || window.location.pathname.includes('about.html') */) {
    header.classList.remove('text-white');
    handleHeaderScroll(); 
} else {
    window.addEventListener('scroll', handleHeaderScroll);
}


// JavaScript for mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close menu if clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});
