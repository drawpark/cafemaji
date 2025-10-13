/**
 * Interactive Website Script
 * * - Fetches image data from assets/images.json.
 * - Populates all dynamic content, including the restored categorized image grid.
 * - Sets up all original GSAP scroll animations with mobile-responsive optimizations.
 * - Handles header styling and mobile menu functionality.
 */

// Force scroll to top on page refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/**
 * Sets up header scroll effect and mobile menu toggle.
 */
function setupHeaderAndMenu() {
    const header = document.querySelector('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        header.classList.toggle('bg-black/80', window.scrollY > 50);
        header.classList.toggle('backdrop-blur-sm', window.scrollY > 50);
        header.classList.toggle('shadow-lg', window.scrollY > 50);
    });

    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = mobileMenu.contains(e.target) || mobileMenuButton.contains(e.target);
        if (!mobileMenu.classList.contains('hidden') && !isClickInsideMenu) {
            mobileMenu.classList.add('hidden');
        }
    });
}

/**
 * Dynamically populates the page with content from the images object.
 * @param {object} images - The object containing all image URLs.
 */
function populateContent(images) {
    // 1. Hero Section Video
    const heroSection = document.querySelector("#hero-section .sticky");
    if (heroSection) {
        const video = document.createElement('video');
        video.id = 'hero-video';
        video.src = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.className = 'absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50';
        heroSection.prepend(video);
    }

    // 2. Hero Section Card Stack
    const cardStack = document.querySelector("#card-stack");
    if (cardStack) {
        images.drinks.forEach(url => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.backgroundImage = `url(${url})`;
            card.style.willChange = 'transform, opacity';
            cardStack.appendChild(card);
        });
    }

    // 3. People Section Scatter Images
    const scatterContainer = document.querySelector("#scatter-container");
    if (scatterContainer) {
        const peopleAndBaristas = [...images.people, ...images.barista];
        peopleAndBaristas.forEach(url => {
            const item = document.createElement("div");
            item.className = "scatter-item";
            item.style.backgroundImage = `url(${url})`;
            item.style.willChange = 'transform, opacity, filter';
            scatterContainer.appendChild(item);
        });
    }

    // 4. [복원] Glimpse of Our Cafe (Menu/Gallery Grid)
    const gridTargetContainer = document.querySelector("#menu-grid-section .max-w-7xl");
    if (gridTargetContainer) {
        gridTargetContainer.innerHTML = ''; // Clear existing content

        for (const category in images.grid) {
            const title = document.createElement('h3');
            title.className = "font-serif-display text-3xl md:text-4xl text-left mb-8 border-b border-gray-700 pb-4";
            title.textContent = category;
            
            const gridContainer = document.createElement('div');
            gridContainer.className = "grid-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16";
            
            images.grid[category].forEach(url => {
                const item = document.createElement("div");
                item.className = "grid-item group";
                item.innerHTML = `<img src="${url}" alt="${category} image" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">`;
                gridContainer.appendChild(item);
            });

            gridTargetContainer.appendChild(title);
            gridTargetContainer.appendChild(gridContainer);
        }
    }
}

/**
 * Sets up all GSAP animations for the page.
 * @param {object} images - The object containing all image URLs.
 */
