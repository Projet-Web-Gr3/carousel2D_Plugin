document.addEventListener('DOMContentLoaded', function() {
    const acfFields = carouselData.acfFields;

    if (acfFields && acfFields.length > 0) {
        console.log('acfFields:', acfFields); // Debugging

        // Function to create a carousel
        function createCarousel(targetSelector, type) {
            const cibleCarousel = document.querySelector(targetSelector);

            // Filter fields based on type
            const filteredFields = acfFields.filter(fields => fields.type === type);

            // Create the main container
            const container = document.createElement('div');
            container.className = 'slider-car';

            // Create the container for slides
            const slidesContainer = document.createElement('div');
            slidesContainer.className = 'slides';

            // Create the slides
            filteredFields.forEach((fields, index) => {
                console.log(`Processing fields index ${index}:`, fields); // Debugging
                const slide = document.createElement('div');
                slide.className = `slide no${index}`;

                const imgElement = document.createElement('img');
                imgElement.src = fields.photo;
                imgElement.alt = fields.profs || `Slide ${index}`;

                // Create containers for title and description
                const conteneurTitres = document.createElement('div');
                conteneurTitres.className = 'prof-post';

                const infoProfs = document.createElement('div');
                infoProfs.className = 'prof-title';

                // Container for image and text
                const imgTextContainer = document.createElement('div');
                imgTextContainer.className = 'titre-image-prof';

                // Container for image title
                const titreimg = document.createElement('div');
                titreimg.className = 'texte-prof';

                const titleElement = document.createElement('h2');
                titleElement.textContent = fields.profs;

                const categorie = document.createElement('p');
                categorie.textContent = fields.type;

                const captionElement = document.createElement('p');
                captionElement.textContent = fields.description;

                // Add elements to slides
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

            // Add slides to the main container
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

            // Add the main container to the shortcode
            if (cibleCarousel) {
                cibleCarousel.appendChild(container);
                console.log('Carousel structure added to', targetSelector); // Debugging
            } else {
                console.error('Shortcode placeholder not found for', targetSelector); // Debugging
            }

            // Current slide index
            let currentIndex = 0;

            // Function to update slide position
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

        // Create two carousels
        createCarousel('.cible-carousel-1', 'Créatif');
        createCarousel('.cible-carousel-2', 'Logique');
    } else {
        console.error('No ACF fields found for the carousel.'); // Debugging
    }
});