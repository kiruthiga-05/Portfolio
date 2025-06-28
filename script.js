// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Resume download function
function downloadResume() {
    // Convert resume.html to PDF using browser's print functionality
    window.open('resume.html', '_blank');
    
    // You can also use this alternative approach if you want to save it directly:
    // const link = document.createElement('a');
    // link.href = 'resume.html';
    // link.download = 'kiruthiga_resume.pdf';
    // link.click();
}

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
const closeMobileMenu = (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
};

document.addEventListener('click', closeMobileMenu);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Here you would typically send the form data to a server
        // For now, just show a success message
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Form validation
function validateForm(data) {
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add animation on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.project-card, .skills-category, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Add initial opacity and transform to elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.project-card, .skills-category, .contact-info, .contact-form');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
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
