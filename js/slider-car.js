document.addEventListener('DOMContentLoaded', function() {
    const acfFields = carouselData.acfFields;

    if (acfFields && acfFields.length > 0) {
        console.log('acfFields:', acfFields); // Debbugage
        const cibleCarousel = document.querySelector('.cible-carousel');

        // Cree le container principal
        const container = document.createElement('div');
        container.className = 'slider-car';

        // Cree le container pour les slides
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides';

      // Cree les slides
      acfFields.forEach((fields, index) => {
            console.log(`Processing fields index ${index}:`, fields); // Debbugage
            const slide = document.createElement('div');
            slide.className = `slide no${index}`;

            const imgElement = document.createElement('img');
            imgElement.src = fields.photo;
            imgElement.alt = fields.profs || `Slide ${index}`;

            // Cree les conteneurs pour le titre et la description
            const conteneurTitres = document.createElement('div');
            conteneurTitres.className = 'prof-post';

            const infoProfs = document.createElement('div');
            infoProfs.className = 'prof-title';

            // Conteneur pour l'image et le texte
            const imgTextContainer = document.createElement('div');
            imgTextContainer.className = 'titre-image-prof';

            // Conteneur pour le titre de l'image
            const titreimg = document.createElement('div');
            titreimg.className = 'texte-prof';

            const titleElement = document.createElement('h2');
            titleElement.textContent = fields.profs;

            const categorie = document.createElement('p');
            categorie.textContent = fields.type;

            const captionElement = document.createElement('p');
            captionElement.textContent = fields.description;

            // Ajouter les elements au slides
            infoProfs.appendChild(titleElement);
            infoProfs.appendChild(categorie);

            titreimg.appendChild(captionElement);

            imgTextContainer.appendChild(titreimg);
            imgTextContainer.appendChild(imgElement);

            conteneurTitres.appendChild(infoProfs);
            conteneurTitres.appendChild(imgTextContainer);


            slide.appendChild(conteneurTitres);
            slide.appendChild(imgTextContainer);
            slidesContainer.appendChild(slide);

            console.log('Slide added:', slide); // Debbugage
        });

        // Ajouter les slides au container principal
        container.appendChild(slidesContainer);

        // Add navigation buttons
        const buttonPrev = document.createElement('button');
        buttonPrev.className = 'prev';
        buttonPrev.textContent = '<';

        const buttonNext = document.createElement('button');
        buttonNext.className = 'next';
        buttonNext.textContent = '>';

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