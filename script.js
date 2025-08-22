document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in animation to all major sections
    const animatedElements = document.querySelectorAll('.section, .timeline-item, .achievement-card, .skill-category, .education-card, .highlight-box');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // Staggered animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Staggered animation for achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Staggered animation for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });

    // Enhanced hover effects for interactive elements
    const interactiveCards = document.querySelectorAll('.achievement-card, .timeline-content, .skill-category, .education-card, .highlight-box');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-orange-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
    });

    // Skill tag animations
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            if (tag.classList.contains('featured')) {
                this.style.boxShadow = 'var(--shadow-orange-lg)';
            } else {
                this.style.boxShadow = '0 4px 12px rgba(234, 88, 12, 0.2)';
            }
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (tag.classList.contains('featured')) {
                this.style.boxShadow = 'var(--shadow-orange)';
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });

    // Add a typing effect to the main title
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.borderRight = '3px solid white';
        nameElement.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                nameElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    nameElement.style.borderRight = 'none';
                    nameElement.style.animation = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Add blinking cursor animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: white; }
            51%, 100% { border-color: transparent; }
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
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for header background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        body.style.opacity = '1';
    });

    // Contact item click handlers
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const text = item.querySelector('span').textContent;
        
        item.addEventListener('click', () => {
            if (text.includes('@')) {
                window.location.href = `mailto:${text}`;
            } else if (text.includes('+')) {
                window.location.href = `tel:${text}`;
            }
        });
        
        if (text.includes('@') || text.includes('+')) {
            item.style.cursor = 'pointer';
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(-5px)';
                this.style.color = 'rgba(255, 255, 255, 1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.color = 'rgba(255, 255, 255, 0.9)';
            });
        }
    });

    // Add ripple effect to buttons and cards
    function createRipple(event) {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .achievement-card, .timeline-content, .skill-category, .education-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);

    // Add ripple effect to interactive elements
    const rippleElements = document.querySelectorAll('.achievement-card, .timeline-content, .skill-category, .education-card');
    rippleElements.forEach(element => {
        element.addEventListener('click', createRipple);
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0066ff, #00d4aa);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add performance optimization
    let ticking = false;
    
    function updateOnScroll() {
        // Batch scroll-related updates
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    console.log('Ben Liew Resume - Interactive features loaded successfully! 🚀');
});

// Add some easter eggs for tech-savvy visitors
console.log(`
    ╔══════════════════════════════════════╗
    ║         BEN LIEW - GLOBAL CTO        ║
    ║                                      ║
    ║  "Shaping the future of software     ║
    ║   delivery with agentic AI"          ║
    ║                                      ║
    ║  🚀 26+ years of innovation          ║
    ║  🧠 MENSA member                     ║
    ║  🌏 Leading teams across 8 countries ║
    ║                                      ║
    ╚══════════════════════════════════════╝
    
    Interested in working together? 
    📧 banfah@gmail.com
    📱 +65-90069126
`);

// Add some fun keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'C' to copy contact email
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        navigator.clipboard.writeText('banfah@gmail.com').then(() => {
            console.log('📧 Email copied to clipboard!');
        });
    }
    
    // Press 'T' to scroll to top
    if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});