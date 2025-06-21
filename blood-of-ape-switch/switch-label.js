let currentImageIndex = 0;
const images = [];

// Loop to collect images dynamically
for (let i = 1; i <= 10; i++) {
    const img = document.getElementById(`image${i}`);
    if (img && img.src) {
        images.push(img);
    }
}

// Find the initially visible image
images.forEach((img, index) => {
    if (img.style.display !== 'none') {
        currentImageIndex = index;
    }
});

function updateAltLabel() {
    // Show alt label with prefix depending on image index
    let alt = '';
    for (let i = 0; i < images.length; i++) {
        if (images[i].style.display !== 'none') {
            if (i === 2) {
                alt = '2nd Evolution: ' + images[i].alt;
            } else {
                alt = '1st Evolution: ' + images[i].alt;
            }
            break;
        }
    }
    const label = document.getElementById('imageAltLabel');
    if (label) label.textContent = alt;
}

function toggleImage() {
    if (images.length < 2) return; // No need to switch if only one image
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = 'block';
    updateAltLabel();
}

// Optionally, call updateAltLabel on load
window.addEventListener('DOMContentLoaded', updateAltLabel);
