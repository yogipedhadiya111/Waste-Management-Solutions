// ====== Document Ready Function ======
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ====== Variables ======
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const resourceItems = document.querySelectorAll('.resource-item');
    const backToTopButton = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const newsletterForm = document.querySelector('.newsletter-form');
    const languageSelect = document.getElementById('language-select');
    const appScreens = document.querySelectorAll('.app-screen');
    const navItems = document.querySelectorAll('.nav-item');
    const reportTypes = document.querySelectorAll('.report-type');
    const mapFilters = document.querySelectorAll('.filter-item');
    
    let currentTestimonial = 0;
    
    // ====== Header Scroll Effect ======
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // ====== Mobile Menu Toggle ======
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = mobileMenuToggle.querySelectorAll('.bar');
        if (mobileMenuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // ====== Close Mobile Menu When Link Clicked ======
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            // Reset hamburger menu
            const bars = mobileMenuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // ====== Active Navigation Link ======
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // ====== Tab Functionality ======
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ====== Resource Category Filter ======
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide resources based on category
            resourceItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 10);
                } else {
                    item.classList.remove('active');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ====== Back to Top Button ======
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ====== Contact Form Submission ======
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Simulate form submission
            console.log('Form submitted with data:', formDataObj);
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccessMessage.classList.add('active');
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccessMessage.classList.remove('active');
            }, 5000);
        });
    }
    
    // ====== Testimonial Slider ======
    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialItems[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Next testimonial
    testimonialNext.addEventListener('click', function() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialItems.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    });
    
    // Previous testimonial
    testimonialPrev.addEventListener('click', function() {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialItems.length - 1;
        }
        showTestimonial(prevIndex);
    });
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialItems.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }, 5000);
    
    // ====== Newsletter Form ======
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate newsletter subscription
            console.log('Newsletter subscription for:', email);
            
            // Show success message
            const formGroup = this.querySelector('.form-group');
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            successMessage.style.marginTop = '15px';
            
            // Replace form with success message
            this.innerHTML = '';
            this.appendChild(successMessage);
            
            // Reset form after 5 seconds
            setTimeout(() => {
                this.innerHTML = `
                    <input type="email" placeholder="Enter your email address" required>
                    <button type="submit" class="btn btn-primary">Subscribe</button>
                `;
                
                // Re-attach event listener
                newsletterForm.addEventListener('submit', arguments.callee);
            }, 5000);
        });
    }
    
    // ====== Language Selection ======
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            console.log('Language changed to:', selectedLanguage);
            
            // In a real application, this would trigger a language change
            // For demo purposes, we'll just show an alert
            alert(`Language changed to ${this.options[this.selectedIndex].text}. In a real application, the content would be translated.`);
        });
    }
    
    // ====== App Screen Navigation ======
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items and screens
            navItems.forEach(navItem => navItem.classList.remove('active'));
            appScreens.forEach(screen => screen.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show corresponding screen
            if (index === 0) {
                document.getElementById('home-screen').classList.add('active');
            } else if (index === 1) {
                document.getElementById('map-screen').classList.add('active');
            }
        });
    });
    
    // ====== Report Type Selection ======
    reportTypes.forEach(type => {
        type.addEventListener('click', function() {
            // Remove active class from all types
            reportTypes.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked type
            this.classList.add('active');
        });
    });
    
    // ====== Map Filter Selection ======
    mapFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            mapFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
        });
    });
    
    // ====== Initialize Charts ======
    initializeCharts();
    
    // ====== Initialize Maps ======
    initializeMaps();
    
    // ====== Initialize Animations ======
    initializeAnimations();
});

