document.addEventListener('DOMContentLoaded', function() {
    // Extraire les URL des images de la page
    const imageElements = document.querySelectorAll('.wp-block-image img');
    const imageUrls = Array.from(imageElements).map(img => img.src);

    // Retirer les images de la page
    imageElements.forEach(img => img.parentElement.remove());

    if (imageUrls.length > 0) {
        console.log('imageUrls:', imageUrls); // Debugging line
        const cibleCarousel = document.querySelector('.cible-carousel');

        // Cree le container principal
        const container = document.createElement('div');
        container.className = 'slider-car';

        // Cree le container des slides
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides';

        // Cree les slides
        imageUrls.forEach((imageUrl, index) => {
            const slide = document.createElement('div');
            slide.className = `slide no${index}`;

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = `Slide ${index}`;

            slide.appendChild(imgElement);
            slidesContainer.appendChild(slide);
        });

        // Ajoute le container des slides au container principal
        container.appendChild(slidesContainer);

        // Ajoute les boutons de navigation
        const buttonPrev = document.createElement('button');
        buttonPrev.className = 'prev';
        buttonPrev.textContent = 'Précédent';

        const buttonNext = document.createElement('button');
        buttonNext.className = 'next';
        buttonNext.textContent = 'Suivant';

        container.appendChild(buttonPrev);
        container.appendChild(buttonNext);

        // Ajoute le container principal a la page
        if (cibleCarousel) {
            cibleCarousel.appendChild(container);
        } else {
            console.error('Shortcode placeholder not found');
        }

        // Index de la slide actuelle
        let currentIndex = 0;

        // Fonction pour mettre a jour la position des slides
        function updateSlidePosition() {
            const slideWidth = container.clientWidth;
            slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        buttonPrev.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slidesContainer.children.length - 1;
            updateSlidePosition();
        });

        buttonNext.addEventListener('click', function() {
            currentIndex = (currentIndex < slidesContainer.children.length - 1) ? currentIndex + 1 : 0;
            updateSlidePosition();
        });

        updateSlidePosition();
        window.addEventListener('resize', updateSlidePosition);
    } else {
        console.error('No images found for the carousel.');
    }
});