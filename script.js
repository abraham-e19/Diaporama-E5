document.addEventListener('DOMContentLoaded', function() {
    // ÉLÉMENTS
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const sommaireItems = document.querySelectorAll('.sommaire-item');
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
        "1. Apprentissage Personnel",
        "2. Veille Cybersécurité", 
        "3. Identité Professionnelle",
        "4. Projet Professionnel"
    ];
    
    // FONCTION POUR CHANGER DE SLIDE
    function goToSlide(index) {
        // Validation
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        
        // Cacher toutes les slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Afficher la slide courante
        slides[index].classList.add('active');
        currentSlide = index;
        
        // Mettre à jour la navigation
        updateNavigation();
        
        // Scroll vers le haut (pour mobile)
        window.scrollTo(0, 0);
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
            slideIndicator.textContent = slideNames[currentSlide];
        }
    }
    
    // ÉVÉNEMENTS
    
    // Navigation par points
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Navigation par sommaire
    sommaireItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Bouton "Commencer"
    if (startBtn) {
        startBtn.addEventListener('click', () => goToSlide(1));
    }
    
    // Boutons précédent/suivant
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    
    // Liens de conclusion
    finalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hasAttribute('data-slide')) {
                e.preventDefault();
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
            }
        });
    });
    
    // NAVIGATION CLAVIER
    document.addEventListener('keydown', (e) => {
        // Ignorer si on est dans un input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'PageUp':
                if (currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                }
                e.preventDefault();
                break;
                
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                if (currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                }
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
                
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
                const num = parseInt(e.key);
                if (num >= 0 && num < totalSlides) {
                    goToSlide(num);
                }
                e.preventDefault();
                break;
        }
    });
    
    // NAVIGATION PAR CLIC SUR LES COTÉS
    document.addEventListener('click', (e) => {
        // Ignorer les clics sur les liens, boutons, etc.
        if (e.target.tagName === 'A' || 
            e.target.tagName === 'BUTTON' || 
            e.target.closest('a') || 
            e.target.closest('button')) {
            return;
        }
        
        const windowWidth = window.innerWidth;
        const clickX = e.clientX;
        
        // Clic à droite → slide suivante
        if (clickX > windowWidth * 0.7 && currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
        // Clic à gauche → slide précédente
        else if (clickX < windowWidth * 0.3 && currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });
    
    // INITIALISATION
    goToSlide(0);
    
    // Message de débogage
    console.log('🎯 Diaporama E5 - Abraham Emmanuel chargé !');
    console.log('📋 Navigation : Flèches, Espace, Clic sur les côtés');
    console.log('🔗 Portfolio : https://abraham-e19.github.io/abraham-portfolio/');
});
