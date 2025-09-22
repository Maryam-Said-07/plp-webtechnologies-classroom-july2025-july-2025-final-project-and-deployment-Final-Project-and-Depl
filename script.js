// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Maryam\'s Portfolio loaded successfully!');
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
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

    // Contact form validation and submission - SIMPLIFIED FOR TESTING
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Remove complex validation temporarily to test basic submission
        console.log('Contact form found and ready for submission');
        
        // Just add visual feedback on submit
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.innerHTML = '<span class="btn-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
            }
        });
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
    
    // Check for success message from form submission
    checkForSuccessMessage();
});

// Function to check URL parameters for success message
function checkForSuccessMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showSuccessMessage();
        // Clean up URL
        const newUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, newUrl);
    }
}

// Function to show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        // Auto-hide after 5 seconds
        setTimeout(() => {
            closeSuccessMessage();
        }, 5000);
    }
}

// Function to close success message
function closeSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'none';
    }
}