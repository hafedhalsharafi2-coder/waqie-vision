// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showError('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }
            
            // If validation passes, show success message
            showSuccess();
            
            // Reset form
            contactForm.reset();
            
            // Optional: Log the form data (in a real application, this would be sent to a server)
            console.log('Form Data:', {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toLocaleString('ar-SA')
            });
        });
    }
});

// ===== SHOW SUCCESS MESSAGE =====
function showSuccess() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

// ===== SHOW ERROR MESSAGE =====
function showError(message) {
    // Create error message element if it doesn't exist
    let errorMessage = document.getElementById('errorMessage');
    
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.id = 'errorMessage';
        errorMessage.className = 'error-message';
        errorMessage.style.cssText = `
            display: none;
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            color: #721c24;
            text-align: center;
            animation: slideDown 0.4s ease;
        `;
        
        const form = document.getElementById('contactForm');
        if (form) {
            form.parentNode.insertBefore(errorMessage, form);
        }
    }
    
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Auto-hide after 4 seconds
    setTimeout(function() {
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }, 4000);
}

// ===== SMOOTH SCROLLING FOR INTERNAL LINKS =====
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ===== ADD ACTIVE CLASS TO CURRENT PAGE LINK =====
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SCROLL TO TOP BUTTON =====
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTopBtn';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        display: none;
        width: 50px;
        height: 50px;
        background-color: #1a5f3d;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5em;
        z-index: 99;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    scrollBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#2d8f5f';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#1a5f3d';
        this.style.transform = 'scale(1)';
    });
});

// ===== FORM INPUT VALIDATION IN REAL-TIME =====
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            } else {
                this.style.borderColor = '#28a745';
                this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
            }
        });
        
        emailInput.addEventListener('focus', function() {
            this.style.borderColor = '#1a5f3d';
            this.style.boxShadow = '0 0 0 3px rgba(26, 95, 61, 0.1)';
        });
    }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(event) {
    // Skip to main content with Ctrl + Alt + M
    if (event.ctrlKey && event.altKey && event.key === 'm') {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===== UTILITY FUNCTION: Format Date =====
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        locale: 'ar-SA'
    };
    return new Date(date).toLocaleDateString('ar-SA', options);
}

// ===== UTILITY FUNCTION: Debounce =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== DYNAMIC YEAR IN FOOTER =====
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            const currentYear = new Date().getFullYear();
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
});
