// Consolidated switch.js: supports toggling, alt label, and (optionally) token select and loader

// List of special 1/1 token numbers that get a 5th image
const specialTokens = [36, 126, 269, 292, 307];

let currentImageIndex = 0;
let images = [];

// Helper to (re)collect images by id (for dynamic image count)
function collectImages() {
    images = [];
    for (let i = 1; i <= 5; i++) {
        const img = document.getElementById(`image${i}`);
        if (img && img.src) {
            img.style.display = 'none';
            images.push(img);
        }
    }
}

// Alt label logic with prefix
function updateAltLabel() {
    let alt = '';
    for (let i = 0; i < images.length; i++) {
        if (images[i].style.display !== 'none') {
            if (i === 3) {
                alt = 'Third Evolution: ' + images[i].alt;
            } else if (i === 2) {
                alt = 'Second Evolution: ' + images[i].alt;
            } else if (i === 4) {
                alt = '1/1: ' + images[i].alt;
            } else {
                alt = 'First Evolution: ' + images[i].alt;
            }
            break;
        }
    }
    const label = document.getElementById('imageAltLabel');
    if (label) label.textContent = alt;
}

// Show the correct initial image (prefer 5th, then 4th, then 3rd, etc.)
function showInitialImage() {
    collectImages();
    if (images.length >= 5 && images[4].src && images[4].src !== '') {
        images.forEach(img => img.style.display = 'none');
        images[4].style.display = 'block'; // 1/1
        currentImageIndex = 4;
        updateAltLabel();
    } else if (images.length >= 4) {
        images.forEach(img => img.style.display = 'none');
        images[3].style.display = 'block'; // Warrior Ape
        currentImageIndex = 3;
        updateAltLabel();
    } else if (images.length >= 3) {
        images.forEach(img => img.style.display = 'none');
        images[2].style.display = 'block'; // Evolved Ape
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

// --- Token select and loader logic for index.html ---

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
        const n = Number(select.value);
        const img1 = document.getElementById('image1');
        const img2 = document.getElementById('image2');
        const img3 = document.getElementById('image3');
        const img4 = document.getElementById('image4');
        let img5 = document.getElementById('image5');

        // Show loader
        showLoader();

        // If special token, ensure image5 exists, else remove/hide it
        if (specialTokens.includes(n)) {
            if (!img5) {
                img5 = document.createElement('img');
                img5.id = 'image5';
                img5.alt = '1/1';
                img5.style.display = 'none';
                img5.style.position = 'absolute';
                img5.style.top = '0';
                img5.style.left = '0';
                img5.style.width = '100%';
                img5.style.height = 'auto';
                img5.style.maxWidth = '100vw';
                img5.style.maxHeight = '100vh';
                img5.style.objectFit = 'contain';
                img5.style.display = 'none';
                img5.style.transition = 'opacity 0.4s ease';
                img5.style.opacity = '1';
                img5.style.pointerEvents = 'auto';
                img5.src = '';
                img5.onload = null;
                img5.onerror = null;
                img4.parentNode.appendChild(img5);
            }
            img5.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/5/${n}.png`;
            img5.alt = '1/1';
            img5.style.display = 'none';
        } else if (img5) {
            img5.parentNode.removeChild(img5);
        }

        // Set sources for all images
        img1.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/1/${n}.png`;
        img2.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/2/${n}.png`;
        img3.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/3/${n}.png`;
        img4.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/4/${n}.png`;
        if (img5) img5.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/5/${n}.png`;

        // Wait for all images to load
        let expected = specialTokens.includes(n) ? 5 : 4;
        let loaded = 0;
        function checkHide() {
            loaded++;
            if (loaded === expected) {
                hideLoader();
                collectImages();
                // Show correct initial image
                if (specialTokens.includes(n) && img5) {
                    images.forEach(img => img.style.display = 'none');
                    img5.style.display = 'block';
                    currentImageIndex = 4;
                } else if (img4) {
                    images.forEach(img => img.style.display = 'none');
                    img4.style.display = 'block';
                    currentImageIndex = 3;
                } else if (img3) {
                    images.forEach(img => img.style.display = 'none');
                    img3.style.display = 'block';
                    currentImageIndex = 2;
                } else {
                    images.forEach((img, idx) => {
                        img.style.display = idx === 0 ? 'block' : 'none';
                    });
                    currentImageIndex = 0;
                }
                updateAltLabel();
            }
        }
        img1.onload = checkHide;
        img2.onload = checkHide;
        img3.onload = checkHide;
        img4.onload = checkHide;
        img1.onerror = checkHide;
        img2.onerror = checkHide;
        img3.onerror = checkHide;
        img4.onerror = checkHide;
        if (img5) {
            img5.onload = checkHide;
            img5.onerror = checkHide;
        }
    }

    select.addEventListener('change', updateImages);
}
