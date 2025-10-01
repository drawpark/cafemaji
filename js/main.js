document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Header Scroll & Mobile Menu Logic ---
    const header = document.querySelector('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Logic for transparent header on the homepage (index.html)
    if (document.body.classList.contains('is-homepage')) {
        const logo = document.getElementById('logo');
        const navLinks = header.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-white', 'shadow-lg');
                logo.classList.remove('text-amber-300');
                logo.classList.add('text-amber-700');
                mobileMenuButton.classList.remove('text-white');
                mobileMenuButton.classList.add('text-gray-800');
                navLinks.forEach(link => {
                    if (!link.querySelector('.fa-yelp')) { // Yelp icon has different styling
                        link.classList.remove('text-gray-200', 'hover:text-white');
                        link.classList.add('text-gray-700', 'hover:text-amber-700');
                    }
                });
            } else {
                header.classList.remove('bg-white', 'shadow-lg');
                logo.classList.add('text-amber-300');
                logo.classList.remove('text-amber-700');
                mobileMenuButton.classList.add('text-white');
                mobileMenuButton.classList.remove('text-gray-800');
                navLinks.forEach(link => {
                     if (!link.querySelector('.fa-yelp')) {
                        link.classList.add('text-gray-200', 'hover:text-white');
                        link.classList.remove('text-gray-700', 'hover:text-amber-700');
                    }
                });
            }
        });
    }

    // Mobile menu toggle
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


    // --- 2. Scroll Animation Logic ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set delay from data attribute if it exists
                const delay = entry.target.dataset.delay || '0ms';
                entry.target.style.setProperty('--delay', delay);
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    animatedElements.forEach(el => observer.observe(el));


    // --- 3. Advanced Gallery Lightbox Logic ---
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (galleryImages.length > 0) {
        let currentIndex = 0;
        const imagesData = Array.from(galleryImages).map(img => ({ src: img.src, alt: img.alt }));

        function showImage(index) {
            const { src, alt } = imagesData[index];
            lightboxImg.src = src;
            lightboxCaption.textContent = alt;
            currentIndex = index;
        }

        function openLightbox(index) {
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex', 'animate-fade-in');
            lightbox.classList.remove('animate-fade-out');
            document.body.classList.add('lightbox-open');
            showImage(index);
        }

        function closeLightbox() {
            lightbox.classList.add('animate-fade-out');
            lightbox.classList.remove('animate-fade-in');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                document.body.classList.remove('lightbox-open');
            }, 400); // Match animation duration
        }

        function showNextImage() {
            const nextIndex = (currentIndex + 1) % imagesData.length;
            showImage(nextIndex);
        }

        function showPrevImage() {
            const prevIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
            showImage(prevIndex);
        }

        galleryImages.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxNext.addEventListener('click', showNextImage);
        lightboxPrev.addEventListener('click', showPrevImage);
        
        // Close on clicking the background
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('hidden')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            }
        });
    }
});

