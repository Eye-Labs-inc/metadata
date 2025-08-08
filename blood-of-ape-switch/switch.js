// Consolidated switch.js: supports toggling, alt label, and (optionally) token select and loader

// List of special 1/1 token numbers that get a 5th image
const specialTokens = [36, 126, 269, 292, 307];
// List of tokens that get a 5th image with 'Golden Revelation' alt
const goldenTokens = [4, 18, 27, 44, 54, 66, 78, 87, 89, 98, 109, 115, 131, 134, 135, 147, 150, 155, 165, 172, 176, 181, 182, 188, 199, 204, 220, 225, 238, 253, 270, 280, 282];

let currentImageIndex = 0;
let images = [];

// Helper to (re)collect images by id (for dynamic image count)
function collectImages() {
    images = [];
    for (let i = 1; i <= 5; i++) {
        const img = document.getElementById(`image${i}`);
        if (img && img.src) {
            // Do not set display here
            images.push(img);
        }
    }
}

// Alt label logic with prefix
function updateAltLabel() {
    let alt = '';
    for (let i = 0; i < images.length; i++) {
        if (images[i].style.display !== 'none') {
            if (i === 4) {
                // Fifth image: check if golden or special
                const n = Number(document.getElementById('tokenSelect')?.value);
                if (goldenTokens.includes(n)) {
                    alt = 'Blessing: ' + images[i].alt;
                } else {
                    alt = '1/1: ' + images[i].alt;
                }
            } else if (i === 3) {
                alt = 'Third Evolution: ' + images[i].alt;
            } else if (i === 2) {
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

// Show the correct initial image (prefer 5th, then 4th, then 3rd, etc.)
function showInitialImage() {
    collectImages();
    // Hide all images first
    images.forEach(img => img.style.display = 'none');
    // Get token number from select or fallback to image src
    let n;
    const selectElem = document.getElementById('tokenSelect');
    if (selectElem) {
        n = Number(selectElem.value);
    } else if (images[0] && images[0].src) {
        // Try to extract token number from image1 src
        const match = images[0].src.match(/\/(\d+)\.png$/);
        if (match) n = Number(match[1]);
    }
    // Fifth image logic: show if special or golden
    if (
        images.length >= 5 &&
        images[4].src &&
        images[4].src !== '' &&
        (specialTokens.includes(n) || goldenTokens.includes(n))
    ) {
        images[4].style.display = 'block'; // Only img5
        currentImageIndex = 4;
        updateAltLabel();
    } else if (images.length >= 4) {
        images[3].style.display = 'block'; // Only img4
        currentImageIndex = 3;
        updateAltLabel();
    } else if (images.length >= 3) {
        images[2].style.display = 'block'; // Only img3
        currentImageIndex = 2;
        updateAltLabel();
    } else if (images.length > 0) {
        images[0].style.display = 'block'; // Only img1
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
        // Remove all img5 from the parent container before creating/appending a new one
        if (img4 && img4.parentNode) {
            const parent = img4.parentNode;
            Array.from(parent.querySelectorAll('#image5')).forEach(img => {
                img.onload = null;
                img.onerror = null;
                parent.removeChild(img);
            });
        }
        let img5 = null;

        // Show loader
        showLoader();

        // Fetch character name from local metadata file
        fetch(`../blood-of-ape/${n}`)
            .then(response => response.json())
            .then(data => {
                let characterName = '';
                if (data && data.attributes) {
                    const charAttr = data.attributes.find(attr => attr.trait_type === 'Character');
                    if (charAttr) characterName = charAttr.value;
                }
                if (!characterName && data && data.name) {
                    // Fallback: try to extract from name field
                    characterName = data.name.replace(/^#\d+\s*/, '');
                }

                // Set alt attributes for images 1-4 to their respective evolution names
                img1.alt = 'Ape Kin';
                img2.alt = 'Paradox Reflection';
                img3.alt = 'Evolved Ape';
                img4.alt = 'Warrior Ape';

                // If special token or golden token, ensure image5 exists, else remove/hide it
                if (specialTokens.includes(n) || goldenTokens.includes(n)) {
                    img5 = document.createElement('img');
                    img5.id = 'image5';
                    img5.style.display = 'none'; // Only set display, rest from CSS
                    img4.parentNode.appendChild(img5);

                    // Set alt for image5
                    if (goldenTokens.includes(n)) {
                        img5.alt = 'Golden Revelation';
                    } else {
                        img5.alt = characterName;
                    }
                    img5.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/5/${n}.png`;
                }

                // Set sources for all images except img5 (already set above if needed)
                img1.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/1/${n}.png`;
                img2.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/2/${n}.png`;
                img3.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/3/${n}.png`;
                img4.src = `https://d1f3nwda2dsfwc.cloudfront.net/blood-of-ape/4/${n}.png`;

                // Wait for all images to load
                let expected = (specialTokens.includes(n) || goldenTokens.includes(n)) ? 5 : 4;
                let loaded = 0;
                function checkHide() {
                    loaded++;
                    if (loaded === expected) {
                        hideLoader();
                        collectImages();
                        // Show correct initial image (always use showInitialImage)
                        showInitialImage();
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
            })
            .catch(() => {
                // Fallback: set alt to empty if fetch fails
                img1.alt = '';
                img2.alt = '';
                img3.alt = '';
                img4.alt = '';
                if (img5) img5.alt = '';
            });
    }

    select.addEventListener('change', updateImages);
}
