document.addEventListener('DOMContentLoaded', function() {
    const acfFields = carouselData.acfFields;

    if (acfFields && acfFields.length > 0) {
        console.log('acfFields:', acfFields); // Debugging

        // Fonction pour créer un carousel
        function createCarousel(targetSelector, type) {
            const cibleCarousel = document.querySelector(targetSelector);

            // Filtre les champs ACF par type
            const filteredFields = acfFields.filter(fields => fields.type === type);

            // Cree le container principal
            const container = document.createElement('div');
            container.className = 'slider-car';

            // Cree le container des slides
            const slidesContainer = document.createElement('div');
            slidesContainer.className = 'slides';

            // Cree les slides
            filteredFields.forEach((fields, index) => {
                console.log(`Processing fields index ${index}:`, fields); // Debugging
                const slide = document.createElement('div');
                slide.className = `slide no${index}`;

                const imgElement = document.createElement('img');
                imgElement.src = fields.photo;
                imgElement.alt = fields.profs || `Slide ${index}`;

                // Cree le container des titres et des descriptions
                const conteneurTitres = document.createElement('div');
                conteneurTitres.className = 'prof-post';

                const infoProfs = document.createElement('div');
                infoProfs.className = 'prof-title';

                // Conteneur pour le titre de l'image
                const imgTextContainer = document.createElement('div');
                imgTextContainer.className = 'titre-image-prof';

                // Conteneur pour le titre et la description
                const titreimg = document.createElement('div');
                titreimg.className = 'texte-prof';

                const titleElement = document.createElement('h2');
                titleElement.textContent = fields.profs;

                const categorie = document.createElement('p');
                categorie.textContent = fields.type;

                const captionElement = document.createElement('p');
                captionElement.textContent = fields.description;

                // Ajoute les éléments au DOM
                infoProfs.appendChild(titleElement);
                infoProfs.appendChild(categorie);

                titreimg.appendChild(captionElement);

                imgTextContainer.appendChild(titreimg);
                imgTextContainer.appendChild(imgElement);

                conteneurTitres.appendChild(infoProfs);
                conteneurTitres.appendChild(imgTextContainer);

                slide.appendChild(conteneurTitres);
                slidesContainer.appendChild(slide);

                console.log('Slide added:', slide); // Debugging
            });

            // Ajoute les slides au container principal
            container.appendChild(slidesContainer);

            // Ajoute les boutons de navigation
            const buttonPrev = document.createElement('button');
            buttonPrev.className = 'prev';
            buttonPrev.textContent = '<';

            const buttonNext = document.createElement('button');
            buttonNext.className = 'next';
            buttonNext.textContent = '>';

            container.appendChild(buttonPrev);
            container.appendChild(buttonNext);

            // Ajoute le container principal au DOM
            if (cibleCarousel) {
                cibleCarousel.appendChild(container);
                console.log('Carousel structure added to', targetSelector); // Debugging
            } else {
                console.error('Shortcode placeholder not found for', targetSelector); // Debugging
            }

            // Index actuel de la slide
            let currentIndex = 0;

            // Fonction qui met à jour la position de la slide
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
        }

        // Cree 2 carousels
        createCarousel('.cible-carousel-1', 'Créatif');
        createCarousel('.cible-carousel-2', 'Logique');
    } else {
        console.error('No ACF fields found for the carousel.'); // Debugging
    }
});