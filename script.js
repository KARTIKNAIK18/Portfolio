// Portfolio JavaScript - All Interactive Features

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized with Formspree email service');
    
    initializePortfolio();
    animateOnScroll();
});

function initializePortfolio() {
    // Initialize all components
    initializeAnimations();
    initializeNavigation();
    initializeFormHandling();
    initializeScrollEffects();
    initializeButtonHandlers();
    initializeContactLinks();
    initializeSkillsSection();
    
    // Initialize projects with a small delay to ensure DOM is ready
    setTimeout(() => {
        initializeProjectsSection();
    }, 100);

    // Animate contact sections on load and scroll
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-container');

    // Apply different animation classes to each section
    if (contactInfo) {
        contactInfo.classList.add('fade-slide-left');
    }
    if (contactForm) {
        contactForm.classList.add('fade-slide-right');
    }

    function animateSection(section) {
        if (section && !section.classList.contains('animated')) {
            section.classList.add('animated');
        }
    }

    function resetAnimation(section) {
        if (section && section.classList.contains('animated')) {
            section.classList.remove('animated');
        }
    }

    // Intersection Observer for scroll-triggered animation
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSection(entry.target);
            } else {
                resetAnimation(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe both sections
    if (contactInfo) {
        observer.observe(contactInfo);
    }
    if (contactForm) {
        observer.observe(contactForm);
    }

    // On page load, animate if already in viewport
    [contactInfo, contactForm].forEach(section => {
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateSection(section);
            }
        }
    });
}

// Animation System - Scroll-Triggered
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delays for hero elements
                if (entry.target.classList.contains('hero-title')) {
                    setTimeout(() => entry.target.classList.add('animated'), 100);
                } else if (entry.target.classList.contains('hero-name')) {
                    setTimeout(() => entry.target.classList.add('animated'), 300);
                } else if (entry.target.classList.contains('hero-subtitle')) {
                    setTimeout(() => entry.target.classList.add('animated'), 500);
                } else if (entry.target.classList.contains('hero-desc')) {
                    setTimeout(() => entry.target.classList.add('animated'), 700);
                } else if (entry.target.classList.contains('hero-btn-row')) {
                    setTimeout(() => entry.target.classList.add('animated'), 900);
                } else if (entry.target.classList.contains('project-card')) {
                    // Get the animation delay from the style attribute
                    const delay = entry.target.style.animationDelay || '0s';
                    const delayMs = parseFloat(delay) * 1000;
                    setTimeout(() => entry.target.classList.add('animated'), delayMs);
                } else {
                    entry.target.classList.add('animated');
                }
            } else {
                // Remove animated class when element is out of view to allow re-animation
                entry.target.classList.remove('animated');
            }
        });
    }, observerOptions);
    
    // Make observer globally accessible for adding project cards later
    window.portfolioObserver = observer;

    // Observe all animated elements (including hero section for scroll animations)
    const animatedElements = document.querySelectorAll(`
        .hero-title,
        .hero-name,
        .hero-subtitle,
        .hero-desc,
        .hero-btn-row,
        .about-left,
        .about-right,
        .skills-header,
        .skill-card,
        .section-title,
        .project-card,
        .contact-left,
        .contact-right
    `);

    animatedElements.forEach(el => observer.observe(el));

    // Trigger navbar animation on load
    setTimeout(() => {
        const navBrand = document.querySelector('.navbar-brand');
        if (navBrand) {
            navBrand.classList.add('animate');
        }
    }, 100);
    
    // Trigger hero animations on page load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-name, .hero-subtitle, .hero-desc, .hero-btn-row');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, 100 + (index * 200));
        });
    }, 200);
    
    // Trigger section title animations on page load
    setTimeout(() => {
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title, index) => {
            setTimeout(() => {
                title.classList.add('animated');
            }, 300 + (index * 100));
        });
    }, 300);
    
    // Trigger project card animations on page load (after projects are created)
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, 500 + (index * 150));
        });
    }, 500);
}

// Navigation System
function initializeNavigation() {
    const navButtons = document.querySelectorAll('nav button');
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const targetSection = document.getElementById(sections[index]);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                updateActiveNavButton(button);
            }
        });
    });

    // Update active nav button on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    updateActiveNavButton(navButtons[index]);
                }
            }
        });
    });
}