// ====== Chart Initialization ======
function initializeCharts() {
    // Waste Chart
    const wasteCtx = document.getElementById('wasteChart');
    if (wasteCtx) {
        new Chart(wasteCtx, {
            type: 'doughnut',
            data: {
                labels: ['Treated', 'Landfill', 'Unaccounted'],
                datasets: [{
                    data: [54, 24, 22],
                    backgroundColor: [
                        '#4caf50',
                        '#ff9800',
                        '#f44336'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }
    
    // Waste Breakdown Chart
    const wasteBreakdownCtx = document.getElementById('wasteBreakdownChart');
    if (wasteBreakdownCtx) {
        new Chart(wasteBreakdownCtx, {
            type: 'bar',
            data: {
                labels: ['Generated', 'Collected', 'Treated', 'Landfill'],
                datasets: [{
                    label: 'Waste (in tonnes)',
                    data: [170339, 156449, 91511, 41455],
                    backgroundColor: [
                        '#2e7d32',
                        '#43a047',
                        '#66bb6a',
                        '#ff9800'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} tonnes`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Facilities Chart
    const facilitiesCtx = document.getElementById('facilitiesChart');
    if (facilitiesCtx) {
        new Chart(facilitiesCtx, {
            type: 'pie',
            data: {
                labels: ['Waste-to-Energy Plants', 'Biomass Power Plants', 'Small Biogas Plants'],
                datasets: [{
                    data: [249, 819, 5080000],
                    backgroundColor: [
                        '#ff9800',
                        '#4caf50',
                        '#009688'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 14
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let value = context.raw;
                                if (value >= 1000000) {
                                    value = (value / 1000000).toFixed(1) + 'M';
                                } else if (value >= 1000) {
                                    value = (value / 1000).toFixed(1) + 'K';
                                }
                                return `${context.label}: ${value}`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// ====== Map Initialization ======
function initializeMaps() {
    // Facilities Map
    const facilitiesMapContainer = document.getElementById('facilities-map-container');
    if (facilitiesMapContainer) {
        // Initialize Leaflet map
        const facilitiesMap = L.map('facilities-map-container').setView([20.5937, 78.9629], 5);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(facilitiesMap);
        
        // Add sample markers for facilities
        const facilities = [
            { lat: 28.7041, lng: 77.1025, type: 'WtE', name: 'Delhi WtE Plant' },
            { lat: 19.0760, lng: 72.8777, type: 'Biogas', name: 'Mumbai Biogas Plant' },
            { lat: 13.0827, lng: 80.2707, type: 'Recycling', name: 'Chennai Recycling Center' },
            { lat: 22.5726, lng: 88.3639, type: 'WtE', name: 'Kolkata WtE Plant' },
            { lat: 12.9716, lng: 77.5946, type: 'Biogas', name: 'Bangalore Biogas Plant' }
        ];
        
        facilities.forEach(facility => {
            let iconColor = '#4caf50'; // Default green
            
            if (facility.type === 'WtE') {
                iconColor = '#ff9800'; // Orange for WtE
            } else if (facility.type === 'Biogas') {
                iconColor = '#009688'; // Teal for Biogas
            }
            
            const customIcon = L.divIcon({
                html: `<div style="background-color: ${iconColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                iconSize: [20, 20],
                className: 'custom-div-icon'
            });
            
            L.marker([facility.lat, facility.lng], { icon: customIcon })
                .addTo(facilitiesMap)
                .bindPopup(`<b>${facility.name}</b><br>Type: ${facility.type}`);
        });
    }
    
    // Contact Map
    const contactMap = document.getElementById('map');
    if (contactMap) {
        // Initialize Leaflet map
        const map = L.map('map').setView([28.6139, 77.2090], 15);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add marker for Ministry of Social Justice & Empowerment
        L.marker([28.6139, 77.2090])
            .addTo(map)
            .bindPopup('<b>Ministry of Social Justice & Empowerment</b><br>Shastri Bhawan, Dr. Rajendra Prasad Road<br>New Delhi - 110001, India')
            .openPopup();
    }
}

// ====== Animation Initialization ======
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll('.solution-detail-item, .overview-card, .facility-card, .feature-item-large, .resource-card, .contact-card');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Counter animation for statistics
    const counters = document.querySelectorAll('.value-number, .stat-number, .figure-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.innerText.replace(/,/g, ''));
                const duration = 2000; // Animation duration in ms
                const increment = target / (duration / 16); // Increment per frame (60fps)
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Circle progress animation
    const circleProgress = document.querySelector('.circle-progress');
    if (circleProgress) {
        const percent = circleProgress.getAttribute('data-percent');
        const circleProgressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const fill = circle.querySelector('.circle-progress-fill');
                    
                    // Animate the circle progress
                    fill.style.background = `conic-gradient(var(--primary-color) 0% ${percent}%, var(--gray-light) ${percent}% 100%)`;
                    
                    circleProgressObserver.unobserve(circle);
                }
            });
        }, { threshold: 0.5 });
        
        circleProgressObserver.observe(circleProgress);
    }
}

// ====== Utility Functions ======
// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Throttle function to limit the rate at which a function can fire
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ====== Service Worker Registration (for PWA) ======
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// ====== Dark Mode Toggle (Optional Feature) ======
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved user preference, if any
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Uncomment to enable dark mode
// initDarkMode();