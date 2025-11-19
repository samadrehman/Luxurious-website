// script.js - Updated Version

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const headerActions = document.querySelector('.header-actions');
    
    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            if (nav) nav.classList.toggle('active');
            if (headerActions) headerActions.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav && nav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                if (headerActions) headerActions.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Product interaction functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            cartItems++;
            if (cartCount) cartCount.textContent = cartItems;
            
            // Add animation
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1500);
            
            console.log('Product added to cart');
        });
    });
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#e74c3c';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
            
            console.log('Product toggled in wishlist');
        });
    });
    
    // Product card click to go to product detail
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't redirect if clicking on action buttons
            if (!e.target.closest('.product-actions') && !e.target.closest('.add-to-cart')) {
                window.location.href = 'product-detail.html';
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            this.reset();
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value;
                
                console.log('Search for:', searchTerm);
                
                if (searchTerm.trim() !== '') {
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            console.log('Contact form submitted:', { name, email, subject, message });
            
            alert('Thank you for your message! We will get back to you soon.');
            
            this.reset();
        });
    }
    
    // Filter functionality for collections page
    const categoryFilter = document.getElementById('category');
    const priceFilter = document.getElementById('price');
    const sortFilter = document.getElementById('sort');
    
    if (categoryFilter && priceFilter && sortFilter) {
        // Use debounce to prevent multiple rapid calls
        let filterTimeout;
        const applyFiltersDebounced = function() {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(applyFilters, 300);
        };
        
        categoryFilter.addEventListener('change', applyFiltersDebounced);
        priceFilter.addEventListener('change', applyFiltersDebounced);
        sortFilter.addEventListener('change', applyFiltersDebounced);
    }
    
    function applyFilters() {
        const category = categoryFilter ? categoryFilter.value : 'all';
        const price = priceFilter ? priceFilter.value : 'all';
        const sort = sortFilter ? sortFilter.value : 'featured';
        
        console.log('Filters applied:', { category, price, sort });
        
        // Filter products silently without popup
        const productCards = document.querySelectorAll('.product-card');
        let visibleCount = 0;
        
        productCards.forEach(card => {
            let shouldShow = true;
            
            // Category filter (if we had category data attributes)
            // Price filter
            if (price !== 'all') {
                const priceElement = card.querySelector('.current-price');
                if (priceElement) {
                    const priceText = priceElement.textContent.replace(/[^\d]/g, '');
                    const productPrice = parseInt(priceText);
                    
                    if (price === '0-2000' && productPrice >= 2000) shouldShow = false;
                    else if (price === '2000-5000' && (productPrice < 2000 || productPrice >= 5000)) shouldShow = false;
                    else if (price === '5000-10000' && (productPrice < 5000 || productPrice >= 10000)) shouldShow = false;
                    else if (price === '10000+' && productPrice < 10000) shouldShow = false;
                    // Legacy price ranges for backward compatibility
                    else if (price === '0-1000' && productPrice >= 1000) shouldShow = false;
                    else if (price === '1000-2500' && (productPrice < 1000 || productPrice >= 2500)) shouldShow = false;
                    else if (price === '2500-5000' && (productPrice < 2500 || productPrice >= 5000)) shouldShow = false;
                    else if (price === '5000+' && productPrice < 5000) shouldShow = false;
                }
            }
            
            // Show/hide product
            if (shouldShow) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Sort products
        if (sort !== 'featured') {
            const productsGrid = document.querySelector('.products-grid');
            if (productsGrid) {
                const sortedCards = Array.from(productCards).filter(card => card.style.display !== 'none');
                
                if (sort === 'price-low') {
                    sortedCards.sort((a, b) => {
                        const priceA = parseInt(a.querySelector('.current-price').textContent.replace(/[^\d]/g, ''));
                        const priceB = parseInt(b.querySelector('.current-price').textContent.replace(/[^\d]/g, ''));
                        return priceA - priceB;
                    });
                } else if (sort === 'price-high') {
                    sortedCards.sort((a, b) => {
                        const priceA = parseInt(a.querySelector('.current-price').textContent.replace(/[^\d]/g, ''));
                        const priceB = parseInt(b.querySelector('.current-price').textContent.replace(/[^\d]/g, ''));
                        return priceB - priceA;
                    });
                }
                
                sortedCards.forEach(card => productsGrid.appendChild(card));
            }
        }
        
        // Show message if no products found (optional, can be removed)
        const productsGrid = document.querySelector('.products-grid');
        if (visibleCount === 0) {
            if (productsGrid && !productsGrid.querySelector('.no-products-message')) {
                const message = document.createElement('div');
                message.className = 'no-products-message';
                message.style.textAlign = 'center';
                message.style.padding = '40px';
                message.style.gridColumn = '1 / -1';
                message.innerHTML = '<h3>No products found</h3><p>Try adjusting your filters</p>';
                productsGrid.appendChild(message);
            }
        } else {
            if (productsGrid) {
                const message = productsGrid.querySelector('.no-products-message');
                if (message) message.remove();
            }
        }
    }
    
    // Product Detail Page Functionality
    initializeProductDetailPage();
    
    // Tabs functionality
    initializeTabs();
    
    // Modal functionality
    initializeModal();
    
    // Add animation on scroll
    initializeScrollAnimations();
});

// Product Detail Page Functions
function initializeProductDetailPage() {
    // Image thumbnail selection
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Update main image
                mainImage.src = this.querySelector('img').src;
            });
        });
    }
    
    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option:not(.disabled)');
    
    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all size options
                sizeOptions.forEach(o => o.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
            });
        });
    }
    
    // Quantity selector
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (quantityInput && minusBtn && plusBtn) {
        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            }
        });
    }
    
    // Buy Now button
    const buyNowBtn = document.querySelector('.btn-buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            const selectedSize = document.querySelector('.size-option.active');
            const quantity = document.querySelector('.quantity-input').value;
            
            if (!selectedSize) {
                alert('Please select a size before purchasing.');
                return;
            }
            
            // Show purchase confirmation modal
            showModal('Purchase Confirmation', 
                `You are about to purchase this item in size ${selectedSize.textContent} (Quantity: ${quantity}). Proceed to checkout?`);
        });
    }
    
    // Add to Cart button in product detail
    const addToCartDetail = document.querySelector('.btn-add-to-cart');
    if (addToCartDetail) {
        addToCartDetail.addEventListener('click', function() {
            const selectedSize = document.querySelector('.size-option.active');
            const quantity = document.querySelector('.quantity-input').value;
            
            if (!selectedSize) {
                alert('Please select a size before adding to cart.');
                return;
            }
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            let cartItems = parseInt(cartCount.textContent) || 0;
            cartItems += parseInt(quantity);
            cartCount.textContent = cartItems;
            
            // Show confirmation
            showModal('Added to Cart', 
                `Item added to cart! Size: ${selectedSize.textContent}, Quantity: ${quantity}`);
        });
    }
}

// Tabs functionality
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal && closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

function showModal(title, message) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .feature, .about-text, .about-image, .value-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.product-card, .feature, .about-text, .about-image, .value-card, .team-member');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s, transform 0.5s';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}