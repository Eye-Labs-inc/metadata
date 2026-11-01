let currentImageIndex = 0;
const images = [];
const labels = ["Rally of Blood (origin)", "Blood of Ape (reflection)"];

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

function updateLabel() {
    const label = document.getElementById("frame-label");
    if (label) {
        label.textContent = labels[currentImageIndex] || "";
    }
}

function toggleImage() {
    if (images.length < 2) return;
    images[currentImageIndex].classList.add("hidden");
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.remove("hidden");
    updateLabel();
}

updateLabel();
