// Admin JS - The Italian Pantry Admin Panel

document.addEventListener('DOMContentLoaded', function() {
    // Default data structure for resetting and initial setup
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
        reviews: [
            {
                id: 'review-1',
                author_name: 'Sarah M.',
                rating: 5,
                text: "The best Italian ingredients I've found outside of Italy. Their olive oil is absolutely incredible!",
                profile_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
            },
            {
                id: 'review-2',
                author_name: 'James R.',
                rating: 5,
                text: 'Authentic flavors that transport you straight to Tuscany. The pasta is hand-rolled perfection.',
                profile_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
            },
            {
                id: 'review-3',
                author_name: 'Maria G.',
                rating: 5,
                text: 'I use their San Marzano tomatoes for everything. You can taste the difference DOP certification makes.',
                profile_photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
            },
            {
                id: 'review-4',
                author_name: 'Marco V.',
                rating: 5,
                text: 'Our restaurant has been sourcing from The Italian Pantry for years. Consistently exceptional quality.',
                profile_photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 'review-5',
                author_name: 'Elena C.',
                rating: 4,
                text: 'Lovely selection of Italian wines and the balsamic vinegar is divine. Will definitely be ordering again.',
                profile_photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
            }
        ]
    };

    // --- Authentication ---
    const loginScreen = document.getElementById('loginScreen');
    const passcodeForm = document.getElementById('passcodeForm');
    const passcodeInput = document.getElementById('passcodeInput');
    const loginFeedback = document.getElementById('loginFeedback');
    const btnLogout = document.getElementById('btnLogout');

    function checkAuth() {
        if (sessionStorage.getItem('pantryAdminAuthenticated') === 'true') {
            loginScreen.classList.add('hidden');
        } else {
            loginScreen.classList.remove('hidden');
            passcodeInput.focus();
        }
    }

    if (passcodeForm) {
        passcodeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const val = passcodeInput.value.trim();
            if (val === 'pantry') {
                sessionStorage.setItem('pantryAdminAuthenticated', 'true');
                loginScreen.classList.add('hidden');
                passcodeInput.value = '';
                showToast('Welcome, Administrator!', 'success');
                initDashboard();
            } else {
                loginFeedback.textContent = 'Invalid Passcode. Please try again.';
                passcodeInput.select();
            }
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            sessionStorage.removeItem('pantryAdminAuthenticated');
            showToast('Logged out successfully.', 'info');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    }

    checkAuth();

    // --- State Management ---
    let pantryData = DEFAULT_PANTRY_DATA;

    function loadPantryData() {
        const stored = localStorage.getItem('italianPantryData');
        if (!stored) {
            localStorage.setItem('italianPantryData', JSON.stringify(DEFAULT_PANTRY_DATA));
            pantryData = DEFAULT_PANTRY_DATA;
        } else {
            try {
                pantryData = JSON.parse(stored);
            } catch (e) {
                pantryData = DEFAULT_PANTRY_DATA;
            }
        }
    }

    function savePantryData() {
        localStorage.setItem('italianPantryData', JSON.stringify(pantryData));
    }

    // --- Navigation (Sidebar Tabs) ---
    const tabLinks = document.querySelectorAll('.sidebar-menu li');
    const tabSections = document.querySelectorAll('.tab-section');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');

            tabLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            tabSections.forEach(sec => {
                if (sec.id === targetTab) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });
        });
    });

    // --- Dashboard Initializer ---
    function initDashboard() {
        loadPantryData();
        updateOverviewStats();
        populateAboutForm();
        renderFoodTable();
        renderPartnersTable();
        renderReviewsTable();
    }

    // --- Toast Notifications ---
    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        if (type === 'info') icon = 'fa-info-circle';

        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        // Remove toast from DOM after animations finish (approx 3s)
        setTimeout(() => {
            toast.remove();
        }, 3200);
    }

    // --- Overview Logic ---
    function updateOverviewStats() {
        document.getElementById('statFoodCount').textContent = pantryData.food ? pantryData.food.length : 0;
        document.getElementById('statPartnerCount').textContent = pantryData.partners ? pantryData.partners.length : 0;
        document.getElementById('statReviewCount').textContent = pantryData.reviews ? pantryData.reviews.length : 0;
    }

    const btnResetData = document.getElementById('btnResetData');
    if (btnResetData) {
        btnResetData.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all content and images to their default values? All custom changes will be lost.')) {
                localStorage.setItem('italianPantryData', JSON.stringify(DEFAULT_PANTRY_DATA));
                showToast('Website content has been reset to defaults.', 'info');
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            }
        });
    }

    // --- About & Hero Logic ---
    const aboutForm = document.getElementById('aboutForm');
    function populateAboutForm() {
        if (!aboutForm) return;

        // Slide Images
        document.getElementById('slideImage1').value = pantryData.heroSlides[0].image;
        document.getElementById('slideImage2').value = pantryData.heroSlides[1].image;
        
        // About Texts
        document.getElementById('aboutP1').value = pantryData.about.paragraph1;
        document.getElementById('aboutP2').value = pantryData.about.paragraph2;
        
        // About Images
        document.getElementById('aboutMainImg').value = pantryData.about.mainImage;
        document.getElementById('aboutImg1').value = pantryData.about.image1;
        document.getElementById('aboutImg2').value = pantryData.about.image2;

        // Update previews
        updateImagePreview('previewSlide1', pantryData.heroSlides[0].image);
        updateImagePreview('previewSlide2', pantryData.heroSlides[1].image);
        updateImagePreview('previewAboutMain', pantryData.about.mainImage);
        updateImagePreview('previewAbout1', pantryData.about.image1);
        updateImagePreview('previewAbout2', pantryData.about.image2);
    }

    if (aboutForm) {
        aboutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect Form Values
            pantryData.heroSlides[0].image = document.getElementById('slideImage1').value;
            pantryData.heroSlides[1].image = document.getElementById('slideImage2').value;
            pantryData.about.paragraph1 = document.getElementById('aboutP1').value;
            pantryData.about.paragraph2 = document.getElementById('aboutP2').value;
            pantryData.about.mainImage = document.getElementById('aboutMainImg').value;
            pantryData.about.image1 = document.getElementById('aboutImg1').value;
            pantryData.about.image2 = document.getElementById('aboutImg2').value;

            savePantryData();
            showToast('Hero & About content updated successfully!', 'success');
            initDashboard();
        });
    }

    // Helper to wire up image uploads
    function setupImageUpload(fileInputId, textInputId, previewId) {
        const fileInput = document.getElementById(fileInputId);
        const textInput = document.getElementById(textInputId);
        
        if (!fileInput || !textInput) return;

        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                const base64String = e.target.result;
                textInput.value = base64String;
                updateImagePreview(previewId, base64String);
            };
            reader.readAsDataURL(file);
        });

        // Update preview on manual input text change
        textInput.addEventListener('input', function() {
            updateImagePreview(previewId, this.value);
        });
    }

    function updateImagePreview(previewId, src) {
        const box = document.getElementById(previewId);
        if (!box) return;

        if (src && src.trim() !== '') {
            box.innerHTML = `<img src="${src}" alt="Preview">`;
        } else {
            box.innerHTML = `<i class="fas fa-image"></i>`;
        }
    }

    // Set up file-upload file-readers
    setupImageUpload('fileSlide1', 'slideImage1', 'previewSlide1');
    setupImageUpload('fileSlide2', 'slideImage2', 'previewSlide2');
    setupImageUpload('fileAboutMain', 'aboutMainImg', 'previewAboutMain');
    setupImageUpload('fileAbout1', 'aboutImg1', 'previewAbout1');
    setupImageUpload('fileAbout2', 'aboutImg2', 'previewAbout2');
    setupImageUpload('fileFoodImg', 'foodImgUrl', 'previewFoodImg');
    setupImageUpload('filePartnerImg', 'partnerImgUrl', 'previewPartnerImg');
    setupImageUpload('fileReviewImg', 'reviewImgUrl', 'previewReviewImg');


    // --- Food Section CRUD ---
    const foodTableBody = document.getElementById('foodTableBody');
    const foodModal = document.getElementById('foodModal');
    const foodForm = document.getElementById('foodForm');
    const btnAddFood = document.getElementById('btnAddFood');

    function renderFoodTable() {
        if (!foodTableBody) return;
        if (!pantryData.food || pantryData.food.length === 0) {
            foodTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--text-muted);">No food items found.</td></tr>`;
            return;
        }

        foodTableBody.innerHTML = pantryData.food.map((f, i) => `
            <tr>
                <td><img class="table-thumb" src="${f.image || ''}" alt="${f.name}"></td>
                <td><strong>${f.name}</strong></td>
                <td><span class="food-category-badge">${f.category || 'N/A'}</span></td>
                <td><span style="color: var(--secondary-color); font-weight:600;"><i class="fas fa-clock"></i> ${f.prepTime || 'N/A'}</span></td>
                <td>${f.description.length > 60 ? f.description.substring(0, 60) + '...' : f.description}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon btn-icon-edit" data-id="${f.id}" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon btn-icon-delete" data-id="${f.id}" title="Delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Attach action events
        foodTableBody.querySelectorAll('.btn-icon-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                openFoodModal(this.getAttribute('data-id'));
            });
        });

        foodTableBody.querySelectorAll('.btn-icon-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteFoodItem(this.getAttribute('data-id'));
            });
        });
    }

    if (btnAddFood) {
        btnAddFood.addEventListener('click', function() {
            openFoodModal();
        });
    }

    function openFoodModal(id = null) {
        if (!foodModal || !foodForm) return;
        
        foodForm.reset();
        document.getElementById('foodItemId').value = id || '';
        document.getElementById('foodModalTitle').textContent = id ? 'Edit Food Product' : 'Add New Food Product';

        if (id) {
            const item = pantryData.food.find(f => f.id === id);
            if (item) {
                document.getElementById('foodName').value = item.name;
                document.getElementById('foodCategory').value = item.category || '';
                document.getElementById('foodPrepTime').value = item.prepTime || '';
                document.getElementById('foodDesc').value = item.description;
                document.getElementById('foodImgUrl').value = item.image;
                updateImagePreview('previewFoodImg', item.image);
            }
        } else {
            updateImagePreview('previewFoodImg', '');
        }

        foodModal.classList.add('active');
    }

    function deleteFoodItem(id) {
        if (confirm('Are you sure you want to delete this food product?')) {
            pantryData.food = pantryData.food.filter(f => f.id !== id);
            savePantryData();
            showToast('Food product deleted.', 'info');
            initDashboard();
        }
    }

    if (foodForm) {
        foodForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('foodItemId').value;
            const name = document.getElementById('foodName').value.trim();
            const category = document.getElementById('foodCategory').value.trim();
            const prepTime = document.getElementById('foodPrepTime').value.trim();
            const description = document.getElementById('foodDesc').value.trim();
            const image = document.getElementById('foodImgUrl').value.trim();

            if (!name || !category || !prepTime || !description || !image) {
                showToast('Please fill out all fields.', 'error');
                return;
            }

            if (id) {
                // Update
                const idx = pantryData.food.findIndex(f => f.id === id);
                if (idx !== -1) {
                    pantryData.food[idx] = { id, name, category, prepTime, description, image };
                    showToast('Food product updated.', 'success');
                }
            } else {
                // Create
                const newId = 'food-' + Date.now();
                pantryData.food.push({ id: newId, name, category, prepTime, description, image });
                showToast('Food product added.', 'success');
            }

            savePantryData();
            foodModal.classList.remove('active');
            initDashboard();
        });
    }


    // --- Dining Partners Section CRUD ---
    const partnerTableBody = document.getElementById('partnerTableBody');
    const partnerModal = document.getElementById('partnerModal');
    const partnerForm = document.getElementById('partnerForm');
    const btnAddPartner = document.getElementById('btnAddPartner');

    function renderPartnersTable() {
        if (!partnerTableBody) return;
        if (!pantryData.partners || pantryData.partners.length === 0) {
            partnerTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: var(--text-muted);">No partners found.</td></tr>`;
            return;
        }

        partnerTableBody.innerHTML = pantryData.partners.map((p, i) => `
            <tr>
                <td><img class="table-thumb" src="${p.image || ''}" alt="${p.name}"></td>
                <td><strong>${p.name}</strong></td>
                <td>${p.info}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon btn-icon-edit" data-id="${p.id}" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon btn-icon-delete" data-id="${p.id}" title="Delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Attach action events
        partnerTableBody.querySelectorAll('.btn-icon-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                openPartnerModal(this.getAttribute('data-id'));
            });
        });

        partnerTableBody.querySelectorAll('.btn-icon-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                deletePartnerItem(this.getAttribute('data-id'));
            });
        });
    }

    if (btnAddPartner) {
        btnAddPartner.addEventListener('click', function() {
            openPartnerModal();
        });
    }

    function openPartnerModal(id = null) {
        if (!partnerModal || !partnerForm) return;

        partnerForm.reset();
        document.getElementById('partnerItemId').value = id || '';
        document.getElementById('partnerModalTitle').textContent = id ? 'Edit Dining Partner' : 'Add New Dining Partner';

        if (id) {
            const item = pantryData.partners.find(p => p.id === id);
            if (item) {
                document.getElementById('partnerName').value = item.name;
                document.getElementById('partnerInfo').value = item.info;
                document.getElementById('partnerImgUrl').value = item.image;
                updateImagePreview('previewPartnerImg', item.image);
            }
        } else {
            updateImagePreview('previewPartnerImg', '');
        }

        partnerModal.classList.add('active');
    }

    function deletePartnerItem(id) {
        if (confirm('Are you sure you want to delete this dining partner?')) {
            pantryData.partners = pantryData.partners.filter(p => p.id !== id);
            savePantryData();
            showToast('Dining partner deleted.', 'info');
            initDashboard();
        }
    }

    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('partnerItemId').value;
            const name = document.getElementById('partnerName').value.trim();
            const info = document.getElementById('partnerInfo').value.trim();
            const image = document.getElementById('partnerImgUrl').value.trim();

            if (!name || !info || !image) {
                showToast('Please fill out all fields.', 'error');
                return;
            }

            if (id) {
                // Update
                const idx = pantryData.partners.findIndex(p => p.id === id);
                if (idx !== -1) {
                    pantryData.partners[idx] = { id, name, info, image };
                    showToast('Dining partner updated.', 'success');
                }
            } else {
                // Create
                const newId = 'partner-' + Date.now();
                pantryData.partners.push({ id: newId, name, info, image });
                showToast('Dining partner added.', 'success');
            }

            savePantryData();
            partnerModal.classList.remove('active');
            initDashboard();
        });
    }


    // --- Reviews Section CRUD ---
    const reviewTableBody = document.getElementById('reviewTableBody');
    const reviewModal = document.getElementById('reviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const btnAddReview = document.getElementById('btnAddReview');

    function renderReviewsTable() {
        if (!reviewTableBody) return;
        if (!pantryData.reviews || pantryData.reviews.length === 0) {
            reviewTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-muted);">No reviews found.</td></tr>`;
            return;
        }

        reviewTableBody.innerHTML = pantryData.reviews.map((r, i) => {
            const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
            return `
                <tr>
                    <td><img class="table-thumb" src="${r.profile_photo_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80'}" alt="${r.author_name}" style="border-radius: 50%;"></td>
                    <td><strong>${r.author_name}</strong></td>
                    <td style="color: var(--secondary-color); font-size: 1.1rem;">${stars}</td>
                    <td>${r.text.length > 50 ? r.text.substring(0, 50) + '...' : r.text}</td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-icon btn-icon-edit" data-id="${r.id}" title="Edit"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon btn-icon-delete" data-id="${r.id}" title="Delete"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Attach action events
        reviewTableBody.querySelectorAll('.btn-icon-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                openReviewModal(this.getAttribute('data-id'));
            });
        });

        reviewTableBody.querySelectorAll('.btn-icon-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteReviewItem(this.getAttribute('data-id'));
            });
        });
    }

    if (btnAddReview) {
        btnAddReview.addEventListener('click', function() {
            openReviewModal();
        });
    }

    function openReviewModal(id = null) {
        if (!reviewModal || !reviewForm) return;

        reviewForm.reset();
        document.getElementById('reviewItemId').value = id || '';
        document.getElementById('reviewModalTitle').textContent = id ? 'Edit Customer Review' : 'Add New Customer Review';

        if (id) {
            const item = pantryData.reviews.find(r => r.id === id);
            if (item) {
                document.getElementById('reviewAuthor').value = item.author_name;
                document.getElementById('reviewRating').value = item.rating;
                document.getElementById('reviewText').value = item.text;
                document.getElementById('reviewImgUrl').value = item.profile_photo_url || '';
                updateImagePreview('previewReviewImg', item.profile_photo_url);
            }
        } else {
            updateImagePreview('previewReviewImg', '');
        }

        reviewModal.classList.add('active');
    }

    function deleteReviewItem(id) {
        if (confirm('Are you sure you want to delete this customer review?')) {
            pantryData.reviews = pantryData.reviews.filter(r => r.id !== id);
            savePantryData();
            showToast('Customer review deleted.', 'info');
            initDashboard();
        }
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('reviewItemId').value;
            const author_name = document.getElementById('reviewAuthor').value.trim();
            const rating = parseInt(document.getElementById('reviewRating').value, 10);
            const text = document.getElementById('reviewText').value.trim();
            const profile_photo_url = document.getElementById('reviewImgUrl').value.trim();

            if (!author_name || isNaN(rating) || !text) {
                showToast('Please fill out all required fields.', 'error');
                return;
            }

            const img = profile_photo_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80';

            if (id) {
                // Update
                const idx = pantryData.reviews.findIndex(r => r.id === id);
                if (idx !== -1) {
                    pantryData.reviews[idx] = { id, author_name, rating, text, profile_photo_url: img };
                    showToast('Customer review updated.', 'success');
                }
            } else {
                // Create
                const newId = 'review-' + Date.now();
                pantryData.reviews.push({ id: newId, author_name, rating, text, profile_photo_url: img });
                showToast('Customer review added.', 'success');
            }

            savePantryData();
            reviewModal.classList.remove('active');
            initDashboard();
        });
    }

    // --- Modal Closing Handlers ---
    const modalCloseButtons = document.querySelectorAll('.modal-close, .btn-modal-cancel');
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const openModal = this.closest('.modal-overlay');
            if (openModal) {
                openModal.classList.remove('active');
            }
        });
    });

    // Close on click outside modal content
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(m => {
        m.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // --- Initialize Dashboard on successful auth ---
    if (sessionStorage.getItem('pantryAdminAuthenticated') === 'true') {
        initDashboard();
    }
});
