// Dark & Sophisticated Portfolio - Main JavaScript
// ================================================

// ===== Mobile Menu Toggle with Backdrop =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navigation = document.querySelector('.navigation');
const navBackdrop = document.querySelector('.nav-backdrop');
const navItems = document.querySelectorAll('.nav-item');

if (mobileMenuToggle && navBackdrop) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenuToggle.classList.toggle('active');
        navigation.classList.toggle('active');
        navBackdrop.classList.toggle('active');
    });

    // Close menu when clicking backdrop
    navBackdrop.addEventListener('click', () => {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.classList.remove('active');
        navigation.classList.remove('active');
        navBackdrop.classList.remove('active');
    });

    // Close menu when clicking nav item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.classList.remove('active');
            navigation.classList.remove('active');
            navBackdrop.classList.remove('active');
        });
    });
}

// ===== Scroll Progress Bar =====
const progressBar = document.querySelector('.scroll-progress-bar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===== Navbar Scroll Shrink Effect =====
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// ===== Typing Effect for Hero =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const texts = ['Python Developer', 'Django Expert', 'Network Specialist', 'CCTV Professional'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDelay = 2000;

    function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex--);
        } else {
            typingText.textContent = currentText.substring(0, charIndex++);
        }

        let timeout = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            timeout = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeEffect, timeout);
    }

    // Start typing effect
    typeEffect();
}

// ===== Hero Parallax Effect (Desktop Only) =====
const hero = document.querySelector('#hero');
const heroImage = document.querySelector('.hero-right img');

if (hero && heroImage && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = hero.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const tiltX = (y - 0.5) * 20; // -10 to 10 degrees
        const tiltY = (x - 0.5) * -20;

        heroImage.style.transform = `
            perspective(1000px)
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            scale(1.05)
        `;
    });

    hero.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // Animate skill progress circles
            if (entry.target.classList.contains('skill-card')) {
                animateSkillProgress(entry.target);
            }

            // Animate stats counters
            if (entry.target.classList.contains('stat-card')) {
                animateCounter(entry.target);
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.project, .skill-card, .stat-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// ===== Skill Progress Animation =====
function animateSkillProgress(skillCard) {
    const progressCircle = skillCard.querySelector('.progress-circle');
    if (progressCircle) {
        const percentage = progressCircle.getAttribute('data-percentage');
        const circumference = 2 * Math.PI * 54; // 2πr where r=54
        const offset = circumference - (percentage / 100) * circumference;

        setTimeout(() => {
            progressCircle.style.strokeDashoffset = offset;
        }, 100);
    }
}

// ===== Counter Animation for Stats =====
function animateCounter(statCard) {
    const counter = statCard.querySelector('.stat-number');
    if (counter && !counter.classList.contains('counted')) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        counter.classList.add('counted');

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + '+';
        }, 16);
    }
}

// ===== Testimonials Carousel =====
const testimonialCards = document.querySelectorAll('.testimonial-card');
const carouselDots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (testimonialCards.length > 0) {
    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;
    let autoplayTimer;

    function showTestimonial(index) {
        // Remove active class from all cards and dots
        testimonialCards.forEach(card => card.classList.remove('active'));
        carouselDots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current card and dot
        testimonialCards[index].classList.add('active');
        if (carouselDots[index]) {
            carouselDots[index].classList.add('active');
        }

        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(prev);
    }

    function startAutoplay() {
        autoplayTimer = setInterval(nextTestimonial, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            stopAutoplay();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            stopAutoplay();
            startAutoplay();
        });
    }

    // Event listeners for dots
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Initialize
    showTestimonial(0);
    startAutoplay();

    // Pause autoplay on hover
    document.querySelector('.testimonials-carousel')?.addEventListener('mouseenter', stopAutoplay);
    document.querySelector('.testimonials-carousel')?.addEventListener('mouseleave', startAutoplay);
}

// ===== FormSpree Contact Form =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.classList.remove('success', 'error');
        formStatus.style.display = 'none';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.classList.add('success');
                formStatus.style.display = 'block';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Oops! Something went wrong. Please try again.';
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        }
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Active Nav Item on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNavItem() {
    const scrollY = window.pageYOffset;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavItem);

// ===== Add fade-in class to CSS =====
// Add this CSS dynamically for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .project, .skill-card, .stat-card, .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .project.fade-in, .skill-card.fade-in, .stat-card.fade-in, .testimonial-card.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===== Button Ripple Effect =====
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Apply ripple to all buttons
document.querySelectorAll('.cta, .contact-form-submit, .carousel-btn').forEach(btn => {
    btn.classList.add('ripple-container');
    btn.addEventListener('click', createRipple);
});

console.log('Portfolio initialized successfully! 🚀');
