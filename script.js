document.addEventListener('DOMContentLoaded', function() {
    // Default data structure for initialization and resetting
    const DEFAULT_PANTRY_DATA = {
        heroSlides: [
            { image: 'images/Left-Print.jpg' },
            { image: 'images/Right-print.jpg' }
        ],
        about: {
            paragraph1: 'For three generations, our family has been passionate about bringing the authentic flavors of Italy to food lovers around the world. From the sun-kissed tomatoes of San Marzano to the finest extra virgin olive oils of Tuscany, we carefully select each product to ensure you experience the true taste of Italy.',
            paragraph2: 'Our pantry is filled with time-honored ingredients that have been the foundation of Italian cuisine for centuries. Every jar of sauce, bottle of oil, and package of pasta tells a story of tradition, quality, and love for good food.',
            mainImage: 'images/ourstory.jpg',
            image1: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            image2: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        food: [
            {
                id: 'food-1',
                name: 'Extra Virgin Olive Oil',
                description: 'Cold-pressed from the finest Tuscan olives, with a rich, peppery finish.',
                image: 'images/olive-oil.jpg',
                prepTime: '5 mins',
                category: 'Oil'
            },
            {
                id: 'food-2',
                name: 'Artisan Pasta',
                description: 'Handmade pasta from durum wheat semolina, bronze-drawn for perfect texture.',
                image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                prepTime: '20 mins',
                category: 'Pasta'
            },
            {
                id: 'food-3',
                name: 'San Marzano Tomatoes',
                description: 'DOP certified tomatoes from the volcanic soils of Mount Vesuvius.',
                image: 'images/plate.jpg',
                prepTime: '10 mins',
                category: 'Pantry'
            },
            {
                id: 'food-4',
                name: 'Aged Balsamic Vinegar',
                description: 'Traditional balsamic from Modena, aged 12 years in wooden barrels.',
                image: 'images/bread.jpg',
                prepTime: 'Ready',
                category: 'Vinegar'
            },
            {
                id: 'food-5',
                name: 'Fresh Mozzarella',
                description: 'Buffalo mozzarella sourced from small dairies in Campania.',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                prepTime: '15 mins',
                category: 'Cheese'
            },
            {
                id: 'food-6',
                name: 'Italian Wine Selection',
                description: 'Curated wines from Chianti, Barolo, and Montepulciano regions.',
                image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                prepTime: 'Ready',
                category: 'Wine'
            }
        ],
        partners: [
            {
                id: 'partner-1',
                name: 'Ristorante Bellavista',
                info: 'Downtown · Italian Fine Dining',
                image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'partner-2',
                name: 'Cafe Roma',
                info: 'East Side · Coffee & Pastries',
                image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'partner-3',
                name: 'Trattoria Firenze',
                info: 'West End · Family-Style Italian',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'partner-4',
                name: 'Pizza Napoletana',
                info: 'Midtown · Authentic Neapolitan Pizza',
                image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'partner-5',
                name: 'Osteria Venezia',
                info: 'Harbor District · Seafood & Wine',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'partner-6',
                name: 'Gelateria Amore',
                info: 'South Park · Artisan Gelato',
                image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
        ],
        reviews: []
    };

    // Populate reviews from reviews-data.js if it exists globally
    if (typeof reviewsData !== 'undefined' && reviewsData.length) {
        DEFAULT_PANTRY_DATA.reviews = reviewsData;
    }

    // Load data from localStorage or initialize
    function getPantryData() {
        let stored = localStorage.getItem('italianPantryData');
        if (!stored) {
            localStorage.setItem('italianPantryData', JSON.stringify(DEFAULT_PANTRY_DATA));
            return DEFAULT_PANTRY_DATA;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            return DEFAULT_PANTRY_DATA;
        }
    }

    // Dynamic Rendering Functions
    function renderDynamicContent() {
        const data = getPantryData();

        // 1. Render Hero Slides
        const heroContainer = document.querySelector('.hero-slideshow');
        if (heroContainer && data.heroSlides) {
            heroContainer.innerHTML = data.heroSlides.map((slide, i) => 
                `<div class="slide ${i === 0 ? 'active' : ''}" style="background-image: url('${slide.image}');"></div>`
            ).join('');
        }

        // 2. Render About Section
        const aboutContainer = document.querySelector('.about-content');
        if (aboutContainer && data.about) {
            aboutContainer.innerHTML = `
                <div class="about-text">
                    <p>${data.about.paragraph1}</p>
                    <p>${data.about.paragraph2}</p>
                </div>
                <div class="about-images">
                    <img src="${data.about.mainImage}" alt="Italian family cooking" class="about-img-main">
                    <img src="${data.about.image1}" alt="Italian cafe interior" class="about-img-1">
                    <img src="${data.about.image2}" alt="Italian dining" class="about-img-2">
                </div>
            `;
        }

        // 3. Render Food Section
        const foodContainer = document.querySelector('.food-grid');
        if (foodContainer && data.food) {
            foodContainer.innerHTML = data.food.map(f => `
                <div class="food-card">
                    <img src="${f.image}" alt="${f.name}">
                    <div class="food-card-content">
                        <div class="food-meta">
                            ${f.category ? `<span class="food-category">${f.category}</span>` : '<span></span>'}
                            ${f.prepTime ? `<span class="food-prep-time"><i class="fas fa-clock"></i> Prep: ${f.prepTime}</span>` : ''}
                        </div>
                        <h3>${f.name}</h3>
                        <p>${f.description}</p>
                    </div>
                </div>
            `).join('');
        }

        // 4. Render Dining Partners Section
        const partnersContainer = document.querySelector('.partners-grid');
        if (partnersContainer && data.partners) {
            partnersContainer.innerHTML = data.partners.map(p => `
                <div class="partner-card">
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>${p.info}</p>
                </div>
            `).join('');
        }

        // 5. Render Reviews Section
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (reviewsContainer && data.reviews) {
            const colors = ['card-orange', 'card-blue', 'card-purple'];
            reviewsContainer.innerHTML = data.reviews.map((r, i) => {
                const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
                const themeColor = colors[i % colors.length];
                return `
                    <div class="review-card ${themeColor}">
                        <div class="pin"></div>
                        <div class="card-inner">
                            <div class="review-stars">${stars}</div>
                            <p class="review-text">"${r.text}"</p>
                            <div class="review-author">
                                <div>
                                    <strong>${r.author_name}</strong>
                                    <span>Google Reviewer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // Render all elements
    renderDynamicContent();

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const headerEl = document.querySelector('.header');
        if (headerEl) {
            if (window.scrollY > 100) {
                headerEl.style.background = '#791314';
                headerEl.style.backdropFilter = 'blur(10px)';
            } else {
                headerEl.style.background = '#791314';
                headerEl.style.backdropFilter = 'none';
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerEl = document.querySelector('.header');
                const headerHeight = headerEl ? headerEl.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.food-card, .partner-card, .review-card, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const foodSection = document.querySelector('#food');
            if (foodSection) {
                const headerEl = document.querySelector('.header');
                const headerHeight = headerEl ? headerEl.offsetHeight : 0;
                const targetPosition = foodSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Logo click and scroll show/hide header logic
    const headerEl = document.getElementById("dvHeader");
    const logoEl = document.getElementById("logoLink");
    let ignoreScroll = false;

    if (logoEl && headerEl) {
        // Show header on logo click
        logoEl.addEventListener("click", function () {
            headerEl.style.display = "block";
            ignoreScroll = true;

            setTimeout(() => {
                ignoreScroll = false;
            }, 1000);
        });

        // Hide header when scrolled near the logo
        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.addEventListener("scroll", function () {
            if (ignoreScroll) return;

            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll < lastScrollTop){
                const logoPosition = logoEl.getBoundingClientRect().top;
                if (logoPosition >= 0 && logoPosition < window.innerHeight / 2) {
                    headerEl.style.display = "none";
                }
            }
            lastScrollTop = currentScroll;
        });
    }
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Scroll to top on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
