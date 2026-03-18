<script>
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const sommaireCards = document.querySelectorAll('.sommaire-card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const startBtn = document.getElementById('start-btn');
    const slideCounter = document.getElementById('slide-counter');
    const slideIndicator = document.getElementById('slide-indicator');

    let currentSlide = 0;
    const totalSlides = slides.length;

    const slideNames = [
        "Accueil",
        "Plan",
        "Apprentissage personnel",
        "Veille technologique",
        "Identité professionnelle",
        "Projet professionnel"
    ];

    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;

        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });

        if (slides[index]) {
            slides[index].classList.add('active');
            slides[index].style.display = 'block';
            currentSlide = index;
        }

        updateNavigation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateNavigation() {
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

        if (slideCounter) {
            slideCounter.textContent = `${currentSlide + 1}/${totalSlides}`;
        }

        if (slideIndicator) {
            slideIndicator.textContent = slideNames[currentSlide] || `Slide ${currentSlide + 1}`;
        }
    }

    // rendre la fonction accessible depuis le HTML
    window.goToSlide = goToSlide;

    // bouton commencer
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            goToSlide(1);
        });
    }

    // boutons précédent / suivant
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            goToSlide(currentSlide - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            goToSlide(currentSlide + 1);
        });
    }

    // navigation par points
    navDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.dataset.slide, 10);
            if (!isNaN(slideIndex)) {
                goToSlide(slideIndex);
            }
        });
    });

    // navigation par cartes du sommaire
    sommaireCards.forEach(card => {
        card.addEventListener('click', function () {
            const slideIndex = parseInt(this.dataset.slide, 10);
            if (!isNaN(slideIndex)) {
                goToSlide(slideIndex);
            }
        });
    });

    // navigation clavier
    document.addEventListener('keydown', function (e) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            goToSlide(currentSlide + 1);
        }

        if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            goToSlide(currentSlide - 1);
        }

        if (e.key === 'Home') {
            e.preventDefault();
            goToSlide(0);
        }

        if (e.key === 'End') {
            e.preventDefault();
            goToSlide(totalSlides - 1);
        }
    });

    // affichage initial
    goToSlide(0);
});
</script>
