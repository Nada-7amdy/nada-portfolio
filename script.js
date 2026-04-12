// Intersection Observer logic
const observeElements = document.querySelectorAll('.observe');
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
};

const observer = new IntersectionObserver(callback, options);
observeElements.forEach(element => {
    observer.observe(element);
});

// Terminal logic
console.log('Script is running...');