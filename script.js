// Header scroll effect
const header = document.getElementById('header');
let lastScrollY = 0;

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Menu tabs
const menuTabs = document.querySelectorAll('.menu__tab');
const menuCategories = document.querySelectorAll('.menu__category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all categories
        menuCategories.forEach(cat => cat.classList.remove('active'));
        
        // Show corresponding category
        const tabId = tab.dataset.tab;
        const category = document.getElementById(`tab-${tabId}`);
        if (category) {
            category.classList.add('active');
        }
    });
});

// Scroll animations using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.anim-fade-in, .anim-fade-in-up').forEach(el => {
    animateOnScroll.observe(el);
});

// Reservation form to WhatsApp
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const message = document.getElementById('message').value;
    
    // Format the date for display
    const dateObj = new Date(date + 'T12:00:00');
    const formattedDate = dateObj.toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Build WhatsApp message
    let whatsappMessage = `Hola Bautista! 👋\n\n`;
    whatsappMessage += `Quiero hacer una reserva:\n\n`;
    whatsappMessage += `👤 *Nombre:* ${name}\n`;
    whatsappMessage += `📅 *Fecha:* ${formattedDate}\n`;
    whatsappMessage += `🕐 *Hora:* ${time}\n`;
    whatsappMessage += `👥 *Personas:* ${guests}\n`;
    
    if (message) {
        whatsappMessage += `\n💬 *Mensaje:* ${message}\n`;
    }
    
    whatsappMessage += `\n📱 *Teléfono de contacto:* ${phone}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp
    window.open(`https://wa.me/5491168722702?text=${encodedMessage}`, '_blank');
});

// Set minimum date for reservation (today)
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect on hero (subtle)
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero__bg img');
    
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.3}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// Gallery lightbox effect (optional enhancement)
const galleryItems = document.querySelectorAll('.galeria__item');

galleryItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox__overlay"></div>
                <div class="lightbox__content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox__close">&times;</button>
                </div>
            `;
            
            // Add styles
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            `;
            
            const overlay = lightbox.querySelector('.lightbox__overlay');
            overlay.style.cssText = `
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0.9);
            `;
            
            const content = lightbox.querySelector('.lightbox__content');
            content.style.cssText = `
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 85vh;
                border-radius: 8px;
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox__close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 32px;
                cursor: pointer;
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close on click
            const closeLightbox = () => {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            };
            
            overlay.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', closeOnEsc);
                }
            });
        }
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations for visible elements
    handleScroll();
    
    // Add loaded class for initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});