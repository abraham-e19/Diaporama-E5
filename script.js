document.addEventListener('DOMContentLoaded', function() {
    // ÉLÉMENTS
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const sommaireItems = document.querySelectorAll('.sommaire-card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const startBtn = document.getElementById('start-btn');
    const slideIndicator = document.getElementById('slide-indicator');
    const finalLinks = document.querySelectorAll('.final-link[data-slide]');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // NOMS DES SLIDES POUR L'INDICATEUR
    const slideNames = [
        "Accueil - Abraham Emmanuel",
        "Plan de présentation",
        "Profil",
        "Entreprise - Stage chez Linkt",
        "Projets",
        "Compétences",
        "Veille technologique",
        "Conclusion"
    ];
    
    // FONCTION POUR CHANGER DE SLIDE
    function goToSlide(index) {
        // Validation
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        
        // Cacher toutes les slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Afficher la slide courante
        if (slides[index]) {
            slides[index].classList.add('active');
            currentSlide = index;
        }
        
        // Mettre à jour la navigation
        updateNavigation();
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // METTRE À JOUR LA NAVIGATION
    function updateNavigation() {
        // Points de navigation
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Boutons précédent/suivant
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
        
        // Indicateur de slide
        if (slideIndicator) {
            if (slideNames[currentSlide]) {
                slideIndicator.textContent = slideNames[currentSlide];
            } else {
                slideIndicator.textContent = `Slide ${currentSlide + 1}`;
            }
        }
    }
    
    // NAVIGATION PAR POINTS
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const slideIndex = parseInt(this.getAttribute('data-slide'), 10);
            if (!isNaN(slideIndex)) {
                goToSlide(slideIndex);
            }
        });
    });
    
    // NAVIGATION PAR SOMMAIRE
    sommaireItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const slideIndex = parseInt(this.getAttribute('data-slide'), 10);
            if (!isNaN(slideIndex)) {
                goToSlide(slideIndex);
            }
        });
    });
    
    // BOUTON "COMMENCER"
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            goToSlide(1);
        });
    }
    
    // BOUTONS PRÉCÉDENT / SUIVANT
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goToSlide(currentSlide + 1);
        });
    }
    
    // LIENS FINAUX
    finalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const slideIndex = parseInt(this.getAttribute('data-slide'), 10);
            if (!isNaN(slideIndex)) {
                e.preventDefault();
                goToSlide(slideIndex);
            }
        });
    });
    
    // NAVIGATION CLAVIER
    document.addEventListener('keydown', function(e) {
        // Ignorer si on est dans un champ de saisie
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        
        switch (e.key) {
            case 'ArrowLeft':
            case 'PageUp':
                goToSlide(currentSlide - 1);
                e.preventDefault();
                break;
                
            case 'ArrowRight':
            case 'PageDown':
            case ' ':
                goToSlide(currentSlide + 1);
                e.preventDefault();
                break;
                
            case 'Home':
                goToSlide(0);
                e.preventDefault();
                break;
                
            case 'End':
                goToSlide(totalSlides - 1);
                e.preventDefault();
                break;
        }
    });
    
    // NAVIGATION PAR CLIC SUR LES CÔTÉS
    document.addEventListener('click', function(e) {
        // Ignorer les clics sur les éléments interactifs
        if (
            e.target.tagName === 'A' ||
            e.target.tagName === 'BUTTON' ||
            e.target.closest('a') ||
            e.target.closest('button') ||
            e.target.closest('.sommaire-card') ||
            e.target.closest('.nav-dot')
        ) {
            return;
        }
        
        const windowWidth = window.innerWidth;
        const clickX = e.clientX;
        
        // Zone droite = slide suivante
        if (clickX > windowWidth * 0.75) {
            goToSlide(currentSlide + 1);
        }
        
        // Zone gauche = slide précédente
        else if (clickX < windowWidth * 0.25) {
            goToSlide(currentSlide - 1);
        }
    });
    
    // INITIALISATION
    goToSlide(0);
    
    console.log('🎯 Diaporama E5 chargé avec succès');
});
