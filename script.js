// Language switching functionality
function changeLanguage() {
    const selectedLang = document.getElementById('language').value;
    const elements = document.querySelectorAll('[data-en]');
    
    // Update document direction for RTL languages
    if (selectedLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Update all translatable elements
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${selectedLang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Save language preference
    localStorage.setItem('preferredLanguage', selectedLang);
}

// Load saved language preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        document.getElementById('language').value = savedLang;
        changeLanguage();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and other elements
    document.querySelectorAll('.feature-card, .screenshot-item, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Add active state to navigation links
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Newsletter signup (placeholder)
function subscribeNewsletter(email) {
    // This would connect to your backend
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing! We will notify you when Momentum launches.');
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // This would connect to your analytics service
    console.log('Event tracked:', category, action, label);
}

// Track download button clicks
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.store-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const store = button.querySelector('img').alt.includes('App Store') ? 'iOS' : 'Android';
            trackEvent('Download', 'Click', store);
            alert(`Momentum will be available soon on ${store}! We'll notify you when it launches.`);
        });
    });
});

