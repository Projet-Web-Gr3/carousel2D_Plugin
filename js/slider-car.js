document.addEventListener('DOMContentLoaded', function() {
    const acfFields = carouselData.acfFields;

    if (acfFields && acfFields.length > 0) {
        console.log('acfFields:', acfFields); // Debbugage
        const cibleCarousel = document.querySelector('.cible-carousel');

        // Cree le container principal
        const container = document.createElement('div');
        container.className = 'slider-car';

        // Create the slides container
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides';

      // Create carousel items
      acfFields.forEach((fields, index) => {
            console.log(`Processing fields index ${index}:`, fields); // Debbugage
            const slide = document.createElement('div');
            slide.className = `slide no${index}`;

            const imgElement = document.createElement('img');
            imgElement.src = fields.photo;
            imgElement.alt = fields.profs || `Slide ${index}`;

            // Create a container for the text elements
            const infoProfs = document.createElement('div');
            infoProfs.className = 'infoProfs';

            const titleElement = document.createElement('h2');
            titleElement.textContent = fields.profs;

            const categorie = document.createElement('p');
            categorie.textContent = fields.type;

            const captionElement = document.createElement('p');
            captionElement.textContent = fields.description;

            infoProfs.appendChild(titleElement);
            infoProfs.appendChild(categorie);
            infoProfs.appendChild(captionElement);

            slide.appendChild(infoProfs);
            slide.appendChild(imgElement);
            slidesContainer.appendChild(slide);

            console.log('Slide added:', slide); // Debbugage
        });

        // Ajouter les slides au container principal
        container.appendChild(slidesContainer);

        // Add navigation buttons
        const buttonPrev = document.createElement('button');
        buttonPrev.className = 'prev';
        buttonPrev.textContent = 'Précédent';

        const buttonNext = document.createElement('button');
        buttonNext.className = 'next';
        buttonNext.textContent = 'Suivant';

        container.appendChild(buttonPrev);
        container.appendChild(buttonNext);

        // Ajouter le container principal au shortcode
        if (cibleCarousel) {
            cibleCarousel.appendChild(container);
            console.log('Carousel structure added to cible-carousel'); // Debbugage
        } else {
            console.error('Shortcode placeholder not found'); // Debbugage
        }

        // L'index de la slide actuel
        let currentIndex = 0;

        // Fonctions de mise à jour de la position de la slide
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
        console.error('No ACF fields found for the carousel.'); // Debbugage
    }
});