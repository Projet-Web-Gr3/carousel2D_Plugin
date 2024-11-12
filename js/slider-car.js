document.addEventListener('DOMContentLoaded', function() {
    const acfFields = carouselData.acfFields;

    if (acfFields && acfFields.length > 0) {
        console.log('acfFields:', acfFields); // Debugging line
        const cibleCarousel = document.querySelector('.cible-carousel');

        // Create the main carousel container
        const container = document.createElement('div');
        container.className = 'slider-car';

        // Create the slides container
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides';

        // Create carousel items
        acfFields.forEach((fields, index) => {
            console.log(`Processing fields index ${index}:`, fields); // Debugging line
            const slide = document.createElement('div');
            slide.className = `slide no${index}`;

            const imgElement = document.createElement('img');
            imgElement.src = fields.photo;
            imgElement.alt = fields.profs || `Slide ${index}`;

            const titleElement = document.createElement('h2');
            titleElement.textContent = fields.profs;

            const captionElement = document.createElement('p');
            captionElement.textContent = fields.description;

            slide.appendChild(titleElement);
            slide.appendChild(captionElement);
            slide.appendChild(imgElement);
            slidesContainer.appendChild(slide);

            console.log('Slide added:', slide); // Debugging line
        });

        // Append slides container to main container
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

        // Append main container to cible-carousel
        if (cibleCarousel) {
            cibleCarousel.appendChild(container);
            console.log('Carousel structure added to cible-carousel'); // Debugging line
        } else {
            console.error('Shortcode placeholder not found');
        }

        // Existing carousel code
        let currentIndex = 0;

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
        console.error('No ACF fields found for the carousel.');
    }
});