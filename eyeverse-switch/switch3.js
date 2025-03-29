let currentImageIndex = 0;
        const images = [
            document.getElementById('image1'),
            document.getElementById('image2'),
            document.getElementById('image3')
        ];
        function toggleImage() {
            images[currentImageIndex].classList.add('hidden');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.remove('hidden');
        }