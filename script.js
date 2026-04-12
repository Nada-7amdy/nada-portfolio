// Intersection Observer logic for scroll animations
const observeElements = document.querySelectorAll('.hidden');
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
};

const observer = new IntersectionObserver(callback, options);
observeElements.forEach(element => {
    observer.observe(element);
});

// Terminal form logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const sysMsg = document.querySelector('.sys-msg');
        sysMsg.textContent = 'Message sent successfully! Connection secured.';
        sysMsg.style.color = '#27c93f';
        contactForm.reset();
    });
}

console.log('Nada-OS system initialized successfully...');