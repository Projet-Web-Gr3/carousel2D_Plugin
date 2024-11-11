document.addEventListener('DOMContentLoaded', function() {
    // Conteneur du carousel
    const container = document.createElement('div');
    container.className = 'slider-car';

    // conteneur des slides et les slides à l'intérieur
    const slides = document.createElement('div');
    slides.className = 'slides';

    // Boucle pour créer les slides
    for (let i = 0; i < carouselImages.images.length; i++) {
        const slide = document.createElement('div');
        slide.className = `slide no${i}`;

        const img = document.createElement('img');
        img.src = carouselImages.images[i];
        img.alt = `Slide ${i}`;

        slide.appendChild(img);
        slides.appendChild(slide);
    }

    // Append les slides au container
    container.appendChild(slides);

    // Les 2 boutons pour suivant et précédent
    const buttonPrev = document.createElement('button');
    buttonPrev.className = 'prev';
    buttonPrev.textContent = 'Précédent';
    container.appendChild(buttonPrev);

    const buttonNext = document.createElement('button');
    buttonNext.className = 'next';
    buttonNext.textContent = 'Suivant';
    container.appendChild(buttonNext);

    // Append le container au body
    const shortcodePlaceholder = document.querySelector('.cible-carousel');
    if (shortcodePlaceholder) {
        shortcodePlaceholder.appendChild(container);
    } else {
        console.error('Shortcode placeholder not found');
    }

    // L'index de la slide actuelle
    let currentIndex = 0;

    // Fonction qui met à jour la position des slides
    function updateSlidePosition() {
        const slideWidth = container.clientWidth;
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Écouteur d'événement pour les 2 boutons pour faire défiler les slides
    buttonPrev.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselImages.images.length - 1;
        updateSlidePosition();
    });

    buttonNext.addEventListener('click', function() {
        currentIndex = (currentIndex < carouselImages.images.length - 1) ? currentIndex + 1 : 0;
        updateSlidePosition();
    });

    // Update initial de la position des slides
    updateSlidePosition();

    // Update de la position des slides lors du redimensionnement de la fenêtre
    window.addEventListener('resize', updateSlidePosition);
});