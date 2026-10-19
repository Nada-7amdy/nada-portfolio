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

// Interactive Timeline Filtering
const filterButtons = document.querySelectorAll('.t-filter');
const timelineItems = document.querySelectorAll('.timeline-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        timelineItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('filtered-out');
                item.style.display = 'flex';
            } else {
                item.classList.add('filtered-out');
                setTimeout(() => {
                    if (item.classList.contains('filtered-out')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form: prepares an email in the visitor's configured mail application.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const clientName = document.getElementById('client-name').value.trim();
        const clientEmail = document.getElementById('client-email').value.trim();
        const clientMessage = document.getElementById('client-message').value.trim();
        const sysMsg = document.querySelector('.sys-msg');

        const subject = `Portfolio inquiry from ${clientName}`;
        const body = [
            `Name: ${clientName}`,
            `Email: ${clientEmail}`,
            '',
            'Project details:',
            clientMessage
        ].join('\n');

        window.location.href = `mailto:nada11eelmasry@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        sysMsg.textContent = 'Your email app is opening—please send the prepared message to complete your inquiry.';
        sysMsg.style.color = '#27c93f';
    });
}

console.log('Nada-OS system initialized successfully... Domain: nadaelmasry.me');