function updateActiveNavButton(activeButton) {
    // Remove active class from all buttons
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('text-accent-600', 'font-medium');
        btn.classList.add('text-primary-600');
    });

    // Add active class to clicked button
    if (activeButton) {
        activeButton.classList.remove('text-primary-600');
        activeButton.classList.add('text-accent-600', 'font-medium');
    }
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Validate form
            if (!name || !email || !message) {
                showNotification('❌ Please fill in all fields', 'error');
                return;
            }

            // Enhanced email validation
            const emailError = validateEmail(email);
            if (emailError) {
                showNotification(`❌ ${emailError}`, 'error');
                return;
            }

            // Show sending notification
            showNotification('📧 Sending your message...', 'info');

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                console.log('Sending message via Formspree...');
                
                const formspreeResponse = await fetch('https://formspree.io/f/mvgrnvwz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                });
                
                if (formspreeResponse.ok) {
                    showNotification('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(`Formspree failed with status: ${formspreeResponse.status}`);
                }
            } catch (error) {
                console.error('Email Error Details:', error);
                console.error('Error Message:', error.message);
                console.error('Error Stack:', error.stack);
                console.error('Error Status:', error.status);
                console.error('Error Text:', error.text);
                
                // Handle Formspree errors
                let errorMessage = '❌ Failed to send message. Please try again later.';
                
                if (error.message && typeof error.message === 'string') {
                    if (error.message.includes('Formspree failed')) {
                        if (error.message.includes('429')) {
                            errorMessage = '❌ Too many requests. Please wait a moment and try again.';
                        } else if (error.message.includes('400')) {
                            errorMessage = '❌ Invalid form data. Please check your inputs and try again.';
                        } else if (error.message.includes('500')) {
                            errorMessage = '❌ Server error. Please try again in a few minutes.';
                        } else {
                            errorMessage = '❌ Email service temporarily unavailable. Please try again in a few minutes.';
                        }
                    } else if (error.message.includes('Network')) {
                        errorMessage = '❌ Network error. Please check your connection and try again.';
                    } else if (error.message.includes('fetch')) {
                        errorMessage = '❌ Connection error. Please check your internet and try again.';
                    }
                }
                
                showNotification(errorMessage, 'error');
            }
            
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced email validation with more specific checks
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Invalid email format';
    }
    if (email.length > 254) {
        return 'Email is too long';
    }
    if (email.split('@')[0].length > 64) {
        return 'Email username is too long';
    }
    return null; // Email is valid
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        type === 'info' ? 'bg-blue-500 text-white' :
        'bg-gray-500 text-white'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Button Handlers
function initializeButtonHandlers() {
    // Hero section buttons
    const viewWorkBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('View My Work'));
    const getInTouchBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Get In Touch'));
    const cvBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('CV'));

    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', () => {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (cvBtn) {
        cvBtn.addEventListener('click', () => {
            // Download CV functionality
            const link = document.createElement('a');
            link.href = 'kartik-naik-cv.pdf';
            link.download = 'Kartik-Naik-CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Scroll down arrow
    const scrollArrow = document.querySelector('.absolute.bottom-8 svg');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Contact Links
function initializeContactLinks() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', () => {
            const contactValue = method.querySelector('.contact-value');
            if (contactValue) {
                const text = contactValue.textContent.trim();
                
                if (text.includes('kartiknaik560@gmail.com')) {
                    window.open('mailto:kartiknaik560@gmail.com', '_blank');
                } else if (text.includes('linkedin.com')) {
                    window.open('https://linkedin.com/in/kartik-naik-194326324', '_blank');
                } else if (text.includes('github.com')) {
                    window.open('https://github.com/KARTIKNAIK18', '_blank');
                }
            }
        });
    });
}

