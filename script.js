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

// Contact form: sends payload directly to Nada's Gmail via FormSubmit API
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const clientName = document.getElementById('client-name').value.trim();
        const clientEmail = document.getElementById('client-email').value.trim();
        const clientMessage = document.getElementById('client-message').value.trim();
        const sysMsg = document.querySelector('.sys-msg');
        const submitBtn = contactForm.querySelector('.terminal-btn');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting...';
        sysMsg.textContent = '// Transmitting inquiry directly to Nada\'s inbox...';
        sysMsg.style.color = '#ffd700';

        try {
            const response = await fetch('https://formsubmit.co/ajax/nada11eelmasry@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: clientName,
                    email: clientEmail,
                    message: clientMessage,
                    _subject: `⚡ New Inquiry from ${clientName} (nadaelmasry.me)`
                })
            });

            if (response.ok) {
                sysMsg.textContent = `[✓] Inquiry received & delivered directly to Nada's inbox. Expect a response within 24h.`;
                sysMsg.style.color = '#27c93f';
                contactForm.reset();
            } else {
                throw new Error('Transmission failed');
            }
        } catch (error) {
            // Graceful fallback to mail client
            window.location.href = `mailto:nada11eelmasry@gmail.com?subject=${encodeURIComponent('Inquiry from ' + clientName)}&body=${encodeURIComponent(clientMessage)}`;
            sysMsg.textContent = '[!] Fallback: Opening mail application...';
            sysMsg.style.color = '#ffaa00';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = './execute_inquiry.sh';
        }
    });
}

console.log('Nada-OS system initialized successfully... Domain: nadaelmasry.me');
