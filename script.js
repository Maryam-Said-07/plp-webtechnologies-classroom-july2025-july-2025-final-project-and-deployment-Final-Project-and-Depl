// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Maryam\'s Portfolio loaded successfully!');
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked!');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    } else {
        console.log('Hamburger or nav menu not found!');
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"], .btn-primary[href^="#"], .cta-button[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(248, 247, 244, 0.98)';
            } else {
                navbar.style.background = 'rgba(248, 247, 244, 0.95)';
            }
        });
    }
    
    // Animate elements on scroll
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
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .about-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Typing effect for hero title - properly handles HTML
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const fullText = "HEY! I'M MARYAM";
        const highlightText = "I'M A COMPUTER SCIENCE STUDENT";
        
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            let i = 0;
            const typeFirstLine = () => {
                if (i < fullText.length) {
                    heroTitle.innerHTML = fullText.substring(0, i + 1);
                    i++;
                    setTimeout(typeFirstLine, 80);
                } else {
                    // Add line break and start second line
                    heroTitle.innerHTML = fullText + '<br>';
                    setTimeout(typeSecondLine, 300);
                }
            };
            
            let j = 0;
            const typeSecondLine = () => {
                if (j < highlightText.length) {
                    const currentSecondLine = highlightText.substring(0, j + 1);
                    heroTitle.innerHTML = fullText + '<br><span class="highlight">' + currentSecondLine + '</span>';
                    j++;
                    setTimeout(typeSecondLine, 80);
                }
            };
            
            typeFirstLine();
        }, 500);
    }
    
    // Floating animation for decorative elements
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.style.animation = `float ${3 + index}s ease-in-out infinite`;
    });
    
    // Project card hover effects
    const mainProjectCards = document.querySelectorAll('.project-card');
    mainProjectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const detailedProjectCards = document.querySelectorAll('.project-card-detailed');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            detailedProjectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'grid';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            let isValid = true;
            const formData = new FormData(this);
            
            // Name validation
            const name = formData.get('name');
            if (!name || name.trim().length < 2) {
                showError('nameError', 'Please enter a valid name (at least 2 characters)');
                isValid = false;
            }
            
            // Email validation
            const email = formData.get('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation (optional but if provided, should be valid)
            const phone = formData.get('phone');
            if (phone && phone.trim().length > 0) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                    showError('phoneError', 'Please enter a valid phone number');
                    isValid = false;
                }
            }
            
            // Subject validation
            const subject = formData.get('subject');
            if (!subject) {
                showError('subjectError', 'Please select a subject');
                isValid = false;
            }
            
            // Message validation
            const message = formData.get('message');
            if (!message || message.trim().length < 10) {
                showError('messageError', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span class="btn-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    showFormStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    // Form validation helper functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
    
    function showFormStatus(type, message) {
        const statusElement = document.getElementById('formStatus');
        if (statusElement) {
            statusElement.className = `form-status ${type}`;
            statusElement.textContent = message;
            statusElement.style.display = 'block';
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }

    // Add CSS animation keyframes dynamically
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .lines {
            animation: pulse 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(styleElement);
});