document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const indicator = document.getElementById('slide-indicator');
    let current = 0;
    const total = slides.length;

    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === current);
        });
        indicator.textContent = `${current + 1}/${total}`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === total - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (current > 0) {
            current--;
            updateSlide();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (current < total - 1) {
            current++;
            updateSlide();
        }
    });

    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === ' ') nextBtn.click(); // Espace = suivant
    });

    // Clic sur la moitié de l'écran pour naviguer
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
        const half = window.innerWidth / 2;
        if (e.clientX > half) nextBtn.click();
        else prevBtn.click();
    });

    updateSlide();
});