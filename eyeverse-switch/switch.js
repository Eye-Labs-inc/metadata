let currentImageIndex = 0;
const images = [];

for (let i = 1; i <= 10; i++) {
    const img = document.getElementById(`image${i}`);
    if (img && img.src) {
        images.push(img);
    }
}

function toggleImage() {
    if (images.length < 2) return; // No need to switch if only one image
    images[currentImageIndex].classList.add('hidden');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.remove('hidden');
}
