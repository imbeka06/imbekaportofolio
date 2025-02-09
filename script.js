// Page routing system
const pages = {
    'home': document.getElementById('home-page'),
    'projects': document.getElementById('projects-page'),
    'skills': document.getElementById('skills-page'),
    'contact': document.getElementById('contact-page')
};

function showPage(pageId) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageId].classList.add('active');
}

// Handle dashboard navigation
document.querySelectorAll('.dashboard-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        showPage(pageId);
    });
});

// Handle initial page load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash && pages[hash]) {
        showPage(hash);
    }
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    showPage(hash || 'home');
});

// Email form handling
const form = document.querySelector('.hologram-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            successMessage.style.animation = 'none';
            void successMessage.offsetWidth; // Trigger reflow
            successMessage.style.animation = 'transmitGlow 2s';
            form.reset();
        }
    } catch (error) {
        console.error('Transmission failed:', error);
    }
});
