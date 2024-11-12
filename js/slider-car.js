document.addEventListener('DOMContentLoaded', function() {
    // Extract image URLs from the DOM
    const imageElements = document.querySelectorAll('.wp-block-image img');
    const imageUrls = Array.from(imageElements).map(img => img.src);

    // Remove the original image elements from the DOM
    imageElements.forEach(img => img.parentElement.remove());

    if (imageUrls.length > 0) {
        console.log('imageUrls:', imageUrls); // Debugging line
        const cibleCarousel = document.querySelector('.cible-carousel');

        // Create the main carousel container
        const container = document.createElement('div');
        container.className = 'slider-car';

        // Create the slides container
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides';

        // Create carousel items
        imageUrls.forEach((imageUrl, index) => {
            const slide = document.createElement('div');
            slide.className = `slide no${index}`;

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = `Slide ${index}`;

            slide.appendChild(imgElement);
            slidesContainer.appendChild(slide);
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
        console.error('No images found for the carousel.');
    }
});