function setupAnimations(images) {
    gsap.matchMedia().add({
        isDesktop: `(min-width: 768px)`,
        isMobile: `(max-width: 767px)`
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        // --- 1. Hero Section Animation ---
        const cards = gsap.utils.toArray("#card-stack .card");
        if (cards.length > 0) {
            gsap.set(cards, { top: '50%', left: '50%', xPercent: -50, yPercent: -50 });
            gsap.from("#hero-title", { duration: 1.5, y: 100, opacity: 0, ease: "power4.out", delay: 0.5 });
            gsap.from("#hero-subtitle", { duration: 1.5, y: 50, opacity: 0, ease: "power4.out", delay: 0.8 });
            gsap.from(cards, { duration: 1.5, scale: 0, opacity: 0, stagger: 0.1, ease: "power4.out", delay: 1.2 });

            const tlHero = gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "top top",
                    end: "+=150%",
                    scrub: 1.2,
                    pin: true,
                }
            });
            tlHero.to("#hero-video", { opacity: 0, ease: "power1.inOut" }, 0);
            cards.forEach((card, i) => {
                const spread = isDesktop ? 80 : 30;
                tlHero.to(card, {
                    x: (i - (cards.length - 1) / 2) * spread,
                    rotateZ: (i - (cards.length - 1) / 2) * 5,
                    ease: "power2.out"
                }, 0);
            });
            tlHero.to(["#hero-title", "#hero-subtitle"], {
                opacity: 0,
                y: isMobile ? -50 : -100,
                stagger: 0.05,
                ease: "power2.in"
            }, 0.6);
        }

        // --- 2. Bean Section Animation ---
        const beanContainer = document.getElementById("bean-container");
        if (beanContainer) {
            const beanCount = isMobile ? 20 : 50; 
            const beanImages = images.beans;
            for (let i = 0; i < beanCount; i++) {
                let bean = document.createElement("div");
                bean.className = "bean";
                bean.style.backgroundImage = `url('${beanImages[Math.floor(Math.random() * beanImages.length)]}')`;
                bean.style.willChange = 'transform, opacity';
                beanContainer.appendChild(bean);
            }
            const beans = gsap.utils.toArray(".bean");
            const tlBean = gsap.timeline({ scrollTrigger: { trigger: "#bean-section", start: "top top", end: "bottom top", scrub: 1.5, pin: true } });
            beans.forEach(bean => gsap.set(bean, { x: gsap.utils.random(0, window.innerWidth), y: gsap.utils.random(0, window.innerHeight), scale: gsap.utils.random(0.5, 1.2), opacity: 0 }));
            tlBean.to(beans, { opacity: 1, stagger: 0.05, ease: "power2.out" })
                  .fromTo("#bean-text", { opacity: 0, scale: 0.8, yPercent: 10 }, { opacity: 1, scale: 1, yPercent: 0, ease: "power3.out" }, "<")
                  .to(beans, { x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 0, opacity: 0, duration: 2, stagger: 0.02, ease: "power3.in" }, ">1.5")
                  .to("#bean-text", { opacity: 0, scale: 0.8, yPercent: -10, ease: "power3.in" }, "<");
        }

        // --- 3. Interior Section Animation ---
        const horizontalSection = document.querySelector('.section-horizontal-container');
        if (horizontalSection) {
            const mainTween = gsap.to(horizontalSection, {
                x: () => -(horizontalSection.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: "#interior-section-wrapper",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true
                }
            });
        }
        
        // --- 4. People Section Animation ---
        const scatterItems = gsap.utils.toArray("#scatter-container .scatter-item");
        if (scatterItems.length > 0) {
            const tlPeople = gsap.timeline({ scrollTrigger: { trigger: "#people-section", pin: true, scrub: 1.5, start: "top top", end: "+=300%" } });
            scatterItems.forEach(item => gsap.set(item, { x: gsap.utils.random(-100, 100) + "vw", y: gsap.utils.random(-100, 100) + "vh", rotate: gsap.utils.random(-360, 360) }));
            tlPeople.to(scatterItems, { x: "50vw", y: "50vh", xPercent: -50, yPercent: -50, rotate: 0, stagger: { each: 0.05, from: "random" }, ease: "power2.inOut" })
                .to(scatterItems, { x: () => gsap.utils.random(10, 90) + "vw", y: () => gsap.utils.random(10, 90) + "vh", rotate: () => gsap.utils.random(-45, 45), scale: 1.1, stagger: { each: 0.03, from: "random" }, ease: "power3.out" }, ">-0.5")
                .fromTo("#people-title", { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, ease: "power3.out"}, "<0.5")
                .to("#people-title", { scale: 1.5, opacity: 0, ease: "power3.in"}, ">1.5")
                .to(scatterItems, { x: "50vw", y: "150vh", opacity: 0, scale: 0.5, filter: "blur(10px)", stagger: { each: 0.03, from: "random" }, ease: "power2.in" });
        }

        // --- 5. Menu Grid Section Animation ---
        gsap.utils.toArray('.grid-container').forEach((container) => {
            gsap.from(container.querySelectorAll('.grid-item'), {
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0, y: 60, scale: 0.95, stagger: 0.08, duration: 0.8, ease: 'power3.out'
            });
        });

        // --- 6. Exterior Section Animation ---
        const exteriorSection = document.getElementById("exterior-section");
        if (exteriorSection) {
            const tlExterior = gsap.timeline({ scrollTrigger: { trigger: "#exterior-section", pin: true, scrub: 1, start: "top top", end: "+=250%" } });
            gsap.set("#final-text-container", { opacity: 0, scale: 0.8 });
            gsap.set("#exterior-bg", { scale: 1.2 });
            tlExterior.to("#exterior-bg", { scale: 1, ease: "none" });
            images.exterior.forEach(bg => {
                tlExterior.to("#exterior-bg", { opacity: 0.3, duration: 0.5, onComplete: () => gsap.set("#exterior-bg", { backgroundImage: `url(${bg})` }) })
                    .to("#exterior-bg", { opacity: 1, duration: 0.5 });
            });
            tlExterior.to("#final-text-container", { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, ">-1");
            
            const finalTitle = document.querySelector("#final-title");
            if (finalTitle) {
                const text = "Your Moment Awaits";
                tlExterior.to(finalTitle, { text: { value: text, delimiter: "" }, duration: text.length * 0.1, ease: "none" });
            }
        }
    });
}

/**
 * Main function to initialize the application.
 */
async function main() {
    let images;
    try {
        const response = await fetch('assets/images.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        images = await response.json();
    } catch (error) {
        console.warn("Could not load images.json from server. Using fallback data.", error);
        // Fallback data to prevent site from breaking
        images = {
            "beans": ["https://images.unsplash.com/photo-1509042239860-f550ce711a69?w=200"],
            "drinks": ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"],
            "interior": ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400"],
            "people": ["https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400"],
            "barista": ["https://images.unsplash.com/photo-1534778101976-62847782c213?w=400"],
            "exterior": ["https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?w=1920&q=80"],
            "grid": {
                "Desserts & Foods": ["https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400", "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400"],
                "Unique Interiors": ["https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"],
            }
        };
    }

    // Run setup functions after images are loaded
    populateContent(images);
    setupHeaderAndMenu();
    setupAnimations(images);

    // Refresh ScrollTrigger after everything is loaded and rendered
    window.addEventListener('load', () => {
        setTimeout(() => ScrollTrigger.refresh(), 100);
    });
}

// Start the application after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    main();
});