// Initialize skills section - just add animation delays to existing cards
function initializeSkillsSection() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize projects section with real data
function initializeProjectsSection() {
    console.log('Initializing projects section...');
    const projectsData = [
        {
            title: "ShopEasy E-Commerce",
            subtitle: "DevOps CI/CD Pipeline Project",
            description: "A comprehensive e-commerce platform with complete DevOps workflow including containerization, Kubernetes deployment, CI/CD pipeline with Jenkins, and infrastructure as code. Demonstrates end-to-end DevOps practices.",
            tags: ["Kubernetes", "Docker", "Jenkins", "CI/CD", "MongoDB"],
            link: "https://github.com/KARTIKNAIK18/e-com-CICD"
        },
        {
            title: "Chat App Kubernetes",
            subtitle: "Microservices Deployment",
            description: "A real-time chat application showcasing microservices architecture deployed on Kubernetes. Features include container orchestration, service mesh, load balancing, and scalable infrastructure for high-performance communication.",
            tags: ["Kubernetes", "Docker", "Microservices", "Ingress", "Service Mesh"],
            link: "https://github.com/KARTIKNAIK18/chat-app-k8s"
        },
        {
            title: "Data Analysis Research",
            subtitle: "MLOps & Data Pipeline",
            description: "A comprehensive data analysis and visualization platform with MLOps practices. Includes automated data pipelines, model deployment, monitoring, and infrastructure for scalable machine learning workflows.",
            tags: ["MLOps", "Docker", "Kubernetes", "Python", "Monitoring"],
            link: "https://github.com/KARTIKNAIK18/data-analysis-research"
        }
    ];

    // Try multiple selectors to find the projects container
    let projectsContainer = document.querySelector('#projects .grid');
    if (!projectsContainer) {
        projectsContainer = document.querySelector('#projects div[class*="grid"]');
    }
    if (!projectsContainer) {
        projectsContainer = document.querySelector('#projects > div > div > div:last-child');
    }
    console.log('Projects container found:', projectsContainer);
    if (projectsContainer) {
        projectsContainer.innerHTML = '';
        console.log('Container found, clearing and adding projects...');
        
        projectsData.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.15}s`;
            // Let CSS handle the animations - start hidden and animate in
            projectCard.innerHTML = `
                <div class="project-header">
                    <div class="project-icon">🚀</div>
                    <div class="project-subtitle">${project.subtitle}</div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `
                            <span class="project-tag">${tag}</span>
                        `).join('')}
                    </div>
                    <button onclick="window.open('${project.link}', '_blank')" class="project-button">
                        View Project
                    </button>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
            console.log('Project card created:', project.title);
            
            // Add the project card to the existing Intersection Observer for scroll animations
            // We'll add it to the observer after all projects are created
        });
        console.log('All projects created successfully');
        
        // Add all project cards to the existing Intersection Observer
        const projectCards = projectsContainer.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            // Find the existing observer and add this card to it
            const existingObserver = window.portfolioObserver;
            if (existingObserver) {
                existingObserver.observe(card);
            }
        });
    } else {
        console.error('Projects container not found!');
        // Fallback: try to find the projects section and add projects directly
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            console.log('Projects section found, creating container manually...');
            const fallbackContainer = document.createElement('div');
            fallbackContainer.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';
            fallbackContainer.style.marginTop = '3rem';
            
            projectsData.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.style.animationDelay = `${index * 0.15}s`;
                projectCard.innerHTML = `
                    <div class="project-header">
                        <div class="project-icon">🚀</div>
                        <div class="project-subtitle">${project.subtitle}</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `
                                <span class="project-tag">${tag}</span>
                            `).join('')}
                        </div>
                        <button onclick="window.open('${project.link}', '_blank')" class="project-button">
                            View Project
                        </button>
                    </div>
                `;
                fallbackContainer.appendChild(projectCard);
                console.log('Fallback project card created:', project.title);
            });
            
            // Find the section title and insert after it
            const sectionTitle = projectsSection.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.parentNode.insertBefore(fallbackContainer, sectionTitle.nextSibling);
                console.log('Fallback container inserted successfully');
            }
        }
    }
}

// Utility Functions
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

// Throttle scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations and effects
}, 16));

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate positions and sizes if needed
}, 250));

// Export functions for global access
window.portfolioUtils = {
    showNotification,
    isValidEmail,
    debounce
};

// Test EmailJS function - you can run this in browser console
window.testEmailJS = function() {
    console.log('Testing EmailJS...');
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    
    if (typeof emailjs !== 'undefined') {
        console.log('EmailJS version:', emailjs.version);
        console.log('EmailJS initialized:', emailjs.init);
        
        // Test sending a simple email
        emailjs.send('service_c844z77', 'template_x4b5cff', {
            from_name: 'Test User',
            from_email: 'test@example.com',
            message: 'This is a test message from the console',
            to_name: 'Kartik Naik'
        })
        .then(function(response) {
            console.log('SUCCESS!', response);
            alert('Email sent successfully! Check your inbox.');
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            alert('Failed to send email: ' + error.text);
        });
    } else {
        alert('EmailJS is not loaded!');
    }
};

function animateOnScroll() {
    // This function is now handled by the main initializeAnimations function
    // The Intersection Observer is set up there for all animated elements
    console.log('Scroll animations initialized');
} 