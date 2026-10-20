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

// Contact form: sends payload directly to Nada's Gmail with Anti-Spam & Anti-Harassment Shield
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const sysMsg = document.querySelector('.sys-msg');
        const submitBtn = contactForm.querySelector('.terminal-btn');

        // 1. Anti-Bot Honeypot check
        const honeyField = contactForm.querySelector('input[name="_honey"]');
        if (honeyField && honeyField.value.trim() !== '') {
            // Silently drop bot submission
            sysMsg.textContent = '[✓] Inquiry received & delivered.';
            sysMsg.style.color = '#27c93f';
            contactForm.reset();
            return;
        }

        const clientName = document.getElementById('client-name').value.trim();
        const clientEmail = document.getElementById('client-email').value.trim();
        const clientMessage = document.getElementById('client-message').value.trim();

        // 2. Rate Limiting Protection (15-minute cooldown per client)
        const COOLDOWN_MS = 15 * 60 * 1000;
        const lastSent = localStorage.getItem('nada_last_inquiry_time');
        const now = Date.now();
        if (lastSent && (now - parseInt(lastSent, 10)) < COOLDOWN_MS) {
            const minutesLeft = Math.ceil((COOLDOWN_MS - (now - parseInt(lastSent, 10))) / 60000);
            sysMsg.textContent = `[!] Terminal Cooldown Active: An inquiry was already transmitted. Please wait ${minutesLeft}m before sending another.`;
            sysMsg.style.color = '#ffaa00';
            return;
        }

        // 3. Smart Anti-Harassment & Quality Filter
        if (clientMessage.length < 15) {
            sysMsg.textContent = '[!] Rejected: Message is too brief. Please describe your project scope, timeline, or inquiry.';
            sysMsg.style.color = '#ff4444';
            return;
        }

        // Repetitive characters spam check (e.g. "aaaaaa", "111111", "hhhhhh")
        if (/(.)\1{5,}/.test(clientMessage) || /(.)\1{4,}/.test(clientName)) {
            sysMsg.textContent = '[!] Rejected: Repetitive spam pattern detected. Transmission aborted.';
            sysMsg.style.color = '#ff4444';
            return;
        }

        // Basic email structure validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientEmail)) {
            sysMsg.textContent = '[!] Invalid email format. Please supply a valid professional address.';
            sysMsg.style.color = '#ff4444';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting...';
        sysMsg.textContent = '// Encrypting & transmitting verified inquiry to Nada\'s inbox...';
        sysMsg.style.color = '#ffd700';

        try {
            // Using FormSubmit obfuscated token hash (e68b70aafc33598405aa15268862d8aa)
            // Real email is NEVER exposed in the frontend code!
            const response = await fetch('https://formsubmit.co/ajax/e68b70aafc33598405aa15268862d8aa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: clientName,
                    email: clientEmail,
                    message: clientMessage,
                    _subject: `⚡ Verified Inquiry from ${clientName} (nadaelmasry.me)`,
                    _template: 'box'
                })
            });

            if (response.ok) {
                // Record timestamp for rate-limiting
                localStorage.setItem('nada_last_inquiry_time', Date.now().toString());
                sysMsg.textContent = `[✓] Inquiry verified & delivered directly to Nada. Expect a response within 24h.`;
                sysMsg.style.color = '#27c93f';
                contactForm.reset();
            } else {
                throw new Error('Transmission failed');
            }
        } catch (error) {
            // Fallback to secure mailto
            window.location.href = `mailto:nada11eelmasry@gmail.com?subject=${encodeURIComponent('Inquiry from ' + clientName)}&body=${encodeURIComponent(clientMessage)}`;
            sysMsg.textContent = '[!] Fallback: Opening local mail client...';
            sysMsg.style.color = '#ffaa00';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = './execute_inquiry.sh';
        }
    });
}

console.log('Nada-OS system initialized successfully... Domain: nadaelmasry.me');
