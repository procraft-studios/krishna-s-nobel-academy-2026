/* ==========================================
   KRISHNA'S NOBLE FOUNDATION - MAIN JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Counter animation
    const counters = document.querySelectorAll('.stat-number');
    let counterAnimated = false;

    function animateCounters() {
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            }

            updateCounter();
        });
    }

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);

    if (counters.length > 0) {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            counterObserver.observe(heroStats);
        }
    }

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-fill');
    let progressAnimated = false;

    function animateProgress() {
        progressBars.forEach(function(bar) {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !progressAnimated) {
                progressAnimated = true;
                animateProgress();
            }
        });
    }, observerOptions);

    if (progressBars.length > 0) {
        const programsSection = document.querySelector('.programs-preview, .programs-section');
        if (programsSection) {
            progressObserver.observe(programsSection);
        }
    }

    // Gallery filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });

    // Donation amount selection
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryTotal = document.getElementById('summaryTotal');

    let selectedAmount = 2500;

    amountBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            amountBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            selectedAmount = parseInt(btn.getAttribute('data-amount'));
            if (customAmountInput) customAmountInput.value = '';
            updateSummary();
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            amountBtns.forEach(function(btn) {
                btn.classList.remove('active');
            });
            if (customAmountInput.value) {
                selectedAmount = parseInt(customAmountInput.value);
            }
            updateSummary();
        });
    }

    function updateSummary() {
        if (summaryAmount) summaryAmount.textContent = '₹' + selectedAmount.toLocaleString('en-IN');
        if (summaryTotal) summaryTotal.textContent = '₹' + selectedAmount.toLocaleString('en-IN');
    }

    // Purpose selection update
    const purposeRadios = document.querySelectorAll('input[name="purpose"]');
    const summaryPurpose = document.getElementById('summaryPurpose');

    purposeRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            const purposeLabels = {
                'education': 'Education',
                'healthcare': 'Healthcare',
                'food': 'Food Relief',
                'general': 'General Fund'
            };
            if (summaryPurpose) {
                summaryPurpose.textContent = purposeLabels[radio.value];
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('firstName').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Scroll animations using Intersection Observer
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(function() {
                    entry.target.classList.add('animate-fadeInUp');
                }, delay);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(function(el) {
        animationObserver.observe(el);
    });

    // Payment button click
    const proceedPayment = document.getElementById('proceedPayment');
    
    if (proceedPayment) {
        proceedPayment.addEventListener('click', function() {
            const donorName = document.getElementById('donorName').value;
            const donorEmail = document.getElementById('donorEmail').value;

            if (!donorName || !donorEmail) {
                alert('Please fill in your name and email address.');
                return;
            }
            
            alert('Payment gateway integration coming soon! For now, please use bank transfer or UPI payment methods.');
        });
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px';
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        }
    });

    // Form input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Print functionality
    window.printPage = function() {
        window.print();
    };

    // Console branding
    console.log('%c Krishna\'s Noble Foundation ', 'background: #4CAF50; color: white; font-size: 20px; padding: 10px;');
    console.log('%c कृष्ण\'स नोबल फाउंडेशन ', 'background: #388E3C; color: white; font-size: 14px; padding: 5px;');
    console.log('%c Serving the community since 2010 ', 'color: #666; font-size: 12px;');

});