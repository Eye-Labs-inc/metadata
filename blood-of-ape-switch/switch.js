// Consolidated switch.js: supports toggling, alt label, and (optionally) token select and loader

let currentImageIndex = 0;
const images = [];

// Collect images dynamically and hide all initially
for (let i = 1; i <= 10; i++) {
    const img = document.getElementById(`image${i}`);
    if (img && img.src) {
        img.style.display = 'none';
        images.push(img);
    }
}

// Alt label logic with prefix
function updateAltLabel() {
    let alt = '';
    for (let i = 0; i < images.length; i++) {
        if (images[i].style.display !== 'none') {
            if (i === 2) {
                alt = 'Second Evolution: ' + images[i].alt;
            } else {
                alt = 'First Evolution: ' + images[i].alt;
            }
            break;
        }
    }
    const label = document.getElementById('imageAltLabel');
    if (label) label.textContent = alt;
}

// Show the third image (Evolved Ape) first and update the alt label
function showInitialImage() {
    if (images.length >= 3) {
        images.forEach(img => img.style.display = 'none');
        images[2].style.display = 'block';
        currentImageIndex = 2;
        updateAltLabel();
    } else if (images.length > 0) {
        images.forEach((img, idx) => {
            img.style.display = idx === 0 ? 'block' : 'none';
        });
        currentImageIndex = 0;
        updateAltLabel();
    }
}
window.addEventListener('DOMContentLoaded', showInitialImage);

// Toggle image logic
function toggleImage() {
    if (images.length < 2) return;
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = 'block';
    updateAltLabel();
}

// --- Optional: Token select and loader logic for index.html ---

const select = document.getElementById('tokenSelect');
if (select) {
    // Populate the select dropdown with options 1-333
    for (let i = 1; i <= 333; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }

    function showLoader() {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'block';
    }

    function hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    }

    function updateImages() {
        const n = select.value;
        const img1 = document.getElementById('image1');
        const img2 = document.getElementById('image2');
        const img3 = document.getElementById('image3');
        showLoader();
        let loaded = 0;
        function checkHide() {
            loaded++;
            if (loaded === 3) {
                hideLoader();
                updateAltLabel();
            }
        }
        img1.onload = checkHide;
        img2.onload = checkHide;
        img3.onload = checkHide;
        img1.onerror = checkHide;
        img2.onerror = checkHide;
        img3.onerror = checkHide;
        img1.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/1/${n}.png`;
        img2.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/2/${n}.png`;
        img3.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/3/${n}.png`;

        // Show only the first image after update
        img1.style.display = 'block';
        img2.style.display = 'none';
        img3.style.display = 'none';
        currentImageIndex = 0;
        updateAltLabel();
    }

    select.addEventListener('change', updateImages);
}
