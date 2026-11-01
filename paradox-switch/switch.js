let currentImageIndex = 0;
const images = [];

for (let i = 1; i <= 10; i++) {
    const img = document.getElementById(`image${i}`);
    if (img && img.src) {
        images.push(img);
    }
}

images.forEach((img, index) => {
    if (!img.classList.contains("hidden")) {
        currentImageIndex = index;
    }
});

function toggleImage() {
    if (images.length < 2) return;
    images[currentImageIndex].classList.add("hidden");
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.remove("hidden");
}
